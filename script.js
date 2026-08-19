// Copy contract address
const copyBtn = document.getElementById("copy-btn");
const caValue = document.getElementById("ca-value");

if (copyBtn && caValue) {
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(caValue.textContent.trim());
      const original = copyBtn.textContent;
      copyBtn.textContent = "Copied";
      copyBtn.classList.add("copied");
      setTimeout(() => {
        copyBtn.textContent = original;
        copyBtn.classList.remove("copied");
      }, 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  });
}

// Proof grid lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");
const proofCards = document.querySelectorAll(".proof-card");

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.src = "";
  document.body.style.overflow = "";
}

proofCards.forEach((card) => {
  card.addEventListener("click", () => openLightbox(card.dataset.full));
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox && !lightbox.hidden) closeLightbox();
});

// Buy button — points at placeholder until a real URL is set
const buyBtn = document.getElementById("buy-btn");
if (buyBtn) {
  buyBtn.addEventListener("click", (e) => {
    const url = buyBtn.dataset.buyUrl;
    if (!url || url.startsWith("PLACEHOLDER")) {
      e.preventDefault();
    } else {
      buyBtn.href = url;
    }
  });
}
