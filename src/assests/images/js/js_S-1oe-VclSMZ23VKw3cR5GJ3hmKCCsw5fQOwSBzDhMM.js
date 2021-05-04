(function($) {
  'use strict';
  Drupal.globalInit = {
    init: false,
  };

  Drupal.ott = {
    jRes: null,
  };

  Drupal.behaviors.resizeEvent = {
    attach: function(context, settings) {

      var updatePageElements = function() {

        var windowWith = $(window).width();

        // Header
        $(window).on('scroll', function() {

          var scroll = $(window).scrollTop();
          var mainHeader = $('.main-header');
          var currentHeight = mainHeader.height();
          var headerBody = mainHeader.parents('body');

          // Get height of header
          if (scroll > 0) {
            headerBody.not('.page-new-header-footer').
            css('padding-top', currentHeight);
            headerBody.addClass('js-scrolled');
          }
          else {
            headerBody.not('.page-new-header-footer').css('padding-top', 0);
            headerBody.removeClass('js-scrolled');
          }

          // add class for header styles
          if (scroll >= 300) {
            headerBody.addClass('js-resized');
          }
          else {
            headerBody.removeClass('js-resized');
          }


          if (windowWith <= 768) {
            if (scroll > 0) {
              $('.page-new-header-footer'). css('padding-top', currentHeight);
              headerBody.addClass('js-scrolled');
            }
            else {
              $('.page-new-header-footer').css('padding-top', 0);
              headerBody.removeClass('js-scrolled');
            }
          }
        });

        // Prevent telephone link
        if (windowWith > 767) {
          $('.main-header__phone-link').once().on('click', function(e) {
            e.preventDefault();
          });
        }

        // Main Menu
        $('.main-header__menu > ul > li > a').once().on('click', function(e) {
          // Disable top links
          e.preventDefault();

          // Mobile menu accordion
          if (windowWith < 768) {
            // Toggle accordion
            $(this).next('ul').slideToggle();
            // Then close other accordions
            $(this).parent().siblings().children().next().slideUp();
          }
        });

        // Tabs
        if (windowWith > 767) {

          // Show/ hide text .tabs__text
          $('.tabs__tab').unbind('click').on('click', function() {
            $('.tabs__tab').removeClass('active--desktop');
            $(this).addClass('active--desktop');
          });

          var highest = 0;
          var elementHeights = $('.tabs__text').each(function(key, element) {
            highest = $(element).height() > highest
              ? $(element).height()
              : highest;
          });
          $('.tabs__inner').height(highest + 90);
        }
        else {
          // $('.tabs__tab').removeClass('active--desktop');
          $('.tabs__inner').css('height', 'auto');
          $('.tabs__tab').unbind('click').on('click', function() {

            $(this).
            toggleClass('active--mobile').
            find('.tabs__text').
            slideToggle('fast');
            $('.tabs__tab').
            not(this).
            removeClass('active--mobile').
            find('.tabs__text').
            slideUp();
          });
        }

        // Footer slider
        if (windowWith < 768) {
          $('.footer__menu h2').once().on('click', function() {
            $(this).toggleClass('js-active').siblings('ul').slideToggle();
          });
        }

        // Mobile menu accordion
        if ($(window).width() <= 1200) {
          // Toggle menu
          $('.main-header__mobile-toggle').once().on('click', function() {
            $(this).toggleClass('js-active');
            $(this).parents('body').toggleClass('js-no-scroll');
            $(this).
            parents('.main-header__main-nav-wrap').
            toggleClass('js-active').
            find('.main-nav').
            slideToggle();
          });

          // Toggle sub-menus
          $('.main-menu--first > li').once().on('click', function() {
            $(this).toggleClass('js-active');
            // Toggle accordion
            $(this).children('.main-menu--second').slideToggle();
            // Then close other accordions
            // $(this).parent().siblings().children().next().slideUp();
          });
        }

        (function() {
          const promisesCarousel = $('.promises__items');
          const productLinksCarousel = $('.product-related-links__carousel');

          if ($(window).width() <= 768) {
            promisesCarousel.not('.slick-initialized').slick({
              slidesToShow: 1.1,
              centerMode: true,
              infinite: false,
              arrows: false,
              dots: true,
              customPaging: function() {
                return '<span class="slick-dot"></span>';
              },
            });
          }
          else {
            if (promisesCarousel.hasClass('slick-initialized')) {
              promisesCarousel.slick('unslick');
            }
          }

          if ($(window).width() <= 768) {
            productLinksCarousel.
            not('.slick-initialized').
            slick({
              slidesToShow: 1.1,
              centerMode: true,
              infinite: false,
              arrows: false
            });
          }
          else {
            if (productLinksCarousel.hasClass('slick-initialized')) {
              productLinksCarousel.slick('unslick');
            }
          }
        })();

        // Add show more / show less for product policy benefits.
        if ($(window).width() <= 820) {
          $('.product-policy__cover-toggle').css('display', 'inline-block');
          $('.product-policy__cover-toggle').unbind().bind('click', function() {
            $(this).
            parents('.product-policy__cover').
            toggleClass('js-active');

            if ($(".product-policy__cover-toggle__show").html() == 'Show less') {
              $(".product-policy__cover-toggle__show").html('Show more');
            }
            else {
              $(".product-policy__cover-toggle__show").html('Show less');
            }
          });
        }
        else {
          $('.product-policy__cover-toggle').hide();
        }

        $('.homepage-campaigns__inner').not('.slick-initialized').slick({
          infinite: true,
          speed: 1000,
          fade: true,
          autoplay: true,
          autoplaySpeed: 3000,
          cssEase: 'linear',
          prevArrow: '<span class="homepage-campaign__prev"><svg class="chevron--prev" width="16" height="29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 2L2 14.5 14.5 27" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>',
          nextArrow: '<span class="homepage-campaign__next"><svg class="chevron--next" width="16" height="29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 27l12.5-12.5L2 2" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>',
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                arrows: false,
                dots: true,
                customPaging: function() {
                  return '<span class="carousel__dots slick-dot"></span>';
                }
              }
            }
          ]
        });

        $('.carousel__inner').not('.slick-initialized').slick({
          slidesToScroll: 1,
          speed: 1000,
          autoplaySpeed: 3500,
          dots: true,
          prevArrow: '<span class="carousel__prev"><svg class="chevron--prev" width="16" height="29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 2L2 14.5 14.5 27" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>',
          nextArrow: '<span class="carousel__next"><svg class="chevron--next" width="16" height="29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 27l12.5-12.5L2 2" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>',
          customPaging: function() {
            return '<span class="carousel__dots slick-dot"></span>';
          },
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                arrows: false
              }
            }
          ]
        });
      };

      if (!Drupal.globalInit.init) {
        // Initial page call.
        updatePageElements();

        // Bind on every resize.
        $(window).on('resize', Drupal.debounce(updatePageElements, 250, true));

        Drupal.ott.jRes = jRespond([
          {
            label: 'mobile',
            enter: 0,
            exit: 767
          }, {
            label: 'tablet',
            enter: 768,
            exit: 979
          }, {
            label: 'laptop',
            enter: 980,
            exit: 1199
          }, {
            label: 'desktop',
            enter: 1200,
            exit: 10000
          }
        ]);

        Drupal.globalInit.init = true;
      }
    }
  };

  Drupal.behaviors.mainMenu = {
    attach: function(context, settings) {

      var mainMenu = $('.main-header__menu');
      var firstMenuLi = $('.main-header .main-header__menu > ul > li');
      var firstMenuLink = $('.main-header__menu > ul > li > a');
      // var searchDropdown = $('.main-header__search-dropdown');
      // var mainMenuButton = $('.main-header__flex .js-hover');

      // Add hover state to active menu buttons
      // mainMenuButton.on('click', function() {
      //     mainMenuButton.removeClass('js-active');
      //     $(this).toggleClass('js-active');
      // });

      $('.homepage-campaigns__close').on('click', function() {
        $(this).parents('.homepage-campaigns').slideUp(300, function() {
          $('.homepage-campaigns').remove();
        });
      });

      // Open mobile menu
      $('.main-header__mobile-menu').once().on('click', function() {
        // Hide the Search Dropdown
        $('.main-header__search').removeClass('js-active');
        // Open menu
        $(this).next('.main-header__menu').toggleClass('js-active');
        // Hide when menu is closed
        firstMenuLink.next('ul').slideUp();
      });

      // Toggle active states on dropdown li
      firstMenuLi.once().on('click', function() {
        if ($(this).hasClass('js-active')) {
          $(this).removeClass('js-active');
        }
        else {
          firstMenuLi.removeClass('js-active');
          $(this).addClass('js-active');
        }
      });

      // Search
      $('.main-header__search-title').once().on('click', function() {
        // // Hide the Main Menu dropdown
        $(this).
        parents('.main-header__flex').
        find(mainMenu).
        removeClass('js-active');

        // // Open search
        $(this).parents('.main-header__search').toggleClass('js-active');
      });
    }
  };

  Drupal.behaviors.paragraphs = {
    attach: function(context, settings) {
      $('.concertina__header').once().on('click', function() {
        $(this).toggleClass('js-active').next().slideToggle('fast');
      });

      // Set active state on first tab
      $('.tabs__tab:first').addClass('active--desktop');
    }
  };

  Drupal.behaviors.customerCare = {
    attach: function(context, settings) {

      $('.customer-care-questions__button--no').once().on('click', function() {
        var accordionParent = $(this).closest('.customer-care-questions');
        accordionParent.find('.customer-care-questions__accordion--no').
        slideDown();
        accordionParent.find('.customer-care-questions__prompt').slideUp();
      });

      $('.customer-care-questions__button--yes').once().on('click', function() {
        var accordionParent = $(this).closest('.customer-care-questions');
        accordionParent.find(
          '.customer-care-questions__accordion--yes').slideDown();
        accordionParent.find('.customer-care-questions__prompt').slideUp();
      });

      // Listing
      $('.cc-accordion-item h3').once().on('click', function() {
        $(this).
        toggleClass('js-active').
        next('.cc-accordion-item-list').
        slideToggle('fast');
      });
    }
  };

  Drupal.behaviors.secondaryMenu = {
    attach: function(context, settings) {

      $('.side-menu__title').once().on('click', function() {
        $(this).toggleClass('js-active').next().slideToggle('fast');
      });
    }
  };

  var fby = fby || [];

  Drupal.behaviors.feedbackForm = {
    attach: function(context, settings) {

      $('.footer-top-links__cta a:nth-child(2)').on('click', function(e) {
        e.preventDefault();
        FBY.showForm(7018);
      });
    }
  };

  Drupal.behaviors.aboutUsAlterations = {
    attach: function(context, settings) {
      Drupal.ott.jRes.addFunc({
        breakpoint: 'mobile',
        enter: function() {
          $('.contact-us .contact-listing-table').hide();
          $('.table-processed-mobile-result').remove();
          if ($('.contact-us .contact-listing-table tr').length > 0) {
            var $arrayHeaders = [];
            var $arrayIcons = [];
            $('.contact-us .contact-listing-table thead th').
            each(function(ind, $elem) {
              $arrayHeaders.push($(this).html());
              $arrayIcons.push(
                $(this).children('.th-inner').css('background-image'));
            });

            if ($arrayHeaders.length > 0 &&
              $('.contact-us .contact-listing-table tbody tr').length >
              0) {
              $('.contact-us .contact-listing-table').after(
                '<div class="table-processed-mobile-result"></div>');
              $arrayHeaders.forEach(function($elemAH, indAH) {
                $('.table-processed-mobile-result').
                append('<div class="column-to-div column-to-div-' +
                  indAH +
                  '"><div class="column-to-div-head">' +
                  $arrayHeaders[indAH] + '</div></div>');
                $('.column-to-div-' + indAH + ' .th-inner').
                css('background-image', $arrayIcons[indAH]);
                $('.contact-us .contact-listing-table tbody tr').
                each(function(indTr, $elemTr) {
                  $('.column-to-div-' + indAH).
                  append('<div class="column-to-div-row column-to-div-row-' +
                    indTr + '">' + $(this).children('td').eq(indAH).html() +
                    '</div>');
                });
              });
            }
          }
        },

        exit: function() {
          $('.table-processed-mobile-result').remove();
          $('.contact-us table').show();
        }
      });
    }
  };

  // Behaviour to set the Graphic header image field as the background of the
  // containing zone.
  Drupal.behaviors.repairerGmapShowMap = {
    attach: function(context, settings) {
      $('.js-show-on-map').on('click', function(e) {

        var rowNum = $(this).attr('id').split('_').pop(),
          map = Drupal.geolocation.maps[Drupal.geolocation.maps.length -
          1].googleMap,
          markers = Drupal.geolocation.maps[Drupal.geolocation.maps.length -
          1].mapMarkers;

        google.maps.event.trigger(markers[rowNum], 'click');
        map.setCenter(markers[rowNum].getPosition());
        map.setZoom(16); // zoom on selected pin

        $('html, body').animate({
          scrollTop: $('.contact-us').offset().top - 25 // scroll up to map
                                                        // (-25 so its nicer)
        }, 750);

        e.preventDefault();

      });
    }
  };

  /**
   * New Homepage 2020 JS.
   */
  Drupal.behaviors.newHomeHeader = {
    attach: function(context, settings) {
      $('.paragraph--type--homepage-header.main-banner .main-banner-quote .main-banner-quote__product-links a.main-banner-quote__product-link').
      once().
      click(context, function(e) {
        e.preventDefault();

        $(this).parent().find('.active').removeClass('active');

        $(this).addClass('active');

        var newLink = $(this).attr('href');

        $(this).
        parent().
        parent().
        find('.main-banner-quote__product-cta').
        attr('href', newLink);
      });

      $('.scroll-to-top').on('click', function() {
        $('html, body').animate({
          scrollTop: $('body').offset().top - 25
        }, 750);
      });

      // Quote
      $('.start-quote__trigger').once().on('click', function() {
        // Open Quote
        $(this).
        parents('body').
        toggleClass('js-no-scroll').
        find('.popup--quote').
        toggleClass('js-active');
      });

      // Search
      $('.main-header__search-icon').once().on('click', function() {
        // Open Quote
        $(this).
        parents('body').
        toggleClass('js-no-scroll').
        find('.popup--search').
        toggleClass('js-active');
      });

      // Close popups
      $('.popup__close').once().on('click', function() {
        $(this).parents('.popup').removeClass('js-active');
        $(this).parents('body').removeClass('js-no-scroll');
      });
    }
  };

  /**
   * New Product Page 2020 JS
   */
  Drupal.behaviors.tabsFunctionality = {
    attach: function(context, settings) {
      // Translated from ES6 on babeljs.io to fix IE issue.
      var tabWrapper = '.product-policy__tabs';
      var tabTitle = '.product-policy__tab';
      var tabContent = '.product-policy__tab-content';
      $("".concat(tabWrapper, " ").concat(tabTitle, ":first-of-type a")).addClass('active');
      $("".concat(tabWrapper, " ").concat(tabContent, ".active")).show();
      $("".concat(tabWrapper, " ").concat(tabTitle, " a")).bind('click', function (e) {
        e.preventDefault();
        var id = '#' + $(this).attr('href');
        $("".concat(tabWrapper, " ").concat(tabTitle, " a.active")).removeClass('active');
        $(this).addClass('active');
        $("".concat(tabContent, ".active")).removeClass('active').hide();
        $(id).show().addClass('active');
      });
    }
  };

  /**
   * Simple equal heights behaviour.
   * @type {{attach: Drupal.behaviors.equalHeights.attach}}
   */
  Drupal.behaviors.equalHeights = {
    attach: function (context, settings) {
      $.fn.equalHeights = function(){
        var max_height = 0;
        $(this).each(function(){
          max_height = Math.max($(this).height(), max_height);
        });
        $(this).each(function(){
          $(this).css('height', max_height);
        });
      };

      // For product policy benefits.
      $('.product-policy__tab-content-items .policy-benefit', context).height('auto').equalHeights();

      if ($(window).width() <= 820) {
        const height = $('.product-policy__tab-content-items .policy-benefit').outerHeight(true);
        $('.product-policy__tab-content-items', context).height(height*3);
      }

      // Equal Heights for homepage promises.
      $('.promises__item-description', context).equalHeights();

      // Eq Heights for the homepage product cards.
      $('.product-card__desc', context).equalHeights();

      // For windows resizing.
      $(window).resize(function (e) {
        $('.product-policy__tab-content-items .policy-benefit', context).height('auto').equalHeights();

        // Only above mobile.
        if ($(window).width() >= 820) {
          // Equal Heights for homepage promises.
          $('.promises__item-description', context).height('auto').equalHeights();

          // Eq Heights for the homepage product cards.
          $('.product-card__desc').equalHeights();

          // For product policy benefits wrapper.
          $('.product-policy__tab-content-items', context).height('auto');
        } else {
          $('.promises__item-description').height('auto');
          $('.product-card__desc').height('auto');

          // For product policy benefits.
          const height = $('.product-policy__tab-content-items .policy-benefit', context).outerHeight(true);
          $('.product-policy__tab-content-items', context).height(height*3);
        }
      });
    }
  };
}(jQuery));
;
jQuery(function($) {
  var cookieName = '123_cookie_accept_v2';
  var bannerId = 'banner_cookie';
  var $body = $('body');

		$prependTarget = $('.main-header');

      cookieData = 'data-cookie',
      cookieClassHidden = 'hidden',
      cookieClassVisible = 'visible',
      cookieBannerVisibility = function(visible){
        if (visible === true){
          $body.attr(cookieData, cookieClassVisible);
        } else if (visible === false){
          $body.attr(cookieData, cookieClassHidden);
        } else {
          console.log('Error w/ Cookies: c.f. cookie.compliance.js');
        }
      },
      cookieBanner =
        '<div class="row ' + bannerId + '_wrapper">\
          <div class="' + bannerId + '">\
              <div class="' + bannerId + '_inner">\
                  <span class="cookie_info"></span>\
                    By using our website you consent to the use of cookies in accordance with our\
                    <a onclick="window.open(\'/compliance/cookie_policy.pdf\',\'\',\'menubar=0,\
                      resizable=1,scrollbars=1,status=0,titlebar=0,toolbar=0,width=650,height=500\')">\
                      cookie policy</a>.\
                  <a id="banner_cookie_close"></a>\
              </div>\
              <div class="clear"></div>\
          </div>\
        </div>';

  if(!document.cookie.match(new RegExp(cookieName + '=([^;]+)'))){
    if (navigator.cookieEnabled) {
      $prependTarget.prepend(cookieBanner);
      cookieBannerVisibility(true);
    }
  } else {
    cookieBannerVisibility(false);
  }
  $('#banner_cookie_close').on('click', function (e) {
    var date = new Date();
    date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + date.toGMTString();
    document.cookie = '123_cookie_accept_v2=1;expires='+expires+';path=/';
    $('.' + bannerId + '_wrapper').remove();
    cookieBannerVisibility(false);
  });
});
;
/*
 * Replace all SVG images with inline SVG
 * https://gist.github.com/Bloggerschmidt/61beeca2cce94a70c9df
 */

