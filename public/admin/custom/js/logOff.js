



document.querySelector('#logOff').addEventListener('click', function () {
    window.localStorage.clear();
    window.location.reload();
})