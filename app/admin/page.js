'use client';import{useState}from'react';
export default function Admin(){
 const[backup,setBackup]=useState(false);
 return <main className="admin"><a href="/">← Retour au site</a><h1>Administration</h1>
 <div className="panel"><h2>Aperçu de la boutique Vinted</h2>
 <p>Le site affiche maintenant une grande image de la boutique. L’image entière est cliquable et ouvre Vinted.</p>
 <div className="adminPreview"><img src="/vinted-boutique.jpg" alt="Aperçu actuel"/></div>
 <p className="status">Pour ce premier essai, une image de démonstration est utilisée. Nous remplacerons simplement <strong>public/vinted-boutique.jpg</strong> par une vraie capture de la boutique si tu aimes la présentation.</p>
 <hr/>
 <label className="switchrow"><span><strong>Solution de secours</strong><small>Conserver l’ancien import manuel uniquement en cas de besoin.</small></span><input type="checkbox" checked={backup} onChange={e=>setBackup(e.target.checked)}/></label>
 {backup&&<div className="backup"><label>Catalogue Vinted (.html)<input type="file" accept=".html"/></label><label>Photos Vinted (.zip)<input type="file" accept=".zip"/></label><button>Importer / mettre à jour</button></div>}
 </div>
 </main>
}