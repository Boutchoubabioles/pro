CORRECTIF URGENT - ADMIN FIGÉE

Le dernier composant d'amélioration de la liste Produits provoquait une boucle
MutationObserver et bloquait l'affichage des produits.

Ce correctif le désactive immédiatement.

Remplacer uniquement :
app/admin/layout.js

Aucun SQL à exécuter.
Après le déploiement Vercel, fermer puis rouvrir l'application si nécessaire.

Les produits et leurs données ne sont pas supprimés : le problème concernait
uniquement l'affichage de l'administration.
