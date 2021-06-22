let listOfUsers = [];

axios
  .get("http://" + baseURL + ":4211/api/users?role=customer")
  .then((resp) => {
    if (resp.data.items) {
      listOfUsers.push(...resp.data.items);
      listOfUsers.forEach((element) => {
        $("tbody").append(`
        <tr>
                        <td>${element.firstName}</td>
                        <td>${element.lastName}</td>
                        <td>${element.userName}</td>
                        <td>${element.city ? element.city.name : "-"}</td>
                        <td>${
                          element.city ? element.city.province.name : "-"
                        }</td>
                        <td>${element.address ? element.address : "-"}</td>
                        <td>${element.phone ? element.phone : "-"}</td>
                        <td>${element.email}</td>
                        <td>${element.postId ? element.postId : " - "}</td>
                        <td class="actions">
                          <a href="listOfCheckOuts/${
                            element._id
                          }" class="on-default remove-row">
                          <i class="zmdi zmdi-receipt"></i>
                            </a>
                        </td>
                      </tr>
        `);
      });
    }
  });
