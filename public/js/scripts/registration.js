import { auth } from "./auth.js";

const registration = {};

registration.init = () => {
  const form = document.querySelector("form");
  const username = document.querySelector("#username");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const password2 = document.querySelector("#password2");
  const passcode = document.querySelector("#passcode");
  const submitBtn = document.querySelector("#submit-btn");

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
   * Validates required input fields
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
    return !inputs.some((input) => {
      return input.value.trim() === "";
    });
  }

  /*
   * Checks if email is valid
   */
  function checkEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email.value).toLowerCase())) {
      showSuccess(email);
      return true;
    } else {
      showError(email, "Email is not valid");
      return false;
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
      showError(input, `${getInputName(input)} must be at least ${min} characters long`);
      return false;
    } else if (input.value.length > max) {
      showError(input, `${getInputName(input)} must be less then ${max} characters long`);
      return false;
    } else {
      return true;
    }
  }

  /*
   * Check passwords match
   */
  function checkPasswordsMatch(pass1, pass2) {
    if (pass1.value !== pass2.value) {
      showError(pass2, "Passwords do not match");
      return false;
    } else {
      return true;
    }
  }

  /*
   * Event listeners
   */
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const ch1 = checkRequired([username, email, password, password2, passcode]);
    const ch2 = checkLength(username, 3, 16);
    const ch3 = checkLength(password, 6, 19);
    const ch4 = checkEmail(email);
    const ch5 = checkPasswordsMatch(password, password2);
    if (ch1 && ch2 && ch3 && ch4 && ch5) {
      const response = await sendFormData();
      if (response.success) {
        auth.token = response.result.token;
        console.log("user is registrated and logged in");
        window.location.hash = "combinations";
      } else {
        const field = response.error.message.split(":")[0];
        if (field === "email") {
          showError(email, "There is user with this email");
        }
        if (field === "username") {
          showError(username, "Username is taken");
        }
        if (field === "passcode") {
          showError(passcode, "Passcode is incorect");
        }
      }
    }
  });

  async function sendFormData() {
    try {
      const userData = {
        username: username.value,
        password: password.value,
        email: email.value,
        passcode: passcode.value,
      };
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
};

export { registration };
