import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Tema = 'claro' | 'escuro'

interface TemaContextType {
  tema: Tema
  alternarTema: () => void
}

const TemaContext = createContext<TemaContextType | undefined>(undefined)

export function TemaProvider({ children }: { children: ReactNode }) {
  const [tema, setTema] = useState<Tema>(() => {
    let salvo: string | null = null
    try { salvo = localStorage.getItem('tema-v3') } catch { /* sem storage */ }
    return (salvo as Tema) ?? 'claro'
  })

  useEffect(() => {
    const root = document.documentElement
    if (tema === 'escuro') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    // Barra de rolagem, campos e cor do navegador seguem o tema
    root.style.colorScheme = tema === 'escuro' ? 'dark' : 'light'
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', tema === 'escuro' ? '#111111' : '#ffffff')
    try { localStorage.setItem('tema-v3', tema) } catch { /* sem storage */ }
  }, [tema])

  function alternarTema() {
    setTema((atual) => (atual === 'claro' ? 'escuro' : 'claro'))
  }

  return (
    <TemaContext.Provider value={{ tema, alternarTema }}>
      {children}
    </TemaContext.Provider>
  )
}

export function useTema() {
  const context = useContext(TemaContext)
  if (!context) {
    throw new Error('useTema precisa ser usado dentro de um TemaProvider')
  }
  return context
}