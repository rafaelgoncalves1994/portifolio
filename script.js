function initCardTilt() {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const height = card.clientHeight;
    const width = card.clientWidth;

    card.style.transition = "transform 0.15s ease";

    card.addEventListener("mousemove", (e) => {
      const xVal = ((e.offsetX - width / 2) / width) * 20;
      const yVal = (-(e.offsetY - height / 2) / height) * 20;

      card.style.transition = "transform 0.05s ease-out";

      card.style.transform = `rotateY(${xVal}deg) rotateX(${yVal}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transition = "transform 0.3s ease";
      card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });
  });
}

function animarBarrasDeHabilidades() {
  document.querySelectorAll(".skill-progress").forEach((bar) => {
    const progress = bar.getAttribute("data-progress");
    bar.style.width = progress + "%";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCardTilt();
  animarBarrasDeHabilidades();
});

  document
    .getElementById("btn-detalhes")
    .addEventListener("click", function () {
      const container = document.querySelector(".iframe-container");


      if (container.style.display === "none") {
        container.style.display = "block";
        this.textContent = "Ocultar Detalhes"; // Muda o texto do botão
      } else {
        container.style.display = "none";
        this.textContent = "Mais Detalhes";
      }
    });