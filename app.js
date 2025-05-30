
function beautifyImages() {
  const files = document.getElementById('upload').files;
  const output = document.getElementById('output');
  output.innerHTML = '';

  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const card = document.createElement('div');
      card.className = 'card';

      const img = document.createElement('img');
      img.src = e.target.result;
      img.style.filter = 'contrast(1.2) saturate(1.1)';

      const caption = document.createElement('p');
      caption.textContent = '美化完成 ✓';

      card.appendChild(img);
      card.appendChild(caption);
      output.appendChild(card);
    };
    reader.readAsDataURL(file);
  });
}

function generatePDF() {
  const element = document.getElementById('output');
  html2pdf().from(element).save('作业美化.pdf');
}
