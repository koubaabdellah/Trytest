$(function() {
  let slider = $('.image-slider'); // Slider
  let slides = slider.find('ul li'); // Navigation elements
  let media = slider.find('.image-slider-media'); // Plus button / Media button
  let icons = slider.find('.media-template .social-icons'); // Plus button / Media button
  let index = 0;
  let src = slider.find('#image').attr('src');

  slider.find('.image-slider-left').on('click', function() {
    prevSlide();
  });

  slider.find('.image-slider-right').on('click', function() {
    nextSlide();
  });

  media.on('click', function () {
    slider.find('.media-template').toggle();
    slider.find('.image-slider-media span').toggleClass('icon-sluiten');
    slider.find('.image-slider-media span').toggleClass('icon-openen');

    let plusIcon = slider.find('.image-slider-media span');
    if (plusIcon.hasClass('icon-openen')) {
      media.attr('aria-expanded', 'false');
    } else {
      media.attr('aria-expanded', 'true');
    }
  });

  slides.on('click', function(event) {
    setSlides($(event.target).parents('li').data('slide'));
  });

  let twitterTitle = $('.realestate-info-container h1').text();
  twitterTitle = twitterTitle.replace(/\s{2,}/g, ' ');

  let name = $('main h1').data('share-title');
  $('.icon-social-twitter').attr('href', 'https://twitter.com/share?text=' + name + '&url=' + (window.location.href + (window.location.href.indexOf('?') > 0 ? '&' : '?')) + 'img=0');
  $('.icon-social-linkedin').attr('href', 'https://www.linkedin.com/shareArticle?mini=true&title=' + name + '&url=' + (window.location.href + (window.location.href.indexOf('?') > 0 ? '&' : '?')) + 'img=0');

  //console.log(window.location.origin+src);
  //icons.find('.icon-social-twitter').attr('href', 'https://twitter.com/share?url=' + window.location.origin+src+'&text='+name);
  //icons.find('.icon-social-facebook').attr('href', 'https://www.facebook.com/sharer.php?u=' + window.location.origin + src);
  //icons.find('.icon-social-linkedin').attr('href', 'https://www.linkedin.com/shareArticle?mini=true&title=' + name + '&url=' + window.location.origin + src);
  //icons.find('.icon-social-googleplus').attr('href', 'https://plus.google.com/share?url=' + window.location.origin + src);
  //icons.find('.icon-social-thumblr').attr('href', 'https://www.tumblr.com/share/photo?source=' + window.location.origin + src + '&caption=' + name);
  

  function nextSlide() {
    if ((index + 1) >= slides.length) {
      index = 0;
    } else {
      index++;
    }

    setSlides(index);
  }

  function prevSlide() {
    if ((index - 1) < 0) {
      index = (slides.length - 1);
    } else {
      index--;
    }

    setSlides(index);
  }


  function setSlides(slideIndex) {
    for (let i = 0; i < slides.length; i++) {
      if (slides.eq(i).data('slide') == slideIndex) {
        let src = slides.eq(i).find('img').attr('src');

        slides.removeClass('current');
        slides.eq(i).addClass('current');

        if (src.indexOf('&height=') >= 0) {
          src = src.substring(0, src.indexOf('&height=')) + '&height=605&width=1076&mode=crop&fillColorHex=f3f4f5';
        }

        //console.log(src);
        slider.find('#image').attr('src', src);
        index = slideIndex;
        index = parseInt(index);

        slider.find('.image-slider-counter').text((index + 1) + '/' + slides.length);

        let name = $('main h1').data('share-title');

        if (parseInt(getUrlParameter('img')) > 0) {
          $('.icon-social-twitter').attr('href', 'https://twitter.com/share?text=' + name + '&url=' + window.location.href.substring(0, window.location.href.indexOf('?')) + '?img=' + index);
          $('.icon-social-linkedin').attr('href', 'https://www.linkedin.com/shareArticle?mini=true&title=' + name + '&url=' + window.location.href.substring(0, window.location.href.indexOf('?')) + '?img=' + index);
        }
        else {
          $('.icon-social-twitter').attr('href', 'https://twitter.com/share?text=' + name + '&url=' + (window.location.href + (window.location.href.indexOf('?') > 0 ? '&' : '?')) + 'img=' + index);
          $('.icon-social-linkedin').attr('href', 'https://www.linkedin.com/shareArticle?mini=true&title=' + name + '&url=' + (window.location.href + (window.location.href.indexOf('?') > 0 ? '&' : '?')) + 'img=' + index);
        }
      }
    }
  }

  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(location.href);

    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, '    '));
  };

  
  index = parseInt(getUrlParameter('img'));

  if (!index) {
    index = 0;
  }

  setSlides(index);

  slider.find('.image-slider-counter').text((parseInt(index) + 1) + '/' + slides.length);
});