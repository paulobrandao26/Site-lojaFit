import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Produto } from '../types';

interface ProductCardProps {
  produto: Produto
  aoAdicionarCarrinho?: (produto: Produto) => void
}

export function ProductCard({ produto, aoAdicionarCarrinho }: ProductCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const temPromocao = produto.precoPromocional !== undefined
  const desconto = temPromocao ? Math.round((1 - produto.precoPromocional! / produto.preco) * 100) : 0

  // Motion values para o efeito 3D
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg'])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  function handleAdicionarCarrinho(e: React.MouseEvent) {
    e.preventDefault()
    aoAdicionarCarrinho?.(produto)
  }

  return (
    <Link to={`/produtos/${produto.id}`}>
      <motion.div
        ref={ref}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200/50 bg-white shadow-lg transition-shadow hover:shadow-2xl dark:border-neutral-800/50 dark:bg-neutral-900"
      >
        {/* Badge de desconto */}
        {temPromocao && (
          <motion.span
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="absolute left-3 top-3 z-10 rounded-full bg-gradient-to-r from-[#d9a322] to-[#a3ff5e] px-3 py-1 text-xs font-bold text-black shadow-lg"
          >
            -{desconto}%
          </motion.span>
        )}

        {/* Imagem do produto */}
        <div className="aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
            src={produto.imagem}
            alt={produto.nome}
            className="h-full w-full object-cover"
            style={{ transform: 'translateZ(20px)' }}
          />
          
          {/* Overlay com gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        {/* Conteúdo */}
        <div className="flex flex-1 flex-col gap-2 p-4" style={{ transform: 'translateZ(30px)' }}>
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            {produto.categoria}
          </span>

          <h3 className="line-clamp-2 text-sm font-bold text-neutral-900 dark:text-white">
            {produto.nome}
          </h3>

          {produto.avaliacao && (
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-[#d9a322] text-[#d9a322]" />
              <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                {produto.avaliacao}
              </span>
            </div>
          )}

          {/* Preço e botão */}
          <div className="mt-auto flex items-end justify-between pt-2">
            <div className="flex flex-col">
              {temPromocao && (
                <span className="text-xs text-neutral-400 line-through dark:text-neutral-500">
                  R$ {produto.preco.toFixed(2)}
                </span>
              )}
              <span className="bg-gradient-to-r from-[#d9a322] to-[#a3ff5e] bg-clip-text text-lg font-extrabold text-transparent">
                R$ {(produto.precoPromocional ?? produto.preco).toFixed(2)}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAdicionarCarrinho}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#d9a322] to-[#a3ff5e] text-black shadow-lg transition-shadow hover:shadow-xl"
              aria-label={`Adicionar ${produto.nome} ao carrinho`}
              style={{ transform: 'translateZ(50px)' }}
            >
              <ShoppingCart className="h-4 w-4" />
            </motion.button>
          </div>
        </div>

        {/* Brilho no hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
        </div>
      </motion.div>
    </Link>
  )
}