const starsCanvas = document.getElementById("stars");
const smallCanvas = document.getElementById("small");
const starCtx = starsCanvas.getContext("2d");
const smallCtx = smallCanvas.getContext("2d");
const starsColors = ["blue", "red", "black", "green", "orange"];

starCtx.beginPath();
starCtx.rect(0, 0, starsCanvas.width, starsCanvas.height);
starCtx.fillStyle = "#fff";
starCtx.fill();

// draw star
function drawStar(cx, cy, spikes, outerRadius, innerRadius, color, ctx) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

function getPosition(obj) {
  let currentLeft = 0;
  let currentTop = 0;

  if (obj.offsetParent) {
    currentLeft = obj.offsetLeft;
    currentTop = obj.offsetTop;

    return { x: currentLeft, y: currentTop };
  }
}

// draw 5 stars
for (let i = 0; i < 5; i++) {
  drawStar(75, 100 + i * 50, 5, 30, 11, starsColors[i], starCtx);
}

// add click listener
starsCanvas.addEventListener("click", function (e) {
  const pos = getPosition(this);
  const x = e.pageX - pos.x;
  const y = e.pageY - pos.y;
  const c = this.getContext("2d");
  const p = c.getImageData(x, y, 1, 1).data;

  // fill small canvas
  smallCtx.beginPath();
  smallCtx.rect(0, 0, smallCanvas.width, smallCanvas.height);
  smallCtx.fillStyle = `rgb(${p[0]}, ${p[1]}, ${p[2]})`;
  smallCtx.fill();
});
