import {rest,getSettings,configured} from '../../../lib/supabase';
export async function GET(){return Response.json(await getSettings())}
export async function POST(req){
 if(!configured())return Response.json({ok:false,message:'Supabase n’est pas encore configuré dans Vercel.'},{status:503});
 const body=await req.json(); delete body.id; delete body.updated_at;
 const r=await rest('site_settings?id=eq.1',{method:'PATCH',headers:{Prefer:'return=representation'},body:JSON.stringify({...body,updated_at:new Date().toISOString()})});
 if(!r.ok)return Response.json({ok:false,message:'Enregistrement impossible : '+await r.text()},{status:500});
 return Response.json({ok:true,message:'Modifications enregistrées.',settings:(await r.json())[0]});
}
