CORRECTIF SUPABASE URL

Le problème venait d'un décalage de nom de variable :
- Vercel contient SUPABASE_URL
- la V2 cherchait NEXT_PUBLIC_SUPABASE_URL

Ce correctif accepte désormais SUPABASE_URL (et garde aussi la compatibilité avec l'ancien nom).

Remplacer dans GitHub :
- app/api/upload/route.js
- lib/supabase.js

Aucune variable Vercel à modifier.
Après le déploiement automatique, retester l'import d'une image.
