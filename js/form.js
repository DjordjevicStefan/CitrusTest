document.addEventListener("DOMContentLoaded", () => {
  const initState = new Init();
  const form = new Form(initState);
});

class Init {
  constructor() {
    this.form = document.querySelector(".form");
    this.submitBtn = form.querySelector(".btn");
    this.phoneInput = form.querySelector("#phone");
    this.registerEmailSwitch = form.querySelectorAll(".form__span")[0];
    this.registerPhoneSwitch = form.querySelectorAll(".form__span")[1];
  }
}

class Form {
  constructor({
    submitBtn,
    registerEmailSwitch,
    registerPhoneSwitch,
    phoneInput,
  }) {
    submitBtn.addEventListener("click", this.handleSubmit);
    registerEmailSwitch.addEventListener("click", this.changeRegisterToEmail);
    registerPhoneSwitch.addEventListener("click", this.changeRegisterToPhone);
    phoneInput.addEventListener("input", this.hanldePhoneInputChange);
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const inputFormValues = {};

    inputFormValues.currency = this.getRadioInputValue();
    inputFormValues.terms = this.getCheckboxInputValue();

    const fromInputs = document.querySelectorAll(".form__input");
    const parentActiveClass = "form__input-box--active";
    fromInputs.forEach((input) => {
      const parentClassListArray = [
        ...input.parentElement.parentElement.classList,
      ];
      if (parentClassListArray.includes(parentActiveClass)) {
        const inputName = input.getAttribute("name");
        const inputValue = input.value;
        inputFormValues[inputName] = inputValue;
      }
    });

    const user = new User(inputFormValues);
    const errorObject = user.validation();

    if (Object.keys(errorObject).length !== 0) {
      this.fillErrorSpanElements(errorObject);
      return;
    }

    let spinner = document.querySelector(".spinner");
    spinner.classList.add("spinner__active");

    const xml = new XMLRequest(user);
    let response = await xml.sendFakeRequest("ok").catch((error) => {
      spinner.classList.remove("spinner__active");
      modal.addHeaderAndParagText("Register error!", "Please try again!");
      modal.showModal();
    });
    if (response) {
      spinner.classList.remove("spinner__active");
      modal.addHeaderAndParagText("Success!", "Please proceed to login!");
      modal.showModal();
    }
  };

  fillErrorSpanElements = (errorObject) => {
    const errorSpans = [...document.querySelectorAll(".form__error-span")];
    errorSpans.forEach((span) => {
      span.textContent = "";
    });
    //  const objectKeys = Object.keys(errorObject);
    errorSpans.forEach((span) => {
      if (errorObject[span.dataset.name]) {
        span.textContent = errorObject[span.dataset.name];
      }
    });
  };

  hanldePhoneInputChange = (e) => {
    e.target.value = e.target.value
      .replace(/[^\dA-Z]/g, "")
      .replace(/(.{3})/g, "$1 ")
      .trim();
  };

  changeRegisterToPhone = (e) => {
    const activeClassSpan = "form__span-active";
    const formInputSpanPhone = e.target;
    formInputSpanPhone.classList.add(activeClassSpan);
    Helpers.addClassAndRemoveSiblingClassFromElement(
      formInputSpanPhone,
      activeClassSpan,
      "previous"
    );

    const formInputPhone = document.querySelectorAll(".form__input-box")[1];
    const activeClass = "form__input-box--active";
    Helpers.addClassAndRemoveSiblingClassFromElement(
      formInputPhone,
      activeClass,
      "previous"
    );
  };

  changeRegisterToEmail = (e) => {
    const activeClassSpan = "form__span-active";
    const formInputSpanEmail = e.target;
    formInputSpanEmail.classList.add(activeClassSpan);
    // const formSpanEma = document.querySelectorAll(".form__span")[0];
    Helpers.addClassAndRemoveSiblingClassFromElement(
      formInputSpanEmail,
      activeClassSpan,
      "next"
    );

    const formInputEmail = document.querySelectorAll(".form__input-box")[0];
    const activeClass = "form__input-box--active";
    Helpers.addClassAndRemoveSiblingClassFromElement(
      formInputEmail,
      activeClass,
      "next"
    );
  };

  //// Da li ove dve helper methode staviti u posebnu klasu
  getRadioInputValue = () => {
    return Helpers.getCheckedValueByInputName("currency");
  };

  getCheckboxInputValue = () => {
    return Helpers.getCheckedValueByInputName("terms");
  };
}

class Helpers {
  static addClassAndRemoveSiblingClassFromElement = (
    element,
    className,
    siblingPosition
  ) => {
    element.classList.add(className);
    if (siblingPosition === "next") {
      element.nextElementSibling.classList.remove(className);
      return;
    }
    element.previousElementSibling.classList.remove(className);
  };

  static getCheckedValueByInputName = (name) => {
    let selectedElement = document.querySelector(
      `input[name='${name}']:checked`
    );
    if (selectedElement === null) {
      return null;
    }
    return selectedElement.value;
  };
}

class User {
  constructor({ email = null, phone = null, currency, terms }) {
    this.email = email;
    this.phone = phone;
    this.currency = currency;
    this.terms = terms;
  }

  validation = () => {
    const errorMsgs = {};

    if (this.currency === null) {
      errorMsgs.currency = "Currency must be selected";
    }

    if (this.terms === null) {
      errorMsgs.terms = "Please agree with our terms and policy";
    }

    if (typeof this.phone === "string" && !this.phone.trim()) {
      errorMsgs.phone = "Phone field empty, please enter your phone number";
    }

    if (
      typeof this.phone === "string" &&
      (this.phone.split("").length < 11 || this.phone.split("").length > 13)
    ) {
      errorMsgs.phone = "Invalid number length, try again";
    }

    if (typeof this.email === "string" && !this.email.trim()) {
      errorMsgs.email = "Email field empty, please enter yout Email";
    }

    if (this.email) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

      if (!pattern.test(this.email)) {
        errorMsgs.email = "Please enter a valid Email";
      }
    }

    return errorMsgs;
  };
}

//// Fake backend api :)
class XMLRequest {
  constructor(data) {
    this.data = data;
  }

  sendFakeRequest = (option) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (option === "ok") {
          resolve({ statusCode: 200 });
        } else {
          reject(new Error("Error!"));
        }
      }, 2500);
    });
  };
}
