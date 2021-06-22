let listOfSellers = [];

axios.get("http://"+baseURL+":4211/api/users?role=seller").then((resp) => {
  if (resp.data.items) {
  listOfSellers.push(...resp.data.items);
  listOfSellers.forEach((element, index) => {
    $("tbody").append(`
        <tr>
                        <td>
                        ${
                          element.gallery.avatar === "galleryAvatar.png"
                            ? "-"
                            : ` <img
                            src="http://${baseURL}:4211/galleryAvatar/${element.gallery.avatar}"
                            width="30px"
                            height="30px"
                            style="border-radius: 7px"
                            alt="product image"
                          />`
                        }
                         
                        </td>
                        <td>${
                          element.gallery.name ? element.gallery.name : "-"
                        }</td>
                        <td>${element.firstName}</td>
                        <td>${element.lastName}</td>
                        <td>${element.email}</td>
                        <td>${element.phone ? element.phone : "-"}</td>
                        <td>${element.gallery.adsStatus}</td>
                        <td>${
                          element.gallery.description
                            ? element.gallery.description
                            : " - "
                        }</td>
                        <td class="actions">
                          <a id=${index} href="#" class="on-default products"
                            ><i class="zmdi zmdi-receipt"></i
                          ></a>
                        </td>
                      </tr>
        `);
  });
  document.querySelectorAll(".products").forEach((element) => {
    element.addEventListener("click", (event) => {
    window.localStorage.setItem("singleProduct", true);
    window.localStorage.setItem(
      "singleProductId",
      listOfSellers[event.path[1].id].gallery._id
    );
    window.location.href = "/admin/listOfShopProducts";
  });
})   
}
});
