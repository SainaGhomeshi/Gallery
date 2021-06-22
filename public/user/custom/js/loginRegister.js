let registerInfo = {
  firstName: "",
  lastName: "",
  password: "",
  reEnterPassword: "",
  email: "",
};

let loginInfo = {
  email: "",
  password: "",
};

let removeCart = [];

$("#registerUserButton").on("click", function (event) {
  event.preventDefault();
  registerInfo.firstName = document.querySelector(
    "#userFirstNameRegister"
  ).value;
  registerInfo.lastName = document.querySelector("#userLastNameRegister").value;
  registerInfo.email = document.querySelector("#userEmailRegister").value;
  registerInfo.password = document.querySelector("#userPasswordRegister").value;
  registerInfo.reEnterPassword = document.querySelector(
    "#userReEnterPasswordRegister"
  ).value;
  if (
    registerInfo.firstName !== "" &&
    registerInfo.lastName !== "" &&
    registerInfo.email !== "" &&
    registerInfo.password !== "" &&
    registerInfo.reEnterPassword !== ""
  ) {
    if (registerInfo.password === registerInfo.reEnterPassword) {
      axios
        .post("http://"+baseURL+":4211/api/register", registerInfo)
        .then((resp) => {
          if (resp.data.success) {
            if (resp.data.item.role === "customer") {
              cart = JSON.parse(window.localStorage.getItem("cart"));
              window.localStorage.clear();
              window.localStorage.setItem("key", resp.data.token);
              window.localStorage.setItem("role", resp.data.item.role);
              window.localStorage.setItem(
                "user",
                JSON.stringify(resp.data.item)
              );
              window.localStorage.setItem("cart", JSON.stringify(cart));
              location.reload();
            }
          }
        });
    } else {
      alert("رمز انتخاب شده با تکرار رمز هم خوانی ندارد");
    }
  } else {
    alert("لطفا همه فیلد های فرم ثبت نام رو پر کنید");
  }

});

$("#loginButton").on("click", function (event) {
  event.preventDefault();
  loginInfo.email = document.querySelector("#loginEmail").value;
  loginInfo.password = document.querySelector("#loginPassword").value;
  if (loginInfo.email || loginInfo.password) {
    axios
      .post("http://"+baseURL+":4211/api/login", loginInfo)
      .then((resp) => {
        if (resp.data.user.role === "customer") {
          cart = JSON.parse(window.localStorage.getItem("cart"));
          window.localStorage.clear();
          window.localStorage.setItem("key", resp.data.token);
          window.localStorage.setItem("role", resp.data.user.role);
          window.localStorage.setItem("user", JSON.stringify(resp.data.user));
          window.localStorage.setItem("cart", JSON.stringify(cart));
          location.reload();
        } else {
          alert("اکانت شما فاقد دسترسی لازم برای ورود هست");
        }
      })
      .catch((er) => alert(er));
  }
});

if (isLogin) {
  $(".log__in").append(
    '<a class="" href="profile"><i class="fas fa-user"></i></a>'
  );
} else {
  $(".log__in").append(
    '<a class="accountbox-trigger" href="#"><i class="fas fa-user"></i></a>'
  );
}

$(".numberOfCartProduct").remove();
$(".numberOfCartProductContainer").append(`
  <span class="numberOfCartProduct">${
    numberOfCartProduct < 10 ? `0${numberOfCartProduct}` : numberOfCartProduct
  }</span>
  `);

document.querySelector(".miniCartModal").addEventListener("click", () => {
  cart = JSON.parse(window.localStorage.getItem("cart"));
  $(".cartBoxModalItems").remove();
  $(".cartModalButton").remove();
  $(".cartBoxModalItemsContainer").append(
    '<div class="cartbox__items cartBoxModalItems"></div>'
  );
  cart.forEach((element, index) => {
    $(".cartBoxModalItems").append(`
      <div class="cartbox__item" >
      <div class="cartbox__item__thumb">
      <a href="product-details.html">
      <img width="100px" height="100px" src="http://${baseURL}:4211/productImage/${element.image}" alt="small thumbnail">
      </a>
      </div>
      <div class="cartbox__item__content text-right">
      <h5 class="text-right"><a href="product-details.html" class="product-name">${element.name}</a></h5>
      </div>
      <button class="cartbox__item__remove removeCartProduct" id=${index}>
      <i class="fa fa-trash"></i>
      </button>
      </div>
      `);
  });
  document.querySelectorAll(".removeCartProduct").forEach((element) => {
    element.addEventListener("click", () => {
      cart.forEach((cartElement, index) => {
        if (index != element.id) {
          removeCart.push(cartElement);
        }
      });
      window.localStorage.setItem("cart", JSON.stringify(removeCart));
      numberOfCartProduct = removeCart.length;
      $(".numberOfCartProduct").remove();
      $(".numberOfCartProductContainer").append(`
      <span class="numberOfCartProduct">${
        numberOfCartProduct < 10
          ? `0${numberOfCartProduct}`
          : numberOfCartProduct
      }</span>
  `);
      removeCart = [];
      document.querySelector(".closeCartModal").click();
    });
  });
  $(".cartBoxModalItemsContainer")
    .append(`<div class="cartbox__buttons cartModalButton">
    <a class="art__btn" href="cart"><span>نمایش کامل سبد خرید</span></a>
  </div>  `);
});
