if (loggedIn) {
  galleryData = JSON.parse(window.localStorage.getItem("sellerGallery"));
  sellerData = JSON.parse(window.localStorage.getItem("sellerData"));
  document
    .querySelector("#gallerySideBarImage")
    .setAttribute(
      "src",
      `http://${baseURL}:4211/galleryAvatar/${galleryData.avatar}`
    );
  document
    .querySelector("#gallerySideBarImage")
    .setAttribute("title", galleryData.name ? galleryData.name : "نام گالری");
  document.querySelector("#gallerySideBarName").innerHTML = galleryData.name
    ? galleryData.name
    : "- -";
}

document.querySelector("#logOff").addEventListener("click", function () {
  window.localStorage.clear();
  window.location.reload();
});
