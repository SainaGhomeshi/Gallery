const token = window.localStorage.getItem('key');
const role = window.localStorage.getItem('role');

if (role === "superAdmin") {
    if (token) {
        console.log('logged in');
    } else {
        window.location.href="/admin/login"
    }
} else {
    window.location.href="/admin/login"
}

