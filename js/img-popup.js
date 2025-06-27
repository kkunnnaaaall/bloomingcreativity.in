
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

  images.forEach((image, index) => {
    image.addEventListener("click", () => openModal(index));
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    modalImg.src = images[currentIndex].src;
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImg.src = images[currentIndex].src;
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Swipe support for mobile
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
      modalImg.src = images[currentIndex].src;
    } else if (diffX < -50) {
      // swipe right -> prev
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      modalImg.src = images[currentIndex].src;
    }
  });