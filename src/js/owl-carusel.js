$(document).ready(function () {
  $('.owl-carousel').owlCarousel();
});

$('.owl-carousel').owlCarousel({
  autoplay: true,
  autoplayTimeout: 6500,
  autoplaySpeed: 1000,
  loop: true,
  navText: false,
  margin: 24,
  nav: true,
  responsive: {
    0: {
      items: 1,
    },
    744: {
      items: 2,
    },
    1100: {
      items: 4,
    },
  },
});
