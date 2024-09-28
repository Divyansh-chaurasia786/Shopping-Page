// Declare global variables
let cartItems = [];
let appliedCoupons = [];

// Function to load cart items from localStorage
function loadCartItems() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cartItems = JSON.parse(storedCart);
    }
}

// Function to save cart items to localStorage
function saveCartItems() {
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Function to render cart items dynamically
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) {
        console.error('Cart items container not found');
        return;
    }

    cartItemsContainer.innerHTML = ''; // Clear the current items before rendering new ones

    cartItems.forEach((item, index) => {
        const itemRow = document.createElement('tr');

        itemRow.innerHTML = `
            <td><a href="#"><i class="far fa-times-circle remove-item" data-index="${index}"></i></a></td>
            <td><img src="${item.image}" alt=""></td>
            <td>${item.name}</td>
            <td>$${parseFloat(item.price).toFixed(2)}</td>
            <td><input type="number" value="${item.quantity}" class="item-quantity" data-index="${index}" min="1"></td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;

        cartItemsContainer.appendChild(itemRow);
    });

    updateCart(); // Update the cart totals
    attachEventListeners(); // Attach event listeners for newly rendered items
}

// Function to calculate and update the total price
function updateCart() {
    let total = 0;

    cartItems.forEach(item => {
        let price = parseFloat(item.price) || 0;  // Ensure price is a valid number
        let quantity = parseInt(item.quantity) || 1;  // Ensure quantity is a valid integer
        total += price * quantity;  // Calculate subtotal for each item
    });

    // Update the subtotal and total on the page
    const cartTotalElement = document.getElementById('cart-total');
    const totalElement = document.getElementById('total');
    
    if (!cartTotalElement || !totalElement) {
        console.error('Cart total or total element not found');
        return;
    }

    let discountedTotal = total;
    let appliedDiscount = 0;

    // Apply coupon discount if any
    if (appliedCoupons.length > 0) {
        appliedCoupons.forEach(couponCode => {
            const discount = getDiscountForCoupon(couponCode);
            if (typeof discount === 'number' && discount >= 0 && discount <= 1) {
                appliedDiscount += discount;
            }
        });
        discountedTotal *= (1 - appliedDiscount);
    }

    cartTotalElement.textContent = `$${total.toFixed(2)}`;
    totalElement.innerHTML = `<strong>$${discountedTotal.toFixed(2)}</strong>`;

    // Store the cart total and discounted total in localStorage
    localStorage.setItem('cartTotal', total.toFixed(2));
    localStorage.setItem('discountedTotal', discountedTotal.toFixed(2));
}

// Function to remove an item from the cart
function removeItem(index) {
    cartItems.splice(index, 1); // Remove the item at the given index
    saveCartItems(); // Save the updated cart back to localStorage
    renderCartItems(); // Re-render the cart items to reflect the change
}

// Function to update item quantity in the cart
function updateQuantity(index, quantity) {
    if (quantity <= 0) quantity = 1; // Ensure quantity is at least 1
    cartItems[index].quantity = quantity;
    saveCartItems(); // Save updated cart
    renderCartItems(); // Re-render to reflect the updated quantity and price
}

// Attach event listeners for removing items and changing quantities
function attachEventListeners() {
    // Remove item event
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const index = this.getAttribute('data-index');
            removeItem(index);
        });
    });

    // Change quantity event
    document.querySelectorAll('.item-quantity').forEach(input => {
        input.addEventListener('change', function() {
            const index = this.getAttribute('data-index');
            const quantity = parseInt(this.value);
            updateQuantity(index, quantity);
        });
    });
}

// Function to apply a coupon
function applyCoupon(couponCode) {
    if (!couponCode) {
        alert('Please enter a coupon code.');
        return;
    }

    // Check if the coupon is already applied
    if (appliedCoupons.includes(couponCode)) {
        alert('This coupon has already been applied.');
        return;
    }

    const discount = getDiscountForCoupon(couponCode);
    if (discount > 0) {
        appliedCoupons.push(couponCode);
        alert(`Coupon applied successfully! You got a ${discount * 100}% discount.`);
        updateCart();
        // Store the applied coupon in localStorage
        localStorage.setItem('appliedCoupon', JSON.stringify({
            code: couponCode,
            discount: discount
        }));
    } else {
        alert('Invalid coupon code.');
    }
}

// Function to get discount for a coupon
function getDiscountForCoupon(couponCode) {
    // This is a simple example. In a real application, you might want to
    // check against a database or API for valid coupon codes.
    const validCoupons = {
        'SAVE10': 0.1,
        'SAVE20': 0.2,
        'HALFOFF': 0.5
    };

    return validCoupons[couponCode] || 0;
}

// Function to handle checkout
function checkout() {
    window.location.href = 'checkout.html';
}

// Call the render function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadCartItems(); // Load items from localStorage
    renderCartItems(); // Render items on page load

    // Add event listener for coupon input
    const couponInput = document.getElementById('coupon-code');
    const applyCouponButton = document.getElementById('apply-coupon');

    if (couponInput && applyCouponButton) {
        couponInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                applyCoupon(this.value);
            }
        });

        applyCouponButton.addEventListener('click', function() {
            applyCoupon(couponInput.value);
        });
    } else {
        console.error('Coupon input or apply button not found');
    }
});