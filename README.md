Website can be found in http://betsy-search.com/

#Introduction
Betsy is a shopping search website. It was created so users can search for products on both eBay and Etsy simultaneously, while also giving users the option to search both websites with different queries. The website provides the user with the links to the product on their respective websites.

#Low Level Design
------------------
--- INDEX.HTML ---
------------------
Links: Google Font APIs, Twitter Bootstap 3.3.7, jQuery 3.2.1, main.css (local), app.js (local)

Navbar section
  Navbar was created with the Twitter Bootstrap navbar in mind. 
  The class was set to 'navbar-inverse' to ensure a dark black navbar. 
  The class was set to 'navbar-fixed-top' to ensure the navbar always stays on top of the viewport. 
  A "navbar-header" class was added to left align a brand image to the navbar. This is set with a href attribute to take the user back to the starting homepage.

Banner section
  The banner section merely contains the title header, title text, and a main search bar. The header was simply a h1 element with a Google API font Lobster. The header text was simply a h6 element with a Google API font Varela. The main search bar is tied to an event handler in the app.js (more information in app.js section). The main search bar was created to occupy all 12 columns no matter what the device used to display it. 

eBay section
  The eBay section was created to have simply one jumbotron and one search bar specific to eBay.
  It first starts with a "results" class that is purposefully hidden until after the user searches for something. The logic to unhide and populate the results class is done in the app.js (more information in the app.js section)
  The eBay search bar is also hidden until the user first searches once with the main search bar. 
  The eBay search bar is tied to an event handler in the app.js (more information in app.js section).
  The eBay section was made with responsive design in mind. For a large viewing device, all 12 columns would be too much. So Twitter Bootstrap classes was made to have the eBay results take up all 12 rows on smaller devices, and only half (6) when being viewed on larger devices.

Etsy section
  The Etsy section was created to have simply one jumbotron and one search bar specific to Etsy.
  It first starts with a "results" class that is purposefully hidden until after the user searches for something. The logic to unhide and populate the results class is done in the app.js (more information in the app.js section)
  The Etsy search bar is also hidden until the user first searches once with the main search bar. 
  The Etsy search bar is tied to an event handler in the app.js (more information in app.js section).
  The Etsy section was made with responsive design in mind. For a large viewing device, all 12 columns would be too much. So Twitter Bootstrap classes was made to have the Etsy results take up all 12 rows on smaller devices, and only half (6) when being viewed on larger devices.


--------------
--- APP.JS ---
--------------
revealBannerHeader()
  This is the first function completed in the app.js. This is called as soon as the page fully loads. It simply removes the 'display: none' ruleset when called to fadeIn the Betsy logo for aestheic reasons. After that is completed, it calls the revealBannerText function.

revealBannerText()
  This is the second function completed in the app.js. This is called as soon as the page fully loads. It simply removes the 'display: none' ruleset when called to fadeIn the Betsy logo descriptive text for aestheic reasons. After that is completed, it calls the revealBannerSearch function.

revealBannerSearch()
  This is the third function completed in the app.js. This is called as soon as the revealBannerText completes, with some time delay (defined by MSECONDS variable). It simply removes the 'display: none' ruleset when called to fadeIn the Main Search Bar for aestheic reasons. After that is completed, it calls the watchSubmit function.

watchSubmit()
  This function handles all event handlers for the Betsy page.
  The first event handler is for the Main Search Bar. Event is triggered when user presses the 'Enter' key. This will call three functions, revealSearchingNotify, getDataFromEbayApi, getDataFromEtsyApi, which calls to show the 'Searching... ' notification, and makes AJAX calls to the eBay and Etsy APIs, respectively. 
  The second event handler is for the eBay Search Bar. Event is triggered when user presses the 'Enter' key. This will call getDataFromEbayApi, which calls to make an AJAX call to the eBay API with the text in the eBay Search Bar.
  The third event handler is for the Etsy Search Bar. Event is triggered when user presses the 'Enter' key. This will call getDataFromEtsyApi, which calls to make an AJAX call to the Etsy API with the text in the Etsy Search Bar.

