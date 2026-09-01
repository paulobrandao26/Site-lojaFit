import { createContext, useContext, useState, type ReactNode } from 'react';
import { login as loginApi, registrar as registrarApi } from '../data/api';

interface Usuario {
  id: string
  email: string
  nome: string
}

interface AuthContextType {
  usuario: Usuario | null
  token: string | null
  estaLogado: boolean
  fazerLogin: (email: string, senha: string) => Promise<void>
  fazerCadastro: (nome: string, email: string, senha: string, telefone: string) => Promise<void>
  sair: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const salvo = localStorage.getItem('usuario')
    return salvo ? JSON.parse(salvo) : null
  })
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token')
  })

  async function fazerLogin(email: string, senha: string) {
    const resposta = await loginApi({ email, senha })
    setUsuario(resposta.usuario)
    setToken(resposta.access_token)
    localStorage.setItem('usuario', JSON.stringify(resposta.usuario))
    localStorage.setItem('token', resposta.access_token)
  }

  async function fazerCadastro(nome: string, email: string, senha: string, telefone: string) {
    const resposta = await registrarApi({ nome, email, senha, telefone })
    setUsuario(resposta.usuario)
    setToken(resposta.access_token)
    localStorage.setItem('usuario', JSON.stringify(resposta.usuario))
    localStorage.setItem('token', resposta.access_token)
  }

  function sair() {
    setUsuario(null)
    setToken(null)
    localStorage.removeItem('usuario')
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider
      value={{ usuario, token, estaLogado: !!usuario, fazerLogin, fazerCadastro, sair }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth precisa ser usado dentro de um AuthProvider')
  }
  return context
}