$(function () {
  $('.logo-container .burger-menu').on('click', function () {
    $('header .navbar').toggleClass('active');
  });

  $('.menu-trigger').on('click', function () {
    $(this).toggleClass('active');
  });
  $('.navbar .menu .nested-drop-down > .menu-item').on('click', function () {
    $(this).closest('.nested-drop-down').toggleClass('active');
    $(this).next('.drop-down').toggleClass('active');
  });

  $('.nested-drop-down .nested-drop-down-second .menu-item').on('click', function () {
    $(this).closest('.nested-drop-down-second').toggleClass('active');
    $(this).next('.drop-down').toggleClass('active');
  });
});
