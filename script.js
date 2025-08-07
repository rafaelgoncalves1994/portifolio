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


