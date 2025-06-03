
document.getElementById('imageInput').addEventListener('change', handleImages);
document.getElementById('exportPdf').addEventListener('click', exportAsPDF);

function handleImages(event) {
    const files = event.target.files;
    const output = document.getElementById('output');
    output.innerHTML = '';

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '300px';
            img.style.filter = 'contrast(1.2) brightness(1.1)';
            output.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
}

function exportAsPDF() {
    const element = document.getElementById('output');
    html2pdf().from(element).save('homework.pdf');
}