getDataFromEbayApi()
  This function was created to send an AJAX call to the eBay API and return some results on success. It uses the EBAY_BASE_URL and my personal EBAY_KEY within the .ajax call.
  eBay API specifically requires that the developer uses the 'OPERATION-NAME': 'findItemsByKeywords' to have a successful return.
  Special note is that eBay also returns a JSONP package since its API calls other APIs outside of its website. 
  Once the .ajax call is successful, it calls the displayEbaySearchData function to parse the JSONP data.

displayEbaySearchData()
  This function parses the JSONP data acquired from the eBay API.
  It parses the data and places it into HTML block. The HTML block is for a jumbotron with the results which includes a link to the product, image, title, and price.
  The HTMl block always first starts with the code below. This sets the jumbotron and the sizes of each column in the Results. 
  ```
    <div class="jumbotron pre-scrollable">
      <div class="container-fluid col-xs-12">
        <div class="container-fluid col-xs-2">
          <p class="header fontVarela">Image</p>
        </div>
        <div class="container-fluid col-xs-8">
          <p class="header fontVarela">Title</p>
        </div>
        <div class="container-fluid col-xs-2">
          <p class="header fontVarela">Price</p>
        </div>
      </div>
  ```
  The parsing then continues to add data, represented by item, as so:
  ```
    <a href="item.viewItemURL" target="_blank">
      <div class="container-fluid col-xs-12 ebay-row">
        <div class="container-fluid col-xs-2">
          <img class="img-fluid img-thumbnail" src="item.galleryURL">
        </div>
        <div class="container-fluid col-xs-8">
          <p>item.title</p>
        </div>
        <div class="container-fluid col-xs-2">
          <p>$item.sellingStatus[0].currentPrice[0].__value__</p>
        </div>
      </div>
    </a>
  ```
    Once the data is populated with the eBay API, the results are then shown with the revealEbaySearch function.

revealEbaySearch()
  This function uses the fadeIn effect to the 'ebay-results' class in the HTML

getDataFromEtsyApi()
  This function was created to send an AJAX call to the Etsy API and return some results on success. It uses the ETSY_BASE_URL and my personal ETSY_KEY within the .ajax call.
  Etsy API specifically requires that the developer uses the includes: 'Images' to have a successful return with image thumbnail URLs.
  Special note is that Etsy also returns a JSONP package since its API calls other APIs outside of its website. 
  Once the .ajax call is successful, it calls the displayEtsySearchData function to parse the JSONP data.

displayEtsySearchData()
  This function parses the JSONP data acquired from the Etsy API.
  It parses the data and places it into HTML block. The HTML block is for a jumbotron with the results which includes a link to the product, image, title, and price.
  The HTMl block always first starts with the code below. This sets the jumbotron and the sizes of each column in the Results. 
  ```
    <div class="jumbotron pre-scrollable">
      <div class="container-fluid col-xs-12">
        <div class="container-fluid col-xs-2">
          <p class="header fontVarela">Image</p>
        </div>
        <div class="container-fluid col-xs-8">
          <p class="header fontVarela">Title</p>
        </div>
        <div class="container-fluid col-xs-2">
          <p class="header fontVarela">Price</p>
        </div>
      </div>
  ```
  The parsing then continues to add data, represented by item, as so:
  ```
    <a href="item.url" target="_blank">
      <div class="container-fluid col-xs-12 etsy-row">
        <div class="container-fluid col-xs-2">
          <img class="img-fluid img-thumbnail" src="item.Images[0].url_75x75">
        </div>
        <div class="container-fluid col-xs-8">
          <p>item.title</p>
        </div>
        <div class="container-fluid col-xs-2">
          <p>$item.price</p>
        </div>
      </div>
    </a>
  ```
    Once the data is populated with the Etsy API, the results are then shown with the revealEtsySearch function.

revealEtsySearch()
  This function uses the fadeIn effect to the 'etsy-results' class in the HTML

----------------
--- MAIN.CSS ---
----------------
main.css is commented for each ruleset

-----------------------------
--- Future Revisions v1.1 ---
-----------------------------
Version 1.1 will have, but not limited to, the following features. 
Will replace Twitter Bootstrap with own CSS Grid System

Search result thumbnails will be larger so users can view the product more easily

The background image will be part of a carousel of images-- possibly a carousel of videos similar to AirBnb

Search results will include an Amazon div with its own results

Each search bars will include its own subimt button