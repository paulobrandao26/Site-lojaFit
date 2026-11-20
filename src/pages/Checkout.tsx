import { AlertCircle, Loader2, Lock } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Etapas } from '../components/Etapas';
import { useCarrinho } from '../context/CarrinhoContext';
import { criarPedido, criarSessaoPagamento } from '../data/api';

const fmt = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const UFS = 'AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO'.split(' ')

type Campo = 'nome' | 'email' | 'cep' | 'rua' | 'numero' | 'bairro' | 'cidade' | 'estado'
type Dados = Record<Campo, string>

const VAZIO: Dados = { nome: '', email: '', cep: '', rua: '', numero: '', bairro: '', cidade: '', estado: '' }

// Evita o erro antes dele acontecer: diz exatamente o que falta
function validar(d: Dados): Partial<Record<Campo, string>> {
  const e: Partial<Record<Campo, string>> = {}
  if (d.nome.trim().split(/\s+/).length < 2) e.nome = 'Digite nome e sobrenome.'
  if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = 'Digite um e-mail válido, como nome@email.com.'
  if (d.cep.replace(/\D/g, '').length !== 8) e.cep = 'O CEP tem 8 números.'
  if (!d.rua.trim()) e.rua = 'Digite a rua.'
  if (!d.numero.trim()) e.numero = 'Digite o número (ou "s/n").'
  if (!d.bairro.trim()) e.bairro = 'Digite o bairro.'
  if (!d.cidade.trim()) e.cidade = 'Digite a cidade.'
  if (!UFS.includes(d.estado)) e.estado = 'Escolha o estado.'
  return e
}

function mascaraCep(v: string) {
  const n = v.replace(/\D/g, '').slice(0, 8)
  return n.length > 5 ? `${n.slice(0, 5)}-${n.slice(5)}` : n
}

function Grupo({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <fieldset className="rounded-xl bg-surface p-5">
      <legend className="float-left mb-4 w-full text-lg font-bold text-ink">{titulo}</legend>
      <div className="clear-both grid grid-cols-6 gap-4">{children}</div>
    </fieldset>
  )
}

