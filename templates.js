import { drawPaperTexture, applyFilter, addBorder, addCaption, addHandwriting } from './beautify.js';

// 应用指定模板渲染
export function renderTemplate(canvasObj, template, captionText) {
  const {canvas, ctx, img} = canvasObj;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 画纸张背景
  drawPaperTexture(ctx, canvas.width, canvas.height);

  // 画原始图片
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // 应用滤镜
  applyFilter(ctx, canvas);

  // 加边框
  addBorder(ctx, canvas.width, canvas.height);

  // 模板标题
  ctx.font = 'bold 24px sans-serif';
  ctx.fillStyle = '#333';
  const titleMap = {
    'lab-report': '【实验报告】',
    'reading-notes': '【阅读笔记】',
    'handwriting': '【手写风格】',
  };
  ctx.fillText(titleMap[template] || '【作业】', 20, 40);

  // 说明文字
  addCaption(ctx, captionText, canvas.width, canvas.height);

  // 手写风格叠加
  if(template === 'handwriting') {
    addHandwriting(ctx, canvas.width, canvas.height);
  }
}