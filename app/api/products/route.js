import {rest,configured} from '../../../lib/supabase';
import fallbackProducts from '../../../data/products.json';

function clean(p={}){
  return {
    id:String(p.id||''),
    title:String(p.title||'').trim(),
    brand:String(p.brand||'').trim(),
    size:String(p.size||'').trim(),
    condition:String(p.condition||'').trim(),
    price:String(p.price||'').replace('.',',').trim(),
    created_at:p.created_at||new Date().toISOString(),
    image:String(p.image||'').trim(),
    vinted_url:String(p.vinted_url||'').trim()
  };
}
function norm(s=''){
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
}
async function allProducts(){
  if(!configured()) return fallbackProducts;
  const r=await rest('products?select=*&order=created_at.desc');
  if(!r.ok) return fallbackProducts;
  const rows=await r.json();
  return rows.length?rows:fallbackProducts;
}
export async function GET(){return Response.json(await allProducts())}

export async function POST(req){
  if(!configured())return Response.json({ok:false,message:'Supabase non configuré.'},{status:503});
  const b=await req.json(), action=b.action||'save', p=clean(b.product||{});
  if(action==='delete'){
    const id=String(b.id||'');
    if(!id)return Response.json({ok:false,message:'Produit invalide.'},{status:400});
    const [a,c,v]=await Promise.all([
      rest(`products?id=eq.${encodeURIComponent(id)}`,{method:'DELETE'}),
      rest(`product_category_links?product_id=eq.${encodeURIComponent(id)}`,{method:'DELETE'}),
      rest(`product_visibility?product_id=eq.${encodeURIComponent(id)}`,{method:'DELETE'})
    ]);
    if(!a.ok)return Response.json({ok:false,message:'Suppression impossible : '+await a.text()},{status:500});
    return Response.json({ok:true,message:'Article supprimé.'});
  }
  if(!p.title)return Response.json({ok:false,message:'Le nom du produit est obligatoire.'},{status:400});
  if(!p.price)return Response.json({ok:false,message:'Le prix est obligatoire.'},{status:400});
  if(!p.image)return Response.json({ok:false,message:'La photo est obligatoire.'},{status:400});
  if(!p.id)p.id='local-'+Date.now();
  const all=await allProducts();
  const duplicate=all.find(x=>String(x.id)!==p.id&&norm(x.title)===norm(p.title));
  if(duplicate&&!b.force)return Response.json({ok:false,duplicate:true,product:duplicate,message:`Ce produit existe déjà : ${duplicate.title}`},{status:409});
  const r=await rest('products',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=representation'},body:JSON.stringify(p)});
  if(!r.ok)return Response.json({ok:false,message:'Enregistrement impossible : '+await r.text()},{status:500});
  return Response.json({ok:true,message:b.isNew?'Article ajouté.':'Article modifié.',product:(await r.json())[0]||p});
}
