// Dynamic copyright year
document.getElementById('footer-year').textContent = new Date().getFullYear();

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in, .slide-in, .fade-in-up').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Video play button interaction
const videoPlaceholder = document.querySelector('.video-placeholder');
if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', () => {
        // Placeholder for video modal/player
        alert('Vidéo: Découvrir VELA en 90 secondes');
    });
}

// Add hover effect to buttons
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '%';
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current) + '%';
        }
    }, 16);
}

// Trigger counter animation when dashboard section is visible
const dashboardSection = document.querySelector('.dashboard');
if (dashboardSection) {
    const observer2 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stats = document.querySelectorAll('.stat');
                stats.forEach((stat, index) => {
                    const text = stat.textContent.trim();
                    const match = text.match(/(\d+)/);
                    if (match) {
                        const number = parseInt(match[1]);
                        animateCounter(stat, number);
                    }
                });
                observer2.unobserve(entry.target);
            }
        });
    }, observerOptions);
    observer2.observe(dashboardSection);
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// Mobile menu toggle (if needed)
function handleResponsive() {
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header');

    if (window.innerWidth <= 768) {
        // Add mobile-specific behavior if needed
    }
}

window.addEventListener('resize', handleResponsive);
handleResponsive();

// Load animation trigger on page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// FAQ accordion — smooth height animation (scrollHeight)
document.querySelectorAll('.faq-question').forEach(summary => {
    summary.addEventListener('click', function (e) {
        e.preventDefault();
        const details = this.closest('.faq-item');
        const answer = details.querySelector('.faq-answer');

        if (details.hasAttribute('open')) {
            // Fermeture : forcer px, attendre 2 frames, animer vers 0
            answer.style.height = answer.scrollHeight + 'px';
            answer.style.overflow = 'hidden';
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    answer.style.height = '0px';
                });
            });
            answer.addEventListener('transitionend', () => {
                details.removeAttribute('open');
                answer.style.height = '';
                answer.style.overflow = '';
            }, { once: true });
        } else {
            // Ouverture : ajouter open, mesurer scrollHeight, animer
            details.setAttribute('open', '');
            const targetHeight = answer.scrollHeight + 'px';
            answer.style.height = '0px';
            answer.style.overflow = 'hidden';
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    answer.style.height = targetHeight;
                });
            });
            answer.addEventListener('transitionend', () => {
                answer.style.height = 'auto';
                answer.style.overflow = '';
            }, { once: true });
        }
    });
});
