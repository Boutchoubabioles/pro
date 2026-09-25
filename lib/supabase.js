const base=process.env.NEXT_PUBLIC_SUPABASE_URL;
const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
export function configured(){return !!(base&&key)}
export async function rest(path,options={}){
 if(!configured()) throw new Error('Supabase non configuré');
 return fetch(`${base}/rest/v1/${path}`,{...options,headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json',...(options.headers||{})},cache:'no-store'});
}
export async function getSettings(){
 const defaults={hero_title:'De jolies trouvailles pour les petits 💛',hero_text:'Découvrez Boutchou Babioles et retrouvez les articles disponibles directement sur Vinted.',shop_title:'Nos articles sur Vinted',shop_text:'Découvrez un aperçu de notre boutique. Les prix et disponibilités à jour sont sur Vinted.',about_title:'À propos de Boutchou Babioles',about_text:'Bienvenue chez Boutchou Babioles.',vinted_url:'https://www.vinted.fr/member/267314251',desktop_separate:false,logo_url:'',preview_mobile_url:'',preview_desktop_url:'',about_image_url:'',social_image_url:'',instagram_url:'',instagram_enabled:false,tiktok_url:'',tiktok_enabled:false,facebook_url:'',facebook_enabled:false,pinterest_url:'',pinterest_enabled:false,youtube_url:'',youtube_enabled:false};
 if(!configured()) return defaults;
 try{const r=await rest('site_settings?id=eq.1&select=*');if(!r.ok)return defaults;const a=await r.json();return {...defaults,...(a[0]||{})}}catch{return defaults}
}
