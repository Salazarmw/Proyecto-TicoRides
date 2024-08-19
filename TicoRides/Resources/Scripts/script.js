function saveUser() {
  // Get form values
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const idNumber = document.getElementById("idNumber").value.trim();
  const birthDate = document.getElementById("birthDate").value;
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const repeatPassword = document.getElementById("repeatPassword").value;
  const address = document.getElementById("address").value;
  const country = document.getElementById("country").value;
  const state = document.getElementById("state").value;
  const city = document.getElementById("city").value;
  const phone = document.getElementById("phone").value;
  let type = "User"; // Default type

  // Email validation regex
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Common validation for both user types
  if (
    !firstName ||
    !lastName ||
    !idNumber ||
    !birthDate ||
    !email ||
    !password ||
    !repeatPassword ||
    !address ||
    !country ||
    !state ||
    !city ||
    !phone
  ) {
    alert("All fields are required!");
    return;
  }

  // Validate email format
  if (!emailPattern.test(email)) {
    alert("Invalid email format!");
    return;
  }

  // Validate passwords match
  if (password !== repeatPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Check if this is a driver registration
  const vehicleBrand = document.getElementById("add-car-brand")?.value.trim();
  const vehicleModel = document.getElementById("vehicleModel")?.value.trim();
  const vehicleYear = document.getElementById("vehicleYear")?.value;
  const licensePlate = document.getElementById("licensePlate")?.value.trim();

  if (vehicleBrand || vehicleModel || vehicleYear || licensePlate) {
    type = "Driver";
  }

  // Create user object
  const newUser = {
    firstName,
    lastName,
    idNumber,
    birthDate,
    email,
    password,
    address,
    country,
    state,
    city,
    phone,
    type,
    // Only include these fields if registering as a driver
    vehicleBrand: vehicleBrand || null,
    vehicleModel: vehicleModel || null,
    vehicleYear: vehicleYear || null,
    licensePlate: licensePlate || null,
  };

  // Get existing users from local storage
  const users = getFromLocalStorage("users") || [];

  // Check if the user already exists
  if (users.some((user) => user.idNumber === idNumber)) {
    alert("User already exists!");
    return;
  }

  // Save new user to local storage using the database.js functions
  return saveToLocalStorage("users", newUser);
}

// Function to authenticate if the user is registered
function authenticateUser(event) {
  event.preventDefault(); // Prevent page reload

  // Get values ​​from the form
  const username = document.getElementById("usernameLogin").value.trim();
  const password = document.getElementById("passwordLogin").value;

  // Check that all fields are filled in
  if (!username || !password) {
    alert("All fields are required!");
    return;
  }

  // Get users stored in local storage
  const users = getFromLocalStorage("users") || [];

  // Check if the user exists and the credentials match
  const user = users.find(
    (user) => user.idNumber === username && user.password === password
  );

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "./Home/home.html";
  } else {
    alert("Invalid username or password!");
  }
}

function loginButtonHandler(element) {
  authenticateUser();
}

function handleSaveUserAndRedirect(redirectUrl) {
  if (saveUser()) {
    window.location.href = redirectUrl;
  }
}

// Function to save a ride
function saveRide() {
  // Retrieve the ride data from the form
  const departureLocation = document.getElementById("departure-location").value;
  const arrivalLocation = document.getElementById("arrival-location").value;
  const selectedDays = Array.from(
    document.querySelectorAll('input[name="ride-days"]:checked')
  ).map((day) => day.value);
  const time = document.getElementById("timeAdd").value;
  const seats = document.getElementById("seatsAdd").value;
  const fee = document.getElementById("feeAdd").value;
  const car =
    document.getElementById("car-brand").value +
    " " +
    document.getElementById("car-model").value +
    " " +
    document.getElementById("car-year").value;

  // Check if all fields are filled
  if (
    !departureLocation ||
    !arrivalLocation ||
    selectedDays.length === 0 ||
    !time ||
    !seats ||
    !fee
  ) {
    alert("Please fill in all fields.");
    return; // Exit the function if any field is missing
  }

  // Retrieve the current user ID from localStorage
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
  let newRide;

  // Create a new ride object
  if (currentUser) {
    newRide = {
      departureLocation: departureLocation,
      arrivalLocation: arrivalLocation,
      selectedDays: selectedDays,
      departureTime: time,
      seatsAvailable: seats,
      fee: fee,
      createdBy: currentUser.idNumber, // Assign the current user ID to the ride
      car: car,
      id: Date.now(), // Generate a unique ID using the current timestamp
    };
  } else {
    console.error(
      "No user is logged in or user data is missing in localStorage."
    );
  }

  if (saveToLocalStorage("rides", newRide)) {
    alert("Ride added successfully!");
    window.location.href = "../Rides/myRides.html";
  } else {
    alert("Error adding ride");
    // Reset the form fields after submission
    document.getElementById("add-ride-form").reset();
  }
}

