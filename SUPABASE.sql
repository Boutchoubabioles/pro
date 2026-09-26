create table if not exists public.product_visibility (
  product_id text primary key,
  visible boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.product_visibility enable row level security;
-- Aucun accès navigateur direct : les lectures/écritures passent par les routes serveur avec la service role.
