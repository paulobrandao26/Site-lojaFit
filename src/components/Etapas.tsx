import { Check } from 'lucide-react'

const ETAPAS = ['Carrinho', 'Entrega', 'Pagamento']

// Mostra o progresso da compra e quanto falta (leis 11 e 20)
export function Etapas({ atual }: { atual: 1 | 2 | 3 }) {
  return (
    <nav aria-label="Etapas da compra" className="mb-8">
      <p className="mb-3 text-sm text-muted">
        Etapa {atual} de {ETAPAS.length}
        {atual < ETAPAS.length && ` · falta${ETAPAS.length - atual === 1 ? '' : 'm'} ${ETAPAS.length - atual}`}
      </p>
      <ol className="flex items-center gap-2">
        {ETAPAS.map((nome, i) => {
          const n = i + 1
          const feita = n < atual
          const ativa = n === atual
          return (
            <li key={nome} className="flex flex-1 items-center gap-2" aria-current={ativa ? 'step' : undefined}>
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold ${
                  feita ? 'bg-plate-green text-white' : ativa ? 'bg-plate text-onplate' : 'bg-line text-muted'
                }`}
              >
                {feita ? <Check className="h-4 w-4" /> : n}
              </span>
              <span className={`text-sm font-semibold ${ativa ? 'text-ink' : 'text-muted'}`}>{nome}</span>
              {n < ETAPAS.length && <span className={`h-0.5 flex-1 rounded ${feita ? 'bg-plate-green' : 'bg-line'}`} />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
