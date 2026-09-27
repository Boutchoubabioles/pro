'use client';
import {useEffect,useState} from 'react';

export default function AdminInstallButton(){
  const[prompt,setPrompt]=useState(null);
  const[installed,setInstalled]=useState(false);
  useEffect(()=>{
    const standalone=window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true;
    if(standalone)setInstalled(true);
    const onPrompt=e=>{e.preventDefault();setPrompt(e)};
    const onInstalled=()=>{setInstalled(true);setPrompt(null)};
    window.addEventListener('beforeinstallprompt',onPrompt);
    window.addEventListener('appinstalled',onInstalled);
    return()=>{window.removeEventListener('beforeinstallprompt',onPrompt);window.removeEventListener('appinstalled',onInstalled)};
  },[]);
  if(installed)return null;
  async function install(){
    if(prompt){prompt.prompt();await prompt.userChoice;setPrompt(null);return}
    alert("Pour installer l’administration, ouvrez le menu de votre navigateur puis choisissez « Installer l’application » ou « Ajouter à l’écran d’accueil ».");
  }
  return <div style={{maxWidth:800,margin:"10px auto 35px",padding:"0 20px",textAlign:"center"}}><button type="button" onClick={install} style={{border:"1px solid #ded5cc",background:"#fff",padding:"9px 12px",borderRadius:10,color:"#817970",cursor:"pointer"}}>📱 Installer l’application Admin</button></div>;
}
