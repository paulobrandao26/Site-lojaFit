import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Produtos } from '../pages/Produtos'
import { ProdutoDetalhe } from '../pages/ProdutoDetalhe'
import { Carrinho } from '../pages/Carrinho'
import { Checkout } from '../pages/Checkout'
import { Afiliados } from '../pages/Afiliados'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/produtos/:id" element={<ProdutoDetalhe />} />
      <Route path="/carrinho" element={<Carrinho />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/afiliados" element={<Afiliados />} />
    </Routes>
  )
}