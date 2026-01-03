const box1 = document.getElementById('1');
const box2 = document.getElementById('2');
const box3 = document.getElementById('3');

const caixaBoxes = document.querySelector('.boxP');
let gap;
// mudar o maxHeight sempre que a caixaPai muda de Width
const observador = new ResizeObserver(() => {
  const largura = caixaBoxes.offsetWidth;
  caixaBoxes.style.maxHeight = largura + "px";
  gap = largura * 0.15;
});

observador.observe(caixaBoxes);

box1.addEventListener('click', function() {
    const texto = this.querySelector('.textMsg');
    if (box1.classList.contains('boxActive')) {
        texto.style.display = "none";
        box1.classList.remove('boxActive');
        box1.style.transform = "scale(1) translate(0, 0)";
    } else {
        box1.style.transform = "scale(1.5) translate(-50%, -50%)";
        box1.classList.add('boxActive');
        texto.style.display = "flex";
    }
});
box2.addEventListener('click', function() {
    const texto = this.querySelector('.textMsg');
    if (box2.classList.contains('boxActive')) {
        texto.style.display = "none";
        box2.classList.remove('boxActive');
        box2.style.transform = "scale(1) translate(0, 0)";
    } else {
        box2.style.transform = "scale(1.5) translate(17%, -50%)";
        box2.classList.add('boxActive');
        texto.style.display = "flex";
    }
});
box3.addEventListener('click', function() {
    const texto = this.querySelector('.textMsg');
    if (box3.classList.contains('boxActive')) {
        texto.style.display = "none";
        box3.classList.remove('boxActive');
        box3.style.transform = "scale(1) translate(0, 0)";
    } else {
        box3.style.transform = "scale(1.5) translate(-50%, 17%)";
        box3.classList.add('boxActive');
        texto.style.display = "flex";
    }
});
