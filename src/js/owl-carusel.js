// $(document).ready(function () {
//   owl.owlCarousel();
// });

// $('.blog-posts > .wrapper > .article-container.owl-carousel').owlCarousel({
//   autoplay: false,
//   autoplayTimeout: 6500,
//   autoplaySpeed: 1000,
//   loop: true,
//   navText: false,
//   margin: 24,
//   nav: true,
//   responsive: {
//     0: {
//       items: 1,
//     },
//     360: {
//       items: 1,
//     },
//     744: {
//       items: 2,
//     },
//     1100: {
//       items: 4,
//     },
//   },
// });

$(document).ready(function () {
  const $additionalOffersCarousel = $('main .additional-offers > .wrapper.owl-carousel');
  const $articleContainer = $('.blog-posts > .wrapper > .article-container.owl-carousel');
  const delayRecalcResize = 500;
  let timeout;

  toggleAdditionalOffers();
  runArticleContainer();

  $(window).on('resize', onWindowResize);

  function onWindowResize() {
    clearTimeout(timeout);

    timeout = setTimeout(toggleAdditionalOffers, delayRecalcResize);
  }

  function toggleAdditionalOffers() {
    let screenWidth = $(window).width();

    if (screenWidth <= 655) {
      if (!$additionalOffersCarousel.hasClass('owl-loaded')) {
        $additionalOffersCarousel.owlCarousel({
          autoplay: false,
          autoplayTimeout: 6500,
          autoplaySpeed: 1000,
          loop: true,
          navText: false,
          nav: true,
          items: 1,
          center: true,
          autoHeight: true,
        });
      }
    } else {
      if ($additionalOffersCarousel.hasClass('owl-loaded')) {
        $additionalOffersCarousel.trigger('destroy.owl.carousel');
      }
    }
  }

  function runArticleContainer() {
    $articleContainer.owlCarousel({
      autoplay: false,
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
        611: {
          items: 2,
        },
        911: {
          items: 3,
        },
        1201: {
          items: 4,
        },
      },
    });
  }
});
