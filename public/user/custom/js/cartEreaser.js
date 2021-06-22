if (user && user.cart && userKey) {
  user.cart.forEach((element) => {
    axios
      .post(
        "http://"+baseURL+":4211/api/customer/editproductfromcart",
        {
          operation: false,
          product: element.product,
          number: 0,
        },
        {
          headers: {
            Authorization: userKey,
          },
        }
      )
  });

  axios
    .get("http://"+baseURL+":4211/api/customer/profile", {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: userKey,
      },
    })
    .then((resp) => {
      if (resp.data.success) {
        window.localStorage.setItem("user", JSON.stringify(resp.data.item));
        // window.location.reload();
      }
    });
}
