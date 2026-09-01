import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext';
import { criarPedido, criarSessaoPagamento } from '../data/api';


export function Checkout() {
  const { itens, totalPreco } = useCarrinho()
  const navigate = useNavigate()

  const [nomeCliente, setNomeCliente] = useState('')
  const [emailCliente, setEmailCliente] = useState('')
  const [endereco, setEndereco] = useState({
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
  })
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState(false)
  const [pedidoId, _setPedidoId] = useState<string | null>(null)

  function handleChange(campo: string, valor: string) {
    setEndereco((atual) => ({ ...atual, [campo]: valor }))
  }

 async function handleFinalizarPedido() {
    setEnviando(true)
    setErro(false)

    try {
      const pedido = await criarPedido({
        nomeCliente,
        emailCliente,
        ...endereco,
        total: totalPreco,
        itens: itens.map((item) => ({
          produtoId: item.produto.id,
          nomeProduto: item.produto.nome,
          precoUnitario: item.produto.precoPromocional ?? item.produto.preco,
          quantidade: item.quantidade,
        })),
      })

      const sessao = await criarSessaoPagamento(
        itens.map((item) => ({
          produtoId: item.produto.id,
          quantidade: item.quantidade,
        })),
        pedido.id
      )

      window.location.href = sessao.url
    } catch {
      setErro(true)
      setEnviando(false)
    }
  }

  const inputClass =
    'rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-lime-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-500'

  if (pedidoId) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Pedido confirmado!</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Seu pedido foi registrado com sucesso. Número do pedido:
        </p>
        <p className="rounded-xl bg-neutral-100 px-4 py-2 font-mono text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
          {pedidoId}
        </p>
        <button
          onClick={() => navigate('/produtos')}
          className="mt-4 rounded-full bg-neutral-900 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-lime-400 hover:text-neutral-900 dark:bg-lime-500 dark:text-neutral-900 dark:hover:bg-lime-400"
        >
          Continuar comprando
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="mb-8 text-2xl font-bold text-neutral-900 dark:text-white">Finalizar compra</h1>

        <div className="grid gap-10 sm:grid-cols-2">
          {/* Formulário */}
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-bold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Seus dados
            </h2>
            <input
              type="text"
              placeholder="Nome completo"
              value={nomeCliente}
              onChange={(e) => setNomeCliente(e.target.value)}
              className={inputClass}
            />
            <input
              type="email"
              placeholder="E-mail"
              value={emailCliente}
              onChange={(e) => setEmailCliente(e.target.value)}
              className={inputClass}
            />

            <h2 className="mt-4 text-sm font-bold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Endereço de entrega
            </h2>
            <input
              type="text"
              placeholder="CEP"
              value={endereco.cep}
              onChange={(e) => handleChange('cep', e.target.value)}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Rua"
              value={endereco.rua}
              onChange={(e) => handleChange('rua', e.target.value)}
              className={inputClass}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Número"
                value={endereco.numero}
                onChange={(e) => handleChange('numero', e.target.value)}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Bairro"
                value={endereco.bairro}
                onChange={(e) => handleChange('bairro', e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Cidade"
                value={endereco.cidade}
                onChange={(e) => handleChange('cidade', e.target.value)}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Estado"
                value={endereco.estado}
                onChange={(e) => handleChange('estado', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Resumo */}
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-bold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Resumo do pedido
            </h2>

            <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
              {itens.map((item) => {
                const preco = item.produto.precoPromocional ?? item.produto.preco
                return (
                  <div key={item.produto.id} className="flex justify-between text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {item.quantidade}x {item.produto.nome}
                    </span>
                    <span className="font-medium text-neutral-900 dark:text-white">
                      R$ {(preco * item.quantidade).toFixed(2)}
                    </span>
                  </div>
                )
              })}

              <div className="mt-2 flex justify-between border-t border-neutral-200 pt-3 text-base font-bold text-neutral-900 dark:border-neutral-800 dark:text-white">
                <span>Total</span>
                <span>R$ {totalPreco.toFixed(2)}</span>
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-neutral-300 p-4 text-xs text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
              Aqui entrarão as opções de pagamento (cartão, Pix, boleto) — próximo passo.
            </div>

            {erro && (
              <p className="text-sm text-red-500">
                Erro ao enviar o pedido. Verifique se o backend está rodando.
              </p>
            )}

            <button
              onClick={handleFinalizarPedido}
              disabled={enviando || itens.length === 0}
              className="rounded-full bg-neutral-900 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-lime-400 hover:text-neutral-900 disabled:opacity-50 dark:bg-lime-500 dark:text-neutral-900 dark:hover:bg-lime-400"
            >
              {enviando ? 'Enviando...' : 'Confirmar pedido'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}