-- À exécuter une seule fois dans Supabase > SQL Editor
create table if not exists public.site_settings (
 id integer primary key default 1 check (id=1),
 hero_title text, hero_text text, shop_title text, shop_text text,
 about_title text, about_text text, vinted_url text,
 desktop_separate boolean default false,
 logo_url text, preview_mobile_url text, preview_desktop_url text,
 about_image_url text, social_image_url text,
 instagram_url text, instagram_enabled boolean default false,
 tiktok_url text, tiktok_enabled boolean default false,
 facebook_url text, facebook_enabled boolean default false,
 pinterest_url text, pinterest_enabled boolean default false,
 youtube_url text, youtube_enabled boolean default false,
 updated_at timestamptz default now()
);
insert into public.site_settings(id,hero_title,hero_text,shop_title,shop_text,about_title,about_text,vinted_url)
values(1,'De jolies trouvailles pour les petits 💛','Découvrez Boutchou Babioles et retrouvez les articles disponibles directement sur Vinted.','Nos articles sur Vinted','Découvrez un aperçu de notre boutique. Les prix et disponibilités à jour sont sur Vinted.','À propos de Boutchou Babioles','Bienvenue chez Boutchou Babioles.','https://www.vinted.fr/member/267314251') on conflict(id) do nothing;
alter table public.site_settings enable row level security;
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('site-media','site-media',true,8388608,array['image/jpeg','image/png','image/webp','image/gif'])
on conflict(id) do update set public=true,file_size_limit=8388608,allowed_mime_types=array['image/jpeg','image/png','image/webp','image/gif'];
