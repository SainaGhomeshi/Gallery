const headers = {
  Authorization: auth,
};

let listOfFactors = [];

axios
  .get(`http://${baseURL}:4211/api/seller/galleryfactors`, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: auth,
    },
  })
  .then((response) => {
    if (response.data.items) {
      response.data.items.forEach((elementFactor, index) => {
        listOfFactors.push(elementFactor);
        $("tbody").append(`
              <tr>
                  <td>${elementFactor.user.firstName}</td>
                  <td>${elementFactor.user.lastName}</td>
                  <td>${elementFactor.user.address}</td>
                  <td>${elementFactor.user.phone}</td>
                  <td>${elementFactor.user.email}</td>
                  <td>${elementFactor.items[0].product.name}</td>
                  <td>${elementFactor.totalPrice}</td>
              </tr>
              `);
      });
    }
  });
