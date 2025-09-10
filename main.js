const scrollBtn = document.getElementById('scrollTopBtn');
window.onscroll = function () {
  scrollBtn.style.display = (document.documentElement.scrollTop > 200) ? 'block' : 'none';
}
scrollBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Loop through each product card
document.querySelectorAll('.product-card').forEach(card => {
  const track = card.querySelector('.track');
  const nextBtn = card.querySelector('.next');
  const prevBtn = card.querySelector('.prev');
  const step = 210;

  let auto;
  let scrollTimeout;

  // function to start auto-scroll
  function startAutoScroll() {
    auto = setInterval(() => {
      track.scrollBy({ left: step, behavior: 'smooth' });
      // loop back when near end
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 5) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      };
    }, 3000);
  }

  // function to reset auto-scroll
  function resetAutoScroll() {
    clearInterval(auto);
    startAutoScroll();
  }

  function goNext() {
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 5) {
      // At the end → go back to start
      track.scrollTo({ left: 0, behavior: 'smooth'});
    } else {
      track.scrollBy({ left: step, behavior: 'smooth'});
    }
  }

  function goPrev() {
    if (track.scrollLeft <= 0) {
      // At the start → go to end
      track.scrollTo({ left: track.scrollWidth, behavior: 'smooth'});
    } else {
      track.scrollBy({ left: -step, behavior: 'smooth'});
    }
  }

  // reset auto-scroll aftr manual scroll/drag
  track.addEventListener('scroll', () => {
    clearInterval(auto); // stop auto while scrolling
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => 
      resetAutoScroll(), 2000); // restart 2s after user stops
  });

  // Manual buttons
  nextBtn.addEventListener('click', () => {
    // track.scrollBy({left: step, behavior: 'smooth' });
    goNext();
    resetAutoScroll(); // restart timer
  });
  prevBtn.addEventListener('click', () => {
    // track.scrollBy({left: -step, behavior: 'smooth' });
    goPrev();
    resetAutoScroll(); // restart timer
  });

  // Auto scroll starts initially
  startAutoScroll();

  // Pause auto-scroll on user / drag
  track.addEventListener('mouseenter', () => clearInterval(auto));
  track.addEventListener('mouseleave', () => resetAutoScroll());
});

const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');
const overlay = document.getElementById('overlay');

// Open menu
hamburgerBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  hamburgerBtn.classList.toggle('active')
  navMenu.classList.toggle('active');
  overlay.classList.toggle('active');

  // Prevent body scroll when menu is open
  if (navMenu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Close menu when clicking nav links
navMenu.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    hamburgerBtn.classList.remove('active');
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (navMenu.classList.contains("active") &&
      !navMenu.contains(e.target) &&
      !hamburgerBtn.contains(e.target)) {
    navMenu.classList.remove("active");
    hamburgerBtn.classList.remove('active'); // reset hamburger
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});

overlay.addEventListener('click', () => {
  hamburgerBtn.classList.remove('active');
  navMenu.classList.remove('active');
  overlay.classList.remove('active');
});

// Handle window resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    hamburgerBtn.classList.remove('active');
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});