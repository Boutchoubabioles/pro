import {rest,configured} from '../../../lib/supabase';

export async function GET(){
  if(!configured()) return Response.json({});
  const r=await rest('product_category_links?select=product_id,category_id');
  if(!r.ok) return Response.json({});
  const rows=await r.json();
  const out={};
  for(const x of rows){
    const k=String(x.product_id);
    if(!out[k]) out[k]=[];
    out[k].push(String(x.category_id));
  }
  return Response.json(out);
}

export async function POST(req){
  if(!configured()){
    return Response.json({ok:false,message:'Supabase non configuré.'},{status:503});
  }

  const body=await req.json();
  const productId=String(body.product_id);
  const categoryIds=Array.isArray(body.category_ids)?body.category_ids:[];

  let r=await rest(
    `product_category_links?product_id=eq.${encodeURIComponent(productId)}`,
    {method:'DELETE'}
  );

  if(!r.ok){
    return Response.json({ok:false,message:'Mise à jour impossible.'},{status:500});
  }

  if(categoryIds.length){
    const rows=categoryIds.map(categoryId=>({
      product_id:productId,
      category_id:categoryId
    }));

    r=await rest('product_category_links',{
      method:'POST',
      headers:{Prefer:'return=minimal'},
      body:JSON.stringify(rows)
    });

    if(!r.ok){
      return Response.json({ok:false,message:'Mise à jour impossible.'},{status:500});
    }
  }

  return Response.json({ok:true,message:'Catégories du produit enregistrées.'});
}