(function ($) {
  'use strict';

  Drupal.behaviors.svgReplace = {
    attach: function (context, settings) {
      $('img').filter(function () {
        return this.src.match(/.*\.svg$/);
      }).each(function () {
        var img = $(this);
        var imgClass = img.attr('class');
        var imgURL = img.attr('src');

        $.get(imgURL, function (data) {
          // Get the SVG tag, ignore the rest
          var svg = $(data).find('svg');

          // Add replaced image's classes to the new SVG
          if (typeof imgClass !== 'undefined') {
            svg = svg.attr('class', imgClass + ' replaced-svg');
          }

          // Remove any invalid XML tags as per http://validator.w3.org
          svg = svg.removeAttr('xmlns:a');

          // Replace image with new SVG
          img.replaceWith(svg);
        }, 'xml');
      });
    }
  };
}(jQuery));;
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.9.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
(function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)})(function(i){"use strict";var e=window.Slick||{};e=function(){function e(e,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(e),appendDots:i(e),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(e),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(e).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,"undefined"!=typeof document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=t++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}var t=0;return e}(),e.prototype.activateADA=function(){var i=this;i.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):o===!0?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&i.options.adaptiveHeight===!0&&i.options.vertical===!1){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),s.options.rtl===!0&&s.options.vertical===!1&&(e=-e),s.transformsEnabled===!1?s.options.vertical===!1?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):s.cssTransitions===!1?(s.options.rtl===!0&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),s.options.vertical===!1?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),s.options.vertical===!1?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this,o=t.getNavTarget();null!==o&&"object"==typeof o&&o.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};e.options.fade===!1?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,e.options.fade===!1?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(i.options.infinite===!1&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1===0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;e.options.arrows===!0&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),e.options.infinite!==!0&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(o.options.dots===!0&&o.slideCount>o.options.slidesToShow){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),e.options.centerMode!==!0&&e.options.swipeToSlide!==!0||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.options.draggable===!0&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>0){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(r.originalSettings.mobileFirst===!1?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),e===!0&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),e===!0&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,e===!0&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||l===!1||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!==0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t,o=this;if(e=o.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var s in e){if(i<e[s]){i=t;break}t=e[s]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),e.options.accessibility===!0&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),e.options.arrows===!0&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),e.options.accessibility===!0&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),e.options.accessibility===!0&&e.$list.off("keydown.slick",e.keyHandler),e.options.focusOnSelect===!0&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>0&&(i=e.$slides.children().children(),i.removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){var e=this;e.shouldClick===!1&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",e.options.fade===!1?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;t.cssTransitions===!1?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;e.cssTransitions===!1?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick","*",function(t){var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&o.is(":focus")&&(e.focussed=!0,e.autoPlay())},0)}).on("blur.slick","*",function(t){i(this);e.options.pauseOnFocus&&(e.focussed=!1,e.autoPlay())})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){var i=this;return i.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(i.options.infinite===!0)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(i.options.centerMode===!0)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),n.options.infinite===!0?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,n.options.vertical===!0&&n.options.centerMode===!0&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!==0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),n.options.centerMode===!0&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:n.options.centerMode===!0&&n.options.infinite===!0?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:n.options.centerMode===!0&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=n.options.vertical===!1?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,n.options.variableWidth===!0&&(o=n.slideCount<=n.options.slidesToShow||n.options.infinite===!1?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=n.options.rtl===!0?o[0]?(n.$slideTrack.width()-o[0].offsetLeft-o.width())*-1:0:o[0]?o[0].offsetLeft*-1:0,n.options.centerMode===!0&&(o=n.slideCount<=n.options.slidesToShow||n.options.infinite===!1?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=n.options.rtl===!0?o[0]?(n.$slideTrack.width()-o[0].offsetLeft-o.width())*-1:0:o[0]?o[0].offsetLeft*-1:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){var e=this;return e.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(e.options.infinite===!1?i=e.slideCount:(t=e.options.slidesToScroll*-1,o=e.options.slidesToScroll*-1,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o,s,n=this;return s=n.options.centerMode===!0?Math.floor(n.$list.width()/2):0,o=n.swipeLeft*-1+s,n.options.swipeToSlide===!0?(n.$slideTrack.find(".slick-slide").each(function(e,s){var r,l,d;if(r=i(s).outerWidth(),l=s.offsetLeft,n.options.centerMode!==!0&&(l+=r/2),d=l+r,o<d)return t=s,!1}),e=Math.abs(i(t).attr("data-slick-index")-n.currentSlide)||1):n.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){var t=this;t.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),t.options.accessibility===!0&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);if(i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),s!==-1){var n="slick-slide-control"+e.instanceUid+s;i("#"+n).length&&i(this).attr({"aria-describedby":n})}}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.options.focusOnChange?e.$slides.eq(s).attr({tabindex:"0"}):e.$slides.eq(s).removeAttr("tabindex");e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;i.options.arrows===!0&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),i.options.accessibility===!0&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;e.options.dots===!0&&e.slideCount>e.options.slidesToShow&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),e.options.accessibility===!0&&e.$dots.on("keydown.slick",e.keyHandler)),e.options.dots===!0&&e.options.pauseOnDotsHover===!0&&e.slideCount>e.options.slidesToShow&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),e.options.accessibility===!0&&e.$list.on("keydown.slick",e.keyHandler),e.options.focusOnSelect===!0&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;i.options.arrows===!0&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),i.options.dots===!0&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&e.options.accessibility===!0?e.changeSlide({data:{message:e.options.rtl===!0?"next":"previous"}}):39===i.keyCode&&e.options.accessibility===!0&&e.changeSlide({data:{message:e.options.rtl===!0?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||r.$slider.attr("data-sizes"),n=document.createElement("img");n.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),r.$slider.trigger("lazyLoaded",[r,e,t])})},n.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),r.$slider.trigger("lazyLoadError",[r,e,t])},n.src=t})}var t,o,s,n,r=this;if(r.options.centerMode===!0?r.options.infinite===!0?(s=r.currentSlide+(r.options.slidesToShow/2+1),n=s+r.options.slidesToShow+2):(s=Math.max(0,r.currentSlide-(r.options.slidesToShow/2+1)),n=2+(r.options.slidesToShow/2+1)+r.currentSlide):(s=r.options.infinite?r.options.slidesToShow+r.currentSlide:r.currentSlide,n=Math.ceil(s+r.options.slidesToShow),r.options.fade===!0&&(s>0&&s--,n<=r.slideCount&&n++)),t=r.$slider.find(".slick-slide").slice(s,n),"anticipated"===r.options.lazyLoad)for(var l=s-1,d=n,a=r.$slider.find(".slick-slide"),c=0;c<r.options.slidesToScroll;c++)l<0&&(l=r.slideCount-1),t=t.add(a.eq(l)),t=t.add(a.eq(d)),l--,d++;e(t),r.slideCount<=r.options.slidesToShow?(o=r.$slider.find(".slick-slide"),e(o)):r.currentSlide>=r.slideCount-r.options.slidesToShow?(o=r.$slider.find(".slick-cloned").slice(0,r.options.slidesToShow),e(o)):0===r.currentSlide&&(o=r.$slider.find(".slick-cloned").slice(r.options.slidesToShow*-1),e(o))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){var i=this;i.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;if(!t.unslicked&&(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),t.options.accessibility===!0&&(t.initADA(),t.options.focusOnChange))){var o=i(t.$slides.get(t.currentSlide));o.attr("tabindex",0).focus()}},e.prototype.prev=e.prototype.slickPrev=function(){var i=this;i.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),r=document.createElement("img"),r.onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),l.options.adaptiveHeight===!0&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),e.options.focusOnSelect===!0&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;return"boolean"==typeof i?(e=i,i=e===!0?0:o.slideCount-1):i=e===!0?--i:i,!(o.slideCount<1||i<0||i>o.slideCount-1)&&(o.unload(),t===!0?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,void o.reinit())},e.prototype.setCSS=function(i){var e,t,o=this,s={};o.options.rtl===!0&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,o.transformsEnabled===!1?o.$slideTrack.css(s):(s={},o.cssTransitions===!1?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;i.options.vertical===!1?i.options.centerMode===!0&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),i.options.centerMode===!0&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),i.options.vertical===!1&&i.options.variableWidth===!1?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):i.options.variableWidth===!0?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();i.options.variableWidth===!1&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,t.options.rtl===!0?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&i.options.adaptiveHeight===!0&&i.options.vertical===!1){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":"undefined"!=typeof arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),i.options.fade===!1?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=i.options.vertical===!0?"top":"left",
"top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||i.options.useCSS===!0&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&i.animType!==!1&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&i.animType!==!1},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),n.options.centerMode===!0){var r=n.options.slidesToShow%2===0?1:0;e=Math.floor(n.options.slidesToShow/2),n.options.infinite===!0&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=n.options.infinite===!0?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(s.options.fade===!0&&(s.options.centerMode=!1),s.options.infinite===!0&&s.options.fade===!1&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=s.options.centerMode===!0?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));return s||(s=0),t.slideCount<=t.options.slidesToShow?void t.slideHandler(s,!1,!0):void t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(a.animating===!0&&a.options.waitForAnimate===!0||a.options.fade===!0&&a.currentSlide===i))return e===!1&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,a.options.infinite===!1&&a.options.centerMode===!1&&(i<0||i>a.getDotCount()*a.options.slidesToScroll)?void(a.options.fade===!1&&(o=a.currentSlide,t!==!0&&a.slideCount>a.options.slidesToShow?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o))):a.options.infinite===!1&&a.options.centerMode===!0&&(i<0||i>a.slideCount-a.options.slidesToScroll)?void(a.options.fade===!1&&(o=a.currentSlide,t!==!0&&a.slideCount>a.options.slidesToShow?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o))):(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!==0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!==0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=a.getNavTarget(),l=l.slick("getSlick"),l.slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide)),a.updateDots(),a.updateArrows(),a.options.fade===!0?(t!==!0?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight()):void(t!==!0&&a.slideCount>a.options.slidesToShow?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)))},e.prototype.startLoad=function(){var i=this;i.options.arrows===!0&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),i.options.dots===!0&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),o=Math.round(180*t/Math.PI),o<0&&(o=360-Math.abs(o)),o<=45&&o>=0?s.options.rtl===!1?"left":"right":o<=360&&o>=315?s.options.rtl===!1?"left":"right":o>=135&&o<=225?s.options.rtl===!1?"right":"left":s.options.verticalSwiping===!0?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(o.touchObject.edgeHit===!0&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(e.options.swipe===!1||"ontouchend"in document&&e.options.swipe===!1||e.options.draggable===!1&&i.type.indexOf("mouse")!==-1))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,e.options.verticalSwiping===!0&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(l.options.verticalSwiping===!0&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(l.options.rtl===!1?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),l.options.verticalSwiping===!0&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,l.options.infinite===!1&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),l.options.vertical===!1?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,l.options.verticalSwiping===!0&&(l.swipeLeft=e+o*s),l.options.fade!==!0&&l.options.touchMove!==!1&&(l.animating===!0?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;return t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow?(t.touchObject={},!1):(void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,void(t.dragging=!0))},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i,e=this;i=Math.floor(e.options.slidesToShow/2),e.options.arrows===!0&&e.slideCount>e.options.slidesToShow&&!e.options.infinite&&(e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===e.currentSlide?(e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):e.currentSlide>=e.slideCount-e.options.slidesToShow&&e.options.centerMode===!1?(e.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):e.currentSlide>=e.slideCount-1&&e.options.centerMode===!0&&(e.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||"undefined"==typeof s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),"undefined"!=typeof t)return t;return o}});;
/*! picturefill - v3.0.2 - 2016-02-12
 * https://scottjehl.github.io/picturefill/
 * Copyright (c) 2016 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */
!function(a){var b=navigator.userAgent;a.HTMLPictureElement&&/ecko/.test(b)&&b.match(/rv\:(\d+)/)&&RegExp.$1<45&&addEventListener("resize",function(){var b,c=document.createElement("source"),d=function(a){var b,d,e=a.parentNode;"PICTURE"===e.nodeName.toUpperCase()?(b=c.cloneNode(),e.insertBefore(b,e.firstElementChild),setTimeout(function(){e.removeChild(b)})):(!a._pfLastSize||a.offsetWidth>a._pfLastSize)&&(a._pfLastSize=a.offsetWidth,d=a.sizes,a.sizes+=",100vw",setTimeout(function(){a.sizes=d}))},e=function(){var a,b=document.querySelectorAll("picture > img, img[srcset][sizes]");for(a=0;a<b.length;a++)d(b[a])},f=function(){clearTimeout(b),b=setTimeout(e,99)},g=a.matchMedia&&matchMedia("(orientation: landscape)"),h=function(){f(),g&&g.addListener&&g.addListener(f)};return c.srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",/^[c|i]|d$/.test(document.readyState||"")?h():document.addEventListener("DOMContentLoaded",h),f}())}(window),function(a,b,c){"use strict";function d(a){return" "===a||"	"===a||"\n"===a||"\f"===a||"\r"===a}function e(b,c){var d=new a.Image;return d.onerror=function(){A[b]=!1,ba()},d.onload=function(){A[b]=1===d.width,ba()},d.src=c,"pending"}function f(){M=!1,P=a.devicePixelRatio,N={},O={},s.DPR=P||1,Q.width=Math.max(a.innerWidth||0,z.clientWidth),Q.height=Math.max(a.innerHeight||0,z.clientHeight),Q.vw=Q.width/100,Q.vh=Q.height/100,r=[Q.height,Q.width,P].join("-"),Q.em=s.getEmValue(),Q.rem=Q.em}function g(a,b,c,d){var e,f,g,h;return"saveData"===B.algorithm?a>2.7?h=c+1:(f=b-c,e=Math.pow(a-.6,1.5),g=f*e,d&&(g+=.1*e),h=a+g):h=c>1?Math.sqrt(a*b):a,h>c}function h(a){var b,c=s.getSet(a),d=!1;"pending"!==c&&(d=r,c&&(b=s.setRes(c),s.applySetCandidate(b,a))),a[s.ns].evaled=d}function i(a,b){return a.res-b.res}function j(a,b,c){var d;return!c&&b&&(c=a[s.ns].sets,c=c&&c[c.length-1]),d=k(b,c),d&&(b=s.makeUrl(b),a[s.ns].curSrc=b,a[s.ns].curCan=d,d.res||aa(d,d.set.sizes)),d}function k(a,b){var c,d,e;if(a&&b)for(e=s.parseSet(b),a=s.makeUrl(a),c=0;c<e.length;c++)if(a===s.makeUrl(e[c].url)){d=e[c];break}return d}function l(a,b){var c,d,e,f,g=a.getElementsByTagName("source");for(c=0,d=g.length;d>c;c++)e=g[c],e[s.ns]=!0,f=e.getAttribute("srcset"),f&&b.push({srcset:f,media:e.getAttribute("media"),type:e.getAttribute("type"),sizes:e.getAttribute("sizes")})}function m(a,b){function c(b){var c,d=b.exec(a.substring(m));return d?(c=d[0],m+=c.length,c):void 0}function e(){var a,c,d,e,f,i,j,k,l,m=!1,o={};for(e=0;e<h.length;e++)f=h[e],i=f[f.length-1],j=f.substring(0,f.length-1),k=parseInt(j,10),l=parseFloat(j),X.test(j)&&"w"===i?((a||c)&&(m=!0),0===k?m=!0:a=k):Y.test(j)&&"x"===i?((a||c||d)&&(m=!0),0>l?m=!0:c=l):X.test(j)&&"h"===i?((d||c)&&(m=!0),0===k?m=!0:d=k):m=!0;m||(o.url=g,a&&(o.w=a),c&&(o.d=c),d&&(o.h=d),d||c||a||(o.d=1),1===o.d&&(b.has1x=!0),o.set=b,n.push(o))}function f(){for(c(T),i="",j="in descriptor";;){if(k=a.charAt(m),"in descriptor"===j)if(d(k))i&&(h.push(i),i="",j="after descriptor");else{if(","===k)return m+=1,i&&h.push(i),void e();if("("===k)i+=k,j="in parens";else{if(""===k)return i&&h.push(i),void e();i+=k}}else if("in parens"===j)if(")"===k)i+=k,j="in descriptor";else{if(""===k)return h.push(i),void e();i+=k}else if("after descriptor"===j)if(d(k));else{if(""===k)return void e();j="in descriptor",m-=1}m+=1}}for(var g,h,i,j,k,l=a.length,m=0,n=[];;){if(c(U),m>=l)return n;g=c(V),h=[],","===g.slice(-1)?(g=g.replace(W,""),e()):f()}}function n(a){function b(a){function b(){f&&(g.push(f),f="")}function c(){g[0]&&(h.push(g),g=[])}for(var e,f="",g=[],h=[],i=0,j=0,k=!1;;){if(e=a.charAt(j),""===e)return b(),c(),h;if(k){if("*"===e&&"/"===a[j+1]){k=!1,j+=2,b();continue}j+=1}else{if(d(e)){if(a.charAt(j-1)&&d(a.charAt(j-1))||!f){j+=1;continue}if(0===i){b(),j+=1;continue}e=" "}else if("("===e)i+=1;else if(")"===e)i-=1;else{if(","===e){b(),c(),j+=1;continue}if("/"===e&&"*"===a.charAt(j+1)){k=!0,j+=2;continue}}f+=e,j+=1}}}function c(a){return k.test(a)&&parseFloat(a)>=0?!0:l.test(a)?!0:"0"===a||"-0"===a||"+0"===a?!0:!1}var e,f,g,h,i,j,k=/^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,l=/^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;for(f=b(a),g=f.length,e=0;g>e;e++)if(h=f[e],i=h[h.length-1],c(i)){if(j=i,h.pop(),0===h.length)return j;if(h=h.join(" "),s.matchesMedia(h))return j}return"100vw"}b.createElement("picture");var o,p,q,r,s={},t=!1,u=function(){},v=b.createElement("img"),w=v.getAttribute,x=v.setAttribute,y=v.removeAttribute,z=b.documentElement,A={},B={algorithm:""},C="data-pfsrc",D=C+"set",E=navigator.userAgent,F=/rident/.test(E)||/ecko/.test(E)&&E.match(/rv\:(\d+)/)&&RegExp.$1>35,G="currentSrc",H=/\s+\+?\d+(e\d+)?w/,I=/(\([^)]+\))?\s*(.+)/,J=a.picturefillCFG,K="position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",L="font-size:100%!important;",M=!0,N={},O={},P=a.devicePixelRatio,Q={px:1,"in":96},R=b.createElement("a"),S=!1,T=/^[ \t\n\r\u000c]+/,U=/^[, \t\n\r\u000c]+/,V=/^[^ \t\n\r\u000c]+/,W=/[,]+$/,X=/^\d+$/,Y=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,Z=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d||!1):a.attachEvent&&a.attachEvent("on"+b,c)},$=function(a){var b={};return function(c){return c in b||(b[c]=a(c)),b[c]}},_=function(){var a=/^([\d\.]+)(em|vw|px)$/,b=function(){for(var a=arguments,b=0,c=a[0];++b in a;)c=c.replace(a[b],a[++b]);return c},c=$(function(a){return"return "+b((a||"").toLowerCase(),/\band\b/g,"&&",/,/g,"||",/min-([a-z-\s]+):/g,"e.$1>=",/max-([a-z-\s]+):/g,"e.$1<=",/calc([^)]+)/g,"($1)",/(\d+[\.]*[\d]*)([a-z]+)/g,"($1 * e.$2)",/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,"")+";"});return function(b,d){var e;if(!(b in N))if(N[b]=!1,d&&(e=b.match(a)))N[b]=e[1]*Q[e[2]];else try{N[b]=new Function("e",c(b))(Q)}catch(f){}return N[b]}}(),aa=function(a,b){return a.w?(a.cWidth=s.calcListLength(b||"100vw"),a.res=a.w/a.cWidth):a.res=a.d,a},ba=function(a){if(t){var c,d,e,f=a||{};if(f.elements&&1===f.elements.nodeType&&("IMG"===f.elements.nodeName.toUpperCase()?f.elements=[f.elements]:(f.context=f.elements,f.elements=null)),c=f.elements||s.qsa(f.context||b,f.reevaluate||f.reselect?s.sel:s.selShort),e=c.length){for(s.setupRun(f),S=!0,d=0;e>d;d++)s.fillImg(c[d],f);s.teardownRun(f)}}};o=a.console&&console.warn?function(a){console.warn(a)}:u,G in v||(G="src"),A["image/jpeg"]=!0,A["image/gif"]=!0,A["image/png"]=!0,A["image/svg+xml"]=b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),s.ns=("pf"+(new Date).getTime()).substr(0,9),s.supSrcset="srcset"in v,s.supSizes="sizes"in v,s.supPicture=!!a.HTMLPictureElement,s.supSrcset&&s.supPicture&&!s.supSizes&&!function(a){v.srcset="data:,a",a.src="data:,a",s.supSrcset=v.complete===a.complete,s.supPicture=s.supSrcset&&s.supPicture}(b.createElement("img")),s.supSrcset&&!s.supSizes?!function(){var a="data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==",c="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",d=b.createElement("img"),e=function(){var a=d.width;2===a&&(s.supSizes=!0),q=s.supSrcset&&!s.supSizes,t=!0,setTimeout(ba)};d.onload=e,d.onerror=e,d.setAttribute("sizes","9px"),d.srcset=c+" 1w,"+a+" 9w",d.src=c}():t=!0,s.selShort="picture>img,img[srcset]",s.sel=s.selShort,s.cfg=B,s.DPR=P||1,s.u=Q,s.types=A,s.setSize=u,s.makeUrl=$(function(a){return R.href=a,R.href}),s.qsa=function(a,b){return"querySelector"in a?a.querySelectorAll(b):[]},s.matchesMedia=function(){return a.matchMedia&&(matchMedia("(min-width: 0.1em)")||{}).matches?s.matchesMedia=function(a){return!a||matchMedia(a).matches}:s.matchesMedia=s.mMQ,s.matchesMedia.apply(this,arguments)},s.mMQ=function(a){return a?_(a):!0},s.calcLength=function(a){var b=_(a,!0)||!1;return 0>b&&(b=!1),b},s.supportsType=function(a){return a?A[a]:!0},s.parseSize=$(function(a){var b=(a||"").match(I);return{media:b&&b[1],length:b&&b[2]}}),s.parseSet=function(a){return a.cands||(a.cands=m(a.srcset,a)),a.cands},s.getEmValue=function(){var a;if(!p&&(a=b.body)){var c=b.createElement("div"),d=z.style.cssText,e=a.style.cssText;c.style.cssText=K,z.style.cssText=L,a.style.cssText=L,a.appendChild(c),p=c.offsetWidth,a.removeChild(c),p=parseFloat(p,10),z.style.cssText=d,a.style.cssText=e}return p||16},s.calcListLength=function(a){if(!(a in O)||B.uT){var b=s.calcLength(n(a));O[a]=b?b:Q.width}return O[a]},s.setRes=function(a){var b;if(a){b=s.parseSet(a);for(var c=0,d=b.length;d>c;c++)aa(b[c],a.sizes)}return b},s.setRes.res=aa,s.applySetCandidate=function(a,b){if(a.length){var c,d,e,f,h,k,l,m,n,o=b[s.ns],p=s.DPR;if(k=o.curSrc||b[G],l=o.curCan||j(b,k,a[0].set),l&&l.set===a[0].set&&(n=F&&!b.complete&&l.res-.1>p,n||(l.cached=!0,l.res>=p&&(h=l))),!h)for(a.sort(i),f=a.length,h=a[f-1],d=0;f>d;d++)if(c=a[d],c.res>=p){e=d-1,h=a[e]&&(n||k!==s.makeUrl(c.url))&&g(a[e].res,c.res,p,a[e].cached)?a[e]:c;break}h&&(m=s.makeUrl(h.url),o.curSrc=m,o.curCan=h,m!==k&&s.setSrc(b,h),s.setSize(b))}},s.setSrc=function(a,b){var c;a.src=b.url,"image/svg+xml"===b.set.type&&(c=a.style.width,a.style.width=a.offsetWidth+1+"px",a.offsetWidth+1&&(a.style.width=c))},s.getSet=function(a){var b,c,d,e=!1,f=a[s.ns].sets;for(b=0;b<f.length&&!e;b++)if(c=f[b],c.srcset&&s.matchesMedia(c.media)&&(d=s.supportsType(c.type))){"pending"===d&&(c=d),e=c;break}return e},s.parseSets=function(a,b,d){var e,f,g,h,i=b&&"PICTURE"===b.nodeName.toUpperCase(),j=a[s.ns];(j.src===c||d.src)&&(j.src=w.call(a,"src"),j.src?x.call(a,C,j.src):y.call(a,C)),(j.srcset===c||d.srcset||!s.supSrcset||a.srcset)&&(e=w.call(a,"srcset"),j.srcset=e,h=!0),j.sets=[],i&&(j.pic=!0,l(b,j.sets)),j.srcset?(f={srcset:j.srcset,sizes:w.call(a,"sizes")},j.sets.push(f),g=(q||j.src)&&H.test(j.srcset||""),g||!j.src||k(j.src,f)||f.has1x||(f.srcset+=", "+j.src,f.cands.push({url:j.src,d:1,set:f}))):j.src&&j.sets.push({srcset:j.src,sizes:null}),j.curCan=null,j.curSrc=c,j.supported=!(i||f&&!s.supSrcset||g&&!s.supSizes),h&&s.supSrcset&&!j.supported&&(e?(x.call(a,D,e),a.srcset=""):y.call(a,D)),j.supported&&!j.srcset&&(!j.src&&a.src||a.src!==s.makeUrl(j.src))&&(null===j.src?a.removeAttribute("src"):a.src=j.src),j.parsed=!0},s.fillImg=function(a,b){var c,d=b.reselect||b.reevaluate;a[s.ns]||(a[s.ns]={}),c=a[s.ns],(d||c.evaled!==r)&&((!c.parsed||b.reevaluate)&&s.parseSets(a,a.parentNode,b),c.supported?c.evaled=r:h(a))},s.setupRun=function(){(!S||M||P!==a.devicePixelRatio)&&f()},s.supPicture?(ba=u,s.fillImg=u):!function(){var c,d=a.attachEvent?/d$|^c/:/d$|^c|^i/,e=function(){var a=b.readyState||"";f=setTimeout(e,"loading"===a?200:999),b.body&&(s.fillImgs(),c=c||d.test(a),c&&clearTimeout(f))},f=setTimeout(e,b.body?9:99),g=function(a,b){var c,d,e=function(){var f=new Date-d;b>f?c=setTimeout(e,b-f):(c=null,a())};return function(){d=new Date,c||(c=setTimeout(e,b))}},h=z.clientHeight,i=function(){M=Math.max(a.innerWidth||0,z.clientWidth)!==Q.width||z.clientHeight!==h,h=z.clientHeight,M&&s.fillImgs()};Z(a,"resize",g(i,99)),Z(b,"readystatechange",e)}(),s.picturefill=ba,s.fillImgs=ba,s.teardownRun=u,ba._=s,a.picturefillCFG={pf:s,push:function(a){var b=a.shift();"function"==typeof s[b]?s[b].apply(s,a):(B[b]=a[0],S&&s.fillImgs({reselect:!0}))}};for(;J&&J.length;)a.picturefillCFG.push(J.shift());a.picturefill=ba,"object"==typeof module&&"object"==typeof module.exports?module.exports=ba:"function"==typeof define&&define.amd&&define("picturefill",function(){return ba}),s.supPicture||(A["image/webp"]=e("image/webp","data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))}(window,document);
;
/*!
 * jQuery Form Plugin
 * version: 4.2.2
 * Requires jQuery v1.7.2 or later
 * Project repository: https://github.com/jquery-form/form

 * Copyright 2017 Kevin Morris
 * Copyright 2006 M. Alsup

 * Dual licensed under the LGPL-2.1+ or MIT licenses
 * https://github.com/jquery-form/form#license

 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=function(t,r){return void 0===r&&(r="undefined"!=typeof window?require("jquery"):require("jquery")(t)),e(r),r}:e(jQuery)}(function(e){"use strict";function t(t){var r=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).closest("form").ajaxSubmit(r))}function r(t){var r=t.target,a=e(r);if(!a.is("[type=submit],[type=image]")){var n=a.closest("[type=submit]");if(0===n.length)return;r=n[0]}var i=r.form;if(i.clk=r,"image"===r.type)if(void 0!==t.offsetX)i.clk_x=t.offsetX,i.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var o=a.offset();i.clk_x=t.pageX-o.left,i.clk_y=t.pageY-o.top}else i.clk_x=t.pageX-r.offsetLeft,i.clk_y=t.pageY-r.offsetTop;setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}function a(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var n=/\r?\n/g,i={};i.fileapi=void 0!==e('<input type="file">').get(0).files,i.formdata=void 0!==window.FormData;var o=!!e.fn.prop;e.fn.attr2=function(){if(!o)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t,r,n,s){function u(r){var a,n,i=e.param(r,t.traditional).split("&"),o=i.length,s=[];for(a=0;a<o;a++)i[a]=i[a].replace(/\+/g," "),n=i[a].split("="),s.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return s}function c(r){function n(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(e){a("cannot get iframe.contentWindow document: "+e)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(r){a("cannot get iframe.contentDocument: "+r),t=e.document}return t}function i(){function t(){try{var e=n(v).readyState;a("state = "+e),e&&"uninitialized"===e.toLowerCase()&&setTimeout(t,50)}catch(e){a("Server abort: ",e," (",e.name,")"),s(L),j&&clearTimeout(j),j=void 0}}var r=p.attr2("target"),i=p.attr2("action"),o=p.attr("enctype")||p.attr("encoding")||"multipart/form-data";w.setAttribute("target",m),l&&!/post/i.test(l)||w.setAttribute("method","POST"),i!==f.url&&w.setAttribute("action",f.url),f.skipEncodingOverride||l&&!/post/i.test(l)||p.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),f.timeout&&(j=setTimeout(function(){T=!0,s(A)},f.timeout));var u=[];try{if(f.extraData)for(var c in f.extraData)f.extraData.hasOwnProperty(c)&&(e.isPlainObject(f.extraData[c])&&f.extraData[c].hasOwnProperty("name")&&f.extraData[c].hasOwnProperty("value")?u.push(e('<input type="hidden" name="'+f.extraData[c].name+'">',k).val(f.extraData[c].value).appendTo(w)[0]):u.push(e('<input type="hidden" name="'+c+'">',k).val(f.extraData[c]).appendTo(w)[0]));f.iframeTarget||h.appendTo(D),v.attachEvent?v.attachEvent("onload",s):v.addEventListener("load",s,!1),setTimeout(t,15);try{w.submit()}catch(e){document.createElement("form").submit.apply(w)}}finally{w.setAttribute("action",i),w.setAttribute("enctype",o),r?w.setAttribute("target",r):p.removeAttr("target"),e(u).remove()}}function s(t){if(!x.aborted&&!X){if((O=n(v))||(a("cannot access response document"),t=L),t===A&&x)return x.abort("timeout"),void S.reject(x,"timeout");if(t===L&&x)return x.abort("server abort"),void S.reject(x,"error","server abort");if(O&&O.location.href!==f.iframeSrc||T){v.detachEvent?v.detachEvent("onload",s):v.removeEventListener("load",s,!1);var r,i="success";try{if(T)throw"timeout";var o="xml"===f.dataType||O.XMLDocument||e.isXMLDoc(O);if(a("isXml="+o),!o&&window.opera&&(null===O.body||!O.body.innerHTML)&&--C)return a("requeing onLoad callback, DOM not available"),void setTimeout(s,250);var u=O.body?O.body:O.documentElement;x.responseText=u?u.innerHTML:null,x.responseXML=O.XMLDocument?O.XMLDocument:O,o&&(f.dataType="xml"),x.getResponseHeader=function(e){return{"content-type":f.dataType}[e.toLowerCase()]},u&&(x.status=Number(u.getAttribute("status"))||x.status,x.statusText=u.getAttribute("statusText")||x.statusText);var c=(f.dataType||"").toLowerCase(),l=/(json|script|text)/.test(c);if(l||f.textarea){var p=O.getElementsByTagName("textarea")[0];if(p)x.responseText=p.value,x.status=Number(p.getAttribute("status"))||x.status,x.statusText=p.getAttribute("statusText")||x.statusText;else if(l){var m=O.getElementsByTagName("pre")[0],g=O.getElementsByTagName("body")[0];m?x.responseText=m.textContent?m.textContent:m.innerText:g&&(x.responseText=g.textContent?g.textContent:g.innerText)}}else"xml"===c&&!x.responseXML&&x.responseText&&(x.responseXML=q(x.responseText));try{M=N(x,c,f)}catch(e){i="parsererror",x.error=r=e||i}}catch(e){a("error caught: ",e),i="error",x.error=r=e||i}x.aborted&&(a("upload aborted"),i=null),x.status&&(i=x.status>=200&&x.status<300||304===x.status?"success":"error"),"success"===i?(f.success&&f.success.call(f.context,M,"success",x),S.resolve(x.responseText,"success",x),d&&e.event.trigger("ajaxSuccess",[x,f])):i&&(void 0===r&&(r=x.statusText),f.error&&f.error.call(f.context,x,i,r),S.reject(x,"error",r),d&&e.event.trigger("ajaxError",[x,f,r])),d&&e.event.trigger("ajaxComplete",[x,f]),d&&!--e.active&&e.event.trigger("ajaxStop"),f.complete&&f.complete.call(f.context,x,i),X=!0,f.timeout&&clearTimeout(j),setTimeout(function(){f.iframeTarget?h.attr("src",f.iframeSrc):h.remove(),x.responseXML=null},100)}}}var u,c,f,d,m,h,v,x,y,b,T,j,w=p[0],S=e.Deferred();if(S.abort=function(e){x.abort(e)},r)for(c=0;c<g.length;c++)u=e(g[c]),o?u.prop("disabled",!1):u.removeAttr("disabled");(f=e.extend(!0,{},e.ajaxSettings,t)).context=f.context||f,m="jqFormIO"+(new Date).getTime();var k=w.ownerDocument,D=p.closest("body");if(f.iframeTarget?(b=(h=e(f.iframeTarget,k)).attr2("name"))?m=b:h.attr2("name",m):(h=e('<iframe name="'+m+'" src="'+f.iframeSrc+'" />',k)).css({position:"absolute",top:"-1000px",left:"-1000px"}),v=h[0],x={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var r="timeout"===t?"timeout":"aborted";a("aborting upload... "+r),this.aborted=1;try{v.contentWindow.document.execCommand&&v.contentWindow.document.execCommand("Stop")}catch(e){}h.attr("src",f.iframeSrc),x.error=r,f.error&&f.error.call(f.context,x,r,t),d&&e.event.trigger("ajaxError",[x,f,r]),f.complete&&f.complete.call(f.context,x,r)}},(d=f.global)&&0==e.active++&&e.event.trigger("ajaxStart"),d&&e.event.trigger("ajaxSend",[x,f]),f.beforeSend&&!1===f.beforeSend.call(f.context,x,f))return f.global&&e.active--,S.reject(),S;if(x.aborted)return S.reject(),S;(y=w.clk)&&(b=y.name)&&!y.disabled&&(f.extraData=f.extraData||{},f.extraData[b]=y.value,"image"===y.type&&(f.extraData[b+".x"]=w.clk_x,f.extraData[b+".y"]=w.clk_y));var A=1,L=2,F=e("meta[name=csrf-token]").attr("content"),E=e("meta[name=csrf-param]").attr("content");E&&F&&(f.extraData=f.extraData||{},f.extraData[E]=F),f.forceSync?i():setTimeout(i,10);var M,O,X,C=50,q=e.parseXML||function(e,t){return window.ActiveXObject?((t=new ActiveXObject("Microsoft.XMLDOM")).async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!==t.documentElement.nodeName?t:null},_=e.parseJSON||function(e){return window.eval("("+e+")")},N=function(t,r,a){var n=t.getResponseHeader("content-type")||"",i=("xml"===r||!r)&&n.indexOf("xml")>=0,o=i?t.responseXML:t.responseText;return i&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),a&&a.dataFilter&&(o=a.dataFilter(o,r)),"string"==typeof o&&(("json"===r||!r)&&n.indexOf("json")>=0?o=_(o):("script"===r||!r)&&n.indexOf("javascript")>=0&&e.globalEval(o)),o};return S}if(!this.length)return a("ajaxSubmit: skipping submit process - no element selected"),this;var l,f,d,p=this;"function"==typeof t?t={success:t}:"string"==typeof t||!1===t&&arguments.length>0?(t={url:t,data:r,dataType:n},"function"==typeof s&&(t.success=s)):void 0===t&&(t={}),l=t.method||t.type||this.attr2("method"),(d=(d="string"==typeof(f=t.url||this.attr2("action"))?e.trim(f):"")||window.location.href||"")&&(d=(d.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:d,success:e.ajaxSettings.success,type:l||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var m={};if(this.trigger("form-pre-serialize",[this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&!1===t.beforeSerialize(this,t))return a("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var h=t.traditional;void 0===h&&(h=e.ajaxSettings.traditional);var v,g=[],x=this.formToArray(t.semantic,g,t.filtering);if(t.data){var y=e.isFunction(t.data)?t.data(x):t.data;t.extraData=y,v=e.param(y,h)}if(t.beforeSubmit&&!1===t.beforeSubmit(x,this,t))return a("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[x,this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var b=e.param(x,h);v&&(b=b?b+"&"+v:v),"GET"===t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+b,t.data=null):t.data=b;var T=[];if(t.resetForm&&T.push(function(){p.resetForm()}),t.clearForm&&T.push(function(){p.clearForm(t.includeHidden)}),!t.dataType&&t.target){var j=t.success||function(){};T.push(function(r,a,n){var i=arguments,o=t.replaceTarget?"replaceWith":"html";e(t.target)[o](r).each(function(){j.apply(this,i)})})}else t.success&&(e.isArray(t.success)?e.merge(T,t.success):T.push(t.success));if(t.success=function(e,r,a){for(var n=t.context||this,i=0,o=T.length;i<o;i++)T[i].apply(n,[e,r,a||p,p])},t.error){var w=t.error;t.error=function(e,r,a){var n=t.context||this;w.apply(n,[e,r,a,p])}}if(t.complete){var S=t.complete;t.complete=function(e,r){var a=t.context||this;S.apply(a,[e,r,p])}}var k=e("input[type=file]:enabled",this).filter(function(){return""!==e(this).val()}).length>0,D="multipart/form-data",A=p.attr("enctype")===D||p.attr("encoding")===D,L=i.fileapi&&i.formdata;a("fileAPI :"+L);var F,E=(k||A)&&!L;!1!==t.iframe&&(t.iframe||E)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){F=c(x)}):F=c(x):F=(k||A)&&L?function(r){for(var a=new FormData,n=0;n<r.length;n++)a.append(r[n].name,r[n].value);if(t.extraData){var i=u(t.extraData);for(n=0;n<i.length;n++)i[n]&&a.append(i[n][0],i[n][1])}t.data=null;var o=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:l||"POST"});t.uploadProgress&&(o.xhr=function(){var r=e.ajaxSettings.xhr();return r.upload&&r.upload.addEventListener("progress",function(e){var r=0,a=e.loaded||e.position,n=e.total;e.lengthComputable&&(r=Math.ceil(a/n*100)),t.uploadProgress(e,a,n,r)},!1),r}),o.data=null;var s=o.beforeSend;return o.beforeSend=function(e,r){t.formData?r.data=t.formData:r.data=a,s&&s.call(this,e,r)},e.ajax(o)}(x):e.ajax(t),p.removeData("jqxhr").data("jqxhr",F);for(var M=0;M<g.length;M++)g[M]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(n,i,o,s){if(("string"==typeof n||!1===n&&arguments.length>0)&&(n={url:n,data:i,dataType:o},"function"==typeof s&&(n.success=s)),n=n||{},n.delegation=n.delegation&&e.isFunction(e.fn.on),!n.delegation&&0===this.length){var u={s:this.selector,c:this.context};return!e.isReady&&u.s?(a("DOM not ready, queuing ajaxForm"),e(function(){e(u.s,u.c).ajaxForm(n)}),this):(a("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return n.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,r).on("submit.form-plugin",this.selector,n,t).on("click.form-plugin",this.selector,n,r),this):this.ajaxFormUnbind().on("submit.form-plugin",n,t).on("click.form-plugin",n,r)},e.fn.ajaxFormUnbind=function(){return this.off("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,r,a){var n=[];if(0===this.length)return n;var o,s=this[0],u=this.attr("id"),c=t||void 0===s.elements?s.getElementsByTagName("*"):s.elements;if(c&&(c=e.makeArray(c)),u&&(t||/(Edge|Trident)\//.test(navigator.userAgent))&&(o=e(':input[form="'+u+'"]').get()).length&&(c=(c||[]).concat(o)),!c||!c.length)return n;e.isFunction(a)&&(c=e.map(c,a));var l,f,d,p,m,h,v;for(l=0,h=c.length;l<h;l++)if(m=c[l],(d=m.name)&&!m.disabled)if(t&&s.clk&&"image"===m.type)s.clk===m&&(n.push({name:d,value:e(m).val(),type:m.type}),n.push({name:d+".x",value:s.clk_x},{name:d+".y",value:s.clk_y}));else if((p=e.fieldValue(m,!0))&&p.constructor===Array)for(r&&r.push(m),f=0,v=p.length;f<v;f++)n.push({name:d,value:p[f]});else if(i.fileapi&&"file"===m.type){r&&r.push(m);var g=m.files;if(g.length)for(f=0;f<g.length;f++)n.push({name:d,value:g[f],type:m.type});else n.push({name:d,value:"",type:m.type})}else null!==p&&void 0!==p&&(r&&r.push(m),n.push({name:d,value:p,type:m.type,required:m.required}));if(!t&&s.clk){var x=e(s.clk),y=x[0];(d=y.name)&&!y.disabled&&"image"===y.type&&(n.push({name:d,value:x.val()}),n.push({name:d+".x",value:s.clk_x},{name:d+".y",value:s.clk_y}))}return n},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var r=[];return this.each(function(){var a=this.name;if(a){var n=e.fieldValue(this,t);if(n&&n.constructor===Array)for(var i=0,o=n.length;i<o;i++)r.push({name:a,value:n[i]});else null!==n&&void 0!==n&&r.push({name:this.name,value:n})}}),e.param(r)},e.fn.fieldValue=function(t){for(var r=[],a=0,n=this.length;a<n;a++){var i=this[a],o=e.fieldValue(i,t);null===o||void 0===o||o.constructor===Array&&!o.length||(o.constructor===Array?e.merge(r,o):r.push(o))}return r},e.fieldValue=function(t,r){var a=t.name,i=t.type,o=t.tagName.toLowerCase();if(void 0===r&&(r=!0),r&&(!a||t.disabled||"reset"===i||"button"===i||("checkbox"===i||"radio"===i)&&!t.checked||("submit"===i||"image"===i)&&t.form&&t.form.clk!==t||"select"===o&&-1===t.selectedIndex))return null;if("select"===o){var s=t.selectedIndex;if(s<0)return null;for(var u=[],c=t.options,l="select-one"===i,f=l?s+1:c.length,d=l?s:0;d<f;d++){var p=c[d];if(p.selected&&!p.disabled){var m=p.value;if(m||(m=p.attributes&&p.attributes.value&&!p.attributes.value.specified?p.text:p.value),l)return m;u.push(m)}}return u}return e(t).val().replace(n,"\r\n")},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var a=this.type,n=this.tagName.toLowerCase();r.test(a)||"textarea"===n?this.value="":"checkbox"===a||"radio"===a?this.checked=!1:"select"===n?this.selectedIndex=-1:"file"===a?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(!0===t&&/hidden/.test(a)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){var t=e(this),r=this.tagName.toLowerCase();switch(r){case"input":this.checked=this.defaultChecked;case"textarea":return this.value=this.defaultValue,!0;case"option":case"optgroup":var a=t.parents("select");return a.length&&a[0].multiple?"option"===r?this.selected=this.defaultSelected:t.find("option").resetForm():a.resetForm(),!0;case"select":return t.find("option").each(function(e){if(this.selected=this.defaultSelected,this.defaultSelected&&!t[0].multiple)return t[0].selectedIndex=e,!1}),!0;case"label":var n=e(t.attr("for")),i=t.find("input,select,textarea");return n[0]&&i.unshift(n[0]),i.resetForm(),!0;case"form":return("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset(),!0;default:return t.find("form,input,label,select,textarea").resetForm(),!0}})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var r=this.type;if("checkbox"===r||"radio"===r)this.checked=t;else if("option"===this.tagName.toLowerCase()){var a=e(this).parent("select");t&&a[0]&&"select-one"===a[0].type&&a.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1});

;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal) {
  Drupal.theme.progressBar = function (id) {
    return '<div id="' + id + '" class="progress" aria-live="polite">' + '<div class="progress__label">&nbsp;</div>' + '<div class="progress__track"><div class="progress__bar"></div></div>' + '<div class="progress__percentage"></div>' + '<div class="progress__description">&nbsp;</div>' + '</div>';
  };

  Drupal.ProgressBar = function (id, updateCallback, method, errorCallback) {
    this.id = id;
    this.method = method || 'GET';
    this.updateCallback = updateCallback;
    this.errorCallback = errorCallback;

    this.element = $(Drupal.theme('progressBar', id));
  };

  $.extend(Drupal.ProgressBar.prototype, {
    setProgress: function setProgress(percentage, message, label) {
      if (percentage >= 0 && percentage <= 100) {
        $(this.element).find('div.progress__bar').css('width', percentage + '%');
        $(this.element).find('div.progress__percentage').html(percentage + '%');
      }
      $('div.progress__description', this.element).html(message);
      $('div.progress__label', this.element).html(label);
      if (this.updateCallback) {
        this.updateCallback(percentage, message, this);
      }
    },
    startMonitoring: function startMonitoring(uri, delay) {
      this.delay = delay;
      this.uri = uri;
      this.sendPing();
    },
    stopMonitoring: function stopMonitoring() {
      clearTimeout(this.timer);

      this.uri = null;
    },
    sendPing: function sendPing() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (this.uri) {
        var pb = this;

        var uri = this.uri;
        if (uri.indexOf('?') === -1) {
          uri += '?';
        } else {
          uri += '&';
        }
        uri += '_format=json';
        $.ajax({
          type: this.method,
          url: uri,
          data: '',
          dataType: 'json',
          success: function success(progress) {
            if (progress.status === 0) {
              pb.displayError(progress.data);
              return;
            }

            pb.setProgress(progress.percentage, progress.message, progress.label);

            pb.timer = setTimeout(function () {
              pb.sendPing();
            }, pb.delay);
          },
          error: function error(xmlhttp) {
            var e = new Drupal.AjaxError(xmlhttp, pb.uri);
            pb.displayError('<pre>' + e.message + '</pre>');
          }
        });
      }
    },
    displayError: function displayError(string) {
      var error = $('<div class="messages messages--error"></div>').html(string);
      $(this.element).before(error).hide();

      if (this.errorCallback) {
        this.errorCallback(this);
      }
    }
  });
})(jQuery, Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function ($, window, Drupal, drupalSettings) {
  Drupal.behaviors.AJAX = {
    attach: function attach(context, settings) {
      function loadAjaxBehavior(base) {
        var elementSettings = settings.ajax[base];
        if (typeof elementSettings.selector === 'undefined') {
          elementSettings.selector = '#' + base;
        }
        $(elementSettings.selector).once('drupal-ajax').each(function () {
          elementSettings.element = this;
          elementSettings.base = base;
          Drupal.ajax(elementSettings);
        });
      }

      Object.keys(settings.ajax || {}).forEach(function (base) {
        return loadAjaxBehavior(base);
      });

      Drupal.ajax.bindAjaxLinks(document.body);

      $('.use-ajax-submit').once('ajax').each(function () {
        var elementSettings = {};

        elementSettings.url = $(this.form).attr('action');

        elementSettings.setClick = true;

        elementSettings.event = 'click';

        elementSettings.progress = { type: 'throbber' };
        elementSettings.base = $(this).attr('id');
        elementSettings.element = this;

        Drupal.ajax(elementSettings);
      });
    },
    detach: function detach(context, settings, trigger) {
      if (trigger === 'unload') {
        Drupal.ajax.expired().forEach(function (instance) {
          Drupal.ajax.instances[instance.instanceIndex] = null;
        });
      }
    }
  };

  Drupal.AjaxError = function (xmlhttp, uri, customMessage) {
    var statusCode = void 0;
    var statusText = void 0;
    var responseText = void 0;
    if (xmlhttp.status) {
      statusCode = '\n' + Drupal.t('An AJAX HTTP error occurred.') + '\n' + Drupal.t('HTTP Result Code: !status', { '!status': xmlhttp.status });
    } else {
      statusCode = '\n' + Drupal.t('An AJAX HTTP request terminated abnormally.');
    }
    statusCode += '\n' + Drupal.t('Debugging information follows.');
    var pathText = '\n' + Drupal.t('Path: !uri', { '!uri': uri });
    statusText = '';

    try {
      statusText = '\n' + Drupal.t('StatusText: !statusText', {
        '!statusText': $.trim(xmlhttp.statusText)
      });
    } catch (e) {}

    responseText = '';

    try {
      responseText = '\n' + Drupal.t('ResponseText: !responseText', {
        '!responseText': $.trim(xmlhttp.responseText)
      });
    } catch (e) {}

    responseText = responseText.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi, '');
    responseText = responseText.replace(/[\n]+\s+/g, '\n');

    var readyStateText = xmlhttp.status === 0 ? '\n' + Drupal.t('ReadyState: !readyState', {
      '!readyState': xmlhttp.readyState
    }) : '';

    customMessage = customMessage ? '\n' + Drupal.t('CustomMessage: !customMessage', {
      '!customMessage': customMessage
    }) : '';

    this.message = statusCode + pathText + statusText + customMessage + responseText + readyStateText;

    this.name = 'AjaxError';
  };

  Drupal.AjaxError.prototype = new Error();
  Drupal.AjaxError.prototype.constructor = Drupal.AjaxError;

  Drupal.ajax = function (settings) {
    if (arguments.length !== 1) {
      throw new Error('Drupal.ajax() function must be called with one configuration object only');
    }

    var base = settings.base || false;
    var element = settings.element || false;
    delete settings.base;
    delete settings.element;

    if (!settings.progress && !element) {
      settings.progress = false;
    }

    var ajax = new Drupal.Ajax(base, element, settings);
    ajax.instanceIndex = Drupal.ajax.instances.length;
    Drupal.ajax.instances.push(ajax);

    return ajax;
  };

  Drupal.ajax.instances = [];

  Drupal.ajax.expired = function () {
    return Drupal.ajax.instances.filter(function (instance) {
      return instance && instance.element !== false && !document.body.contains(instance.element);
    });
  };

  Drupal.ajax.bindAjaxLinks = function (element) {
    $(element).find('.use-ajax').once('ajax').each(function (i, ajaxLink) {
      var $linkElement = $(ajaxLink);

      var elementSettings = {
        progress: { type: 'throbber' },
        dialogType: $linkElement.data('dialog-type'),
        dialog: $linkElement.data('dialog-options'),
        dialogRenderer: $linkElement.data('dialog-renderer'),
        base: $linkElement.attr('id'),
        element: ajaxLink
      };
      var href = $linkElement.attr('href');

      if (href) {
        elementSettings.url = href;
        elementSettings.event = 'click';
      }
      Drupal.ajax(elementSettings);
    });
  };

  Drupal.Ajax = function (base, element, elementSettings) {
    var defaults = {
      event: element ? 'mousedown' : null,
      keypress: true,
      selector: base ? '#' + base : null,
      effect: 'none',
      speed: 'none',
      method: 'replaceWith',
      progress: {
        type: 'throbber',
        message: Drupal.t('Please wait...')
      },
      submit: {
        js: true
      }
    };

    $.extend(this, defaults, elementSettings);

    this.commands = new Drupal.AjaxCommands();

    this.instanceIndex = false;

    if (this.wrapper) {
      this.wrapper = '#' + this.wrapper;
    }

    this.element = element;

    this.element_settings = elementSettings;

    this.elementSettings = elementSettings;

    if (this.element && this.element.form) {
      this.$form = $(this.element.form);
    }

    if (!this.url) {
      var $element = $(this.element);
      if ($element.is('a')) {
        this.url = $element.attr('href');
      } else if (this.element && element.form) {
        this.url = this.$form.attr('action');
      }
    }

    var originalUrl = this.url;

    this.url = this.url.replace(/\/nojs(\/|$|\?|#)/, '/ajax$1');

    if (drupalSettings.ajaxTrustedUrl[originalUrl]) {
      drupalSettings.ajaxTrustedUrl[this.url] = true;
    }

    var ajax = this;

    ajax.options = {
      url: ajax.url,
      data: ajax.submit,
      beforeSerialize: function beforeSerialize(elementSettings, options) {
        return ajax.beforeSerialize(elementSettings, options);
      },
      beforeSubmit: function beforeSubmit(formValues, elementSettings, options) {
        ajax.ajaxing = true;
        return ajax.beforeSubmit(formValues, elementSettings, options);
      },
      beforeSend: function beforeSend(xmlhttprequest, options) {
        ajax.ajaxing = true;
        return ajax.beforeSend(xmlhttprequest, options);
      },
      success: function success(response, status, xmlhttprequest) {
        if (typeof response === 'string') {
          response = $.parseJSON(response);
        }

        if (response !== null && !drupalSettings.ajaxTrustedUrl[ajax.url]) {
          if (xmlhttprequest.getResponseHeader('X-Drupal-Ajax-Token') !== '1') {
            var customMessage = Drupal.t('The response failed verification so will not be processed.');
            return ajax.error(xmlhttprequest, ajax.url, customMessage);
          }
        }

        return ajax.success(response, status);
      },
      complete: function complete(xmlhttprequest, status) {
        ajax.ajaxing = false;
        if (status === 'error' || status === 'parsererror') {
          return ajax.error(xmlhttprequest, ajax.url);
        }
      },

      dataType: 'json',
      type: 'POST'
    };

    if (elementSettings.dialog) {
      ajax.options.data.dialogOptions = elementSettings.dialog;
    }

    if (ajax.options.url.indexOf('?') === -1) {
      ajax.options.url += '?';
    } else {
      ajax.options.url += '&';
    }

    var wrapper = 'drupal_' + (elementSettings.dialogType || 'ajax');
    if (elementSettings.dialogRenderer) {
      wrapper += '.' + elementSettings.dialogRenderer;
    }
    ajax.options.url += Drupal.ajax.WRAPPER_FORMAT + '=' + wrapper;

    $(ajax.element).on(elementSettings.event, function (event) {
      if (!drupalSettings.ajaxTrustedUrl[ajax.url] && !Drupal.url.isLocal(ajax.url)) {
        throw new Error(Drupal.t('The callback URL is not local and not trusted: !url', {
          '!url': ajax.url
        }));
      }
      return ajax.eventResponse(this, event);
    });

    if (elementSettings.keypress) {
      $(ajax.element).on('keypress', function (event) {
        return ajax.keypressResponse(this, event);
      });
    }

    if (elementSettings.prevent) {
      $(ajax.element).on(elementSettings.prevent, false);
    }
  };

  Drupal.ajax.WRAPPER_FORMAT = '_wrapper_format';

  Drupal.Ajax.AJAX_REQUEST_PARAMETER = '_drupal_ajax';

  Drupal.Ajax.prototype.execute = function () {
    if (this.ajaxing) {
      return;
    }

    try {
      this.beforeSerialize(this.element, this.options);

      return $.ajax(this.options);
    } catch (e) {
      this.ajaxing = false;
      window.alert('An error occurred while attempting to process ' + this.options.url + ': ' + e.message);

      return $.Deferred().reject();
    }
  };

  Drupal.Ajax.prototype.keypressResponse = function (element, event) {
    var ajax = this;

    if (event.which === 13 || event.which === 32 && element.type !== 'text' && element.type !== 'textarea' && element.type !== 'tel' && element.type !== 'number') {
      event.preventDefault();
      event.stopPropagation();
      $(element).trigger(ajax.elementSettings.event);
    }
  };

  Drupal.Ajax.prototype.eventResponse = function (element, event) {
    event.preventDefault();
    event.stopPropagation();

    var ajax = this;

    if (ajax.ajaxing) {
      return;
    }

    try {
      if (ajax.$form) {
        if (ajax.setClick) {
          element.form.clk = element;
        }

        ajax.$form.ajaxSubmit(ajax.options);
      } else {
        ajax.beforeSerialize(ajax.element, ajax.options);
        $.ajax(ajax.options);
      }
    } catch (e) {
      ajax.ajaxing = false;
      window.alert('An error occurred while attempting to process ' + ajax.options.url + ': ' + e.message);
    }
  };

  Drupal.Ajax.prototype.beforeSerialize = function (element, options) {
    if (this.$form && document.body.contains(this.$form.get(0))) {
      var settings = this.settings || drupalSettings;
      Drupal.detachBehaviors(this.$form.get(0), settings, 'serialize');
    }

    options.data[Drupal.Ajax.AJAX_REQUEST_PARAMETER] = 1;

    var pageState = drupalSettings.ajaxPageState;
    options.data['ajax_page_state[theme]'] = pageState.theme;
    options.data['ajax_page_state[theme_token]'] = pageState.theme_token;
    options.data['ajax_page_state[libraries]'] = pageState.libraries;
  };

  Drupal.Ajax.prototype.beforeSubmit = function (formValues, element, options) {};

  Drupal.Ajax.prototype.beforeSend = function (xmlhttprequest, options) {
    if (this.$form) {
      options.extraData = options.extraData || {};

      options.extraData.ajax_iframe_upload = '1';

      var v = $.fieldValue(this.element);
      if (v !== null) {
        options.extraData[this.element.name] = v;
      }
    }

    $(this.element).prop('disabled', true);

    if (!this.progress || !this.progress.type) {
      return;
    }

    var progressIndicatorMethod = 'setProgressIndicator' + this.progress.type.slice(0, 1).toUpperCase() + this.progress.type.slice(1).toLowerCase();
    if (progressIndicatorMethod in this && typeof this[progressIndicatorMethod] === 'function') {
      this[progressIndicatorMethod].call(this);
    }
  };

  Drupal.theme.ajaxProgressThrobber = function (message) {
    var messageMarkup = typeof message === 'string' ? Drupal.theme('ajaxProgressMessage', message) : '';
    var throbber = '<div class="throbber">&nbsp;</div>';

    return '<div class="ajax-progress ajax-progress-throbber">' + throbber + messageMarkup + '</div>';
  };

  Drupal.theme.ajaxProgressIndicatorFullscreen = function () {
    return '<div class="ajax-progress ajax-progress-fullscreen">&nbsp;</div>';
  };

  Drupal.theme.ajaxProgressMessage = function (message) {
    return '<div class="message">' + message + '</div>';
  };

  Drupal.theme.ajaxProgressBar = function ($element) {
    return $('<div class="ajax-progress ajax-progress-bar"></div>').append($element);
  };

  Drupal.Ajax.prototype.setProgressIndicatorBar = function () {
    var progressBar = new Drupal.ProgressBar('ajax-progress-' + this.element.id, $.noop, this.progress.method, $.noop);
    if (this.progress.message) {
      progressBar.setProgress(-1, this.progress.message);
    }
    if (this.progress.url) {
      progressBar.startMonitoring(this.progress.url, this.progress.interval || 1500);
    }
    this.progress.element = $(Drupal.theme('ajaxProgressBar', progressBar.element));
    this.progress.object = progressBar;
    $(this.element).after(this.progress.element);
  };

  Drupal.Ajax.prototype.setProgressIndicatorThrobber = function () {
    this.progress.element = $(Drupal.theme('ajaxProgressThrobber', this.progress.message));
    $(this.element).after(this.progress.element);
  };

  Drupal.Ajax.prototype.setProgressIndicatorFullscreen = function () {
    this.progress.element = $(Drupal.theme('ajaxProgressIndicatorFullscreen'));
    $('body').append(this.progress.element);
  };

  Drupal.Ajax.prototype.success = function (response, status) {
    var _this = this;

    if (this.progress.element) {
      $(this.progress.element).remove();
    }
    if (this.progress.object) {
      this.progress.object.stopMonitoring();
    }
    $(this.element).prop('disabled', false);

    var elementParents = $(this.element).parents('[data-drupal-selector]').addBack().toArray();

    var focusChanged = false;
    Object.keys(response || {}).forEach(function (i) {
      if (response[i].command && _this.commands[response[i].command]) {
        _this.commands[response[i].command](_this, response[i], status);
        if (response[i].command === 'invoke' && response[i].method === 'focus') {
          focusChanged = true;
        }
      }
    });

    if (!focusChanged && this.element && !$(this.element).data('disable-refocus')) {
      var target = false;

      for (var n = elementParents.length - 1; !target && n >= 0; n--) {
        target = document.querySelector('[data-drupal-selector="' + elementParents[n].getAttribute('data-drupal-selector') + '"]');
      }

      if (target) {
        $(target).trigger('focus');
      }
    }

    if (this.$form && document.body.contains(this.$form.get(0))) {
      var settings = this.settings || drupalSettings;
      Drupal.attachBehaviors(this.$form.get(0), settings);
    }

    this.settings = null;
  };

  Drupal.Ajax.prototype.getEffect = function (response) {
    var type = response.effect || this.effect;
    var speed = response.speed || this.speed;

    var effect = {};
    if (type === 'none') {
      effect.showEffect = 'show';
      effect.hideEffect = 'hide';
      effect.showSpeed = '';
    } else if (type === 'fade') {
      effect.showEffect = 'fadeIn';
      effect.hideEffect = 'fadeOut';
      effect.showSpeed = speed;
    } else {
      effect.showEffect = type + 'Toggle';
      effect.hideEffect = type + 'Toggle';
      effect.showSpeed = speed;
    }

    return effect;
  };

  Drupal.Ajax.prototype.error = function (xmlhttprequest, uri, customMessage) {
    if (this.progress.element) {
      $(this.progress.element).remove();
    }
    if (this.progress.object) {
      this.progress.object.stopMonitoring();
    }

    $(this.wrapper).show();

    $(this.element).prop('disabled', false);

    if (this.$form && document.body.contains(this.$form.get(0))) {
      var settings = this.settings || drupalSettings;
      Drupal.attachBehaviors(this.$form.get(0), settings);
    }
    throw new Drupal.AjaxError(xmlhttprequest, uri, customMessage);
  };

  Drupal.theme.ajaxWrapperNewContent = function ($newContent, ajax, response) {
    return (response.effect || ajax.effect) !== 'none' && $newContent.filter(function (i) {
      return !($newContent[i].nodeName === '#comment' || $newContent[i].nodeName === '#text' && /^(\s|\n|\r)*$/.test($newContent[i].textContent));
    }).length > 1 ? Drupal.theme('ajaxWrapperMultipleRootElements', $newContent) : $newContent;
  };

  Drupal.theme.ajaxWrapperMultipleRootElements = function ($elements) {
    return $('<div></div>').append($elements);
  };

  Drupal.AjaxCommands = function () {};
  Drupal.AjaxCommands.prototype = {
    insert: function insert(ajax, response) {
      var $wrapper = response.selector ? $(response.selector) : $(ajax.wrapper);
      var method = response.method || ajax.method;
      var effect = ajax.getEffect(response);

      var settings = response.settings || ajax.settings || drupalSettings;

      var $newContent = $($.parseHTML(response.data, document, true));

      $newContent = Drupal.theme('ajaxWrapperNewContent', $newContent, ajax, response);

      switch (method) {
        case 'html':
        case 'replaceWith':
        case 'replaceAll':
        case 'empty':
        case 'remove':
          Drupal.detachBehaviors($wrapper.get(0), settings);
          break;
        default:
          break;
      }

      $wrapper[method]($newContent);

      if (effect.showEffect !== 'show') {
        $newContent.hide();
      }

      var $ajaxNewContent = $newContent.find('.ajax-new-content');
      if ($ajaxNewContent.length) {
        $ajaxNewContent.hide();
        $newContent.show();
        $ajaxNewContent[effect.showEffect](effect.showSpeed);
      } else if (effect.showEffect !== 'show') {
        $newContent[effect.showEffect](effect.showSpeed);
      }

      if ($newContent.parents('html').length) {
        $newContent.each(function (index, element) {
          if (element.nodeType === Node.ELEMENT_NODE) {
            Drupal.attachBehaviors(element, settings);
          }
        });
      }
    },
    remove: function remove(ajax, response, status) {
      var settings = response.settings || ajax.settings || drupalSettings;
      $(response.selector).each(function () {
        Drupal.detachBehaviors(this, settings);
      }).remove();
    },
    changed: function changed(ajax, response, status) {
      var $element = $(response.selector);
      if (!$element.hasClass('ajax-changed')) {
        $element.addClass('ajax-changed');
        if (response.asterisk) {
          $element.find(response.asterisk).append(' <abbr class="ajax-changed" title="' + Drupal.t('Changed') + '">*</abbr> ');
        }
      }
    },
    alert: function alert(ajax, response, status) {
      window.alert(response.text, response.title);
    },
    announce: function announce(ajax, response) {
      if (response.priority) {
        Drupal.announce(response.text, response.priority);
      } else {
        Drupal.announce(response.text);
      }
    },
    redirect: function redirect(ajax, response, status) {
      window.location = response.url;
    },
    css: function css(ajax, response, status) {
      $(response.selector).css(response.argument);
    },
    settings: function settings(ajax, response, status) {
      var ajaxSettings = drupalSettings.ajax;

      if (ajaxSettings) {
        Drupal.ajax.expired().forEach(function (instance) {

          if (instance.selector) {
            var selector = instance.selector.replace('#', '');
            if (selector in ajaxSettings) {
              delete ajaxSettings[selector];
            }
          }
        });
      }

      if (response.merge) {
        $.extend(true, drupalSettings, response.settings);
      } else {
        ajax.settings = response.settings;
      }
    },
    data: function data(ajax, response, status) {
      $(response.selector).data(response.name, response.value);
    },
    invoke: function invoke(ajax, response, status) {
      var $element = $(response.selector);
      $element[response.method].apply($element, _toConsumableArray(response.args));
    },
    restripe: function restripe(ajax, response, status) {
      $(response.selector).find('> tbody > tr:visible, > tr:visible').removeClass('odd even').filter(':even').addClass('odd').end().filter(':odd').addClass('even');
    },
    update_build_id: function update_build_id(ajax, response, status) {
      $('input[name="form_build_id"][value="' + response.old + '"]').val(response.new);
    },
    add_css: function add_css(ajax, response, status) {
      $('head').prepend(response.data);

      var match = void 0;
      var importMatch = /^@import url\("(.*)"\);$/gim;
      if (document.styleSheets[0].addImport && importMatch.test(response.data)) {
        importMatch.lastIndex = 0;
        do {
          match = importMatch.exec(response.data);
          document.styleSheets[0].addImport(match[1]);
        } while (match);
      }
    },
    message: function message(ajax, response) {
      var messages = new Drupal.Message(document.querySelector(response.messageWrapperQuerySelector));
      if (response.clearPrevious) {
        messages.clear();
      }
      messages.add(response.message, response.messageOptions);
    }
  };
})(jQuery, window, Drupal, drupalSettings);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  Drupal.Views = {};

  Drupal.Views.parseQueryString = function (query) {
    var args = {};
    var pos = query.indexOf('?');
    if (pos !== -1) {
      query = query.substring(pos + 1);
    }
    var pair = void 0;
    var pairs = query.split('&');
    for (var i = 0; i < pairs.length; i++) {
      pair = pairs[i].split('=');

      if (pair[0] !== 'q' && pair[1]) {
        args[decodeURIComponent(pair[0].replace(/\+/g, ' '))] = decodeURIComponent(pair[1].replace(/\+/g, ' '));
      }
    }
    return args;
  };

  Drupal.Views.parseViewArgs = function (href, viewPath) {
    var returnObj = {};
    var path = Drupal.Views.getPath(href);

    var viewHref = Drupal.url(viewPath).substring(drupalSettings.path.baseUrl.length);

    if (viewHref && path.substring(0, viewHref.length + 1) === viewHref + '/') {
      returnObj.view_args = decodeURIComponent(path.substring(viewHref.length + 1, path.length));
      returnObj.view_path = path;
    }
    return returnObj;
  };

  Drupal.Views.pathPortion = function (href) {
    var protocol = window.location.protocol;
    if (href.substring(0, protocol.length) === protocol) {
      href = href.substring(href.indexOf('/', protocol.length + 2));
    }
    return href;
  };

  Drupal.Views.getPath = function (href) {
    href = Drupal.Views.pathPortion(href);
    href = href.substring(drupalSettings.path.baseUrl.length, href.length);

    if (href.substring(0, 3) === '?q=') {
      href = href.substring(3, href.length);
    }
    var chars = ['#', '?', '&'];
    for (var i = 0; i < chars.length; i++) {
      if (href.indexOf(chars[i]) > -1) {
        href = href.substr(0, href.indexOf(chars[i]));
      }
    }
    return href;
  };
})(jQuery, Drupal, drupalSettings);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.ViewsAjaxView = {};
  Drupal.behaviors.ViewsAjaxView.attach = function (context, settings) {
    if (settings && settings.views && settings.views.ajaxViews) {
      var ajaxViews = settings.views.ajaxViews;

      Object.keys(ajaxViews || {}).forEach(function (i) {
        Drupal.views.instances[i] = new Drupal.views.ajaxView(ajaxViews[i]);
      });
    }
  };
  Drupal.behaviors.ViewsAjaxView.detach = function (context, settings, trigger) {
    if (trigger === 'unload') {
      if (settings && settings.views && settings.views.ajaxViews) {
        var ajaxViews = settings.views.ajaxViews;

        Object.keys(ajaxViews || {}).forEach(function (i) {
          var selector = '.js-view-dom-id-' + ajaxViews[i].view_dom_id;
          if ($(selector, context).length) {
            delete Drupal.views.instances[i];
            delete settings.views.ajaxViews[i];
          }
        });
      }
    }
  };

  Drupal.views = {};

  Drupal.views.instances = {};

  Drupal.views.ajaxView = function (settings) {
    var selector = '.js-view-dom-id-' + settings.view_dom_id;
    this.$view = $(selector);

    var ajaxPath = drupalSettings.views.ajax_path;

    if (ajaxPath.constructor.toString().indexOf('Array') !== -1) {
      ajaxPath = ajaxPath[0];
    }

    var queryString = window.location.search || '';
    if (queryString !== '') {
      queryString = queryString.slice(1).replace(/q=[^&]+&?|&?render=[^&]+/, '');
      if (queryString !== '') {
        queryString = (/\?/.test(ajaxPath) ? '&' : '?') + queryString;
      }
    }

    this.element_settings = {
      url: ajaxPath + queryString,
      submit: settings,
      setClick: true,
      event: 'click',
      selector: selector,
      progress: { type: 'fullscreen' }
    };

    this.settings = settings;

    this.$exposed_form = $('form#views-exposed-form-' + settings.view_name.replace(/_/g, '-') + '-' + settings.view_display_id.replace(/_/g, '-'));
    this.$exposed_form.once('exposed-form').each($.proxy(this.attachExposedFormAjax, this));

    this.$view.filter($.proxy(this.filterNestedViews, this)).once('ajax-pager').each($.proxy(this.attachPagerAjax, this));

    var selfSettings = $.extend({}, this.element_settings, {
      event: 'RefreshView',
      base: this.selector,
      element: this.$view.get(0)
    });
    this.refreshViewAjax = Drupal.ajax(selfSettings);
  };

  Drupal.views.ajaxView.prototype.attachExposedFormAjax = function () {
    var that = this;
    this.exposedFormAjax = [];

    $('input[type=submit], input[type=image]', this.$exposed_form).not('[data-drupal-selector=edit-reset]').each(function (index) {
      var selfSettings = $.extend({}, that.element_settings, {
        base: $(this).attr('id'),
        element: this
      });
      that.exposedFormAjax[index] = Drupal.ajax(selfSettings);
    });
  };

  Drupal.views.ajaxView.prototype.filterNestedViews = function () {
    return !this.$view.parents('.view').length;
  };

  Drupal.views.ajaxView.prototype.attachPagerAjax = function () {
    this.$view.find('ul.js-pager__items > li > a, th.views-field a, .attachment .views-summary a').each($.proxy(this.attachPagerLinkAjax, this));
  };

  Drupal.views.ajaxView.prototype.attachPagerLinkAjax = function (id, link) {
    var $link = $(link);
    var viewData = {};
    var href = $link.attr('href');

    $.extend(viewData, this.settings, Drupal.Views.parseQueryString(href), Drupal.Views.parseViewArgs(href, this.settings.view_base_path));

    var selfSettings = $.extend({}, this.element_settings, {
      submit: viewData,
      base: false,
      element: link
    });
    this.pagerAjax = Drupal.ajax(selfSettings);
  };

  Drupal.AjaxCommands.prototype.viewsScrollTop = function (ajax, response) {
    var offset = $(response.selector).offset();

    var scrollTarget = response.selector;
    while ($(scrollTarget).scrollTop() === 0 && $(scrollTarget).parent()) {
      scrollTarget = $(scrollTarget).parent();
    }

    if (offset.top - 10 < $(scrollTarget).scrollTop()) {
      $(scrollTarget).animate({ scrollTop: offset.top - 10 }, 500);
    }
  };
})(jQuery, Drupal, drupalSettings);;
/**
 * @file
 *   Javascript for the geolocation module.
 */

/**
 * @param {Object} drupalSettings.geolocation
 * @param {String} drupalSettings.geolocation.google_map_url
 */

/**
 * @name GoogleMapSettings
 * @property {String} info_auto_display
 * @property {String} marker_icon_path
 * @property {String} height
 * @property {String} width
 * @property {Number} zoom
 * @property {Number} maxZoom
 * @property {Number} minZoom
 * @property {String} type
 * @property {Boolean} scrollwheel
 * @property {Boolean} preferScrollingToZooming
 * @property {String} gestureHandling
 * @property {Boolean} panControl
 * @property {Boolean} mapTypeControl
 * @property {Boolean} scaleControl
 * @property {Boolean} streetViewControl
 * @property {Boolean} overviewMapControl
 * @property {Boolean} zoomControl
 * @property {Boolean} rotateControl
 * @property {Boolean} fullscreenControl
 * @property {Object} zoomControlOptions
 * @property {String} mapTypeId
 * @property {String} info_text
 */

/**
 * @typedef {Object} GoogleMapBounds
 * @property {function():GoogleMapLatLng} getNorthEast
 * @property {function():GoogleMapLatLng} getSouthWest
 */

/**
 * @typedef {Object} GoogleMapLatLng
 * @property {function():float} lat
 * @property {function():float} lng
 */

/**
 * @typedef {Object} GoogleMapPoint
 * @property {function():float} x
 * @property {function():float} y
 */

/**
 * @typedef {Object} AddressComponent
 * @property {String} long_name - Long component name
 * @property {String} short_name - Short component name
 * @property {String[]} types - Component type
 * @property {GoogleGeometry} geometry
 */

/**
 * @typedef {Object} GoogleAddress
 * @property {AddressComponent[]} address_components - Components
 * @property {String} formatted_address - Formatted address
 * @property {GoogleGeometry} geometry - Geometry
 */

/**
 * @typedef {Object} GoogleGeometry
 * @property {GoogleMapLatLng} location - Location
 * @property {String} location_type - Location type
 * @property {GoogleMapBounds} viewport - Viewport
 * @property {GoogleMapBounds} bounds - Bounds (optionally)
 */

/**
 * @typedef {Object} GoogleMapProjection
 * @property {function(GoogleMapLatLng):GoogleMapPoint} fromLatLngToPoint
 */

/**
 * @typedef {Object} GoogleMarkerSettings
 *
 * Settings from https://developers.google.com/maps/documentation/javascript/3.exp/reference#MarkerOptions:
 * @property {GoogleMapLatLng} position
 * @property {GoogleMap} map
 * @property {string} title
 * @property {string} [icon]
 * @property {string} [label]
 *
 * Settings from Geolocation module:
 * @property {string} [infoWindowContent]
 * @property {boolean} [infoWindowSolitary]
 */

/**
 * @typedef {Object} GoogleMarker
 * @property {Function} setPosition
 * @property {Function} setMap
 * @property {Function} setIcon
 * @property {Function} setTitle
 * @property {Function} setLabel
 * @property {Function} addListener
 */

/**
 * @typedef {Object} GoogleInfoWindow
 * @property {Function} open
 * @property {Function} close
 */

/**
 * @typedef {Object} GoogleCircle
 * @property {function():GoogleMapBounds} Circle.getBounds()
 */

/**
 * @typedef {Object} GoogleMap
 * @property {Object} ZoomControlStyle
 * @property {String} ZoomControlStyle.LARGE
 *
 * @property {Object} ControlPosition
 * @property {String} ControlPosition.LEFT_TOP
 * @property {String} ControlPosition.TOP_LEFT
 * @property {String} ControlPosition.RIGHT_BOTTOM
 * @property {String} ControlPosition.RIGHT_CENTER
 *
 * @property {Object} MapTypeId
 * @property {String} MapTypeId.ROADMAP
 *
 * @property {Function} LatLngBounds
 *
 * @function
 * @property Map
 *
 * @function
 * @property InfoWindow
 *
 * @function
 * @property {function({GoogleMarkerSettings}):GoogleMarker} Marker
 *
 * @function
 * @property {function({}):GoogleInfoWindow} InfoWindow
 *
 * @function
 * @property {function(string|number|float, string|number|float):GoogleMapLatLng} LatLng
 *
 * @function
 * @property {function(string|number|float, string|number|float):GoogleMapPoint} Point
 *
 * @property {function(Object):GoogleCircle} Circle
 *
 * @property {function():GoogleMapProjection} getProjection
 *
 * @property {Function} fitBounds
 *
 * @property {Function} setCenter
 * @property {Function} setZoom
 * @property {Function} getZoom
 * @property {Function} setOptions
 *
 * @property {function():GoogleMapBounds} getBounds
 * @property {function():GoogleMapLatLng} getCenter
 */

/**
 * @typedef {Object} google
 * @property {GoogleMap} maps
 * @property {Object} event
 * @property {Function} addListener
 * @property {Function} addDomListener
 * @property {Function} addListenerOnce
 * @property {Function} addDomListenerOnce
 */

/**
 * @typedef {Object} GeolocationMap
 * @property {string} id
 * @property {Object} settings
 * @property {GoogleMapSettings} settings.google_map_settings
 * @property {GoogleMap} googleMap
 * @property {Number} lat
 * @property {Number} lng
 * @property {jQuery} container
 * @property {GoogleMarker[]} mapMarkers
 * @property {GoogleInfoWindow} infoWindow
 */

/**
 * Callback when map fully loaded.
 *
 * @callback geolocationMapLoadedCallback
 * @param {GeolocationMap} map - Google map.
 */

(function ($, _, Drupal, drupalSettings) {
  'use strict';

  /* global google */

  /**
   * JSLint handing.
   *
   *  @callback geolocationCallback
   */

  /**
   * @namespace
   */
  Drupal.geolocation = Drupal.geolocation || {};

  Drupal.geolocation.maps = Drupal.geolocation.maps || [];

  // Google Maps are loaded lazily. In some situations load_google() is called twice, which results in
  // "You have included the Google Maps API multiple times on this page. This may cause unexpected errors." errors.
  // This flag will prevent repeat $.getScript() calls.
  Drupal.geolocation.maps_api_loading = false;

  /** {GoogleMapSettings} **/
  Drupal.geolocation.defaultMapSettings = {
    scrollwheel: false,
    panControl: false,
    mapTypeControl: true,
    scaleControl: false,
    streetViewControl: false,
    overviewMapControl: false,
    rotateControl: false,
    fullscreenControl: false,
    zoomControl: true,
    mapTypeId: 'roadmap',
    zoom: 2,
    maxZoom: 0,
    minZoom: 18,
    style: [],
    gestureHandling: 'auto'
  };

  /**
   * Provides the callback that is called when maps loads.
   */
  Drupal.geolocation.googleCallback = function () {
    // Ensure callbacks array;
    Drupal.geolocation.googleCallbacks = Drupal.geolocation.googleCallbacks || [];

    // Wait until the window load event to try to use the maps library.
    $(document).ready(function (e) {
      _.invoke(Drupal.geolocation.googleCallbacks, 'callback');
      Drupal.geolocation.googleCallbacks = [];
    });
  };

  /**
   * Adds a callback that will be called once the maps library is loaded.
   *
   * @param {geolocationCallback} callback - The callback
   */
  Drupal.geolocation.addCallback = function (callback) {
    Drupal.geolocation.googleCallbacks = Drupal.geolocation.googleCallbacks || [];
    Drupal.geolocation.googleCallbacks.push({callback: callback});
  };

  /**
   * Load Google Maps and set a callback to run when it's ready.
   *
   * @param {geolocationCallback} callback - The callback
   */
  Drupal.geolocation.loadGoogle = function (callback) {
    // Add the callback.
    Drupal.geolocation.addCallback(callback);

    // Check for Google Maps.
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
      if (Drupal.geolocation.maps_api_loading === true) {
        return;
      }

      Drupal.geolocation.maps_api_loading = true;
      // Google Maps isn't loaded so lazy load Google Maps.

      if (typeof drupalSettings.geolocation.google_map_url !== 'undefined') {
        $.getScript(drupalSettings.geolocation.google_map_url)
          .done(function () {
            Drupal.geolocation.maps_api_loading = false;
          });
      }
      else {
        console.error('Geolocation - Google map url not set.'); // eslint-disable-line no-console
      }
    }
    else {
      // Google Maps loaded. Run callback.
      Drupal.geolocation.googleCallback();
    }
  };

  /**
   * Load Google Maps and set a callback to run when it's ready.
   *
   * @param {GeolocationMap} map - Container of settings and ID.
   *
   * @return {object} - The Google Map object.
   */
  Drupal.geolocation.addMap = function (map) {

    if (typeof map.id === 'undefined') {
      map.id = 'map' + Math.floor(Math.random() * 10000);
    }

    map.mapMarkers = map.mapMarkers || [];

    // Set the container size.
    map.container.css({
      height: map.settings.google_map_settings.height,
      width: map.settings.google_map_settings.width
    });

    // Get the center point.
    var center = new google.maps.LatLng(map.lat, map.lng);

    // Add any missing settings.
    map.settings.google_map_settings = $.extend(Drupal.geolocation.defaultMapSettings, map.settings.google_map_settings);

    map.settings.google_map_settings.zoom = parseInt(map.settings.google_map_settings.zoom) || Drupal.geolocation.defaultMapSettings.zoom;
    map.settings.google_map_settings.maxZoom = parseInt(map.settings.google_map_settings.maxZoom) || Drupal.geolocation.defaultMapSettings.maxZoom;
    map.settings.google_map_settings.minZoom = parseInt(map.settings.google_map_settings.minZoom) || Drupal.geolocation.defaultMapSettings.minZoom;

     /**
     * Create the map object and assign it to the map.
     *
     * @type {GoogleMap} map.googleMap
     */
    map.googleMap = new google.maps.Map(map.container.get(0), {
      zoom: map.settings.google_map_settings.zoom,
      maxZoom: map.settings.google_map_settings.maxZoom,
      minZoom: map.settings.google_map_settings.minZoom,
      center: center,
      mapTypeId: google.maps.MapTypeId[map.settings.google_map_settings.type],
      mapTypeControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      },
      rotateControl: map.settings.google_map_settings.rotateControl,
      fullscreenControl: map.settings.google_map_settings.fullscreenControl,
      zoomControl: map.settings.google_map_settings.zoomControl,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
      streetViewControl: map.settings.google_map_settings.streetViewControl,
      streetViewControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
      mapTypeControl: map.settings.google_map_settings.mapTypeControl,
      scrollwheel: map.settings.google_map_settings.scrollwheel,
      disableDoubleClickZoom: map.settings.google_map_settings.disableDoubleClickZoom,
      draggable: map.settings.google_map_settings.draggable,
      styles: map.settings.google_map_settings.style,
      gestureHandling: map.settings.google_map_settings.gestureHandling
    });

    if (map.settings.google_map_settings.scrollwheel && map.settings.google_map_settings.preferScrollingToZooming) {
      map.googleMap.setOptions({scrollwheel: false});
      map.googleMap.addListener('click', function () {
        map.googleMap.setOptions({scrollwheel: true});
      });
    }

    Drupal.geolocation.maps.push(map);

    google.maps.event.addListenerOnce(map.googleMap, 'tilesloaded', function () {
      Drupal.geolocation.mapLoadedCallback(map, map.id);
    });

    return map.googleMap;
  };

  /**
   * Set/Update a marker on a map
   *
   * @param {GeolocationMap} map - The settings object that contains all of the necessary metadata for this map.
   * @param {GoogleMarkerSettings} markerSettings - Marker settings.
   * @param {Boolean} [skipInfoWindow=false] - Skip attaching InfoWindow.
   * @return {GoogleMarker} - Created marker.
   */
  Drupal.geolocation.setMapMarker = function (map, markerSettings, skipInfoWindow) {
    map.mapMarkers = map.mapMarkers || [];
    skipInfoWindow = skipInfoWindow || false;

    if (typeof map.settings.google_map_settings.marker_icon_path === 'string') {
      if (typeof markerSettings.icon === 'undefined') {
        markerSettings.icon = map.settings.google_map_settings.marker_icon_path;
      }
    }

    // Add the marker to the map.
    /** @type {GoogleMarker} */
    var currentMarker = new google.maps.Marker(markerSettings);

    if (skipInfoWindow !== true) {

      // Set the info popup text.
      var currentInfoWindow = new google.maps.InfoWindow({
        content: markerSettings.infoWindowContent,
        disableAutoPan: map.settings.google_map_settings.disableAutoPan
      });

      currentMarker.addListener('click', function () {
        if (markerSettings.infoWindowSolitary) {
          if (typeof map.infoWindow !== 'undefined') {
            map.infoWindow.close();
          }
          map.infoWindow = currentInfoWindow;
        }
        currentInfoWindow.open(map.googleMap, currentMarker);
      });

      if (map.settings.google_map_settings.info_auto_display) {
        google.maps.event.addListenerOnce(map.googleMap, 'tilesloaded', function () {
          google.maps.event.trigger(currentMarker, 'click');
        });
      }
    }

    map.mapMarkers.push(currentMarker);

    return currentMarker;
  };

  /**
   * Remove marker(s) from map.
   *
   * @param {GeolocationMap} map - The settings object that contains all of the necessary metadata for this map.
   */
  Drupal.geolocation.removeMapMarker = function (map) {
    map.mapMarkers = map.mapMarkers || [];

    $.each(
      map.mapMarkers,

      /**
       * @param {integer} index - Current index.
       * @param {GoogleMarker} item - Current marker.
       */
      function (index, item) {
        item.setMap(null);
      }
    );
    map.mapMarkers = [];
  };

  /**
   * Draw a circle indicating accuracy and slowly fade it out.
   *
   * @param {GoogleMapLatLng} location - A location (latLng) object from Google Maps API.
   * @param {int} accuracy - Accuracy in meter.
   * @param {GoogleMap} map - Map to draw on.
   */
  Drupal.geolocation.drawAccuracyIndicator = function (location, accuracy, map) {

    // Draw a circle representing the accuracy radius of HTML5 geolocation.
    var circle = new google.maps.Circle({
      center: location,
      radius: accuracy,
      map: map,
      fillColor: '#4285F4',
      fillOpacity: 0.5,
      strokeColor: '#4285F4',
      strokeOpacity: 1,
      clickable: false
    });

    // Set the zoom level to the accuracy circle's size.
    map.fitBounds(circle.getBounds());

    // Fade circle away.
    setInterval(fadeCityCircles, 100);

    function fadeCityCircles() {
      var fillOpacity = circle.get('fillOpacity');
      fillOpacity -= 0.02;

      var strokeOpacity = circle.get('strokeOpacity');
      strokeOpacity -= 0.04;

      if (
        strokeOpacity > 0
        && fillOpacity > 0
      ) {
        circle.setOptions({fillOpacity: fillOpacity, strokeOpacity: strokeOpacity});
      }
      else {
        circle.setMap(null);
      }
    }
  };

  /**
   * Provides the callback that is called when map is fully loaded.
   *
   * @param {GeolocationMap} map - fully loaded map
   * @param {string} mapId - Source ID.
   */
  Drupal.geolocation.mapLoadedCallback = function (map, mapId) {
    Drupal.geolocation.mapLoadedCallbacks = Drupal.geolocation.mapLoadedCallbacks || [];
    $.each(Drupal.geolocation.mapLoadedCallbacks, function (index, callbackContainer) {
      if (callbackContainer.mapId === mapId) {
        callbackContainer.callback(map);
      }
    });
  };

  /**
   * Adds a callback that will be called when map is fully loaded.
   *
   * @param {geolocationMapLoadedCallback} callback - The callback
   * @param {string} mapId - Map ID.
   */
  Drupal.geolocation.addMapLoadedCallback = function (callback, mapId) {
    if (typeof mapId === 'undefined') {
      return;
    }
    Drupal.geolocation.mapLoadedCallbacks = Drupal.geolocation.mapLoadedCallbacks || [];
    Drupal.geolocation.mapLoadedCallbacks.push({callback: callback, mapId: mapId});
  };

  /**
   * Remove a callback that will be called when map is fully loaded.
   *
   * @param {string} mapId - Identify the source
   */
  Drupal.geolocation.removeMapLoadedCallback = function (mapId) {
    Drupal.geolocation.mapLoadedCallbacks = Drupal.geolocation.geocoder.resultCallbacks || [];
    $.each(Drupal.geolocation.mapLoadedCallbacks, function (index, callback) {
      if (callback.mapId === mapId) {
        Drupal.geolocation.mapLoadedCallbacks.splice(index, 1);
      }
    });
  };

})(jQuery, _, Drupal, drupalSettings);
;
/**
 * @file
 * Handle the common map.
 */

