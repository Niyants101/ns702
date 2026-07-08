const glow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (event) => {
  glow.style.left = event.clientX + "px";
  glow.style.top = event.clientY + "px";
});

const panels = document.querySelectorAll(".panel");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15
  }
);

panels.forEach((panel) => observer.observe(panel));
