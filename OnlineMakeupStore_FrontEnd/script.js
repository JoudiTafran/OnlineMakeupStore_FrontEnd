//Make the nav bar responsive
function toggleMenu() {
    const menuShow = document.getElementById('menuShow');
    menuShow.classList.toggle('show');
}



// Cart 
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// Open Cart
cartIcon.onclick = () => { cart.classList.add("active");};
// CLose Cart
closeCart.onclick = () => { cart.classList.remove("active");};
// Cart Working JS
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// Making Function
function ready(){
    //Reomve Items From Cart
    var reomveCartButtons =document.getElementsByClassName('cart-remove');
    console.log(reomveCartButtons);
    for (var i = 0; i < reomveCartButtons.length; i++){
        var button = reomveCartButtons[i];
        button.addEventListener("click" , removeCartItem);
    }

    // Quantity Changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change" , quantityChanged);
    }

    // Add To Cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i= 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addCartclicked );
    }

    //Buy button work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click',buyButtonClicked);
}

// Reomve Items From Cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

// Quantity Changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

// Add To cart
function addCartclicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    //console.log(title, price, productImg);
    addProductToCart(title, price, productImg);
    updatetotal();
}
function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems =document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("You have already add this item to cart");
            return;
        }
    }
    var cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <i class="fa-solid fa-trash cart-remove"></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}

//Buy button
function buyButtonClicked() {
    var cartBox = document.getElementsByClassName('cart-box')[0];
    var Buybox = document.querySelector(".Buybox");
    if(cartBox.length != 0){
        Buybox.style.display = "block";
    } else{
        alert("Please add products to shopping cart to buy it");
    }
}
document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("form");
    var Buybox = document.querySelector(".Buybox");
    
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevents the form from submitting normally
    
        // Validate the form inputs
        if (validateForm()) {
          // If the form is valid, show the payment box
          Buybox.style.display = "none";
          alert("Your order has been received");
          form.reset();
          cart.classList.remove("active");
          var cartContent = document.getElementsByClassName('cart-content')[0];
          while(cartContent.hasChildNodes()){
            cartContent.removeChild(cartContent.firstChild);
          }
          updatetotal();
        }
    });
    function validateForm() {
        return true; // Form is valid
    }
    // Close the payment box when clicked
    var close = document.querySelector(".popup-close");
    close.addEventListener('click',()=>{
        Buybox.style.display='none';
    },10);
});

//Update Total
function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i= 0; i < cartBoxes.length; i++) {
        var cartBox =cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + price * quantity;
        // If price Contain some Cents Value
        total = Math.round(total*100)/100;
    }
    var Total = document.getElementsByClassName("total-price");
    for (var i= 0; i < Total.length; i++) {
        Total[i].innerText = "$" + total;
    }
}



// Function to update the clock
function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Display the time in the "clock" element
    document.getElementById("clock").textContent = hours + ":" + minutes + ":" + seconds;

    // Update the clock every second
    setTimeout(updateClock,1000);
}
updateClock();