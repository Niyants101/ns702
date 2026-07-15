const glow = document.querySelector(".cursor-glow");

if (glow) {
  window.addEventListener("mousemove", (event) => {
    glow.style.left = event.clientX + "px";
    glow.style.top = event.clientY + "px";
  });
}

const bootScreen = document.getElementById("bootScreen");
const bootLog = document.getElementById("bootLog");

if (bootScreen && bootLog) {
  const bootLines = [
    "INITIALIZING NS702 ARCHIVE",
    "SCANNING CASE FILES",
    "CALIBRATING SYNTHESIS CORE",
    "MAPPING ANCHOR POINTS",
    "INDEXING RESEARCH VAULT",
    "OPENING SIGNAL CHANNEL",
    "ACCESS GRANTED"
  ];

  let bootIndex = 0;

  function typeBootLine() {
    if (bootIndex < bootLines.length) {
      bootLog.innerHTML += "> " + bootLines[bootIndex] + "<br>";
      bootIndex++;
      setTimeout(typeBootLine, 260);
    }
  }

  typeBootLine();

  setTimeout(() => {
    bootScreen.classList.add("hidden");
    document.body.classList.remove("booting");
  }, 3100);
}

const canvas = document.getElementById("particleCanvas");

if (canvas) {
  const ctx = canvas.getContext("2d");

  let width;
  let height;
  let particles = [];
  const mouse = { x: null, y: null };

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  }

  function createParticles() {
    const count = Math.min(120, Math.floor(window.innerWidth / 13));
    particles = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 1.8 + 0.7
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(127, 255, 212, 0.55)";
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(119, 167, 255, ${0.18 * (1 - distance / 120)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      if (mouse.x !== null && mouse.y !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(127, 255, 212, ${0.22 * (1 - distance / 150)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(drawParticles);
  }

  window.addEventListener("resize", resizeCanvas);

  window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  });

  resizeCanvas();
  drawParticles();
}

const terminalButton = document.getElementById("terminalButton");
const terminal = document.getElementById("terminal");
const terminalClose = document.getElementById("terminalClose");
const terminalInput = document.getElementById("terminalInput");
const terminalOutput = document.getElementById("terminalOutput");
const synthesisCore = document.getElementById("synthesisCore");
const toast = document.getElementById("toast");

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function openTerminal() {
  if (!terminal || !terminalInput) return;

  terminal.classList.add("open");
  terminalInput.focus();
}

function closeTerminal() {
  if (!terminal) return;

  terminal.classList.remove("open");
}

function printTerminal(text) {
  if (!terminalOutput) return;

  terminalOutput.textContent += "\n\n" + text;
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function revealSecretLab() {
  let flash = document.querySelector(".secret-lab-flash");

  if (!flash) {
    flash = document.createElement("div");
    flash.className = "secret-lab-flash";
    document.body.appendChild(flash);
  }

  let link = document.querySelector(".secret-lab-access");

  if (!link) {
    link = document.createElement("a");
    link.href = "/lab.html";
    link.className = "secret-lab-access";
    link.textContent = "LAB NOTES";
    document.body.appendChild(link);
  }

  flash.classList.add("show");

  setTimeout(() => {
    link.classList.add("unlocked");
  }, 250);

  setTimeout(() => {
    flash.classList.remove("show");
  }, 1100);

  showToast("RESTRICTED LAYER UNLOCKED");
}

function runCommand(rawCommand) {
  const command = rawCommand.trim().toLowerCase();

  if (!command) return;

  printTerminal("> " + command);

  if (command === "help") {
    printTerminal(
      "Available commands:\n" +
      "projects\n" +
      "systems\n" +
      "profile\n" +
      "vote\n" +
      "contact\n" +
      "element\n" +
      "signal\n" +
      "web\n" +
      "detective\n" +
      "normal\n" +
      "mission\n" +
      "clear"
    );
  } else if (command === "projects") {
    printTerminal("Opening project archive...");
    window.location.href = "/projects/";
  } else if (command === "systems") {
    printTerminal("Opening systems archive...");
    window.location.href = "/systems/";
  } else if (command === "profile") {
    printTerminal("Opening identity layer...");
    window.location.href = "/profile/";
  } else if (command === "vote") {
    printTerminal("Vote system opened.");
    window.location.href = "/vote/";
  } else if (command === "contact") {
    printTerminal("Signal channel opened.");
    window.location.href = "/contact/";
  } else if (command === "secret page") {
    printTerminal("Hidden command accepted.\nRestricted layer appearing in the top right corner.");
    revealSecretLab();
  } else if (command === "element") {
    printTerminal("Element 702 synthesis incomplete.\nCurrent status: theory stable.\nPrototype required.");
    showToast("Synthesis test started");
  } else if (command === "signal") {
    printTerminal("Signal detected.\nArchive mode elevated.\nChannel stable.");
    showToast("Signal channel open");
  } else if (command === "web") {
    printTerminal("Trajectory mapped.\nAnchor points connected.\nMotion path stable.");
    showToast("Anchor points mapped");
  } else if (command === "detective") {
    document.body.classList.add("detective");
    printTerminal("Detective mode enabled.");
    showToast("Detective mode enabled");
  } else if (command === "normal") {
    document.body.classList.remove("detective");
    printTerminal("Normal archive mode restored.");
    showToast("Normal mode restored");
  } else if (command === "mission") {
    printTerminal("Mission: build systems that survive contact with reality.");
  } else if (command === "clear") {
    terminalOutput.textContent = "Terminal cleared.";
  } else {
    printTerminal("Unknown command. Type help.");
  }
}

if (terminalButton) {
  terminalButton.addEventListener("click", openTerminal);
}

if (terminalClose) {
  terminalClose.addEventListener("click", closeTerminal);
}

if (terminalInput) {
  terminalInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      runCommand(terminalInput.value);
      terminalInput.value = "";
    }
  });
}

if (synthesisCore) {
  synthesisCore.addEventListener("click", () => {
    showToast("ELEMENT 702 | STABILITY UNKNOWN");
    openTerminal();
    printTerminal("> core");
    printTerminal("Synthesis Core response:\nEnergy stable.\nElement 702 model unresolved.\nNext requirement: prototype evidence.");
  });
}

let typedKeys = "";

window.addEventListener("keydown", (event) => {
  if (terminalInput && event.target === terminalInput) return;

  typedKeys += event.key.toLowerCase();
  typedKeys = typedKeys.slice(-12);

  if (typedKeys.includes("702")) {
    showToast("ARCHIVE 702 UNLOCKED");
    openTerminal();
    printTerminal("Hidden trigger detected.\nThere are deeper commands than help shows.");
    typedKeys = "";
  }
});
