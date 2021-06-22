const userData = JSON.parse(window.localStorage.getItem("sellerData"));

let editIsOn = false;

const headers = {
  Authorization: auth,
};

document.querySelector("#sellerName").value = userData.firstName;
document.querySelector("#sellerFamilyName").value = userData.lastName;
document.querySelector("#sellerUserName").value = userData.userName;
document.querySelector("#sellerEmail").value = userData.email;
document.querySelector("#sellerPostId").value = userData.postId
  ? userData.postId
  : "";
document.querySelector("#sellerPhone").value = userData.phone
  ? userData.phone
  : "";
document.querySelector("#sellerAddress").value = userData.address
  ? userData.address
  : "";

document.querySelector(".editStart").addEventListener("click", () => {
  if (!editIsOn) {
    document.querySelector("#sellerName").removeAttribute("disabled");
    document.querySelector("#sellerFamilyName").removeAttribute("disabled");
    document.querySelector("#sellerEmail").removeAttribute("disabled");
    document.querySelector("#sellerPostId").removeAttribute("disabled");
    document.querySelector("#sellerPhone").removeAttribute("disabled");
    document.querySelector("#sellerAddress").removeAttribute("disabled");
    document.querySelector("#newPassword").removeAttribute("disabled");
    document.querySelector("#passwordReEnter").removeAttribute("disabled");
    document.querySelector(".doneEdit").removeAttribute("disabled");
    editIsOn = true;
  } else {
    document.querySelector("#sellerName").setAttribute("disabled", true);
    document.querySelector("#sellerFamilyName").setAttribute("disabled", true);
    document.querySelector("#sellerEmail").setAttribute("disabled", true);
    document.querySelector("#sellerPostId").setAttribute("disabled", true);
    document.querySelector("#sellerPhone").setAttribute("disabled", true);
    document.querySelector("#sellerAddress").setAttribute("disabled", true);
    document.querySelector("#newPassword").setAttribute("disabled", true);
    document.querySelector("#passwordReEnter").setAttribute("disabled", true);
    document.querySelector(".doneEdit").setAttribute("disabled", true);
    editIsOn = false;
  }
});

document.querySelector(".doneEdit").addEventListener("click", (event) => {
  event.preventDefault();
  if (editIsOn) {
    if (document.querySelector("#newPassword").value) {
      if (
        document.querySelector("#newPassword").value ===
        document.querySelector("#passwordReEnter").value
      ) {
        axios
          .put(
            `http://${baseURL}:4211/api/customer/editprofile`,
            {
              firstName: document.querySelector("#sellerName").value,
              lastName: document.querySelector("#sellerFamilyName").value,
              address: document.querySelector("#sellerAddress").value,
              phone: document.querySelector("#sellerPhone").value,
              postId: document.querySelector("#sellerPostId").value,
              password: document.querySelector("#newPassword").value,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: auth,
              },
            }
          )
          .then((respons) => {
            if (respons.data.success) {
            }
          });
      } else {
        alert("تکرار رمز جدید درست نیست");
      }
    } else {
    }
    axios
      .put(
        `http://${baseURL}:4211/api/customer/editprofile`,
        {
          firstName: document.querySelector("#sellerName").value,
          lastName: document.querySelector("#sellerFamilyName").value,
          address: document.querySelector("#sellerAddress").value,
          phone: document.querySelector("#sellerPhone").value,
          postId: document.querySelector("#sellerPostId").value,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: auth,
          },
        }
      )
      .then((respons) => {
        if (respons.data.success) {
          axios
            .get("http://"+baseURL+":4211/api/customer/profile", {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: auth,
              },
            })
            .then((resp) => {
              if (resp.data.success) {
                window.localStorage.setItem(
                  "sellerData",
                  JSON.stringify(resp.data.item)
                );
                window.localStorage.setItem(
                  "sellerGallery",
                  JSON.stringify(resp.data.gallery)
                );
              location.reload();
              }
            });
        }
      });
  } else {
    alert("ابتدا فرم را ویرایش کنید");
  }
});
