const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

window.addEventListener('load', () => {
  const skeleton = document.getElementById('skeleton-loader');
  const content = document.getElementById('main-content');
  if (skeleton && content) {
    skeleton.style.display = 'none';
    content.style.display = 'block';
  }
});
