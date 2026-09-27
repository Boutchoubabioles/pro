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

  const tabs=document.querySelector('.adminTabs');
  if(tabs&&!tabs.querySelector('.statsTabLink')){
    const a=document.createElement('a');
    a.href='/admin/stats';
    a.className='statsTabLink';
    a.textContent='Statistiques';
    a.style.cssText='border:1px solid #ded5cc;background:#fff;padding:10px 13px;border-radius:10px;white-space:nowrap;cursor:pointer;display:inline-flex;align-items:center;text-decoration:none;color:inherit';
    tabs.appendChild(a);
  }
  return()=>{o.disconnect();clearTimeout(timer)}
 },[]);
 return null;
}
