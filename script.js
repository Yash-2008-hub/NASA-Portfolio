// Smooth scrolling with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const animateOnScroll = (elements, className) => {
    if (!elements || elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(className);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s, transform 0.5s';
            observer.observe(element);
        }
    });
};

// Initialize animations for different sections
document.addEventListener('DOMContentLoaded', () => {
    // Mission cards animation
    const missionCards = document.querySelectorAll('.mission-card');
    animateOnScroll(missionCards, 'fade-in');

    // Gallery items animation
    const galleryItems = document.querySelectorAll('.gallery-item');
    animateOnScroll(galleryItems, 'fade-in');

    // About section animation
    const aboutElements = document.querySelectorAll('.about-content > *');
    animateOnScroll(aboutElements, 'fade-in');

    // Enhanced parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrollPosition = window.pageYOffset;
                hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
                hero.style.opacity = Math.max(0.5, 1 - (scrollPosition * 0.002));
            }, 10);
        });
    }

    // Image loading optimization
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img) return;
        
        // Add loading animation
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s';
        
        // Create a new image to preload
        const preloadImg = new Image();
        preloadImg.src = img.src;
        
        preloadImg.onload = () => {
            img.style.opacity = '1';
        };
        
        preloadImg.onerror = () => {
            img.style.opacity = '1';
            img.src = 'https://via.placeholder.com/800x600?text=Image+Not+Available';
        };
    });

    // Add hover effects to mission cards
    missionCards.forEach(card => {
        if (!card) return;
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 15px 30px rgba(11, 61, 145, 0.4)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
        });
    });

    // Add click effect to gallery items
    galleryItems.forEach(item => {
        if (!item) return;
        
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const overlay = item.querySelector('.overlay');
            
            if (img && overlay) {
                if (overlay.style.transform === 'translateY(0%)') {
                    overlay.style.transform = 'translateY(100%)';
                    img.style.transform = 'scale(1)';
                } else {
                    overlay.style.transform = 'translateY(0%)';
                    img.style.transform = 'scale(1.1)';
                }
            }
        });
    });

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(to right, #0B3D91, #FC3D21);
        z-index: 1001;
        transition: width 0.1s;
        width: 0;
    `;
    document.body.appendChild(progressBar);

    let scrollProgressTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollProgressTimeout);
        scrollProgressTimeout = setTimeout(() => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        }, 10);
    });

    // Add back to top button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(45deg, #0B3D91, #FC3D21);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        display: none;
        opacity: 0;
        transition: opacity 0.3s;
        z-index: 1000;
    `;
    document.body.appendChild(backToTop);

    let backToTopTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(backToTopTimeout);
        backToTopTimeout = setTimeout(() => {
            if (window.pageYOffset > 300) {
                backToTop.style.display = 'block';
                backToTop.style.opacity = '1';
            } else {
                backToTop.style.opacity = '0';
                setTimeout(() => {
                    backToTop.style.display = 'none';
                }, 300);
            }
        }, 10);
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}); 