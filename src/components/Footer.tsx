import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-iron">
      <div className="pointer-events-none absolute inset-0">
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 grid gap-8 border-b border-white/10 pb-16 lg:grid-cols-2 lg:items-center"
        >
          <div>
            <h3 className="font-display mb-2 text-4xl text-white">
              Fique por dentro
            </h3>
            <p className="text-gray-400">
              Receba ofertas exclusivas, dicas de treino e lançamentos direto no seu e-mail.
            </p>
          </div>

          <form onSubmit={handleNewsletter} className="flex gap-2">
            <label htmlFor="newsletter-email" className="sr-only">Seu e-mail</label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              spellCheck={false}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nome@email.com…"
              required
              className="min-w-0 flex-1 rounded-lg border border-white/20 bg-white/5 px-4 h-12 text-white placeholder-gray-500 backdrop-blur-sm transition-colors focus-visible:border-plate focus-visible:ring-2 focus-visible:ring-plate/50"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-plate px-6 py-3 font-semibold text-onplate transition-shadow hover:shadow-xl"
            >
              <span aria-live="polite">{subscribed ? 'Inscrito!' : 'Inscrever'}</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </form>
        </motion.div>

        <div className="grid gap-12 sm:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link to="/" className="mb-4 inline-block text-2xl font-extrabold">
              <span className="font-display flex items-center gap-2 text-2xl text-white"><span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-full bg-white"><span className="h-2 w-2 rounded-full bg-iron" /></span>Loja Fit</span>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              Suplementos premium desenvolvidos para quem busca resultados reais. Qualidade superior em cada pote.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="mb-6 text-sm font-medium text-white">
              Loja
            </h4>
            <ul className="space-y-3">
              <FooterLink to="/">Início</FooterLink>
              <FooterLink to="/produtos">Todos os Produtos</FooterLink>
              <FooterLink to="/afiliados">Seja Afiliado</FooterLink>
              <FooterLink to="/carrinho">Carrinho</FooterLink>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="mb-6 text-sm font-medium text-white">
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-plate" />
                <a href="mailto:paulobrandaohbb@gmail.com" className="text-sm text-gray-400 transition-colors hover:text-white">
                  paulobrandaohbb@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-plate" />
                <a href="tel:+5581985265480" className="text-sm text-gray-400 transition-colors hover:text-white">
                  (81) 98526-5480
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-plate" />
                <span className="text-sm text-gray-400">
                  Recife, PE<br />Brasil
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center text-sm text-gray-500 sm:flex-row sm:text-left"
        >
          <p>
            © {new Date().getFullYear()} LojaFit. Todos os direitos reservados.
          </p>
          <p className="text-xs">
            Foto de academia: <a href="https://unsplash.com/@dncerullo" className="underline hover:text-white" target="_blank" rel="noreferrer">@dncerullo</a> no Unsplash.
          </p>
          <p>
            Desenvolvido por{' '}
            <span className="font-semibold bg-plate bg-clip-text text-transparent">
              Paulo Brandão
            </span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}


function FooterLink({ to, children }: { to: string; children: string }) {
  return (
    <li>
      <Link to={to} className="group relative inline-block text-sm text-gray-400 transition-colors hover:text-plate">
        {children}
        <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-plate transition-transform group-hover:scale-x-100" />
      </Link>
    </li>
  );
}