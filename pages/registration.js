document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const overlay = document.getElementById("services-overlay");
  const closeBtn = document.getElementById("closePopup");
  const patientIDDisplay = document.getElementById("patientID");
  const confirmation = document.getElementById("confirmation");

  // Show current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // --- Validation for required inputs excluding allergies and illnesses ---
    const requiredInputs = Array.from(form.querySelectorAll("input[required], select[required]"))
      .filter(input => input.name !== "allergies" && input.name !== "illnesses");

    let allRequiredFilled = true;

    for (const input of requiredInputs) {
      if (input.type === "radio") {
        const radios = form.querySelectorAll(`input[name="${input.name}"]`);
        const anyChecked = [...radios].some(radio => radio.checked);
        if (!anyChecked) {
          allRequiredFilled = false;
          break;
        }
      } else if (input.type === "checkbox") {
        if (!input.checked) {
          allRequiredFilled = false;
          break;
        }
      } else {
        if (!input.value || input.value.trim() === "") {
          allRequiredFilled = false;
          break;
        }
      }
    }

    if (!allRequiredFilled) {
      // alert("Please fill in all required fields.");  <-- removed alert here
      return; // stop submit silently
    }

    // --- Optional Email validation if email field exists ---
    const emailField = form.querySelector("#email");
    if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      alert("Invalid email address format.");
      return;
    }

    // --- Optional Phone validation if contact number field exists ---
    const phoneField = form.querySelector("#ContactNo");
    if (phoneField && !/^(09|\+639)\d{9}$/.test(phoneField.value)) {
      alert("Invalid Philippine contact number format.");
      return;
    }

    // --- Collect form data ---
    const formData = new FormData(form);
    const dataObj = {};

    ["patientName", "age", "weight", "height", "dob", "other_allergies", "other_illnesses"].forEach(field => {
      dataObj[field] = formData.get(field) || "";
    });

    // Collect allergies (multiple)
    dataObj.allergies = [];
    form.querySelectorAll('input[name="allergies"]:checked').forEach(cb => {
      dataObj.allergies.push(cb.value);
    });

    // Collect illnesses (multiple)
    dataObj.illnesses = [];
    form.querySelectorAll('input[name="illnesses"]:checked').forEach(cb => {
      dataObj.illnesses.push(cb.value);
    });

    // Generate unique patient ID
    dataObj.id = "MHIS-" + Math.floor(100000 + Math.random() * 900000);

    // Save data to localStorage
    let patients = JSON.parse(localStorage.getItem("patients") || "[]");
    patients.push(dataObj);
    localStorage.setItem("patients", JSON.stringify(patients));

    // Show patient ID in popup
    if (patientIDDisplay) {
      patientIDDisplay.textContent = dataObj.id;
    }

    // Hide form, show confirmation and overlay
    form.style.display = "none";
    if (confirmation) {
      confirmation.style.display = "block";
    }
    if (overlay) {
      overlay.style.display = "flex";
    }

    // Reset form (optional here because form is hidden)
    form.reset();
  });

  // Popup close button: redirect based on referrer
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const referrer = document.referrer;
    if (referrer.endsWith("guest.html")) {
      window.location.href = "./guest.html";
    } else {
      window.location.href = "./homepage.html";
    }
  });
});

document.querySelector(".container").addEventListener("click", function (e) {
  e.preventDefault();
  const referrer = document.referrer;

  if (referrer.endsWith("guest.html")) {
    window.location.href = "./guest.html";
  } else {
    window.location.href = "./homepage.html";
  }
});
