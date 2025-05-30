import { renderTemplate } from './templates.js';
import { exportPDF } from './pdf-export.js';

const uploadInput = document.getElementById('upload');
const imagesContainer = document.getElementById('images-container');
const btnEnhance = document.getElementById('btn-enhance');
const btnExportPDF = document.getElementById('btn-export-pdf');
const templateSelect = document.getElementById('template-select');
const captionInput = document.getElementById('caption-input');
const btnAddCaption = document.getElementById('btn-add-caption');

let canvasObjs = []; // 存放 {canvas, ctx, img} 对象

// 加载图片并生成canvas
uploadInput.addEventListener('change', (e) => {
  const files = e.target.files;
  imagesContainer.innerHTML = '';
  canvasObjs = [];

  for(let file of files) {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.src = url;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // 固定宽度，等比缩放高度
      const maxWidth = 400;
      const scale = maxWidth / img.width;
      canvas.width = maxWidth;
      canvas.height = img.height * scale;

      canvas.classList.add('thumb-canvas');
      imagesContainer.appendChild(canvas);

      canvasObjs.push({canvas, ctx, img});
      renderTemplate({canvas, ctx, img}, templateSelect.value, captionInput.value);
    };
  }
});

// 点击“一键美化”重新渲染所有图片
btnEnhance.addEventListener('click', () => {
  for(let obj of canvasObjs) {
    renderTemplate(obj, templateSelect.value, captionInput.value);
  }
});

// 点击“添加说明文字”
btnAddCaption.addEventListener('click', () => {
  for(let obj of canvasObjs) {
    renderTemplate(obj, templateSelect.value, captionInput.value);
  }
});

// 点击导出PDF
btnExportPDF.addEventListener('click', () => {
  const imagesData = canvasObjs.map(obj => obj.canvas.toDataURL('image/png'));
  exportPDF(imagesData);
});