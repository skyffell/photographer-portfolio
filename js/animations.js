// Intersection Observer for animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.handleIntersection(entry.target);
                }
            });
        }, this.observerOptions);
        
        this.init();
    }
    
    init() {
        // Observe elements with animation classes only if they exist
        const animatedElements = document.querySelectorAll(
            '.animate-fade-up, .animate-scale, .animate-count, .animate-stagger, .slide-in-left, .slide-in-right'
        );
        
        if (animatedElements.length > 0) {
            animatedElements.forEach(el => {
                this.observer.observe(el);
            });
        }
        
        // Handle delay attributes
        this.handleDelays();
        
        // Initialize counter animation only if counters exist
        this.initCounters();
        
        // Initialize progress bars
        this.initProgressBars();
    }
    
    handleIntersection(element) {
        if (element.classList.contains('animate-stagger')) {
            element.classList.add('animated');
        } else {
            element.classList.add('animated');
        }
        
        // Stop observing after animation
        this.observer.unobserve(element);
    }
    
    handleDelays() {
        const delayedElements = document.querySelectorAll('[data-delay]');
        if (delayedElements.length === 0) return;
        
        delayedElements.forEach(el => {
            const delay = el.getAttribute('data-delay');
            el.style.transitionDelay = `${delay}ms`;
        });
    }
    
    initCounters() {
        const counters = document.querySelectorAll('.animate-count h3');
        if (counters.length === 0) return;
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, this.observerOptions);
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        if (isNaN(target)) return;
        
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
    
    initProgressBars() {
        const progressBars = document.querySelectorAll('.skill-progress');
        if (progressBars.length === 0) return;
        
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateProgressBar(entry.target);
                    progressObserver.unobserve(entry.target);
                }
            });
        }, this.observerOptions);
        
        progressBars.forEach(bar => {
            progressObserver.observe(bar);
        });
    }
    
    animateProgressBar(progressBar) {
        const width = progressBar.getAttribute('data-width');
        if (!width) return;
        
        // Reset width to 0 first
        progressBar.style.width = '0%';
        
        // Animate to target width
        setTimeout(() => {
            progressBar.style.width = width + '%';
            progressBar.style.transition = 'width 1.5s ease-in-out';
        }, 100);
    }
}

// Simple Preloader
class Preloader {
    constructor() {
        this.preloader = document.querySelector('.preloader');
        if (!this.preloader) return;
        
        this.init();
    }
    
    init() {
        // Wait for everything to load
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.hidePreloader();
            }, 1000);
        });
    }
    
    hidePreloader() {
        if (this.preloader) {
            this.preloader.style.opacity = '0';
            setTimeout(() => {
                this.preloader.style.display = 'none';
            }, 500);
        }
    }
}

// Mobile menu
class MobileMenu {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        
        if (!this.hamburger || !this.navMenu) return;
        
        this.init();
    }
    
    init() {
        this.hamburger.addEventListener('click', () => {
            this.toggleMenu();
        });
        
        // Close menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });
    }
    
    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }
    
    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
    }
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    new Preloader();
    new ScrollAnimations();
    new MobileMenu();
});

// Additional utility functions
const utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};