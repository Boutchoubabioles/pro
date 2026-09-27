CORRECTIF V3 - ONGLET STATISTIQUES

Cette version corrige la cause : le composant précédent cherchait la barre d'onglets
avant qu'elle n'existe à l'écran, puis abandonnait.

Remplacer/ajouter uniquement :
- app/admin/AdminStatsTab.js
- app/admin/stats-tab.css

Ne supprimez aucun autre fichier.
Aucun SQL à exécuter.

L'onglet « Statistiques » sera ajouté dès que la barre d'administration apparaît,
juste après « Réseaux sociaux ».
