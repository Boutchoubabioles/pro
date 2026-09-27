import {rest,configured} from '../../../lib/supabase';

export async function POST(req){
  if(!configured()) return Response.json({ok:false},{status:503});
  try{
    const b=await req.json();
    const type=['visit','vinted_shop','product'].includes(b.type)?b.type:null;
    if(!type)return Response.json({ok:false},{status:400});
    const row={event_type:type,product_id:b.product_id?String(b.product_id):null,product_title:b.product_title?String(b.product_title).slice(0,250):null};
    const r=await rest('analytics_events',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify(row)});
    return Response.json({ok:r.ok});
  }catch{return Response.json({ok:false},{status:400})}
}

export async function GET(){
  if(!configured()) return Response.json({events:[]});
  const r=await rest('analytics_events?select=id,event_type,product_id,product_title,created_at&order=created_at.desc&limit=10000');
  if(!r.ok)return Response.json({events:[]});
  return Response.json({events:await r.json()});
}

export async function DELETE(){
  if(!configured()) return Response.json({ok:false},{status:503});
  const r=await rest('analytics_events?id=not.is.null',{method:'DELETE'});
  return Response.json({ok:r.ok,message:r.ok?'Statistiques réinitialisées.':'Réinitialisation impossible.'});
}
