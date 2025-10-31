// Portfolio filtering and functionality
class Portfolio {
    constructor() {
        this.grid = document.querySelector('.portfolio-grid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        this.loadMoreBtn = document.getElementById('loadMore');
        this.visibleItems = 8;
        
        // Only initialize if portfolio elements exist
        if (this.grid && this.portfolioItems.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.setupFiltering();
        this.setupLoadMore();
        this.setupLightbox();
    }
    
    setupFiltering() {
        if (this.filterButtons.length === 0) return;
        
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter items
                const filter = button.getAttribute('data-filter');
                this.filterItems(filter);
            });
        });
    }
    
    filterItems(filter) {
        this.portfolioItems.forEach((item, index) => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.classList.remove('hidden');
                // Show only limited number of items initially
                if (index >= this.visibleItems) {
                    item.style.display = 'none';
                } else {
                    item.style.display = 'block';
                }
            } else {
                item.classList.add('hidden');
            }
        });
        
        // Show/hide load more button
        this.toggleLoadMoreButton();
    }
    
    setupLoadMore() {
        if (!this.loadMoreBtn) return;
        
        this.loadMoreBtn.addEventListener('click', () => {
            this.loadMoreItems();
        });
    }
    
    loadMoreItems() {
        const hiddenItems = Array.from(this.portfolioItems).filter(item => 
            !item.classList.contains('hidden') && 
            item.style.display === 'none'
        );
        
        // Show next batch of items
        const nextItems = hiddenItems.slice(0, 4);
        nextItems.forEach(item => {
            item.style.display = 'block';
        });
        
        // Hide load more button if no more items
        if (hiddenItems.length <= 4) {
            this.loadMoreBtn.style.display = 'none';
        }
    }
    
    toggleLoadMoreButton() {
        if (!this.loadMoreBtn) return;
        
        const hiddenItems = Array.from(this.portfolioItems).filter(item => 
            !item.classList.contains('hidden') && 
            item.style.display === 'none'
        );
        
        if (hiddenItems.length > 0) {
            this.loadMoreBtn.style.display = 'block';
        } else {
            this.loadMoreBtn.style.display = 'none';
        }
    }
    
    setupLightbox() {
        // Lightbox functionality is already in main.js
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});