import { Link } from 'react-router-dom'
import type { Produto } from '../types'
import { ShoppingCart, Star } from 'lucide-react'

interface ProductCardProps {
  produto: Produto
  aoAdicionarCarrinho?: (produto: Produto) => void
}

export function ProductCard({ produto, aoAdicionarCarrinho }: ProductCardProps) {
  const temPromocao = produto.precoPromocional !== undefined

  function handleAdicionarCarrinho(e: React.MouseEvent) {
    e.preventDefault()
    aoAdicionarCarrinho?.(produto)
  }

  return (
    <Link
      to={`/produtos/${produto.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-neutral-200 transition-all hover:shadow-lg hover:-translate-y-1 dark:bg-neutral-900 dark:border-neutral-800"
    >
      {temPromocao && (
        <span className="absolute top-3 left-3 z-10 rounded-full bg-lime-400 px-3 py-1 text-xs font-bold text-neutral-900">
          OFERTA
        </span>
      )}

      <div className="aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
          {produto.categoria}
        </span>

        <h3 className="text-sm font-semibold text-neutral-900 line-clamp-2 dark:text-white">
          {produto.nome}
        </h3>

        {produto.avaliacao && (
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-lime-500 text-lime-500" />
            <span className="text-xs text-neutral-500 dark:text-neutral-400">{produto.avaliacao}</span>
          </div>
        )}

        <div className="mt-auto flex items-end justify-between pt-2">
          <div className="flex flex-col">
            {temPromocao && (
              <span className="text-xs text-neutral-400 line-through dark:text-neutral-500">
                R$ {produto.preco.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-bold text-neutral-900 dark:text-white">
              R$ {(produto.precoPromocional ?? produto.preco).toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAdicionarCarrinho}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-white transition-colors hover:bg-lime-500 hover:text-neutral-900 dark:bg-lime-500 dark:text-neutral-900 dark:hover:bg-lime-400"
            aria-label={`Adicionar ${produto.nome} ao carrinho`}
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Link>
  )
}