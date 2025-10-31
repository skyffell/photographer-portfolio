// Form handler for Python backend
class FormHandler {
    constructor() {
        this.apiBaseUrl = 'http://localhost:5000/api';
        this.init();
    }
    
    init() {
        this.setupContactForm();
        this.testConnection();
    }
    
    async testConnection() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/health`);
            const data = await response.json();
            console.log('✅ API connection successful:', data);
        } catch (error) {
            console.warn('⚠️ API not available, forms will not work:', error);
        }
    }
    
    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            // Remove any Formspree attributes if present
            contactForm.removeAttribute('action');
            contactForm.removeAttribute('method');
            
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = new FormData(contactForm);
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                // Show loading state
                submitButton.textContent = 'Отправка...';
                submitButton.disabled = true;
                
                try {
                    const jsonData = {};
                    formData.forEach((value, key) => {
                        jsonData[key] = value;
                    });
                    
                    console.log('📤 Sending data to API:', jsonData);
                    
                    const response = await fetch(`${this.apiBaseUrl}/contact`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(jsonData)
                    });
                    
                    const result = await response.json();
                    console.log('📥 API response:', result);
                    
                    if (result.success) {
                        this.showNotification(result.message, 'success');
                        contactForm.reset();
                    } else {
                        throw new Error(result.message);
                    }
                    
                } catch (error) {
                    console.error('❌ Form submission error:', error);
                    this.showNotification(
                        error.message || 'Ошибка при отправке. Проверьте, запущен ли сервер.', 
                        'error'
                    );
                } finally {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }
            });
        }
    }
    
    showNotification(message, type = 'info') {
        // Remove any existing notifications
        const existingNotifications = document.querySelectorAll('.custom-notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `custom-notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✅' : '❌'}</span>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .custom-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 1rem 1.5rem;
                    border-radius: 12px;
                    color: white;
                    z-index: 10001;
                    animation: slideInRight 0.3s ease;
                    max-width: 400px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    backdrop-filter: blur(10px);
                }
                .notification-success { 
                    background: linear-gradient(135deg, #48bb78, #38a169);
                    border: 1px solid #2f855a;
                }
                .notification-error { 
                    background: linear-gradient(135deg, #f56565, #e53e3e);
                    border: 1px solid #c53030;
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-weight: 500;
                }
                .notification-icon {
                    font-size: 1.2rem;
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// Initialize form handler
document.addEventListener('DOMContentLoaded', () => {
    new FormHandler();
});