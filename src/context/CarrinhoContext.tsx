import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Produto, ItemCarrinho } from '../types'

interface CarrinhoContextType {
  itens: ItemCarrinho[]
  adicionarItem: (produto: Produto) => void
  removerItem: (produtoId: string) => void
  alterarQuantidade: (produtoId: string, quantidade: number) => void
  totalItens: number
  totalPreco: number
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined)

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([])

  function adicionarItem(produto: Produto) {
    setItens((itensAtuais) => {
      const itemExistente = itensAtuais.find((item) => item.produto.id === produto.id)

      if (itemExistente) {
        return itensAtuais.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      }

      return [...itensAtuais, { produto, quantidade: 1 }]
    })
  }

  function removerItem(produtoId: string) {
    setItens((itensAtuais) => itensAtuais.filter((item) => item.produto.id !== produtoId))
  }

  function alterarQuantidade(produtoId: string, quantidade: number) {
    if (quantidade <= 0) {
      removerItem(produtoId)
      return
    }
    setItens((itensAtuais) =>
      itensAtuais.map((item) =>
        item.produto.id === produtoId ? { ...item, quantidade } : item
      )
    )
  }

  const totalItens = itens.reduce((total, item) => total + item.quantidade, 0)

  const totalPreco = itens.reduce((total, item) => {
    const preco = item.produto.precoPromocional ?? item.produto.preco
    return total + preco * item.quantidade
  }, 0)

  return (
    <CarrinhoContext.Provider
      value={{ itens, adicionarItem, removerItem, alterarQuantidade, totalItens, totalPreco }}
    >
      {children}
    </CarrinhoContext.Provider>
  )
}

export function useCarrinho() {
  const context = useContext(CarrinhoContext)
  if (!context) {
    throw new Error('useCarrinho precisa ser usado dentro de um CarrinhoProvider')
  }
  return context
}