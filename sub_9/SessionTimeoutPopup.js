function EnableSessionTimeoutPopup(sessionTimeout, messageFormat) {
  if (sessionTimeout >= 2) { // Require at least one minute until popup appears, then another for the user to click the button
    var minutesRemaining = Math.max(1, Math.round(Math.min(5, sessionTimeout / 5))); // Nag at least 1, at most 5 minutes in advance
    var showPopupMinutes = sessionTimeout - minutesRemaining;

    setTimeout(function () {
      var dateTime = new Date();
      dateTime.setMinutes(dateTime.getMinutes() + minutesRemaining);

      // Replace placeholders by actual values
      var message = messageFormat.replace("{minutesInactive}", showPopupMinutes).replace("{confirmBefore}", dateTime.toLocaleTimeString());
      alert(message);

      if (new Date() < dateTime) { // User clicked in time
        jQuery.get(window.location.href); // Extend session by touching server
        EnableSessionTimeoutPopup(sessionTimeout, messageFormat); // Show a new dialog when the session is about to expire next time
      }
    }
    , showPopupMinutes * 1000 * 60);
  }
}
