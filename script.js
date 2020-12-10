// ******************************************************** MENU & SUBMENU
const burger = document.querySelector(".hamburger");
const mainNav = document.querySelector(".mainNav");
const items = document.querySelectorAll(".mainNav__link");

/* Toggle mobile menu */
function toggleMenu() {
  if (mainNav.classList.contains("show-menu")) {
    mainNav.classList.remove("show-menu");
    document.querySelector(".hamburger__burger").innerHTML = "<i class='fas fa-bars'></i>";
  } else {
    mainNav.classList.add("show-menu");

    document.querySelector(".hamburger__burger").innerHTML =
      "<i class='fas fa-times'></i>";
  }
}
/* Event Listeners */
burger.addEventListener("click", toggleMenu, false);

/* Activate Submenu */
function toggleSubMenu() {
  if (this.classList.contains("show-submenu")) {
    this.classList.remove("show-submenu");
  } else if (mainNav.querySelector(".show-submenu")) {
    mainNav.querySelector(".show-submenu").classList.remove("show-submenu");
    this.classList.add("show-submenu");
  } else {
    this.classList.add("show-submenu");
  }
}
/* Event Listeners */
for (let item of items) {
  if (item.querySelector(".mainNav__link__subMenu")) {
    item.addEventListener("click", toggleSubMenu, false);
    item.addEventListener("keypress", toggleSubMenu, false);
  }
}

/* Close Submenu From Anywhere */
function closeSubmenu(e) {
  let isClickInside = mainNav.contains(e.target);

  console.log(isClickInside);
  if (!isClickInside && mainNav.querySelector(".show-submenu")) {
    mainNav.querySelector(".show-submenu").classList.remove("show-submenu");
  }
}

/* Event Listeners */
document.addEventListener("click", closeSubmenu, false);
// ******************************************************** MENU & SUBMENU
//
//
//
// ******************************************************** INTRO SLIDESHOW

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("carSlides");
  // var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  // for (i = 0; i < dots.length; i++) {
  //   dots[i].className = dots[i].className.replace(" active", "");
  // }
  slides[slideIndex - 1].style.display = "block";
  // dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 3000); // Change image every 2 seconds
}

let slideIndex = 0;
showSlides();
// ******************************************************** INTRO SLIDESHOW
// 
// 
// ******************************************************** FIND BAR
const selectBrand = document.querySelector('.select__brand');
// const selectOption = document.querySelector('.select__option');
// const selectOptions = document.querySelectorAll('.select__option');
const barListItems = document.querySelectorAll('.select__option');
const findBar = document.querySelector('.findBar__content');

/* Toggle find bar options */
function toggleOptionBar() {
  if (this.classList.contains("show-bar-selection")) {
    this.classList.remove("show-bar-selection");
  } else if (findBar.querySelector('.show-bar-selection')) {
    findBar.querySelector('.show-bar-selection').classList.remove('show-bar-selection');
    this.classList.add('show-bar-selection');
  }
    else {
    this.classList.add("show-bar-selection");
  }
  
}
/* Event Listeners */
for (barListItem of barListItems) {
  if (barListItem.querySelector('.select__option__list')) {
    barListItem.addEventListener("click", toggleOptionBar, false);
  }
}
// ******************************************************** FIND BAR
// 
// 
// 
// ******************************************************** BACK TO TOP
const btt = document.querySelector(".backToTop");

function bttScrollFunction() {
  if (window.pageYOffset > 500) {
    btt.classList.add("show-btt");
  } 
  else {
    btt.classList.remove("show-btt");
  }
}

window.addEventListener("scroll", bttScrollFunction);

function bttClickFunction() {
  window.scrollTo(0, 0);
}
btt.addEventListener("click", bttClickFunction);
// ******************************************************** BACK TO TOP
// 
// ******************************************************** HIDE TOP HEADER
const mainHeader = document.querySelector(".mainHeader");

function adjustMainHeader() {
  if (window.pageYOffset > 50) {
    mainHeader.classList.add("adjust--mainHeader");
  } 
  else {
    mainHeader.classList.remove("adjust--mainHeader");
  }
}

window.addEventListener("scroll", adjustMainHeader);
// ******************************************************** HIDE TOP HEADER
// 
// ******************************************************** CAROUSEL
const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.btn__carousel--right');
const prevButton = document.querySelector('.btn__carousel--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);
const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  
  if (targetIndex === 0) {
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
  } else {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
}

prevButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  moveToSlide(track, currentSlide, prevSlide);
  
  const currentDot = dotsNav.querySelector('.current-slide');
  const prevDot = currentDot.previousElementSibling;
  updateDots(currentDot, prevDot);

  const prevIndex = slides.findIndex(slide => slide === prevSlide);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);
})

nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;

  const currentDot = dotsNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;

  const nextIndex = slides.findIndex(slide => slide === nextSlide);
  moveToSlide(track, currentSlide, nextSlide);

  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
})

