import { useRef } from 'react'
import gsap from 'gsap'
import './AddToCartButton.css'

export function AddToCartButton({ onClick, compact }: { onClick?: () => void; compact?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null)
  const travado = useRef(false)

  function handleClick() {
    const button = ref.current
    if (!button || travado.current) return
    travado.current = true
    onClick?.()

    const span = button.querySelector('span')
    const shirt = button.querySelector('.shirt')
    const cart = button.querySelector('.cart')
    const tick = button.querySelector('.tick')
    const morphPath = button.querySelector('.morph path') as unknown as SVGPathElement

    const tl = gsap.timeline({
      onComplete() {
        travado.current = false
        gsap.set(button, { scale: 1 })
        gsap.set(shirt, { y: -46, scale: 0 })
        gsap.set(cart, { x: -48, y: 0, rotate: 0, scale: 0.75 })
        gsap.set(span, { opacity: 1, x: 12 })
        gsap.set(tick, { attr: { 'stroke-dashoffset': 10 } })
        if (morphPath) morphPath.setAttribute('d', 'M0 12C6 12 17 12 32 12C47.9024 12 58 12 64 12V13H0V12Z')
      }
    })

    // aperta o botão
    tl.to(button, { scale: 0.97, duration: 0.15 }, 0)
    tl.to(button, { scale: 1, duration: 1, ease: 'elastic.out(1, .6)' }, 0.15)
    // some o texto
    tl.to(span, { opacity: 0, duration: 0.25 }, 0)
    // onda de cima
    if (morphPath) {
      tl.to(morphPath, { attr: { d: 'M0 12C6 12 20 10 32 0C43.9024 9.99999 58 12 64 12V13H0V12Z' }, duration: 0.25, ease: 'power1.out' }, 0)
      tl.to(morphPath, { attr: { d: 'M0 12C6 12 17 12 32 12C47.9024 12 58 12 64 12V13H0V12Z' }, duration: 0.15 }, 0.25)
    }
    // camisa cai de cima
    tl.fromTo(shirt, { y: -46, scale: 1 }, { y: -38, duration: 0.4, ease: 'power1.in' }, 0.1)
    tl.to(shirt, { y: 18, scale: 0.9, duration: 0.3, ease: 'power1.in' }, 0.5)
    tl.to(shirt, { scale: 0, duration: 0.25 }, 0.75)
    // carrinho entra
    tl.fromTo(cart, { x: -48, scale: 0.75 }, { x: 0, scale: 1, duration: 0.4, ease: 'power1.out' }, 0.1)
    // carrinho leva a camisa e sai andando pra direita
    tl.to(cart, { y: 2, duration: 0.1 }, 0.95)
    tl.to(cart, { y: 0, duration: 0.15 }, 1.05)
    tl.to(tick, { attr: { 'stroke-dashoffset': 0 }, duration: 0.2 }, 1.05)
    tl.to(cart, { x: 52, rotate: -15, duration: 0.2 }, 1.25)
    tl.to(cart, { x: 110, rotate: 0, duration: 0.25 }, 1.45)
    // volta pela esquerda com o check e o texto volta
    tl.fromTo(cart, { x: -110 }, { x: -48, scale: 0.75, duration: 0.3 }, 1.7)
    tl.to(span, { opacity: 1, x: 12, duration: 0.25 }, 1.7)
    tl.to(span, { x: 12, duration: 0.01 }, 1.7)
  }

  return (
    <button ref={ref} className={compact ? 'add-to-cart add-to-cart--compact' : 'add-to-cart'} type="button" onClick={handleClick}>
      <span>Adicionar ao carrinho</span>
      <svg className="morph" viewBox="0 0 64 13"><path d="M0 12C6 12 17 12 32 12C47.9024 12 58 12 64 12V13H0V12Z" /></svg>
      <div className="shirt">
        <svg viewBox="0 0 24 24"><path d="M4.99997 3L8.99997 1.5C8.99997 1.5 10.6901 3 12 3C13.3098 3 15 1.5 15 1.5L19 3L22.5 8L19.5 10.5L19 9.5L17.1781 18.6093C17.062 19.1901 16.778 19.7249 16.3351 20.1181C15.4265 20.925 13.7133 22.3147 12 23C10.2868 22.3147 8.57355 20.925 7.66487 20.1181C7.22198 19.7249 6.93798 19.1901 6.82183 18.6093L4.99997 9.5L4.5 10.5L1.5 8L4.99997 3Z" /></svg>
      </div>
      <div className="cart">
        <svg viewBox="0 0 36 26">
          <path d="M1 2.5H6L10 18.5H25.5L28.5 7.5L7.5 7.5" className="shape" />
          <path d="M11.5 25C12.6046 25 13.5 24.1046 13.5 23C13.5 21.8954 12.6046 21 11.5 21C10.3954 21 9.5 21.8954 9.5 23C9.5 24.1046 10.3954 25 11.5 25Z" className="wheel" />
          <path d="M24 25C25.1046 25 26 24.1046 26 23C26 21.8954 25.1046 21 24 21C22.8954 21 22 21.8954 22 23C22 24.1046 22.8954 25 24 25Z" className="wheel" />
          <path d="M14.5 13.5L16.5 15.5L21.5 10.5" className="tick" />
        </svg>
      </div>
    </button>
  )
}