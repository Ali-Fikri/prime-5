(function () {
  let choices = document.querySelectorAll(".choice");
  let questions = document.querySelectorAll(".dots");
  let dragWord,
    offsetX,
    offsetY = 0;

  choices.forEach((choice) => {
    choice.addEventListener("dragstart", dragStart);
    choice.addEventListener("dragend", dragEnd);
    choice.addEventListener("touchstart", touchStart);
    choice.addEventListener("touchend", touchDrop);
    choice.addEventListener("touchmove", touchMove);
  });

  questions.forEach((choice) => {
    choice.addEventListener("dragover", dragOver);
    choice.addEventListener("dragenter", dragEnter);
    choice.addEventListener("dragleave", dragLeave);
    choice.addEventListener("drop", dragDrop);
    choice.addEventListener("touchmove", touchMove);
  });

  function dragStart() {
    console.log("drag started");
    dragWord = this;
    setTimeout(() => this.classList.add("invisible"), 0);
  }

  function dragEnd() {
    console.log("drag Ended");
    this.classList.remove("invisible");
    dragWord = null;
  }

  function dragOver(e) {
    e.preventDefault();
    console.log("drag over");
  }

  function dragEnter() {
    console.log("drag entered");
  }

  function dragLeave() {
    console.log("drag left");
  }

  function dragDrop() {
    console.log("drag dropped");
    const dots = this;
    if (!dots) return;
    if (dots.getAttribute("answer") == dragWord.getAttribute("answer")) {
      dots.innerText = "";
      dots.append(dragWord);
      dots.classList.add("correct");
      playClapSound();
    } else {
      playIncorrectSound();
      dots.classList.add("shake");
      setTimeout(() => dots.classList.remove("shake"), 400);
    }
  }

  function touchStart(e) {
    dragWord = this;

    const touch = e.touches[0];
    offsetX = touch.clientX - dragWord.offsetLeft;
    offsetY = touch.clientY - dragWord.offsetTop;
  }

  function touchMove(e) {
    console.log("touch moved");

    e.preventDefault(); // prevent scrolling
    const touch = e.touches[0];
    const x = touch.clientX - offsetX;
    const y = touch.clientY - offsetY;
    dragWord.style.position = "absolute";
    dragWord.style.left = `${x}px`;
    dragWord.style.top = `${y}px`;
  }
  function touchDrop(e) {
    e.preventDefault();
    console.log("touch dropped");
    dragWord.style.position = "static";
    const touch = e.changedTouches[0];
    const x = touch.clientX;
    const y = touch.clientY;
    const element = document.elementFromPoint(x, y);
    console.log(element);
    const dots = element.closest(".dots");
    console.log(dots);
    if (!dots) return;
    if (dots.getAttribute("answer") == dragWord.getAttribute("answer")) {
      dots.innerText = "";
      dots.append(dragWord);
      dots.classList.add("correct");
      playClapSound();
    } else {
      playIncorrectSound();
      element.closest(".question-item").classList.add("shake");
      setTimeout(() => dots.classList.remove("shake"), 400);
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
})();
