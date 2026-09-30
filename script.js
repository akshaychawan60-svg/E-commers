// Store all products

let products = [];


// Store cart products

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Get products from the network

fetch("https://fakestoreapi.com/products")

    .then(function(response) {

        return response.json();

    })

    .then(function(data) {

        products = data;

        displayProducts();

        updateCartCount();

    })

    .catch(function(error) {

        document.getElementById("productContainer").innerHTML =
            "<p>Unable to load products.</p>";

    });


// Display products

function displayProducts() {

    let container =
        document.getElementById("productContainer");


    let searchText =
        document.getElementById("searchInput").value.toLowerCase();


    let selectedCategory =
        document.getElementById("categorySelect").value;


    container.innerHTML = "";


    products.forEach(function(product) {


        // Search filter

        let matchesSearch =
            product.title.toLowerCase().includes(searchText);


        // Category filter

        let matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;


        if (matchesSearch && matchesCategory) {


            let card =
                document.createElement("div");


            card.className = "product-card";


            card.innerHTML = `

                <img src="${product.image}">

                <h2>${product.title}</h2>

                <p class="price">
                    ₹${(product.price * 90).toFixed(0)}
                </p>

                <button
                    class="details-button"
                    onclick="showProduct(${product.id})">

                    View Details

                </button>


                <button
                    class="add-button"
                    onclick="addToCart(${product.id})">

                    Add to Cart

                </button>

            `;


            container.appendChild(card);

        }

    });

}


// Show product details

function showProduct(id) {

    let product =
        products.find(function(item) {

            return item.id === id;

        });


    document.getElementById("popupImage").src =
        product.image;


    document.getElementById("popupTitle").innerText =
        product.title;


    document.getElementById("popupDescription").innerText =
        product.description;


    document.getElementById("popupPrice").innerText =
        "₹" + (product.price * 90).toFixed(0);


    document.getElementById("popupAddButton").onclick =
        function() {

            addToCart(product.id);

            closeProduct();

        };


    document.getElementById("productPopup").style.display =
        "flex";

}


// Close product popup

function closeProduct() {

    document.getElementById("productPopup").style.display =
        "none";

}


// Add product to cart

function addToCart(id) {

    let product =
        products.find(function(item) {

            return item.id === id;

        });


    cart.push(product);


    saveCart();


    updateCartCount();


    alert("Product added to cart!");

}


// Save cart

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// Update cart number

function updateCartCount() {

    document.getElementById("cartCount").innerText =
        cart.length;

}


// Show cart

function showCart() {

    let cartItems =
        document.getElementById("cartItems");


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

    }


    let total = 0;


    cart.forEach(function(product, index) {


        total += product.price;


        let item =
            document.createElement("div");


        item.className = "cart-item";


        item.innerHTML = `

            <img src="${product.image}">

            <div>

                <p>${product.title}</p>

                <p>
                    ₹${(product.price * 90).toFixed(0)}
                </p>

                <button
                    onclick="removeFromCart(${index})">

                    Remove

                </button>

            </div>

        `;


        cartItems.appendChild(item);

    });


    document.getElementById("cartTotal").innerText =
        (total * 90).toFixed(0);


    document.getElementById("cartPopup").style.display =
        "flex";

}


// Close cart

function closeCart() {

    document.getElementById("cartPopup").style.display =
        "none";

}


// Remove product

function removeFromCart(index) {

    cart.splice(index, 1);


    saveCart();


    updateCartCount();


    showCart();

}


// Checkout

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }


    alert("Thank you for shopping with Mini Amazon!");


    cart = [];


    saveCart();


    updateCartCount();


    closeCart();

}