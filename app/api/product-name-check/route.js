import products from '../../../../data/products.json';

function normalizeTitle(value=''){
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g,' ')
    .trim();
}

export async function GET(req){
  const {searchParams}=new URL(req.url);
  const title=(searchParams.get('title')||'').trim();
  if(!title) return Response.json({exists:false,product:null});

  const wanted=normalizeTitle(title);
  const product=products.find(p=>normalizeTitle(p.title)===wanted)||null;

  return Response.json({
    exists:!!product,
    product:product?{id:String(product.id),title:product.title}:null
  });
}
