import { produtos } from '../data/produtos'
import { ProductCard } from '../components/ProductCard'
import type { Produto } from '../types'
import { useCarrinho } from '../context/CarrinhoContext'

export function Home() {
  const { adicionarItem } = useCarrinho()

  function handleAdicionarCarrinho(produto: Produto) {
    adicionarItem(produto)
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      {/* Hero */}
      <section className="bg-neutral-900 px-6 py-20 text-center dark:bg-black">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
          Supere seus limites <span className="text-lime-400">todos os dias</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-neutral-300">
          Suplementos, acessórios e vestuário para quem leva o treino a sério.
        </p>
        <button className="mt-8 rounded-full bg-lime-400 px-8 py-3 font-bold text-neutral-900 transition-colors hover:bg-lime-300">
          Ver produtos
        </button>
      </section>

      {/* Grid de produtos */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 text-2xl font-bold text-neutral-900 dark:text-white">
          Mais vendidos
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {produtos.map((produto) => (
            <ProductCard
              key={produto.id}
              produto={produto}
              aoAdicionarCarrinho={handleAdicionarCarrinho}
            />
          ))}
        </div>
      </section>
    </div>
  )
}