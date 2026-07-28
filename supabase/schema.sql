-- Caffè Ragi — schema de produtos (rode no SQL Editor do Supabase)

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  points smallint not null check (points between 0 and 100),
  category text not null check (category in ('especial', 'gourmet')),
  weight text not null check (weight in ('250g', '500g')),
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

-- o operador logado (painel de admin) enxerga tudo, inclusive inativos
drop policy if exists "admin read all products" on public.products;
create policy "admin read all products"
  on public.products for select
  to authenticated
  using (true);

drop policy if exists "admin insert products" on public.products;
create policy "admin insert products"
  on public.products for insert
  to authenticated
  with check (true);

drop policy if exists "admin update products" on public.products;
create policy "admin update products"
  on public.products for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "admin delete products" on public.products;
create policy "admin delete products"
  on public.products for delete
  to authenticated
  using (true);

-- popula com os 4 anúncios que já estão no site hoje
insert into public.products (title, points, category, weight, intensity, acidez, corpo, description, mercado_livre_link)
values
  ('Caffè Ragi 85 Pontos — 250g', 85, 'especial', '250g', 4, 'Equilibrada', 'Encorpado', 'Chocolate, caramelo e frutas cítricas em um café encorpado e equilibrado.', '#'),
  ('Caffè Ragi 85 Pontos — 500g', 85, 'especial', '500g', 4, 'Equilibrada', 'Encorpado', 'Chocolate, caramelo e frutas cítricas em um café encorpado e equilibrado.', '#'),
  ('Caffè Ragi 75 Pontos — 250g', 75, 'gourmet', '250g', 3, 'Leve', 'Médio', 'Café tradicional, doçura suave e leve amargor para o dia a dia.', '#'),
  ('Caffè Ragi 75 Pontos — 500g', 75, 'gourmet', '500g', 3, 'Leve', 'Médio', 'Café tradicional, doçura suave e leve amargor para o dia a dia.', '#')
on conflict do nothing;
