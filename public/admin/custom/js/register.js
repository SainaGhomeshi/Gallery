document.querySelector("#registerButton").addEventListener("click", (event) => {
  event.preventDefault();
  if (
    document.querySelector("#registerFirstName").value &&
    document.querySelector("#registerLastName").value &&
    document.querySelector("#registerPassword").value &&
    document.querySelector("#registerReEnterPassword").value &&
    document.querySelector("#registerEmail").value 
  ) {
      if (document.querySelector("#registerPassword").value === document.querySelector("#registerReEnterPassword").value) {
        axios
        .post("http://"+baseURL+":4211/api/addsuperadmin", {
          firstName: document.querySelector("#registerFirstName").value,
          lastName: document.querySelector("#registerLastName").value,
          password: document.querySelector("#registerPassword").value,
          email: document.querySelector("#registerEmail").value,
        })
        .then((response) => {
          if (response.data.success) {
            window.localStorage.clear();
            window.location.href = "/admin/login";
          } else {
              alert(response.data.msg)
          }
        });
      } else {
          alert('رمز و تکرار رمز یکسان نیست لطفا دوباره وارد کنید')
      }
  } else {
      alert('فرم را کامل کنید')
  }
});
