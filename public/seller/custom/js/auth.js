const auth = window.localStorage.getItem('key');
const role = window.localStorage.getItem('role');
let loggedIn = false;

if (role === 'seller') {
    if (auth) {
        loggedIn=true;
    }
}
else {
    window.location.href= '/seller/login';
}