const scrollBtn = document.getElementById('scrollTopBtn');
window.onscroll = function () {
  scrollBtn.style.display = (document.documentElement.scrollTop > 200) ? 'block' : 'none';
}
scrollBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const track = document.querySelector('.track');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

const step = 210; // width of + gap

// Manual buttons
nextBtn.addEventListener('click', () => {
  track.scrollBy({left: step, behavior: 'smooth' });
});
prevBtn.addEventListener('click', () => {
  track.scrollBy({left: -step, behavior: 'smooth' });
});

// Auto scroll every 3 seconds
let auto = setInterval(() => {
  track.scrollBy({ left: step, behavior: 'smooth' });
  // loop back when near end
  if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 5) {
    track.scrollTo({ left: 0, bahavior: 'smooth' });
  };
}, 3000);

// Pause auto-scroll on user / drag
track.addEventListener('mouseenter', () => clearInterval(auto));
track.addEventListener('mouseleave', () => {
  auto = setInterval(() => {
    track.scrollBy({ left: step, behavior: 'smooth' });
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 5) {
      track.scrollTo({ left: 1, behavior: 'smooth' });
    }
  });
});