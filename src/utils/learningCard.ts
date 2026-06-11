export type LearningCardParams = {
  title: string;
  subtitle: string;
  scoreLine: string;
  badgeLine: string;
  footer: string;
};

export function renderLearningCard(params: LearningCardParams): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  const w = 1200;
  const h = 720;
  canvas.width = Math.floor(w * dpr);
  canvas.height = Math.floor(h * dpr);
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;

  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  ctx.scale(dpr, dpr);

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, "#3b0b10");
  bg.addColorStop(0.55, "#1c0a0f");
  bg.addColorStop(1, "#0c0a0b");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = "rgba(255, 220, 130, 0.12)";
  ctx.beginPath();
  ctx.arc(190, 160, 190, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(1020, 620, 230, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(245, 236, 220, 0.92)";
  roundRect(ctx, 80, 88, w - 160, h - 176, 28);
  ctx.fill();

  ctx.strokeStyle = "rgba(0,0,0,0.12)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "rgba(139, 10, 20, 0.12)";
  ctx.beginPath();
  ctx.arc(980, 150, 120, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#141113";
  ctx.font = "700 44px ui-serif, 'Noto Serif SC', serif";
  ctx.fillText(params.title, 140, 190);

  ctx.fillStyle = "rgba(20, 17, 19, 0.72)";
  ctx.font = "600 22px ui-serif, 'Noto Serif SC', serif";
  ctx.fillText(params.subtitle, 140, 232);

  ctx.fillStyle = "#141113";
  ctx.font = "600 26px ui-sans-serif, system-ui";
  ctx.fillText(params.scoreLine, 140, 320);

  ctx.fillStyle = "rgba(20, 17, 19, 0.82)";
  ctx.font = "600 22px ui-sans-serif, system-ui";
  ctx.fillText(params.badgeLine, 140, 360);

  ctx.save();
  ctx.translate(960, 260);
  ctx.rotate(-0.12);
  ctx.strokeStyle = "rgba(139, 10, 20, 0.55)";
  ctx.lineWidth = 10;
  roundRect(ctx, -140, -90, 280, 180, 22);
  ctx.stroke();
  ctx.fillStyle = "rgba(139, 10, 20, 0.16)";
  ctx.fill();
  ctx.fillStyle = "rgba(139, 10, 20, 0.92)";
  ctx.font = "800 26px ui-sans-serif, system-ui";
  ctx.textAlign = "center";
  ctx.fillText("学习完成", 0, 10);
  ctx.restore();

  ctx.fillStyle = "rgba(20, 17, 19, 0.55)";
  ctx.font = "500 18px ui-sans-serif, system-ui";
  ctx.fillText(params.footer, 140, 600);

  ctx.fillStyle = "rgba(0,0,0,0.08)";
  for (let i = 0; i < 120; i++) {
    ctx.fillRect(90 + (i * 9) % (w - 180), 540 + Math.floor(i / 14) * 10, 2, 2);
  }

  return canvas;
}

export function downloadCanvas(canvas: HTMLCanvasElement, filename: string) {
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = filename;
  link.click();
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

