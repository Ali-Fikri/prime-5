const input = document.getElementById("answerInput");
const correctAnswer = input.dataset.answer;

function checkAnswer() {
  if (input.value.trim().toLowerCase() === correctAnswer.toLowerCase()) {
    input.classList.remove("incorrect");
    input.classList.add("correct");
    playClapSound();
  } else if (input.value.trim() === "") {
    input.classList.remove("correct", "incorrect");
  } else {
    input.classList.remove("correct");
    input.classList.add("incorrect");
    input.classList.add("shake");
    setTimeout(() => {
      input.classList.remove("shake");
    }, 400);
    playIncorrectSound();
  }
}

function playClapSound() {
  const sound = document.getElementById("clapSound");
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}

function playIncorrectSound() {
  const sound = document.getElementById("inCorrectSound");
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}

// Check when user leaves the input
input.addEventListener("blur", checkAnswer);

// Also check when user presses Enter
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkAnswer();
    input.blur(); // optional: remove focus after pressing Enter
  }
});
