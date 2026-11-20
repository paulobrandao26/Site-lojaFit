// Cada categoria ganha a cor de uma anilha olímpica
const CATEGORIAS: Record<string, { nome: string; cor: string }> = {
  suplementos: { nome: 'Suplementos', cor: 'bg-plate' },
  acessorios: { nome: 'Acessórios', cor: 'bg-plate-blue' },
  vestuario: { nome: 'Vestuário', cor: 'bg-plate-yellow' },
  calcados: { nome: 'Calçados', cor: 'bg-muted' },
}

export function infoCategoria(categoria: string) {
  const chave = categoria.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  return CATEGORIAS[chave] ?? { nome: categoria, cor: 'bg-muted' }
}
