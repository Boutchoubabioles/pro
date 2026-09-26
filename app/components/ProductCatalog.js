'use client';
import{useMemo,useState}from'react';
const euro=v=>Number(String(v).replace(',','.')).toLocaleString('fr-FR',{minimumFractionDigits:2,maximumFractionDigits:2})+' €';
export default function ProductCatalog({products,categories,links}){
 const[active,setActive]=useState('all');
 const list=useMemo(()=>active==='all'?products:products.filter(p=>(links[String(p.id)]||[]).includes(active)),[active,products,links]);
 return <><div className="categoryBar"><button className={active==='all'?'active':''} onClick={()=>setActive('all')}>Tous</button>{categories.map(c=><button key={c.id} className={active===c.id?'active':''} onClick={()=>setActive(c.id)}>{c.name}</button>)}</div><div className="grid">{list.map(p=><a className="card" key={p.id} href={p.vinted_url} target="_blank"><div className="photo"><img src={p.image} alt={p.title}/></div><div className="info"><strong>{p.brand||'BoutchouBabioles'}</strong><span className="title">{p.title}</span>{p.size&&<span className="meta">{p.size}</span>}<div className="price">{euro(p.price)}</div></div></a>)}</div>{list.length===0&&<p className="emptyCategory">Aucun article dans cette catégorie pour le moment.</p>}</>
}