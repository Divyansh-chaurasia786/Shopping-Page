document.addEventListener('DOMContentLoaded', function() {
    // Handle add-to-cart functionality
    const addToCartButtons = document.querySelectorAll('.add_to_cart');
    const cartCountElement = document.querySelector('#lg-bag span');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartCount() {
        if (cartCountElement) {
            cartCountElement.textContent = cart.length;
        }
    }

    function addToCart(event) {
        event.preventDefault();
        const productElement = event.target.closest('.pro');
        const productId = productElement.getAttribute('data-id');
        const productPrice = productElement.getAttribute('data-price');
        const productImage = productElement.querySelector('img').src;
        const productName = productElement.querySelector('h5').textContent;

        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        };

        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    updateCartCount();

// Store token after successful sign-in
function handleSignIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    fetch('/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('userToken', data.token);
            window.location.href = 'home.html'; // Redirect to homepage after successful sign in
        } else {
            alert('Invalid email or password!');
        }
    })
    .catch(error => console.error('Error during sign-in:', error));
}

// Handle sign-up logic
function handleSignUp() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    
    fetch('/signup', { // Implement /signup route in your backend
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Sign-up successful!');
            window.location.href = 'signin.html'; // Redirect to sign-in page
        } else {
            alert('Sign-up failed!');
        }
    })
    .catch(error => console.error('Error during sign-up:', error));
}

// Cart functions
function fetchCartData() {
    const token = localStorage.getItem('userToken');
    
    fetch('/cart', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        displayCartItems(data);
    })
    .catch(error => console.error('Error fetching cart data:', error));
}

});

