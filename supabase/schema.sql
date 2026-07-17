-- K+A Mármoles — Supabase schema (mismo playbook que Alegría: RLS on, lectura pública, escritura solo service_role)

create table if not exists public.productos (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nombre text not null,
  categoria text not null check (categoria in ('mesas-comedor','mesas-centro','escritorios','estanterias')),
  tipo_marmol text not null,
  tono text not null check (tono in ('blanco','negro','travertino','verde','gris')),
  dimensiones text not null default 'Sobre pedido',
  descripcion text not null default '',
  imagenes text[] not null default '{}',
  destacado boolean not null default false,
  creado_en timestamptz not null default now()
);

alter table public.productos enable row level security;

drop policy if exists "lectura publica productos" on public.productos;
create policy "lectura publica productos"
  on public.productos for select
  to anon, authenticated
  using (true);

-- Escritura: sin políticas para anon/authenticated => solo service_role (scripts de terminal).

-- Storage: crear bucket 'productos' desde el dashboard o script, público de lectura.
-- Ejemplo de política de lectura para el bucket:
--   create policy "lectura publica imagenes" on storage.objects
--     for select to anon, authenticated using (bucket_id = 'productos');
