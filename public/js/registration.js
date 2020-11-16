const form = document.querySelector("form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");
const passcode = document.querySelector("#passcode");

/*
 * Shows error message and style if input is wrong or missing
 */
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

/*
 * Shows success style if input is ok
 */
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

/*
 * Validates input fields
 */
function checkRequired(inputs) {
  for (const input of inputs) {
    if (input.value.trim() === "") {
      showError(input, `${getInputName(input)} is required`);
    } else if (false) {
      console.log("sdf");
    } else {
      showSuccess(input);
    }
  }
}

/*
 * Checks if email is valid
 */
function checkEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(email.value).toLowerCase())) {
    showSuccess(email);
  } else {
    showError(email, "Email is not valid");
  }
}

/*
 * Get input field name and uppercase it
 */
function getInputName(input) {
  const inputName = input.id.charAt(0).toUpperCase() + input.id.slice(1);
  return inputName;
}

/*
 * Check length of input value
 */
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getInputName(input)} must be at least ${min} characters long`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getInputName(input)} must be less then ${max} characters long`
    );
  }
}

/*
 * Check passwords match
 */
function checkPasswordsMatch(pass1, pass2) {
  if (pass1.value !== pass2.value) {
    showError(pass2, "Passwords do not match");
  }
}

/*
 * Event listeners
 */
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkRequired([username, email, password, password2, passcode]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 15);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
