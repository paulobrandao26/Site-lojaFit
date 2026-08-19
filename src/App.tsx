import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { AppRoutes } from './routes/AppRoutes'
import { CarrinhoProvider } from './context/CarrinhoContext'
import { TemaProvider } from './context/TemaContext'

function App() {
  return (
    <TemaProvider>
      <CarrinhoProvider>
        <Header />
        <AppRoutes />
        <Footer />
      </CarrinhoProvider>
    </TemaProvider>
  )
}

export default App