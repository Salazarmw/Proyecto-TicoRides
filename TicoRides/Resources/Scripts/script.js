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
  let type = "Client"; // Default type

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

  // Check if this is a supplier registration
  const vehicleBrand = document.getElementById("vehicleBrand")?.value.trim();
  const vehicleModel = document.getElementById("vehicleModel")?.value.trim();
  const vehicleYear = document.getElementById("vehicleYear")?.value;
  const licensePlate = document.getElementById("licensePlate")?.value.trim();

  if (vehicleBrand || vehicleModel || vehicleYear || licensePlate) {
    type = "Supplier";
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
    // Only include these fields if registering as a supplier
    vehicleBrand: vehicleBrand || null,
    vehicleModel: vehicleModel || null,
    vehicleYear: vehicleYear || null,
    licensePlate: licensePlate || null,
  };

  // Get existing users from local storage
  const users = getFromLocalStorage("users") || [];

  // Check if the user already exists
  if (users.some((user) => user.email === email)) {
    alert("User already exists!");
    return;
  }

  // Save new user to local storage using the database.js functions
  return saveToLocalStorage("users", newUser);
}

function authenticateUser(event) {
  event.preventDefault(); // Prevenir la recarga de la página

  // Obtener valores del formulario
  const username = document.getElementById("usernameLogin").value.trim();
  const password = document.getElementById("passwordLogin").value;

  // Verificar que todos los campos estén llenos
  if (!username || !password) {
    alert("All fields are required!");
    return;
  }

  // Obtener usuarios almacenados en el local storage
  const users = getFromLocalStorage("users") || [];

  // Verificar si el usuario existe y las credenciales coinciden
  const user = users.find(
    (user) => user.email === username && user.password === password
  );

  if (user) {
    // Guardar información del usuario logueado en local storage
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    // Redirigir a la página de inicio
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

function bindEvents() {
  const loginForm = document.querySelector("form");

  if (loginForm) {
    loginForm.addEventListener("submit", authenticateUser);
  }
  if (document.getElementById("register-button")) {
    document
      .getElementById("register-button")
      .addEventListener("click", function () {
        handleSaveUserAndRedirect("../index.html");
      });
  }
}

document.addEventListener("DOMContentLoaded", bindEvents);
