import { produtos } from '../data/produtos'
import { ProductCard } from '../components/ProductCard'
import type { Produto } from '../types'
import { useCarrinho } from '../context/CarrinhoContext';

export function Produtos() {
  const { adicionarItem } = useCarrinho()

function handleAdicionarCarrinho(produto: Produto) {
  adicionarItem(produto)
}

  return (
    <div className="min-h-screen bg-neutral-50 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-2xl font-bold text-neutral-900">
          Todos os produtos
        </h1>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {produtos.map((produto) => (
            <ProductCard
              key={produto.id}
              produto={produto}
              aoAdicionarCarrinho={handleAdicionarCarrinho}
            />
          ))}
        </div>
      </div>
    </div>
  )
}