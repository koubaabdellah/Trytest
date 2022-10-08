(function ($) {

  /**
   *
   */
   Drupal.behaviors.CKEditorJWPlayer = {
     attach: function(context) {
      $('.jwplayer-ckeditor').once('jwplayer-ckeditor').each(function() {
        jwplayerProcessCkElement($(this));
      });
      $('.jwplayer-ckeditor-audio').once('jwplayer-ckeditor').each(function() {
        jwplayerProcessCkElementAudio($(this));
      });
    }
  };

  /**
   *
   */
  window.jwplayerProcessCkElement = function($wrapper) {
    $video = $wrapper.find('video');
    var skin = $video.data('skin') || 'default';
    var base = Drupal.settings.ckeditor_jwplayer.base;
    var config = {
      'width': $video.attr('width'),
      'height': $video.attr('height'),
      'file': $video.data('file') || $video.find('source:eq(0)').attr('src'),
      'image': $video.data('image') || $video.attr('poster'),
      'skin': (skin != 'default' ? skin : null),
      'primary': $video.data('primary') || 'flash',
      'autostart': $video.data('autostart') || $video.attr('autoplay'),
      'base': base,
      'modes': [
        {'type': 'html5', 'src': base + 'jwplayer.html5.js'},
        {'type': 'flash', 'src': base + 'jwplayer.flash.swf'},
      ]
    };

    if ($video.data('hls') && $video.data('rtmp')) {
      config.sources = [
        {
          'file': $video.data('hls'),
          'default': true,
          'type': 'hls'
        },
        {
          'file': $video.data('rtmp'),
          'default': false,
          'type': 'rtmp'
        }
      ];
    };

    // If aspectratio is set. Set the with to 100% and add aspectratio attribute
    // To JWPlayer.
    if ($video.data('aspectratio')) {
      var aspectratio = $video.data('aspectratio');

      config.aspectratio = aspectratio;
      config.width = '100%';
      config.height = null;
    }

    config.events = {
      'onPlay': function() {
        $.each($('audio'), function () {
          this.pause();
         });
      }
    };
    if (!Drupal.settings.ckeditor_jw_player) {
      Drupal.settings.ckeditor_jw_player = {};
    }

    Drupal.settings.ckeditor_jw_player[$video.attr('id')] = config;
    window.jwplayer($video.attr('id')).setup(config);

    if (config.events) {
      $.each(config.events, function(event, callback) {
        jwplayer($video.attr('id'))[event](eval(callback));
      });
    };
  };

  /**
   * Process audio only jwplayer.
   */
  window.jwplayerProcessCkElementAudio = function($wrapper) {
    $audio = $wrapper.find('audio');
    var autoplay = $wrapper.parents('.js-hide').size() > 0 ? false : $wrapper.hasClass('autoplay');
    var skin = $audio.data('skin') || 'default';
    var base = Drupal.settings.ckeditor_jwplayer.base;
    var config = {
      'width': $audio.attr('width'),
      'height': $audio.attr('height'),
      'file': $audio.data('file') || $audio.find('source:eq(0)').attr('src'),
      'image': $audio.data('image') || $audio.attr('poster'),
      'skin': (skin != 'default' ? skin : null),
      'primary': $audio.data('primary') || 'flash',
      'autostart': autoplay,
      'base': base,
      'modes': [
        {'type': 'html5', 'src': base + 'jwplayer.html5.js'},
        {'type': 'flash', 'src': base + 'jwplayer.flash.swf'},
      ]
    };

    config.events = {
      'onPlay': function() {
        $.each($('audio'), function () {
          this.pause();
         });
      }
    };

    if (!Drupal.settings.ckeditor_jw_player) {
      Drupal.settings.ckeditor_jw_player = {};
    }

    Drupal.settings.ckeditor_jw_player[$audio.attr('id')] = config;
    window.jwplayer($audio.attr('id')).setup(config);

    if (config.events) {
      $.each(config.events, function(event, callback) {
        jwplayer($audio.attr('id'))[event](eval(callback));
      });
    };
  };
})(jQuery);
