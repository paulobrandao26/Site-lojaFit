import { useSearchParams } from 'react-router-dom';
import { RefreshCw, Search } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ProductRevealCard } from '../components/ui/ProductRevealCard';
import { useCarrinho } from '../context/CarrinhoContext';
import { buscarProdutos } from '../data/api';
import { infoCategoria } from '../lib/categoria';
import type { Produto } from '../types';

function CardEsqueleto() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="h-56 bg-line" />
      <div className="space-y-2 p-4">
        <div className="h-3 w-1/3 rounded bg-line" />
        <div className="h-4 w-3/4 rounded bg-line" />
        <div className="h-5 w-1/2 rounded bg-line" />
      </div>
    </div>
  )
}

export function Produtos() {
  const { adicionarItem } = useCarrinho()
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(false)
  // Categoria fica no endereço (dá para compartilhar o link filtrado)
  const [params, setParams] = useSearchParams()
  const categoria = params.get('categoria') ?? 'todos'
  const setCategoria = (c: string) => setParams(c === 'todos' ? {} : { categoria: c }, { replace: true })
  const [busca, setBusca] = useState('')

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

  const categorias = useMemo(
    () => ['todos', ...new Set(produtos.map((p) => p.categoria))],
    [produtos],
  )

  const filtrados = produtos.filter((p) => {
    const naCategoria = categoria === 'todos' || p.categoria === categoria
    const naBusca = p.nome.toLowerCase().includes(busca.trim().toLowerCase())
    return naCategoria && naBusca
  })

  return (
    <div className="min-h-screen bg-ground">
      <section className="border-b border-line px-6 pb-10 pt-12">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="font-display text-[clamp(2.25rem,10.5vw,6rem)] text-ink">
              <span className="bloco-destaque">Produtos</span>
            </h1>
            <p className="mt-4 max-w-xl text-muted">
              Suplementos, acessórios e roupas de treino.
            </p>
          </div>

          <label className="flex w-full max-w-sm items-center gap-3 rounded-lg border border-line bg-surface px-5 py-3 text-ink focus-within:border-plate">
            <Search className="h-4 w-4 text-muted" />
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar produto..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </label>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-10">
        {!carregando && !erro && categorias.length > 2 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {categorias.map((c) => (
              <button
                key={c}
                onClick={() => setCategoria(c)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  categoria === c
                    ? 'bg-plate text-onplate'
                    : 'border border-line text-ink hover:border-plate'
                }`}
              >
                {c === 'todos' ? 'Todos' : infoCategoria(c).nome}
              </button>
            ))}
          </div>
        )}

        {carregando && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <CardEsqueleto key={i} />
            ))}
          </div>
        )}

        {erro && (
          <div role="alert" className="mx-auto max-w-md rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/30">
            <p className="font-semibold text-red-700 dark:text-red-300">
              Não foi possível carregar os produtos agora.
            </p>
            <p className="mt-1 text-sm text-red-600/80 dark:text-red-400/80">Tente novamente em alguns instantes.</p>
            <button
              onClick={carregar}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-bold text-ground hover:bg-plate hover:text-onplate"
            >
              <RefreshCw className="h-4 w-4" /> Tentar de novo
            </button>
          </div>
        )}

        {!carregando && !erro && filtrados.length === 0 && (
          <p className="py-16 text-center text-muted">Nenhum produto encontrado.</p>
        )}

        {!carregando && !erro && filtrados.length > 0 && (
          <>
            <p className="mb-4 text-sm text-muted">
              {filtrados.length} {filtrados.length === 1 ? 'produto' : 'produtos'}
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {filtrados.map((produto) => (
                <ProductRevealCard
                  key={produto.id}
                  produto={produto}
                  aoAdicionarCarrinho={adicionarItem}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
