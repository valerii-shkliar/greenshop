$(function () {
  const $searchBtnMenu = $('header .menu-container .search-box .search-btn');
  const $navBar = $('header .navbar');
  const $searchBtnNavBar = $('header .wrapper .navbar form .search-btn');
  const $searchInputNavBar = $('header .wrapper .navbar form .search');
  const $menuTrigger = $('header .wrapper .logo-container .burger-menu .menu-trigger');
  const $burgerMenu = $('.logo-container .burger-menu');
  const $searchForm = $("header .wrapper .navbar form[name='search']");
  const NAVBAR_ACTIVE_SELECTOR = '.navbar.active';
  const BURGER_MENU_SELECTOR = '.burger-menu';
  const SEARCH_BTN_MENU_SELECTOR = 'header .menu-container .search-box .search-btn';
  const ACTIVE_CLASS = 'active';
  const MAX_WIDTH_FOR_MOVING_SEARCH = 650;
  const MAX_WIDTH_FOR_OPEN_SEARCH_BAR = 540;
  let btnNavBarCoords;
  let diff;
  let searchBtnAnimation;
  let isAccomplishAnimation = false;
  let timeout;
  const DELAY_RECALC_RESIZE = 500;
  const keyFrame = [
    { left: '0px', top: '0px', opacity: 1, offset: 0 },
    { opacity: 0.3, visibility: 'visible', offset: 0.9 },
    { left: '', top: '', opacity: 0, visibility: 'hidden', offset: 1 },
  ];
  const animateOptions = {
    duration: 400,
    easing: 'ease-out',
    fill: 'forwards',
  };

  $burgerMenu.on('click', onBurgerMenuClick);
  $(window).on('resize', onWindowResize);
  $(document).on('click', onDocumentClick);
  $searchBtnMenu.on('click', onSearchBtnMenuClick);
  $searchForm.on('submit', onSearchFormSubmit);

  $('.navbar .menu .nested-drop-down > .menu-item').on('click', function () {
    $(this).closest('.nested-drop-down').toggleClass(ACTIVE_CLASS);
    $(this).next('.drop-down').toggleClass(ACTIVE_CLASS);
  });

  $('.nested-drop-down .nested-drop-down-second .menu-item').on('click', function () {
    $(this).closest('.nested-drop-down-second').toggleClass(ACTIVE_CLASS);
    $(this).next('.drop-down').toggleClass(ACTIVE_CLASS);
  });

  function onBurgerMenuClick() {
    toggleMenu();

    if ($searchBtnNavBar && $(window).width() <= MAX_WIDTH_FOR_MOVING_SEARCH) {
      if (!isAccomplishAnimation) {
        initAnimation();
      }

      if ($navBar.hasClass(ACTIVE_CLASS)) {
        playAnimate();
      }
      if (!$navBar.hasClass(ACTIVE_CLASS)) {
        reverseAnimate();
      }
    }
  }

  function onWindowResize() {
    clearTimeout(timeout);

    timeout = setTimeout(initAnimationAfterResize, DELAY_RECALC_RESIZE);
  }

  function initAnimationAfterResize() {
    if ($(NAVBAR_ACTIVE_SELECTOR)[0]) {
      hideMenu();
      cancelAnimate();
    }
  }

  function onDocumentClick(e) {
    if (
      $(this).has(NAVBAR_ACTIVE_SELECTOR).length &&
      !$(e.target).closest(NAVBAR_ACTIVE_SELECTOR)[0] &&
      !$(e.target).closest(BURGER_MENU_SELECTOR)[0] &&
      !$(e.target).closest(SEARCH_BTN_MENU_SELECTOR)[0]
    ) {
      hideMenu();

      if ($(window).width() <= MAX_WIDTH_FOR_MOVING_SEARCH) {
        reverseAnimate();
      }
    }
  }

  function onSearchBtnMenuClick(e) {
    if (
      $(window).width() <= MAX_WIDTH_FOR_OPEN_SEARCH_BAR &&
      !$(this).closest(NAVBAR_ACTIVE_SELECTOR)[0]
    ) {
      onBurgerMenuClick();
    }
    if ($(this).closest(NAVBAR_ACTIVE_SELECTOR)[0]) {
      doSearch();
    }
  }

  function onSearchFormSubmit(e) {
    e.preventDefault();

    doSearch();
  }

  function initAnimation() {
    if (!btnNavBarCoords) {
      btnNavBarCoords = calcCoords($searchBtnNavBar);
    }

    const btnMenuCoords = calcCoords($searchBtnMenu);
    const navBarShift = calcNavBarShift();

    diff = countOffsetBtn(btnNavBarCoords, btnMenuCoords, navBarShift);

    fillKeyFrame(diff);
    searchBtnAnimation = createAnimation();
    pauseAnimate();
  }
  function calcCoords(el) {
    const coords = el[0].getBoundingClientRect();

    return { left: coords.left, top: coords.top };
  }

  function countOffsetBtn(btnNavBarCoords, btnMenuCoords, navBarShift) {
    return {
      left: btnMenuCoords.left - navBarShift,
      top: btnNavBarCoords.top - btnMenuCoords.top,
    };
  }

  function fillKeyFrame(diff) {
    keyFrame[2].left = diff.left * -1 + 'px';
    keyFrame[2].top = diff.top + 'px';
  }

  function calcNavBarShift() {
    const navBarWidth = Number($navBar.css('width').slice(0, -2));
    const navBarPadding = Number($navBar.css('padding').slice(0, -2));
    const btnRight = Number($searchBtnNavBar.css('right').slice(0, -2));
    const btnWidth = Number($searchBtnNavBar.css('width').slice(0, -2));

    return navBarWidth - navBarPadding - btnRight - btnWidth;
  }

  function createAnimation() {
    if (searchBtnAnimation) {
      cancelAnimate();
    }

    return $searchBtnMenu[0].animate(keyFrame, animateOptions);
  }
  function toggleMenu() {
    $navBar.toggleClass(ACTIVE_CLASS);
    $menuTrigger.toggleClass(ACTIVE_CLASS);
  }
  function hideMenu() {
    $navBar.removeClass(ACTIVE_CLASS);
    $menuTrigger.removeClass(ACTIVE_CLASS);
  }

  function doSearch() {
    console.log('Search is progress.....');
  }

  function pauseAnimate() {
    searchBtnAnimation.pause();
    isAccomplishAnimation = true;
  }

  function cancelAnimate() {
    searchBtnAnimation.cancel();
    isAccomplishAnimation = false;
  }

  function playAnimate() {
    searchBtnAnimation.playbackRate = 1;
    searchBtnAnimation.play();
    stateOfSearchBtn = true;
  }

  function reverseAnimate() {
    searchBtnAnimation.reverse();
    isAccomplishAnimation = false;
  }
});
