'use client';
import {useEffect} from 'react';
import './product-ui-safe.css';

export default function ProductUiSafe(){
 useEffect(()=>{
  const timer=setInterval(()=>{
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

   const form=document.querySelector('.productForm');
   const actions=form?.querySelector('.formActions');
   if(form&&actions&&!actions.querySelector('.cancelProductSafe')){
    const cancel=document.createElement('button');
    cancel.type='button';
    cancel.className='cancelProductSafe';
    cancel.textContent='Annuler';
    cancel.addEventListener('click',()=>{
      const back=form.querySelector('.backBtn');
      if(back)back.click();
    });
    const danger=actions.querySelector('.dangerBtn');
    if(danger)actions.insertBefore(cancel,danger);
    else actions.appendChild(cancel);
   }
  },400);
  return()=>clearInterval(timer);
 },[]);
 return null;
}
