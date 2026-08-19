import { useParams } from 'react-router-dom'
import { produtos } from '../data/produtos'
import { useCarrinho } from '../context/CarrinhoContext'

export function ProdutoDetalhe() {
  const { id } = useParams()
  const produto = produtos.find((p) => p.id === id)
  const { adicionarItem } = useCarrinho()

  if (!produto) {
    return <p className="p-10 text-center text-neutral-900 dark:text-white">Produto não encontrado.</p>
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2">
          <img
            src={produto.imagem}
            alt={produto.nome}
            className="rounded-2xl bg-neutral-100 dark:bg-neutral-800"
          />
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">{produto.nome}</h1>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">{produto.descricao}</p>
            <p className="mt-6 text-3xl font-bold text-neutral-900 dark:text-white">
              R$ {(produto.precoPromocional ?? produto.preco).toFixed(2)}
            </p>
            <button
              onClick={() => adicionarItem(produto)}
              className="mt-6 rounded-full bg-neutral-900 px-8 py-3 font-bold text-white transition-colors hover:bg-lime-400 hover:text-neutral-900 dark:bg-lime-500 dark:text-neutral-900 dark:hover:bg-lime-400"
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}