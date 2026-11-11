-- Caffè Ragi — restringe escrita em products a admins (rode no SQL Editor do Supabase)
--
-- Antes: qualquer usuário "authenticated" podia criar/editar/apagar produtos,
-- e o cadastro por e-mail estava aberto. Agora só quem estiver em public.admins.

create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

-- ninguém lê/escreve a tabela pela API; só o SQL Editor / service role mexe nela
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

-- cadastra o operador atual como admin
insert into public.admins (user_id)
select id from auth.users where email = 'admin@cafferagi.com'
on conflict do nothing;

-- troca as políticas abertas por políticas só de admin
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
