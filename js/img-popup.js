/**
 * Image Slideshow / Lightbox Logic
 * Handles modal opening, navigation, and touch gestures.
 * UPDATED: Scopes slideshow to the specific workshop container.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Selectors ---
    const modal = document.getElementById('imgModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.getElementById('imgClose');
    const prevBtn = document.getElementById('imgPrev');
    const nextBtn = document.getElementById('imgNext');
    
    // Select all images on the page to attach click listeners
    const allImages = document.querySelectorAll('.image-grid .img');
    
    // State
    let currentGroupImages = []; // Will hold only the images for the currently active workshop
    let currentIndex = 0;
    
    // --- Functions ---
    
    // Open Modal
    const openModal = (clickedImage) => {
        // 1. Find the specific grid container this image belongs to
        const parentGrid = clickedImage.closest('.image-grid');
        
        // 2. Collect only images from THIS specific grid
        if (parentGrid) {
            currentGroupImages = Array.from(parentGrid.querySelectorAll('.img'));
            
            // 3. Find the index of the clicked image within this specific group
            currentIndex = currentGroupImages.indexOf(clickedImage);
            
            updateModalImage();
            
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            
            // Add fade-in effect to image specifically
            modalImg.style.opacity = '0';
            setTimeout(() => {
                modalImg.style.opacity = '1';
            }, 50);
        }
    };
    
    // Close Modal
    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
        currentGroupImages = []; // Clear the group
    };
    
    // Update Image Source
    const updateModalImage = () => {
        if (currentGroupImages.length > 0) {
            const imageSrc = currentGroupImages[currentIndex].src;
            const imageAlt = currentGroupImages[currentIndex].alt;
            
            modalImg.src = imageSrc;
            modalImg.alt = imageAlt;
        }
    };
    
    // Next Image
    const showNext = (e) => {
        if(e) e.stopPropagation();
        if (currentGroupImages.length === 0) return;
        
        currentIndex = (currentIndex + 1) % currentGroupImages.length;
        updateModalImage();
    };
    
    // Previous Image
    const showPrev = (e) => {
        if(e) e.stopPropagation();
        if (currentGroupImages.length === 0) return;

        currentIndex = (currentIndex - 1 + currentGroupImages.length) % currentGroupImages.length;
        updateModalImage();
    };
    
    // --- Event Listeners ---
    
    // 1. Click on images to open
    allImages.forEach((img) => {
        img.addEventListener('click', (e) => {
            openModal(e.target);
        });
    });
    
    // 2. Close buttons
    closeBtn.addEventListener('click', closeModal);
    
    // Close when clicking outside the image (on the dark background)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // 3. Navigation Buttons
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);
    
    // 4. Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('show')) return;
        
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
    
    // 5. Touch Swipe Support (Mobile)
    let touchStartX = 0;
    let touchEndX = 0;
    
    modal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    modal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    const handleSwipe = () => {
        const swipeThreshold = 50; // Minimum distance to count as swipe
        
        if (touchStartX - touchEndX > swipeThreshold) {
            showNext(); // Swipe Left -> Next
        }
        
        if (touchEndX - touchStartX > swipeThreshold) {
            showPrev(); // Swipe Right -> Prev
        }
    };
});