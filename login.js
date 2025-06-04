let currentMode = "login";
let currentUserType = "citizen";

function toggleForm(userType) {
  currentMode = "register";
  currentUserType = userType;

  document.getElementById("formTitle").textContent = "Register";
  document.getElementById("submitBtn").textContent = "Register";

  document.getElementById("nameField").classList.remove("hidden");
  document.getElementById("confirmPasswordField").classList.remove("hidden");
  document.getElementById("roleField").classList.add("hidden");
  document.getElementById("forgotPassword").classList.add("hidden");

  document.getElementById("switchLinks").innerHTML = `
    <a href="#" onclick="toggleBack()">Back to Login</a>
  `;
}

function toggleBack() {
  currentMode = "login";

  document.getElementById("formTitle").textContent = "Log In";
  document.getElementById("submitBtn").textContent = "Log In";

  document.getElementById("nameField").classList.add("hidden");
  document.getElementById("confirmPasswordField").classList.add("hidden");
  document.getElementById("roleField").classList.remove("hidden");
  document.getElementById("forgotPassword").classList.remove("hidden");

  document.getElementById("switchLinks").innerHTML = `
    <a href="#" onclick="toggleForm('staff')">Register as Staff</a> |
    <a href="#" onclick="toggleForm('citizen')">Register as Citizen</a>
  `;
}

document.getElementById("authForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (currentMode === "register") {
    const name = document.getElementById("name").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    if (users.find(user => user.email === email)) {
      alert("Email already registered.");
      return;
    }

    users.push({ name, email, password, role: currentUserType });
    localStorage.setItem("registeredUsers", JSON.stringify(users));

    alert("Registered successfully. You can now log in.");
    toggleBack();
    return;
  }

  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

  const matchedUser = users.find(user => user.email === email && user.password === password);

  if (matchedUser) {
    localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));

    if (matchedUser.role === "staff") {
      window.location.href = "./pages/records.html";
    } else {
      window.location.href = "./pages/homepage.html";
    }
  } else {
    alert("Invalid email or password.");
  }
});

document.getElementById("viewGuest").addEventListener("click", () => {
  window.location.href = "./pages/guest.html";
});
