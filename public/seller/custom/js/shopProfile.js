const shopData = JSON.parse(window.localStorage.getItem("sellerGallery"));

let editIsOn = false;

let formData = new FormData();

document.querySelector("#shopName").value = shopData.name ? shopData.name : "";
document.querySelector("#shopDescription").value = shopData.description
  ? shopData.description
  : "";
document.querySelector("#adWanted").checked = shopData.adsStatus;

document.querySelector(".editStart").addEventListener("click", () => {
  if (editIsOn) {
    document.querySelector("#shopName").setAttribute("disabled", true);
    document.querySelector("#shopDescription").setAttribute("disabled", true);
    document.querySelector("#adWanted").setAttribute("disabled", true);
    document.querySelector("#shopLogo").setAttribute("disabled", true);
    document.querySelector(".editButton").setAttribute("disabled", true);
    document.querySelector(".editLogo").setAttribute("disabled", true);
    editIsOn = false;
  } else {
    document.querySelector("#shopName").removeAttribute("disabled");
    document.querySelector("#shopDescription").removeAttribute("disabled");
    document.querySelector("#adWanted").removeAttribute("disabled");
    document.querySelector("#shopLogo").removeAttribute("disabled");
    document.querySelector(".editButton").removeAttribute("disabled");
    document.querySelector(".editLogo").removeAttribute("disabled");
    editIsOn = true;
  }
});

document.querySelector(".editLogo").addEventListener("click", () => {
  if (document.querySelector("#shopLogo").files[0]) {
    formData.append(
      "galleryAvatar",
      document.querySelector("#shopLogo").files[0]
    );
    axios
      .put(`http://${baseURL}:4211/api/seller/editavatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: auth,
        },
      })
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
  }
});

document.querySelector(".editButton").addEventListener("click", (event) => {
  event.preventDefault();
  axios
    .put(
      `http://${baseURL}:4211/api/seller/editgallery`,
      {
        name: document.querySelector("#shopName").value,
        address: "دزفول",
        description: document.querySelector("#shopDescription").value,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      }
    )
    .then((respons) => {
      if (respons.data.success) {
        if (
          document.querySelector("#adWanted").checked !== shopData.adsStatus
        ) {
          axios.get("http://"+baseURL+":4211/api/seller/changeadsstatus", {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: auth,
            },
          });
        }
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
});
