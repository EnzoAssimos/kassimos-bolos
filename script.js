// ============================================================
//  Configurações da Kassimos Bolos — altere só aqui
// ============================================================
// Número do WhatsApp: código do país + DDD + número, somente dígitos.
const WHATSAPP_NUMBER = "5521967790142";
const BUSINESS_NAME = "Kassimos Bolos";

// Tamanhos e quantidade máxima de fatias (usado na sugestão por nº de pessoas).
const SIZES = [
  { id: "Aro 15", slices: "10 a 15 fatias", max: 15 },
  { id: "Aro 21", slices: "20 a 28 fatias", max: 28 },
  { id: "Aro 25", slices: "35 a 40 fatias", max: 40 },
];

// ============================================================
//  Menu mobile
// ============================================================
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuButton?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  menuButton.textContent = isOpen ? "✕" : "☰";
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Abrir menu");
    if (menuButton) menuButton.textContent = "☰";
  });
});

// ============================================================
//  WhatsApp
// ============================================================
function whatsappUrl(message = "") {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${WHATSAPP_NUMBER}${text}`;
}

function formatPhone(digits) {
  // 5521967790142 -> (21) 96779-0142
  const ddd = digits.slice(2, 4);
  const local = digits.slice(4);
  const split = local.length - 4;
  return `(${ddd}) ${local.slice(0, split)}-${local.slice(split)}`;
}

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  link.href = whatsappUrl(`Oi! Vim pelo site da ${BUSINESS_NAME}.`);
});
document.querySelectorAll("[data-whatsapp-label]").forEach((el) => {
  el.textContent = formatPhone(WHATSAPP_NUMBER);
});

// ============================================================
//  Formulário de pedido
// ============================================================
const form = document.querySelector("#order-form");
const nameInput = document.querySelector("#name");
const dateInput = document.querySelector("#date");
const occasionSelect = document.querySelector("#occasion");
const sizeSelect = document.querySelector("#size");
const peopleInput = document.querySelector("#people");
const flavorInput = document.querySelector("#flavor");
const themeInput = document.querySelector("#theme");
const addressWrap = document.querySelector("#address-wrap");
const addressInput = document.querySelector("#address");
const statusEl = document.querySelector("#form-status");
const DEFAULT_STATUS = statusEl?.textContent ?? "";

// Não deixa escolher uma data que já passou.
if (dateInput) {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  dateInput.min = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

// Mostra o campo de endereço só quando for entrega.
form?.querySelectorAll('input[name="delivery"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    const isDelivery = form.elements.delivery.value === "Entrega";
    if (addressWrap) addressWrap.hidden = !isDelivery;
    if (!isDelivery && addressInput) addressInput.value = "";
  });
});

function flash(el) {
  const field = el?.closest(".field");
  if (!field) return;
  field.classList.add("flash");
  setTimeout(() => field.classList.remove("flash"), 1600);
}

function goToOrder(highlightEl) {
  document.querySelector("#encomenda")?.scrollIntoView();
  flash(highlightEl);
}

function formatDate(iso) {
  const [year, month, day] = iso.split("-");
  return year && month && day ? `${day}/${month}/${year}` : iso;
}

function buildMessage() {
  const lines = [`Oi! Vim pelo site da ${BUSINESS_NAME} e gostaria de fazer uma encomenda.`, ""];
  const add = (label, value) => {
    if (!value) return;
    lines.push(value.includes("\n") ? `*${label}:*\n${value}` : `*${label}:* ${value}`);
  };

  const sizeText = sizeSelect?.value
    ? sizeSelect.selectedOptions[0].textContent.trim()
    : "Ainda não sei, preciso de ajuda para escolher";

  let delivery = form.elements.delivery.value;
  if (delivery === "Entrega" && addressInput?.value.trim()) {
    delivery = `Entrega (${addressInput.value.trim()})`;
  }

  add("Nome", nameInput.value.trim());
  add("Data da comemoração", dateInput.value ? formatDate(dateInput.value) : "");
  add("Ocasião", occasionSelect.value);
  add("Tamanho", sizeText);
  add("Pessoas", peopleInput.value.trim());
  add("Sabor ou recheio", flavorInput.value.trim());
  add("Tema e inspiração", themeInput.value.trim());
  add("Retirada ou entrega", delivery);

  lines.push("", "Posso enviar fotos de referência por aqui?");
  return lines.join("\n");
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const url = whatsappUrl(buildMessage());

  // Abre o WhatsApp em uma nova aba (um clique em link é mais confiável que window.open).
  const opener = document.createElement("a");
  opener.href = url;
  opener.target = "_blank";
  opener.rel = "noopener";
  opener.click();

  // Plano B caso o navegador bloqueie a nova aba.
  if (statusEl) {
    statusEl.textContent = "Abrindo o WhatsApp… se não abrir, ";
    const fallback = document.createElement("a");
    fallback.href = url;
    fallback.target = "_blank";
    fallback.rel = "noopener";
    fallback.textContent = "toque aqui para enviar o pedido";
    statusEl.append(fallback, ".");
  }
});

// Se a pessoa mexer no formulário depois de enviar, volta o aviso padrão.
form?.addEventListener("input", () => {
  if (statusEl && statusEl.textContent !== DEFAULT_STATUS) statusEl.textContent = DEFAULT_STATUS;
});

// ============================================================
//  Tamanhos: botões e sugestão por número de pessoas
// ============================================================
const guestInput = document.querySelector("#guest-count");
const guestResult = document.querySelector("#guest-result");
const sizeCards = document.querySelectorAll(".size-card");

function chooseSize(sizeId) {
  if (sizeSelect) sizeSelect.value = sizeId;
  if (guestInput?.value && peopleInput && !peopleInput.value) peopleInput.value = guestInput.value;
  goToOrder(sizeSelect);
}

sizeCards.forEach((card) => {
  card.querySelector(".size-pick")?.addEventListener("click", () => chooseSize(card.dataset.size));
});

guestInput?.addEventListener("input", () => {
  sizeCards.forEach((card) => card.classList.remove("is-suggested"));
  const guests = parseInt(guestInput.value, 10);

  if (!guests || guests < 1) {
    guestResult.textContent = "Digite o número de convidados e sugerimos o tamanho.";
    return;
  }

  const match = SIZES.find((size) => guests <= size.max);
  if (!match) {
    guestResult.textContent = "Para mais de 40 pessoas, fale com a gente no WhatsApp para pensarmos juntos na melhor opção.";
    return;
  }

  const who = guests === 1 ? "1 pessoa" : `${guests} pessoas`;
  guestResult.textContent = `Para ${who}, a sugestão é o ${match.id} (${match.slices}).`;
  document.querySelector(`.size-card[data-size="${match.id}"]`)?.classList.add("is-suggested");
});

// ============================================================
//  Galeria: "Quero assim" leva a inspiração para o pedido
// ============================================================
document.querySelectorAll(".work-pick").forEach((button) => {
  button.addEventListener("click", () => {
    const note = `Gostei do estilo: ${button.dataset.inspiration}.`;
    if (themeInput && !themeInput.value.includes(note)) {
      const current = themeInput.value.trim();
      themeInput.value = current ? `${current}\n${note}` : note;
    }
    goToOrder(themeInput);
  });
});
