'use client';
import{useEffect}from'react';
export default function AdminEnhancements(){
 useEffect(()=>{
  let timer;
  const watch=()=>{
   const el=document.querySelector('.stickyStatus');
   if(!el)return;
   const t=(el.textContent||'').toLowerCase();
   const error=['erreur','impossible','obligatoire','annulé','invalide'].some(x=>t.includes(x));
   clearTimeout(timer);
   if(!error&&t&&!t.includes('enregistrement…')&&!t.includes('envoi de'))timer=setTimeout(()=>{el.style.display='none'},2000);
  };
  const o=new MutationObserver(watch);o.observe(document.body,{childList:true,subtree:true,characterData:true});watch();
  return()=>{o.disconnect();clearTimeout(timer)}
 },[]);
 return null;
}
