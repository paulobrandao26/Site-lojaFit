import { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { useCarrinho } from '../context/CarrinhoContext';
import { buscarProdutos } from '../data/api';
import type { Produto } from '../types';

export function Produtos() {
  const { adicionarItem } = useCarrinho()
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    buscarProdutos()
      .then((dados) => setProdutos(dados))
      .finally(() => setCarregando(false))
  }, [])

  function handleAdicionarCarrinho(produto: Produto) {
    adicionarItem(produto)
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 px-6 py-16 transition-colors duration-300">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-2xl font-bold text-neutral-900 dark:text-white">
          Todos os produtos
        </h1>

        {carregando ? (
          <p className="text-neutral-500 dark:text-neutral-400">Carregando produtos...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {produtos.map((produto) => (
              <ProductCard
                key={produto.id}
                produto={produto}
                aoAdicionarCarrinho={handleAdicionarCarrinho}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}