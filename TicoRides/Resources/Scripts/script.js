function registerUser(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get form values
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const idNumber = document.getElementById("idNumber").value.trim();
  const birthDate = document.getElementById("birthDate").value;
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const repeatPassword = document.getElementById("repeatPassword").value;
  const phone = document.getElementById("phone").value.trim();
  let type = "User"

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

  // Get additional fields for driver registration
  const address = document.getElementById("address")?.value.trim();
  const country = document.getElementById("country")?.value;
  const state = document.getElementById("state")?.value.trim();
  const city = document.getElementById("city")?.value.trim();
  const vehicleBrand = document.getElementById("vehicleBrand")?.value.trim();
  const vehicleModel = document.getElementById("vehicleModel")?.value.trim();
  const vehicleYear = document.getElementById("vehicleYear")?.value;
  const licensePlate = document.getElementById("licensePlate")?.value.trim();

  // Create user object
  const newUser = {
    firstName,
    lastName,
    idNumber,
    birthDate,
    email,
    password,
    phone,
    // Only include these fields if registering as a driver
    address: address || null,
    country: country || null,
    state: state || null,
    city: city || null,
    vehicleBrand: vehicleBrand || null,
    vehicleModel: vehicleModel || null,
    vehicleYear: vehicleYear || null,
    licensePlate: licensePlate || null,
  };

  // Get existing users from local storage or initialize empty array
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if the user already exists
  if (users.some((user) => user.email === email)) {
    alert("User already exists!");
    return;
  }

  // Add new user to the array
  users.push(newUser);

  // Save updated users array to local storage
  localStorage.setItem("users", JSON.stringify(users));

  // Redirect to login page
  window.location.href = "../index.html";
}

function authenticateUser(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get form values
  const username = document.getElementById("usernameLogin").value.trim();
  const password = document.getElementById("passwordLogin").value;

  // Check if all fields are filled
  if (!username || !password) {
    alert("All fields are required!");
    return;
  }

  // Get stored users data from local storage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if user exists and credentials match
  const user = users.find(
    (user) => user.email === username && user.password === password
  );

  if (user) {
    // Redirect to home page
    window.location.href = "./Home/home.html";
  } else {
    alert("Invalid username or password!");
  }
}
