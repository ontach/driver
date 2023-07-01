"use strict";

//! Loading screen progress bar animation
document.querySelectorAll(".percent-done").forEach((element) => {
   element.style.width = "100%";
});
document.body.style.overflowY = "hidden";
window.scrollTo(0, 0);
setTimeout(() => {
   document.body.style.overflowY = "visible";
   document.querySelector(".loading").style.display = "none";
}, 3000);

//! Hamburger menu
const hamburgerMenuBtn = document.querySelector(".hamburger-menu-btn");
const navContainer = document.querySelector(".nav-container");

hamburgerMenuBtn.addEventListener("click", () => {
   hamburgerMenuBtn.classList.toggle("active");
   navContainer.classList.toggle("active");
});

//! Scroll to top navigation button
document.querySelector(".scroll-top-btn").addEventListener("click", () => {
   window.scrollTo(0, 0);
});

// Hide the menu when clicking outside
document.onclick = function (e) {
   if (
      !e.target.classList.contains("hamburger-menu-btn") &&
      !e.target.classList.contains("nav-container") &&
      !e.target.classList.contains("hamburger-span")
   ) {
      hamburgerMenuBtn.classList.remove("active");
      navContainer.classList.remove("active");
   }

   if (e.target.classList.contains("policy-alert")) {
      document.querySelector(".policy-alert").close();
   }
};

//! Image slider with SwiperJS
const swiper = new Swiper(".swiper", {
   autoplay: {
      delay: 5000,
      disableOnInteraction: false,
   },
   loop: true,
   pagination: {
      el: ".swiper-pagination",
      clickable: true,
   },
   navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
   },
});

//! Expanding about section cards
const abtImg = document.querySelectorAll(".abt-div > img");
const abtHeading = document.querySelectorAll(".abt-div > h3");
const abtParagraph = document.querySelectorAll(".abt-div > p");
const abtDiv = document.querySelectorAll(".abt-div");

const toggleClasses = function (e1, e2, e3) {
   const elements = [e1, e2, e3];

   elements.forEach((element) => {
      element.classList.toggle("active");
   });
};

const aboutExpandCard = function (e1, e2, e3, e4) {
   e1.addEventListener("click", () => {
      toggleClasses(e2, e3, e4);
   });
};

for (let i = 0; i <= 2; i++) {
   aboutExpandCard(abtDiv[i], abtImg[i], abtHeading[i], abtParagraph[i]);
}

//! Open a link in new tab (for elements that aren't <a> links)
const openLink = function (url) {
   window.open(url, "_blank").focus();
};

//! Contact email copy to clipboard & show tooltip
const contactTooltip = document.querySelector("#contact .direct .tooltip");

const contactEmail = function () {
   contactTooltip.classList.add("active");

   const stringToCopy = "Your string to copy";
   navigator.clipboard
      .writeText(stringToCopy)
      .then(() => {
         console.log("String copied to clipboard:", stringToCopy);
      })
      .catch((error) => {
         console.error("Failed to copy string to clipboard:", error);
      });

   setTimeout(function () {
      contactTooltip.classList.remove("active");
   }, 3000);
};

//! Navbar hiding when scrolling down
const navbar = document.querySelector("#navbar");
let lastScrollPosition =
   window.pageYOffset || document.documentElement.scrollTop;

window.addEventListener("scroll", function () {
   const newScrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;

   if (newScrollPosition > lastScrollPosition) {
      navbar.style.transform = "translateY(-100%)";
   } else if (newScrollPosition < lastScrollPosition) {
      navbar.style.transform = "translateY(0%)";
   }

   lastScrollPosition = newScrollPosition;
});

//! Animations on scroll
const observer = new IntersectionObserver(
   (entries) => {
      entries.forEach((entry) => {
         if (entry.isIntersecting) {
            entry.target.classList.remove("hidden");
            entry.target.classList.add("show");
         }
      });
   },
   {
      rootMargin: "500px",
   }
);

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

//! License show modal info windows
function showLicenseModal(nthChild) {
   document
      .querySelector(`.license-div:nth-child(${nthChild}) .license-modal`)
      .showModal();
}

//! Close license modal windows when clicked outside
document.onclick = function (e) {
   if (e.target.classList.contains("license-modal")) {
      document.querySelectorAll(".license-modal").forEach((element) => {
         element.close();
      });
   }
};
