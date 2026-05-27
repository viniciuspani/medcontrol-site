# MedControl — Site institucional

Site estático de marketing para o app **MedControl** (gestão de medicamentos para Android).
Construído em **HTML + CSS + JavaScript puros**, sem frameworks, sem build, sem dependências externas.

> Domínio principal previsto: `medcontrol.tec.br`
> Subdomínio legal previsto: `privacidade.medcontrol.tec.br`

---

## Sumário

- [Estrutura de pastas](#estrutura-de-pastas)
- [Rodando localmente](#rodando-localmente)
- [Deploy na Vercel](#deploy-na-vercel)
- [Deploy na Netlify](#deploy-na-netlify)
- [Configuração de DNS (subdomínio privacidade)](#configuração-de-dns-subdomínio-privacidade)
- [Substituindo placeholders](#substituindo-placeholders)
- [Trocando o domínio](#trocando-o-domínio)
- [Checklist antes de publicar](#checklist-antes-de-publicar)

---

## Estrutura de pastas

```
medcontrol-site/
├── index.html                    # Landing principal
├── 404.html                      # Erro amigável
├── assets/
│   ├── css/styles.css            # Estilos (CSS variables com a paleta da marca)
│   ├── js/script.js              # Menu mobile, FAQ accordion, ano dinâmico
│   ├── brand/                    # SVGs oficiais (mark, vertical, app-icon)
│   ├── images/                   # Coloque os screenshots aqui (ver README na pasta)
│   └── og/                       # Imagem 1200x630 para compartilhamento social
├── privacidade/
│   ├── index.html                # Política de Privacidade (placeholder LGPD)
│   └── termos.html               # Termos de Uso (placeholder)
├── robots.txt
├── sitemap.xml
├── vercel.json                   # Headers de segurança + rewrites para subdomínio
├── netlify.toml                  # Equivalente para Netlify
└── README.md
```

---

## Rodando localmente

Você precisa de **qualquer servidor estático**. Algumas opções:

### Python (já vem instalado em macOS/Linux/Windows)

```bash
cd medcontrol-site
python -m http.server 8000
```

Abra: http://localhost:8000

### Node.js (npx serve)

```bash
cd medcontrol-site
npx serve .
```

### VS Code

Instale a extensão **Live Server** e clique em "Go Live" no rodapé.

> Importante: abrir o `index.html` direto no navegador (file://) **funciona parcialmente**, mas o subdomínio `privacidade` não será simulado e alguns links absolutos podem quebrar. Use sempre um servidor.

### Simulando o subdomínio `privacidade` localmente

Adicione ao seu `hosts`:

```
127.0.0.1   medcontrol.local
127.0.0.1   privacidade.medcontrol.local
```

E acesse `http://medcontrol.local:8000/`. (Os rewrites por host só funcionarão de fato em Vercel/Netlify; localmente acesse `/privacidade/` direto.)

---

## Deploy na Vercel

### Opção A — via GitHub (recomendado)

1. Faça commit do projeto em um repositório no GitHub.
2. Acesse https://vercel.com/new e importe o repositório.
3. Em **Framework Preset**, escolha **Other**.
4. Em **Root Directory**, deixe `.` (a raiz do repo).
5. Clique em **Deploy**. Pronto.

O arquivo `vercel.json` já configura headers de segurança e os rewrites para o subdomínio.

### Opção B — via Vercel CLI

```bash
npm i -g vercel
cd medcontrol-site
vercel           # primeiro deploy (preview)
vercel --prod    # deploy de produção
```

### Configurando os domínios na Vercel

No painel do projeto, vá em **Settings → Domains** e adicione:

- `medcontrol.tec.br`
- `www.medcontrol.tec.br` (opcional, redireciona para o principal)
- `privacidade.medcontrol.tec.br`

A Vercel vai mostrar quais registros DNS você precisa adicionar (CNAME ou A).

---

## Deploy na Netlify

### Opção A — drag & drop

1. Acesse https://app.netlify.com/drop
2. Arraste a pasta `medcontrol-site` inteira para a área indicada.
3. Pronto, site no ar com URL `*.netlify.app`.

### Opção B — via GitHub

1. https://app.netlify.com/start → conecte ao repositório.
2. **Build command**: deixe em branco.
3. **Publish directory**: `.` (raiz).
4. Deploy.

### Opção C — via CLI

```bash
npm i -g netlify-cli
cd medcontrol-site
netlify deploy           # preview
netlify deploy --prod    # produção
```

### Configurando os domínios na Netlify

Em **Site settings → Domain management**, adicione:

- `medcontrol.tec.br`
- `privacidade.medcontrol.tec.br`

A Netlify vai indicar os registros DNS necessários.

---

## Configuração de DNS (subdomínio privacidade)

No painel do seu provedor de DNS (Registro.br, Cloudflare, etc.), adicione:

### Para Vercel

| Tipo  | Nome           | Valor                          | TTL  |
|-------|----------------|--------------------------------|------|
| A     | `@`            | `76.76.21.21`                  | auto |
| CNAME | `www`          | `cname.vercel-dns.com.`        | auto |
| CNAME | `privacidade`  | `cname.vercel-dns.com.`        | auto |

### Para Netlify

| Tipo  | Nome           | Valor                                   | TTL  |
|-------|----------------|-----------------------------------------|------|
| A     | `@`            | `75.2.60.5`                             | auto |
| CNAME | `www`          | `<seu-site>.netlify.app.`               | auto |
| CNAME | `privacidade`  | `<seu-site>.netlify.app.`               | auto |

> Após adicionar os registros, leva de minutos a algumas horas para propagar. Use https://dnschecker.org/ para verificar.

O `vercel.json` / `netlify.toml` já estão configurados para que requisições ao host `privacidade.medcontrol.tec.br` sejam servidas a partir da pasta `/privacidade/`.

---

## Substituindo placeholders

### 1. Screenshots do app

Veja `assets/images/README.md` para a lista de arquivos esperados e dimensões.

No `index.html`, substitua os blocos `<div class="phone">` e `<div class="shot">` por `<img>`. Exemplo:

```html
<!-- Antes -->
<div class="phone" role="img" aria-label="Mockup">
  <div class="phone__screen"><span>Screenshot...</span></div>
</div>

<!-- Depois -->
<img class="phone-img" src="/assets/images/hero-mockup.png"
     alt="Tela inicial do MedControl" width="280" loading="lazy" />
```

### 2. Imagem Open Graph

Crie `assets/og/og-image.png` (1200x630). Veja `assets/og/README.md`.

### 3. Conteúdo legal (LGPD)

Os arquivos `privacidade/index.html` e `privacidade/termos.html` têm a estrutura completa, com marcadores `[CONTEÚDO A SER PREENCHIDO: ...]` indicando onde inserir informações específicas.

**Recomendação:** revisão por advogado especializado em LGPD antes da publicação.

### 4. Botão "Baixar na Play Store"

Quando o app for publicado, troque o link no header e nos dois CTAs:

```html
<!-- Antes -->
<a class="play-badge" href="#" aria-disabled="true" ...>

<!-- Depois -->
<a class="play-badge"
   href="https://play.google.com/store/apps/details?id=br.tec.medcontrol.app"
   ...>
```

Remova também o atributo `aria-disabled="true"`.

### 5. E-mail de contato

Padrão usado: `contato@medcontrol.tec.br`. Faça uma busca global pelo arquivo se quiser trocar.

---

## Trocando o domínio

Se o domínio final não for `medcontrol.tec.br`, faça uma busca global por essa string e substitua nos seguintes arquivos:

- `index.html` (canonical, og:url, JSON-LD, links)
- `404.html`
- `privacidade/index.html`
- `privacidade/termos.html`
- `robots.txt`
- `sitemap.xml`
- `vercel.json` (no `has.value` do rewrite)
- `netlify.toml` (na `conditions.Host`)

---

## Checklist antes de publicar

- [ ] Substituir todos os screenshots em `assets/images/`
- [ ] Criar `assets/og/og-image.png` (1200x630)
- [ ] Revisar e finalizar conteúdo de `privacidade/index.html` (LGPD)
- [ ] Revisar e finalizar conteúdo de `privacidade/termos.html`
- [ ] Trocar links da Play Store quando o app for publicado
- [ ] Confirmar o domínio (ou substituir `medcontrol.tec.br` no projeto)
- [ ] Configurar DNS dos subdomínios
- [ ] Testar Open Graph em https://www.opengraph.xyz/
- [ ] Validar HTML em https://validator.w3.org/
- [ ] Auditar Lighthouse (mira: 95+ em todas as categorias)
- [ ] Submeter `sitemap.xml` no Google Search Console

---

Feito com cuidado para o MedControl.
