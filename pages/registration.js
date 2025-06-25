document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const overlay = document.getElementById("services-overlay");
  const closeBtn = document.getElementById("closePopup");
  const patientIDDisplay = document.getElementById("patientID");
  const confirmation = document.getElementById("confirmation");

  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const requiredInputs = Array.from(
      form.querySelectorAll("input[required], select[required]")
    ).filter(
      (input) => input.name !== "allergies" && input.name !== "illnesses"
    );

    const allFilled = requiredInputs.every((input) => {
      if (input.type === "checkbox" || input.type === "radio") {
        return (
          form.querySelectorAll(`input[name="${input.name}"]:checked`).length > 0
        );
      }
      return input.value.trim() !== "";
    });

    if (!allFilled) return;

    const emailField = form.querySelector("#email");
    if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) return;

    const phoneField = form.querySelector("#ContactNo");
    if (phoneField && !/^(09|\+639)\d{9}$/.test(phoneField.value)) return;

    const formData = new FormData(form);

    const dob = formData.get("dob");
    if (!dob || !/^\d{4}-\d{2}-\d{2}$/.test(dob)) return;

    const dataObj = {
      patientName: formData.get("patientName"),
      age: formData.get("age"),
      weight: formData.get("weight"),
      height: formData.get("height"),
      dob: dob,
      other_allergies: formData.get("other_allergies") || "",
      other_illnesses: formData.get("other_illnesses") || "",
      allergies: [],
      illnesses: [],
    };

    form.querySelectorAll('input[name="allergies"]:checked').forEach((cb) => {
      dataObj.allergies.push(cb.value);
    });

    form.querySelectorAll('input[name="illnesses"]:checked').forEach((cb) => {
      dataObj.illnesses.push(cb.value);
    });

    fetch("./php/patient.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataObj),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Server response:", response);
        if (response.success) {
          patientIDDisplay.textContent = response.patient_id || "Unknown";
          confirmation.style.display = "block";
          overlay.style.display = "flex";
          form.style.display = "none";
          form.reset();
        } else {
          console.error("Server error:", response.message);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });

    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "../index.html";
    });
  });
});
