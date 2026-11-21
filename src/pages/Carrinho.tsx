import { Lock, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Etapas } from '../components/Etapas'
import { useCarrinho } from '../context/CarrinhoContext'

const fmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export function Carrinho() {
  const { itens, removerItem, alterarQuantidade, totalPreco, totalItens } = useCarrinho()

  if (itens.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-ground px-6 text-center">
        <ShoppingBag className="h-14 w-14 text-muted" />
        <h1 className="font-display text-3xl text-ink sm:text-4xl">Seu carrinho <span className="texto-contorno">está vazio</span></h1>
        <p className="text-muted">Escolha um produto para começar.</p>
        <Link to="/produtos" className="mt-2 rounded-lg bg-plate px-8 py-4 font-bold text-onplate hover:bg-plate-dark">
          Ver produtos
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ground pb-36 lg:pb-16">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <Etapas atual={1} />
        <h1 className="font-display mb-8 text-[clamp(2.25rem,10.5vw,3.75rem)] text-ink">Seu <span className="bloco-destaque">carrinho</span></h1>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <ul className="flex flex-col divide-y divide-line rounded-xl bg-surface">
            {itens.map((item) => {
              const preco = item.produto.precoPromocional ?? item.produto.preco
              return (
                <li key={item.produto.id} className="flex flex-wrap items-center gap-4 p-4">
                  <img src={item.produto.imagem} alt="" className="h-20 w-20 rounded-lg bg-line object-cover" />

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-ink">{item.produto.nome}</h3>
                    <span className="text-sm text-muted">{fmt.format(preco)} cada</span>
                  </div>

                  <div className="flex items-center rounded-full border border-line">
                    <button
                      onClick={() => alterarQuantidade(item.produto.id, item.quantidade - 1)}
                      disabled={item.quantidade <= 1}
                      className="grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-line/60 disabled:opacity-30"
                      aria-label={`Diminuir quantidade de ${item.produto.nome}`}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-semibold text-ink" aria-live="polite">{item.quantidade}</span>
                    <button
                      onClick={() => alterarQuantidade(item.produto.id, item.quantidade + 1)}
                      disabled={item.quantidade >= item.produto.estoque}
                      className="grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-line/60 disabled:opacity-30"
                      aria-label={`Aumentar quantidade de ${item.produto.nome}`}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <strong className="w-24 text-right text-ink">{fmt.format(preco * item.quantidade)}</strong>

                  <button
                    onClick={() => removerItem(item.produto.id)}
                    className="grid h-11 w-11 place-items-center rounded-full text-muted hover:bg-danger/10 hover:text-danger"
                    aria-label={`Remover ${item.produto.nome}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Resumo: no celular fica preso embaixo, perto do dedo */}
          <aside className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ground p-4 lg:static lg:self-start lg:rounded-xl lg:border-0 lg:bg-surface lg:p-6">
            <div className="flex items-baseline justify-between">
              <span className="text-muted">Total ({totalItens} {totalItens === 1 ? 'item' : 'itens'})</span>
              <strong className="text-2xl font-black text-ink">{fmt.format(totalPreco)}</strong>
            </div>
            <Link
              to="/checkout"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-plate py-4 font-bold text-onplate hover:bg-plate-dark"
            >
              <Lock className="h-4 w-4" /> Continuar para entrega
            </Link>
            <Link to="/produtos" className="mt-3 hidden text-center text-sm text-muted underline hover:text-ink lg:block">
              Continuar comprando
            </Link>
          </aside>
        </div>
      </div>
    </div>
  )
}
