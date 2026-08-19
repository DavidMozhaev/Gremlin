// Positions are normalized (0..1) coordinates of each lamp within the
// original background image (фон.PNG, 1672x941), found by sampling the
// brightest green-yellow pixel cluster at each indicator.
const LAMPS = [
  { fx: 0.14727, fy: 0.46493, size: 26 }, // SIGNAL IN lamp
  { fx: 0.53240, fy: 0.18759, size: 14 }, // CTRL NODE led
  { fx: 0.71970, fy: 0.84899, size: 24 }, // GROUND BUS lamp
];

const bgImage = document.querySelector(".bg-image");
const lightsLayer = document.getElementById("lights-layer");
const dustLayer = document.getElementById("dust-layer");

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

// ---- lamps: positioned to match the "cover"-scaled background image ----
function buildLamps() {
  lightsLayer.innerHTML = "";
  LAMPS.forEach((lamp) => {
    const el = document.createElement("div");
    el.className = "lamp";
    el.dataset.fx = lamp.fx;
    el.dataset.fy = lamp.fy;
    el.dataset.baseSize = lamp.size;

    const duration = rand(2.6, 5.4).toFixed(2);
    const delay = -rand(0, duration); // negative delay => random phase on load
    const lampMin = rand(0.25, 0.4).toFixed(2);
    const lampMax = rand(0.85, 1).toFixed(2);

    el.style.animationDuration = `${duration}s`;
    el.style.animationDelay = `${delay}s`;
    el.style.setProperty("--lamp-min", lampMin);
    el.style.setProperty("--lamp-max", lampMax);

    lightsLayer.appendChild(el);
  });
  layoutLamps();
}

function layoutLamps() {
  const naturalW = bgImage.naturalWidth || 1672;
  const naturalH = bgImage.naturalHeight || 941;
  const stageW = lightsLayer.clientWidth;
  const stageH = lightsLayer.clientHeight;
  if (!stageW || !stageH) return;

  const scale = Math.max(stageW / naturalW, stageH / naturalH);
  const scaledW = naturalW * scale;
  const scaledH = naturalH * scale;
  const offsetX = (stageW - scaledW) / 2;
  const offsetY = (stageH - scaledH) / 2;

  lightsLayer.querySelectorAll(".lamp").forEach((el) => {
    const fx = parseFloat(el.dataset.fx);
    const fy = parseFloat(el.dataset.fy);
    const baseSize = parseFloat(el.dataset.baseSize);
    const px = offsetX + fx * scaledW;
    const py = offsetY + fy * scaledH;
    const size = Math.max(4, baseSize * scale);

    el.style.left = `${px}px`;
    el.style.top = `${py}px`;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
  });
}

// ---- dust: slow, faint drifting particles across the whole viewport ----
function buildDust(count = 46) {
  dustLayer.innerHTML = "";
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = "dust";

    const size = rand(1, 3).toFixed(2);
    const duration = rand(18, 40).toFixed(2);
    const delay = -rand(0, duration);
    const opacity = rand(0.12, 0.4).toFixed(2);

    el.style.left = `${rand(0, 100).toFixed(2)}%`;
    el.style.top = `${rand(0, 100).toFixed(2)}%`;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.animationDuration = `${duration}s`;
    el.style.animationDelay = `${delay}s`;
    el.style.setProperty("--dust-op", opacity);
    el.style.setProperty("--dust-dx", `${rand(-24, 24).toFixed(1)}px`);
    el.style.setProperty("--dust-dy", `${rand(-30, -10).toFixed(1)}px`);
    el.style.setProperty("--dust-dx2", `${rand(-24, 24).toFixed(1)}px`);
    el.style.setProperty("--dust-dy2", `${rand(10, 30).toFixed(1)}px`);

    frag.appendChild(el);
  }
  dustLayer.appendChild(frag);
}

function init() {
  buildDust();
  if (bgImage.complete && bgImage.naturalWidth) {
    buildLamps();
  } else {
    bgImage.addEventListener("load", buildLamps, { once: true });
  }
}

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(layoutLamps, 80);
});

document.addEventListener("DOMContentLoaded", init);
