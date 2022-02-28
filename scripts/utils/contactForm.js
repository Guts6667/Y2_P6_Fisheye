const form = document.querySelector('form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const message = document.getElementById('message')
const submitBtn = document.getElementById('submitBtn');
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const modal = document.querySelector('.modal');

form.addEventListener('submit', (e) => {
    e.preventDefault();
})

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}


function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    modal.style.zIndex = "35";
}


// (1) Le champ Prénom a un minimum de 2 caractères / n'est pas vide.

const firstNameVerification = () => {
    if(firstName.value == null || firstName.value == "" || isNaN(firstName.value) == false || firstName.value.length < 2){
      console.log("Le champ prénom ne peut être vide et doit contenir au moins 2 lettres.");
      
      firstName.parentElement.setAttribute("data-error-visible", true);
      firstName.parentElement.setAttribute("data-error", "Veuillez entrer 2 caractères ou plus pour le champ du nom.")
      firstName.value="";
    
      return false;
    
    } 
    else{
      firstName.parentElement.setAttribute("data-error-visible", false);
      return true
    }
  }
  
  // (2) Le champ du nom de famille a un minimum de 2 caractères / n'est pas vide.
  const lastNameVerification = () => {
  
    if(lastName.value == null || lastName.value == "" || isNaN(lastName.value) == false || lastName.value.length < 2){
  
      console.log("Le champ nom ne peut être vide et doit contenir au moins 2 lettres.");
    
      lastName.parentElement.setAttribute("data-error-visible", true);
      lastName.parentElement.setAttribute("data-error", "Veuillez entrer 2 caractères ou plus pour le champ du nom.")
      lastName.value="";
    
      return false;
    } 
    else{
      lastName.parentElement.setAttribute("data-error-visible", false);
      return true
    }
  }
  
  // (3) L'adresse électronique est valide.
  const emailVerification = () => {
  
    if(email.value == null || email.value == "" || email.value.match(regexEmail) == false){
  
      console.log("Veuillez entrer un email valide");
    
      email.closest(".formData").setAttribute("data-error-visible", true);
      email.closest(".formData").setAttribute("data-error", "Veuillez entrer un email valide (ex : johndoe@gmail.com).")
      email.value="";
      
      return false;
    }
     else{
      email.closest(".formData").setAttribute("data-error-visible", false);
      return true;
     }
  }

  const messageVerification = () => {
      if(message.value == null || message.value == "" || message.value.length < 25 || message.value.length > 100 ){
        console.log("Votre message doit contenir entre 25 et 100 caractères");
    
        message.closest(".formData").setAttribute("data-error-visible", true);
        message.closest(".formData").setAttribute("data-error", "Votre message doit contenir entre 25 et 100 caractères")

        return false
      }
      else{
        message.closest(".formData").setAttribute("data-error-visible", false);
        return true;
      }
  }
// Create validate function()
let formData;
let allDatas =[];
function validate(){
  if(firstNameVerification() == true && lastNameVerification() == true && emailVerification() == true && messageVerification() == true){

    formData = {

      Prénom: firstName.value,
      Nom : lastName.value,
      email: email.value,
      message : message.value
   
    }
    
    // Ajout des données à l'objet allDatas

    allDatas.push(formData);
    console.log(allDatas);

    thanksModal();

  } else{
    return false;
  }
 
}  


// function ThanksModal
let modalForm = document.querySelector("#modalForm");
let modalHeader = document.querySelector('.modalHeader')
const thanksModal = () => {
// On garde la structure de la modale et retire le formulaire
    form.remove();
// Création du nouveau contenu de la modale
    modalHeader.textContent = 'Merci !'
    modal.innerHTML += 
  `<div class = 'thanksMessage'>
    <p>Merci pour votre prise de contact ${formData.Prénom} , je reviendrai vers vous rapidement !</p>
  <div>
  `;
 

};
