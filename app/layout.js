import './style.css';
export const metadata={title:'Boutchou Babioles',description:'Jeux éducatifs, éveil et accessoires pour bébés & enfants',manifest:'/manifest.webmanifest'};
export default function Layout({children}){return <html lang="fr"><body><header><a className="brand" href="/">Boutchou<span>Babioles</span></a><nav><a href="/">Boutique</a><a href="/admin">Administration</a></nav></header>{children}<footer>Boutchou Babioles · Retrouvez nos articles sur Vinted</footer></body></html>}
