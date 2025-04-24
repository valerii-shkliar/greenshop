const $preloaderContainer = $('.preload-container');
const $statusLoading = $('.status-loading');
const $body = $('body');
let paddingBodyRight;
let differ;
const imgCount = $('img').length;
const percent = Number((100 / imgCount).toFixed());
let loadedCount = 0;
let result = 0;

init();

function init() {
  lookScroll();

  for (let i = 0; i < imgCount; i++) {
    const copy_img = new Image();
    copy_img.src = document.images[i].src;

    $(copy_img).on('load', onCopyImgLoad);
    $(copy_img).on('error', onCopyImgLoad);
  }
}

function onCopyImgLoad() {
  result += percent;
  loadedCount++;

  if (result >= 100 || loadedCount == imgCount) {
    $preloaderContainer.addClass('hide');
    unLookScroll();
  } else {
    fillProgress();
  }
}

function fillProgress() {
  $statusLoading.text(result + ' %');
}

function lookScroll() {
  differ = window.innerWidth - document.documentElement.clientWidth;

  if (differ) {
    if (paddingBodyRight) {
      addPaddingRightOfBody();
    } else {
      paddingBodyRight = Number($body.css('paddingRight').slice(0, 2));
      addPaddingRightOfBody();
    }
  }
  $body.css('overflow', 'hidden');

  function addPaddingRightOfBody() {
    document.body.style.paddingRight = String(paddingBodyRight + differ) + 'px';
    paddingBodyRight += differ;
  }
}
function unLookScroll() {
  if (differ) {
    removePaddingRightOfBody();
  }
  $body.css('overflow', '');

  function removePaddingRightOfBody() {
    document.body.style.paddingRight = String(paddingBodyRight - differ) + 'px';
    paddingBodyRight -= differ;
  }
}
function removePreloader() {
  if ($preloaderContainer) {
    $preloaderContainer.remove();
  }
}
