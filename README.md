# Kassimos Bolos Decorados — site de encomendas

Site estático responsivo em HTML, CSS e JavaScript puro. Foi pensado para **encomenda sob medida**, não para cardápio: a pessoa vê os trabalhos, escolhe o tamanho, preenche o pedido e o site abre o WhatsApp com a mensagem já montada.

## Como visualizar
Abra `index.html` no navegador. Para editar, abra a pasta no VS Code.

## Arquivos
- `index.html`: textos e estrutura das seções.
- `style.css`: cores, tipografia e layout responsivo.
- `script.js`: menu mobile, formulário de pedido, sugestão de tamanho e botões "Quero assim".
- `images/`: fotos dos bolos (veja abaixo).

## Fotos dos bolos
O site não usa mais fotos de banco de imagens. Enquanto uma foto não existir, aparece um quadro rosa com o ícone de bolo no lugar.

Crie uma pasta `images` ao lado do `index.html` e salve as fotos reais (as do Instagram servem) com estes nomes:

| Arquivo | Bolo |
|---|---|
| `images/bolo-vintage.jpg` | Vintage com rosas bordô (também aparece no topo do site) |
| `images/bolo-degrade.jpg` | Degradê azul e rosa |
| `images/bolo-naked.jpg` | Naked cake com wafer e alecrim |
| `images/bolo-anime.jpg` | Tema anime |
| `images/bolo-topper.jpg` | Topper divertido com laço verde |

Dica: fotos em formato retrato (4:5) ou quadrado ficam melhores, e vale reduzir o tamanho do arquivo (até uns 300 KB cada) para o site abrir rápido no celular.

## WhatsApp e contato
O número fica em **um lugar só**, no topo do `script.js`:

```js
const WHATSAPP_NUMBER = "5521967790142";
```

Use código do país + DDD + número, só dígitos. Os links e o número exibido no site são atualizados a partir dele. O número atual foi tirado do flyer do Instagram: confirme se é o mesmo do WhatsApp.

## Como o pedido funciona
1. A pessoa preenche nome, data, ocasião, tamanho, tema etc.
2. Ao enviar, o site monta uma mensagem e abre `wa.me` com ela pronta.
3. Fotos de referência a pessoa anexa na própria conversa.

Os botões "Escolher este tamanho" e "Quero assim" preenchem o formulário automaticamente. A caixa "Quantas pessoas vão comemorar?" sugere o aro com base nas fatias de cada tamanho (a lista `SIZES` no `script.js`).

## Antes de publicar
1. Coloque as fotos reais em `images/`.
2. Confirme o número do WhatsApp.
3. Revise os tamanhos e as fatias com a Kassimos (aro 15: 10–15, aro 21: 20–28, aro 25: 35–40, conforme o flyer).
4. Se quiser, acrescente prazo mínimo de encomenda, formas de pagamento e região de entrega. Esses dados não estão no site porque ainda não foram informados.
5. Teste no celular e no computador, enviando um pedido de teste.

## Identidade visual
Paleta puxada do logotipo do Instagram: vinho (bordô) sobre rosa claro e creme, com um toque de verde-sálvia. Títulos em serifa (Playfair Display), textos em DM Sans e cursiva (Parisienne) reservada ao nome da marca. O ícone de bolo do topo é um desenho simples; quando houver o arquivo do logotipo, ele pode substituir o `brand-mark` no `index.html`.
