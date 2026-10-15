import { useEffect, useState } from 'react';
import { Hero3D } from '../components/Hero3D';
import { ProductCarousel } from '../components/ProductCarousel';
import { ProteinScroll } from '../components/ProteinScroll';
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

  const maisVendidos = produtos.filter(
    (produto) => produto.avaliacao && produto.avaliacao >= 4.5,
  )

  const emPromocao = produtos.filter(
    (produto) =>
      produto.precoPromocional !== undefined &&
      produto.precoPromocional !== null,
  )

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-50 transition-colors duration-300 dark:bg-neutral-950">
      {/* Hero com animações estilo Bulletproof */}
      <Hero3D />

      {/* Scroll de produtos mais vendidos */}
      {!carregando && !erro && maisVendidos.length > 0 && (
        <ProteinScroll
          produtos={maisVendidos}
          aoAdicionarCarrinho={(produto: Produto) => adicionarItem(produto)}
        />
      )}

      {/* Seção de produtos em promoção */}
      <div className="relative bg-neutral-50 pt-8 dark:bg-neutral-950">
        {carregando && (
          <p className="py-16 text-center text-neutral-500 dark:text-neutral-400">
            Carregando produtos...
          </p>
        )}

        {erro && (
          <p role="alert" className="px-6 py-16 text-center text-red-600 dark:text-red-400">
            Não foi possível carregar os produtos agora. Tente novamente em alguns instantes.
          </p>
        )}

        {!carregando && !erro && emPromocao.length > 0 && (
          <ProductCarousel
            titulo="Ofertas"
            produtos={emPromocao}
            aoAdicionarCarrinho={(produto: Produto) => adicionarItem(produto)}
          />
        )}
      </div>
    </main>
  )
}