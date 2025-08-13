const sentences = document.querySelectorAll(".sentence");

sentences.forEach((sentence) => {
  const dropZone = sentence.querySelector(".drop-zone");
  const wordsBank = sentence.querySelector(".words-bank");

  let draggedElement = null;

  const words = sentence.querySelectorAll(".words-bank .word");
  words.forEach((word) => {
    // Desktop drag
    word.addEventListener("dragstart", (e) => {
      draggedElement = word;
      e.dataTransfer.setData("text/plain", word.textContent.trim());
      e.dataTransfer.effectAllowed = "move";
    });

    // Mobile touch support
    word.addEventListener("touchstart", (e) => {
      draggedElement = word;
      word.classList.add("dragging");

      const touch = e.touches[0];
      draggedElement.startX = touch.clientX;
      draggedElement.startY = touch.clientY;
    });

    word.addEventListener("touchmove", (e) => {
      if (!draggedElement) return;

      const touch = e.touches[0];
      draggedElement.style.position = "absolute";
      draggedElement.style.zIndex = "999";
      draggedElement.style.pointerEvents = "none";
      draggedElement.style.left = `${
        touch.clientX - draggedElement.offsetWidth / 2
      }px`;
      draggedElement.style.top = `${
        touch.clientY - draggedElement.offsetHeight / 2
      }px`;
    });

    word.addEventListener("touchend", (e) => {
      if (!draggedElement) return;

      draggedElement.style.position = "";
      draggedElement.style.zIndex = "";
      draggedElement.style.pointerEvents = "";
      draggedElement.style.left = "";
      draggedElement.style.top = "";
      draggedElement.classList.remove("dragging");

      const dropRect = dropZone.getBoundingClientRect();
      const touch = e.changedTouches[0];

      if (
        touch.clientX >= dropRect.left &&
        touch.clientX <= dropRect.right &&
        touch.clientY >= dropRect.top &&
        touch.clientY <= dropRect.bottom
      ) {
        handleDrop(sentence, dropZone, draggedElement);
      }

      draggedElement = null;
    });
  });

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("over");
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("over");
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("over");

    if (!draggedElement) return;

    handleDrop(sentence, dropZone, draggedElement);
    draggedElement = null;
  });

  updateLiveAndCheck(sentence);
});

function handleDrop(sentence, dropZone, draggedElement) {
  const draggedText = draggedElement.textContent.trim();
  const correctSentence = sentence
    .getAttribute("data-ordered")
    .trim()
    .split(" ");
  const currentWords = Array.from(dropZone.querySelectorAll(".word")).map((w) =>
    w.textContent.trim()
  );
  const expectedWord = correctSentence[currentWords.length]; // next correct word

  if (draggedText === expectedWord) {
    dropZone.appendChild(draggedElement);
    const isCorrect = updateLiveAndCheck(sentence);

    if (isCorrect) {
      playClapSound();
    }
  } else {
    dropZone.classList.add("shake");
    playIncorrectSound;
    setTimeout(() => dropZone.classList.remove("shake"), 400);
  }
}

function updateLiveAndCheck(sentence) {
  const words = Array.from(sentence.querySelectorAll(".drop-zone .word")).map(
    (w) => w.textContent.trim()
  );
  const userSentence = words.join(" ");
  const correctSentence = sentence.getAttribute("data-ordered").trim();

  if (userSentence === correctSentence) {
    playClapSound();
    return true;
  } else {
    playIncorrectSound();

    return false;
  }
}

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
