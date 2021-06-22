let listOfProducts = [];

let formData = new FormData();

let productObject = {
  productName: "",
  productDescription: "",
  productOrginPrice: 0,
  productDiscountPrice: 0,
  isSale: false,
  categoryId: "",
  number: 0,
  edit: false,
  editId: "",
};

axios
  .get(`http://${baseURL}:4211/api/products?gallery=${galleryData._id}`)
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
        <td class="actions">
        <a href="#" class="on-default editProduct" id=${index}><i class="fa fa-pencil"></i></a>
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
                Authorization: auth,
              },
            }
          )
          .then((response) => {
            window.location.reload();
          });
      });
    });
    document.querySelectorAll(".editProduct").forEach((element) => {
      element.addEventListener("click", function (event) {
        productObject.edit = true;
        document.querySelector("#productName").value =
          listOfProducts[0][event.path[1].getAttribute("id")].name;
        document.querySelector("#productDescription").value =
          listOfProducts[0][event.path[1].getAttribute("id")].description;
        document.querySelector("#productFirstPrice").value =
          listOfProducts[0][event.path[1].getAttribute("id")].price;
        document.querySelector("#productSecondPrice").value = listOfProducts[0][
          event.path[1].getAttribute("id")
        ].priceWithDiscount
          ? listOfProducts[0][event.path[1].getAttribute("id")]
              .priceWithDiscount
          : "";
        document.querySelector("#productSale").checked =
          listOfProducts[0][event.path[1].getAttribute("id")].isDiscounted;
        document.querySelector("#productNumber").value =
          listOfProducts[0][event.path[1].getAttribute("id")].number;
        productObject.editId =
          listOfProducts[0][event.path[1].getAttribute("id")]._id;
      });
    });     
  }
  });

let listOfCategories = [];
let jsonCategory;
axios.get("http://"+baseURL+":4211/api/categories").then((response) => {
  if (response.data.items) {
  response.data.items.forEach((element) => {
    listOfCategories.push({ name: element.name, code: element._id });
  });     
}
});


document
  .querySelector("#createEditProductButton")
  .addEventListener("click", function (event) {
    productObject = {
      ...productObject,
      productName: document.querySelector("#productName").value,
      productDescription: document.querySelector("#productDescription").value,
      productOrginPrice: document.querySelector("#productFirstPrice").value,
      productDiscountPrice: document.querySelector("#productSecondPrice").value,
      isSale: document.querySelector("#productSale").checked,
      number: document.querySelector("#productNumber").value,
    };
    if (
      productObject.productName &&
      productObject.productDescription &&
      productObject.productOrginPrice &&
      productObject.number &&
      productObject.categoryId
    ) {
      if (
        (productObject.isSale && !productObject.productDiscountPrice) ||
        (productObject.productDiscountPrice && !productObject.isSale)
      ) {
        alert("لطفا اطلاعات حراج را کامل کنید");
      } else if (
        document.querySelector("#productImage").files[0] ||
        productObject.edit
      ) {
        formData.append(
          "productImage",
          document.querySelector("#productImage").files[0]
        );
        formData.append("name", productObject.productName);
        formData.append("category", productObject.categoryId);
        formData.append("description", productObject.productDescription);
        formData.append("number", productObject.number);
        formData.append("price", productObject.productOrginPrice);
        formData.append("isDiscounted", productObject.isSale);
        formData.append(
          "priceWithDiscount",
          productObject.productDiscountPrice
        );
        if (productObject.edit) {
          axios
            .put(
              `http://${baseURL}:4211/api/seller/product?id=${productObject.editId}`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: auth,
                },
              }
            )
            .then((respons) => {
              if (respons.data.success) {
                location.reload();
              }
            });
        } else {
          axios
            .post("http://"+baseURL+":4211/api/seller/product", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: auth,
              },
            })
            .then((response) => {
              if (response.data.success) {
                location.reload();
              }
            });
        }
      } else {
        alert("لطفا عکس رو وارد کنید");
      }
    } else {
      alert(
        "خواهشا فیلد های نام و اطلاعات و قیمت اولیه و تعداد محصول و دسته بندی محصول را پر کنید"
      );
    }
  });

let options = {
  data: listOfCategories,
  getValue: "name",

  list: {
    match: {
      enabled: true,
    },
    onSelectItemEvent: function () {
      let categoryValue = $("#productCategory").getSelectedItemData().code;
      productObject = { ...productObject, categoryId: categoryValue };
    },
  },
};

$("#productCategory").easyAutocomplete(options);

document.querySelector("#deleteInputs").addEventListener("click", () => {
  document.querySelector("#productName").value = "";
  document.querySelector("#productDescription").value = "";
  document.querySelector("#productFirstPrice").value = "";
  document.querySelector("#productSecondPrice").value = "";
  document.querySelector("#productSale").checked = false;
  document.querySelector("#productNumber").value = "";
  productObject.editId = "";
});
