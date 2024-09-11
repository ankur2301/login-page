document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Reset error messages
    document.getElementById("email-error").style.display = "none";
    document.getElementById("password-error").style.display = "none";
    document.getElementById("response-message").textContent = ""; // Reset response message

    // Validation checks
    let isValid = true;

    if (!email || !validateEmail(email)) {
      document.getElementById("email-error").textContent =
        "Please enter a valid email address";
      document.getElementById("email-error").style.display = "block";
      isValid = false;
    }

    if (!password || password.length < 6) {
      document.getElementById("password-error").textContent =
        "Password must be at least 6 characters long";
      document.getElementById("password-error").style.display = "block";
      isValid = false;
    }

    if (isValid) {
      // Call the login API and show the spinner
      document.getElementById("loading-spinner").style.display = "block";
      login(email, password);
    }
  });

// Validate email format
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Simulate login API call
function login(email, password) {
  const data = {
    username: email,
    password: password,
  };

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      document.getElementById("loading-spinner").style.display = "none";

      if (response.ok) {
        // If login is successful (status 2xx)
        document.getElementById("response-message").textContent =
          "Login successful!";
      } else {
        // If login fails (status 4xx/5xx)
        document.getElementById("response-message").textContent =
          "Login failed. Please check your credentials.";
      }
    })
    .catch((error) => {
      // Hide the spinner and display an error message for network failure or other issues
      document.getElementById("loading-spinner").style.display = "none";
      document.getElementById("response-message").textContent =
        "An error occurred. Please try again.";
    });
}

// Show/Hide password functionality
document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    const passwordField = document.getElementById("password");
    if (passwordField.type === "password") {
      passwordField.type = "text"; // Show the password
    } else {
      passwordField.type = "password"; // Hide the password
    }
  });
