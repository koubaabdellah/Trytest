/**
 * @file
 * JS code to manage notification bar.
 */

(function ($) {
  /**
   * Do not display any notifications wich are hidden by the user.
   */
  Drupal.behaviors.notificationBarPreventDisplay = {
    attach(context) {
      const notification = context.getElementById("block-block-10");

      if (notification && notification !== null) {
        const lcKey = "mrce_notification";
        if (
          localStorage.getItem(lcKey) &&
          localStorage.getItem(lcKey) > Date.now() - 86400000
        ) {
          notification.style.display = "none";
          const animationEvent = new Event("notification_bar.close");
          window.dispatchEvent(animationEvent);
        } else {
          notification.style.display = "block";
          const animationEvent = new Event("notification_bar.open");
          window.dispatchEvent(animationEvent);
        }
      }
    },
  };

  /**
   * Hide notifications when the users clicks the close button.
   */
  Drupal.behaviors.notificationBarClose = {
    attach(context) {
      const notification = context.getElementById("block-block-10");
      if (notification && notification !== null) {
        const closeTrigger = notification.querySelector("button");
        const lcKey = "mrce_notification";

        closeTrigger.addEventListener("click", function () {
          localStorage.setItem(lcKey, Date.now());

          setTimeout(function () {
            notification.remove();
            const animationEvent = new Event("notification_bar.close");
            window.dispatchEvent(animationEvent);
          }, 200);
        });
      }
    },
  };
})(jQuery);
