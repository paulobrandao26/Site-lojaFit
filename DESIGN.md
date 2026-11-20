# Loja Fit · Design

Referência de estilo: loja de moda fitness brasileira (vitrine limpa, fotos grandes, fundo branco).
Inspirado no estilo, sem copiar código, textos, fotos ou marca de ninguém. Nome e logo: Loja Fit.

## Ideia
Vitrine estática e direta: foto grande no topo, faixa de vantagens, grade de produtos com fotos altas e categorias com foto.
Quase sem efeitos: só zoom leve na foto ao passar o mouse e transição de cor nos botões.

## Cores
| Token | Claro (padrão) | Escuro | Uso |
|---|---|---|---|
| `ground` | `#ffffff` | `#111111` | fundo |
| `surface` | `#f4f4f2` | `#1b1b1b` | blocos, fundo das fotos |
| `line` | `#e6e6e3` | `#2a2a2a` | bordas finas |
| `ink` | `#111111` | `#f4f4f2` | texto |
| `muted` | `#6b6b6b` | `#a3a3a3` | texto secundário |
| `plate` | `#111111` | `#f4f4f2` | botão principal (preto) |
| `sale` | `#c2410c` | `#fb923c` | selo de desconto e preço em oferta |
| `danger` | `#b42318` | `#f87171` | só erros |

## Tipografia
- **Inter** em tudo. Títulos 600, `letter-spacing: -0.02em`. Menu e selos 13px.

## Layout
- Faixa de aviso no topo (fundo preto) com um fato real da loja.
- Cabeçalho: logo à esquerda, menu de categorias no centro, tema e carrinho à direita.
- Hero: foto de academia de ponta a ponta, título grande e um botão.
- Faixa de vantagens com fatos reais (pagamento Stripe, maior desconto calculado dos produtos, compra sem cadastro).
- Grade de produtos 4 colunas (2 no celular), foto 3:4.
- "Compre por categoria": blocos com foto do produto e nome.
- Largura máxima 1280px. Entre seções 64px.

## Componentes
- Botão principal: preto, texto branco, 48px, raio 4px.
- Selo de desconto: `sale`, texto branco, 12px, raio 2px.
- Card de produto: só foto + nome + preço; sem borda; foto aproxima 3% no hover.

## Regras
- Seguir a skill `leis-de-ux` e as skills em `.claude/skills`.
- Sem 3D, shader ou scroll fixo.
- Sem números, frete ou cupons inventados.
