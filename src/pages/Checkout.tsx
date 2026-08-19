import { useCarrinho } from '../context/CarrinhoContext'
import { useState } from 'react'

export function Checkout() {
  const { itens, totalPreco } = useCarrinho()

  const [endereco, setEndereco] = useState({
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
  })

  function handleChange(campo: string, valor: string) {
    setEndereco((atual) => ({ ...atual, [campo]: valor }))
  }

  function handleFinalizarPedido() {
    // Aqui é onde, futuramente, o backend do outro dev entra:
    // vai receber { itens, totalPreco, endereco } e processar o pagamento.
    console.log('Pedido pronto para enviar à API:', { itens, totalPreco, endereco })
    alert('Aqui vai a integração com o pagamento (responsabilidade do backend).')
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-8 text-2xl font-bold text-neutral-900">Finalizar compra</h1>

      <div className="grid gap-10 sm:grid-cols-2">
        {/* Formulário de endereço */}
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-bold uppercase tracking-wide text-neutral-500">
            Endereço de entrega
          </h2>

          <input
            type="text"
            placeholder="CEP"
            value={endereco.cep}
            onChange={(e) => handleChange('cep', e.target.value)}
            className="rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:border-lime-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Rua"
            value={endereco.rua}
            onChange={(e) => handleChange('rua', e.target.value)}
            className="rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:border-lime-500 focus:outline-none"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Número"
              value={endereco.numero}
              onChange={(e) => handleChange('numero', e.target.value)}
              className="rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:border-lime-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Bairro"
              value={endereco.bairro}
              onChange={(e) => handleChange('bairro', e.target.value)}
              className="rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:border-lime-500 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Cidade"
              value={endereco.cidade}
              onChange={(e) => handleChange('cidade', e.target.value)}
              className="rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:border-lime-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Estado"
              value={endereco.estado}
              onChange={(e) => handleChange('estado', e.target.value)}
              className="rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:border-lime-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Resumo do pedido */}
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-bold uppercase tracking-wide text-neutral-500">
            Resumo do pedido
          </h2>

          <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-4">
            {itens.map((item) => {
              const preco = item.produto.precoPromocional ?? item.produto.preco
              return (
                <div key={item.produto.id} className="flex justify-between text-sm">
                  <span className="text-neutral-600">
                    {item.quantidade}x {item.produto.nome}
                  </span>
                  <span className="font-medium text-neutral-900">
                    R$ {(preco * item.quantidade).toFixed(2)}
                  </span>
                </div>
              )
            })}

            <div className="mt-2 flex justify-between border-t border-neutral-200 pt-3 text-base font-bold text-neutral-900">
              <span>Total</span>
              <span>R$ {totalPreco.toFixed(2)}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-dashed border-neutral-300 p-4 text-xs text-neutral-500">
            Aqui entrarão as opções de pagamento (cartão, Pix, boleto) — integração feita pelo backend.
          </div>

          <button
            onClick={handleFinalizarPedido}
            className="rounded-full bg-neutral-900 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-lime-400 hover:text-neutral-900"
          >
            Confirmar pedido
          </button>
        </div>
      </div>
    </div>
  )
}