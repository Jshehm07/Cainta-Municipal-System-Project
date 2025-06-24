function changeMap(hospital) {
  const map = document.getElementById("hospitalMap");
  const image = document.getElementById("hospitalImage");
  const buttons = document.querySelectorAll(".buttons button");

  const links = {
    cainta: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15445.320679144465!2d121.10925149678958!3d14.580252800000023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c70d0b0d5ff7%3A0xf0f2cc865a53e2a9!2sCainta%20Municipal%20Hospital%20-%20Main%20Entrance!5e0!3m2!1sen!2sph!4v1750661218382!5m2!1sen!2sph",
    ortigas: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.2323267509582!2d121.11786789999996!3d14.585833300000015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c7f6251d0083%3A0x71077596c355928c!2sOrtigas%20Hospital%20%26%20Healthcare%20Center%2C%20Inc.!5e0!3m2!1sen!2sph!4v1750661370170!5m2!1sen!2sph",
    metro: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.2891259326566!2d121.11406389999999!3d14.582593999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c79a34684977%3A0xc72a0d49769f9a9!2sMetro%20Rizal%20Doctors%20Hospital!5e0!3m2!1sen!2sph!4v1750661436089!5m2!1sen!2sph",
    medical: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.665592849959!2d121.09886999999998!3d14.6181161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b83edb9cbabf%3A0x73010e348aacce6e!2sThe%20Medical%20City%20Clinic!5e0!3m2!1sen!2sph!4v1750661489251!5m2!1sen!2sph"
  };


  const images = {
    cainta: "../images/cainta.jpg",
    ortigas: "../images/ortigas.webp",
    metro: "../images/metro.jpg",
    medical: "../images/medical.jpg"
  };

  map.src = links[hospital];
  image.src = images[hospital];

  buttons.forEach(btn => btn.classList.remove("active"));
  const clickedButton = Array.from(buttons).find(btn =>
    btn.textContent.toLowerCase().includes(hospital)
  );
  if (clickedButton) clickedButton.classList.add("active");
}
