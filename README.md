# Boutchou Babioles — V1

Vitrine Next.js mobile-first. Le catalogue initial contient 68 articles extraits de l'export Vinted fourni, avec uniquement la photo principale et les informations essentielles.

## Lancer
npm install
npm run dev

## Déployer sur Vercel
Importer ce projet dans le dépôt GitHub `Boutchoubabioles/pro`, puis déployer avec le preset Next.js.

## Vinted
La page Administration contient le bouton « Actualiser depuis Vinted » et l'option « Solution de secours ». La récupération directe Vinted est volontairement isolée dans `app/api/vinted-sync/route.js` : elle doit être raccordée à une méthode Vinted stable/autorisée avant activation en production. En cas d'échec, le catalogue existant reste affiché.

## À faire pour la V2
- authentification de l'administration (Supabase)
- stockage persistant des réglages
- raccordement de la synchronisation Vinted
- URLs directes de chaque annonce Vinted lorsqu'elles sont disponibles
