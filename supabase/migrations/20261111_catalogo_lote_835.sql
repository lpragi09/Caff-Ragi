-- Caffè Ragi — catálogo do lote L-087396/26 (83,5 pontos, 500g e 1kg)
-- Rode no SQL Editor do Supabase.

-- pontuação com casa decimal (83,5) e novo peso de 1kg
alter table public.products
  alter column points type numeric(4,2) using points::numeric;

alter table public.products drop constraint if exists products_weight_check;
alter table public.products
  add constraint products_weight_check check (weight in ('250g', '500g', '1kg'));

-- esconde todos os anúncios antigos (85/75 pontos, inclusive renomeados) sem apagar
update public.products set active = false
where title not like 'Caffè Ragi Especial — %';

insert into public.products (title, points, category, weight, intensity, acidez, corpo, description, mercado_livre_link)
select v.* from (values
  ('Caffè Ragi Especial — 500g', 83.5, 'especial', '500g', 4, 'Cítrica', 'Encorpado', 'Notas de chocolate e frutas cítricas, doçura alta e xícara limpa. Lote avaliado com 83,5 pontos na escala SCA.', '#'),
  ('Caffè Ragi Especial — 1kg',  83.5, 'especial', '1kg',  4, 'Cítrica', 'Encorpado', 'Notas de chocolate e frutas cítricas, doçura alta e xícara limpa. Lote avaliado com 83,5 pontos na escala SCA.', '#')
) as v(title, points, category, weight, intensity, acidez, corpo, description, mercado_livre_link)
where not exists (select 1 from public.products p where p.title = v.title);
