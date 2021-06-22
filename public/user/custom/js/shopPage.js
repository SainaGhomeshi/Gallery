const shopId = window.localStorage.getItem("shopId");
let productList = [];
let newCart = [];
let newProduct = true;

axios
  .get(`http://${baseURL}:4211/api/gallery?id=${shopId}`)
  .then((response) => {
    if (response.data.success) {
      $(".shopImage").append(`
        <img width="290px" height="290px" src="http://${baseURL}:4211/galleryAvatar/${response.data.item.avatar}" alt="category Image">
        `);
      $(".shopName").append(response.data.item.name);
      $(".shopDescription").append(response.data.item.description);
      if (response.data.products) {
        productRowCount = Math.ceil(response.data.products.length / 3);
        productList.push(response.data.products);
        for (let productRow = 0; productRow < productRowCount; productRow++) {
          $(".shopProductRowContainer").append(
            '<div class="row mt--30 productRow"></div>'
          );
        }
        document.querySelectorAll(".productRow").forEach((element, index) => {
          if (
            index + 1 !== productRowCount ||
            response.data.products.length % 3 === 0
          ) {
            $(element).append(`
                  <div class="col-lg-4 col-md-6 col-sm-12">
                                  <div class="product_product">
                                      <div class="product__thumb">
                                          <a href="menu-details.html">
                                              <img width="175px" height="175px" src="http://${baseURL}:4211/productImage/${
              response.data.products[index * 3].image
            }" alt="product images">
                                          </a>
                                      </div>
                                      ${
                                        response.data.products[index * 3]
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
                                            response.data.products[index * 3]
                                              .name
                                          }</a></h4>
                                          <ul class="product__prize">
                                          ${
                                            response.data.products[index * 3]
                                              .isDiscounted
                                              ? `
                                          <li class="old__prize">${
                                            response.data.products[index * 3]
                                              .priceWithDiscount
                                          }</li>
                                              <li>${
                                                response.data.products[
                                                  index * 3
                                                ].price
                                              }</li>
                                          `
                                              : `  <li>${
                                                  response.data.products[
                                                    index * 3
                                                  ].price
                                                }</li>`
                                          }
                                          </ul>
                                          <p>${
                                            response.data.products[index * 3]
                                              .description
                                          } </p>
                                          <div class="product__cart__btn">
                                              <a class="addToCart" id=${
                                                index * 3
                                              } href="cart.html">اضافه به سبد خرید</a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              
                  <div class="col-lg-4 col-md-6 col-sm-12">
                                  <div class="product_product">
                                      <div class="product__thumb">
                                          <a href="menu-details.html">
                                              <img width="175px" height="175px" src="http://${baseURL}:4211/productImage/${
              response.data.products[index * 3 + 1].image
            }" alt="product images">
                                          </a>
                                      </div>
                                      ${
                                        response.data.products[index * 3 + 1]
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
                                            response.data.products[
                                              index * 3 + 1
                                            ].name
                                          }</a></h4>
                                          <ul class="product__prize">
                                          ${
                                            response.data.products[
                                              index * 3 + 1
                                            ].isDiscounted
                                              ? `
                                          <li class="old__prize">${
                                            response.data.products[
                                              index * 3 + 1
                                            ].priceWithDiscount
                                          }</li>
                                              <li>${
                                                response.data.products[
                                                  index * 3 + 1
                                                ].price
                                              }</li>
                                          `
                                              : `  <li>${
                                                  response.data.products[
                                                    index * 3 + 1
                                                  ].price
                                                }</li>`
                                          }
                                          </ul>
                                          <p>${
                                            response.data.products[
                                              index * 3 + 1
                                            ].description
                                          } </p>
                                          <div class="product__cart__btn">
                                              <a class="addToCart" id=${
                                                index * 3 + 1
                                              } href="cart.html">اضافه به سبد خرید</a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              
                  <div class="col-lg-4 col-md-6 col-sm-12">
                                  <div class="product_product">
                                      <div class="product__thumb">
                                          <a href="menu-details.html">
                                              <img width="175px" height="175px" src="http://${baseURL}:4211/productImage/${
              response.data.products[index * 3 + 2].image
            }" alt="product images">
                                          </a>
                                      </div>
                                      ${
                                        response.data.products[index * 3 + 2]
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
                                            response.data.products[
                                              index * 3 + 2
                                            ].name
                                          }</a></h4>
                                          <ul class="product__prize">
                                          ${
                                            response.data.products[
                                              index * 3 + 2
                                            ].isDiscounted
                                              ? `
                                          <li class="old__prize">${
                                            response.data.products[
                                              index * 3 + 2
                                            ].priceWithDiscount
                                          }</li>
                                              <li>${
                                                response.data.products[
                                                  index * 3 + 2
                                                ].price
                                              }</li>
                                          `
                                              : `  <li>${
                                                  response.data.products[
                                                    index * 3 + 2
                                                  ].price
                                                }</li>`
                                          }
                                          </ul>
                                          <p>${
                                            response.data.products[
                                              index * 3 + 2
                                            ].description
                                          } </p>
                                          <div class="product__cart__btn">
                                              <a class="addToCart" id=${
                                                index * 3 + 2
                                              } href="cart.html">اضافه به سبد خرید</a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                  `);
          } else {
            if (response.data.products.length % 3 === 1) {
              $(element).append(`
              <div class="col-lg-4 col-md-6 col-sm-12">
                              <div class="product_product">
                                  <div class="product__thumb">
                                      <a href="menu-details.html">
                                          <img width="175px" height="175px" src="http://${baseURL}:4211/productImage/${
                response.data.products[index * 3].image
              }" alt="product images">
                                      </a>
                                  </div>
                                  ${
                                    response.data.products[index * 3]
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
                                        response.data.products[index * 3].name
                                      }</a></h4>
                                      <ul class="product__prize">
                                      ${
                                        response.data.products[index * 3]
                                          .isDiscounted
                                          ? `
                                      <li class="old__prize">${
                                        response.data.products[index * 3]
                                          .priceWithDiscount
                                      }</li>
                                          <li>${
                                            response.data.products[index * 3]
                                              .price
                                          }</li>
                                      `
                                          : `  <li>${
                                              response.data.products[index * 3]
                                                .price
                                            }</li>`
                                      }
                                      </ul>
                                      <p>${
                                        response.data.products[index * 3]
                                          .description
                                      } </p>
                                      <div class="product__cart__btn">
                                          <a class="addToCart" id=${
                                            index * 3
                                          } href="cart.html">اضافه به سبد خرید</a>
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
                response.data.products[index * 3].image
              }" alt="product images">
                                      </a>
                                  </div>
                                  ${
                                    response.data.products[index * 3]
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
                                        response.data.products[index * 3].name
                                      }</a></h4>
                                      <ul class="product__prize">
                                      ${
                                        response.data.products[index * 3]
                                          .isDiscounted
                                          ? `
                                      <li class="old__prize">${
                                        response.data.products[index * 3]
                                          .priceWithDiscount
                                      }</li>
                                          <li>${
                                            response.data.products[index * 3]
                                              .price
                                          }</li>
                                      `
                                          : `  <li>${
                                              response.data.products[index * 3]
                                                .price
                                            }</li>`
                                      }
                                      </ul>
                                      <p>${
                                        response.data.products[index * 3]
                                          .description
                                      } </p>
                                      <div class="product__cart__btn">
                                          <a class="addToCart" id=${
                                            index * 3
                                          } href="cart.html">اضافه به سبد خرید</a>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          
              <div class="col-lg-4 col-md-6 col-sm-12">
                              <div class="product_product">
                                  <div class="product__thumb">
                                      <a href="menu-details.html">
                                          <img width="175px" height="175px" src="http://${baseURL}:4211/productImage/${
                response.data.products[index * 3 + 1].image
              }" alt="product images">
                                      </a>
                                  </div>
                                  ${
                                    response.data.products[index * 3 + 1]
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
                                        response.data.products[index * 3 + 1]
                                          .name
                                      }</a></h4>
                                      <ul class="product__prize">
                                      ${
                                        response.data.products[index * 3 + 1]
                                          .isDiscounted
                                          ? `
                                      <li class="old__prize">${
                                        response.data.products[index * 3 + 1]
                                          .priceWithDiscount
                                      }</li>
                                          <li>${
                                            response.data.products[
                                              index * 3 + 1
                                            ].price
                                          }</li>
                                      `
                                          : `  <li>${
                                              response.data.products[
                                                index * 3 + 1
                                              ].price
                                            }</li>`
                                      }
                                      </ul>
                                      <p>${
                                        response.data.products[index * 3 + 1]
                                          .description
                                      } </p>
                                      <div class="product__cart__btn">
                                          <a class="addToCart" id=${
                                            index * 3 + 1
                                          } href="cart.html">اضافه به سبد خرید</a>
                                      </div>
                                  </div>
                              </div>
                          </div>
              `);
            }
          }
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
        });
      }
    } else {
      window.location.href = "/user/";
    }
  });
