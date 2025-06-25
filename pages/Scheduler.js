let currentDate = new Date();
let selectedDate = null;

window.onload = () => {
  renderCalendar();
  updateProfileName();
};

function toggleForm(value) {
  document.getElementById("client").classList.toggle("hidden", value !== "client");
  document.getElementById("others").classList.toggle("hidden", value !== "others");
  document.getElementById("thankYouMessage").classList.remove("show");
}

function changeMonth(offset) {
  currentDate.setMonth(currentDate.getMonth() + offset);
  renderCalendar();
}

function renderCalendar() {
  const calendarDates = document.getElementById("calendarDates");
  const monthLabel = document.getElementById("monthLabel");
  calendarDates.innerHTML = "";

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  monthLabel.textContent = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < firstDay; i++) {
    calendarDates.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateEl = document.createElement("div");
    dateEl.className = "calendar-date";
    dateEl.textContent = day;

    const dateToCheck = new Date(year, month, day);
    dateToCheck.setHours(0, 0, 0, 0);

    if (dateToCheck < today) {
      dateEl.classList.add("past-date");
      dateEl.style.pointerEvents = "none";
      dateEl.style.opacity = "0.4";
    } else {
      dateEl.onclick = () => {
        document.querySelectorAll(".calendar-date").forEach(el => el.classList.remove("selected"));
        dateEl.classList.add("selected");
        selectedDate = dateToCheck.toISOString().split('T')[0];
      };
    }

    calendarDates.appendChild(dateEl);
  }
}

function shwoThankYou() {
  const type = document.getElementById("apptType").value;
  const time = document.getElementById("timeSelect").value;
  const date = selectedDate;

  if (!date || !time) {
    alert("Please select a date and time.");
    return;
  }

  let data = {};
  if (type === "client") {
    const form = document.getElementById("client");
    const [name, phone, specifics] = form.querySelectorAll("input, select");
    data = {
      APT_NAME: name.value.trim(),
      APT_APPOINTEE: "-",
      APT_EMAIL: "-",
      APT_PHONE: phone.value.trim(),
      APT_IDENTIFICATION: "-",
      APT_SPECIFICS: specifics.value,
      APT_DATE: date,
      APT_TIME: time,
    };
  } else {
    const form = document.getElementById("others");
    const [patient, appointee, phone, idtype, , specifics] = form.querySelectorAll("input, select");
    data = {
      APT_NAME: patient.value.trim(),
      APT_APPOINTEE: appointee.value.trim(),
      APT_EMAIL: "-",
      APT_PHONE: phone.value.trim(),
      APT_IDENTIFICATION: idtype.value.trim(),
      APT_SPECIFICS: specifics.value,
      APT_DATE: date,
      APT_TIME: time,
    };
  }

  fetch("./appointment.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(response => {
      if (response.success) {
        document.getElementById("ticketNumber").textContent = response.ticket || Math.floor(Math.random() * 9000 + 1000);
        document.getElementById("thankYouOverlay").style.display = "flex";
      } else {
        alert("Failed to book appointment.");
      }
    })
    .catch(err => {
      console.error("Error:", err);
      alert("Error sending appointment.");
    });
}

function redirectBack() {
  window.location.href = "../index.html";
}


function updateProfileName() {
  const profileName = document.querySelector(".profile h3");
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const referrer = document.referrer;

  if (referrer.includes("guest.html")) {
    profileName.textContent = "Guest";
  } else if (loggedInUser && loggedInUser.name) {
    profileName.textContent = loggedInUser.name;
  } else {
    profileName.textContent = "Name Here";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const userName = localStorage.getItem("userName");
    const nameDisplay = document.getElementById("userDisplayName");

    console.log("Overwriting Name Here with:", userName);
    
    if (nameDisplay && userName) {
      nameDisplay.textContent = userName;
      nameDisplay.style.display = "block";
      nameDisplay.style.visibility = "visible";
      nameDisplay.style.color = "#000";
    }
  }, 100); 
});
