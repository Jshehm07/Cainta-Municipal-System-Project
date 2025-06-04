


let currentDate = new Date();
let selectedDate = null;


window.onload = function () {
  renderCalendar();
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

  
  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement("div");
    calendarDates.appendChild(blank);
  }


  for (let day = 1; day <= daysInMonth; day++) {
    const dateEl = document.createElement("div");
    dateEl.className = "calendar-date";
    dateEl.textContent = day;

    dateEl.onclick = function () {
      document.querySelectorAll(".calendar-date").forEach(el => el.classList.remove("selected"));
      dateEl.classList.add("selected");
      selectedDate = new Date(year, month, day);
    };

    calendarDates.appendChild(dateEl);
  }
}


function shwoThankYou() {
  const selectedTime = document.getElementById("timeSelect").value;
  const ticketNumber = document.getElementById("ticketNumber");
  const overlay = document.getElementById("thankYouOverlay");

  if (!selectedDate || !selectedTime) {
    alert("Please select a date and time for your appointment.");
    return;
  }

  const clientForm = document.getElementById("client");
  const othersForm = document.getElementById("others");
  const activeForm = !clientForm.classList.contains("hidden") ? clientForm : othersForm;

  const inputs = activeForm.querySelectorAll("input, select");
  for (let input of inputs) {
    if (!input.checkValidity()) {
      alert("Please complete all required fields correctly.");
      input.focus();
      return;
    }
  }

  const ticket = Math.floor(Math.random() * 9000 + 1000);
  ticketNumber.textContent = ticket;

  
  clientForm.classList.add("hidden");
  othersForm.classList.add("hidden");

  
  overlay.classList.add("show");
}

document.querySelector(".header").addEventListener("click", function (e) {
  e.preventDefault();
  const referrer = document.referrer;

  if (referrer.endsWith("guest.html")) {
    window.location.href = "./guest.html";
  } else {
    window.location.href = "./homepage.html";
  }
});

function shwoThankYou() {
  const apptType = document.getElementById("apptType").value;

  let appointment = {
    type: apptType,
    date: document.getElementById("monthLabel").textContent, // or selected date
    time: document.getElementById("timeSelect").value,
  };

  if (apptType === "client") {
    const form = document.getElementById("client");
    const [name, phone, spec] = form.querySelectorAll("input, select");
    appointment.name = name.value;
    appointment.phone = phone.value;
    appointment.specific = spec.value;
  } else {
    const form = document.getElementById("others");
    const [pName, aName, phone, idType, file, spec] = form.querySelectorAll("input, select");
    appointment.patientName = pName.value;
    appointment.appointeeName = aName.value;
    appointment.phone = phone.value;
    appointment.idType = idType.value;
    appointment.specific = spec.value;
  }

  // Save to localStorage
  const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
  appointments.push(appointment);
  localStorage.setItem("appointments", JSON.stringify(appointments));

  // Show thank you
  document.getElementById("thankYouOverlay").style.display = "flex";
  document.getElementById("ticketNumber").textContent = Math.floor(Math.random() * 10000);
}

function redirectBack() {
  const referrer = document.referrer;
  if (referrer.endsWith("guest.html")) {
    window.location.href = "./guest.html";
  } else {
    window.location.href = "./homepage.html";
  }
}


const profileName = document.querySelector('.profile h3');

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const referrer = document.referrer;

  function getFilename(url) {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  const previousPage = getFilename(referrer);

  if (previousPage === 'guest.html') {
    profileName.textContent = 'Guest';
  } else if (loggedInUser && loggedInUser.name) {
    profileName.textContent = loggedInUser.name;
  } else {
    profileName.textContent = 'Name Here';
  }