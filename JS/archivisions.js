// NAVBAR CLOSING
document.addEventListener("DOMContentLoaded", function () {
  // Select the navigation menu and the button that toggles it
  const navMenu = document.querySelector(".navbar-collapse");
  const navButton = document.querySelector(".navbar-toggler");

  // Add a click event listener to the entire document
  document.addEventListener("click", function (event) {
    // Check if the navigation menu is open and if the click did not originate from the menu or the button
    if (
      navMenu.classList.contains("show") &&
      !navMenu.contains(event.target) &&
      event.target !== navButton
    ) {
      // Close the navigation menu by removing the "show" class
      navMenu.classList.remove("show");
    }
  });

  // // DRAGGABLE _ FEEDBACK / GALLERY
  const galleryList = document.getElementById("galleryList");
  const feedbackList = document.querySelector(".feedback-list");

  let isGalleryDragging = false;
  let isFeedbackDragging = false;
  let galleryStartX, galleryScrollLeft;
  let feedbackStartX, feedbackScrollLeft;

  // GALLERY
  galleryList.addEventListener("mousedown", (e) => {
    isGalleryDragging = true;
    galleryStartX = e.pageX - galleryList.offsetLeft;
    galleryScrollLeft = galleryList.scrollLeft;
  });

  galleryList.addEventListener("mouseup", () => {
    isGalleryDragging = false;
  });

  galleryList.addEventListener("mousemove", (e) => {
    if (!isGalleryDragging) return;
    e.preventDefault();
    const x = e.pageX - galleryList.offsetLeft;
    const walk = (x - galleryStartX) * 1; // Adjust sensitivity as needed
    galleryList.scrollLeft = galleryScrollLeft - walk;
  });

  // FEEDBACK
  feedbackList.addEventListener("mousedown", (e) => {
    isFeedbackDragging = true;
    feedbackStartX = e.pageX - feedbackList.offsetLeft;
    feedbackScrollLeft = feedbackList.scrollLeft;
  });

  feedbackList.addEventListener("mouseup", () => {
    isFeedbackDragging = false;
  });

  feedbackList.addEventListener("mousemove", (e) => {
    if (!isFeedbackDragging) return;
    e.preventDefault();
    const x = e.pageX - feedbackList.offsetLeft;
    const walk = (x - feedbackStartX) * 1; // Adjust sensitivity as needed
    feedbackList.scrollLeft = feedbackScrollLeft - walk;
  });
});

// // SLIDE _ GALLERY
const galleryList = document.getElementById("galleryList");
const slideWidthGallery =
  document.querySelector(".galleryListItem").offsetWidth + 37;
const slidesToShowGallery = 3.5;
let currentSlideGallery = 0;
let isGalleryDragging = false;
let galleryStartX, galleryScrollLeft;

// Function to update the slider position
function updateGallerySlider() {
  const scrollX = currentSlideGallery * (slideWidthGallery + 37);
  galleryList.scrollLeft = scrollX;
}

// Event listener for "mousedown" on igList
galleryList.addEventListener("mousedown", (e) => {
  isGalleryDragging = true;
  galleryStartX = e.pageX - galleryList.offsetLeft;
  galleryScrollLeft = galleryList.scrollLeft;
});

// Event listener for "mouseup" on igList
galleryList.addEventListener("mouseup", () => {
  isGalleryDragging = false;
});

// Event listener for "mousemove" on igList
galleryList.addEventListener("mousemove", (e) => {
  if (!isGalleryDragging) return;
  e.preventDefault();
  const x = e.pageX - galleryList.offsetLeft;
  const walk = (x - galleryStartX) * 1; // Adjust sensitivity as needed
  galleryList.scrollLeft = galleryScrollLeft - walk;
});

