const category = window.localStorage.getItem("categoryId");
let productRowCount = 0;
let productList = [];
let newCart = [];
let newProduct = true;

axios
  .get(`http://${baseURL}:4211/api/category?id=${category}`)
  .then((response) => {
    if (response.data.success) {
      $(".categoryImage").append(`
        <img width="290px" height="290px" src="http://${baseURL}:4211/categoryImage/${response.data.item.image ? response.data.item.image : ''}" alt="category Image">
        `);
      $(".categoryName").append(response.data.item.name? response.data.item.name : "");
      $(".categoryDescription").append(response.data.item.description? response.data.item.description : "");
    } else {
      window.location.href = "/user/";
    }
  });

axios
  .get(`http://${baseURL}:4211/api/products?category=${category}`)
  .then((response) => {
    if (response.data.success) {
      productRowCount = Math.ceil(response.data.items.length / 3);
      productList.push(response.data.items);
      for (let productRow = 0; productRow < productRowCount; productRow++) {
        $(".categoryProductRowContainer").append(
          '<div class="row mt--30 productRow"></div>'
        );
      }
      document.querySelectorAll(".productRow").forEach((element, index) => {
        if (
          index + 1 !== productRowCount ||
          response.data.items.length % 3 === 0
        ) {
          $(element).append(`
                <div class="col-lg-4 col-md-6 col-sm-12">
                                <div class="product_product">
                                    <div class="product__thumb">
                                        <a href="menu-details.html">
                                            <img width="175px" height="175px" src="http://${baseURL}:4211/productImage/${
                                              response.data.items[index * 3]
                                                .image
                                            }" alt="product images">
                                        </a>
                                    </div>
                                    ${
                                      response.data.items[index * 3]
                                        .isDiscounted
                                        ? `
                                    <div class="product__hover__info">
                                    <div class="product__hover__inner">
                                        <span>تخفیف</span>
                                        <span>ویژه</span>
                                    </div>
                                </div>`
                                        : ""
                                    }
                                    
                                    <div class="product__details">
                                        <h4><a href="menu-details.html"> ${
                                          response.data.items[index * 3].name
                                        }</a></h4>
                                        <ul class="product__prize">
                                        ${
                                          response.data.items[index * 3]
                                            .isDiscounted
                                            ? `
                                        <li class="old__prize">${
                                          response.data.items[index * 3]
                                            .priceWithDiscount
                                        }</li>
                                            <li>${
                                              response.data.items[index * 3]
                                                .price
                                            }</li>
                                        `
                                            : `  <li>${
                                                response.data.items[index * 3]
                                                  .price
                                              }</li>`
                                        }
                                        </ul>
                                        <p>${
                                          response.data.items[index * 3]
                                            .description
                                        } </p>
                                        <div class="product__cart__btn">
                                            <a class="addToCart" id=${
                                              index * 3
                                            } href="#">اضافه به سبد خرید</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                <div class="col-lg-4 col-md-6 col-sm-12">
                                <div class="product_product">
                                    <div class="product__thumb">
                                        <a href="menu-details.html">
                                            <img width="175px" height="175px" src="http://${baseURL}:4211/productImage/${
                                              response.data.items[index * 3 + 1]
                                                .image
                                            }" alt="product images">
                                        </a>
                                    </div>
                                    ${
                                      response.data.items[index * 3 + 1]
                                        .isDiscounted
                                        ? `
                                    <div class="product__hover__info">
                                    <div class="product__hover__inner">
                                        <span>تخفیف</span>
                                        <span>ویژه</span>
                                    </div>
                                </div>`
                                        : ""
                                    }
                                    
                                    <div class="product__details">
                                        <h4><a href="menu-details.html"> ${
                                          response.data.items[index * 3 + 1]
                                            .name
                                        }</a></h4>
                                        <ul class="product__prize">
                                        ${
                                          response.data.items[index * 3 + 1]
                                            .isDiscounted
                                            ? `
                                        <li class="old__prize">${
                                          response.data.items[index * 3 + 1]
                                            .priceWithDiscount
                                        }</li>
                                            <li>${
                                              response.data.items[index * 3 + 1]
                                                .price
                                            }</li>
                                        `
                                            : `  <li>${
                                                response.data.items[
                                                  index * 3 + 1
                                                ].price
                                              }</li>`
                                        }
                                        </ul>
                                        <p>${
                                          response.data.items[index * 3 + 1]
                                            .description
                                        } </p>
                                        <div class="product__cart__btn">
                                            <a class="addToCart" id=${
                                              index * 3 + 1
                                            } href="#">اضافه به سبد خرید</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                <div class="col-lg-4 col-md-6 col-sm-12">
                                <div class="product_product">
                                    <div class="product__thumb">
                                        <a href="menu-details.html">
                                            <img width="175px" height="175px" src="http://${baseURL}:4211/productImage/${
                                              response.data.items[index * 3 + 2]
                                                .image
                                            }" alt="product images">
                                        </a>
                                    </div>
                                    ${
                                      response.data.items[index * 3 + 2]
                                        .isDiscounted
                                        ? `
                                    <div class="product__hover__info">
                                    <div class="product__hover__inner">
                                        <span>تخفیف</span>
                                        <span>ویژه</span>
                                    </div>
                                </div>`
                                        : ""
                                    }
                                    
                                    <div class="product__details">
                                        <h4><a href="menu-details.html"> ${
                                          response.data.items[index * 3 + 2]
                                            .name
                                        }</a></h4>
                                        <ul class="product__prize">
                                        ${
                                          response.data.items[index * 3 + 2]
                                            .isDiscounted
                                            ? `
                                        <li class="old__prize">${
                                          response.data.items[index * 3 + 2]
                                            .priceWithDiscount
                                        }</li>
                                            <li>${
                                              response.data.items[index * 3 + 2]
                                                .price
                                            }</li>
                                        `
                                            : `  <li>${
                                                response.data.items[
                                                  index * 3 + 2
                                                ].price
                                              }</li>`
                                        }
                                        </ul>
                                        <p>${
                                          response.data.items[index * 3 + 2]
                                            .description
                                        } </p>
                                        <div class="product__cart__btn">
                                            <a class="addToCart" id=${
                                              index * 3 + 2
                                            } href="#">اضافه به سبد خرید</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                `);
        } else {
          if (response.data.items.length % 3 === 1) {
            $(element).append(`
            <div class="col-lg-4 col-md-6 col-sm-12">
                            <div class="product_product">
                                <div class="product__thumb">
                                    <a href="menu-details.html">
                                        <img width="175px" height="175px" src="http://${baseURL}:4211/productImage/${
                                          response.data.items[index * 3].image
                                        }" alt="product images">
                                    </a>
                                </div>
                                ${
                                  response.data.items[index * 3].isDiscounted
                                    ? `
                                <div class="product__hover__info">
                                <div class="product__hover__inner">
                                    <span>تخفیف</span>
                                    <span>ویژه</span>
                                </div>
                            </div>`
                                    : ""
                                }
                                
                                <div class="product__details">
                                    <h4><a href="menu-details.html"> ${
                                      response.data.items[index * 3].name
                                    }</a></h4>
                                    <ul class="product__prize">
                                    ${
                                      response.data.items[index * 3]
                                        .isDiscounted
                                        ? `
                                    <li class="old__prize">${
                                      response.data.items[index * 3]
                                        .priceWithDiscount
                                    }</li>
                                        <li>${
                                          response.data.items[index * 3].price
                                        }</li>
                                    `
                                        : `  <li>${
                                            response.data.items[index * 3].price
                                          }</li>`
                                    }
                                    </ul>
                                    <p>${
                                      response.data.items[index * 3].description
                                    } </p>
                                    <div class="product__cart__btn">
                                        <a class="addToCart" id=${
                                          index * 3
                                        } href="#">اضافه به سبد خرید</a>
                                    </div>
                                </div>
                            </div>
                        </div>
            `);
          } else {
            $(element).append(`
            <div class="col-lg-4 col-md-6 col-sm-12">
                            <div class="product_product">
                                <div class="product__thumb">
                                    <a href="menu-details.html">
                                        <img width="175px" height="175px" src="http://${baseURL}:4211/productImage/${
                                          response.data.items[index * 3].image
                                        }" alt="product images">
                                    </a>
                                </div>
                                ${
                                  response.data.items[index * 3].isDiscounted
                                    ? `
                                <div class="product__hover__info">
                                <div class="product__hover__inner">
                                    <span>تخفیف</span>
                                    <span>ویژه</span>
                                </div>
                            </div>`
                                    : ""
                                }
                                
                                <div class="product__details">
                                    <h4><a href="menu-details.html"> ${
                                      response.data.items[index * 3].name
                                    }</a></h4>
                                    <ul class="product__prize">
                                    ${
                                      response.data.items[index * 3]
                                        .isDiscounted
                                        ? `
                                    <li class="old__prize">${
                                      response.data.items[index * 3]
                                        .priceWithDiscount
                                    }</li>
                                        <li>${
                                          response.data.items[index * 3].price
                                        }</li>
                                    `
                                        : `  <li>${
                                            response.data.items[index * 3].price
                                          }</li>`
                                    }
                                    </ul>
                                    <p>${
                                      response.data.items[index * 3].description
                                    } </p>
                                    <div class="product__cart__btn">
                                        <a class="addToCart" id=${
                                          index * 3
                                        } href="#">اضافه به سبد خرید</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
            <div class="col-lg-4 col-md-6 col-sm-12">
                            <div class="product_product">
                                <div class="product__thumb">
                                    <a href="menu-details.html">
                                        <img width="175px" height="175px" src="http://${baseURL}:4211/productImage/${
                                          response.data.items[index * 3 + 1]
                                            .image
                                        }" alt="product images">
                                    </a>
                                </div>
                                ${
                                  response.data.items[index * 3 + 1]
                                    .isDiscounted
                                    ? `
                                <div class="product__hover__info">
                                <div class="product__hover__inner">
                                    <span>تخفیف</span>
                                    <span>ویژه</span>
                                </div>
                            </div>`
                                    : ""
                                }
                                
                                <div class="product__details">
                                    <h4><a href="menu-details.html"> ${
                                      response.data.items[index * 3 + 1].name
                                    }</a></h4>
                                    <ul class="product__prize">
                                    ${
                                      response.data.items[index * 3 + 1]
                                        .isDiscounted
                                        ? `
                                    <li class="old__prize">${
                                      response.data.items[index * 3 + 1]
                                        .priceWithDiscount
                                    }</li>
                                        <li>${
                                          response.data.items[index * 3 + 1]
                                            .price
                                        }</li>
                                    `
                                        : `  <li>${
                                            response.data.items[index * 3 + 1]
                                              .price
                                          }</li>`
                                    }
                                    </ul>
                                    <p>${
                                      response.data.items[index * 3 + 1]
                                        .description
                                    } </p>
                                    <div class="product__cart__btn">
                                        <a class="addToCart" id=${
                                          index * 3 + 1
                                        } href="#">اضافه به سبد خرید</a>
                                    </div>
                                </div>
                            </div>
                        </div>
            `);
          }
        }
      });
      document.querySelectorAll(".addToCart").forEach((element) => {
        element.addEventListener("click", (event) => {
          event.preventDefault();
          cart = JSON.parse(window.localStorage.getItem("cart"));
          cart.forEach((cartElement) => {
            if (cartElement._id === productList[0][element.id]._id) {
              newProduct = false;
            }
          });
          if (newProduct) {
            cart.push(productList[0][element.id]);
            window.localStorage.setItem("cart", JSON.stringify(cart));
            numberOfCartProduct = cart.length;
            $(".numberOfCartProduct").remove();
            $(".numberOfCartProductContainer").append(`
            <span class="numberOfCartProduct">${
              numberOfCartProduct < 10
                ? `0${numberOfCartProduct}`
                : numberOfCartProduct
            }</span>
            `);
          }
          newProduct = true;
        });
      });
    }
  });
