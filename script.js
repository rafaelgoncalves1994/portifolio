
function decodeEffect(
  element,
  finalText,
  speed = 50,
  charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*"
) {
  let iterations = 0;
  const length = finalText.length;

  const interval = setInterval(() => {
    let output = "";

    for (let i = 0; i < length; i++) {
      if (i < iterations) {
        output += finalText[i];
      } else {
        output += charset[Math.floor(Math.random() * charset.length)];
      }
    }

    element.textContent = output;

    if (iterations >= length) {
      clearInterval(interval);
      element.textContent = finalText;
    }

    iterations += 1;
  }, speed);
}

function initCardTilt() {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const height = card.clientHeight;
    const width = card.clientWidth;

    card.addEventListener("mousemove", (e) => {
      const xVal = ((e.offsetX - width / 2) / width) * 20;
      const yVal = (-(e.offsetY - height / 2) / height) * 20;
      card.style.transform = `rotateY(${xVal}deg) rotateX(${yVal}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("hero");

  if (hero) {
    const h1 = hero.querySelector("h1");
    const p = hero.querySelector("p");

    if (h1 && p) {
      const h1Text = h1.textContent;
      const pText = p.textContent;

    
      h1.textContent = "";
      p.textContent = "";

      
      decodeEffect(h1, h1Text, 80);
      setTimeout(() => decodeEffect(p, pText, 70), 1200);
    }
  }

  initCardTilt();
});
