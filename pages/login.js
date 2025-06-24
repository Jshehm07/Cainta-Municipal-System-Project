let currentMode = "login";
let currentUserType = "citizen";

function toggleForm(userType) {
  currentMode = "register";
  currentUserType = userType;

  document.getElementById("formTitle").textContent =
    userType === "staff" ? "Register as Staff" : "Register as Citizen";
  document.getElementById("submitBtn").textContent = "Register";

  document.getElementById("nameField").classList.remove("hidden");
  document.getElementById("confirmPasswordField").classList.remove("hidden");
  document.getElementById("forgotPassword").classList.add("hidden");

  const roleField = document.getElementById("roleField");
  if (userType === "staff") {
    roleField.innerHTML = `
      <label for="role">Role</label>
      <select id="role">
        <option value="admin">Admin</option>
        <option value="clerk">Clerk</option>
        <option value="nurse">Nurse</option>
      </select>`;
  } else {
    roleField.innerHTML = "";
  }

  document.getElementById("switchLinks").innerHTML = `
    <a href="#" onclick="toggleBack()">Log in as Staff</a> | 
    <a href="#" onclick="toggleBack()">Log in as Citizen</a>
  `;
}

function toggleBack() {
  currentMode = "login";
  document.getElementById("formTitle").textContent = "Log In";
  document.getElementById("submitBtn").textContent = "Log In";

  document.getElementById("nameField").classList.add("hidden");
  document.getElementById("confirmPasswordField").classList.add("hidden");
  document.getElementById("forgotPassword").classList.remove("hidden");

  document.getElementById("roleField").innerHTML = `
    <label for="role">Login As:</label>
    <select id="role" name="role">
      <option value="staff">Staff</option>
      <option value="citizen">Citizen</option>
    </select>`;

  document.getElementById("switchLinks").innerHTML = `
    <a href="#" onclick="toggleForm('staff')">Register as Staff</a> |
    <a href="#" onclick="toggleForm('citizen')">Register as Citizen</a>
  `;
}

document.getElementById("authForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (currentMode === "login") {
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    const roleSelect = document.getElementById("role").value;

    fetch("./login_user.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role: roleSelect }),
    })
      .then((res) => res.json())
      .then((data) => {
          if (data.success) {
            localStorage.setItem("loginStatus", "loggedIn");
            localStorage.setItem("userId", data.id);  
            localStorage.setItem("userType", data.type);
            localStorage.setItem("userName", data.name);
            localStorage.setItem("userEmail", data.email);
            localStorage.setItem("userPassword", data.password);


          if (data.type === "staff") {
            localStorage.setItem("userRole", data.role);
            window.location.href = "../admin/staff.html";
          } else {
            window.location.href = "../index.html";
          }
        } else {
          alert("Login failed: " + data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to connect to server.");
      });

    return;
  }

  if (currentMode === "register") {
    const name = document.getElementById("name").value.trim();
    const confirmPassword = document
      .getElementById("confirmPassword")
      .value.trim();

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (currentUserType === "staff") {
      const role = document.getElementById("role").value;

      fetch("./register_staff.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert(data.message);
            toggleBack();
          } else {
            alert("Error: " + data.message);
          }
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to connect to server.");
        });

      return;
    }

    fetch("./register_citizen.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          toggleBack();
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to connect to server.");
      });

    return;
  }
});

document.getElementById("viewGuest").addEventListener("click", () => {
  localStorage.setItem("loginStatus", "guest");
  window.location.href = "../index.html";
});
