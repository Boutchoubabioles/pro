'use client';
import{useEffect,useMemo,useState}from'react';

export default function Stats(){
 const[events,setEvents]=useState([]),[msg,setMsg]=useState('');
 async function load(){const j=await fetch('/api/analytics',{cache:'no-store'}).then(r=>r.json());setEvents(j.events||[])}
 useEffect(()=>{load()},[]);
 useEffect(()=>{if(!msg)return;const t=setTimeout(()=>setMsg(''),2000);return()=>clearTimeout(t)},[msg]);
 const data=useMemo(()=>{
  let visits=0,shop=0;const products={},days={};
  for(const e of events){
   if(e.event_type==='visit')visits++;
   if(e.event_type==='vinted_shop')shop++;
   if(e.event_type==='product'){const k=e.product_id||e.product_title||'inconnu';if(!products[k])products[k]={title:e.product_title||k,count:0};products[k].count++}
   const d=new Date(e.created_at).toLocaleDateString('fr-FR');days[d]=(days[d]||0)+1;
  }
  return{visits,shop,products:Object.values(products).sort((a,b)=>b.count-a.count),days:Object.entries(days).slice(0,14)};
 },[events]);
 async function reset(){if(!confirm('Réinitialiser définitivement toutes les statistiques ?'))return;const j=await fetch('/api/analytics',{method:'DELETE'}).then(r=>r.json());setMsg(j.message||'Terminé.');if(j.ok)load()}
 return <main className="admin"><a href="/admin">← Retour à l’administration</a><h1>Statistiques</h1><div className="statsCards"><div><strong>{data.visits}</strong><span>Visites</span></div><div><strong>{data.shop}</strong><span>Clics boutique Vinted</span></div><div><strong>{events.filter(e=>e.event_type==='product').length}</strong><span>Clics sur les articles</span></div></div><div className="panel"><h2>Articles les plus consultés</h2>{data.products.length?<div className="statsList">{data.products.map((p,i)=><div key={i}><span>{p.title}</span><strong>{p.count}</strong></div>)}</div>:<p className="hint">Aucun clic enregistré pour le moment.</p>}</div><div className="panel"><h2>Activité récente</h2><p className="hint">Une visite est comptée une fois par session de navigation. Les clics sont comptés à chaque action.</p>{data.days.length?<div className="statsList">{data.days.map(([d,n])=><div key={d}><span>{d}</span><strong>{n} actions</strong></div>)}</div>:<p className="hint">Aucune donnée.</p>}</div><div className="panel dangerZone"><h2>Réinitialisation</h2><p>À utiliser après les essais pour repartir de zéro avant la mise en ligne.</p><button className="dangerBtn" onClick={reset}>Réinitialiser les statistiques</button></div>{msg&&<p className="status stickyStatus">{msg}</p>}</main>
}
