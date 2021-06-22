let email = "";
let password = "";

document
  .getElementById("loginButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    if (password && email) {
      axios
        .post("http://"+baseURL+":4211/api/login", {
          email,
          password,
        })
        .then((resp) => {
          if (resp.data.user.role === "superAdmin") {
            window.localStorage.clear();
            window.localStorage.setItem("key", resp.data.token);
            window.localStorage.setItem("role", resp.data.user.role);
            window.location.href = "/admin/listOfSellers";
          } else {
            alert("اکانت شما فاقد دسترسی لازم برای ورود هست");
          }
        })
        .catch((er) => console.error(er));
    } else {
      alert("نام کاربری یا رمز عبور را وارد نکردید");
    }
  });
