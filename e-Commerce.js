var navBar=document.querySelector(".nav-bar");
var hamber=document.querySelector(".hamber");

hamber.onclick=()=>{
    navBar.classList.toggle("navbar")
};

var cartIcon=document.querySelector("#cart-icon");
var cart=document.querySelector(".cart");
var closeIcon=document.querySelector("#close-icon");

cartIcon.onclick=()=>{
    cart.classList.add("active")
}
closeIcon.onclick=()=>{
    cart.classList.remove("active")
};

//delete
if(document.readyState='loading'){
    document.addEventListener("click", ready)
}else{
    ready()
};
function ready(){
    var deleteIcon=document.querySelectorAll(".remove-icon");
    for(var i=0; i<deleteIcon.length; i++){
        var button=deleteIcon[i]
        button.addEventListener("click", deleteIconItem)
    }
};
function deleteIconItem(event){
    var buttonClicked=event.target;
    buttonClicked.parentElement.remove();
    updateTotalPrice();
    updateCartCount(-1)
};

var cartContent=document.querySelector(".cart-content");
var addCartButtons=document.querySelectorAll(".add-cart");
addCartButtons.forEach(button=>{
    button.addEventListener("click", event=>{
        var singleProduct=event.target.closest(".box-1");
        addToCart(singleProduct)
    })
});

var addToCart=singleProduct=>{
    var singleProductImgSrc=singleProduct.querySelector("img").src;
    var singleProductTitle=singleProduct.querySelector(".product-title").textContent;
    var singleProductPrice=singleProduct.querySelector(".main-price").textContent;



    const cartItem =cartContent.querySelectorAll(".cart-product-title");
   for(let item of cartItem){
    if(item.textContent===singleProductTitle){
      alert("this item is already in the cart.");
           return;
       }
   }


   
    var cartBox=document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML=`
    
    
    <img src="${singleProductImgSrc}" alt="">
                <div class="detials">
                    <div class="cart-product-title">${singleProductTitle}</div>
                    <span class="cart-product-price">${singleProductPrice}</span>
                    <div class="cart-quantity">
                        <button id="biyog">-</button>
                        <span class="number">1</span>
                        <button id="plus">+</button>
                    </div>
                </div>
                <i class="fa fa-trash remove-icon"></i>
    
    `;
cartContent.appendChild(cartBox);

//cart-quantity

cartBox.querySelector(".cart-quantity").addEventListener("click", event=>{
    var numberElement=cartBox.querySelector(".number");
    var biyogButton=cartBox.querySelector("#biyog")
    let quantity=numberElement.textContent;

    if(event.target.id==="biyog" && quantity>1){
        quantity--;
        if(quantity===1){
            biyogButton.style.color==="#999"
        }
    }else if(event.target.id==="plus"){
        quantity++;
        biyogButton.style.color==="#333"
    }
    numberElement.textContent=quantity;
    updateTotalPrice()
});
updateCartCount(1)
updateTotalPrice()


function updateCartUI() {
    const cartCountElement = document.getElementsByClassName("cart-count-number");
    const savedCount = parseInt(localStorage.getItem("cartCountnumber")) || 0;
    cartCountElement.textContent = savedCount;
  }
};






//total

var updateTotalPrice=()=>{
    var totalPriceElement=document.querySelector(".total-price");
    var cartBoxes=cartContent.querySelectorAll(".cart-box");
    let total=0;


    cartBoxes.forEach(cartBox=>{
        var priceElement=cartBox.querySelector(".cart-product-price");
        var quantityElement=cartBox.querySelector(".number");
        var price=priceElement.textContent.replace("$", "");
        var quantity=quantityElement.textContent;
        total+=price*quantity;
    })
    totalPriceElement.textContent=`$${total}`
};

//count
let cartItemCount=0;
var updateCartCount=change=>{
    var cartItemCountBadge=document.querySelector(".cart-count-number");
    cartItemCount+=change;
    if(cartItemCount>0){
        cartItemCountBadge.style.visibility="visible"
        cartItemCountBadge.textContent=cartItemCount;
    }else{
        cartItemCountBadge.style.visibility="hidden"
        cartItemCountBadge.textContent="";
    }
};

//single-product
var bigImg=document.querySelector(".big-img img");
function showImg(pic){
    bigImg.src=pic;
}







