MISE À JOUR — GESTION COMPLÈTE DES PRODUITS

1. Dans Supabase > SQL Editor, exécuter SUPABASE-PRODUITS.sql UNE SEULE FOIS.
   Il crée la table products et importe les 57 produits nettoyés (sans les doublons retirés).

2. Ensuite, copier dans GitHub les dossiers app et data du ZIP en conservant l'arborescence.
   Vercel redéploiera automatiquement.

Nouveautés :
- bouton + Ajouter un article
- photo obligatoire avec envoi dans Supabase Storage
- nom, marque, taille, état, prix, lien Vinted
- affiché/masqué
- catégories multiples
- bouton Modifier sur chaque article
- bouton Supprimer l'article dans la fiche
- confirmation avant suppression
- contrôle des doublons même si l'article existant est masqué
- possibilité d'ajouter quand même après avertissement
- catalogue désormais géré dans Supabase, donc persistant après déploiement

IMPORTANT : exécuter le SQL AVANT d'envoyer les fichiers sur GitHub.
