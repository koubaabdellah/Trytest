function ignore(event) {
  event.preventDefault();
}

function doit() {
  document.body.className += " p-legacy";
  const loginForm = document.getElementById("bb-login");
  loginForm && loginForm.addEventListener("submit", ignore);
}

function onload() {
  if (!("bb" in window)) {
    doit();
  }
}

document.addEventListener("DOMContentLoaded", onload);