// Handle click on .slick-btn (previous button)
const slickButtons = document.querySelectorAll(".slick-btn");
slickButtons.forEach((slickBtn) => {
  slickBtn.addEventListener("click", function () {
    // Calculate the new slide index in the opposite direction
    currentSlideGallery++;
    if (
      currentSlideGallery >=
      galleryList.children.length - slidesToShowGallery + 1
    ) {
      currentSlideGallery = 0;
    }

    // Calculate the new scroll position based on the current slide
    const scrollPosition = currentSlideGallery * slideWidthGallery;

    galleryList.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  });
});

// VIDEO _ REGISTER
// Function to handle video popup click
const videoElements = document.querySelectorAll(".video");
const videoPopupOverlay = document.getElementById("video-popup-overlay");
const videoPopupIframeContainer = document.getElementById(
  "video-popup-iframe-container"
);
const videoPopupContainer = document.getElementById("video-popup-container");
const videoPopupClose = document.getElementById("video-popup-close");
const videoPopupIframe = document.getElementById("video-popup-iframe");

// Function to open the video popup
function openVideoPopup(id, type) {
  // Show video popup elements
  videoPopupOverlay.style.display = "block";
  videoPopupIframeContainer.style.display = "block";
  videoPopupContainer.style.display = "block";
  videoPopupClose.style.display = "block";

  let srchref = "";

  if (type === "vimeo") {
    srchref = "//player.vimeo.com/video/";
  } else if (type === "youtube") {
    srchref = "https://www.youtube.com/embed/" + id + "?autoplay=1&mute=1";
  }

  // Set the video source
  videoPopupIframe.setAttribute("src", srchref);

  // Show the video popup container when the iframe is loaded
  videoPopupIframe.addEventListener("load", function () {
    videoPopupContainer.style.display = "block";
  });
}

// Function to close video popup
function closeVideoPopup() {
  // Hide video popup elements and reset the iframe source
  videoPopupIframeContainer.style.display = "none";
  videoPopupContainer.style.display = "none";
  videoPopupOverlay.style.display = "none";
  videoPopupIframe.setAttribute("src", "");

  // Pause the video when closing
  if (
    videoPopupIframe.contentWindow &&
    typeof videoPopupIframe.contentWindow.postMessage === "function"
  ) {
    videoPopupIframe.contentWindow.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}',
      "*"
    );
  }
}

videoElements.forEach((videoElement) => {
  videoElement.addEventListener("click", function (e) {
    e.preventDefault();
    const id = videoElement.getAttribute("data-id");
    const type = videoElement.getAttribute("data-type");
    openVideoPopup(id, type);
  });
});

// Event listener to close video popup when clicking the overlay
videoPopupOverlay.addEventListener("click", function () {
  closeVideoPopup();
});

// Event listener to close video popup when clicking the close button
videoPopupClose.addEventListener("click", function () {
  closeVideoPopup();
});

// COUNT STATISTIC
let valueDisplays = document.querySelectorAll(".firgures-number");
let interval = 3000;
valueDisplays.forEach((valueDisplay) => {
  let startValue = 0;
  let endValue = parseInt(valueDisplay.getAttribute("data-val"));
  let duration = Math.floor(interval / endValue);
  console.log(duration);
  let counter = setInterval(function () {
    startValue += 1;
    valueDisplay.textContent = startValue;
    if (startValue == endValue) {
      clearInterval(counter);
    }
  }, duration);
});

// Active
function addActiveClassToLinks(containerClass) {
  // Get all the anchor elements within the specified container
  const links = document.querySelectorAll(`.${containerClass} a`);

  // Add a click event listener to each anchor element
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      // Prevent the default behavior of the anchor element (e.g., navigating to a new page)
      event.preventDefault();

      // Remove the 'active' class from all anchor elements within the container
      links.forEach((otherLink) => {
        otherLink.classList.remove("active");
      });

      // Add the 'active' class to the clicked anchor element
      link.classList.add("active");
    });
  });
}

// Call the function for both containers
addActiveClassToLinks("gallery-list-item");
addActiveClassToLinks("project-list-item");
