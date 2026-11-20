import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { AuthProvider } from './context/AuthContext';
import { CarrinhoProvider } from './context/CarrinhoContext';
import { TemaProvider } from './context/TemaContext';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <TemaProvider>
      <AuthProvider>
        <CarrinhoProvider>
          {/* Primeiro item do Tab: pula direto para o conteúdo */}
          <a
            href="#conteudo"
            className="sr-only z-[60] rounded-lg bg-plate px-5 py-3 font-bold text-onplate focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Pular para o conteúdo
          </a>
          <Header />
          <div id="conteudo" tabIndex={-1} className="outline-none">
            <AppRoutes />
          </div>
          <Footer />
        </CarrinhoProvider>
      </AuthProvider>
    </TemaProvider>
  )
}

export default App
