import { useEffect, useState } from 'react';
import { ProductCarousel } from '../components/ProductCarousel';
import { useCarrinho } from '../context/CarrinhoContext';
import { buscarProdutos } from '../data/api';
import type { Produto } from '../types';

export function Home() {
  const { adicionarItem } = useCarrinho()
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(false)

  useEffect(() => {
    buscarProdutos()
      .then((dados) => setProdutos(dados))
      .catch(() => setErro(true))
      .finally(() => setCarregando(false))
  }, [])

  function handleAdicionarCarrinho(produto: Produto) {
    adicionarItem(produto)
  }

  const maisVendidos = produtos.filter((p) => p.avaliacao && p.avaliacao >= 4.5)
  const emPromocao = produtos.filter((p) => p.precoPromocional !== undefined && p.precoPromocional !== null)

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

      {carregando && (
        <p className="py-16 text-center text-neutral-500 dark:text-neutral-400">Carregando produtos...</p>
      )}

      {erro && (
        <p className="py-16 text-center text-red-500">
          Não foi possível carregar os produtos. Verifique se o backend está rodando.
        </p>
      )}

      {!carregando && !erro && (
        <>
          <ProductCarousel
            titulo="Mais vendidos"
            produtos={maisVendidos}
            aoAdicionarCarrinho={handleAdicionarCarrinho}
          />

          {emPromocao.length > 0 && (
            <ProductCarousel
              titulo="Ofertas do dia"
              produtos={emPromocao}
              aoAdicionarCarrinho={handleAdicionarCarrinho}
            />
          )}
        </>
      )}
    </div>
  )
}