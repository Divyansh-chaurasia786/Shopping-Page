function displayOrderSummary() {
    console.log("Displaying order summary...");

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTotal = parseFloat(localStorage.getItem('cartTotal')) || 0;
    const discountedTotal = parseFloat(localStorage.getItem('discountedTotal')) || 0;
    const appliedCoupon = JSON.parse(localStorage.getItem('appliedCoupon'));

    console.log("Cart Items:", cartItems);
    console.log("Cart Total:", cartTotal);
    console.log("Discounted Total:", discountedTotal);
    console.log("Applied Coupon:", appliedCoupon);

    const orderItemsList = document.getElementById('order-items');
    const discountAmountElement = document.getElementById('discount-amount');
    const totalAmountElement = document.getElementById('total-amount'); // Changed from 'order-total' to 'total-amount'

    if (!orderItemsList) {
        console.error('Order items list element not found');
        return;
    }

    if (!totalAmountElement) {
        console.error('Total amount element not found');
        return;
    }

    // Calculate the discount amount
    const discountAmount = cartTotal - discountedTotal;

    // Display cart items
    orderItemsList.innerHTML = '';
    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} x ${item.quantity} - $${((parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0)).toFixed(2)}`;
        orderItemsList.appendChild(li);
    });

    // Display discount amount if applicable
    if (discountAmountElement && discountAmount > 0) {
        discountAmountElement.textContent = `$${discountAmount.toFixed(2)}`;
    } else if (discountAmountElement) {
        discountAmountElement.textContent = '$0.00';
    }

    // Display total amount
    totalAmountElement.textContent = `$${discountedTotal.toFixed(2)}`;

    console.log("Order summary displayed successfully");
}

// Call this function when the checkout page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM content loaded");
    displayOrderSummary();
});

// Handle form submission
document.getElementById('payment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log("Form submitted");
    
    // Here you would typically send the form data to your server for processing
    // For this example, we'll just show an alert
    alert('Order placed successfully! Thank you for your purchase.');
    
    // Clear the cart and applied coupon after successful order
    localStorage.removeItem('cart');
    localStorage.removeItem('cartTotal');
    localStorage.removeItem('discountedTotal');
    localStorage.removeItem('appliedCoupon');
    
    // Redirect to the home page or order confirmation page
    window.location.href = 'index.html';
});