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
          <Header />
          <AppRoutes />
        </CarrinhoProvider>
      </AuthProvider>
    </TemaProvider>
  )
}

export default App