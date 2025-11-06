// Dark mode toggle
// Dark mode toggle with animated icons
const toggleBtn = document.querySelector('.theme-toggle');
const body = document.body;

toggleBtn.addEventListener('click', () => {
  const isDark = body.getAttribute('data-theme') === 'dark';
  body.setAttribute('data-theme', isDark ? 'light' : 'dark');
  // No need to change text — icons are animated via CSS
});

// Current year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Typing effect
const phrases = ["Hello, I'm Sieam Hasan", "Full-Stack Developer", "UI/UX Designer"];
let i = 0, p = 0, forward = true;
const tw = document.getElementById('typewriter');
function type() {
  if (forward && p <= phrases[i].length) {
    tw.textContent = phrases[i].slice(0, p++);
  } else if (!forward && p >= 0) {
    tw.textContent = phrases[i].slice(0, p--);
  } else {
    forward = !forward;
    if (forward) i = (i + 1) % phrases.length;
  }
  setTimeout(type, forward ? 100 : 60);
}
type();

// Skill bars animation
// === REPLACE the old skill bar animation with this ===

// Skill bars: animate only when in viewport
const skillsSection = document.querySelector('#skills .skills-container');
const skillBars = document.querySelectorAll('.skill-fill');

const animateSkills = () => {
  const triggerBottom = window.innerHeight * 0.85;
  const sectionTop = skillsSection.getBoundingClientRect().top;

  if (sectionTop < triggerBottom) {
    skillsSection.classList.add('visible');

    skillBars.forEach((bar, index) => {
      const percent = bar.parentElement.parentElement.getAttribute('data-percent');
      setTimeout(() => {
        bar.style.width = percent + '%';
        bar.addEventListener('transitionend', function handler() {
          bar.classList.add('complete');
          bar.removeEventListener('transitionend', handler);
        });
      }, index * 150); // staggered start
    });

    // Remove observer after animation
    observer.disconnect();
  }
};

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) animateSkills();
  });
}, { threshold: 0.3 });

observer.observe(skillsSection);

// Testimonial carousel
const testimonials = document.querySelectorAll('.testimonial-slider blockquote');
let idx = 0;
setInterval(() => {
  testimonials[idx].style.opacity = '0';
  idx = (idx + 1) % testimonials.length;
  testimonials[idx].style.opacity = '1';
}, 5000);

// Scroll to top
const toTop = document.getElementById('to-top');
window.addEventListener('scroll', () => {
  toTop.classList.toggle('show', window.scrollY > 500);
});
toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// Contact form with feedback
const contactForm = document.getElementById('contact-form');
const feedbackDiv = document.getElementById('form-feedback');

contactForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  feedbackDiv.style.opacity = '0';
  feedbackDiv.textContent = '';

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      contactForm.reset();
      showFeedback('Message sent! I’ll get back to you soon.', 'var(--accent)');
    } else {
      const data = await response.json();
      showFeedback(data.error || 'Oops! Something went wrong.', '#e17055');
    }
  } catch (err) {
    showFeedback('Network error – please try again later.', '#e17055');
  }
});

function showFeedback(message, color) {
  feedbackDiv.textContent = message;
  feedbackDiv.style.color = color;
  feedbackDiv.style.opacity = '1';
  setTimeout(() => { feedbackDiv.style.opacity = '0'; }, 5000);
}

// === ADD this at the end of script.js ===

// Project cards: animate on scroll
const projectsGrid = document.querySelector('#projects .projects-grid');

const animateProjects = () => {
  const triggerBottom = window.innerHeight * 0.85;
  const gridTop = projectsGrid.getBoundingClientRect().top;

  if (gridTop < triggerBottom) {
    projectsGrid.classList.add('visible');
    projectObserver.disconnect();
  }
};

const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) animateProjects();
  });
}, { threshold: 0.2 });

projectObserver.observe(projectsGrid);

// === ADD this at the end of script.js ===

// About Me: animate stats + content on scroll
const statsGrid = document.querySelector('#about .stats-grid');
const aboutContent = document.querySelector('#about .about-content');
const statNumbers = document.querySelectorAll('.stat-number');

const animateAbout = () => {
  const trigger = window.innerHeight * 0.8;
  const gridTop = statsGrid.getBoundingClientRect().top;

  if (gridTop < trigger) {
    statsGrid.classList.add('visible');
    aboutContent.classList.add('visible');

    // Animate counters
    statNumbers.forEach(numEl => {
      const target = parseInt(numEl.parentElement.getAttribute('data-target'));
      const increment = target / 80;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          numEl.textContent = target;
          clearInterval(timer);
        } else {
          numEl.textContent = Math.floor(current);
        }
      }, 25);
    });

    aboutObserver.disconnect();
  }
};

const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) animateAbout();
  });
}, { threshold: 0.5 });

aboutObserver.observe(statsGrid);

// ——— Poster Slider Auto-play + Dots ———
const slides = document.querySelectorAll('#poster-slider .slide');
const dots = document.querySelectorAll('#poster-slider .dot');
let currentSlide = 0;
const slideInterval = 5000; // 5 seconds

function showSlide(index) {
  slides.forEach((s, i) => {
    s.classList.toggle('active', i === index);
  });
  dots.forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });
}

// Auto-play
let autoSlide = setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, slideInterval);

// Dot click
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentSlide = i;
    showSlide(currentSlide);
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, slideInterval);
  });
});

// Pause on hover
document.querySelector('#poster-slider').addEventListener('mouseenter', () => clearInterval(autoSlide));
document.querySelector('#poster-slider').addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, slideInterval);
});