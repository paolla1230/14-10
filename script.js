const slides = [...document.querySelectorAll(".slide")];
const counter = document.getElementById("counter");
const progress = document.getElementById("progress");
let current = 0;

function showSlide(index) {
  current = Math.max(0, Math.min(index, slides.length - 1));

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === current);
    slide.setAttribute("aria-hidden", i !== current);
  });

  counter.textContent =
    `${String(current + 1).padStart(2, "0")} / ` +
    `${String(slides.length).padStart(2, "0")}`;

  progress.style.width =
    `${((current + 1) / slides.length) * 100}%`;

  document.getElementById("prev").disabled = current === 0;
  document.getElementById("next").disabled =
    current === slides.length - 1;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.getElementById("next").addEventListener("click", () => {
  showSlide(current + 1);
});

document.getElementById("prev").addEventListener("click", () => {
  showSlide(current - 1);
});

document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => {
    showSlide(Number(button.dataset.go));
  });
});

document.getElementById("restart").addEventListener("click", () => {
  showSlide(0);
});

document.getElementById("contrast").addEventListener("click", () => {
  document.body.classList.toggle("high-contrast");
});

const answers = document.querySelectorAll(".answer");
const feedback = document.getElementById("feedback");

answers.forEach(answer => {
  answer.addEventListener("click", () => {
    answers.forEach(button => {
      button.classList.remove("correct", "wrong");
      button.disabled = true;
    });

    const correct = answer.dataset.correct === "true";
    answer.classList.add(correct ? "correct" : "wrong");

    feedback.textContent = correct
      ? "Muito bem! As legendas ajudam pessoas surdas ou com deficiência auditiva a acompanhar o conteúdo. A qualidade depende da precisão da transcrição."
      : "Essa opção não resolve o problema apresentado. Pense em um recurso que transforme a fala em informação visual.";

    if (!correct) {
      answers.forEach(button => {
        if (button.dataset.correct === "true") {
          button.classList.add("correct");
        }
      });
    }
  });
});

document.getElementById("resetQuiz").addEventListener("click", () => {
  answers.forEach(button => {
    button.disabled = false;
    button.classList.remove("correct", "wrong");
  });

  feedback.textContent = "Escolha uma resposta para descobrir!";
});

document.addEventListener("keydown", event => {
  if (event.key === "ArrowRight" || event.key === "PageDown") {
    showSlide(current + 1);
  }

  if (event.key === "ArrowLeft" || event.key === "PageUp") {
    showSlide(current - 1);
  }

  if (event.key === "Home") showSlide(0);
  if (event.key === "End") showSlide(slides.length - 1);
});

showSlide(0);
