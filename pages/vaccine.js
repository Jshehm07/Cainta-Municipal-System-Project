document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("Vax-form");
  const downloadBtn = document.getElementById("downloadBtn");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const data = {
        VACCINE_F_NAME: document.getElementById("fname").value.trim(),
        VACCINE_L_NAME: document.getElementById("lname").value.trim(),
        VACCINE_AGE: parseInt(document.getElementById("age").value),
        VACCINE_V_NAME: document.getElementById("nameV").value, 
        VACCINE_F_DOSE: document.getElementById("firstD").checked
          ? document.getElementById("dateV1").value
          : null,
        VACCINE_S_DOSE: document.getElementById("secondD").checked
          ? document.getElementById("dateV2").value
          : null,
      };

      fetch("./vaccine.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.success) {
            alert("Vaccine record submitted successfully.");
            form.reset();
          } else {
            alert("Error: " + response.message);
          }
        })
        .catch((err) => {
          console.error("Error:", err);
          alert("Submission failed.");
        });
    });
  }

  if (downloadBtn) {
  downloadBtn.addEventListener("click", () => {
    const fname = document.getElementById("fname").value.trim();
    const lname = document.getElementById("lname").value.trim();

    if (!fname || !lname) {
      alert("Please enter First Name and Last Name to search for record.");
      return;
    }

    fetch(
      `./vaccine_lookup.php?fname=${encodeURIComponent(fname)}&lname=${encodeURIComponent(lname)}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.record) {
          localStorage.setItem("vaxRecord", JSON.stringify(data.record));
          window.open("./vaccert.html", "_blank");
        } else {
          alert("No matching vaccine record found.");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error checking vaccine record.");
      });
  });
}});