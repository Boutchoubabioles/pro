import {configured,getSettings,rest} from '../../../lib/supabase';

export async function POST(){
  if(!configured()) return Response.json({ok:false,message:'Supabase n’est pas configuré.'},{status:503});
  const base=process.env.SUPABASE_URL||process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
  const s=await getSettings();
  const target=s.vinted_url||'https://www.vinted.fr/member/267314251';

  try{
    // Prépare la page Vinted : France, cookies requis uniquement, puis isole la zone d'articles.
    const prepare = `(function(){
      const norm=t=>(t||'').replace(/\\s+/g,' ').trim().toLowerCase();
      const clickText=(words)=>{
        const els=[...document.querySelectorAll('button,a,[role="button"],li,div')];
        const el=els.find(e=>words.some(w=>norm(e.innerText||e.textContent)===w || norm(e.innerText||e.textContent).includes(w)));
        if(el){ try{el.click();return true}catch(e){} } return false;
      };
      const prepareProducts=()=>{
        clickText(['france']);
        setTimeout(()=>clickText(['cookies requis uniquement','uniquement les cookies nécessaires','cookies nécessaires uniquement','refuser les cookies non essentiels']),700);
        setTimeout(()=>{
          const links=[...document.querySelectorAll('a[href*="/items/"]')].filter(a=>a.offsetWidth>40&&a.offsetHeight>40);
          if(!links.length)return;
          let p=links[0].parentElement;
          while(p&&p!==document.body){
            const n=p.querySelectorAll('a[href*="/items/"]').length;
            if(n>=Math.min(4,links.length)){p.id='capture-products';break}
            p=p.parentElement;
          }
          document.querySelectorAll('[role="dialog"],[aria-modal="true"]').forEach(e=>{if(!e.closest('#capture-products'))e.style.display='none'});
        },1800);
      };
      prepareProducts();
      setTimeout(prepareProducts,900);
      setTimeout(prepareProducts,2200);
    })();`;

    const q=new URLSearchParams();
    q.set('url',target);
    q.set('meta','false');
    q.set('prerender','true');
    q.set('force','true');
    q.set('adblock','true');
    q.set('waitUntil','networkidle2');
    q.set('waitForTimeout','4500');
    q.set('viewport.width','1280');
    q.set('viewport.height','1100');
    q.set('scripts',prepare);
    q.set('screenshot.element','#capture-products');
    q.set('screenshot.type','png');

    const mr=await fetch('https://api.microlink.io?'+q.toString(),{cache:'no-store',headers:{accept:'application/json'}});
    if(!mr.ok) throw new Error('service de capture HTTP '+mr.status);
    const mj=await mr.json();
    const shot=mj?.data?.screenshot?.url;
    if(!shot) throw new Error(mj?.message||'zone produits introuvable');

    const ir=await fetch(shot,{cache:'no-store'});
    if(!ir.ok) throw new Error('image HTTP '+ir.status);
    const type=ir.headers.get('content-type')||'image/png';
    if(!type.startsWith('image/')) throw new Error('capture non valide');
    const bytes=Buffer.from(await ir.arrayBuffer());
    if(bytes.length<10000) throw new Error('capture vide ou incomplète');

    const name='preview-desktop-auto.png';
    const sr=await fetch(`${base}/storage/v1/object/site-media/${name}`,{
      method:'POST',
      headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':type,'x-upsert':'true'},
      body:bytes
    });
    if(!sr.ok) throw new Error('enregistrement Supabase : '+await sr.text());

    const url=`${base}/storage/v1/object/public/site-media/${name}?v=${Date.now()}`;
    const body={preview_desktop_url:url,desktop_separate:true,updated_at:new Date().toISOString()};
    const rr=await rest('site_settings?id=eq.1',{method:'PATCH',headers:{Prefer:'return=representation'},body:JSON.stringify(body)});
    if(!rr.ok) throw new Error('mise à jour des réglages : '+await rr.text());

    return Response.json({ok:true,url,message:'Aperçu Vinted actualisé : la zone des produits a été capturée.'});
  }catch(e){
    return Response.json({ok:false,message:`Actualisation impossible (${e.message}). La dernière image enregistrée est conservée.`},{status:200});
  }
}