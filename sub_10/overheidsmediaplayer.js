(function ($, Drupal) {
  'use strict';
  $.fn.createPlayer = function (options) {
    var defaults = {
      txt: [],
      onready: function (element) {},
    };

    var settings = $.extend({}, defaults, options);

    return this.each(function () {
      var $player = $(this);
      var $video = $player.find("video");
      var $audio = $player.find("audio");

      function getTextLabels() {
        $player.settings.txt.play = $video.attr("data-playtxt") || "Afspelen";
        $player.settings.txt.pauze = $video.attr("data-pauzetxt") || "Pauzeer";
        $player.settings.txt.enableAd =
          $video.attr("data-enablead") || "Audio descriptie afspelen";
        $player.settings.txt.disableAd =
          $video.attr("data-disablead") || "Audio descriptie stoppen";
        $player.settings.txt.enableCc =
          $video.attr("data-enablecc") || "Ondertiteling aan";
        $player.settings.txt.disableCc =
          $video.attr("data-disablecc") || "Ondertiteling uit";
        $player.settings.txt.volumeOn =
          $video.attr("data-enablevolume") || "Geluid aan";
        $player.settings.txt.volumeOff =
          $video.attr("data-disablevolume") || "Geluid uit";
        $player.settings.txt.enableFullscreen =
          $video.attr("data-enablefullscreen") ||
          "Schermvullende weergave openen";
        $player.settings.txt.disableFullscreen =
          $video.attr("data-disablefullscreen") ||
          "Schermvullende weergave sluiten";
      }

      function initControlLabels(MediaElement) {
        $player.settings.playButton = $player.find(
          ".mejs__playpause-button button"
        );
        $player.settings.adButton = $player.find(
          ".mejs__audiodescription-button button"
        );
        $player.settings.subButton = $player.find(
          ".mejs__captions-button button"
        );
        $player.settings.volButton = $player.find(".mejs__volume-button button");
        $player.settings.fullscreenButton = $player.find(
          ".mejs__fullscreen-button button"
        );

        togglePlayBtnTxt();
        toggleAdBtnTxt();
        toggleCcBtnTxt();
        toggleVolBtnTxt();
        toggleFullscreenBtnTxt();

        MediaElement.addEventListener(
          "play",
          function () {
            togglePlayBtnTxt();
          },
          false
        );
        MediaElement.addEventListener(
          "playing",
          function () {
            togglePlayBtnTxt();
          },
          false
        );
        MediaElement.addEventListener(
          "pause",
          function () {
            togglePlayBtnTxt();
          },
          false
        );

        $player.settings.adButton.on("click", function () {
          toggleAdBtnTxt();
        });

        $player.settings.subButton.on("click", function () {
          toggleCcBtnTxt();
        });

        $player.settings.volButton.on("click", function () {
          toggleVolBtnTxt();
        });

        $player.settings.fullscreenButton.on("click", function () {
          toggleFullscreenBtnTxt();
        });
      }

      function togglePlayBtnTxt() {
        if ($player.settings.playButton.parent().hasClass("mejs__play")) {
          $player.settings.playButton.attr({
            title: $player.settings.txt.play,
            "aria-label": $player.settings.txt.play,
          });
          $player.settings.playButton.html($player.settings.txt.play);
        } else {
          $player.settings.playButton.attr({
            title: $player.settings.txt.pauze,
            "aria-label": $player.settings.txt.pauze,
          });
          $player.settings.playButton.html($player.settings.txt.pauze);
        }
      }

      function toggleAdBtnTxt() {
        if ($player.settings.adButton.hasClass("inactive")) {
          $player.settings.adButton.removeClass("inactive");
          $player.settings.adButton.attr({
            title: $player.settings.txt.disableAd,
            "aria-label": $player.settings.txt.disableAd,
          });
          $player.settings.adButton.html($player.settings.txt.disableAd);
        } else {
          $player.settings.adButton.addClass("inactive");
          $player.settings.adButton.attr({
            title: $player.settings.txt.enableAd,
            "aria-label": $player.settings.txt.enableAd,
          });
          $player.settings.adButton.html($player.settings.txt.enableAd);
        }
      }

      function toggleCcBtnTxt() {
        if ($player.settings.subButton.hasClass("inactive")) {
          $player.settings.subButton.removeClass("inactive");
          $player.settings.subButton.attr({
            title: $player.settings.txt.disableCc,
            "aria-label": $player.settings.txt.disableCc,
          });
          $player.settings.subButton.html($player.settings.txt.disableCc);
        } else {
          $player.settings.subButton.addClass("inactive");
          $player.settings.subButton.attr({
            title: $player.settings.txt.enableCc,
            "aria-label": $player.settings.txt.enableCc,
          });
          $player.settings.subButton.html($player.settings.txt.enableCc);
        }
      }

      function toggleVolBtnTxt() {
        if ($player.settings.volButton.hasClass("inactive")) {
          $player.settings.volButton.removeClass("inactive");
          $player.settings.volButton.attr({
            title: $player.settings.txt.volumeOn,
            "aria-label": $player.settings.txt.volumeOn,
          });
          $player.settings.volButton.html($player.settings.txt.volumeOn);
        } else {
          $player.settings.volButton.addClass("inactive");
          $player.settings.volButton.attr({
            title: $player.settings.txt.volumeOff,
            "aria-label": $player.settings.txt.volumeOff,
          });
          $player.settings.volButton.html($player.settings.txt.volumeOff);
        }
      }

      function toggleFullscreenBtnTxt() {
        if ($player.settings.fullscreenButton.hasClass("fullscreen")) {
          $player.settings.fullscreenButton.attr({
            title: $player.settings.txt.disableFullscreen,
            "aria-label": $player.settings.txt.disableFullscreen,
          });
          $player.settings.fullscreenButton.html(
            $player.settings.txt.disableFullscreen
          );
          $player.settings.fullscreenButton.removeClass("fullscreen");
        } else {
          $player.settings.fullscreenButton.attr({
            title: $player.settings.txt.enableFullscreen,
            "aria-label": $player.settings.txt.enableFullscreen,
          });
          $player.settings.fullscreenButton.html(
            $player.settings.txt.enableFullscreen
          );
          $player.settings.fullscreenButton.addClass("fullscreen");
        }
      }

      function setPlayerType() {
        if ($player.find("embed").length > 0) {
          $player.addClass("flash");
        }
      }

      function createVideoPlayer() {
        var playerWidth = -1;
        var playerHeight = -1;

        $video.mediaelementplayer({
          enableAutosize: true,
          videoWidth: playerWidth,
          videoHeight: playerHeight,
          mode: "auto",
          poster: $video.attr("data-poster"),
          features: [
            "playpause",
            "current",
            "progress",
            "duration",
            "volume",
            "tracks",
            "audiodescription",
            "fullscreen",
          ],
          adFile: $video.data("ad"),
          alwaysShowControls: true,
          toggleCaptionsButtonWhenOnlyOne: true,
          success: function (MediaElement) {
            initControlLabels(MediaElement);
            setPlayerType();
            $player.settings.onready.call(this, MediaElement);
          },
        });
      }

      function createStreamingVideoPlayer() {
        var playerWidth = -1;
        var playerHeight = -1;

        $video.mediaelementplayer({
          enableAutosize: true,
          videoWidth: playerWidth,
          videoHeight: playerHeight,
          mode: "auto",
          features: ["playpause", "volume", "fullscreen"],
          type: "application/x-mpegURL",
          alwaysShowControls: true,
          success: function (MediaElement) {
            initControlLabels(MediaElement);
            setPlayerType();
          },
          error: function () {
            $player.html($video.attr("data-noplugintxt"));
          },
        });
      }

      function createAudioPlayer() {
        var playerWidth = -1;
        var playerHeight = -1;

        $audio.mediaelementplayer({
          enableAutosize: true,
          videoWidth: playerWidth,
          videoHeight: playerHeight,
          mode: "auto",
          features: ["playpause", "current", "progress", "duration", "volume"],
          alwaysShowControls: true,
          success: function (MediaElement) {
            initControlLabels(MediaElement);
          },
        });
      }

      function init() {
        $player.settings = settings;

        // Get language of webpage
        const language = document
          .getElementsByTagName("html")[0]
          .getAttribute("lang");
          // .split("-")[0];
        // Set language of mediaplayer
        mejs.i18n.language(language);

        getTextLabels();
        if ($video.length > 0) {
          if ($player.hasClass("streaming")) {
            createStreamingVideoPlayer();
          } else {
            createVideoPlayer();
            $player
              .find(".collapsiblePanels")
              .find(".panel")
              .createCollapsePanel();
          }
        } else if ($audio.length > 0) {
          createAudioPlayer();
          $player.find(".collapsiblePanels").find(".panel").createCollapsePanel();
        }
      }

      init();
    });
  };

  // Wrap createPlayer in each(function() {}) so all textchanges on all buttons will work at every video.
  $(".block-audio-video").each(function() {
    $(this).createPlayer();
  });
}) (jQuery, Drupal);
