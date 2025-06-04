window.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const sidebar = document.getElementById("sidebar");
  const logout = document.getElementById("logout");
  const sidebarLinks = sidebar.querySelectorAll("a");

  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });

  logout.addEventListener("click", () => {
    window.location.href = "../index.html";
  });

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("active");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("services-overlay");
  const servicesBox = document.getElementById("services");
  const serviceLinks = document.querySelectorAll('a[href="#services"]');

  serviceLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      overlay.style.display = "flex";
    });
  });

  overlay.addEventListener("click", function (e) {
    if (!servicesBox.contains(e.target)) {
      overlay.style.display = "none";
    }
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const isGuest = localStorage.getItem("guestUser") === "true";

  if (isGuest) {
    const accountLink = document.getElementById("accountLink");
    const logoutBtn = document.getElementById("logout");

    if (accountLink) accountLink.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "none";
  }

  document.getElementById("logout")?.addEventListener("click", () => {
    localStorage.removeItem("guestUser");
    window.location.href = "../index.html";
  });
});