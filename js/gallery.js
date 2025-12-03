// =========================================
    // 5. GALLERY MODAL & SWIPE LOGIC
    // =========================================
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("modalImage");
    const closeBtn = document.getElementById("imgClose");
    const prevBtn = document.getElementById("imgPrev");
    const nextBtn = document.getElementById("imgNext");
    
    // Get all gallery images
    // Note: Adjust selector if your images are nested differently
    const galleryImages = Array.from(document.querySelectorAll('.gallery-grid img'));
    let currentIndex = 0;

    // Open Modal Function
    function openModal(index) {
        currentIndex = index;
        modal.classList.add('show'); // Use class for fade animation
        modalImg.src = galleryImages[currentIndex].src;
        document.body.style.overflow = 'hidden'; // Lock background scroll
    }

    // Close Modal Function
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.style.overflow = ''; // Unlock scroll
            modalImg.src = ''; // Clear src to stop memory leaks
        }, 400); // Wait for transition
    }

    // Show Next/Prev
    function showImage(direction) {
        currentIndex += direction;
        // Loop interactions
        if (currentIndex >= galleryImages.length) currentIndex = 0;
        if (currentIndex < 0) currentIndex = galleryImages.length - 1;
        
        // Add a tiny fade effect for image switch
        modalImg.style.opacity = 0;
        setTimeout(() => {
            modalImg.src = galleryImages[currentIndex].src;
            modalImg.style.opacity = 1;
        }, 200);
    }

    // Event Listeners (Click)
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => openModal(index));
    });

    if(closeBtn) closeBtn.addEventListener('click', closeModal);
    if(nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showImage(1); });
    if(prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showImage(-1); });

    // Close on background click
    if(modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // -----------------------------------------
    // SWIPE DETECTION (Mobile Magic)
    // -----------------------------------------
    let touchStartX = 0;
    let touchEndX = 0;

    if(modal) {
        modal.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});

        modal.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});
    }

    function handleSwipe() {
        const threshold = 50; // Minimum distance to count as swipe
        if (touchEndX < touchStartX - threshold) {
            showImage(1); // Swipe Left -> Next Image
        }
        if (touchEndX > touchStartX + threshold) {
            showImage(-1); // Swipe Right -> Prev Image
        }
    }