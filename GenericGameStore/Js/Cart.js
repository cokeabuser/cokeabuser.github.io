(function () {
    const USER_KEY = 'user'; // Makes the const user_key=user, Const can't be changed by the assingment operator
  
    function getCurrentUserEmail() {// gets the email of curenlty logged in user
      const userJSON = localStorage.getItem(USER_KEY);// puts the cons userJSON to be the email from the logged in user
      if (!userJSON) return null;// if no user is found it returns null and does nothing 
      try {
        const user = JSON.parse(userJSON);// makes the const user to be the user email
        return user.Email || null;// returns the email or null
      } catch {
        return null;
      }
    }
  
    function getCartKey() {// a function to make a unique cart key for the currently logged in user
      const email = getCurrentUserEmail();// get the user from the previes function
      return email ? `cart_${email}` : null;// returns cart_"email" if the email exists other wise returns null
    }
  
    function getCart() {// a funktion to load the cart for the current user from localStorage
      const key = getCartKey();// makes the const key the cart key made in the previus function
      if (!key) return [];
      const cartJSON = localStorage.getItem(key);
      return cartJSON ? JSON.parse(cartJSON) : [];// returns the cart list if it exists
    }
  
    function saveCart(cart) {//a function to save the cart for the current user to localStorage
      const key = getCartKey();
      if (!key) return;
      localStorage.setItem(key, JSON.stringify(cart));/
    }
  
   
    window.addItemToCart = function (item) { // Adds a game to the cart if user is logged in and it's not already in cart
      const email = getCurrentUserEmail();// takes the email from the function
      if (!email) {
        alert('Please log in to add items to the cart.');
        return;
      }
      const key = `cart_${email}`;
      const items = JSON.parse(localStorage.getItem(key) || '[]');
  
      const alreadyInCart = items.some(i => i.title === item.title);
      if (!alreadyInCart) {
        items.push(item);
        localStorage.setItem(key, JSON.stringify(items));
        alert('Added to cart!');
      } else {
        alert('This item is already in your cart.');
      }
    };
  
    // Setup button logic on game pages
    window.setupAddToCartButton = function (buttonId, getGameData) {//Activates and shows the add-to-cart button on game pages
      document.addEventListener('DOMContentLoaded', () => {
        const btn = document.getElementById(buttonId);
        if (!btn) return;
  
        if (getCurrentUserEmail()) {
          btn.style.display = 'inline-block';// Shows button if logged in
        } else {
          btn.style.display = 'none';// Hides the button if not logged in
        }
  
        btn.addEventListener('click', () => {
          const gameData = getGameData();
          if (!gameData || !gameData.title) {
            alert('Game data missing or invalid.');
            return;
          }
          window.addItemToCart(gameData);
        });
      });
    };
  
     // Renders the cart contents on the cart page
    function renderCart() {
      const cart = getCart();
      const container = document.getElementById('cart-content');
      if (!container) return;
  
      if (cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty.</p>';
        return;
      }
  
      let html = '<ul>';
      cart.forEach((item, index) => {
        const title = item.title || item.name || 'Unnamed Item';
        html += `<li>${title} <button onclick="removeFromCart(${index})">Remove</button></li>`;
      });
      html += '</ul>';
      container.innerHTML = html;
    }
  
   // Removes item at the given index from the cart
    window.removeFromCart = function (index) {
      let cart = getCart();
      cart.splice(index, 1);
      saveCart(cart);
      renderCart();
    };
  
    // Auto-render cart if on cart page
    document.addEventListener('DOMContentLoaded', () => {
      if (document.getElementById('cart-content')) {
        renderCart();
      }
    });
  })();
