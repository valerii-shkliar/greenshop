'use strict';

const $filterBtn = $('.catalog .right-side .filter-btn');
const $leftSide = $('.catalog .left-side');
const $logInBtn = $(
  'header .wrapper .menu-container .log-in-btn, header .wrapper .navbar .log-in-btn'
);
const $closeRegisterPage = $('header .register-page .wrapper-register .close-page');
const $registerPage = $('header .register-page');
const $overlay = $('header .overlay');
const ACTIVE_CLASS = 'active';

$filterBtn.on('click', onFilterBtnClick);
$logInBtn.on('click', onLogInBtnClick);
$overlay.on('click', onOverlayClick);
$closeRegisterPage.on('click', onOverlayClick);

function onFilterBtnClick() {
  $leftSide.toggleClass(ACTIVE_CLASS);
}

function onLogInBtnClick() {
  $overlay.addClass(ACTIVE_CLASS);
  $registerPage.addClass(ACTIVE_CLASS);
}

function onOverlayClick() {
  $overlay.removeClass(ACTIVE_CLASS);
  $registerPage.removeClass(ACTIVE_CLASS);
}
