let registerInfo = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  registerReEnterPassword: "",
  registerPolicy: false,
};

document
  .querySelector("#registerButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    registerInfo.firstName = document.querySelector("#registerFirstName").value;
    registerInfo.lastName = document.querySelector("#registerLastName").value;
    registerInfo.email = document.querySelector("#registerEmail").value;
    registerInfo.password = document.querySelector("#registerPassword").value;
    registerInfo.registerReEnterPassword = document.querySelector(
      "#registerReEnterPassword"
    ).value;
    registerInfo.registerPolicy =
      document.querySelector("#registerPolicy").checked;

    if (registerInfo.registerPolicy) {
      if (
        registerInfo.firstName &&
        registerInfo.lastName &&
        registerInfo.email &&
        registerInfo.password &&
        registerInfo.registerReEnterPassword
      ) {
        if (registerInfo.password === registerInfo.registerReEnterPassword) {
          axios
            .post("http://"+baseURL+":4211/api/sellerregister", {
              firstName: registerInfo.firstName,
              lastName: registerInfo.lastName,
              password: registerInfo.password,
              email: registerInfo.email,
            })
            .then((response) => {
              if (response.data.success) {
                window.localStorage.clear();
                window.location.href = "/seller/login";
              }
            });
        } else {
          alert(
            "رمز انتخاب شده با تکرار رمز مشابه نیست خواهشا دوباره وارد کنید"
          );
        }
      } else {
        alert("لطفا تمام فرم های ثبت نام رو پر کنید");
      }
    } else {
      alert("خواهشا جعبه مربوط به خواندن قوانین رو تیک بزنید");
    }
  });
