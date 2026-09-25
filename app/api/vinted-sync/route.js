const USER_ID='267314251';
const SHOP='https://www.vinted.fr/member/267314251';
const headers={
  'accept':'application/json,text/plain,*/*',
  'accept-language':'fr-FR,fr;q=0.9,en;q=0.8',
  'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36'
};

function money(v){
  if(v==null)return '';
  if(typeof v==='object') v=v.amount??v.value??'';
  const n=Number(String(v).replace(',','.'));
  return Number.isFinite(n)?n.toFixed(2).replace('.',','):String(v);
}
function text(v){return typeof v==='string'?v:(v?.title||v?.name||'')}
function normalize(x){
  const id=String(x.id||'');
  const photo=x.photo?.url||x.photo?.full_size_url||x.photos?.[0]?.url||x.photos?.[0]?.full_size_url||'';
  const url=x.url||x.item_url||(id?`https://www.vinted.fr/items/${id}`:SHOP);
  return {id,title:x.title||'',brand:text(x.brand)||text(x.brand_dto),size:text(x.size),condition:text(x.status)||text(x.condition),price:money(x.price),image:photo,vinted_url:url};
}
async function apiItems(){
  const url=`https://www.vinted.fr/api/v2/users/${USER_ID}/items?order=newest_first&page=1&per_page=96`;
  const r=await fetch(url,{headers,cache:'no-store'});
  if(!r.ok)throw new Error(`Vinted API HTTP ${r.status}`);
  const j=await r.json();
  const items=j.items||j?.user?.items||[];
  if(!Array.isArray(items)||!items.length)throw new Error('Aucun article retourné');
  return items.map(normalize).filter(x=>x.id&&x.image);
}
async function publicPage(){
  const r=await fetch(SHOP,{headers:{...headers,accept:'text/html'},cache:'no-store'});
  if(!r.ok)throw new Error(`Page publique HTTP ${r.status}`);
  const html=await r.text();
  const found=new Map();
  for(const m of html.matchAll(/https:\/\/www\.vinted\.fr\/items\/(\d+)[^"'\\< ]*/g)) found.set(m[1],{id:m[1],title:'Article Vinted',brand:'',size:'',condition:'',price:'',image:'',vinted_url:m[0]});
  if(!found.size)throw new Error('Les annonces ne sont pas exposées dans la page publique');
  return [...found.values()];
}
export async function POST(){
  try{
    let items,method='API publique Vinted';
    try{items=await apiItems()}catch(e){items=await publicPage();method='page publique Vinted'}
    return Response.json({ok:true,count:items.length,items,message:`${items.length} article${items.length>1?'s':''} récupéré${items.length>1?'s':''} depuis Vinted (${method}).`});
  }catch(e){
    return Response.json({ok:false,count:0,items:[],message:`Vinted n’a pas autorisé la récupération directe (${e.message}). Les articles déjà présents sur le site sont conservés.`},{status:200});
  }
}
