'use client';
import {useEffect} from 'react';
import './product-ui-enhancements.css';

export default function ProductUiEnhancements(){
 useEffect(()=>{
  const enhance=()=>{
   // Liste produits : remplace toutes les cases catégories par un résumé compact.
   document.querySelectorAll('.productAdminRow').forEach(row=>{
    const box=row.querySelector('.productCats');
    if(!box)return;
    const count=box.querySelectorAll('input[type="checkbox"]:checked').length;
    let summary=row.querySelector('.categorySummary');
    if(!summary){
      summary=document.createElement('div');
      summary.className='categorySummary';
      box.insertAdjacentElement('afterend',summary);
    }
    summary.textContent=count===0?'Aucune catégorie':count===1?'1 catégorie':`${count} catégories`;
    box.style.display='none';
   });

   // Fiche article : ajoute Annuler à côté d'Enregistrer, sans sauvegarde.
   const form=document.querySelector('.productForm');
   const actions=form?.querySelector('.formActions');
   if(actions&&!actions.querySelector('.cancelProductEdit')){
    const cancel=document.createElement('button');
    cancel.type='button';
    cancel.className='cancelProductEdit';
    cancel.textContent='Annuler';
    cancel.onclick=()=>{
      const back=form.querySelector('.backBtn');
      if(back)back.click();
    };
    const danger=actions.querySelector('.dangerBtn');
    if(danger)actions.insertBefore(cancel,danger);
    else actions.appendChild(cancel);
   }
  };

  enhance();
  const observer=new MutationObserver(enhance);
  observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['checked']});
  return()=>observer.disconnect();
 },[]);
 return null;
}
