let loginInfo = {
  email: "",
  password: "",
};

$("#loginButton").on("click", function (event) {
  event.preventDefault();
  loginInfo.email = document.querySelector("#loginEmail").value;
  loginInfo.password = document.querySelector("#loginPassword").value;
  if (loginInfo.email || loginInfo.password) {
    axios
      .post("http://"+baseURL+":4211/api/sellerlogin", loginInfo)
      .then((resp) => {
        if (resp.data.user.role === "seller") {
          window.localStorage.clear();
          window.localStorage.setItem("key", resp.data.token);
          window.localStorage.setItem("role", resp.data.user.role);
          window.localStorage.setItem(
            "sellerData",
            JSON.stringify(resp.data.user)
          );
          window.localStorage.setItem(
            "sellerGallery",
            JSON.stringify(resp.data.gallery)
          );
          window.location.href = "/seller/listOfProduct";
        } else {
          alert("اکانت شما فاقد دسترسی لازم برای ورود هست");
        }
      })
      .catch((er) => console.error(er));
  }
});
