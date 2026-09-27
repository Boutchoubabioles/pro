'use client';
import {useEffect} from 'react';

export function TrackVisit(){
  useEffect(()=>{
    const key='boutchou_visit_session';
    if(sessionStorage.getItem(key))return;
    sessionStorage.setItem(key,'1');
    fetch('/api/analytics',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type:'visit'}),keepalive:true}).catch(()=>{});
  },[]);
  return null;
}

export function TrackedVintedLink({href,className,children}){
  function track(){
    fetch('/api/analytics',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type:'vinted_shop'}),keepalive:true}).catch(()=>{});
  }
  return <a className={className} href={href} target="_blank" onClick={track}>{children}</a>;
}
