var SPACE_KEY = 13;
var SEARCH_RESULTS_NUM = 20;

/***********/
/*  ETSY   */
/***********/
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
 
function displayEtsySearchData(data) {
  var results = '<div class="jumbotron pre-scrollable"><div class="container-fluid col-xs-12"><div class="container-fluid col-xs-2"><p>Image</p></div><div class="container-fluid col-xs-8"><p>Title</p></div><div class="container-fluid col-xs-2"><p>Price</p></div></div>';
  if (data.ok) {
    for(var i = 0; i < SEARCH_RESULTS_NUM; i++) {
      item = data.results[i];
      results += '<div class="container-fluid col-xs-12"><div class="container-fluid col-xs-2"><img src="' + item.Images[0].url_75x75 + '"></div><div class="container-fluid col-xs-8"><p>' + item.title + '</p></div><div class="container-fluid col-xs-2"><p>$' + item.price + '</p></div></div>';
    }
    results += '</div>';
    $('.js-results-etsy').html(results);
  }
}

/***********/
/*  eBay   */
/***********/
/*var url1 = "http://svcs.ebay.com/services/search/FindingService/v1";
    url1 += "?OPERATION-NAME=findItemsByKeywords";
    url1 += "&SERVICE-VERSION=1.0.0";
    url1 += "&SECURITY-APPNAME=ElushShi-ebayetsy-PRD-969dbd521-8995d39e";
    url1 += "&GLOBAL-ID=EBAY-US";
    url1 += "&RESPONSE-DATA-FORMAT=JSONP";
    url1 += "&callback=displayEtsySearchData2";
    url1 += "&REST-PAYLOAD";
    url1 += "&keywords=harry%20potter";
    url1 += "&paginationInput.entriesPerPage=3";*/

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

function displayEbaySearchData(data) {
  var results = '<div class="jumbotron pre-scrollable"><div class="container-fluid col-xs-12"><div class="container-fluid col-xs-2"><p>Image</p></div><div class="container-fluid col-xs-8"><p>Title</p></div><div class="container-fluid col-xs-2"><p>Price</p></div></div>';
  if(data) {
    for(var i = 0; i < SEARCH_RESULTS_NUM; i++) {
      item = data.findItemsByKeywordsResponse[0].searchResult[0].item[i];
      results += '<div class="container-fluid col-xs-12"><div class="container-fluid col-xs-2"><img src="' + item.galleryURL + '"></div><div class="container-fluid col-xs-8"><p>' + item.title + '</p></div><div class="container-fluid col-xs-2"><p>$' + item.sellingStatus[0].currentPrice[0].__value__ + '</p></div></div>';
    }
    results += '</div>';
    $('.js-results-ebay').html(results);
  }
}
 
function watchSubmit() {
  /* Main Search Bar */
  $('.js-query-main').keypress(function(e) {
    if(e.which === SPACE_KEY) {
      var query = $(this).val();
      getDataFromEbayApi(query, displayEbaySearchData);
      getDataFromEtsyApi(query, displayEtsySearchData);
    }
  });

  /* eBay */
  $('.js-success-ebay').click(function(e) {
    e.preventDefault();
    var query = $(this).parents('.js-search-form').find('.js-query-ebay').val();
    getDataFromEbayApi(query, displayEbaySearchData);
  });

  $('.js-query-ebay').keypress(function(e) {
    if(e.which === SPACE_KEY) {
      var query = $(this).val();
      getDataFromEbayApi(query, displayEbaySearchData);
    }
  });

  /* ETSY */
  $('.js-success-etsy').click(function(e) {
    e.preventDefault();
    var query = $(this).parents('.js-search-form').find('.js-query-etsy').val();
    getDataFromEtsyApi(query, displayEtsySearchData);
  });

  $('.js-query-etsy').keypress(function(e) {
    if(e.which === SPACE_KEY) {
      var query = $(this).val();
      getDataFromEtsyApi(query, displayEtsySearchData);
    }
  });
}
 
$(function(){
  watchSubmit();
});
