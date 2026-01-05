const img = document.getElementById("photo");
const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let bright = 100, cont = 100, sat = 100;

upload.onchange = e => {
  img.src = URL.createObjectURL(e.target.files[0]);
};

function applyFilter() {
  const sliders = document.querySelectorAll("input[type=range]");
  bright = sliders[0].value;
  cont = sliders[1].value;
  sat = sliders[2].value;

  img.style.filter =
    `brightness(${bright}%) contrast(${cont}%) saturate(${sat}%)`;
}

function bw() {
  img.style.filter = "grayscale(100%)";
}

function reset() {
  img.style.filter = "none";
}

function addText() {
  img.insertAdjacentHTML(
    "afterend",
    `<div class="text">${document.getElementById("text").value}</div>`
  );
}

function download() {
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  ctx.filter = img.style.filter;
  ctx.drawImage(img, 0, 0);
  const link = document.createElement("a");
  link.download = "edited.png";
  link.href = canvas.toDataURL();
  link.click();
}