export function Checkout() {
  const { itens, totalPreco } = useCarrinho()
  const [dados, setDados] = useState<Dados>(VAZIO)
  const [tocados, setTocados] = useState<Partial<Record<Campo, boolean>>>({})
  const [buscandoCep, setBuscandoCep] = useState(false)
  const [avisoCep, setAvisoCep] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erroEnvio, setErroEnvio] = useState(false)

  const erros = validar(dados)
  const valido = Object.keys(erros).length === 0

  if (itens.length === 0 && !enviando) return <Navigate to="/carrinho" replace />

  function mudar(campo: Campo, valor: string) {
    setDados((d) => ({ ...d, [campo]: valor }))
  }

  // O sistema faz a parte difícil: preenche o endereço pelo CEP
  async function buscarCep(valor: string) {
    const cep = valor.replace(/\D/g, '')
    if (cep.length !== 8) return
    setBuscandoCep(true)
    setAvisoCep('')
    try {
      const r = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const j = await r.json()
      if (j.erro) {
        setAvisoCep('CEP não encontrado. Confira os números ou preencha o endereço à mão.')
      } else {
        setDados((d) => ({
          ...d,
          rua: j.logradouro || d.rua,
          bairro: j.bairro || d.bairro,
          cidade: j.localidade || d.cidade,
          estado: j.uf || d.estado,
        }))
        document.getElementById('campo-numero')?.focus()
      }
    } catch {
      setAvisoCep('Não deu para buscar o CEP agora. Preencha o endereço à mão.')
    } finally {
      setBuscandoCep(false)
    }
  }

  async function finalizar() {
    if (!valido) {
      setTocados(Object.fromEntries(Object.keys(VAZIO).map((k) => [k, true])))
      const primeiro = Object.keys(erros)[0]
      document.getElementById(`campo-${primeiro}`)?.focus()
      return
    }
    setEnviando(true)
    setErroEnvio(false)
    try {
      const pedido = await criarPedido({
        nomeCliente: dados.nome.trim(),
        emailCliente: dados.email.trim(),
        cep: dados.cep,
        rua: dados.rua,
        numero: dados.numero,
        bairro: dados.bairro,
        cidade: dados.cidade,
        estado: dados.estado,
        total: totalPreco,
        itens: itens.map((item) => ({
          produtoId: item.produto.id,
          nomeProduto: item.produto.nome,
          precoUnitario: item.produto.precoPromocional ?? item.produto.preco,
          quantidade: item.quantidade,
        })),
      })
      const sessao = await criarSessaoPagamento(
        itens.map((item) => ({ produtoId: item.produto.id, quantidade: item.quantidade })),
        pedido.id,
      )
      window.location.href = sessao.url
    } catch {
      setErroEnvio(true)
      setEnviando(false)
    }
  }

  function input(campo: Campo, rotulo: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}, col = 'col-span-6') {
    const erro = tocados[campo] ? erros[campo] : undefined
    return (
      <label className={`${col} flex flex-col gap-1.5`}>
        <span className="text-sm font-semibold text-ink">{rotulo}</span>
        <input
          id={`campo-${campo}`}
          value={dados[campo]}
          onChange={(e) => mudar(campo, e.target.value)}
          onBlur={() => setTocados((t) => ({ ...t, [campo]: true }))}
          aria-invalid={!!erro}
          aria-describedby={erro ? `erro-${campo}` : undefined}
          className={`h-12 rounded-lg border bg-ground px-4 text-ink outline-none transition-colors focus:border-ink ${
            erro ? 'border-danger' : 'border-line'
          }`}
          {...props}
        />
        {erro && (
          <span id={`erro-${campo}`} className="text-sm text-danger">
            {erro}
          </span>
        )}
      </label>
    )
  }

  return (
    <div className="min-h-screen bg-ground pb-36 lg:pb-16">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <Etapas atual={2} />
        <h1 className="font-display mb-6 text-4xl text-ink">Entrega</h1>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault()
              finalizar()
            }}
            className="flex flex-col gap-6"
            id="form-entrega"
          >
            <Grupo titulo="Seus dados">
              {input('nome', 'Nome completo', { autoComplete: 'name' })}
              {input('email', 'E-mail', { type: 'email', autoComplete: 'email', inputMode: 'email' })}
            </Grupo>

            <Grupo titulo="Endereço">
              <div className="col-span-6 sm:col-span-3">
                {input(
                  'cep',
                  'CEP',
                  {
                    inputMode: 'numeric',
                    autoComplete: 'postal-code',
                    placeholder: '00000-000',
                    onChange: (e) => {
                      const v = mascaraCep(e.target.value)
                      mudar('cep', v)
                      buscarCep(v)
                    },
                  },
                  'col-span-6',
                )}
                {buscandoCep && <p className="mt-1 flex items-center gap-1 text-sm text-muted"><Loader2 className="h-3 w-3 animate-spin" /> Buscando endereço…</p>}
                {avisoCep && <p className="mt-1 text-sm text-muted">{avisoCep}</p>}
              </div>
              {input('rua', 'Rua', { autoComplete: 'address-line1' })}
              {input('numero', 'Número', { autoComplete: 'address-line2' }, 'col-span-2')}
              {input('bairro', 'Bairro', {}, 'col-span-4')}
              {input('cidade', 'Cidade', { autoComplete: 'address-level2' }, 'col-span-4')}
              <label className="col-span-2 flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-ink">UF</span>
                <select
                  id="campo-estado"
                  value={dados.estado}
                  onChange={(e) => mudar('estado', e.target.value)}
                  onBlur={() => setTocados((t) => ({ ...t, estado: true }))}
                  aria-invalid={!!(tocados.estado && erros.estado)}
                  className={`h-12 rounded-lg border bg-ground px-3 text-ink outline-none focus:border-ink ${
                    tocados.estado && erros.estado ? 'border-danger' : 'border-line'
                  }`}
                >
                  <option value="">--</option>
                  {UFS.map((uf) => (
                    <option key={uf}>{uf}</option>
                  ))}
                </select>
                {tocados.estado && erros.estado && <span className="text-sm text-danger">{erros.estado}</span>}
              </label>
            </Grupo>
          </form>

          {/* Resumo + ação principal; no celular fica embaixo, perto do dedo */}
          <aside className="lg:self-start">
            <div className="rounded-xl bg-surface p-5">
              <h2 className="mb-3 text-lg font-bold text-ink">Resumo</h2>
              <ul className="space-y-2 text-sm">
                {itens.map((item) => (
                  <li key={item.produto.id} className="flex justify-between gap-3">
                    <span className="text-muted">{item.quantidade}× {item.produto.nome}</span>
                    <span className="font-medium text-ink">
                      {fmt.format((item.produto.precoPromocional ?? item.produto.preco) * item.quantidade)}
                    </span>
                  </li>
                ))}
              </ul>
              <Link to="/carrinho" className="mt-3 inline-block text-sm text-muted underline hover:text-ink">
                Alterar carrinho
              </Link>
            </div>

            {erroEnvio && (
              <div role="alert" className="mt-4 flex gap-3 rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm text-ink">
                <AlertCircle className="h-5 w-5 shrink-0 text-danger" />
                <div>
                  <p className="font-semibold">O pagamento não abriu.</p>
                  <p className="mt-1 text-muted">Seus dados continuam aqui. Toque em "Ir para o pagamento" de novo. Se repetir, tente em alguns minutos.</p>
                </div>
              </div>
            )}

            <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ground p-4 lg:static lg:mt-4 lg:border-0 lg:bg-transparent lg:p-0">
              <div className="mb-3 flex items-baseline justify-between">
                <span className="text-muted">Total</span>
                <strong className="text-2xl font-black text-ink">{fmt.format(totalPreco)}</strong>
              </div>
              <button
                type="submit"
                form="form-entrega"
                disabled={enviando}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-plate py-4 font-bold text-onplate hover:bg-plate-dark disabled:opacity-60"
              >
                {enviando ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
                {enviando ? 'Abrindo pagamento…' : 'Ir para o pagamento'}
              </button>
              <p className="mt-2 text-center text-xs text-muted">Último passo: pagamento seguro pela Stripe.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
