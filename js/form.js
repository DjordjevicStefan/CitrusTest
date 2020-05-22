document.addEventListener('DOMContentLoaded', ()=> {
  const initState = new Init()
  new AddEventListeners(initState)
} );


class Init {
  constructor() {
     this.form = document.querySelector('.form') ;
     this.submitBtn = form.querySelector('.btn') ;
     this.registerEmailSwitch = form.querySelectorAll('.form__span')[0] ;
     this.registerPhoneSwitch = form.querySelectorAll('.form__span')[1] ;

  }
}

class AddEventListeners{
      constructor({submitBtn, registerEmailSwitch, registerPhoneSwitch}) {
          submitBtn.addEventListener('click' , this.handleSubmit ) ;
          registerEmailSwitch.addEventListener('click', this.changeRegisterToEmail);
          registerPhoneSwitch.addEventListener('click' , this.changeRegisterToPhone);
      }
        


      handleSubmit = (e) => {
         e.preventDefault();
         console.log('submit submit')
      }

      changeRegisterToPhone = (e) => {
        const formInputPhone = document.querySelectorAll('.form__input-group')[1] ;
        const activeClass = 'form__input-group--active'
        formInputPhone.classList.add(activeClass)
        formInputPhone.previousElementSibling.classList.remove(activeClass)
        
      }

      changeRegisterToEmail = (e) => {
        const formInputPhone = document.querySelectorAll('.form__input-group')[0] ;
        const activeClass = 'form__input-group--active'
        formInputPhone.classList.add(activeClass)
        formInputPhone.nextElementSibling.classList.remove(activeClass)

        this.getCheckboxInputValue()
      }
    
      //// Da li ove dve helper methode staviti u posebnu klasu 
      getRadioInputValue = () => {
        return document.querySelector(`input[name='currency']:checked`).value ; 
        // document.querySelector('input[name="currency"]:checked').value 
      }

      getCheckboxInputValue = () => {
        return document.querySelector(`input[name='terms']:checked`).value ; 
        // document.querySelector('input[name="currency"]:checked').value 
      }

}

