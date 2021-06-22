
let formData = new FormData();
let listOfCities = [];
let listOfCity = [];
let listOfFuctor = [];

let editProfile = {
  city: null,
};

if (!user) {
  window.location.href = "/user/";
}

axios
  .get("http://"+baseURL+":4211/api/customer/userfactors", {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: userKey,
    },
  })
  .then((resp) => {
    if (resp.data.items) {
      resp.data.items.forEach((factorElement, index) => {

        $(".factorContainer").append(`
              <div class="d-flex flex-column shop-history-item-container factorItemContainer${index} ">
              <div class="d-flex flex-row w-100 shop-history-item-header align-items-center justify-content-center">
                                      <span class="date-section"> 1399/7/7 </span>
                                      <span class="date-section"> پرداخت شده </span>
                                  </div>
                                  <div class="d-flex flex-column w-100 align-items-end factorProductContainer${index}" style="border-bottom: 2px solid #680505;"></div>
                                  <div class="d-flex flex-row w-100 align-items-center justify-content-end ">
                                      <button disabled class="btn btn-primary total-price-button" type="button">${factorElement.totalPrice}</button>
                                  </div>
                              </div>
              `);
        for (
          let gallery = 0;
          gallery < factorElement.galleries.length;
          gallery++
        ) {
          $(`.factorProductContainer${index}`).append(`
                <div class="d-flex flex-row w-100 justify-content-around align-items-center" ${
                  gallery === factorElement.galleries.length - 1
                    ? ""
                    : 'style="border-bottom: 1px solid grey;"'
                } >
                <span class="text-dark" style="width: 50px"> ${
                  factorElement.items[gallery].product.name
                } </span>
                <span class="text-dark"> X${
                  factorElement.items[gallery].number
                }</span>
                <span class="text-dark"> ${
                  factorElement.items[gallery].priceWithDiscount > 0
                    ? factorElement.items[gallery].priceWithDiscount
                    : factorElement.items[gallery].price
                }</span>
            </div>
                `);
        }
      });
    }
  });

$(".littleProfile").append(`
<img class="rounded-circle mt-5" src="http://${baseURL}:4211/userAvatar/${user.avatar}" width="150px" height="150px"/>
<span class="font-weight-bold">${user.firstName} ${user.lastName}</span>
<span class="text-black-50">${user.email}</span>
<input type="file" id="avatarInput" class="btn mt-10 btn-lg w-lg btn-purple waves-effect waves-light editProfilePicture"/>
<button class="art__btn logoutButton"> خروج از حساب کاربری</button>
`);

document.querySelector(".firstName").value = user.firstName;
document.querySelector(".lastName").value = user.lastName;
document.querySelector(".userName").value = user.userName;
document.querySelector(".postId").value = user.postId ? user.postId : "";
document.querySelector(".phone").value = user.phone ? user.phone : "";
document.querySelector(".email").value = user.email;
document.querySelector(".address").value = user.address ? user.address : "";
document.querySelector("#customerCity").value = user.city
  ? user.city.name
  : "";
editProfile.city = user.city? user.city._id: '';

document
  .querySelector(".editProfilePicture")
  .addEventListener("change", (event) => {
    if (document.querySelector(".editProfilePicture").files[0]) {
      formData.append(
        "userAvatar",
        document.querySelector(".editProfilePicture").files[0]
      );
      axios
        .put(`http://${baseURL}:4211/api/customer/editavatar`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: userKey,
          },
        })
        .then((respons) => {
          if (respons.data.success) {
            axios
              .get("http://"+baseURL+":4211/api/customer/profile", {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: userKey,
                },
              })
              .then((resp) => {
                if (resp.data.success) {
                  window.localStorage.setItem(
                    "user",
                    JSON.stringify(resp.data.item)
                  );
                  location.reload();
                }
              });
          }
        });
    }
  });

document.querySelector(".editProfile").addEventListener("click", () => {
  axios
    .put(
      `http://${baseURL}:4211/api/customer/editprofile`,
      {
        firstName: document.querySelector(".firstName").value,
        lastName: document.querySelector(".lastName").value,
        address: document.querySelector(".address").value,
        phone: document.querySelector(".phone").value,
        postId: document.querySelector(".postId").value,
        city: editProfile.city,
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
          .then((resp) => {
            if (resp.data.success) {
              window.localStorage.setItem(
                "user",
                JSON.stringify(resp.data.item)
              );
              location.reload();
            }
          });
      }
    });
});

document.querySelector(".logoutButton").addEventListener("click", () => { 
  window.localStorage.clear();
  window.location.reload();
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
        listOfCity.push({ name: element.name, code: element._id });
      });
    }
  });

let options = {
  data: listOfCity,
  getValue: "name",

  list: {
    match: {
      enabled: true,
    },
    onSelectItemEvent: function () {
      editProfile.city = $("#customerCity").getSelectedItemData().code;
    },
  },
};

$("#customerCity").easyAutocomplete(options);
