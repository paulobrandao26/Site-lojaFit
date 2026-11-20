import { motion, useReducedMotion } from "framer-motion";
import { Check, Plus, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { infoCategoria } from "../../lib/categoria";
import { cn } from "../../lib/utils";
import type { Produto } from "../../types";

interface Props {
  produto: Produto;
  aoAdicionarCarrinho?: (p: Produto) => void;
  aoFavoritar?: (p: Produto) => void;
  enableAnimations?: boolean;
  botaoFixo?: boolean;
  className?: string;
}

const fmt = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function ProductRevealCard({ produto, aoAdicionarCarrinho, className }: Props) {
  const reduce = useReducedMotion();
  const [adicionado, setAdicionado] = useState(false);
  const cat = infoCategoria(produto.categoria);
  const temPromo = produto.precoPromocional != null && produto.precoPromocional < produto.preco;
  const desc = temPromo ? Math.round((1 - produto.precoPromocional! / produto.preco) * 100) : 0;

  function adicionar() {
    aoAdicionarCarrinho?.(produto);
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 1400);
  }

  return (
    <article className={cn("group flex w-full flex-col", className)}>
      <Link
        to={`/produtos/${produto.id}`}
        className="relative block aspect-[3/4] overflow-hidden rounded bg-surface"
      >
        <img
          src={produto.imagem}
          alt={produto.nome}
          width={400}
          height={533}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {temPromo && (
          <span className="absolute left-3 top-3 rounded-sm bg-sale px-2 py-1 text-xs font-bold text-white">
            -{desc}% off
          </span>
        )}
      </Link>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="flex items-center gap-1.5 text-xs font-medium text-muted">
            <span aria-hidden="true" className={cn("h-2.5 w-2.5 rounded-full", cat.cor)} />
            {cat.nome}
          </span>
          <h3 className="mt-1 line-clamp-2 text-sm font-medium leading-snug text-ink">
            <Link to={`/produtos/${produto.id}`} className="hover:underline">{produto.nome}</Link>
          </h3>
          <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2">
            <strong className={cn("text-base font-bold tabular-nums", temPromo ? "text-sale" : "text-ink")}>
              {fmt.format(produto.precoPromocional ?? produto.preco)}
            </strong>
            {temPromo && <s className="text-xs text-muted">{fmt.format(produto.preco)}</s>}
            {produto.avaliacao != null && (
              <span className="flex items-center gap-0.5 text-xs text-muted">
                <Star className="h-3 w-3 fill-amber text-amber" /> {produto.avaliacao}
              </span>
            )}
          </div>
        </div>

        {aoAdicionarCarrinho && (
          <motion.button
            onClick={adicionar}
            whileTap={reduce ? undefined : { scale: 0.9 }}
            aria-label={`Adicionar ${produto.nome} ao carrinho`}
            className={cn(
              "grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line transition-colors",
              adicionado ? "border-transparent bg-plate-green text-white" : "bg-ground text-ink hover:border-plate hover:bg-plate hover:text-onplate",
            )}
          >
            {adicionado ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
          </motion.button>
        )}
      </div>
    </article>
  );
}
