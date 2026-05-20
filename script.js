// =========================================
// script.js — Clínica DOM (redesign)
// =========================================

// --- Ano automático no footer ---
document.getElementById('ano').textContent = new Date().getFullYear();


// --- Header: adiciona sombra e classe ao rolar ---
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});


// --- Botão flutuante WhatsApp: aparece após rolar ---
const floatBtn = document.getElementById('whatsapp-float');
floatBtn.style.opacity = '0';
floatBtn.style.transition = 'opacity 0.45s ease, transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s ease';
floatBtn.style.pointerEvents = 'none';

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    floatBtn.style.opacity = '1';
    floatBtn.style.pointerEvents = 'auto';
  } else {
    floatBtn.style.opacity = '0';
    floatBtn.style.pointerEvents = 'none';
  }
});


// --- Smooth scroll nos links do menu ---
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


// =========================================
// SCROLL REVEAL — Intersection Observer
// =========================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

// Observa todos os elementos com classe reveal*
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});


// =========================================
// HERO — animação de entrada ao carregar
// =========================================
window.addEventListener('load', () => {
  const heroElements = document.querySelectorAll('#hero .hero-badge, #hero h2, #hero .hero-right p, #hero .btn-whatsapp, #hero .hero-left');
  heroElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.7s ease ${i * 0.12}s, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${i * 0.12}s`;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 80 + i * 120);
  });
});


// =========================================
// SLIDER DA EQUIPE
// =========================================
const equipeSlides = document.querySelectorAll('.equipe-slide');
const equipePrev = document.querySelector('.equipe-prev');
const equipeNext = document.querySelector('.equipe-next');
const equipeDots = document.querySelectorAll('.equipe-dots .dot');
let equipeIndex = 0;
let equipeTimer;

function showEquipeSlide(index) {
  equipeSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  equipeDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function nextEquipeSlide() {
  equipeIndex = (equipeIndex + 1) % equipeSlides.length;
  showEquipeSlide(equipeIndex);
}

function prevEquipeSlide() {
  equipeIndex = (equipeIndex - 1 + equipeSlides.length) % equipeSlides.length;
  showEquipeSlide(equipeIndex);
}

function resetTimer() {
  clearInterval(equipeTimer);
  equipeTimer = setInterval(nextEquipeSlide, 5500);
}

if (equipePrev && equipeNext && equipeSlides.length > 0) {
  equipePrev.addEventListener('click', () => { prevEquipeSlide(); resetTimer(); });
  equipeNext.addEventListener('click', () => { nextEquipeSlide(); resetTimer(); });

  equipeDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      equipeIndex = i;
      showEquipeSlide(equipeIndex);
      resetTimer();
    });
  });

  equipeTimer = setInterval(nextEquipeSlide, 5500);
}


// =========================================
// CARDS — efeito parallax sutil no hover
// =========================================
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `translateY(-16px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.animation = 'none';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    // Reaplica a animação
    const nth = Array.from(document.querySelectorAll('.card')).indexOf(card);
    const delays = [0, 1.6, 3.2];
    card.style.animation = `cardFloat 5s ease-in-out ${delays[nth] || 0}s infinite`;
  });
});