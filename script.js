const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = null;
let texts = [];
let selectedFont = "Hind";
let draggingText = null;
let offsetX = 0;
let offsetY = 0;

/* ================= IMAGE UPLOAD ================= */
document.getElementById("upload").addEventListener("change", function(e){
  const image = new Image();
  image.onload = function(){
    canvas.width = image.width;
    canvas.height = image.height;
    img = image;
    redraw();
  };
  image.src = URL.createObjectURL(e.target.files[0]);
});

/* ================= DRAW ALL ================= */
function redraw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  if(img){
    ctx.filter = "none";
    ctx.drawImage(img,0,0);
  }

  texts.forEach(t=>{
    ctx.font = `${t.size}px ${t.font}`;
    ctx.fillStyle = t.color;
    ctx.fillText(t.text, t.x, t.y);
  });
}

/* ================= ADD TEXT ================= */
function addCustomText(){
  const userText = document.getElementById("textInput").value;
  if(userText.trim()==="") return alert("टेक्स्ट लिखो");

  texts.push({
    text: userText,
    x: 50,
    y: 80,
    font: selectedFont,
    size: 48,
    color: "#d84315"
  });

  redraw();
}

/* ================= FONT SELECT ================= */
function setFont(font){
  selectedFont = font;
}

/* ================= BLACK & WHITE ================= */
function blackWhite(){
  ctx.filter = "grayscale(100%)";
  redraw();
}

/* ================= RESET ================= */
function resetCanvas(){
  texts = [];
  ctx.filter = "none";
  redraw();
}

/* ================= DOWNLOAD ================= */
function download(){
  const a = document.createElement("a");
  a.download = "rajasthani-design.png";
  a.href = canvas.toDataURL("image/png");
  a.click();
}

/* ================= TEMPLATES ================= */
function templateFestival(){
  canvas.width = 800;
  canvas.height = 800;
  img = null;
  texts = [];

  ctx.fillStyle = "#fff3e0";
  ctx.fillRect(0,0,800,800);

  texts.push({
    text:"म्हारो राजस्थान",
    x:150,
    y:220,
    font:"Khand",
    size:64,
    color:"#bf360c"
  });

  texts.push({
    text:"पधारो म्हारे देश",
    x:200,
    y:300,
    font:"Hind",
    size:36,
    color:"#5d4037"
  });

  redraw();
}

function templateCulture(){
  canvas.width = 800;
  canvas.height = 800;
  img = null;
  texts = [];

  ctx.fillStyle = "#3e2723";
  ctx.fillRect(0,0,800,800);

  texts.push({
    text:"राजस्थानी संस्कृति",
    x:120,
    y:260,
    font:"Yatra One",
    size:56,
    color:"#ffcc80"
  });

  redraw();
}

/* ================= DRAG TEXT ================= */
canvas.addEventListener("mousedown", function(e){
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  texts.forEach(t=>{
    ctx.font = `${t.size}px ${t.font}`;
    const width = ctx.measureText(t.text).width;
    if(mouseX >= t.x && mouseX <= t.x + width &&
       mouseY <= t.y && mouseY >= t.y - t.size){
      draggingText = t;
      offsetX = mouseX - t.x;
      offsetY = mouseY - t.y;
    }
  });
});

canvas.addEventListener("mousemove", function(e){
  if(!draggingText) return;
  const rect = canvas.getBoundingClientRect();
  draggingText.x = e.clientX - rect.left - offsetX;
  draggingText.y = e.clientY - rect.top - offsetY;
  redraw();
});

canvas.addEventListener("mouseup", ()=> draggingText=null);
canvas.addEventListener("mouseleave", ()=> draggingText=null);