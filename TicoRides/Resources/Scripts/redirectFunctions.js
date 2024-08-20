// Function to check user type and redirect if not a driver
function checkUserTypeAndRedirect() {
  // Retrieve the logged-in user from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Check if user data exists in localStorage
  if (!loggedInUser) {
    // If no user is logged in, redirect to the home page
    window.location.href = "../Home/home.html";
    return;
  }

  // Check if the user is a driver
  if (loggedInUser.type !== "Driver") {
    // If the user is not a driver, redirect to the home page
    window.location.href = "../Home/home.html";
  }
}

function redirectToCorrectEditingForm() {
  // Retrieve the logged-in user from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Check if user data exists in localStorage
  if (!loggedInUser) {
    // If no user is logged in, redirect to the home page
    window.location.href = "../Home/home.html";
    return;
  }

  // Check if the user is a driver
  if (loggedInUser.type === "Driver") {
    // If the user is not a driver, redirect to the home page
    window.location.href = "./editDriverProfile.html";
  }
}

function redirectToCorrectBookingPage() {
  // Retrieve the logged-in user from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Check if user data exists in localStorage
  if (!loggedInUser) {
    // If no user is logged in, redirect to the home page
    window.location.href = "../Home/home.html";
    return;
  }

  // Check if the user is a driver
  if (loggedInUser.type === "Driver") {
    // If the user is not a driver, redirect to the home page
    window.location.href = "./driverBooking.html";
  }
}

function redirectIfNotLoggedIn() {
  // Retrieve the logged-in user from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Check if user data exists in localStorage
  if (!loggedInUser) {
    // If no user is logged in, redirect to the login page
    window.location.href = "../index.html";
    return;
  }
}
