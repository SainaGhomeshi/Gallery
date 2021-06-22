let listOfCategories = [];
const headers = {
  Authorization: token,
  accept: "application/json",
};

let isEdit = false;

let editId = "";

let formData = new FormData();

const getCategories = () => {
  axios.get("http://"+ baseURL +":4211/api/categories").then((resp) => {
    if (resp.data.items) {
    listOfCategories.push(...resp.data.items);
    listOfCategories.forEach((element, index) => {
      $("tbody").append(`
        <tr>
        <td>
        <img
        src="http://${baseURL}:4211/categoryImage/${element.image}"
        width="30px"
        height="30px"
        style="border-radius: 20px"
        alt="product image"
      />
      </td>
        <td>${element.name}</td>
        <td>${element.description}</td>
        <td id=${element._id}>
        <a id=${index} href="#" class="on-default editCategory ">
        <i class=" ti-pencil"></i>
          </a>
        <a href="#" class="on-default deleteCategory">
        <i class="zmdi zmdi-delete"></i>
          </a>
          </td>
        </tr>
        `);
      document.querySelectorAll(".editCategory").forEach((element) => {
        element.addEventListener("click", function (event) {
  
          isEdit = true;
          document.querySelector("#newEditCategoryName").value =
            listOfCategories[event.path[1].id].name;
          document.querySelector("#newEditCategoryDescription").value =
            listOfCategories[event.path[1].id].description;
          editId = listOfCategories[event.path[1].id]._id;
        });
      });
      document.querySelectorAll(".deleteCategory").forEach((element) => {
        element.addEventListener("click", function (event) {
          axios
            .delete(
              `http://${baseURL}:4211/api/superadmin/category?id=${event.path[2].id}`,
              { headers }
            )
            .then((response) => {
              window.location.reload();
            });
        });
      });
    });  
  }
  });
};

document.querySelector("#deleteInputs").addEventListener("click", () => {
  document.querySelector("#newEditCategoryDescription").value = "";
  document.querySelector("#newEditCategoryName").value = "";
  document.querySelector("#newEditCategoryImage").files[0] = null;
  editId = "";
  isEdit = false;
});

document.querySelector("#createEditCity").addEventListener("click", () => {
  if (
    (document.querySelector("#newEditCategoryImage").files[0] &&
      document.querySelector("#newEditCategoryName").value &&
      document.querySelector("#newEditCategoryDescription").value) ||
    isEdit
  ) {
    formData.append(
      "name",
      document.querySelector("#newEditCategoryName").value
    );
    if (document.querySelector("#newEditCategoryImage").files[0]) {
      formData.append(
        "categoryImage",
        document.querySelector("#newEditCategoryImage").files[0]
      );
    }
    formData.append(
      "description",
      document.querySelector("#newEditCategoryDescription").value
    );
    if (isEdit) {
      axios
        .put(
          `http://${baseURL}:4211/api/superadmin/category?id=${editId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
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
        .post(`http://${baseURL}:4211/api/superadmin/category`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        })
        .then((respons) => {
          if (respons.data.success) {
            location.reload();
          }
        });
    }
  } else {
    alert("خواهشا تمام فرم را پر کنید");
  }
});

getCategories();
