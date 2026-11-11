-- Caffè Ragi — moagem (moído / em grãos) e os 4 cafés do catálogo
-- Rode no SQL Editor do Supabase.

alter table public.products
  add column if not exists moagem text not null default 'moido'
  check (moagem in ('moido', 'graos'));

-- os dois que já existem viram "Moído"
update public.products set title = 'Caffè Ragi Especial — 500g Moído', moagem = 'moido'
where title = 'Caffè Ragi Especial — 500g';

update public.products set title = 'Caffè Ragi Especial — 1kg Moído', moagem = 'moido'
where title = 'Caffè Ragi Especial — 1kg';

-- novos: em grãos
insert into public.products (title, points, category, weight, moagem, intensity, acidez, corpo, description, mercado_livre_link)
select v.* from (values
  ('Caffè Ragi Especial — 500g em Grãos', 83.5, 'especial', '500g', 'graos', 4, 'Cítrica', 'Encorpado', 'Notas de chocolate e frutas cítricas, doçura alta e xícara limpa. Lote avaliado com 83,5 pontos na escala SCA.', '#'),
  ('Caffè Ragi Especial — 1kg em Grãos',  83.5, 'especial', '1kg',  'graos', 4, 'Cítrica', 'Encorpado', 'Notas de chocolate e frutas cítricas, doçura alta e xícara limpa. Lote avaliado com 83,5 pontos na escala SCA.', '#')
) as v(title, points, category, weight, moagem, intensity, acidez, corpo, description, mercado_livre_link)
where not exists (select 1 from public.products p where p.title = v.title);

-- conferência: devem aparecer 4 ativos
select title, weight, moagem, active from public.products where active order by weight desc, moagem desc;
