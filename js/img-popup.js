 const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.getElementById("imgClose");
  const prevBtn = document.getElementById("imgPrev");
  const nextBtn = document.getElementById("imgNext");

  const images = Array.from(document.querySelectorAll(".img"));
  let currentIndex = 0;

  function openModal(index) {
    currentIndex = index;
    modalImg.src = images[currentIndex].src;
    modal.style.display = "flex";
  }

  function animateChange(index, direction) {
    const animClass = direction === 'left' ? 'slide-left' : 'slide-right';
    modalImg.classList.add(animClass);

    setTimeout(() => {
      modalImg.src = images[index].src;
      modalImg.classList.remove(animClass);
    }, 200);
  }

  images.forEach((image, index) => {
    image.addEventListener("click", () => openModal(index));
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    animateChange(currentIndex, 'left');
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    animateChange(currentIndex, 'right');
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Swipe support
  let startX = 0;

  modal.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  modal.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (diffX > 50) {
      // swipe left -> next
      currentIndex = (currentIndex + 1) % images.length;
      animateChange(currentIndex, 'left');
    } else if (diffX < -50) {
      // swipe right -> prev
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      animateChange(currentIndex, 'right');
    }
  });