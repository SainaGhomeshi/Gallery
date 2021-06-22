let listOfProducts = [];
let listOfTableProducts = [];

const getAllProduct = () => {
  axios.get("http://" + baseURL + ":4211/api/products").then((resp) => {
    if (resp.data.success) {
      if (resp.data.items) {
        resp.data.items.forEach((element, index) => {
          listOfProducts.push({
            nameProduct: element.name,
            productImage: element.image,
            shopName: element.gallery.name,
            productCategory: element.category.name,
            shopId: element.gallery._id,
          });
          listOfTableProducts.push(element);
          if (index < 8) {
            if (index % 2 === 0) {
              $(".rightColumn").append(`
                    <div class="art__menu text-right" id=${element.gallery._id} >
                       <div class="art__menu__thumb">
                           <a href="#" class="tableProduct">
                               <img width="100px" height="100px" src=http://${baseURL}:4211//productImage/${element.image} alt="product images">
                           </a>
                       </div>
                       <div class="art__menu__details">
                           <div class="at__menu__title__prize">
                               <h4><a href="#" class="tableProductName"> ${element.name}</a></h4>
                           </div>
                           <div class="at__menu__details">
                               <p>دسته بندی : ${element.category.name} </p>
                               <div class="delivery__time__rating">
                                   <p class="table-product-description">${element.description}</p>
                                   
                               </div>
                           </div>
                       </div>
                   </div>
                   `);
            } else {
              $(".leftColumn").append(`
            <div class="art__menu text-right" id=${element.gallery._id} >
            <div class="art__menu__thumb">
                <a href="#" class="tableProduct">
                    <img width="100px" height="100px" src=http://${baseURL}:4211//productImage/${element.image}  alt="product images">
                </a>
            </div>
            <div class="art__menu__details">
                <div class="at__menu__title__prize">
                    <h4><a href="#" class="tableProductName">${element.name}</a></h4>
                </div>
                <div class="at__menu__details">
                    <p>دسته بندی : ${element.category.name} </p>
                    <div class="delivery__time__rating">
                        <p class="table-product-description">${element.description}</p>
                        
                    </div>
                </div>
            </div>
        </div>
            `);
            }
          }
        });
        document.querySelectorAll(".tableProduct").forEach((products) => {
          products.addEventListener("click", (event) => {
            event.preventDefault();
            window.localStorage.setItem("shopId", event.path[3].id);
            window.location.href = "/user/shop";
          });
        });
        document.querySelectorAll(".tableProductName").forEach((products) => {
          products.addEventListener("click", (event) => {
            event.preventDefault();
            window.localStorage.setItem("shopId", event.path[4].id);
            window.location.href = "/user/shop";
          });
        });
      }
    }
  });
};

getAllProduct();

let options = {
  data: listOfProducts,
  getValue: "nameProduct",
  template: {
    type: "custom",
    method: function (value, item) {
      return (
        "<img src='http://" +
        baseURL +
        ":4211/productImage/" +
        item.productImage +
        "' /> " +
        "  -  " +
        value +
        "  -  " +
        item.productCategory +
        "  -  " +
        item.shopName
      );
    },
  },
  list: {
    onSelectItemEvent: function () {
      window.localStorage.setItem(
        "shopId",
        $("#searchBar").getSelectedItemData().shopId
      );
      window.location.href = "/user/shop";
    },
  },
};

$("#searchBar").easyAutocomplete(options);
