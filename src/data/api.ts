import type { Produto } from '../types';

const API_URL = 'http://localhost:3000'

export async function buscarProdutos(): Promise<Produto[]> {
  const resposta = await fetch(`${API_URL}/produtos`)
  if (!resposta.ok) {
    throw new Error('Erro ao buscar produtos')
  }
  return resposta.json()
}

export async function buscarProdutoPorId(id: string): Promise<Produto | null> {
  const resposta = await fetch(`${API_URL}/produtos/${id}`)
  if (!resposta.ok) {
    return null
  }
  return resposta.json()
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