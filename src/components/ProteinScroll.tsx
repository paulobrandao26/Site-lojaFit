import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';
import type { Produto } from '../types';
import { ProductRevealCard } from './ui/ProductRevealCard';

interface Props {
  produtos: Produto[];
  aoAdicionarCarrinho?: (p: Produto) => void;
}

export function ProteinScroll({ produtos, aoAdicionarCarrinho }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const lista = produtos.slice(0, 4);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#protein-pin',
          start: 'top top',
          end: '+=1800',
          scrub: 1,
          pin: true,
        },
      });

      // 1) pote gira enquanto o fundo cresce atrás
      tl.to('#protein-pin-img', { rotate: 360, scale: 1.05, ease: 'none', duration: 2.5 }, 0);
      tl.fromTo(
        '#protein-zoom-bg',
        { scale: 0.3, opacity: 0 },
        { scale: 1.35, opacity: 1, ease: 'none', duration: 2.5 },
        0,
      );

      // 2) pote some, fundo assume a tela
      tl.to('#protein-pot-wrap', { opacity: 0, scale: 0.8, y: -60, ease: 'none', duration: 1 }, 2);
      tl.to('#protein-zoom-bg', { scale: 1.6, ease: 'none', duration: 1.5 }, 2);

      // 3) produtos surgem por cima
      tl.fromTo(
        '#protein-products',
        { scale: 0.92, opacity: 0, y: 100 },
        { scale: 1, opacity: 1, y: 0, ease: 'none', duration: 1.2 },
        2.8,
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <section id="protein-pin" className="relative overflow-hidden bg-neutral-950">
        <div className="mx-auto grid min-h-screen max-w-[1440px] place-items-center px-6">
          <div id="protein-pot-wrap" className="relative z-10 w-full max-w-md">
            <img
              id="protein-pin-img"
              src="/whaypng.png"
              alt="Pote de whey girando no scroll"
              className="mx-auto max-h-[420px] w-auto object-contain will-change-transform"
            />
          </div>
        </div>

        <div id="protein-zoom-bg" className="absolute inset-0 opacity-0 will-change-transform">
          <img
            src="/imgparafundodesitefit.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover [mask-image:radial-gradient(75%_70%_at_50%_50%,black_35%,transparent_78%)] [-webkit-mask-image:radial-gradient(75%_70%_at_50%_50%,black_35%,transparent_78%)]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(70%_65%_at_50%_50%,transparent_30%,rgba(9,9,11,0.9)_75%)]" />
        </div>

        <div id="protein-products" className="absolute inset-0 grid place-items-center px-4 opacity-0 will-change-transform sm:px-6">
          <div className="w-full max-w-6xl rounded-3xl border border-white/15 bg-black/60 p-4 backdrop-blur-md sm:p-8">
            <h2 className="mb-4 text-2xl font-extrabold text-white">
              Mais vendidos
            </h2>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {lista.map((produto) => (
                <ProductRevealCard
                  key={produto.id}
                  produto={produto}
                  aoAdicionarCarrinho={aoAdicionarCarrinho}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}