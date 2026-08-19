import { Link } from 'react-router-dom'
import { ShoppingCart, Menu, Sun, Moon } from 'lucide-react'
import { useState } from 'react'
import { useCarrinho } from '../context/CarrinhoContext'
import { useTema } from '../context/TemaContext'

export function Header() {
  const [menuAberto, setMenuAberto] = useState(false)
  const { totalItens } = useCarrinho()
  const { tema, alternarTema } = useTema()

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-extrabold text-neutral-900 dark:text-white">
          LOJA<span className="text-lime-500">FIT</span>
        </Link>

        {/* Menu desktop */}
        <nav className="hidden items-center gap-8 sm:flex">
          <Link to="/" className="text-sm font-medium text-neutral-700 hover:text-lime-600 dark:text-neutral-300 dark:hover:text-lime-400">
            Início
          </Link>
          <Link to="/produtos" className="text-sm font-medium text-neutral-700 hover:text-lime-600 dark:text-neutral-300 dark:hover:text-lime-400">
            Produtos
          </Link>
          <Link to="/afiliados" className="text-sm font-medium text-neutral-700 hover:text-lime-600 dark:text-neutral-300 dark:hover:text-lime-400">
            Seja Afiliado
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={alternarTema}
            className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-900 transition-colors hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-800"
            aria-label="Alternar tema"
          >
            {tema === 'claro' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          <Link
            to="/carrinho"
            className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Carrinho"
          >
            <ShoppingCart className="h-5 w-5 text-neutral-900 dark:text-white" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-lime-500 text-[10px] font-bold text-neutral-900">
              {totalItens}
            </span>
          </Link>

          {/* Botão menu mobile */}
          <button
            className="flex h-10 w-10 items-center justify-center sm:hidden"
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5 text-neutral-900 dark:text-white" />
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuAberto && (
        <nav className="flex flex-col gap-1 border-t border-neutral-200 px-6 py-4 sm:hidden dark:border-neutral-800">
          <Link to="/" className="py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300" onClick={() => setMenuAberto(false)}>
            Início
          </Link>
          <Link to="/produtos" className="py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300" onClick={() => setMenuAberto(false)}>
            Produtos
          </Link>
          <Link to="/afiliados" className="py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300" onClick={() => setMenuAberto(false)}>
            Seja Afiliado
          </Link>
        </nav>
      )}
    </header>
  )
}