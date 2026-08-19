export interface Produto {
  id: string
  nome: string
  descricao: string
  preco: number
  precoPromocional?: number
  imagem: string
  categoria: string
  estoque: number
  avaliacao?: number
}

export interface ItemCarrinho {
  produto: Produto
  quantidade: number
}

export interface Afiliado {
  id: string
  nome: string
  email: string
  codigoAfiliado: string
  comissaoPercentual: number
  vendasTotais?: number
}

export interface EnderecoEntrega {
  cep: string
  rua: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  estado: string
}