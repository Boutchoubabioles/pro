MISE À JOUR SÛRE - PRODUITS COMPACTS + ANNULER

Cette version ne réutilise PAS le MutationObserver qui avait figé l'administration.

Ajouts :
- Les cases des catégories disparaissent de la liste générale des produits.
- À leur place : « Aucune catégorie », « 1 catégorie », « X catégories ».
- Les cases restent disponibles dans Modifier/Ajouter un article.
- Dans la fiche article, le bouton existant « Retour aux produits » devient « Annuler ».
  Il utilise donc directement la fonction React déjà existante et ne sauvegarde rien.
- Aucun changement des données Supabase.
- Statistiques et autres fonctions conservées.

Fichiers à ajouter/remplacer :
app/admin/ProductUiSafe.js
app/admin/product-ui-safe.css
app/admin/layout.js

Aucun SQL à exécuter.
