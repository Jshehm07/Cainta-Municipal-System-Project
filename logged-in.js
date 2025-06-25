window.addEventListener("DOMContentLoaded", () => {
  const loginStatus = localStorage.getItem("loginStatus");

  const showOnLog = document.querySelectorAll(".showOnLog");
  const hideOnLog = document.querySelectorAll(".hideOnLog");

  if (loginStatus === "loggedIn") {
    showOnLog.forEach(el => el.style.display = "inline-block");
    hideOnLog.forEach(el => el.style.display = "none");
  } else {
    showOnLog.forEach(el => el.style.display = "none");
    hideOnLog.forEach(el => el.style.display = "inline-block");
  }

  document.querySelectorAll(".log.showOnLog").forEach(el => {
    el.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "../index.html";
    });
  });
});