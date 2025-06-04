document.getElementById('imageInput').addEventListener('change', handleImages);
document.getElementById('backgroundSelect').addEventListener('change', updateBackground);
document.getElementById('exportPdf').addEventListener('click', exportAsPDF);

const backgroundSelect = document.getElementById('backgroundSelect');
const preview = document.getElementById('preview');

backgroundSelect.addEventListener('change', () => {
    const bg = backgroundSelect.value;
    preview.style.backgroundImage = bg ? `url(${bg})` : 'none';
});

let selectedBackground = '';

function handleImages(event) {
    const files = event.target.files;
    const output = document.getElementById('output');
    output.innerHTML = '';

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            // 创建包裹图片和背景的容器
            const container = document.createElement('div');
            container.className = 'image-container';
            container.style.backgroundImage = selectedBackground ? `url(${selectedBackground})` : 'none';

            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.filter = 'contrast(1.2) brightness(1.1)';
            container.appendChild(img);
            output.appendChild(container);
        };
        reader.readAsDataURL(file);
    });
}

function updateBackground() {
    const select = document.getElementById('backgroundSelect');
    selectedBackground = select.value;
    // 更新所有容器背景
    document.querySelectorAll('.image-container').forEach(container => {
        container.style.backgroundImage = selectedBackground ? `url(${selectedBackground})` : 'none';
    });
}

function exportAsPDF() {
    const element = document.getElementById('output');
    html2pdf().from(element).save('homework.pdf');
}
