'use client';
import {useEffect} from 'react';
import './stats-tab.css';

export default function AdminStatsTab(){
 useEffect(()=>{
   const add=()=>{
     const tabs=document.querySelector('.adminTabs');
     if(!tabs||tabs.querySelector('[data-stats-tab]'))return;
     const a=document.createElement('a');
     a.href='/admin/stats';
     a.dataset.statsTab='true';
     a.textContent='Statistiques';
     a.className='adminStatsTab';
     tabs.appendChild(a);
   };
   add();
   const observer=new MutationObserver(add);
   observer.observe(document.body,{childList:true,subtree:true});
   return()=>observer.disconnect();
 },[]);
 return null;
}
