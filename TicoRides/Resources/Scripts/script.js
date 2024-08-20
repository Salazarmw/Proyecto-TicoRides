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

function loadUserData() {
  const user = getFromLocalStorage("loggedInUser");

  if (!user) {
    alert("User not found!");
    return;
  }

  // Assign values ​​to the form fields
  document.getElementById("firstName").value = user.firstName;
  document.getElementById("lastName").value = user.lastName;
  document.getElementById("idNumber").value = user.idNumber;
  document.getElementById("birthDate").value = user.birthDate;
  document.getElementById("email").value = user.email;
  document.getElementById("password").value = user.password;
  document.getElementById("repeatPassword").value = user.password;
  document.getElementById("address").value = user.address;
  document.getElementById("country").value = user.country;
  document.getElementById("state").value = user.state;
  document.getElementById("city").value = user.city;
  document.getElementById("phone").value = user.phone;

  // For driver form only
  if (user.type === "Driver") {
    document.getElementById("add-car-brand").value = user.vehicleBrand;
    document.getElementById("vehicleModel").value = user.vehicleModel;
    document.getElementById("vehicleYear").value = user.vehicleYear;
    document.getElementById("licensePlate").value = user.licensePlate;
  }
}

function updateUser() {
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

  // Validate required fields
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

  // Get existing users from local storage
  let users = getFromLocalStorage("users");

  // Update the user object
  const updatedUser = {
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
    vehicleBrand: vehicleBrand || null,
    vehicleModel: vehicleModel || null,
    vehicleYear: vehicleYear || null,
    licensePlate: licensePlate || null,
  };

  users = users.map((user) =>
    user.idNumber === updatedUser.idNumber ? updatedUser : user
  );

  // Save updated users to local storage
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

  window.location.href = "../Home/home.html";
  alert("User updated successfully!");
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
  const currentUser = getFromLocalStorage("loggedInUser");
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
    window.location.href = "../Rides/myRides.html";
    alert("Ride added successfully!");
  } else {
    alert("Error adding ride");
    // Reset the form fields after submission
    document.getElementById("add-ride-form").reset();
  }
}

