let TotalBuy = 0;
let newRemoveCart = [];

const cartCreator = () => {
  cart.forEach((element, index) => {
    $("tbody").append(`
    <tr>
        <td class="product-thumbnail"><a href="#"><img src="http://${baseURL}:4211/productImage/${
          element.image
        }" alt="product img" /></a></td>
        <td class="product-name"><a href="#"> ${element.name}</a></td>
        <td class="product-price"><span class="amount">${
          element.isDiscounted ? element.priceWithDiscount : element.price
        } تومان</span></td>
        <td class="product-quantity"><input class="productCount" type="number" value="1" id=${index} /></td>
        <td class="product-subtotal total">${
          element.isDiscounted ? element.priceWithDiscount : element.price
        } تومان</td>
        <td class="product-remove" id=${index}><a href="#">X</a></td>
    </tr>
    `);
  });
};

cartCreator();
const totalBuyCounter = () => {
  document.querySelector(".totalBuy").innerHTML = "";

  document.querySelectorAll(".productCount").forEach((element) => {
    document.querySelectorAll(".total").forEach((amountElement, index) => {
      if (index == element.id) {
        if (element.value >= cart[element.id].number) {
          if (cart[element.id].isDiscounted) {
            TotalBuy =
              cart[element.id].number * cart[element.id].priceWithDiscount +
              TotalBuy;
          } else {
            TotalBuy =
              cart[element.id].number * cart[element.id].price + TotalBuy;
          }
        } else {
          if (cart[element.id].isDiscounted) {
            TotalBuy =
              element.value * cart[element.id].priceWithDiscount + TotalBuy;
          } else {
            TotalBuy = element.value * cart[element.id].price + TotalBuy;
          }
        }
      }
    });
  });

  document.querySelector(".totalBuy").innerHTML = `${TotalBuy} تومان`;
};

totalBuyCounter();

document.querySelectorAll(".productCount").forEach((element) => {
  element.addEventListener("change", () => {
    TotalBuy = 0;
    if (element.value >= cart[element.id].number) {
      element.value = cart[element.id].number;
    }
    if (element.value <= 0) {
      element.value = 0;
    }
    document.querySelectorAll(".total").forEach((amountElement, index) => {
      if (index == element.id) {
        amountElement.innerHTML = "";
        if (element.value >= cart[element.id].number) {
          if (cart[element.id].isDiscounted) {
            amountElement.innerHTML = ` ${
              cart[element.id].number * cart[element.id].priceWithDiscount
            } تومان`;
          } else {
            amountElement.innerHTML = ` ${
              cart[element.id].number * cart[element.id].price
            } تومان`;
          }
        } else {
          if (cart[element.id].isDiscounted) {
            amountElement.innerHTML = ` ${
              element.value * cart[element.id].priceWithDiscount
            } تومان`;
          } else {
            amountElement.innerHTML = ` ${
              element.value * cart[element.id].price
            } تومان`;
          }
        }
      }
    });
    totalBuyCounter();
  });
});

document.querySelectorAll(".product-remove").forEach((element, index) => {
  element.addEventListener("click", (event) => {
    event.preventDefault();
    cart.forEach((removeCartElement, index) => {
      if (index != element.id) {
        newRemoveCart.push(removeCartElement);
      }
    });
    window.localStorage.setItem("cart", JSON.stringify(newRemoveCart));
    numberOfCartProduct = newRemoveCart.length;
    $(".numberOfCartProduct").remove();
    $(".numberOfCartProductContainer").append(`
      <span class="numberOfCartProduct">${
        numberOfCartProduct < 10
          ? `0${numberOfCartProduct}`
          : numberOfCartProduct
      }</span>
  `);
    document.querySelector("tbody").innerHTML = "";
    window.location.reload();
  });
});

const reloadCart = () => {
  if (user) {
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
          location.reload();
        }
      });
  }
};

document.querySelector(".goToCheckOut").addEventListener("click", (event) => {
  event.preventDefault();
  if (cart && user) {
    document.querySelectorAll(".productCount").forEach((element) => {
      axios
        .post(
          "http://"+baseURL+":4211/api/customer/editproductfromcart",
          {
            operation: true,
            product: cart[element.id]._id,
            number: element.value,
          },
          {
            headers: {
              Authorization: userKey,
            },
          }
        );
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
          window.location.href = "checkout";
        }
      });
  } else {
    if (cart.length == 0) {
      alert("ابتدا سبد خرید خود رو پر کنید");
    } else {
      alert("ابتدا وارد حساب کاربری خود بشوید");
    }
  }
});
