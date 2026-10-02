import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import type { Produto } from "../../types";

interface Props {
  produto: Produto;
  aoAdicionarCarrinho?: (p: Produto) => void;
  aoFavoritar?: (p: Produto) => void;
  enableAnimations?: boolean;
  className?: string;
}

const fmt = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function ProductRevealCard({ produto, aoAdicionarCarrinho, aoFavoritar, enableAnimations = true, className }: Props) {
  const [fav, setFav] = useState(false);
  const reduce = useReducedMotion();
  const anim = enableAnimations && !reduce;

  const box: Variants = {
    rest: { scale: 1, y: 0 },
    hover: anim ? { scale: 1.03, y: -8, transition: { type: "spring", stiffness: 300, damping: 30 } } : {},
  };
  const overlay: Variants = {
    rest: { y: "100%", opacity: 0 },
    hover: { y: "0%", opacity: 1, transition: { type: "spring", stiffness: 400, damping: 28 } },
  };

  const temPromo = produto.precoPromocional !== undefined;
  const desc = temPromo ? Math.round((1 - produto.precoPromocional! / produto.preco) * 100) : 0;

  return (
    <motion.div initial="rest" whileHover="hover" variants={box}
      className={cn("group relative w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900", className)}>
      <div className="relative overflow-hidden">
        <Link to={`/produtos/${produto.id}`}>
          <img src={produto.imagem} alt={produto.nome} className="h-56 w-full object-cover" loading="lazy" />
        </Link>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {temPromo && (
          <span className="absolute left-3 top-3 rounded-full bg-lime-400 px-3 py-1 text-xs font-bold text-neutral-900">-{desc}%</span>
        )}
        <button
          onClick={() => { setFav(!fav); aoFavoritar?.(produto); }}
          aria-label="Favoritar"
          className={cn("absolute right-3 top-3 rounded-full p-2 backdrop-blur-sm",
            fav ? "bg-red-500 text-white" : "bg-white/20 text-white hover:bg-white/30")}>
          <Heart className={cn("h-4 w-4", fav && "fill-current")} />
        </button>
        <motion.div variants={overlay} className="absolute inset-x-0 bottom-0 bg-neutral-950/85 p-4 backdrop-blur-sm">
          <p className="line-clamp-2 text-sm text-white/90">{produto.descricao}</p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => aoAdicionarCarrinho?.(produto)}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-lime-400 py-2 text-sm font-bold text-neutral-950 hover:bg-lime-300">
              <ShoppingCart className="h-4 w-4" /> Adicionar
            </button>
          </div>
        </motion.div>
      </div>
      <div className="flex flex-col gap-1 p-4">
        <span className="text-xs uppercase tracking-wide text-neutral-400">{produto.categoria}</span>
        <h3 className="line-clamp-1 text-sm font-semibold text-neutral-900 dark:text-white">{produto.nome}</h3>
        {produto.avaliacao && (
          <span className="flex items-center gap-1 text-xs text-neutral-500">
            <Star className="h-3.5 w-3.5 fill-lime-500 text-lime-500" /> {produto.avaliacao}
          </span>
        )}
        <div className="mt-1 flex items-baseline gap-2">
          <strong className="text-lg text-neutral-900 dark:text-white">{fmt.format(produto.precoPromocional ?? produto.preco)}</strong>
          {temPromo && <s className="text-xs text-neutral-400">{fmt.format(produto.preco)}</s>}
        </div>
      </div>
    </motion.div>
  );
}