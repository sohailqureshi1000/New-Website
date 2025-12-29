// script.js

// 1. Add to Cart Function
function addToCart(id, name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if product already exists
    let existingProduct = cart.find(product => product.id === id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(name + " added to cart!");
    updateCartIcon();
}

// 2. Display Cart Function (for cart.html)
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContainer = document.getElementById("cart-body");
    
    if (!cartContainer) return; // Stop if we aren't on cart page

    cartContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<tr><td colspan="6">Your cart is empty</td></tr>';
        updateTotals(0);
        return;
    }

    cart.forEach(item => {
        let total = item.price * item.quantity;
        cartContainer.innerHTML += `
            <tr>
                <td><a href="#" onclick="removeItem(${item.id}); return false;"><i class="fas fa-trash-alt"></i></a></td>
                <td><img src="${item.image}" alt=""></td>
                <td><h5>${item.name}</h5></td>
                <td><h5>$${item.price}</h5></td>
                <td><input class="w-25 pl-1" value="${item.quantity}" type="number" onchange="updateQuantity(${item.id}, this.value)"></td>
                <td><h5>$${total}</h5></td>
            </tr>
        `;
    });

    updateTotals();
}

// 3. Remove Item
function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartIcon();
}

// 4. Update Quantity
function updateQuantity(id, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = cart.find(item => item.id === id);
    if (product) {
        product.quantity = parseInt(newQuantity);
        if (product.quantity <= 0) product.quantity = 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
}

// 5. Update Totals
function updateTotals() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;
    
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    let subtotalEl = document.getElementById("cart-subtotal");
    let totalEl = document.getElementById("cart-total");

    if (subtotalEl) subtotalEl.innerText = "$" + subtotal;
    if (totalEl) totalEl.innerText = "$" + subtotal; // Assuming free shipping for now
}

// 6. Update Cart Icon Badge (Optional: if you add a badge to navbar)
function updateCartIcon() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // If you have an element with id='cart-count', it will update it
    let countEl = document.getElementById('cart-count');
    if (countEl) countEl.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
}

// Run displayCart when page loads
window.onload = function() {
    displayCart();
    updateCartIcon();
};