import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext';

export function PedidoConfirmado() {
  const [searchParams] = useSearchParams()
  const pedidoId = searchParams.get('pedidoId')
  const navigate = useNavigate()
  const { limparCarrinho } = useCarrinho()

  useEffect(() => {
    limparCarrinho()
  }, [])

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
        Pagamento confirmado! 🎉
      </h1>
      <p className="text-neutral-600 dark:text-neutral-400">
        Seu pedido foi pago com sucesso (ambiente de teste).
      </p>
      {pedidoId && (
        <p className="rounded-xl bg-neutral-100 px-4 py-2 font-mono text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
          Pedido: {pedidoId}
        </p>
      )}
      <button
        onClick={() => navigate('/produtos')}
        className="mt-4 rounded-full bg-neutral-900 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-lime-400 hover:text-neutral-900 dark:bg-lime-500 dark:text-neutral-900 dark:hover:bg-lime-400"
      >
        Continuar comprando
      </button>
    </div>
  )
}