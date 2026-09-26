import {configured} from '../../../lib/supabase';
export async function POST(req){
 if(!configured())return Response.json({ok:false,message:'Supabase non configuré.'},{status:503});
 const fd=await req.formData(),file=fd.get('file');
 if(!file||!String(file.type).startsWith('image/'))return Response.json({ok:false,message:'Veuillez sélectionner une image.'},{status:400});
 if(file.size>8*1024*1024)return Response.json({ok:false,message:'Image trop lourde (8 Mo maximum).'},{status:400});
 const ext=(file.name.split('.').pop()||'jpg').replace(/[^a-z0-9]/gi,'').toLowerCase();
 const name=`products/${Date.now()}-${Math.random().toString(36).slice(2,8)}.${ext}`;
 const base=process.env.SUPABASE_URL||process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 const r=await fetch(`${base}/storage/v1/object/site-media/${name}`,{method:'POST',headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':file.type},body:Buffer.from(await file.arrayBuffer())});
 if(!r.ok)return Response.json({ok:false,message:'Envoi impossible : '+await r.text()},{status:500});
 return Response.json({ok:true,url:`${base}/storage/v1/object/public/site-media/${name}`});
}
