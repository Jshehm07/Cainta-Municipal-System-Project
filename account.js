const user = {
  id: localStorage.getItem("userId"),
  type: localStorage.getItem("userType"),
  name: localStorage.getItem("userName"),
  email: localStorage.getItem("userEmail"),
  role: localStorage.getItem("userRole"),
  password: localStorage.getItem("userPassword")
};

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("accountName").textContent = user.name || "---";
  document.getElementById("accountEmail").textContent = user.email || "---";
  document.getElementById("accountPassword").textContent = "*****";

  if (user.type === "staff") {
    document.getElementById("roleRow").style.display = "flex";
    document.getElementById("accountRole").textContent = user.role || "---";
  }
});

function editField(field) {
  const fieldId = "account" + capitalize(field);
  const span = document.getElementById(fieldId);
  const oldValue = field === "password" ? user.password : user[field];

  const input = document.createElement("input");
  input.type = field === "password" ? "password" : "text";
  input.value = oldValue;
  input.id = fieldId;

  span.replaceWith(input);

  const button = event.target;
  button.textContent = "Save";

  button.onclick = () => {
    const newValue = input.value.trim();
    if (!newValue) return alert("Value cannot be empty.");

    console.log("Sending update:", {
      id: user.id,
      type: user.type,
      field,
      value: newValue
    });

    fetch("update-account.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: parseInt(user.id),  
        type: user.type,
        field,
        value: newValue
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          user[field] = newValue;
          localStorage.setItem("user" + capitalize(field), newValue);

          const newSpan = createSpan(fieldId, field === "password" ? "*****" : newValue);
          input.replaceWith(newSpan);
          button.textContent = "Edit";
          button.onclick = () => editField(field);

          alert("Update successful.");
        } else {
          alert("Update failed: " + data.message);
        }
      })
      .catch(err => {
        console.error(err);
        alert("Failed to connect to server.");
      });
  };
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function createSpan(id, text) {
  const span = document.createElement("span");
  span.id = id;
  span.textContent = text;
  return span;
}
