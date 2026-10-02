import { AtSign, Globe, Mail, MapPin, Phone, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="text-lg font-extrabold text-neutral-900 dark:text-white">
            LOJA<span className="text-lime-500">FIT</span>
          </span>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Suplementos e acessórios para quem leva o treino a sério.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-white">
            Contato
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-neutral-500 dark:text-neutral-400">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-lime-500" /> paulobrandaohbb@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-lime-500" /> (81) 98526-5480
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-lime-500" /> Recife, CE
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-white">
            Loja
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-neutral-500 dark:text-neutral-400">
            <li><Link to="/produtos" className="hover:text-lime-500">Todos os produtos</Link></li>
            <li><Link to="/" className="hover:text-lime-500">Início</Link></li>
            <li><Link to="/afiliados" className="hover:text-lime-500">Seja afiliado</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 dark:text-white">
            Redes
          </h3>
          <div className="mt-4 flex gap-3">
            <a href="#" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-neutral-200 text-neutral-500 transition hover:border-lime-500 hover:text-lime-500 dark:border-neutral-800">
              <AtSign className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Site" className="grid h-10 w-10 place-items-center rounded-full border border-neutral-200 text-neutral-500 transition hover:border-lime-500 hover:text-lime-500 dark:border-neutral-800">
              <Globe className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Compartilhar" className="grid h-10 w-10 place-items-center rounded-full border border-neutral-200 text-neutral-500 transition hover:border-lime-500 hover:text-lime-500 dark:border-neutral-800">
              <Share2 className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 text-center text-xs text-neutral-400 sm:flex-row sm:text-left dark:text-neutral-500">
          <p>© {new Date().getFullYear()} Loja Fit. Todos os direitos reservados.</p>
          <p>
            Criado por <span className="font-bold text-lime-500">Paulo</span> · Feito com React + Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}