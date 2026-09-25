import {configured,getSettings,rest} from '../../../lib/supabase';

export async function POST(){
  if(!configured()) return Response.json({ok:false,message:'Supabase n’est pas configuré.'},{status:503});
  const base=process.env.SUPABASE_URL||process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
  const s=await getSettings();
  const target=s.vinted_url||'https://www.vinted.fr/member/267314251';
  try{
    const api='https://api.microlink.io?url='+encodeURIComponent(target)+'&screenshot=true&meta=false';
    const mr=await fetch(api,{cache:'no-store',headers:{accept:'application/json'}});
    if(!mr.ok) throw new Error('service de capture HTTP '+mr.status);
    const mj=await mr.json(),shot=mj?.data?.screenshot?.url;
    if(!shot) throw new Error('aucune image retournée');
    const ir=await fetch(shot,{cache:'no-store'});
    if(!ir.ok) throw new Error('image HTTP '+ir.status);
    const type=ir.headers.get('content-type')||'image/png';
    const bytes=Buffer.from(await ir.arrayBuffer());
    if(!type.startsWith('image/')||bytes.length<10000) throw new Error('capture non valide');
    const name='preview-desktop-auto.png';
    const sr=await fetch(`${base}/storage/v1/object/site-media/${name}`,{method:'POST',headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':type,'x-upsert':'true'},body:bytes});
    if(!sr.ok) throw new Error('enregistrement Supabase : '+await sr.text());
    const url=`${base}/storage/v1/object/public/site-media/${name}?v=${Date.now()}`;
    const rr=await rest('site_settings?id=eq.1',{method:'PATCH',headers:{Prefer:'return=representation'},body:JSON.stringify({preview_desktop_url:url,desktop_separate:true,updated_at:new Date().toISOString()})});
    if(!rr.ok) throw new Error('mise à jour des réglages');
    return Response.json({ok:true,url,message:'Nouvel aperçu Vinted enregistré.'});
  }catch(e){return Response.json({ok:false,message:`Actualisation impossible (${e.message}). La dernière image enregistrée est conservée.`},{status:200})}
}