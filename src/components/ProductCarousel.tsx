import { ChevronLeft, ChevronRight } from 'lucide-react';
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

  useEffect(() => {
    if (pausado || produtos.length <= 1) return

    const intervalo = setInterval(() => {
      const proximo = (indiceAtivo + 1) % produtos.length
      irParaIndice(proximo)
    }, 4000)

    return () => clearInterval(intervalo)
  }, [indiceAtivo, pausado, produtos.length])

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
          {titulo}
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => rolar('esquerda')}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-900 transition-all hover:scale-110 hover:bg-lime-400 hover:border-lime-400 hover:text-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-lime-500"
            aria-label="Rolar para esquerda"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => rolar('direita')}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-900 transition-all hover:scale-110 hover:bg-lime-400 hover:border-lime-400 hover:text-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-lime-500"
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
              className={`h-1.5 rounded-full transition-all ${
                i === indiceAtivo
                  ? 'w-6 bg-lime-500'
                  : 'w-1.5 bg-neutral-300 dark:bg-neutral-700'
              }`}
              aria-label={`Ir para produto ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}