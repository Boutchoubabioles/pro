Correctif vitrine Vinted défilante

Remplacer :
- app/page.js
- app/style.css
- app/api/vinted-preview/route.js

Modifications :
- corrige l'image présente en administration mais absente du site ;
- si une seule capture existe, elle est utilisée sur tous les écrans ;
- affiche la capture dans une fenêtre verticale défilante ;
- bouton flottant « Ouvrir sur Vinted » ;
- retour à la capture automatique simple qui fonctionnait auparavant ;
- en cas d'échec, l'ancienne capture reste conservée.
