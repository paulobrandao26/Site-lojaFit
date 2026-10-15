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
          end: '+=2400',
          scrub: 1.5,
          pin: true,
        },
      });

      // 1) Pote gira suavemente + fundo aparece com blur
      tl.to('#protein-pin-img', { 
        rotate: 720, 
        scale: 1.1, 
        ease: 'power1.inOut', 
        duration: 3 
      }, 0);
      
      tl.fromTo(
        '#protein-zoom-bg',
        { scale: 0.5, opacity: 0, filter: 'blur(40px)' },
        { scale: 1.2, opacity: 1, filter: 'blur(0px)', ease: 'power2.out', duration: 3 },
        0,
      );

      // 2) Pote desaparece suavemente com fade + blur
      tl.to('#protein-pot-wrap', { 
        opacity: 0, 
        scale: 1.3, 
        filter: 'blur(20px)',
        y: -80, 
        ease: 'power2.in', 
        duration: 1.5 
      }, 2.5);
      
      tl.to('#protein-zoom-bg', { 
        scale: 1, 
        filter: 'blur(0px)',
        ease: 'power1.out', 
        duration: 2 
      }, 2.5);

      // 3) Produtos aparecem com efeito suave
      tl.fromTo(
        '#protein-products',
        { scale: 0.85, opacity: 0, y: 120, filter: 'blur(10px)' },
        { scale: 1, opacity: 1, y: 0, filter: 'blur(0px)', ease: 'power2.out', duration: 1.8 },
        3.5,
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <section id="protein-pin" className="relative overflow-hidden bg-neutral-950">
        <div className="mx-auto grid min-h-screen max-w-[1440px] place-items-center px-6">
          <div id="protein-pot-wrap" className="relative z-10 w-full max-w-md will-change-transform">
            <img
              id="protein-pin-img"
              src="/whayproteinpng.png"
              alt="Pote de whey girando no scroll"
              className="mx-auto max-h-[420px] w-auto object-contain drop-shadow-2xl will-change-transform"
            />
          </div>
        </div>

        <div id="protein-zoom-bg" className="absolute inset-0 opacity-0 will-change-transform">
          <img
            src="/imgparafundodesitefit.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
            style={{
              maskImage: 'radial-gradient(ellipse 80% 75% at 50% 50%, black 20%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 75% at 50% 50%, black 20%, transparent 70%)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-neutral-950/40 to-neutral-950" />
        </div>

        <div id="protein-products" className="absolute inset-0 z-20 grid place-items-center px-4 opacity-0 will-change-transform sm:px-6">
          <div className="w-full max-w-6xl rounded-3xl border border-white/10 bg-black/70 p-4 shadow-2xl backdrop-blur-xl sm:p-8">
            <h2 className="mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-3xl font-extrabold text-transparent">
              Mais vendidos
            </h2>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {lista.map((produto, index) => (
                <div key={produto.id} style={{ zIndex: 10 + index }}>
                  <ProductRevealCard
                   produto={produto}
                   aoAdicionarCarrinho={aoAdicionarCarrinho}
                   enableAnimations={true}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}