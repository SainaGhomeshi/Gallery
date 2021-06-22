let listOfProvince = [];
let newProvinceValue;
let editting = false;
let editProvinceId = null;
const newProvinceValueInput = document.querySelector("#newProvinceValue");

const headers = {
  Authorization: token,
};

document
  .querySelector("#createNewProvince")
  .addEventListener("click", function () {
    newProvinceValue = newProvinceValueInput.value;
    if (!editting) {
      if (newProvinceValue) {
        axios
          .post(
            "http://"+ baseURL +":4211/api/superadmin/province",
            {
              name: newProvinceValue,
            },
            {
              headers,
            }
          )
          .then((resp) => {
            if (resp.data.success) {
              location.reload();
            }
          })
          .catch((er) => console.error(er));
      }
    } else {
      axios
        .put(
          `http://${baseURL}:4211/api/superadmin/province?id=${editProvinceId}`,
          {
            name: newProvinceValueInput.value,
          },
          { headers }
        )
        .then((respons) => {
          if (respons.data.success) {
            location.reload();
          }
        });
    }
  });

document.querySelector("#deleteInputs").addEventListener("click", () => {
  document.querySelector("#newProvinceValue").value = "";
  editting = false;
  editProvinceId = null;
});

const fetchingProvince = () => {
  axios
    .get("http://"+ baseURL +":4211/api/provinces", {
      headers,
    })
    .then((repsonse) => {
      if (repsonse.data.items) {

      listOfProvince.push(...repsonse.data.items);
      listOfProvince.forEach((element, index) => {
        $("tbody").append(`
            <tr class="gradeA">
            <td >${element.name}</td>
            <td id=${index} class="actions">
                <a href="#" class="on-default editProvince"><i class="fa fa-pencil"></i></a>
                <a href="#" class="on-default removeProvince"><i class="fa fa-trash-o"></i></a>
            </td>
        </tr>
        `);
      });

      $(".actions").on("click", ".removeProvince", function (element) {
        axios
          .delete(
            `http://${baseURL}:4211/api/superadmin/province?id=${
              listOfProvince[$(element)[0].delegateTarget.id]._id
            }`,
            { headers }
          )
          .then((resp) => {
            if (resp.data.success) {
              location.reload();
            }
          });
      });

      $(".actions").on("click", ".editProvince", function (element) {
        editProvinceId = listOfProvince[$(element)[0].delegateTarget.id]._id;
        document.getElementById("newProvinceValue").value =
          listOfProvince[$(element)[0].delegateTarget.id].name;
        editting = true;
      });
    }
    });
};

fetchingProvince();
