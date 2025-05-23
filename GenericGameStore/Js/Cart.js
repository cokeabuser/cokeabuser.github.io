(function () {
    const USER_KEY = 'user';
  
    function getCurrentUserEmail() {
      const userJSON = localStorage.getItem(USER_KEY);
      if (!userJSON) return null;
      try {
        const user = JSON.parse(userJSON);
        return user.Email || null;
      } catch {
        return null;
      }
    }
  
    function getCartKey() {
      const email = getCurrentUserEmail();
      return email ? `cart_${email}` : null;
    }
  
    function getCart() {
      const key = getCartKey();
      if (!key) return [];
      const cartJSON = localStorage.getItem(key);
      return cartJSON ? JSON.parse(cartJSON) : [];
    }
  
    function saveCart(cart) {
      const key = getCartKey();
      if (!key) return;
      localStorage.setItem(key, JSON.stringify(cart));
    }
  
    // Add item to cart without duplicates
    window.addItemToCart = function (item) {
      const email = getCurrentUserEmail();
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
    window.setupAddToCartButton = function (buttonId, getGameData) {
      document.addEventListener('DOMContentLoaded', () => {
        const btn = document.getElementById(buttonId);
        if (!btn) return;
  
        if (getCurrentUserEmail()) {
          btn.style.display = 'inline-block';
        } else {
          btn.style.display = 'none';
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
  
    // Render cart page
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
  
    // Remove item from cart by index
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