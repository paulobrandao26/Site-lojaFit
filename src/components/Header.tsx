import { AnimatePresence, motion } from 'framer-motion';
import { Lock, Menu, Moon, ShoppingBag, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext';
import { useTema } from '../context/TemaContext';

const LINKS = [
  { to: '/produtos', texto: 'Todos' },
  { to: '/produtos?categoria=suplementos', texto: 'Suplementos' },
  { to: '/produtos?categoria=acessorios', texto: 'Acessórios' },
  { to: '/produtos?categoria=vestuario', texto: 'Vestuário' },
  { to: '/afiliados', texto: 'Seja afiliado' },
]

export function Logo() {
  return (
    <span className="flex items-center gap-2 text-xl font-bold tracking-tight text-ink" translate="no">
      <span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-full bg-ink">
        <span className="h-2 w-2 rounded-full bg-ground" />
      </span>
      Loja Fit
    </span>
  )
}

export function Header() {
  const [menuAberto, setMenuAberto] = useState(false)
  const { totalItens } = useCarrinho()
  const { tema, alternarTema } = useTema()
  const { pathname, search } = useLocation()
  const atual = pathname + search

  return (
    <>
      {/* Faixa de aviso (fato real da loja) */}
      <div className="bg-dark text-on-dark">
        <p className="mx-auto flex h-9 max-w-[1280px] items-center justify-center gap-2 px-6 text-[13px] font-medium">
          <Lock aria-hidden="true" className="h-3.5 w-3.5" /> Pagamento seguro pela Stripe<span className="hidden sm:inline"> · compre sem criar conta</span>
        </p>
      </div>

      <header className="sticky top-0 z-50 border-b border-line bg-ground/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-6 px-6">
          <Link to="/" aria-label="Loja Fit, página inicial">
            <Logo />
          </Link>

          <nav aria-label="Categorias" className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => {
              const ativo = atual === l.to
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  aria-current={ativo ? 'page' : undefined}
                  className={`relative px-3 py-2 text-[13px] font-semibold uppercase tracking-wide transition-colors ${
                    ativo ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {l.texto}
                  {ativo && <span aria-hidden="true" className="absolute inset-x-3 -bottom-[13px] h-0.5 bg-ink" />}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-1">
            <button
              onClick={alternarTema}
              className="grid h-11 w-11 place-items-center rounded-full text-ink transition-colors hover:bg-surface"
              aria-label={tema === 'claro' ? 'Ativar tema escuro' : 'Ativar tema claro'}
            >
              {tema === 'claro' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            <Link
              to="/carrinho"
              className="relative grid h-11 w-11 place-items-center rounded-full text-ink transition-colors hover:bg-surface"
              aria-label={`Carrinho, ${totalItens} ${totalItens === 1 ? 'item' : 'itens'}`}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItens > 0 && (
                <span className="absolute right-1 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-sale px-1 text-[11px] font-bold text-white">
                  {totalItens}
                </span>
              )}
            </Link>

            <button
              className="grid h-11 w-11 place-items-center rounded-full text-ink lg:hidden"
              onClick={() => setMenuAberto(!menuAberto)}
              aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuAberto}
            >
              {menuAberto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuAberto && (
            <motion.nav
              aria-label="Categorias"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="border-t border-line bg-ground px-6 py-4 lg:hidden"
            >
              {LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMenuAberto(false)}
                  className="block border-b border-line py-4 text-base font-semibold text-ink last:border-0"
                >
                  {l.texto}
                </Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
