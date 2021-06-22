if (user.cart.length == 0 || !user) {
  window.location.href = "/user/cart";
}


let cityList = [];
let sendCity = {
  firstPerson: "",
  secondPerson: "",
};
let secondPersonOn = false;
totalPayment = 0;

document.querySelector(".firstPersonName").value = user.firstName;
document.querySelector(".firstPersonLastName").value = user.lastName;
document.querySelector(".firstPersonAddress").value = user.address
  ? user.address
  : "";
document.querySelector(".firstPersonPostId").value = user.postId
  ? user.postId
  : "";
document.querySelector(".firstPersonPhone").value = user.phone
  ? user.phone
  : "";
document.querySelector(".firstPersonCity").value = user.city
  ? user.city.name
  : "";
sendCity.firstPerson = user.city ? user.city._id : "";
document.querySelector(".firstPersonAddressShower").innerHTML = user.address
  ? user.address
  : "";

document.querySelector(".firstPersonAddress").addEventListener("change", () => {
  document.querySelector(".firstPersonAddressShower").innerHTML = "";
  document.querySelector(".firstPersonAddressShower").innerHTML =
    document.querySelector(".firstPersonAddress").value;
});

document.querySelector(".secondPersonToggle").addEventListener("click", () => {
  secondPersonOn = !secondPersonOn;
});


cart.forEach((cartElement) => {
  user.cart.forEach((userCartElement) => {
    if (cartElement._id == userCartElement.product) {
      $(".cartTotalDetail").append(`
      <li><p class="text-center">تومان ${
        cartElement.isDiscounted
          ? `${cartElement.priceWithDiscount * userCartElement.number}`
          : `${cartElement.price * userCartElement.number}`
      }</p><p class="text-right"> ${cartElement.name} * ${
        userCartElement.number
      }</p></li>
      `);
      if (cartElement.isDiscounted) {
        totalPayment =
          cartElement.priceWithDiscount * userCartElement.number + totalPayment;
      } else {
        totalPayment =
          cartElement.price * userCartElement.number + totalPayment;
      }
    }
  });
});

$(".cartTotalDetail").append(`
<li><p class="strong text-center">نومان ${totalPayment}</p><p class="strong text-right">مبلغ کل</p></li>
<li class="text-right"><button type="button" class="art__btn buyProductButton">ثبت سفارش</button></li>
`);

