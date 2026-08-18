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
