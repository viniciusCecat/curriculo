# Curriculo Digital - Vinicius Cecatto

Landing page simples em React + Vite, baseada no curriculo de Vinicius Cecatto e preparada para deploy no Netlify.

## Rodar localmente

```bash
npm install
npm run dev
```

## Testar com Netlify Functions

Crie um arquivo `.env` usando o `.env.example` como base e rode:

```bash
npm run netlify:dev
```

Esse comando usa `npx` para executar a CLI do Netlify apenas quando for necessario.

O formulario envia os dados para `/api/send-email`.

## Deploy

No Netlify, conecte o repositorio do GitHub. As configuracoes principais ja estao no `netlify.toml`.
