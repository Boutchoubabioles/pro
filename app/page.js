export default function Home(){
  const shop='https://www.vinted.fr/member/267314251';
  return <main>
    <section className="hero"><div>
      <span className="pill">Bébés & enfants</span>
      <h1>De jolies trouvailles pour les petits 💛</h1>
      <p>Découvrez Boutchou Babioles et retrouvez les articles disponibles directement sur Vinted.</p>
      <a className="button" href={shop} target="_blank" rel="noreferrer">Voir la boutique Vinted</a>
    </div></section>

    <section className="shopShowcase">
      <div className="heading">
        <div><small>NOTRE BOUTIQUE</small><h2>Nos articles sur Vinted</h2></div>
      </div>
      <p className="shopIntro">Un aperçu de la boutique Boutchou Babioles. Pour connaître les prix et les disponibilités à jour, ouvrez directement la boutique Vinted.</p>
      <a className="shopCapture" href={shop} target="_blank" rel="noreferrer" aria-label="Ouvrir la boutique Boutchou Babioles sur Vinted">
        <img src="/vinted-boutique.jpg" alt="Aperçu de la boutique Vinted Boutchou Babioles"/>
        <span className="captureCta">Voir les articles sur Vinted →</span>
      </a>
      <div className="shopActions">
        <a className="button" href={shop} target="_blank" rel="noreferrer">Voir tous les articles et disponibilités</a>
      </div>
      <p className="captureNote">Les prix et disponibilités peuvent évoluer sur Vinted.</p>
    </section>
  </main>
}