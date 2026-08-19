export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white px-6 py-10 transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <span className="text-lg font-extrabold text-neutral-900 dark:text-white">
            LOJA<span className="text-lime-500">FIT</span>
          </span>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            Produtos fitness para quem leva o treino a sério.
          </p>
        </div>
        <p className="text-xs text-neutral-400 dark:text-neutral-500">
          © {new Date().getFullYear()} Loja Fit. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}