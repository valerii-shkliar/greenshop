$(() => {
  const $markerMinPrice = $(
    'main .catalog .wrapper .left-side .price-container .categories-list .progress-container .progress-bar .marker.min-price'
  );
  const $markerMaxPrice = $(
    'main .catalog .wrapper .left-side .price-container .categories-list .progress-container .progress-bar .marker.max-price'
  );
  const $rangePrice = $(
    'main .catalog .wrapper .left-side .price-container .categories-list .progress-container .progress-bar .range'
  );
  const $priceContent = $(
    'main .catalog .wrapper .left-side .price-container .categories-list .price .price-content'
  );
  const $filterBtn = $('main .catalog .wrapper .left-side .price-container .categories-list .btn');
  let min = 39;
  let max = 1230;
  const MARKER_WIDTH = 27;
  const range = { minCosts: null, maxCosts: null };

  $markerMinPrice.on('input', onMarkerPriceInput);
  $markerMaxPrice.on('input', onMarkerPriceInput);
  $filterBtn.on('click', onFilterBtnClick);

  init();

  function onMarkerPriceInput() {
    if (Number($markerMinPrice.val()) !== min) {
      min = Number($markerMinPrice.val());
    }
    if (Number($markerMaxPrice.val()) !== max) {
      max = Number($markerMaxPrice.val());
    }

    if (min > max) {
      [min, max] = [max, min];
      $markerMinPrice.val(min);
      $markerMaxPrice.val(max);
    }
    const content = craftContent(min, max);

    setRange();
    setThumbs();
    fillPrice(content);
  }

  function onFilterBtnClick() {
    range.minCosts = min;
    range.maxCosts = max;

    filterByCosts();
  }

  function init() {
    const content = craftContent(min, max);

    setRange();
    setThumbs();
    fillPrice(content);
  }

  function fillPrice(content) {
    $priceContent.text(content);
  }

  function craftContent(min, max) {
    return `$${min} - $${max}`;
  }

  function setThumbs() {
    $markerMinPrice.val(min);
    $markerMaxPrice.val(max);
  }

  function setRange() {
    const maxAttr = Number($markerMaxPrice.attr('max'));
    const minAttr = Number($markerMaxPrice.attr('min'));

    const minPercent = ((min - minAttr) / (maxAttr - minAttr)) * 100;
    const maxPercent = ((max - minAttr) / (maxAttr - minAttr)) * 100;

    const left = minPercent + '%';
    const width = maxPercent - minPercent + '%';

    $rangePrice.css('left', left).css('width', width);
  }

  function filterByCosts() {
    console.log('Filtering.....', range);
  }
});
