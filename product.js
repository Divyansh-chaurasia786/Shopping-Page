document.addEventListener('DOMContentLoaded', function() {
    const MainImg = document.getElementById("MainImg");
    const smallImgs = document.querySelectorAll(".small-img");
    const productNameElement = document.querySelector('.single-pro-details h4');
    const productPriceElement = document.querySelector('.single-pro-details h2');

    if (MainImg && smallImgs.length && productNameElement && productPriceElement) {
        smallImgs.forEach((img, index) => {
            img.addEventListener('click', function() {
                MainImg.src = products[index].img;
                productNameElement.textContent = products[index].name;
                productPriceElement.textContent = `$${products[index].price.toFixed(2)}`;
            });
        });
    }

    const addToCartBtn = document.querySelector('.single-pro-details .normal');
    const quantityInput = document.querySelector('.single-pro-details input[type="number"]');
    const cartCountElement = document.querySelector('#navbar span');

    if (addToCartBtn && quantityInput && cartCountElement) {
        addToCartBtn.addEventListener('click', function() {
            // ... (rest of the add to cart logic)
        });

        // Function to update cart count
        function updateCartCount() {
            // ... (cart count update logic)
        }

        // Initialize cart count on page load
        updateCartCount();
    }

    const bar = document.getElementById('bar');
    const nav = document.getElementById('navbar');
    const close = document.getElementById('close');

    if (bar) {
        bar.addEventListener('click', function() {
            nav.classList.add('active');
        });
    }

    if (close) {
        close.addEventListener('click', function() {
            nav.classList.remove('active');
        });
    }
});