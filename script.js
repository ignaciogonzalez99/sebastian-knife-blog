// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Carousel Functionality
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval;

// Function to show a specific slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        slide.classList.remove('inactive');
        if (i === index) {
            slide.classList.add('active');
        } else {
            slide.classList.add('inactive');
        }
    });
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    currentSlide = index;
}

// Show next slide
function nextSlide() {
    let index = currentSlide + 1;
    if (index >= slides.length) {
        index = 0;
    }
    showSlide(index);
}

// Show previous slide
function prevSlide() {
    let index = currentSlide - 1;
    if (index < 0) {
        index = slides.length - 1;
    }
    showSlide(index);
}

// Automatic slide rotation
function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000); // Cambia de slide cada 5 segundos
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

// Event Listeners for buttons
nextBtn.addEventListener('click', () => {
    nextSlide();
    stopSlideShow();
    startSlideShow();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    stopSlideShow();
    startSlideShow();
});

// Event Listeners for dots
dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'));
        showSlide(index);
        stopSlideShow();
        startSlideShow();
    });
});

// Initialize carousel
showSlide(currentSlide);
startSlideShow();

// Selector de Colores
const colorOptions = document.querySelectorAll('.palette .color');
const colorSelector = document.getElementById('color-selector');
const logo = document.getElementById('logo');

// Función para convertir HEX a RGB
function hexToRgb(hex) {
    // Quitar el # si está presente
    hex = hex.replace('#', '');
    // Convertir a RGB
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return { r, g, b };
}

// Función para convertir RGB a HEX
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .slice(1)
        .toUpperCase();
}

// Función para calcular una versión más clara del color
function lightenColor(hex, percent) {
    let { r, g, b } = hexToRgb(hex);
    r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
    g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
    b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));
    return rgbToHex(r, g, b);
}

// Función para aplicar y guardar el color seleccionado
function applyColor(color) {
    document.documentElement.style.setProperty('--primary-color', color);
    localStorage.setItem('primaryColor', color); // Guarda el color en localStorage

    // Calcular un color más claro (20% más claro)
    const lighterColor = lightenColor(color, 20);
    document.querySelector('.color-selector').style.backgroundColor = lighterColor;
}

// Al cargar la página, verifica si hay un color guardado
window.addEventListener('DOMContentLoaded', () => {
    const savedColor = localStorage.getItem('primaryColor');
    if (savedColor) {
        applyColor(savedColor);
    } else {
        // Establecer el color-selector al color por defecto
        const defaultColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
        const lighterColor = lightenColor(defaultColor, 20);
        document.querySelector('.color-selector').style.backgroundColor = lighterColor;
    }
});

// Event Listeners para cada color
colorOptions.forEach(color => {
    color.addEventListener('click', () => {
        const selectedColor = color.getAttribute('data-color');
        applyColor(selectedColor);
    });
});

// Funcionalidad para mostrar/ocultar el Selector de Colores al hacer clic en el logo
logo.addEventListener('click', (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del enlace
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    colorSelector.classList.toggle('active');
});
