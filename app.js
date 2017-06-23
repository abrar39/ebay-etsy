var ENTER_KEY = 13; //Enter Key for event handlers
var SEARCH_RESULTS_NUM = 10; //Search results number for both eBay and Etsy
var MSECONDS = 1000; // Number of milliseconds for fadeIn effect

/***********/
/*  ETSY   */
/***********/
/* AJAX call to access Etsy API */
function getDataFromEtsyApi(searchTerm, callback) {
  var ETSY_BASE_URL = 'https://openapi.etsy.com/v2/listings/active.js';
  var ETSY_KEY = 'jzmfv2cmv22o122d0jiv7z9m';
  
  var settings = {
    url: ETSY_BASE_URL,
    dataType: 'jsonp',
    data: {
      keywords: searchTerm,
      api_key: ETSY_KEY,
      includes: 'Images',
    },
    success: callback,
  };
  $.ajax(settings);
}

/* Parse Etsy API data */
function displayEtsySearchData(data) {
  var results = '<div class="jumbotron pre-scrollable"><div class="container-fluid col-xs-12"><div class="container-fluid col-xs-2"><p class="header fontVarela">Image</p></div><div class="container-fluid col-xs-8"><p class="header fontVarela">Title</p></div><div class="container-fluid col-xs-2"><p class="header fontVarela">Price</p></div></div>';
  if(data.count === 0) {
    hideSearchingNotify();
    revealNoEtsyResultsNotify();
  }
  else {
    hideNoEtsyResultsNotify();

    for(var i = 0; i < SEARCH_RESULTS_NUM; i++) {
      item = data.results[i];
      results += '<a href="' + item.url + '" target="_blank"><div class="container-fluid col-xs-12 etsy-row"><div class="container-fluid col-xs-2"><img class="img-thumbnail" src="' + item.Images[0].url_75x75 + '"></div><div class="container-fluid col-xs-8"><p>' + item.title + '</p></div><div class="container-fluid col-xs-2"><p>$' + item.price + '</p></div></div></a>';
    }
    results += '</div>';
    $('.js-results-etsy').html(results);
    $('.results').fadeIn(MSECONDS, revealEtsySearch);
  }
}

/* Reveal Etsy Search Results in Jumbotron */
function revealEtsySearch() {
  $('.etsy-search').fadeIn();
  hideSearchingNotify();
}

/***********/
/*  eBay   */
/***********/
/* AJAX call to access eBay API */
function getDataFromEbayApi(searchTerm, callback) {
  var EBAY_BASE_URL = 'http://svcs.ebay.com/services/search/FindingService/v1';
  var EBAY_KEY = 'ElushShi-ebayetsy-PRD-969dbd521-8995d39e';
  
  var settings = {
    url: EBAY_BASE_URL,
    dataType: 'jsonp',
    data: {
      'OPERATION-NAME': 'findItemsByKeywords',
      keywords: searchTerm,
      'SECURITY-APPNAME': EBAY_KEY,
    },
    success: callback,
  };
  $.ajax(settings);
}

/* Parse eBay API data */
function displayEbaySearchData(data) {
  var results = '<div class="jumbotron pre-scrollable"><div class="container-fluid col-xs-12"><div class="container-fluid col-xs-2"><p class="header fontVarela">Image</p></div><div class="container-fluid col-xs-8"><p class="header fontVarela">Title</p></div><div class="container-fluid col-xs-2"><p class="header fontVarela">Price</p></div></div>';
  if(!(data.findItemsByKeywordsResponse[0].searchResult[0].item)) {
    hideSearchingNotify();
    revealNoEbayResultsNotify();
  }
  else {
    hideNoEbayResultsNotify();

    for(var i = 0; i < SEARCH_RESULTS_NUM; i++) {
      item = data.findItemsByKeywordsResponse[0].searchResult[0].item[i];
      results += '<a href="' + item.viewItemURL + '" target="_blank"><div class="container-fluid col-xs-12 ebay-row"><div class="container-fluid col-xs-2"><img class="img-thumbnail" src="' + item.galleryURL + '"></div><div class="container-fluid col-xs-8"><p>' + item.title + '</p></div><div class="container-fluid col-xs-2"><p>$' + item.sellingStatus[0].currentPrice[0].__value__ + '</p></div></div></a>';
    }
    results += '</div>';
    $('.js-results-ebay').html(results);
    $('.results').fadeIn(MSECONDS, revealEbaySearch);
  }
}

