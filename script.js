document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Floating images animation
    const floatingImages = document.querySelectorAll('.floating-img');
    
    floatingImages.forEach((img, index) => {
        // Add slight floating animation with different delays
        img.style.animation = `float 3s ease-in-out ${index * 0.5}s infinite`;
    });
});
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const sideMenu = document.querySelector('.side-menu');
const overlay = document.querySelector('.overlay');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    sideMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = sideMenu.classList.contains('active') ? 'hidden' : '';
});

overlay.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
});

const container = document.getElementById('partnerContainer');
    const cards = container.innerHTML;
    container.innerHTML = cards + cards;

    function setScrollSpeed(speed) {
      container.style.animationDuration = speed + 's';
    }

// Add floating animation to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
        100% {
            transform: translateY(0px);
        }
    }
`;
document.head.appendChild(style);

 // Simple navigation functionality
 const gridItems = document.querySelectorAll('.grid-item');
 const leftArrow = document.querySelector('.left-arrow');
 const rightArrow = document.querySelector('.right-arrow');
 let currentIndex = 0;
 
 leftArrow.addEventListener('click', () => {
     if (currentIndex > 0) {
         currentIndex--;
         scrollToItem(currentIndex);
     }
 });
 
 rightArrow.addEventListener('click', () => {
     if (currentIndex < gridItems.length - 1) {
         currentIndex++;
         scrollToItem(currentIndex);
     }
 });
 
 function scrollToItem(index) {
     gridItems[index].scrollIntoView({
         behavior: 'smooth',
         block: 'nearest'
     });
 }
 
 // Like functionality
 const hearts = document.querySelectorAll('.heart-icon');
 hearts.forEach(heart => {
     heart.addEventListener('click', (e) => {
         e.stopPropagation();
         const likesElement = heart.nextElementSibling;
         let likes = parseInt(likesElement.textContent);
         
         if (heart.classList.contains('liked')) {
             heart.classList.remove('liked');
             heart.textContent = '❤️';
             likes--;
         } else {
             heart.classList.add('liked');
             heart.textContent = '❤️';
             likes++;
         }
         
         likesElement.textContent = likes;
     });
 });




 

// JavaScript for implementing the slider functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add the updated CSS to the page
    const styleElement = document.createElement('style');
    styleElement.textContent = css;
    document.head.appendChild(styleElement);
    
    // Get elements
    const slider = document.getElementById('remindersSlider');
    const items = document.querySelectorAll('.reminder-item');
    
    // Add video icons to all items that don't have them
    items.forEach(item => {
        if (!item.querySelector('.reminder-video-icon')) {
            const videoIcon = document.createElement('div');
            videoIcon.className = 'reminder-video-icon';
            item.querySelector('.reminder-img').appendChild(videoIcon);
        }
    });
    
    // Clone all items and append them to create a seamless loop
    items.forEach(item => {
        const clone = item.cloneNode(true);
        slider.appendChild(clone);
    });
    
    // Pause animation on hover
    slider.addEventListener('mouseenter', () => {
        slider.style.animationPlayState = 'paused';
    });
    
    slider.addEventListener('mouseleave', () => {
        slider.style.animationPlayState = 'running';
    });
    
    // Update dots based on visible slides
    const dots = document.querySelectorAll('.reminder-dot');
    const updateActiveDot = () => {
        // Calculate which slide set is most visible
        const containerRect = slider.parentElement.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        
        let closestItem = null;
        let minDistance = Infinity;
        
        items.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const itemCenter = rect.left + rect.width / 2;
            const distance = Math.abs(containerCenter - itemCenter);
            
            if (distance < minDistance) {
                minDistance = distance;
                closestItem = index % dots.length;
            }
        });
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === closestItem);
        });
    };
    
    // Update dots periodically
    setInterval(updateActiveDot, 1000);
    
    // Click on dots to jump to that section
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Reset animation
            slider.style.animation = 'none';
            
            // Calculate position to show the desired section
            const itemWidth = items[0].offsetWidth + 20; // 20px for gap
            const offset = -index * itemWidth * 2; // 2 items per view
            
            slider.style.transform = `translateX(${offset}px)`;
            
            // Update active dot
            dots.forEach((d, i) => {
                d.classList.toggle('active', i === index);
            });
            
            // Resume animation after a short delay
            setTimeout(() => {
                slider.style.animation = 'slideRightToLeft 30s linear infinite';
                slider.style.transform = '';
            }, 2000);
        });
    });
});