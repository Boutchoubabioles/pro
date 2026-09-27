'use client';
import {useEffect} from 'react';
import './product-ui-safe.css';

export default function ProductUiSafe(){
 useEffect(()=>{
  let lastForm=null;
  const timer=setInterval(()=>{
   // Résumé catégories dans la liste, sans MutationObserver.
   document.querySelectorAll('.productAdminRow').forEach(row=>{
    const box=row.querySelector('.productCats');
    if(!box)return;
    const count=box.querySelectorAll('input[type="checkbox"]:checked').length;
    let summary=row.querySelector('.categorySummarySafe');
    if(!summary){
      summary=document.createElement('div');
      summary.className='categorySummarySafe';
      box.insertAdjacentElement('afterend',summary);
    }
    const label=count===0?'Aucune catégorie':count===1?'1 catégorie':`${count} catégories`;
    if(summary.textContent!==label)summary.textContent=label;
   });

   // Utilise le bouton React existant « Retour aux produits » comme vrai bouton Annuler.
   const form=document.querySelector('.productForm');
   if(form&&form!==lastForm){
    const back=form.querySelector('.backBtn');
    if(back){
      back.textContent='Annuler';
      back.classList.add('cancelTopSafe');
    }
    lastForm=form;
   }
   if(!form)lastForm=null;
  },400);
  return()=>clearInterval(timer);
 },[]);
 return null;
}
