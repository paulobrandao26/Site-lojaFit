import { useState } from 'react'
import { CheckCircle2, DollarSign, Link2, TrendingUp } from 'lucide-react'

export function Afiliados() {
  const [form, setForm] = useState({ nome: '', email: '', instagram: '' })
  const [enviado, setEnviado] = useState(false)

  function handleChange(campo: string, valor: string) {
    setForm((atual) => ({ ...atual, [campo]: valor }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log('Cadastro de afiliado pronto para enviar à API:', form)
    setEnviado(true)
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-ink">
          Seja um <span className="text-plate">afiliado</span> LOJA FIT
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          Indique nossos produtos e ganhe comissão em cada venda realizada com o seu link.
        </p>
      </div>

      {/* Como funciona */}
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-6 text-center dark:border-neutral-800 dark:bg-neutral-900">
          <Link2 className="h-8 w-8 text-plate" />
          <h3 className="font-bold text-ink">Receba seu link</h3>
          <p className="text-sm text-muted">
            Após aprovado, você recebe um link exclusivo de divulgação.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-6 text-center dark:border-neutral-800 dark:bg-neutral-900">
          <TrendingUp className="h-8 w-8 text-plate" />
          <h3 className="font-bold text-ink">Divulgue</h3>
          <p className="text-sm text-muted">
            Compartilhe nas redes sociais, WhatsApp ou onde quiser.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-6 text-center dark:border-neutral-800 dark:bg-neutral-900">
          <DollarSign className="h-8 w-8 text-plate" />
          <h3 className="font-bold text-ink">Ganhe comissão</h3>
          <p className="text-sm text-muted">
            Receba um percentual de cada venda feita através do seu link.
          </p>
        </div>
      </div>

      {/* Formulário de cadastro */}
      <div className="mx-auto mt-16 max-w-md">
        {enviado ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-plate bg-plate p-8 text-center dark:border-plate dark:bg-plate">
            <CheckCircle2 className="h-10 w-10 text-plate dark:text-plate" />
            <h3 className="font-bold text-ink">Cadastro recebido!</h3>
            <p className="text-sm text-muted">
              Em breve entraremos em contato com os detalhes do seu link de afiliado.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="text-center text-sm font-rotulo text-muted">
              Quero ser afiliado
            </h2>
            <input
              type="text"
              placeholder="Nome completo"
              value={form.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
              required
              className="rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-plate focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-500"
            />
            <input
              type="email"
              placeholder="E-mail"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
              className="rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-plate focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-500"
            />
            <input
              type="text"
              placeholder="@ do Instagram (opcional)"
              value={form.instagram}
              onChange={(e) => handleChange('instagram', e.target.value)}
              className="rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-plate focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-500"
            />
            <button
              type="submit"
              className="rounded-lg bg-neutral-900 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-plate hover:text-neutral-900 dark:bg-plate dark:text-onplate dark:hover:bg-plate"
            >
              Quero ser afiliado
            </button>
          </form>
        )}
      </div>
    </div>
  )
}