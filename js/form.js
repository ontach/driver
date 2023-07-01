"use strict";

//! Loading screen progress bar animation
document.querySelectorAll(".percent-done").forEach((element) => {
   element.style.width = "100%";
});
document.querySelector(".figures").style.display = "none";
document.body.style.overflowY = "hidden";
window.scrollTo(0, 0);

setTimeout(() => {
   document.querySelector(".figures").style.display = "block";
}, 1000);

setTimeout(() => {
   document.body.style.overflowY = "visible";
   document.querySelector(".loading").style.display = "none";
   document.querySelector("button.back-btn").style.opacity = "1";
   document.querySelector("button.back-btn").style.pointerEvents = "all";
}, 3000);

//! Animate blobs
const tween1 = KUTE.fromTo(
   ".blob-path-1",
   { path: ".blob-path-1" },
   { path: ".blob-path-2" },
   { repeat: 999, duration: 4000, yoyo: true }
);

const tween2 = KUTE.fromTo(
   ".blob-path-3",
   { path: ".blob-path-3" },
   { path: ".blob-path-4" },
   { repeat: 999, duration: 4000, yoyo: true }
);

tween1.start();
tween2.start();

//! Form change checkbox on click
function activeOnClick(el) {
   document.querySelector(el).classList.toggle("active");
}

//! Activate checkbox and open policy modal window (2 in 1)
function activateCheckboxAndOpenPolicy() {
   activeOnClick(".form-checkbox-label-2");
   policyOpenedCheck(".form-checkbox-label-2");
}

// Modal alert
const modalAlert = document.querySelector(".modal-alert");

// Back to index.html function
function backToIndex() {
   window.location.href = "../index.html";
}

//! Check if form is correct/send emails thru EmailJS
function sendMail() {
   const form = document.querySelector(".form > .container");

   const name = form.querySelector(".input.name input");
   const phone = form.querySelector(".input.phone input");
   const email = form.querySelector(".input.email input");
   const content = form.querySelector(".input.content textarea");

   const checkboxes = Array.from(
      form.querySelectorAll(".submitting .agreement label")
   );

   const requiredInputs = [name, phone, email, content];
   const requiredCheckboxes = checkboxes.slice(0, 2);

   const isFormValid =
      requiredInputs.every((input) => input.value) &&
      requiredCheckboxes.every((checkbox) =>
         checkbox.classList.contains("active")
      );

   function activeModal(title) {
      modalAlert.querySelector("p").textContent = title;
      modalAlert.showModal();
   }

   if (
      isFormValid &&
      name.value.length <= 64 &&
      phone.value.length <= 15 &&
      phone.value.length >= 7 &&
      email.value.length <= 256 &&
      content.value.length <= 500
   ) {
      let params = {
         from_name: name.value,
         phone: phone.value,
         email: email.value,
         tresc: content.value,
         reply_to: email.value,
      };

      emailjs.send("Super", "template_okq09ws", params).then(function (res) {
         activeModal("Wysłano! ✅");
         modalAlert.style.color = "#51ea32";
         modalAlert.style.borderColor = "#51ea32";
         modalAlert.querySelector("img").addEventListener("click", backToIndex);

         document.onclick = function (e) {
            if (e.target.classList.contains("modal-alert")) {
               backToIndex();
            }
         };
      });
   } else if (!checkboxes[0].classList.contains("active")) {
      activeModal("Musisz być pełnoletni!");
   } else if (!checkboxes[1].classList.contains("active")) {
      activeModal("Musisz zaakceptować regulamin!");
   } else {
      activeModal("Musisz wypełnić formularz poprawnie");
   }
}

//! Form modal windows
function policyOpenedCheck() {
   const policyText = document.querySelector(
      ".form .submitting .agreement:nth-child(2) h6"
   );

   if (!policyText.classList.contains("opened-policy")) {
      policyText.classList.add("opened-policy");
      document.querySelector(".policy").showModal();
   }
}

//! Change modal alerts close buttons appearance on hover
const closeButton = document.querySelector(".modal-alert .close-btn");

closeButton.addEventListener("mouseover", () => {
   closeButton.src = "../img/close-modal-icon-hover.svg";
});

closeButton.addEventListener("mouseout", () => {
   closeButton.src = "../img/close-modal-icon.svg";
});

//! Close modal alerts when clicked outside
document.onclick = function (e) {
   if (e.target.classList.contains("modal-alert")) {
      document.querySelector(".modal-alert").close();
   }
};

//! Change form title on smaller devices
function myFunction(media850px) {
   if (media850px.matches) {
      document.querySelector(".form > h3").textContent = "Zapisz się!";
   } else {
      document.querySelector(".form > h3").textContent =
         "Wyślij nam wiadomość!";
   }
}

let media850px = window.matchMedia("(max-width: 850px)");
myFunction(media850px);
media850px.addListener(myFunction);

//! Back to index.html button
document
   .querySelector("button.back-btn")
   .addEventListener("click", backToIndex);
