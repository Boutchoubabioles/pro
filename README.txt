CORRECTIF LOGO + BOUTON « ACTUALISER L’APERÇU VINTED »

Remplacer dans GitHub :
- app/style.css
- app/admin/page.js
- app/api/vinted-preview/route.js
- app/api/upload/route.js
- lib/supabase.js

1. Le logo est affiché beaucoup plus grand dans l'en-tête.
2. « Actualiser l'aperçu Vinted » tente maintenant une vraie capture de la page publique Vinted.
3. Si la capture réussit, elle est enregistrée dans Supabase et devient automatiquement la capture ordinateur.
4. Si Vinted ou le service de capture refuse, l'ancienne image Supabase reste inchangée.
5. L'import manuel depuis le téléphone reste disponible.
6. Aucune nouvelle variable Vercel n'est nécessaire pour ce test.

Le service de capture utilisé pour ce test possède une limite gratuite. Si Vinted bloque le navigateur distant, le bouton affichera simplement l'échec et conservera la dernière image.
