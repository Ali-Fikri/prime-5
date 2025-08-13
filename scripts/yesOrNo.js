const clapSound = document.getElementById("clapSound");

document.querySelectorAll(".question").forEach((question) => {
  const correct = question.dataset.correct === "true";

  question.querySelectorAll(".choice").forEach((btn) => {
    btn.addEventListener("click", () => {
      const userAnswer = btn.dataset.answer === "true";
      const isCorrect = userAnswer === correct;

      if (isCorrect) {
        playClapSound();
        btn.classList.add("correct");
      } else {
        playIncorrectSound();
        btn.classList.add("incorrect");
        btn.classList.add("shake");
        setTimeout(() => {
          btn.classList.remove("incorrect");
          btn.classList.remove("shake");
        }, 400);
      }
    });
  });
});

function playClapSound() {
  const sound = document.getElementById("clapSound");
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }
}

function playIncorrectSound() {
  const sound = document.getElementById("inCorrectSound");
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }
}
