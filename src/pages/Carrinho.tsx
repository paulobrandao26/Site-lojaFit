import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCarrinho } from '../context/CarrinhoContext'

export function Carrinho() {
  const { itens, removerItem, alterarQuantidade, totalPreco } = useCarrinho()

  if (itens.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-neutral-50 px-6 text-center dark:bg-neutral-950">
        <ShoppingBag className="h-16 w-16 text-neutral-300 dark:text-neutral-700" />
        <h1 className="text-xl font-bold text-neutral-900 dark:text-white">Seu carrinho está vazio</h1>
        <p className="text-neutral-500 dark:text-neutral-400">Adicione produtos para vê-los aqui.</p>
        <Link
          to="/produtos"
          className="mt-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-lime-400 hover:text-neutral-900 dark:bg-lime-500 dark:text-neutral-900 dark:hover:bg-lime-400"
        >
          Ver produtos
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="mb-8 text-2xl font-bold text-neutral-900 dark:text-white">Seu carrinho</h1>

        <div className="flex flex-col gap-4">
          {itens.map((item) => {
            const preco = item.produto.precoPromocional ?? item.produto.preco

            return (
              <div
                key={item.produto.id}
                className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
              >
                <img
                  src={item.produto.imagem}
                  alt={item.produto.nome}
                  className="h-20 w-20 rounded-xl bg-neutral-100 object-cover dark:bg-neutral-800"
                />

                <div className="flex flex-1 flex-col gap-1">
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {item.produto.nome}
                  </h3>
                  <span className="text-sm font-bold text-neutral-900 dark:text-white">
                    R$ {preco.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-2 py-1 dark:border-neutral-700">
                  <button
                    onClick={() => alterarQuantidade(item.produto.id, item.quantidade - 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-900 transition-colors hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-800"
                    aria-label="Diminuir quantidade"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-medium text-neutral-900 dark:text-white">
                    {item.quantidade}
                  </span>
                  <button
                    onClick={() => alterarQuantidade(item.produto.id, item.quantidade + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-900 transition-colors hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-800"
                    aria-label="Aumentar quantidade"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => removerItem(item.produto.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:text-neutral-500 dark:hover:bg-red-950 dark:hover:text-red-400"
                  aria-label="Remover item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )
          })}
        </div>

        <div className="mt-8 flex flex-col items-end gap-4 border-t border-neutral-200 pt-6 dark:border-neutral-800">
          <div className="flex items-center gap-3 text-lg">
            <span className="text-neutral-500 dark:text-neutral-400">Total:</span>
            <span className="font-bold text-neutral-900 dark:text-white">R$ {totalPreco.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className="rounded-full bg-neutral-900 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-lime-400 hover:text-neutral-900 dark:bg-lime-500 dark:text-neutral-900 dark:hover:bg-lime-400"
          >
            Finalizar compra
          </Link>
        </div>
      </div>
    </div>
  )
}