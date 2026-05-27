# Imagens do site MedControl

Coloque aqui as capturas de tela e mockups do app para substituir os placeholders.

## Arquivos esperados

| Arquivo                       | Onde aparece                       | Dimensão sugerida    |
|-------------------------------|------------------------------------|----------------------|
| `hero-mockup.png`             | Mockup do celular na seção Hero    | 720 x 1520 (9:19)    |
| `screen-home.png`             | Carrossel Screenshots — tela 1     | 720 x 1520           |
| `screen-agenda.png`           | Carrossel Screenshots — tela 2     | 720 x 1520           |
| `screen-medicamento.png`      | Carrossel Screenshots — tela 3     | 720 x 1520           |
| `screen-paciente.png`         | Carrossel Screenshots — tela 4     | 720 x 1520           |

## Como substituir

No `index.html`, procure os comentários `<!-- Substitua por ... -->` e troque o `<div class="phone">` ou `<div class="shot">` por uma `<img>` real:

```html
<img src="/assets/images/hero-mockup.png"
     alt="Tela inicial do MedControl mostrando a agenda do dia"
     width="280" loading="lazy" />
```

Sempre forneça um `alt` descritivo (acessibilidade + SEO).

## Formatos recomendados

- **PNG** para mockups com fundo transparente.
- **WebP** ou **AVIF** para telas reais (menores e suportados em todos os navegadores modernos).
- Tamanho de arquivo: idealmente abaixo de 200 KB por imagem.
