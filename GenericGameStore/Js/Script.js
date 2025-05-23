
  
    document.addEventListener("DOMContentLoaded", function() {// funkar bara om allt har laddad in först
        var user = localStorage.getItem("user");
  
    if (user) {
      var parsedUser = JSON.parse(user);  // Converter stored JSON till ett objekt
  
      // ändrar "Logga in" knappen till att visa användarens email
      var loginLink = document.getElementById("loginLink");
      loginLink.innerHTML = parsedUser.Email;
      loginLink.href = "#"; // stopar att man kan klicka på namnet och åka tillbaka till loggin sidan
  
      // Show logout button
       document.getElementById("logoutButton").hidden = false;
    }
  
  document.getElementById("logoutButton").addEventListener("click", function() {
  localStorage.removeItem("user");
  window.location.reload();
  });
 
 document.addEventListener("DOMContentLoaded", function () {
  const loginLink = document.getElementById("loginLink");
  const logoutButton = document.getElementById("logoutButton");

  const userJSON = localStorage.getItem("user");// gets the userjson from Login.js

  if (userJSON && loginLink && logoutButton) {// only works if there is a logged in user, a login button and a logout button
    const user = JSON.parse(userJSON);

    // Update login link to show email
    loginLink.innerHTML = `<button>${user.Email}</button>`;
    loginLink.href = "#";

    // Show the logout button
    logoutButton.hidden = false;

    // Add logout functionality
    logoutButton.addEventListener("click", function () {
      localStorage.removeItem("user");
      window.location.reload();
    });
  }
});
      });
      