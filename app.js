//var etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords=teapot&limit=12&includes=Images:1&api_key=jzmfv2cmv22o122d0jiv7z9m";

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
    },
    success: callback,
  };
  $.ajax(settings);
}
 
function displayEtsySearchData(data) {
  if (data.ok) {
    for(var i = 0; i < 5; i++) {
      item = data.results[i];
      $('.js-results-etsy').append('<div class="container-fluid col-sm-12"><div class="container-fluid col-sm-2"><img src="' + item.galleryURL + '"></div><div class="container-fluid col-sm-8"><p>' + item.title + '</p></div><div class="container-fluid col-sm-2"><p>$' + item.price + '</p></div></div>');
      //$('.js-results-etsy').append("<p>" + item.title + "</p>");
    }
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
  if(data) {
    for(var i = 0; i < 5; i++) {
      item = data.findItemsByKeywordsResponse[0].searchResult[0].item[i];
      $('.js-results-ebay').append('<div class="container-fluid col-sm-12"><div class="container-fluid col-sm-2"><img src="' + item.galleryURL + '"></div><div class="container-fluid col-sm-8"><p>' + item.title + '</p></div><div class="container-fluid col-sm-2"><p>$' + item.sellingStatus[0].currentPrice[0].__value__ + '</p></div></div>');
      //$('.js-results-ebay').append("<p>" + item.galleryURL + "</p>");
      //$('.js-results-ebay').append("<p>" + item.title + "</p>");
      //$('.js-results-ebay').append("<p>$" + item.sellingStatus[0].currentPrice[0].__value__ + "</p>");
    }
  }
}
 
function watchSubmit() {
  /* eBay */
  $('.js-success-ebay').click(function(e) {
    e.preventDefault();
    var query = $(this).parents('.js-search-form').find('.js-query').val();
    getDataFromEbayApi(query, displayEbaySearchData);
  });

  /* ETSY */
  $('.js-success-etsy').click(function(e) {
    e.preventDefault();
    var query = $(this).parents('.js-search-form').find('.js-query').val();
    getDataFromEtsyApi(query, displayEtsySearchData);
  });
}
 
$(function(){
  watchSubmit();
});
