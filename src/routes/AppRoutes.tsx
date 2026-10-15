import { Routes, Route, useLocation } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Produtos } from '../pages/Produtos'
import { ProdutoDetalhe } from '../pages/ProdutoDetalhe'
import { Carrinho } from '../pages/Carrinho'
import { Checkout } from '../pages/Checkout'
import { Afiliados } from '../pages/Afiliados'
import { PedidoConfirmado } from '../pages/PedidoConfirmado'
import { PageTransition } from '../components/PageTransition'
import { AnimatePresence } from 'framer-motion'

export function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/produtos" element={<PageTransition><Produtos /></PageTransition>} />
        <Route path="/produtos/:id" element={<PageTransition><ProdutoDetalhe /></PageTransition>} />
        <Route path="/carrinho" element={<PageTransition><Carrinho /></PageTransition>} />
        <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
        <Route path="/afiliados" element={<PageTransition><Afiliados /></PageTransition>} />
        <Route path="/pedido-confirmado" element={<PageTransition><PedidoConfirmado /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}