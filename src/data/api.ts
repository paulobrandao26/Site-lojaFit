import type { Produto } from '../types';

const API_URL = 'https://loja-fit-worker.paulobrandaohbb.workers.dev'

function comImagemLocal(produto: Produto): Produto {
  const nome = produto.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  if (nome.includes('whey') || nome.includes('whay'))
    return { ...produto, imagem: '/whayprod.jpg' }
  if (nome.includes('creatina'))
    return { ...produto, imagem: '/creatinaprod.jpg' }
  if (nome.includes('elast'))
    return { ...produto, imagem: '/elasticoprod.jpg' }
  if (nome.includes('camis') || nome.includes('dry'))
    return { ...produto, imagem: '/camisaprod.jpg' }
  if (nome.includes('coquet'))
    return { ...produto, imagem: '/coqueteira.jpg' }
  if (nome.includes('tenis') || nome.includes('sapato') || nome.includes('calcado'))
    return { ...produto, imagem: '/sapato.jpg' }
  return produto
}

export async function buscarProdutos(): Promise<Produto[]> {
  const resposta = await fetch(`${API_URL}/produtos`)
  if (!resposta.ok) {
    throw new Error('Erro ao buscar produtos')
  }
  const dados = await resposta.json()
  return (dados as Produto[]).map(comImagemLocal)
}

export async function buscarProdutoPorId(id: string): Promise<Produto | null> {
  const resposta = await fetch(`${API_URL}/produtos/${id}`)
  if (!resposta.ok) {
    return null
  }
  const dados = await resposta.json()
  return comImagemLocal(dados as Produto)
}
interface ItemPedidoPayload {
  produtoId: string
  nomeProduto: string
  precoUnitario: number
  quantidade: number
}

interface CriarPedidoPayload {
  nomeCliente: string
  emailCliente: string
  cep: string
  rua: string
  numero: string
  bairro: string
  cidade: string
  estado: string
  total: number
  itens: ItemPedidoPayload[]
}

export async function criarPedido(dados: CriarPedidoPayload) {
  const resposta = await fetch(`${API_URL}/pedidos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  })
  if (!resposta.ok) {
    throw new Error('Erro ao criar pedido')
  }
  return resposta.json()
}

interface ItemCheckoutPayload {
  produtoId: string
  quantidade: number
}

export async function criarSessaoPagamento(itens: ItemCheckoutPayload[], pedidoId: string) {
  const resposta = await fetch(`${API_URL}/pagamentos/criar-sessao`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ itens, pedidoId }),
  })
  if (!resposta.ok) {
    throw new Error('Erro ao criar sessão de pagamento')
  }
  return resposta.json()
}

interface RegisterPayload {
  nome: string
  email: string
  senha: string
  telefone: string
}

interface LoginPayload {
  email: string
  senha: string
}

interface AuthResponse {
  access_token: string
  usuario: { id: string; email: string; nome: string }
}

export async function registrar(dados: RegisterPayload): Promise<AuthResponse> {
  const resposta = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  })
  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => null)
    throw new Error(erro?.message || 'Erro ao criar conta')
  }
  return resposta.json()
}

export async function login(dados: LoginPayload): Promise<AuthResponse> {
  const resposta = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  })
  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => null)
    throw new Error(erro?.message || 'E-mail ou senha inválidos')
  }
  return resposta.json()
}