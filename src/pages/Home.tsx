import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HeroProtein } from '../components/HeroProtein';
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
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[520px] lg:h-[560px]">
        <img src="/fit-embaca.avif" alt="" className="h-full w-full object-cover opacity-70 blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-neutral-50 dark:from-black/60 dark:via-neutral-950/40 dark:to-neutral-950" />
      </div>

      <section className="relative mx-auto max-w-[1440px] px-4 pb-8 pt-5 sm:px-6 lg:px-10 lg:pb-12 lg:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="relative isolate grid overflow-hidden rounded-3xl border border-white/10 bg-black/45 backdrop-blur-sm lg:grid-cols-2 lg:items-center"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_80%_20%,rgba(190,242,100,0.18),transparent_60%)]" />

          <div className="relative max-w-2xl px-6 pb-6 pt-12 sm:px-10 lg:px-16 lg:py-20">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-lime-300 sm:text-sm">
              Loja Fit · Treino e bem-estar
            </p>

            <h1 className="max-w-xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Seu treino.
              <br />
              Seu próximo nível.
            </h1>

            <p className="mt-5 max-w-md text-base leading-7 text-white/80 sm:text-lg">
              Suplementos e acessórios para acompanhar você em cada treino.
            </p>

            <Link
              to="/produtos"
              className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-lime-400 px-6 py-3 text-sm font-bold text-neutral-950 transition duration-200 hover:-translate-y-0.5 hover:bg-lime-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-300"
            >
              Explorar produtos
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative px-6 pb-12 lg:px-10 lg:py-12">
            <HeroProtein />
          </div>
        </motion.div>
      </section>

      {!carregando && !erro && (
        <ProteinScroll
          produtos={maisVendidos}
          aoAdicionarCarrinho={(produto: Produto) => adicionarItem(produto)}
        />
      )}

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