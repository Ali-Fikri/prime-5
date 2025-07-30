// This script handles audio playback.
let currentAudio = null;
const synth = window.speechSynthesis;

document.querySelectorAll("[data-type]").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    const type = element.dataset.type;

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    synth.cancel();

    if (type === "file") {
      const audioSrc = element.dataset.audio;
      currentAudio = new Audio(audioSrc);
      currentAudio.play();
    } else if (type === "tts") {
      const text = element.dataset.text;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "fr-FR";
      synth.speak(utterance);
    }
  });
});

// Canvas Drawing Tool
const drawBtn = document.getElementById("drawTool");
const eraseBtn = document.getElementById("eraseTool");
const canvases = document.querySelectorAll(".draw-canvas");

let tool = "draw";

canvases.forEach((canvas) => {
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let drawing = false;

  canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    const { x, y } = getCursorPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(x, y);
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;
    const { x, y } = getCursorPos(e, canvas);

    ctx.lineWidth = tool === "erase" ? 25 : 2;
    ctx.strokeStyle = "#000";
    ctx.globalCompositeOperation =
      tool === "erase" ? "destination-out" : "source-over";

    ctx.lineTo(x, y);
    ctx.stroke();
  });

  canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.closePath();
  });

  canvas.addEventListener("mouseleave", () => {
    drawing = false;
    ctx.closePath();
  });
});

function getCursorPos(e, canvas) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

drawBtn.addEventListener("click", () => {
  tool = "draw";
  setActiveTool();
});

eraseBtn.addEventListener("click", () => {
  tool = "erase";
  setActiveTool();
});

function setActiveTool() {
  drawBtn.classList.toggle("active", tool === "draw");
  eraseBtn.classList.toggle("active", tool === "erase");

  canvases.forEach((canvas) => {
    canvas.classList.toggle("cursor-draw", tool === "draw");
    canvas.classList.toggle("cursor-erase", tool === "erase");
  });
}
setActiveTool();
