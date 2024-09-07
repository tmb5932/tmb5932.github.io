const projectBox = document.getElementById('pb-1');
let isFlipped = false;

projectBox.addEventListener('click', () => {
  isFlipped = !isFlipped;
  projectBox.style.transition = 'transform 0.6s';
  projectBox.style.transformStyle = 'preserve-3d';
  projectBox.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
});