// Function to update a ride
function updateRide(event) {
  event.preventDefault();

  const rideId = getParameterByName("id");
  let rides = JSON.parse(localStorage.getItem("rides")) || [];

  const updatedRide = {
    id: parseInt(rideId),
    departureLocation: document.getElementById("departure").value,
    arrivalLocation: document.getElementById("arrival").value,
    selectedDays: Array.from(
      document.querySelectorAll('input[name="days"]:checked')
    ).map((day) => day.value),
    departureTime: document.getElementById("timeEdit").value,
    seatsAvailable: document.getElementById("seatsEdit").value,
    fee: document.getElementById("feeEdit").value,
    car:
      document.getElementById("car-brand").value +
      " " +
      document.getElementById("car-model").value +
      " " +
      document.getElementById("car-year").value,
  };

  rides = rides.map((ride) =>
    ride.id === updatedRide.id ? updatedRide : ride
  );

  localStorage.setItem("rides", JSON.stringify(rides));

  alert("Ride updated successfully!");
  window.location.href = "../Rides/myRides.html";
}

// Function to set current time in the time input
function setCurrentTime() {
  const timeInput = document.getElementById("timeAdd");
  if (timeInput) {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    timeInput.value = `${hours}:${minutes}`;
  }
}

// Function to get URL parameters
function getParameterByName(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Function to load rides into the table
function loadRides() {
  const table = document.getElementById("my-rides-table");
  const rides = JSON.parse(localStorage.getItem("rides"));
  // Retrieve the logged-in user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Clear the table
  table.innerHTML = "";

  rides.forEach((ride) => {
    // Check if the ride belongs to the current user
    if (currentUser.idNumber === ride.createdBy) {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td class="flex-cell">${ride.departureLocation}</td>
      <td class="flex-cell">${ride.arrivalLocation}</td>
      <td class="flex-cell">${ride.seatsAvailable}</td>
      <td class="flex-cell">${ride.car}</td>
      <td class="flex-cell">$${ride.fee}</td>
      <td class="flex-cell">
        <a href="../Rides/editRide.html?id=${ride.id}">Edit</a>
        <span>|</span>
        <a href="#" onclick="deleteRide(${ride.id})">Delete</a>
      </td>
    `;
      table.appendChild(row);
    }
  });
}

// Function to delete a ride
function deleteRide(id) {
  let rides = JSON.parse(localStorage.getItem("rides")) || [];
  rides = rides.filter((ride) => ride.id !== id);
  localStorage.setItem("rides", JSON.stringify(rides));
  loadRides();
}

function loadCarData() {
  // Retrieve the current user logged from localStorage
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Ensure the user data exists before trying to access its properties
  if (currentUser) {
    // Fill in the fields with the vehicle data of the currently logged in user
    if (document.getElementById("car-brand")) {
      document.getElementById("car-brand").value = currentUser.vehicleBrand;
    }
    if (document.getElementById("car-model")) {
      document.getElementById("car-model").value = currentUser.vehicleModel;
    }
    if (document.getElementById("car-year")) {
      document.getElementById("car-year").value = currentUser.vehicleYear;
    }
  } else {
    console.error(
      "No user is logged in or user data is missing in localStorage."
    );
  }
}

function loadRideData() {
  const rideId = getParameterByName("id");
  const rides = JSON.parse(localStorage.getItem("rides"));

  const ride = rides.find((ride) => ride.id === parseInt(rideId));

  if (ride) {
    document.getElementById("departure").value = ride.departureLocation;
    document.getElementById("arrival").value = ride.arrivalLocation;
    document.getElementById("timeEdit").value = ride.departureTime;
    document.getElementById("seatsEdit").value = ride.seatsAvailable;
    document.getElementById("feeEdit").value = ride.fee;
    document.getElementById("car-brand").value = ride.car.split(" ")[0];
    document.getElementById("car-model").value = ride.car.split(" ")[1];
    document.getElementById("car-year").value = ride.car.split(" ")[2];

    // Set the selected days
    document.querySelectorAll('input[name="days"]').forEach((checkbox) => {
      checkbox.checked = ride.selectedDays.includes(checkbox.value);
    });
  }
}

function getUserById(userId) {
  const users = JSON.parse(localStorage.getItem("users"));
  return users.find((user) => user.idNumber === userId) || null;
}

function createRideCard(driver, from, to, seats, car, fee, link) {
  const ridesCardsContainer = document.getElementById("rides-cards");

  const card = `
    <div class="col-md-4">
      <div class="card mb-4">
        <img src="../Resources/Images/userIcon.png" class="card-img-top" alt="Driver">
        <div class="card-body">
          <h5 class="card-title">Driver: ${driver}</h5>
          <p class="card-text">
            <strong>From:</strong> ${from}<br>
            <strong>To:</strong> ${to}<br>
            <strong>Seats:</strong> ${seats}<br>
            <strong>Car:</strong> ${car}<br>
            <strong>Fee:</strong> ${fee}
          </p>
          <a href="${link}" class="btn btn-primary">Request</a>
        </div>
      </div>
    </div>
  `;

  ridesCardsContainer.insertAdjacentHTML("beforeend", card);
}

function loadRideCards() {
  // Get the container that holds the ride cards
  const ridesCardsContainer = document.getElementById('rides-cards');

  // Clear any existing ride cards before loading new ones
  ridesCardsContainer.innerHTML = '';

  // Retrieve rides from localStorage
  const rides = JSON.parse(localStorage.getItem("rides"));

  // Get the search input values
  const fromLocation = document.getElementById("from").value.trim();
  const toLocation = document.getElementById("to").value.trim();

  // Iterate over each ride and add it as a card if it matches the search criteria
  rides.forEach((ride) => {
    const user = getUserById(ride.createdBy);

    if (user) {
      // Case 1: Both fromLocation and toLocation are provided
      if (fromLocation && toLocation) {
        if (ride.departureLocation === fromLocation && ride.arrivalLocation === toLocation) {
          createRideCard(
            user.firstName,
            ride.departureLocation,
            ride.arrivalLocation,
            ride.seatsAvailable,
            ride.car,
            ride.fee,
            `../Rides/seeRide.html?id=${ride.id}` // Link with ride ID
          );
        }
      }
      // Case 2: Only fromLocation is provided
      else if (fromLocation && !toLocation) {
        if (ride.departureLocation === fromLocation) {
          createRideCard(
            user.firstName,
            ride.departureLocation,
            ride.arrivalLocation,
            ride.seatsAvailable,
            ride.car,
            ride.fee,
            `../Rides/seeRide.html?id=${ride.id}` // Link with ride ID
          );
        }
      }
      // Case 3: Only toLocation is provided
      else if (!fromLocation && toLocation) {
        if (ride.arrivalLocation === toLocation) {
          createRideCard(
            user.firstName,
            ride.departureLocation,
            ride.arrivalLocation,
            ride.seatsAvailable,
            ride.car,
            ride.fee,
            `../Rides/seeRide.html?id=${ride.id}` // Link with ride ID
          );
        }
      }
      // Case 4: Neither fromLocation nor toLocation are provided (Show all rides)
      else if (!fromLocation && !toLocation) {
        createRideCard(
          user.firstName,
          ride.departureLocation,
          ride.arrivalLocation,
          ride.seatsAvailable,
          ride.car,
          ride.fee,
          `../Rides/seeRide.html?id=${ride.id}` // Link with ride ID
        );
      }
    } else {
      console.error(`User with ID ${ride.createdBy} not found.`);
    }
  });
}

function bindEvents() {
  if (document.getElementById("loginForm")) {
    document
      .getElementById("loginForm")
      .addEventListener("submit", authenticateUser);
  }
  if (document.getElementById("register-button")) {
    document
      .getElementById("register-button")
      .addEventListener("click", function () {
        handleSaveUserAndRedirect("../index.html");
      });
  }
  if (document.getElementById("add-ride-button")) {
    document
      .getElementById("add-ride-button")
      .addEventListener("click", saveRide);
  }
  if (document.getElementById("edit-ride-button")) {
    document
      .getElementById("edit-ride-button")
      .addEventListener("click", updateRide);
  }
  if (document.getElementById("find-rides")) {
    document
      .getElementById("find-rides")
      .addEventListener("click", loadRideCards);
  }
  if (document.getElementById("find-rides-mobile")) {
    document
      .getElementById("find-rides-mobile")
      .addEventListener("click", loadRideCards);
  }
}

// Initialize the page
window.onload = function () {
  if (document.getElementById("my-rides-table")) {
    loadRides();
  }

  if (document.getElementById("add-ride-form")) {
    setCurrentTime(); // Set current time when adding a ride
    loadCarData(); // Sets the car data of the currently logged in user
  }

  if (document.getElementById("edit-ride-form")) {
    loadRideData();
  }
};

document.addEventListener("DOMContentLoaded", bindEvents);
