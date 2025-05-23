document.getElementById("logingform")
.addEventListener("submit", function(event) { // listens to when the submit button is pressed
  event.preventDefault();
  var Password = document.getElementById("Password").value;// puts the var Password as the value of password in the form
  var Email = document.getElementById("Email").value;// puts the var Email as the value of email in the form
  
  var user = localStorage.getItem(Email); // Checks if the inputed email is register

  if (user) {// if it is register it proced
   var parsedUser = JSON.parse(user);// puts parsed user as the user founnd
   if(parsedUser.Password === Password){// looks if the inputed password matches that of the users saved password
     localStorage.setItem("user", JSON.stringify(parsedUser));//  setts user as the parsed user, this is used in the Script.js
     window.location = "GenericGameStore.html";
   } else{
     alert("incorrect password");
   } 
  }else{ 
     alert("Email not found");
  }
  });

  