dotsNav.addEventListener('click', e => {
  const targetDot = e.target.closest('button');

  if (!targetDot) return;

  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];

  
  moveToSlide(track, currentSlide, targetSlide);

  updateDots(currentDot, targetDot);

  hideShowArrows(slides, prevButton, nextButton, targetIndex);
})
// ******************************************************** CAROUSEL
// 
// ******************************************************** BLOG
const blogTrack = document.querySelector('.ourBlog__track');
const blogSlides = Array.from(blogTrack.children);
const blogNextButton = document.querySelector('.btn__ourBlog--right');
const blogPrevButton = document.querySelector('.btn__ourBlog--left');
const blogDotsNav = document.querySelector('.ourBlog__nav');
const blogDots = Array.from(blogDotsNav.children);
const blogSlideWidth = blogSlides[0].getBoundingClientRect().width;

const blogSetSlidePosition = (slide, index) => {
  slide.style.left = blogSlideWidth * index + 'px';
}
blogSlides.forEach(blogSetSlidePosition);

const blogMoveToSlide = (blogTrack, blogCurrentSlide, blogTargetSlide) => {
  blogTrack.style.transform = 'translateX(-' + blogTargetSlide.style.left + ')';
  blogCurrentSlide.classList.remove('ourBlog-current-slide');
  blogTargetSlide.classList.add('ourBlog-current-slide');
}

const blogUpdateDots = (blogCurrentDot, blogTargetDot) => {
  blogCurrentDot.classList.remove('ourBlog-current-slide');
  blogTargetDot.classList.add('ourBlog-current-slide');
}

const blogHideShowArrows = (blogSlides, blogPrevButton, blogNextButton, blogTargetIndex) => {
  if (blogTargetIndex === 0) {
    blogPrevButton.classList.add('is-hidden');
    blogNextButton.classList.remove('is-hidden');
  } else if (blogTargetIndex === blogSlides.length - 1) {
    blogPrevButton.classList.remove('is-hidden');
    blogNextButton.classList.add('is-hidden');
  }
  else {
    blogPrevButton.classList.remove('is-hidden');
    blogNextButton.classList.remove('is-hidden');
  }
}

blogPrevButton.addEventListener('click', e => {
  const blogCurrentSlide = blogTrack.querySelector('.ourBlog-current-slide');
  const blogPrevSlide = blogCurrentSlide.previousElementSibling;
  blogMoveToSlide(blogTrack, blogCurrentSlide, blogPrevSlide);

  const blogCurrentDot = blogDotsNav.querySelector('.ourBlog-current-slide');
  const blogPrevDot = blogCurrentDot.previousElementSibling;
  blogUpdateDots(blogCurrentDot, blogPrevDot);

  const blogPrevIndex = blogSlides.findIndex(blogSlide => blogSlide === blogPrevSlide);
  blogHideShowArrows(blogSlides, blogPrevButton, blogNextButton, blogPrevIndex);
})

blogNextButton.addEventListener('click', e => {
  const blogCurrentSlide = blogTrack.querySelector('.ourBlog-current-slide');
  const blogNextSlide = blogCurrentSlide.nextElementSibling;

  const blogCurrentDot = blogDotsNav.querySelector('.ourBlog-current-slide');
  const blogNextDot = blogCurrentDot.nextElementSibling;

  const blogNextIndex = blogSlides.findIndex(blogSlide => blogSlide === blogNextSlide);
  
  blogMoveToSlide(blogTrack, blogCurrentSlide, blogNextSlide);

  blogUpdateDots(blogCurrentDot, blogNextDot);
  blogHideShowArrows(blogSlides, blogPrevButton, blogNextButton, blogNextIndex);
})

blogDotsNav.addEventListener('click', e => {
  const blogTargetDot = e.target.closest('button');

  if (!blogTargetDot) return;

  const blogCurrentSlide = blogTrack.querySelector('.ourBlog-current-slide');
  const blogCurrentDot = blogDotsNav.querySelector('.ourBlog-current-slide');
  const blogTargetIndex = blogDots.findIndex(blogDot => blogDot === blogTargetDot);
  const blogTargetSlide = blogSlides[blogTargetIndex];

  blogMoveToSlide(blogTrack, blogCurrentSlide, blogTargetSlide);

  blogUpdateDots(blogCurrentDot, blogTargetDot);

  blogHideShowArrows(blogSlides, blogPrevButton, blogNextButton, blogTargetIndex)
})
// ******************************************************** BLOG


// ******************************************************** links modal
// need to add removal of link function
const links = document.querySelectorAll('.modal');

// my 1st solution
// function modalBox() {
//   // no way to prevent default
//   alert('Links are not functional');
// }
// 
// links.forEach(link => {
//   link.addEventListener('click', modalBox);
// });

// my shorter solution
links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Hello.\nLinks are not functional.\nThis sample work is for demo purpose of a Responsive Layout and Simple Animation of the main page.\nThank You.');
  })
});