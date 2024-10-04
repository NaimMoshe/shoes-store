import React, { useState } from 'react';

function Cart({removeFromCart, onCheckout }) {
  
  const [cart, setCart] = useState(cart);

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return; 
    setCart(prevCart =>
      prevCart.map(item =>
        item._id === productId ? { ...item, quantity: parseInt(quantity, 10) } : item
      )
    );
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="cart">
      <h3>Cart</h3>
      {cart.map(item => (
        <div key={item._id} className="cart-item">
          <img src={`/images/${item.imageUrl}`} alt={item.name} />
          <p>{item.name}</p>
          <p>Price: ${item.price}</p>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => updateQuantity(item._id, e.target.value)}
          />
          <p>Total: ${item.price * item.quantity}</p>
          <button onClick={() => removeFromCart(item._id)}>Remove</button>
        </div>
      ))}
      <h4>Total: ${total.toFixed(2)}</h4>
      <button onClick={onCheckout}>Place Order</button>
    </div>
  );
}

export default Cart;
