-- Caffè Ragi — schema de produtos (rode no SQL Editor do Supabase)

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  points numeric(4,2) not null check (points between 0 and 100),
  category text not null check (category in ('especial', 'gourmet')),
  weight text not null check (weight in ('250g', '500g', '1kg')),
  intensity smallint not null check (intensity between 1 and 5),
  acidez text not null,
  corpo text not null,
  description text not null default '',
  mercado_livre_link text not null default '',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

alter table public.products enable row level security;

-- qualquer visitante do site só enxerga anúncios ativos
drop policy if exists "public read active products" on public.products;
create policy "public read active products"
  on public.products for select
  to anon, authenticated
  using (active = true);

-- escrita e leitura de inativos: só admins (tabela public.admins + is_admin())
-- ver supabase/migrations/20261111_admin_only.sql
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;
revoke all on public.admins from anon, authenticated;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admins where user_id = (select auth.uid())
  );
$$;
revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

drop policy if exists "admin read all products" on public.products;
create policy "admin read all products"
  on public.products for select
  to authenticated
  using ((select public.is_admin()));

drop policy if exists "admin insert products" on public.products;
create policy "admin insert products"
  on public.products for insert
  to authenticated
  with check ((select public.is_admin()));

drop policy if exists "admin update products" on public.products;
create policy "admin update products"
  on public.products for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "admin delete products" on public.products;
create policy "admin delete products"
  on public.products for delete
  to authenticated
  using ((select public.is_admin()));

-- depois de criar o usuário admin no Auth:
-- insert into public.admins (user_id) select id from auth.users where email = '<email>';

-- popula com o lote atual (laudo L-087396/26, 83,5 pontos)
insert into public.products (title, points, category, weight, intensity, acidez, corpo, description, mercado_livre_link)
values
  ('Caffè Ragi Especial — 500g', 83.5, 'especial', '500g', 4, 'Cítrica', 'Encorpado', 'Notas de chocolate e frutas cítricas, doçura alta e xícara limpa. Lote avaliado com 83,5 pontos na escala SCA.', '#'),
  ('Caffè Ragi Especial — 1kg', 83.5, 'especial', '1kg', 4, 'Cítrica', 'Encorpado', 'Notas de chocolate e frutas cítricas, doçura alta e xícara limpa. Lote avaliado com 83,5 pontos na escala SCA.', '#')
on conflict do nothing;