/**
 * @name CommonMapUpdateSettings
 * @property {String} enable
 * @property {String} hide_form
 * @property {number} views_refresh_delay
 * @property {String} update_view_id
 * @property {String} update_view_display_id
 * @property {String} boundary_filter
 * @property {String} parameter_identifier
 */

/**
 * @name CommonMapSettings
 * @property {Object} settings
 * @property {GoogleMapSettings} settings.google_map_settings
 * @property {CommonMapUpdateSettings} dynamic_map
 * @property {String} client_location.enable
 * @property {String} client_location.update_map
 * @property {Boolean} showRawLocations
 * @property {Boolean} markerScrollToResult
 * @property {String} markerClusterer.enable
 * @property {String} markerClusterer.imagePath
 * @property {Object} markerClusterer.styles
 * @property {String} contextPopupContent.enable
 * @property {String} contextPopupContent.content
 */

/**
 * @property {CommonMapSettings[]} drupalSettings.geolocation.commonMap
 */

/**
 * @property {function(CommonMapUpdateSettings)} GeolocationMap.updateDrupalView
 * @property {Object} GeolocationMap.markerClusterer
 */

(function ($, window, Drupal, drupalSettings) {
  'use strict';

  /* global google */

  var skipMapIdleEventHandler = false; // Setting to true will skip the next triggered map related viewsRefresh.

  /**
   * @namespace
   */
  Drupal.geolocation = Drupal.geolocation || {};

  /**
   * Attach common map style functionality.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches common map style functionality to relevant elements.
   */
  Drupal.behaviors.geolocationCommonMap = {
    attach: function (context, drupalSettings) {
      if (typeof Drupal.geolocation.loadGoogle === 'function') {
        // First load the library from google.
        Drupal.geolocation.loadGoogle(function () {
          initialize(drupalSettings.geolocation, context);
        });
      }
    }
  };

  function initialize(settings, context) {

    $.each(
      settings.commonMap,

      /**
       * @param {String} mapId - canvasId of current map
       * @param {CommonMapSettings} commonMapSettings - settings for current map
       */
      function (mapId, commonMapSettings) {

        /*
         * Hide form if requested.
         */
        if (
          typeof commonMapSettings.dynamic_map !== 'undefined'
          && commonMapSettings.dynamic_map.enable
          && commonMapSettings.dynamic_map.hide_form
          && typeof commonMapSettings.dynamic_map.parameter_identifier !== 'undefined'
        ) {
          var exposedForm = $('form#views-exposed-form-' + commonMapSettings.dynamic_map.update_view_id.replace(/_/g, '-') + '-' + commonMapSettings.dynamic_map.update_view_display_id.replace(/_/g, '-'));

          if (exposedForm.length === 1) {
            exposedForm.find('input[name^="' + commonMapSettings.dynamic_map.parameter_identifier + '"]').each(function (index, item) {
              $(item).parent().hide();
            });

            // Hide entire form if it's empty now, except form-submit.
            if (exposedForm.find('input:visible:not(.form-submit), select:visible').length === 0) {
              exposedForm.hide();
            }
          }
        }

        // The DOM-node the map and everything else resides in.
        /** @type {jQuery} */
        var mapWrapper = $('#' + mapId, context);

        // If the map is not present, we can go to the next entry.
        if (!mapWrapper.length) {
          return;
        }

        // Hide the graceful-fallback HTML list; map will propably work now.
        // Map-container is not hidden by default in case of graceful-fallback.
        if (typeof commonMapSettings.showRawLocations === 'undefined') {
          mapWrapper.find('.geolocation-common-map-locations').hide();
        }
        else if (!commonMapSettings.showRawLocations) {
          mapWrapper.find('.geolocation-common-map-locations').hide();
        }

        /**
         * @type {GeolocationMap}
         */
        var geolocationMap = {};

        geolocationMap.id = mapId;

        /*
         * Check for map already created (i.e. after AJAX)
         */
        if (typeof Drupal.geolocation.maps !== 'undefined') {
          $.each(Drupal.geolocation.maps, function (index, map) {
            if (typeof map.container !== 'undefined') {
              if (map.container.is(mapWrapper.find('.geolocation-common-map-container'))) {
                geolocationMap = map;
              }
            }
          });
        }

        /*
         * Update existing map, depending on present data-attribute settings.
         */
        if (typeof geolocationMap.googleMap !== 'undefined') {
          if (mapWrapper.data('centre-lat') && mapWrapper.data('centre-lng')) {
            var newCenter = new google.maps.LatLng(
              mapWrapper.data('centre-lat'),
              mapWrapper.data('centre-lng')
            );

            if (!geolocationMap.googleMap.getCenter().equals(newCenter)) {
              skipMapIdleEventHandler = true;
              geolocationMap.googleMap.setCenter(newCenter);
            }
          }
          else if (
            mapWrapper.data('centre-lat-north-east')
            && mapWrapper.data('centre-lng-north-east')
            && mapWrapper.data('centre-lat-south-west')
            && mapWrapper.data('centre-lng-south-west')
          ) {
            var newBounds = {
              north: mapWrapper.data('centre-lat-north-east'),
              east: mapWrapper.data('centre-lng-north-east'),
              south: mapWrapper.data('centre-lat-south-west'),
              west: mapWrapper.data('centre-lng-south-west')
            };

            if (!geolocationMap.googleMap.getBounds().equals(newBounds)) {
              skipMapIdleEventHandler = true;
              geolocationMap.googleMap.fitBounds(newBounds);
            }
          }
        }

        /*
         * Instantiate new map.
         */
        else {
          geolocationMap.settings = {};
          geolocationMap.settings.google_map_settings = commonMapSettings.settings.google_map_settings;

          geolocationMap.container = mapWrapper.find('.geolocation-common-map-container').first();
          geolocationMap.container.show();

          if (
            mapWrapper.data('centre-lat')
            && mapWrapper.data('centre-lng')
          ) {
            geolocationMap.lat = mapWrapper.data('centre-lat');
            geolocationMap.lng = mapWrapper.data('centre-lng');

            skipMapIdleEventHandler = true;
            geolocationMap.googleMap = Drupal.geolocation.addMap(geolocationMap);
          }
          else if (
            mapWrapper.data('centre-lat-north-east')
            && mapWrapper.data('centre-lng-north-east')
            && mapWrapper.data('centre-lat-south-west')
            && mapWrapper.data('centre-lng-south-west')
          ) {
            var centerBounds = {
              north: mapWrapper.data('centre-lat-north-east'),
              east: mapWrapper.data('centre-lng-north-east'),
              south: mapWrapper.data('centre-lat-south-west'),
              west: mapWrapper.data('centre-lng-south-west')
            };

            geolocationMap.lat = geolocationMap.lng = 0;
            skipMapIdleEventHandler = true;
            geolocationMap.googleMap = Drupal.geolocation.addMap(geolocationMap);

            skipMapIdleEventHandler = true;
            geolocationMap.googleMap.fitBounds(centerBounds);
          }
          else {
            geolocationMap.lat = geolocationMap.lng = 0;

            skipMapIdleEventHandler = true;
            geolocationMap.googleMap = Drupal.geolocation.addMap(geolocationMap);
          }
        }

        /**
         * Dynamic map handling aka "AirBnB mode".
         */
        if (
          typeof commonMapSettings.dynamic_map !== 'undefined'
          && commonMapSettings.dynamic_map.enable
        ) {

          /**
           * Update the view depending on dynamic map settings and capability.
           *
           * One of several states might occur now. Possible state depends on whether:
           * - view using AJAX is enabled
           * - map view is the containing (page) view or an attachment
           * - the exposed form is present and contains the boundary filter
           * - map settings are consistent
           *
           * Given these factors, map boundary changes can be handled in one of three ways:
           * - trigger the views AJAX "RefreshView" command
           * - trigger the exposed form causing a regular POST reload
           * - fully reload the website
           *
           * These possibilities are ordered by UX preference.
           *
           * @param {CommonMapUpdateSettings} dynamic_map_settings
           *   The dynamic map settings to update the map.
           */
          if (typeof geolocationMap.updateDrupalView === 'undefined') {
            geolocationMap.updateDrupalView = function (dynamic_map_settings) {
              // Make sure to load current form DOM element, which will change after every AJAX operation.
              var exposedForm = $('form#views-exposed-form-' + dynamic_map_settings.update_view_id.replace(/_/g, '-') + '-' + dynamic_map_settings.update_view_display_id.replace(/_/g, '-'));

              var currentBounds = geolocationMap.googleMap.getBounds();
              var update_path = '';

              if (
                typeof dynamic_map_settings.boundary_filter !== 'undefined'
              ) {
                if (exposedForm.length) {
                  exposedForm.find('input[name="' + dynamic_map_settings.parameter_identifier + '[lat_north_east]"]').val(currentBounds.getNorthEast().lat());
                  exposedForm.find('input[name="' + dynamic_map_settings.parameter_identifier + '[lng_north_east]"]').val(currentBounds.getNorthEast().lng());
                  exposedForm.find('input[name="' + dynamic_map_settings.parameter_identifier + '[lat_south_west]"]').val(currentBounds.getSouthWest().lat());
                  exposedForm.find('input[name="' + dynamic_map_settings.parameter_identifier + '[lng_south_west]"]').val(currentBounds.getSouthWest().lng());

                  $('input[type=submit], input[type=image], button[type=submit]', exposedForm).not('[data-drupal-selector=edit-reset]').trigger('click');
                }
                // No AJAX, no form, just enforce a page reload with GET parameters set.
                else {
                  if (window.location.search.length) {
                    update_path = window.location.search + '&';
                  }
                  else {
                    update_path = '?';
                  }
                  update_path += dynamic_map_settings.parameter_identifier + '[lat_north_east]=' + currentBounds.getNorthEast().lat();
                  update_path += '&' + dynamic_map_settings.parameter_identifier + '[lng_north_east]=' + currentBounds.getNorthEast().lng();
                  update_path += '&' + dynamic_map_settings.parameter_identifier + '[lat_south_west]=' + currentBounds.getSouthWest().lat();
                  update_path += '&' + dynamic_map_settings.parameter_identifier + '[lng_south_west]=' + currentBounds.getSouthWest().lng();

                  window.location = update_path;
                }
              }
            };
          }

          if (mapWrapper.data('geolocationAjaxProcessed') !== 1) {
            var geolocationMapIdleTimer;
            geolocationMap.googleMap.addListener('idle', function () {
              if (skipMapIdleEventHandler === true) {
                skipMapIdleEventHandler = false;
                return;
              }
              clearTimeout(geolocationMapIdleTimer);
              geolocationMapIdleTimer = setTimeout(function () {
                geolocationMap.updateDrupalView(commonMapSettings.dynamic_map);
              }, commonMapSettings.dynamic_map.views_refresh_delay);
            });
          }
        }

        /**
         * Client location handling.
         */
        if (typeof mapWrapper.data('clientlocation') !== 'undefined' && !mapWrapper.hasClass('clientlocation-processed')) {
          mapWrapper.addClass('clientlocation-processed');
          if (
            mapWrapper.data('geolocationAjaxProcessed') !== 1
            && navigator.geolocation
            && typeof commonMapSettings.client_location !== 'undefined'
            && commonMapSettings.client_location.enable === true
          ) {
            navigator.geolocation.getCurrentPosition(function (position) {
              mapWrapper.data('centre-lat', position.coords.latitude);
              mapWrapper.data('centre-lng', position.coords.longitude);

              var newLocation = new google.maps.LatLng(parseFloat(position.coords.latitude), parseFloat(position.coords.longitude));

              skipMapIdleEventHandler = true;
              geolocationMap.googleMap.setCenter(newLocation);
              if (skipMapIdleEventHandler !== true) {
                skipMapIdleEventHandler = true;
              }

              geolocationMap.googleMap.setZoom(geolocationMap.settings.google_map_settings.zoom);

              Drupal.geolocation.drawAccuracyIndicator(newLocation, parseInt(position.coords.accuracy), geolocationMap.googleMap);

              if (
                typeof commonMapSettings.client_location.update_map !== 'undefined'
                && commonMapSettings.client_location.update_map === true
                && typeof commonMapSettings.dynamic_map !== 'undefined'
              ) {
                skipMapIdleEventHandler = true;
                geolocationMap.updateDrupalView(commonMapSettings.dynamic_map);
              }
            });
          }
        }

        /**
         * Result handling.
         */
        // A Google Maps API tool to re-center the map on its content.
        var bounds = new google.maps.LatLngBounds();
        Drupal.geolocation.removeMapMarker(geolocationMap);

        /*
         * Add the locations to the map.
         */
        mapWrapper.find('.geolocation-common-map-locations .geolocation').each(function (key, location) {

          /** @type {jQuery} */
          location = $(location);
          var position = new google.maps.LatLng(parseFloat(location.data('lat')), parseFloat(location.data('lng')));

          bounds.extend(position);

          /**
           * @type {GoogleMarkerSettings}
           */
          var markerConfig = {
            position: position,
            map: geolocationMap.googleMap,
            title: location.children('.location-title').html(),
            infoWindowContent: location.html(),
            infoWindowSolitary: true
          };

          if (typeof location.data('icon') !== 'undefined') {
            markerConfig.icon = location.data('icon');
          }

          if (typeof location.data('markerLabel') !== 'undefined') {
            markerConfig.label = location.data('markerLabel').toString();
          }

          var skipInfoWindow = false;
          if (commonMapSettings.markerScrollToResult === true) {
            skipInfoWindow = true;
          }

          var marker = Drupal.geolocation.setMapMarker(geolocationMap, markerConfig, skipInfoWindow);

          marker.addListener('click', function () {
            if (commonMapSettings.markerScrollToResult === true) {
              var target = $('[data-location-id="' + location.data('location-id') + '"]:visible').first();

              // Alternatively select by class.
              if (target.length === 0) {
                target = $('.geolocation-location-id-' + location.data('location-id') + ':visible').first();
              }

              if (target.length === 1) {
                $('html, body').animate({
                  scrollTop: target.offset().top
                }, 'slow');
              }
            }
          });
        });

        /**
         * Context popup handling.
         */
        if (
          typeof commonMapSettings.contextPopupContent !== 'undefined'
          && commonMapSettings.contextPopupContent.enable
        ) {

          /** @type {jQuery} */
          var contextContainer = jQuery('<div class="geolocation-context-popup"></div>');
          contextContainer.hide();
          contextContainer.appendTo(geolocationMap.container);

          /**
           * Gets the default settings for the Google Map.
           *
           * @param {GoogleMapLatLng} latLng - Coordinates.
           * @return {GoogleMapPoint} - Pixel offset against top left corner of map container.
           */
          geolocationMap.googleMap.fromLatLngToPixel = function (latLng) {
            var numTiles = 1 << geolocationMap.googleMap.getZoom();
            var projection = geolocationMap.googleMap.getProjection();
            var worldCoordinate = projection.fromLatLngToPoint(latLng);
            var pixelCoordinate = new google.maps.Point(
              worldCoordinate.x * numTiles,
              worldCoordinate.y * numTiles);

            var topLeft = new google.maps.LatLng(
              geolocationMap.googleMap.getBounds().getNorthEast().lat(),
              geolocationMap.googleMap.getBounds().getSouthWest().lng()
            );

            var topLeftWorldCoordinate = projection.fromLatLngToPoint(topLeft);
            var topLeftPixelCoordinate = new google.maps.Point(
              topLeftWorldCoordinate.x * numTiles,
              topLeftWorldCoordinate.y * numTiles);

            return new google.maps.Point(
              pixelCoordinate.x - topLeftPixelCoordinate.x,
              pixelCoordinate.y - topLeftPixelCoordinate.y
            );
          };

          google.maps.event.addListener(geolocationMap.googleMap, 'rightclick', function (event) {
            var content = Drupal.formatString(commonMapSettings.contextPopupContent.content, {
              '@lat': event.latLng.lat(),
              '@lng': event.latLng.lng()
            });

            contextContainer.html(content);

            if (content.length > 0) {
              var pos = geolocationMap.googleMap.fromLatLngToPixel(event.latLng);
              contextContainer.show();
              contextContainer.css('left', pos.x);
              contextContainer.css('top', pos.y);
            }
          });

          google.maps.event.addListener(geolocationMap.googleMap, 'click', function (event) {
            if (typeof contextContainer !== 'undefined') {
              contextContainer.hide();
            }
          });
        }

        /**
         * MarkerClusterer handling.
         */
        if (
          typeof commonMapSettings.markerClusterer !== 'undefined'
          && commonMapSettings.markerClusterer.enable
          && typeof MarkerClusterer !== 'undefined'
        ) {

          /* global MarkerClusterer */

          var imagePath = '';
          if (commonMapSettings.markerClusterer.imagePath) {
            imagePath = commonMapSettings.markerClusterer.imagePath;
          }
          else {
            imagePath = 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m';
          }

          var markerClustererStyles = '';
          if (typeof commonMapSettings.markerClusterer.styles !== 'undefined') {
            markerClustererStyles = commonMapSettings.markerClusterer.styles;
          }

          geolocationMap.markerClusterer = new MarkerClusterer(
            geolocationMap.googleMap,
            geolocationMap.mapMarkers,
            {
              imagePath: imagePath,
              styles: markerClustererStyles
            }
          );
        }

        if (mapWrapper.data('fitbounds') === 1) {
          // Fit map center and zoom to all currently loaded markers.
          skipMapIdleEventHandler = true;
          geolocationMap.googleMap.fitBounds(bounds);
        }
      }
    );
  }

  /**
   * Insert updated map contents into the document.
   *
   * ATTENTION: This is a straight ripoff from misc/ajax.js ~line 1017 insert() function.
   * Please read all code commentary there first!
   *
   * @param {Drupal.Ajax} ajax
   *   {@link Drupal.Ajax} object created by {@link Drupal.ajax}.
   * @param {object} response
   *   The response from the Ajax request.
   * @param {string} response.data
   *   The data to use with the jQuery method.
   * @param {string} [response.method]
   *   The jQuery DOM manipulation method to be used.
   * @param {string} [response.selector]
   *   A optional jQuery selector string.
   * @param {object} [response.settings]
   *   An optional array of settings that will be used.
   * @param {number} [status]
   *   The XMLHttpRequest status.
   */
  Drupal.AjaxCommands.prototype.geolocationCommonMapsUpdate = function (ajax, response, status) {
    // See function comment for code origin first before any changes!
    var $wrapper = response.selector ? $(response.selector) : $(ajax.wrapper);
    var settings = response.settings || ajax.settings || drupalSettings;

    var $new_content_wrapped = $('<div></div>').html(response.data);
    var $new_content = $new_content_wrapped.contents();

    if ($new_content.length !== 1 || $new_content.get(0).nodeType !== 1) {
      $new_content = $new_content.parent();
    }

    Drupal.detachBehaviors($wrapper.get(0), settings);

    // Retain existing map if possible, to avoid jumping and improve UX.
    if (
      $new_content.find('.geolocation-common-map-container').length > 0
      && $wrapper.find('.geolocation-common-map-container').length > 0
    ) {
      var detachedMap = $wrapper.find('.geolocation-common-map-container').first().detach();
      $new_content.find('.geolocation-common-map-container').first().replaceWith(detachedMap);
      $new_content.find('.geolocation-common-map').data('geolocation-ajax-processed', 1);
    }

    $wrapper.replaceWith($new_content);

    // Attach all JavaScript behaviors to the new content, if it was
    // successfully added to the page, this if statement allows
    // `#ajax['wrapper']` to be optional.
    if ($new_content.parents('html').length > 0) {
      // Apply any settings from the returned JSON if available.
      Drupal.attachBehaviors($new_content.get(0), settings);
    }
  };

})(jQuery, window, Drupal, drupalSettings);
;
