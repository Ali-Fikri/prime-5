const svg = document.getElementById("svg");
let selectedLetter;

document.querySelectorAll(".letter").forEach((letter) => {
  letter.addEventListener("click", () => {
    document
      .querySelectorAll(".letter")
      .forEach((w) => w.classList.remove("selected-letter"));
    letter.classList.add("selected-letter");
    selectedLetter = letter;
  });
});

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

document.querySelectorAll(".image").forEach((img) => {
  img.addEventListener("click", () => {
    if (!selectedLetter) return;

    const letterRect = selectedLetter
      .querySelector(".dot")
      .getBoundingClientRect();
    const imgRect = img.querySelector(".dot").getBoundingClientRect();
    const containerRect = document
      .querySelector(".question")
      .getBoundingClientRect();

    const x1 = letterRect.right - containerRect.left - 20;
    const y1 = letterRect.top + letterRect.height / 2 - containerRect.top;
    const x2 = imgRect.left - containerRect.left;
    const y2 = imgRect.top + imgRect.height / 2 - containerRect.top;

    const matchCorrect = selectedLetter.dataset.match === img.dataset.id;

    if (matchCorrect) {
      playClapSound();

      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", x1);
      line.setAttribute("y1", y1);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
      line.setAttribute("stroke-width", 3);
      line.setAttribute("stroke", "#ec008d");
      line.setAttribute("class", "line-animation");
      svg.appendChild(line);

      setTimeout(() => {
        line.style.transition = "stroke-dashoffset 2s linear";
        line.style.strokeDashoffset = "0"; // Reveal the line
      }, 2000);
    } else {
      playIncorrectSound();
      selectedLetter.classList.add("shake");
      img.classList.add("shake");

      setTimeout(() => {
        selectedLetter.classList.remove("shake");
        img.classList.remove("shake");
      }, 400);
    }

    selectedLetter.classList.remove("selected-letter");
  });
});
