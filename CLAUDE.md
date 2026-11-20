# Loja Fit

Front-end da loja (Vite + React + TypeScript + Tailwind). Back-end: Cloudflare Worker em `C:\dev\loja-fit-backend\loja-fit-worker`.

## Regras de front-end (obrigatório)
Toda mudança de interface, design, cor, fonte, layout ou animação deve consultar e seguir **todas** estas referências:

1. `DESIGN.md` (sistema de design da loja, baseado em `claude/DESIGN.md`)
2. Skill `leis-de-ux` (20 leis de UX, global)
3. Skills em `.claude/skills/`:
   - `design-taste-frontend`: visual profissional, sem cara genérica
   - `impeccable`: design, polimento e animação
   - `frontend-design`: identidade visual própria
   - `web-design-guidelines`: revisão com as regras da Vercel
   - `playwright-cli`: testar no navegador

Depois de mudar, revisar contra `web-design-guidelines` e `leis-de-ux` e conferir no navegador.

## Como o usuário trabalha
- Responder em português do Brasil, curto e objetivo.
- Depois de cada mudança: subir o site local e abrir a página.
- Push ou deploy só depois de o usuário aprovar o resultado local.

## Rodar local
- Front: `npm run dev`. A porta 5173 costuma estar ocupada, então use `npx vite --port 5174`.
- API local: em `loja-fit-worker`, `npx wrangler dev --port 8787` (o front usa `VITE_API_URL` em `.env.development.local`).
