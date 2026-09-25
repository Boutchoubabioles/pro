const USER_ID = '267314251';
const SHOP = 'https://www.vinted.fr/member/267314251';
const UA = 'vinted-ios Vinted/22.6.1 (lt.manodrabuziai.fr; build:21794; iOS 15.2.0) iPhone10,6';

function txt(v){ return typeof v === 'string' ? v : (v?.title || v?.name || ''); }
function price(v){
  if (v == null) return '';
  if (typeof v === 'object') v = v.amount ?? v.value ?? '';
  const n = Number(String(v).replace(',', '.'));
  return Number.isFinite(n) ? n.toFixed(2).replace('.', ',') : String(v);
}
function normalize(x){
  const id = String(x.id || '');
  const photo = x.photo?.url || x.photo?.full_size_url || x.photos?.[0]?.url || x.photos?.[0]?.full_size_url || '';
  return {
    id,
    title: x.title || '',
    brand: txt(x.brand) || txt(x.brand_dto),
    size: txt(x.size),
    condition: txt(x.status) || txt(x.condition),
    price: price(x.price),
    image: photo,
    vinted_url: x.url || x.item_url || (id ? `https://www.vinted.fr/items/${id}` : SHOP)
  };
}

async function publicToken(){
  const r = await fetch('https://www.vinted.fr/oauth/token', {
    method: 'POST',
    headers: {'content-type':'application/json','user-agent':UA,'accept':'application/json'},
    body: JSON.stringify({grant_type:'password', client_id:'ios', scope:'public'}),
    cache: 'no-store'
  });
  if (!r.ok) throw new Error(`jeton public HTTP ${r.status}`);
  const j = await r.json();
  if (!j.access_token) throw new Error('jeton public absent');
  return j.access_token;
}

async function getItems(token){
  const url = `https://www.vinted.fr/api/v2/users/${USER_ID}/items?order=newest_first&page=1&per_page=96`;
  const r = await fetch(url, {
    headers: {
      'authorization': `Bearer ${token}`,
      'user-agent': UA,
      'x-app-version':'22.6.1',
      'x-device-model':'iPhone10,6',
      'short-bundle-version':'22.6.1',
      'accept':'application/json',
      'accept-language':'fr-FR,fr;q=0.9'
    },
    cache:'no-store'
  });
  if (!r.ok) throw new Error(`articles HTTP ${r.status}`);
  const j = await r.json();
  const raw = j.items || j?.user?.items || [];
  if (!Array.isArray(raw) || !raw.length) throw new Error('aucun article retourné');
  return raw.map(normalize).filter(x => x.id && x.image);
}

export async function POST(){
  try {
    const token = await publicToken();
    const items = await getItems(token);
    return Response.json({
      ok:true,
      count:items.length,
      items,
      message:`Connexion Vinted réussie : ${items.length} article${items.length>1?'s':''} récupéré${items.length>1?'s':''}. Test de lecture réussi.`
    });
  } catch (e) {
    return Response.json({
      ok:false,
      count:0,
      items:[],
      message:`Deuxième méthode refusée par Vinted (${e.message}). Les articles déjà présents sont conservés.`
    }, {status:200});
  }
}
