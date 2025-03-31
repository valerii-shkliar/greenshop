'use strict';

const filterBtn = document.querySelector('.catalog .right-side .filter-btn');
const leftSide = document.querySelector('.catalog .left-side');
const ACTIVE_CLASS = 'active';

filterBtn.addEventListener('click', onFilterBtnClick);

function onFilterBtnClick() {
  leftSide.classList.toggle(ACTIVE_CLASS);
}