/* Reveal eBay Search Results in Jumbotron */
function revealEbaySearch() {
  $('.ebay-search').fadeIn();
}

/************/
/*  Other   */
/************/
/* Show the 'Searching...' notification */
function revealSearchingNotify() {
  $('.js-search-notify').removeClass("hidden");
}

/* Hide the 'Searching...' notification */
function hideSearchingNotify() {
  $('.js-search-notify').addClass("hidden");
}

/* Show the 'Empty Query' notification */
function revealEmptyQueryNotify() {
  $('.js-emptyQuery-notify').removeClass("hidden");
}

/* Hide the 'Empty Query' notification */
function hideEmptyQueryNotify() {
  $('.js-emptyQuery-notify').addClass("hidden");
}

/* Show the 'No Ebay Results' notification */
function revealNoEbayResultsNotify() {
  $('.js-noResultsEbay-notify').removeClass("hidden");
}

/* Hide the 'No Ebay Results' notification */
function hideNoEbayResultsNotify() {
  $('.js-noResultsEbay-notify').addClass("hidden");
}

/* Show the 'No Etsy Results' notification */
function revealNoEtsyResultsNotify() {
  $('.js-noResultsEtsy-notify').removeClass("hidden");
}

/* Hide the 'No Etsy Results' notification */
function hideNoEtsyResultsNotify() {
  $('.js-noResultsEtsy-notify').addClass("hidden");
}

/**********************/
/*  Control Station   */
/**********************/
/* Show the Banner Header with a fadeIn effect. Afterwards, call function to
    reveal the Banner Text */
function revealBannerHeader() {
  $('#bannerHdg').fadeIn(MSECONDS, revealBannerText);
}

/* Show the Banner Text with a fadeIn effect. Afterwards, call function to
    reveal the Banner Search Bar */
function revealBannerText() {
  $('#bannerText').fadeIn(MSECONDS, revealBannerSearch);
}

/* Show the Banner Search Bar with a fadeIn effect. Afterwards, call function to
    activate the event handlers in watchSubmit */
function revealBannerSearch() {
  $('#bannerSearch').fadeIn((MSECONDS/2), watchSubmit);
}

/* Event Handlers */
function watchSubmit() {

  /* Main Search Bar event handler*/
  $('.js-query-main').keypress(function(e) {
    if(e.which === ENTER_KEY) {
      hideNoEbayResultsNotify();
      hideNoEtsyResultsNotify();
      hideEmptyQueryNotify();

      let query = $(this).val();
      if(query.trim() == "") {
        revealEmptyQueryNotify();
        return;
      }
      revealSearchingNotify();
      getDataFromEbayApi(query, displayEbaySearchData);
      getDataFromEtsyApi(query, displayEtsySearchData);
    }
  });

  /* eBay event handler*/
  $('.js-query-ebay').keypress(function(e) {
    if(e.which === ENTER_KEY) {
      e.preventDefault();
      let query = $(this).val();
      getDataFromEbayApi(query, displayEbaySearchData);
    }
  });

  /* Etsy event handler */
  $('.js-query-etsy').keypress(function(e) {
    if(e.which === ENTER_KEY) {
      e.preventDefault();
      let query = $(this).val();
      getDataFromEtsyApi(query, displayEtsySearchData);
    }
  });
}
 
$(function(){
  revealBannerHeader();
});
