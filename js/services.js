// Services page functionality
class Services {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }
    
    init() {
        this.setupFAQ();
        this.setupServiceLinks();
    }
    
    setupFAQ() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close other items
                this.faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }
    
    setupServiceLinks() {
        // Pre-fill service in contact form if coming from services page
        const urlParams = new URLSearchParams(window.location.search);
        const service = urlParams.get('service');
        
        if (service) {
            // Store for when contact form loads
            sessionStorage.setItem('selectedService', service);
        }
    }
}

// Initialize services when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Services();
});