document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const overlay = document.getElementById("services-overlay");
    const patientID = document.getElementById("patientID");
    const closePopup = document.getElementById("closePopup");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("patientName").value;
        const age = document.getElementById("age").value;
        const weight = document.getElementById("weight").value;
        const height = document.getElementById("height").value;
        const dob = document.getElementById("dob").value;

        const allergiesChecked = [...form.querySelectorAll('input[name="allergies"]:checked')].map(input => input.value);
        const otherAllergies = form.querySelector('input[name="other_allergies"]').value.trim();
        if (otherAllergies) allergiesChecked.push(otherAllergies);
        const allergies = allergiesChecked.join(", ");

        const illnessesChecked = [...form.querySelectorAll('input[name="illnesses"]:checked')].map(input => input.value);
        const otherIllnesses = form.querySelector('input[name="other_illnesses"]').value.trim();
        if (otherIllnesses) illnessesChecked.push(otherIllnesses);
        const illnesses = illnessesChecked.join(", ");

        const data = {
            patientName: name,
            age,
            weight,
            height,
            dob,
            allergies,
            illnesses
        };

        fetch("./patient.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(response => {
            if (response.success) {
                patientID.textContent = response.patient_id;
                overlay.style.display = "flex";
                form.reset();
            } else {
                alert("Error: " + response.message);
            }
        })
        .catch(err => {
            console.error("Fetch error:", err);
            alert("Submission failed.");
        });
    });

    closePopup.addEventListener("click", () => {
        overlay.style.display = "none";
    });
});
