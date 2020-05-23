class Modal {
  constructor() {
    this.modal = document.querySelector(".modal");
    this.modalBox = this.modal.querySelector(".modal__box");
    this.modalBtn = this.modal.querySelector(".btn");
    this.modalHeader = this.modal.querySelector(".modal__header");
    this.modalText = this.modal.querySelector("p");

    this.modal.addEventListener("click", this.hideModal);
    this.modalBtn.addEventListener("click", this.hideModal);
  }

  showModal = () => {
    this.modal.classList.add("modal--show");
  };

  hideModal = () => {
    this.modal.classList.remove("modal--show");
  };

  addHeaderAndParagText = (headerText, paragText) => {
    this.modalHeader.innerHTML = headerText;
    this.modalText.innerHTML = paragText;
  };
}

const modal = new Modal();
