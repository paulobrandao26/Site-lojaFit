import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, ShoppingCart, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext';
import { useTema } from '../context/TemaContext';

export function Header() {
  const [menuAberto, setMenuAberto] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { totalItens } = useCarrinho()
  const { tema, alternarTema } = useTema()

  // Detecta scroll para mudar o header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled 
            ? 'border-b border-white/10 bg-black/80 backdrop-blur-xl' 
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* Logo */}
          <Link to="/" className="group relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-extrabold"
            >
              <span className="text-white">LOJA</span>
              <span className="bg-gradient-to-r from-[#d9a322] to-[#a3ff5e] bg-clip-text text-transparent">FIT</span>
            </motion.div>
          </Link>

          {/* Menu desktop */}
          <nav className="hidden items-center gap-8 lg:flex">
            <NavLink to="/">Início</NavLink>
            <NavLink to="/produtos">Produtos</NavLink>
            <NavLink to="/afiliados">Seja Afiliado</NavLink>
          </nav>

          {/* Ações */}
          <div className="flex items-center gap-2">
            {/* Tema */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={alternarTema}
              className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
              aria-label="Alternar tema"
            >
              {tema === 'claro' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </motion.button>

            {/* Carrinho */}
            <Link to="/carrinho">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10"
              >
                <ShoppingCart className="h-5 w-5 text-white" />
                {totalItens > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#d9a322] text-[10px] font-bold text-black"
                  >
                    {totalItens}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* Menu mobile */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="flex h-10 w-10 items-center justify-center lg:hidden"
              onClick={() => setMenuAberto(!menuAberto)}
              aria-label="Menu"
            >
              {menuAberto ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Menu Mobile Full Screen */}
      <AnimatePresence>
        {menuAberto && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-black lg:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-8 p-8">
              <MobileNavLink to="/" onClick={() => setMenuAberto(false)}>
                Início
              </MobileNavLink>
              <MobileNavLink to="/produtos" onClick={() => setMenuAberto(false)}>
                Produtos
              </MobileNavLink>
              <MobileNavLink to="/afiliados" onClick={() => setMenuAberto(false)}>
                Seja Afiliado
              </MobileNavLink>
              
              <div className="mt-8 h-px w-32 bg-white/20" />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center text-sm text-gray-500"
              >
                © 2026 LojaFit
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Componente NavLink para desktop
function NavLink({ to, children }: { to: string; children: string }) {
  return (
    <Link to={to} className="group relative text-sm font-medium text-white transition-colors">
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-[#d9a322] to-[#a3ff5e] opacity-0 transition-opacity group-hover:opacity-100"
        initial={false}
      />
    </Link>
  )
}

// Componente NavLink para mobile
function MobileNavLink({ to, onClick, children }: { to: string; onClick: () => void; children: string }) {
  return (
    <Link to={to} onClick={onClick}>
      <motion.div
        whileHover={{ scale: 1.05, x: 10 }}
        whileTap={{ scale: 0.95 }}
        className="text-4xl font-bold text-white transition-colors hover:bg-gradient-to-r hover:from-[#d9a322] hover:to-[#a3ff5e] hover:bg-clip-text hover:text-transparent"
      >
        {children}
      </motion.div>
    </Link>
  )
}