const menuToggle = document.querySelector('.toggle');
const showcase = document.querySelector('.showcase');

menuToggle.addEventListener('click', function(e) {
    menuToggle.classList.toggle('active');
    showcase.classList.toggle('active');
});