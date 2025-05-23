
        document.getElementById("registrationForm")
        .addEventListener("submit", function(event) {
          event.preventDefault();
          var Email = document.getElementById("Email").value;// Puts Email as inputed email
          var Password = document.getElementById("Password").value;// Puts Password as inputed paswword
          var Repeat_Password = document.getElementById("Repeat_Password").value;// PutsRepeat_Password as inputed repeat_Password
          if (Password !== Repeat_Password) {// Looks if Repeat_Password is not the same as Password
           alert( "Password doesn't match");
            return;
          } 
  
          const user = { // makes a new user where the email and passwords are set
           Email: Email,
           Password: Password,
  };
  
  localStorage.setItem(Email, JSON.stringify(user));// Forgot exacltyl what this is but it looks like it does something
  alert("Registration Completed! Please log in");
  window.location.href = "Login.html";
        });
      