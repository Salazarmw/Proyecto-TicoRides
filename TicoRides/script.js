function registerUser() {
    // Get form values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeatPassword').value;
    const address = document.getElementById('address').value.trim();
    const country = document.getElementById('country').value;
    const state = document.getElementById('state').value.trim();
    const city = document.getElementById('city').value.trim();
    const phone = document.getElementById('phone').value.trim();
  
    // Email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Check if all fields are filled
    if (!firstName || !lastName || !email || !password || !repeatPassword || !address || !country || !state || !city || !phone) {
      alert('All fields are required!');
      return;
    }
  
    // Validate email format
    if (!emailPattern.test(email)) {
      alert('Invalid email format!');
      return;
    }
  
    // Validate passwords match
    if (password !== repeatPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    // Create user object
    const user = {
      firstName,
      lastName,
      email,
      password,
      address,
      country,
      state,
      city,
      phone
    };
  
    // Save user to local storage
    localStorage.setItem('user', JSON.stringify(user));
  
    // Redirect to login page
    window.location.href = '../index.html';
  }

  function authenticateUser(event) {
    event.preventDefault(); // Prevent the default form submission
  
    // Get form values
    const username = document.getElementById('usernameLogin').value.trim();
    const password = document.getElementById('passwordLogin').value;
  
    // Check if all fields are filled
    if (!username || !password) {
      alert('All fields are required!');
      return;
    }
  
    // Get stored user data from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));
  
    // Check if user exists and credentials match
    if (storedUser && storedUser.email === username && storedUser.password === password) {
      // Redirect to home page
      window.location.href = './Home/home.html';
    } else {
      alert('Invalid username or password!');
    }
  }
  