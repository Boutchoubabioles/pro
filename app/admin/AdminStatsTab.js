'use client';
import {useEffect,useState} from 'react';

export default function AdminStatsTab(){
 const[show,setShow]=useState(false);
 useEffect(()=>{
   const tabs=document.querySelector('.adminTabs');
   if(!tabs)return;
   setShow(true);
   const a=document.getElementById('admin-stats-tab');
   if(a) tabs.appendChild(a);
 },[]);
 return <a id="admin-stats-tab" href="/admin/stats" style={{
   display:show?'inline-flex':'none',
   border:'1px solid #ded5cc',background:'#fff',padding:'10px 13px',
   borderRadius:'10px',whiteSpace:'nowrap',cursor:'pointer',
   alignItems:'center',textDecoration:'none',color:'inherit',flex:'0 0 auto'
 }}>Statistiques</a>;
}
