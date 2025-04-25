document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalContainer = document.createElement('div');
    totalContainer.id = 'cartTotal';
    cartItemsContainer.after(totalContainer);
  
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    function saveCart() {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
    function renderCart() {
      cartItemsContainer.innerHTML = '';
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalContainer.innerHTML = '';
        return;
      }
  
      cart.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'cart-item';
        card.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-details">
            <h4>${item.name}</h4>
            <p>Category: ${item.category}</p>
            <p>Price: ₹${item.price}</p>
            <div class="quantity-control">
              <button class="qty-btn" onclick="updateQty(${index}, -1)">−</button>
              <span class="qty">${item.qty}</span>
              <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
            </div>
            <p class="subtotal">Subtotal: ₹${item.price * item.qty}</p>
          </div>
          <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(card);
      });
  
      // Show total
      const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
      totalContainer.innerHTML = `<h3>Total: ₹${total}</h3>`;
    }
  
    window.removeItem = function(index) {
      cart.splice(index, 1);
      saveCart();
      renderCart();
    };
  
    window.updateQty = function(index, change) {
      if (cart[index].qty + change >= 1) {
        cart[index].qty += change;
        saveCart();
        renderCart();
      }
    };
  
    renderCart();
  });
  