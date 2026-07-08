const glow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (event) => {
  glow.style.left = event.clientX + "px";
  glow.style.top = event.clientY + "px";
});

const tiltCards = document.querySelectorAll(".project-card, .stat-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * -9;
    const rotateY = (x / rect.width - 0.5) * 9;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

const terminalLines = document.querySelectorAll(".terminal-body p");

terminalLines.forEach((line, index) => {
  line.style.opacity = "0";
  line.style.transform = "translateY(10px)";

  setTimeout(() => {
    line.style.transition = "0.6s ease";
    line.style.opacity = "1";
    line.style.transform = "translateY(0)";
  }, 4300 + index * 450);
});
