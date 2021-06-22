let listOfProducts = [];

const listOfProductSituation = {
  isSingleShop: window.localStorage.getItem("singleProduct"),
  singleShopId: window.localStorage.getItem("singleProductId"),
};

axios
  .get(
    `http://${baseURL}:4211/api/products${
      listOfProductSituation.singleShopId
        ? `?gallery=${listOfProductSituation.singleShopId}`
        : ""
    }`
  )
  .then((response) => {
    if (response.data.items) {
    listOfProducts.push(response.data.items);
    listOfProducts[0].forEach((element, index) => {
      $("tbody").append(`
      <tr>
        <td>
        <img src="http://${baseURL}:4211/productImage/${
          element.image
        }" width="30px" height="30px" style="border-radius: 7px; margin: 10px;" alt="product image"/></td>
        <td> <span style="margin: 10px;">${element.name} </span></td>
        <td> <span style="margin: 10px;">${element.description} </span></td>
        <td> <span style="margin: 10px;">${element.gallery.name} </span></td>
        <td> <span style="margin: 10px;">${element.price} </span></td>
        <td> <span style="margin: 10px;">${
          element.isDiscounted ? element.priceWithDiscount : "-"
        } </span></td>
        <td> <span style="margin: 10px;">${
          element.isDiscounted ? "بله" : "خیر"
        } </span></td>
        <td> <span style="margin: 10px;">${element.category.name} </span></td>
        <td> <span style="margin: 10px;">
        ${element.number}
         </span></td>
         <td>
         <a href="#" class="on-default removeProduct" id=${
           element._id
         }><i class="fa fa-trash-o"></i></a>
         </td>
        </tr>
        `);
    });
    document.querySelectorAll(".removeProduct").forEach((element) => {
      element.addEventListener("click", function (event) {
        axios
          .delete(
            `http://${baseURL}:4211/api/seller/product?id=${element.getAttribute(
              "id"
            )}`,
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((response) => {
            window.location.reload();
          });
      });
    });   
  }
  });