// Function to update a ride
function updateRide(event) {
  event.preventDefault();
  const currentUser = getFromLocalStorage("loggedInUser");

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
    createdBy: currentUser.idNumber, // Assign the current user ID to the ride
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

  window.location.href = "../Rides/myRides.html";
  loadRides();
  alert("Ride updated successfully!");
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
  const rides = getFromLocalStorage("rides");
  // Retrieve the logged-in user from localStorage
  const currentUser = getFromLocalStorage("loggedInUser");

  // Clear the table
  table.innerHTML = "";

  rides.forEach((ride) => {
    // Check if the ride belongs to the current user
    if (currentUser.idNumber == ride.createdBy) {
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
  let rides = getFromLocalStorage("rides");
  rides = rides.filter((ride) => ride.id !== id);
  localStorage.setItem("rides", JSON.stringify(rides));
  loadRides();
}

// Function to load car data of the logged driver
function loadCarData() {
  // Retrieve the current user logged from localStorage
  const currentUser = getFromLocalStorage("loggedInUser");

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
  const rides = getFromLocalStorage("rides");

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
  const users = getFromLocalStorage("users");
  return users.find((user) => user.idNumber === userId);
}

function createRideRow(driver, from, to, seats, car, fee, link) {
  const ridesTableBody = document.querySelector("#rides-container tbody");

  // Create a new table row
  const row = `
    <tr>
      <td>
        <img src="../Resources/Images/userIcon.png" alt="Driver" /> ${driver}
      </td>
      <td><a href="#">${from}</a></td>
      <td>${to}</td>
      <td>${seats}</td>
      <td>${car}</td>
      <td>${fee ? `$${fee}` : "--"}</td>
      <td><a href="${link}">Request</a></td>
    </tr>
  `;

  // Append the new row to the table body
  ridesTableBody.insertAdjacentHTML("beforeend", row);
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

function getValueOrNull(id) {
  const value = document.getElementById(id).value.trim();
  return value === "" ? null : value;
}

function loadRideTable() {
  // Get the table body that holds the ride rows
  const ridesTableBody = document.querySelector("#rides-container tbody");

  // Clear any existing rows before loading new ones
  ridesTableBody.innerHTML = "";

  // Retrieve rides from localStorage
  const rides = JSON.parse(localStorage.getItem("rides"));

  // Get the search input values using getValueOrNull
  const fromLocation = getValueOrNull("from");
  const toLocation = getValueOrNull("to");

  // Iterate over each ride and add it as a row if it matches the search criteria
  rides.forEach((ride) => {
    const user = getUserById(ride.createdBy);

    if (user) {
      // Case 1: Both fromLocation and toLocation are provided
      if (fromLocation && toLocation) {
        if (
          ride.departureLocation === fromLocation &&
          ride.arrivalLocation === toLocation
        ) {
          createRideRow(
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
          createRideRow(
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
          createRideRow(
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
        createRideRow(
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

function loadRideCards() {
  // Get the container that holds the ride cards
  const ridesCardsContainer = document.getElementById("rides-cards");

  // Clear any existing ride cards before loading new ones
  ridesCardsContainer.innerHTML = "";

  // Retrieve rides from localStorage
  const rides = JSON.parse(localStorage.getItem("rides"));

  // Get the search input values using getValueOrNull
  const fromLocation = getValueOrNull("from-mobile");
  const toLocation = getValueOrNull("to-mobile");

  // Iterate over each ride and add it as a card if it matches the search criteria
  rides.forEach((ride) => {
    const user = getUserById(ride.createdBy);

    if (user) {
      // Case 1: Both fromLocation and toLocation are provided
      if (fromLocation && toLocation) {
        if (
          ride.departureLocation === fromLocation &&
          ride.arrivalLocation === toLocation
        ) {
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

function loadRideDetails() {
  // Get the ride ID from the URL
  const rideId = getParameterByName("id");

  // Get the rides from localStorage
  const rides = getFromLocalStorage("rides");

  // Find the ride with the corresponding ID
  const ride = rides.find((ride) => ride.id == rideId);

  if (ride) {
    // Get the user who created the ride
    const user = getUserById(ride.createdBy);

    // Load ride information into the form
    document.querySelector("#see-ride-driver").textContent = user.firstName;
    document.querySelector(
      "#ride-route h1"
    ).textContent = `${ride.departureLocation} - ${ride.arrivalLocation}`;

    // Fill in the ride details
    document.querySelector(".route-container p:nth-child(1) span").textContent =
      ride.departureLocation;
    document.querySelector(".route-container p:nth-child(2) span").textContent =
      ride.arrivalLocation;
    document.getElementById("timeSee").value = ride.departureTime;
    document.getElementById("seatsSee").value = ride.seatsAvailable;
    document.getElementById("feeSee").value = ride.fee;

    // Fill in the vehicle details
    if (document.getElementById("make")) {
      document.getElementById("make").value = user.vehicleBrand;
    }
    if (document.getElementById("model")) {
      document.getElementById("model").value = user.vehicleModel;
    }
    if (document.getElementById("year")) {
      document.getElementById("year").value = user.vehicleYear;
    }

    // Mark the selected days
    const days = document.querySelectorAll(".days-select input[name='days']");
    days.forEach((dayCheckbox) => {
      dayCheckbox.checked = ride.selectedDays.includes(dayCheckbox.value);
    });
  } else {
    console.error("Ride not found");
  }
}

// Function to generate a unique ID
function generateUniqueId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

// Function to handle ride booking request
function requestRide(userId) {
  // Get the ride ID from the URL
  const rideId = getParameterByName("id");

  // Retrieve the rides data from localStorage
  const rides = getFromLocalStorage("rides");

  // Find the ride by its ID
  const ride = rides.find((ride) => ride.id == rideId);

  // Retrieve the current user ID from localStorage
  const currentUser = getFromLocalStorage("loggedInUser");

  if (!ride) {
    return "Ride not found.";
  }

  const requestedSeats = document.getElementById("seatsSee").value;

  // Check if the requested seats are available
  if (requestedSeats > ride.seats) {
    return "Not enough seats available.";
  }

  // Create a booking object
  if (currentUser) {
    const booking = {
      id: generateUniqueId(), // Generates a unique ID for the request
      rideId: rideId,
      userId: currentUser.idNumber,
      requestedSeats: requestedSeats,
      status: "pending", // Initial status is 'pending'
    };

    // Store updated bookings back to localStorage
    saveToLocalStorage("bookings", booking);
    alert("Ride request submitted successfully.");
    window.location.href = "../Home/home.html";
  } else {
    alert("Please login to request a ride.");
    window.location.href = "../Home/home.html";
  }
}

// Function to accept a booking
function acceptBooking(bookingId) {
  const bookings = getFromLocalStorage("bookings");
  const rides = getFromLocalStorage("rides");

  const booking = bookings.find((b) => b.id == bookingId);
  if (!booking) return;

  const ride = rides.find((r) => r.id == booking.rideId);
  if (!ride) return;

  // Update available seats
  ride.availableSeats -= booking.requestedSeats;

  // Update booking status to accepted
  booking.status = "accepted";

  // Save updates to localStorage
  localStorage.setItem("rides", JSON.stringify(rides));
  localStorage.setItem("bookings", JSON.stringify(bookings));

  // Refresh the displayed bookings
  loadDriverBookings();
}

// Function to reject a booking
function rejectBooking(bookingId) {
  const bookings = getFromLocalStorage("bookings");

  const booking = bookings.find((b) => b.id === bookingId);
  if (!booking) return;

  // Update booking status to rejected
  booking.status = "rejected";

  // Save updates to localStorage
  localStorage.setItem("bookings", JSON.stringify(bookings));

  // Refresh the displayed bookings
  loadDriverBookings();
}

// Function to display pending bookings for the logged-in driver
function loadDriverBookings() {
  const currentUser = getFromLocalStorage("loggedInUser");
  const bookings = getFromLocalStorage("bookings");
  const rides = getFromLocalStorage("rides");

  const pendingBookings = bookings.filter((booking) => {
    const ride = rides.find((r) => r.id == booking.rideId);
    return (
      booking.status == "pending" &&
      ride &&
      ride.createdBy == currentUser.idNumber
    );
  });

  const tableBody = document.getElementById("dirver-bookings-table");
  tableBody.innerHTML = "";

  pendingBookings.forEach((booking) => {
    const ride = rides.find((r) => r.id == booking.rideId);
    const bookingUser = getUserById(booking.userId);

    const row = document.createElement("tr");

    const userCell = document.createElement("td");
    userCell.className = "flex-cell";
    userCell.innerHTML = `<img src="../Resources/Images/userIcon.png" alt="User" /> ${bookingUser.firstName}`;
    row.appendChild(userCell);

    const rideCell = document.createElement("td");
    rideCell.className = "flex-cell";
    rideCell.textContent = `${ride.departureLocation} - ${ride.arrivalLocation}`;
    row.appendChild(rideCell);

    const actionCell = document.createElement("td");
    actionCell.className = "flex-cell";
    actionCell.innerHTML = `<a href="#" onclick="acceptBooking('${booking.id}')">Accept</a>
                              <span>|</span>
                              <a href="#" onclick="rejectBooking('${booking.id}')">Reject</a>`;
    row.appendChild(actionCell);

    tableBody.appendChild(row);
  });
}

// Function to display bookings for the logged-in user
function loadUserBookings() {
  const currentUser = getFromLocalStorage("loggedInUser");
  const bookings = getFromLocalStorage("bookings");
  const rides = getFromLocalStorage("rides");

  // Filter bookings linked to the logged-in user
  const userBookings = bookings.filter(
    (booking) => booking.userId == currentUser.idNumber
  );

  const tableBody = document.getElementById("bookings-table");
  tableBody.innerHTML = "";

  userBookings.forEach((booking) => {
    const ride = rides.find((r) => r.id == booking.rideId);
    const driver = getUserById(ride.createdBy);

    const row = document.createElement("tr");

    // Driver cell
    const driverCell = document.createElement("td");
    driverCell.className = "flex-cell";
    driverCell.innerHTML = `<img src="../Resources/Images/userIcon.png" alt="Driver" /> ${driver.firstName}`;
    row.appendChild(driverCell);

    // Ride route cell
    const rideCell = document.createElement("td");
    rideCell.className = "flex-cell";
    rideCell.textContent = `${ride.departureLocation} - ${ride.arrivalLocation}`;
    row.appendChild(rideCell);

    // Status cell
    const statusCell = document.createElement("td");
    statusCell.className = "flex-cell";
    statusCell.textContent = booking.status;
    row.appendChild(statusCell);

    tableBody.appendChild(row);
  });
}

// Function to remove the logged-in user from local storage
function logoutUser() {
  localStorage.removeItem("loggedInUser");
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
  if (document.getElementById("find-rides")) {
    document
      .getElementById("find-rides")
      .addEventListener("click", loadRideTable);
  }
  if (document.getElementById("find-rides-mobile")) {
    document
      .getElementById("find-rides-mobile")
      .addEventListener("click", loadRideTable);
  }
  if (document.getElementById("request-ride")) {
    document
      .getElementById("request-ride")
      .addEventListener("click", requestRide);
  }
  if (document.getElementById("logout-btn")) {
    document.getElementById("logout-btn").addEventListener("click", logoutUser);
  }
  if (document.getElementById("update-user")) {
    document
      .getElementById("update-user")
      .addEventListener("click", updateUser);
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

  if (document.getElementById("request-ride")) {
    loadRideDetails();
  }

  if (document.getElementById("dirver-bookings-table")) {
    loadDriverBookings();
  }

  if (document.getElementById("bookings-table")) {
    loadUserBookings();
  }

  if (document.getElementById("update-user")) {
    loadUserData();
  }
};

document.addEventListener("DOMContentLoaded", bindEvents);
