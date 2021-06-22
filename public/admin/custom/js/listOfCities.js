let listOfCities = [];
let listOfProvince = [];
let editting = false;
let newCityValue;
let newProvinceValue;
let editCityId = null;
const newCityValueInput = document.querySelector("#newCityValue");
const newCityCreateButton = document.querySelector("#createNewCity");

const headers = {
  Authorization: token,
};

document.querySelector("#deleteInputs").addEventListener("click", () => {
  document.querySelector("#newCityValue").value = "";
  document.querySelector("#newCityProvince").value = "";
  editCityId = null;
  editting = false;
});

newCityCreateButton.addEventListener("click", function () {
  newCityValue = newCityValueInput.value;
  if (!editting) {
    if (newCityValue) {
      axios
        .post(
          "http://" + baseURL + ":4211/api/superadmin/city",
          {
            name: newCityValue,
            province: newProvinceValue,
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
        `http://${baseURL}:4211/api/superadmin/city?id=${editCityId}`,
        {
          name: document.getElementById("newCityValue").value,
          province: newProvinceValue,
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

const fetchingCities = () => {
  axios.get("http://" + baseURL + ":4211/api/cities").then((response) => {
    if (response.data.items) {
      listOfCities.push(...response.data.items);
      listOfCities.forEach((element, index) => {
        $("tbody").append(`
            <tr class="gradeA">
            <td>${element.province.name}</td>
            <td >${element.name}</td>
            <td id=${index} class="actions">
                <a href="#" class="on-default editCity"><i class="fa fa-pencil"></i></a>
                <a href="#" class="on-default removeCity"><i class="fa fa-trash-o"></i></a>
            </td>
        </tr>
        `);
      });
      $(".actions").on("click", ".editCity", function (element) {
        editCityId = listOfCities[$(element)[0].delegateTarget.id]._id;
        document.getElementById("newCityValue").value =
          listOfCities[$(element)[0].delegateTarget.id].name;
        document.getElementById("newCityProvince").value =
          listOfCities[$(element)[0].delegateTarget.id].province.name;
        newProvinceValue =
          listOfCities[$(element)[0].delegateTarget.id].province._id;
        editting = true;
      });
      $(".actions").on("click", ".removeCity", function (element) {
        axios
          .delete(
            `http://${baseURL}:4211/api/superadmin/city?id=${
              listOfCities[$(element)[0].delegateTarget.id]._id
            }`,
            { headers }
          )
          .then((resp) => {
            if (resp.data.success) {
              location.reload();
            }
          });
      });
    }
  });
};

axios
  .get("http://" + baseURL + ":4211/api/provinces", {
    headers,
  })
  .then((response) => {
    if (response.data.items) {
      response.data.items.forEach((element) => {
        listOfProvince.push({ name: element.name, code: element._id });
      });
    }
  });

let options = {
  data: listOfProvince,
  getValue: "name",

  list: {
    match: {
      enabled: true,
    },
    onSelectItemEvent: function () {
      newProvinceValue = $("#newCityProvince").getSelectedItemData().code;
    },
  },
};

$("#newCityProvince").easyAutocomplete(options);

fetchingCities();
