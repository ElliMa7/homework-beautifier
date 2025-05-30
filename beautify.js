// 图像处理相关函数

// 画纸纹理背景（简化，改用纯色，或者你可以用图片纹理）
export function drawPaperTexture(ctx, w, h) {
  ctx.fillStyle = '#fefdf7';
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = '#e0dcc8';
  ctx.lineWidth = 1;
  for(let x=0; x<w; x+=10) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
}

// 对比度调整
export function adjustContrast(imageData, value=40) {
  const d = imageData.data;
  const factor = (259 * (value + 255)) / (255 * (259 - value));
  for(let i=0; i<d.length; i+=4) {
    d[i] = truncate(factor * (d[i]-128) + 128);
    d[i+1] = truncate(factor * (d[i+1]-128) + 128);
    d[i+2] = truncate(factor * (d[i+2]-128) + 128);
  }
  function truncate(val) { return Math.min(255, Math.max(0, val)); }
  return imageData;
}

// 简单锐化卷积
export function sharpen(imageData, width, height) {
  const weights = [0,-1,0,-1,5,-1,0,-1,0];
  const side = 3;
  const src = imageData.data.slice();
  const d = imageData.data;
  for(let y=1; y<height-1; y++) {
    for(let x=1; x<width-1; x++) {
      let r=0,g=0,b=0;
      for(let cy=0; cy<side; cy++) {
        for(let cx=0; cx<side; cx++) {
          const scy = y+cy-1;
          const scx = x+cx-1;
          const srcOff = (scy*width+scx)*4;
          const wt = weights[cy*side+cx];
          r += src[srcOff]*wt;
          g += src[srcOff+1]*wt;
          b += src[srcOff+2]*wt;
        }
      }
      const dstOff = (y*width+x)*4;
      d[dstOff] = truncate(r);
      d[dstOff+1] = truncate(g);
      d[dstOff+2] = truncate(b);
    }
  }
  function truncate(val) { return Math.min(255, Math.max(0, val)); }
  return imageData;
}

// 综合应用滤镜
export function applyFilter(ctx, canvas) {
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  imageData = adjustContrast(imageData, 40);
  imageData = sharpen(imageData, canvas.width, canvas.height);
  ctx.putImageData(imageData, 0, 0);
}

// 添加边框
export function addBorder(ctx, width, height) {
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#555';
  ctx.strokeRect(0, 0, width, height);
}

// 添加说明文字
export function addCaption(ctx, text, width, height) {
  if(!text) return;
  ctx.font = '20px sans-serif';
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillText(text, 20, height - 20);
}

// 添加手写风格字样
export function addHandwriting(ctx, width, height) {
  ctx.font = 'italic 28px "Comic Sans MS", cursive, sans-serif';
  ctx.fillStyle = 'rgba(100,50,20,0.7)';
  ctx.fillText('✍ 手写风格', width - 180, height - 40);
}