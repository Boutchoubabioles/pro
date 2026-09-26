MISE À JOUR PRODUITS / VISIBILITÉ

1. Dans Supabase > SQL Editor, exécuter SUPABASE.sql une seule fois.
2. Dans GitHub, ajouter/remplacer :
   app/page.js
   app/admin/page.js
   app/api/products/route.js
   app/api/product-visibility/route.js
3. Ouvrir app/style.css actuel et ajouter à la fin le contenu de STYLE-A-AJOUTER.txt.
   (Le CSS est fourni séparément pour ne pas écraser les réglages visuels récents.)

Résultat :
- retour au catalogue produits local sur la page publique ;
- Administration > Produits ;
- case rapide Affiché / Masqué pour chaque article ;
- filtres Tous / Affichés / Masqués ;
- recherche nom / marque / ID ;
- l'état est enregistré dans Supabase et persiste après les déploiements ;
- masquer ne supprime jamais le produit ;
- chaque carte publique ouvre l'annonce Vinted correspondante.

La synchronisation automatique Vinted n'est PAS activée : l'API officielle Vinted Pro nécessite un compte allowlisté. Le catalogue existant reste donc protégé contre les échecs/403.
