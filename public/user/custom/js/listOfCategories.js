let listOfCategories = [];
let activeTableListItem = 0;

axios.get("http://" + baseURL + ":4211/api/categories").then((response) => {
  if (
    window.location.href === "http://" + baseURL + ":4211/user/" ||
    window.location.href === "http://" + baseURL + ":4211/user/#"
  ) {
    $(".tableListContainer").append(`
    <a class="active tableListItem" data-toggle="tab" href="#"  role="tab">همه</a>
    `);
  }

  if (response.data.items) {
    response.data.items.forEach((element, index) => {
      listOfCategories.push({
        name: element.name,
        id: element._id,
        image: element.image,
      });
      $(".categoryHeaderMenu").append(`
    <li><a href="#" class="headerCategoryItem" id=${index}> ${element.name}</a></li>
    `);
      if (
        window.location.href === "http://" + baseURL + ":4211/user/" ||
        window.location.href === "http://" + baseURL + ":4211/user/#"
      ) {
        $(".categoryPictures").append(`
        <div class="col-lg-4 col-md-6 col-sm-12 min-width">
                            <div class="art__item ">
                                <div class="art__thumb">
                                    <a class="categoryPictureItem" id=${index} href="#">
                                        <img src="http://${baseURL}:4211/categoryImage/${element.image}" alt="category images">
                                    </a>
                                </div>
                                <div class="art__title">
                                    <h2><a class="categoryPictureItem" id=${index} href="#"> ${element.name}</h2>
                                </div>
                            </div>
                        </div>
        `);
        if (index < 4) {
          $(".tableListContainer").append(`
        <a class="tableListItem" href="#" id=${element._id} role="tab">${element.name}</a>
        `);
        }
      }
    });

    document.querySelectorAll(".tableListItem").forEach((element) => {
      element.addEventListener("click", (event) => {
        document.querySelectorAll(".tableListItem").forEach((item) => {
          item.classList.remove("active");
        });
        event.path[0].classList.add("active");
        event.preventDefault();
        if (event.path[0].id) {
          axios
            .get(
              `http://${baseURL}:4211/api/products?category=${event.path[0].id}`
            )
            .then((resp) => {
              if (resp.data.success) {
                if (resp.data.items.length) {
                  $(".rightColumn").empty();
                  $(".leftColumn").empty();
                  resp.data.items.forEach((element, index) => {
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
                  document
                    .querySelectorAll(".tableProduct")
                    .forEach((products) => {
                      products.addEventListener("click", (event) => {
                        event.preventDefault();
                        window.localStorage.setItem("shopId", event.path[3].id);
                        window.location.href = "/user/shop";
                      });
                    });
                  document
                    .querySelectorAll(".tableProductName")
                    .forEach((products) => {
                      products.addEventListener("click", (event) => {
                        event.preventDefault();
                        window.localStorage.setItem("shopId", event.path[4].id);
                        window.location.href = "/user/shop";
                      });
                    });
                }
              }
            });
        } else {
          $(".rightColumn").empty();
          $(".leftColumn").empty();
          axios.get("http://" + baseURL + ":4211/api/products").then((resp) => {
            if (resp.data.success) {
              if (resp.data.items.length) {
                resp.data.items.forEach((element, index) => {
                  if (index < 8) {
                    if (index % 2 === 0) {
                      $(".rightColumn").append(`
                            <div class="art__menu text-right">
                               <div class="art__menu__thumb">
                                   <a href="#">
                                       <img width="100px" height="100px" src=http://${baseURL}:4211//productImage/${element.image} alt="product images">
                                   </a>
                               </div>
                               <div class="art__menu__details">
                                   <div class="at__menu__title__prize">
                                       <h4><a href="#"> ${element.name}</a></h4>
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
                    <div class="art__menu text-right">
                    <div class="art__menu__thumb">
                        <a href="#">
                            <img width="100px" height="100px" src=http://${baseURL}:4211//productImage/${element.image}  alt="product images">
                        </a>
                    </div>
                    <div class="art__menu__details">
                        <div class="at__menu__title__prize">
                            <h4><a href="#">${element.name}</a></h4>
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
                document
                  .querySelectorAll(".tableProduct")
                  .forEach((products) => {
                    products.addEventListener("click", (event) => {
                      event.preventDefault();
                      window.localStorage.setItem("shopId", event.path[3].id);
                      window.location.href = "/user/shop";
                    });
                  });
                document
                  .querySelectorAll(".tableProductName")
                  .forEach((products) => {
                    products.addEventListener("click", (event) => {
                      event.preventDefault();
                      window.localStorage.setItem("shopId", event.path[4].id);
                      window.location.href = "/user/shop";
                    });
                  });
              }
            }
          });
        }
      });
    });

    document.querySelectorAll(".headerCategoryItem").forEach((element) => {
      element.addEventListener("click", (event) => {
        window.localStorage.removeItem("categoryId");
        window.localStorage.setItem(
          "categoryId",
          listOfCategories[event.path[0].id].id
        );
        window.location.href = "category";
      });
    });
    document.querySelectorAll(".categoryPictureItem").forEach((element) => {
      element.addEventListener("click", (event) => {
        window.localStorage.setItem(
          "categoryId",
          listOfCategories[event.path[1].id].id
        );
        window.location.href = "category";
      });
    });
  }
});
