import { ArrowRight, Lock, RefreshCw, Tag, UserX } from 'lucide-react';
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ProductRevealCard } from '../components/ui/ProductRevealCard';
import { useCarrinho } from '../context/CarrinhoContext';
import { buscarProdutos } from '../data/api';
import { infoCategoria } from '../lib/categoria';
import type { Produto } from '../types';

function Secao({ titulo, link, children }: { titulo: string; link?: { to: string; texto: string }; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="font-display text-balance text-2xl text-ink sm:text-3xl">{titulo}</h2>
        {link && (
          <Link to={link.to} className="flex shrink-0 items-center gap-1 text-sm font-semibold text-ink underline-offset-4 hover:underline">
            {link.texto} <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        )}
      </div>
      {children}
    </section>
  )
}

function Grade({ produtos, aoAdicionar }: { produtos: Produto[]; aoAdicionar: (p: Produto) => void }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
      {produtos.map((p) => (
        <ProductRevealCard key={p.id} produto={p} aoAdicionarCarrinho={aoAdicionar} />
      ))}
    </div>
  )
}

export function Home() {
  const { adicionarItem } = useCarrinho()
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(false)

  const carregar = useCallback(() => {
    setCarregando(true)
    setErro(false)
    buscarProdutos()
      .then((dados) => setProdutos(dados))
      .catch(() => setErro(true))
      .finally(() => setCarregando(false))
  }, [])

  useEffect(() => {
    carregar()
  }, [carregar])

  const emPromocao = produtos.filter((p) => p.precoPromocional != null && p.precoPromocional < p.preco)
  const maisVendidos = produtos.filter((p) => p.avaliacao != null && p.avaliacao >= 4.5)
  const categorias = [...new Set(produtos.map((p) => p.categoria))]
  // Maior desconto real entre os produtos (nada inventado)
  const maiorDesconto = emPromocao.reduce(
    (max, p) => Math.max(max, Math.round((1 - p.precoPromocional! / p.preco) * 100)),
    0,
  )

  return (
    <main className="min-h-screen bg-ground">
      {/* Hero: foto grande e estática */}
      <section className="relative isolate overflow-hidden bg-dark">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=2000&q=70&auto=format&fit=crop"
          alt=""
          width={2000}
          height={1333}
          fetchPriority="high"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="mx-auto flex min-h-[560px] max-w-[1280px] flex-col justify-center px-6 py-20 lg:min-h-[640px]">
          <h1 className="font-display max-w-2xl text-balance text-5xl leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            Treine com o que funciona.
          </h1>
          <p className="mt-5 max-w-md text-lg text-white/80">
            Suplementos, acessórios e roupas de treino num só lugar.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/produtos"
              className="inline-flex h-12 items-center rounded bg-white px-7 text-sm font-semibold uppercase tracking-wide text-black transition-colors hover:bg-white/85"
            >
              Comprar agora
            </Link>
            {emPromocao.length > 0 && (
              <a
                href="#ofertas"
                className="inline-flex h-12 items-center rounded border border-white/60 px-7 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
              >
                Ver ofertas
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Faixa de vantagens (só fatos reais) */}
      <section aria-label="Vantagens" className="border-b border-line">
        <ul className="mx-auto grid max-w-[1280px] gap-px bg-line sm:grid-cols-3">
          {[
            { icone: <Lock className="h-5 w-5" />, titulo: 'Pagamento seguro', texto: 'Cartão pela Stripe' },
            ...(maiorDesconto > 0
              ? [{ icone: <Tag className="h-5 w-5" />, titulo: `Até ${maiorDesconto}% de desconto`, texto: 'Em produtos selecionados' }]
              : []),
            { icone: <UserX className="h-5 w-5" />, titulo: 'Sem cadastro', texto: 'Compre só com nome e e-mail' },
          ].map((v) => (
            <li key={v.titulo} className="flex items-center gap-4 bg-ground px-6 py-5">
              <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface text-ink">
                {v.icone}
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">{v.titulo}</span>
                <span className="text-sm text-muted">{v.texto}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {carregando && (
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-4 px-6 py-16 lg:grid-cols-4" aria-label="Carregando produtos…">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] animate-pulse rounded bg-surface" />
          ))}
        </div>
      )}

      {erro && (
        <div role="alert" className="mx-auto max-w-md px-6 py-20 text-center">
          <p className="font-semibold text-ink">Os produtos não carregaram.</p>
          <p className="mt-1 text-sm text-muted">Verifique sua conexão e tente de novo.</p>
          <button
            onClick={carregar}
            className="mt-5 inline-flex h-12 items-center gap-2 rounded bg-plate px-6 text-sm font-semibold text-onplate hover:bg-plate-dark"
          >
            <RefreshCw className="h-4 w-4" /> Tentar de novo
          </button>
        </div>
      )}

      {!carregando && !erro && (
        <>
          {emPromocao.length > 0 && (
            <div id="ofertas" className="scroll-mt-20">
              <Secao titulo="Ofertas" link={{ to: '/produtos', texto: 'Ver tudo' }}>
                <Grade produtos={emPromocao.slice(0, 4)} aoAdicionar={adicionarItem} />
              </Secao>
            </div>
          )}

          {categorias.length > 0 && (
            <Secao titulo="Compre por categoria">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                {categorias.map((c) => {
                  const info = infoCategoria(c)
                  const capa = produtos.find((p) => p.categoria === c)
                  return (
                    <Link
                      key={c}
                      to={`/produtos?categoria=${encodeURIComponent(c)}`}
                      className="group relative block aspect-[4/5] overflow-hidden rounded bg-surface"
                    >
                      {capa && (
                        <img
                          src={capa.imagem}
                          alt=""
                          width={600}
                          height={750}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      )}
                      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-16">
                        <span className="block text-lg font-semibold text-white">{info.nome}</span>
                        <span className="text-sm text-white/80 underline-offset-4 group-hover:underline">Ver produtos</span>
                      </span>
                    </Link>
                  )
                })}
              </div>
            </Secao>
          )}

          {maisVendidos.length > 0 && (
            <Secao titulo="Mais bem avaliados" link={{ to: '/produtos', texto: 'Ver tudo' }}>
              <Grade produtos={maisVendidos.slice(0, 4)} aoAdicionar={adicionarItem} />
            </Secao>
          )}
        </>
      )}

      {/* Faixa escura com chamada final */}
      <section className="bg-dark">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-6 px-6 py-14 sm:flex-row sm:items-center">
          <h2 className="font-display text-balance text-2xl text-on-dark sm:text-3xl">Monte seu kit de treino hoje.</h2>
          <Link
            to="/produtos"
            className="inline-flex h-12 items-center rounded bg-white px-7 text-sm font-semibold uppercase tracking-wide text-black transition-colors hover:bg-white/85"
          >
            Ver todos os produtos
          </Link>
        </div>
      </section>
    </main>
  )
}
