// Dados do laudo sensorial do lote atual (análise QC-12881, 21/09/2026).
// Quando chegar um lote novo, atualize só este arquivo.
export const LOTE = {
  codigo: "L-087396/26",
  pontuacao: 83.5,
  dataAnalise: "2026-09-21",
  notas: ["Chocolate", "Frutas cítricas"],
  peneira: "47% peneira 17 acima",
  // escala SCA: atributos de 0 a 10
  atributos: [
    { label: "Fragrância / Aroma", value: 7.5 },
    { label: "Sabor", value: 7.75 },
    { label: "Finalização", value: 7.5 },
    { label: "Acidez", value: 7.75 },
    { label: "Corpo", value: 7.75 },
    { label: "Equilíbrio", value: 7.5 },
    { label: "Doçura", value: 10 },
    { label: "Xícara limpa", value: 10 },
    { label: "Uniformidade", value: 10 },
    { label: "Nota geral", value: 7.75 },
  ],
} as const;

export function formatPoints(points: number) {
  return points.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
}
