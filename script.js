
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const body        = document.body;


const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
  body.classList.add('light-theme');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-theme');
  const isLight = body.classList.contains('light-theme');
  if (isLight) {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('theme', 'light');
  } else {
    themeIcon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'dark');
  }
});


const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});


navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});


const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.2)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});


const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      
      const delay = entry.target.closest('.about-grid, .stack-grid, .projects-grid, .contact-links')
        ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 80
        : 0;

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));


const heroSub = document.querySelector('.hero-sub');
const phrases = [
  'Desenvolvedor Full Stack.',
  'Apaixonado por tecnologia',
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
const typingSpeed   = 60;
const deletingSpeed = 10;
const pauseEnd      = 1000;
const pauseStart    = 0;

function typeWriter() {
  const current = phrases[phraseIndex];

  if (!isDeleting) {
    heroSub.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeWriter, pauseEnd);
      return;
    }
  } else {
    heroSub.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeWriter, pauseStart);
      return;
    }
  }

  setTimeout(typeWriter, isDeleting ? deletingSpeed : typingSpeed);
}



const blinkStyle = document.createElement('style');
blinkStyle.textContent = `@keyframes blink { 0%,100%{border-color:var(--accent2)} 50%{border-color:transparent} }`;
document.head.appendChild(blinkStyle);

typeWriter();


const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--text)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));