document.querySelector(".buyProductButton").addEventListener("click", () => {
  if (secondPersonOn) {
    if (
      document.querySelector(".secondPersonName").value &&
      document.querySelector(".secondPersonLastName").value &&
      document.querySelector(".secondPersonAddress").value &&
      document.querySelector(".secondPersonPhone").value &&
      document.querySelector(".secondPersonPostId").value &&
      sendCity.secondPerson
    ) {
      axios
        .put(
          `http://${baseURL}:4211/api/customer/editprofile`,
          {
            firstName: document.querySelector(".secondPersonName").value,
            lastName: document.querySelector(".secondPersonLastName").value,
            address: document.querySelector(".secondPersonAddress").value,
            phone: document.querySelector(".secondPersonPhone").value,
            postId: document.querySelector(".secondPersonPostId").value,
            city: sendCity.secondPerson,
          },
          {
            headers: {
              Authorization: userKey,
            },
          }
        )
        .then((respons) => {
          if (respons.data.success) {
            axios
              .get("http://"+baseURL+":4211/api/customer/profile", {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: userKey,
                },
              })
              .then((respon) => {
                if (respon.data.success) {
                  window.localStorage.setItem(
                    "user",
                    JSON.stringify(respon.data.item)
                  );
                  axios
                    .get(
                      "http://"+baseURL+":4211/api/customer/buyproducts",
                      {
                        headers: {
                          Authorization: userKey,
                        },
                      }
                    )
                    .then((resp) => {
                      if (resp.data.success) {
                        axios
                          .put(
                            `http://${baseURL}:4211/api/customer/editprofile`,
                            {
                              firstName:
                                document.querySelector(".firstPersonName")
                                  .value,
                              lastName: document.querySelector(
                                ".firstPersonLastName"
                              ).value,
                              address: document.querySelector(
                                ".firstPersonAddress"
                              ).value,
                              phone:
                                document.querySelector(".firstPersonPhone")
                                  .value,
                              postId:
                                document.querySelector(".firstPersonPostId")
                                  .value,
                              city: sendCity.firstPerson,
                            },
                            {
                              headers: {
                                Authorization: userKey,
                              },
                            }
                          )
                          .then((respons) => {
                            if (respons.data.success) {
                              axios
                                .get(
                                  "http://"+baseURL+":4211/api/customer/profile",
                                  {
                                    headers: {
                                      "Content-Type": "multipart/form-data",
                                      Authorization: userKey,
                                    },
                                  }
                                )
                                .then((respon) => {
                                  if (respon.data.success) {
                                    window.localStorage.setItem(
                                      "user",
                                      JSON.stringify(respon.data.item)
                                    );
                                    cart = [];
                                    window.localStorage.setItem(
                                      "cart",
                                      JSON.stringify(cart)
                                    );
                                    window.location.href = "/user/";
                                  }
                                });
                            }
                          });
                      }
                    });
                }
              });
          }
        });
    }
  } else {
    if (
      document.querySelector(".firstPersonName").value &&
      document.querySelector(".firstPersonLastName").value &&
      document.querySelector(".firstPersonAddress").value &&
      document.querySelector(".firstPersonPhone").value &&
      document.querySelector(".firstPersonPostId").value &&
      sendCity.firstPerson
    ) {
      axios
        .put(
          `http://${baseURL}:4211/api/customer/editprofile`,
          {
            firstName: document.querySelector(".firstPersonName").value,
            lastName: document.querySelector(".firstPersonLastName").value,
            address: document.querySelector(".firstPersonAddress").value,
            phone: document.querySelector(".firstPersonPhone").value,
            postId: document.querySelector(".firstPersonPostId").value,
            city: sendCity.firstPerson,
          },
          {
            headers: {
              Authorization: userKey,
            },
          }
        )
        .then((respons) => {
          if (respons.data.success) {
            axios
              .get("http://"+baseURL+":4211/api/customer/profile", {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: userKey,
                },
              })
              .then((respon) => {
                if (respon.data.success) {
                  window.localStorage.setItem(
                    "user",
                    JSON.stringify(respon.data.item)
                  );
                  axios
                    .get(
                      "http://"+baseURL+":4211/api/customer/buyproducts",
                      {
                        headers: {
                          Authorization: userKey,
                        },
                      }
                    )
                    .then((resp) => {
                      if (resp.data.success) {
                        cart = [];
                        window.localStorage.setItem(
                          "cart",
                          JSON.stringify(cart)
                        );
                        window.location.href = "/user/";
                      }
                    });
                }
              });
          }
        });
    }
  }
});

axios
  .get("http://"+baseURL+":4211/api/cities", {
    headers: {
      Authorization: userKey,
    },
  })
  .then((response) => {
    if (response.data.items) {
      response.data.items.forEach((element) => {
        cityList.push({ name: element.name, code: element._id });
      });
    }
  });

let firstPersonOptions = {
  data: cityList,
  getValue: "name",

  list: {
    match: {
      enabled: true,
    },
    onSelectItemEvent: function () {
      sendCity.firstPerson = $(".firstPersonCity").getSelectedItemData().code;
    },
  },
};

$(".firstPersonCity").easyAutocomplete(firstPersonOptions);

let secondPersonOptions = {
  data: cityList,
  getValue: "name",

  list: {
    match: {
      enabled: true,
    },
    onSelectItemEvent: function () {
      sendCity.secondPerson = $(".secondPersonCity").getSelectedItemData().code;
    },
  },
};

$(".secondPersonCity").easyAutocomplete(secondPersonOptions);
