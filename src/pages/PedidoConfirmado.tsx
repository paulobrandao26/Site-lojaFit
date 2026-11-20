import { motion, useReducedMotion } from 'framer-motion';
import { Check, Mail } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext';

// Fim do fluxo caprichado: é a última impressão da compra
export function PedidoConfirmado() {
  const [searchParams] = useSearchParams()
  const pedidoId = searchParams.get('pedidoId')
  const { limparCarrinho } = useCarrinho()
  const reduce = useReducedMotion()

  useEffect(() => {
    limparCarrinho()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-ground px-6 py-16">
      <div className="w-full max-w-md text-center">
        <motion.div
          initial={reduce ? false : { scale: 0.4, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 16 }}
          className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-plate-green"
        >
          <Check className="h-12 w-12 text-white" strokeWidth={3} />
        </motion.div>

        <h1 className="font-display mt-6 text-4xl text-ink">Pedido confirmado</h1>
        <p className="mt-3 text-muted">Pagamento aprovado. Agora é com a gente: vamos separar seus produtos.</p>

        {pedidoId && (
          <div className="mt-6 rounded-xl bg-surface p-4">
            <p className="text-sm text-muted">Número do pedido</p>
            <p className="font-display mt-1 text-xl text-ink">#{pedidoId.slice(0, 8).toUpperCase()}</p>
          </div>
        )}

        <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted">
          <Mail className="h-4 w-4" /> Guarde este número para acompanhar o pedido.
        </p>

        <Link
          to="/produtos"
          className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-plate py-4 font-bold text-onplate hover:bg-plate-dark"
        >
          Continuar comprando
        </Link>
        <Link to="/" className="mt-3 inline-block text-sm text-muted underline hover:text-ink">
          Voltar ao início
        </Link>
      </div>
    </div>
  )
}
