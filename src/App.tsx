import { useEffect } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { AuthProvider } from './context/AuthContext';
import { CarrinhoProvider } from './context/CarrinhoContext';
import { TemaProvider } from './context/TemaContext';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  // Smooth scroll e scrollbar customizada
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      * {
        scrollbar-width: thin;
        scrollbar-color: #d9a322 #0a0a0a;
      }
      *::-webkit-scrollbar {
        width: 8px;
      }
      *::-webkit-scrollbar-track {
        background: #0a0a0a;
      }
      *::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #d9a322, #a3ff5e);
        border-radius: 4px;
      }
      *::-webkit-scrollbar-thumb:hover {
        background: #d9a322;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <TemaProvider>
      <AuthProvider>
        <CarrinhoProvider>
          <Header /> 
          <AppRoutes />
          <Footer />
        </CarrinhoProvider>
      </AuthProvider>
    </TemaProvider>
  )
}

export default App