const form = document.getElementById("contact_form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  emailjs.sendForm("service_email_sylar", "temp_email_sylar", form).then(
    function () {
      alert("Your message has been sent, expect a reply soon ☺");
      form.reset();
    },
    function (error) {
      alert("There was a problem sending your email, try again ☹");
    }
  );
});
