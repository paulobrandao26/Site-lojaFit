import { ArrowLeft, Package, ShieldCheck, Star } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AddToCartButton } from '../components/AddToCartButton';
import { useCarrinho } from '../context/CarrinhoContext';
import { buscarProdutoPorId } from '../data/api';
import { infoCategoria } from '../lib/categoria';
import type { Produto } from '../types';

const fmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

// Faixa escura atrás do header fixo (texto branco) + conteúdo
function Casca({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-ground">
      {children}
    </div>
  )
}

export function ProdutoDetalhe() {
  const { id } = useParams()
  const { adicionarItem } = useCarrinho()
  const [produto, setProduto] = useState<Produto | null>(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    if (!id) return
    buscarProdutoPorId(id)
      .then((dados) => setProduto(dados))
      .catch(() => setProduto(null))
      .finally(() => setCarregando(false))
  }, [id])

  if (carregando) {
    return (
      <Casca>
        <div className="mx-auto grid max-w-5xl animate-pulse gap-10 px-6 py-10 sm:grid-cols-2">
          <div className="aspect-square rounded-3xl bg-line" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 rounded bg-line" />
            <div className="h-4 w-full rounded bg-line" />
            <div className="h-10 w-1/2 rounded bg-line" />
          </div>
        </div>
      </Casca>
    )
  }

  if (!produto) {
    return (
      <Casca>
        <div className="px-6 py-20 text-center">
          <p className="text-lg font-semibold text-ink">Produto não encontrado.</p>
          <Link to="/produtos" className="mt-4 inline-block text-plate underline dark:text-plate">
            Voltar para os produtos
          </Link>
        </div>
      </Casca>
    )
  }

  const temPromo = produto.precoPromocional != null && produto.precoPromocional < produto.preco
  const desconto = temPromo ? Math.round((1 - produto.precoPromocional! / produto.preco) * 100) : 0
  const precoFinal = produto.precoPromocional ?? produto.preco

  return (
    <Casca>
      <div className="mx-auto max-w-5xl px-6 py-10">
        <Link
          to="/produtos"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>

        <div className="grid gap-10 sm:grid-cols-2">
          <div className="relative overflow-hidden rounded-xl bg-surface">
            <img src={produto.imagem} alt={produto.nome} className="aspect-square w-full object-cover" />
            {temPromo && (
              <span className="absolute left-4 top-4 rounded-lg bg-plate px-3 py-1 text-sm font-bold text-onplate">
                -{desconto}%
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <span className="flex items-center gap-2 text-sm font-medium text-muted">
              <span aria-hidden="true" className={`h-3 w-3 rounded-full ${infoCategoria(produto.categoria).cor}`} />
              {infoCategoria(produto.categoria).nome}
            </span>
            <h1 className="font-display mt-3 text-balance text-3xl leading-[1.02] text-ink sm:text-4xl">{produto.nome}</h1>

            {produto.avaliacao != null && (
              <span className="mt-2 flex items-center gap-1 text-sm text-muted">
                <Star className="h-4 w-4 fill-plate text-plate" /> {produto.avaliacao} de 5
              </span>
            )}

            <p className="mt-4 leading-relaxed text-muted">{produto.descricao}</p>

            <div className="mt-6 flex items-baseline gap-3">
              <strong className="text-4xl font-extrabold text-ink">{fmt.format(precoFinal)}</strong>
              {temPromo && <s className="text-muted">{fmt.format(produto.preco)}</s>}
            </div>

            <div className="mt-6">
              <AddToCartButton onClick={() => adicionarItem(produto)} />
            </div>

            <ul className="mt-8 space-y-3 border-t border-line pt-6 text-sm text-muted">
              <li className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-plate" /> Pagamento seguro com Stripe</li>
              <li className="flex items-center gap-3">
                <Package className="h-4 w-4 text-plate" />
                {produto.estoque > 0 ? `${produto.estoque} em estoque` : 'Sem estoque no momento'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Casca>
  )
}
