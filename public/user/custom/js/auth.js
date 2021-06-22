const userKey = window.localStorage.getItem('key');
const userRole = window.localStorage.getItem('role');
let user = JSON.parse(window.localStorage.getItem('user'));
let cart = JSON.parse(window.localStorage.getItem('cart'));
let numberOfCartProduct = 0;
if (!cart) {   
    window.localStorage.setItem('cart', JSON.stringify([]));
    window.location.href = '/user'
} else {
    numberOfCartProduct = cart.length;
} 
let isLogin = false;


if (userRole === "customer") {
    if (userKey !== null && user !== null ) {
        isLogin = true;
    }
} else {
    window.localStorage.removeItem('sellerData');
    window.localStorage.removeItem('sellerGallery');
    window.localStorage.removeItem('role');
    window.localStorage.removeItem('key');
}

