import { useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Produto } from '../types';
import { ProductRevealCard } from './ui/ProductRevealCard';

interface ProductCarouselProps {
  titulo: string
  produtos: Produto[]
  aoAdicionarCarrinho?: (produto: Produto) => void
}

export function ProductCarousel({ titulo, produtos, aoAdicionarCarrinho }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [indiceAtivo, setIndiceAtivo] = useState(0)
  const [pausado, setPausado] = useState(false)
  const [parado, setParado] = useState(false)
  const reduce = useReducedMotion()

  function rolar(direcao: 'esquerda' | 'direita') {
    if (!scrollRef.current) return
    const largura = scrollRef.current.clientWidth
    scrollRef.current.scrollBy({
      left: direcao === 'direita' ? largura * 0.8 : -largura * 0.8,
      behavior: 'smooth',
    })
  }

  function irParaIndice(indice: number) {
    if (!scrollRef.current) return
    const item = scrollRef.current.children[indice] as HTMLElement
    if (item) {
      scrollRef.current.scrollTo({ left: item.offsetLeft - 24, behavior: 'smooth' })
    }
  }

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return
    const { scrollLeft, children } = scrollRef.current
    let maisProximo = 0
    let menorDistancia = Infinity

    Array.from(children).forEach((child, i) => {
      const el = child as HTMLElement
      const distancia = Math.abs(el.offsetLeft - 24 - scrollLeft)
      if (distancia < menorDistancia) {
        menorDistancia = distancia
        maisProximo = i
      }
    })

    setIndiceAtivo(maisProximo)
  }, [])

  // Passa sozinho só se ninguém pausou e o sistema não pede menos movimento
  useEffect(() => {
    if (pausado || parado || reduce || produtos.length <= 1) return

    const intervalo = setInterval(() => {
      const proximo = (indiceAtivo + 1) % produtos.length
      irParaIndice(proximo)
    }, 4000)

    return () => clearInterval(intervalo)
  }, [indiceAtivo, pausado, parado, reduce, produtos.length])

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-balance text-4xl text-ink">
          {titulo}
        </h2>

        <div className="flex gap-2">
          {!reduce && produtos.length > 1 && (
            <button
              onClick={() => setParado((p) => !p)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-[background-color,border-color,color] hover:border-plate"
              aria-label={parado ? 'Voltar a passar os produtos sozinho' : 'Parar de passar os produtos sozinho'}
              aria-pressed={parado}
            >
              {parado ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
          )}
          <button
            onClick={() => rolar('esquerda')}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-[background-color,border-color,color,transform] hover:scale-110 hover:bg-plate hover:border-plate hover:text-onplate"
            aria-label="Rolar para esquerda"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => rolar('direita')}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-[background-color,border-color,color,transform] hover:scale-110 hover:bg-plate hover:border-plate hover:text-onplate"
            aria-label="Rolar para direita"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setPausado(true)}
        onMouseLeave={() => setPausado(false)}
        onFocus={() => setPausado(true)}
        onBlur={() => setPausado(false)}
      >
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="w-[calc(50%-0.5rem)] flex-shrink-0 snap-start sm:w-[calc(33.333%-0.7rem)] lg:w-[calc(25%-0.75rem)]"
            >
              <ProductRevealCard produto={produto} aoAdicionarCarrinho={aoAdicionarCarrinho} />
            </div>
          ))}
        </div>
      </div>

      {produtos.length > 1 && (
        <div className="mt-4 flex justify-center gap-1.5">
          {produtos.map((_, i) => (
            <button
              key={i}
              onClick={() => irParaIndice(i)}
              className={`h-1.5 rounded-full transition-[width,background-color] ${
                i === indiceAtivo
                  ? 'w-6 bg-plate'
                  : 'w-1.5 bg-line'
              }`}
              aria-label={`Ir para produto ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}