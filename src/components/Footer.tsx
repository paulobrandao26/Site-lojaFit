import { Mail, MapPin, Phone, ArrowRight, AtSign, Globe, Share2 } from 'lucide-react';
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
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#d9a322]/5 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#a3ff5e]/5 blur-3xl" />
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
            <h3 className="mb-2 text-3xl font-bold text-white lg:text-4xl">
              Fique por dentro
            </h3>
            <p className="text-gray-400">
              Receba ofertas exclusivas, dicas de treino e lançamentos direto no seu e-mail.
            </p>
          </div>

          <form onSubmit={handleNewsletter} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail"
              required
              className="flex-1 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:border-[#d9a322] focus:outline-none focus:ring-2 focus:ring-[#d9a322]/50"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d9a322] to-[#a3ff5e] px-6 py-3 font-semibold text-black transition-shadow hover:shadow-xl"
            >
              {subscribed ? 'Inscrito!' : 'Inscrever'}
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </form>
        </motion.div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link to="/" className="mb-4 inline-block text-2xl font-extrabold">
              <span className="text-white">LOJA</span>
              <span className="bg-gradient-to-r from-[#d9a322] to-[#a3ff5e] bg-clip-text text-transparent">FIT</span>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              Suplementos premium desenvolvidos para quem busca resultados reais. Qualidade superior em cada pote.
            </p>
            <div className="flex gap-3">
              <SocialLink href="#" icon={<AtSign className="h-4 w-4" />} label="Instagram" />
              <SocialLink href="#" icon={<Globe className="h-4 w-4" />} label="Site" />
              <SocialLink href="#" icon={<Share2 className="h-4 w-4" />} label="Compartilhar" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">
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
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">
              Suporte
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-400 transition-colors hover:text-[#d9a322]">
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 transition-colors hover:text-[#d9a322]">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 transition-colors hover:text-[#d9a322]">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 transition-colors hover:text-[#d9a322]">
                  FAQ
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-[#d9a322]" />
                <a href="mailto:paulobrandaohbb@gmail.com" className="text-sm text-gray-400 transition-colors hover:text-white">
                  paulobrandaohbb@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-[#d9a322]" />
                <a href="tel:+5581985265480" className="text-sm text-gray-400 transition-colors hover:text-white">
                  (81) 98526-5480
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-[#d9a322]" />
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
          <p>
            Desenvolvido por{' '}
            <span className="font-semibold bg-gradient-to-r from-[#d9a322] to-[#a3ff5e] bg-clip-text text-transparent">
              Paulo Brandão
            </span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <motion.a
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.9 }}
      href={href}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-gray-400 transition-all hover:border-[#d9a322] hover:bg-[#d9a322]/10 hover:text-[#d9a322]"
    >
      {icon}
    </motion.a>
  );
}

function FooterLink({ to, children }: { to: string; children: string }) {
  return (
    <li>
      <Link to={to} className="group relative inline-block text-sm text-gray-400 transition-colors hover:text-[#d9a322]">
        {children}
        <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[#d9a322] transition-transform group-hover:scale-x-100" />
      </Link>
    </li>
  );
}