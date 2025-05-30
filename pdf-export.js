export async function exportPDF(imagesData) {
  if(imagesData.length === 0) {
    alert('请先上传并美化图片');
    return;
  }

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ unit: 'px', format: 'a4' });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  for(let i=0; i<imagesData.length; i++) {
    if(i > 0) pdf.addPage();
    pdf.addImage(imagesData[i], 'PNG', 0, 0, pageWidth, pageHeight);
  }

  pdf.save('homework-beautified.pdf');
}