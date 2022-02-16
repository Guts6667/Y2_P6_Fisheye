// Filter button

let arrowUp = document.getElementById("arrowUp");
let arrowDown = document.getElementById("arrowDown");
let dateOption = document.getElementById("dateOption");
let titleOption = document.getElementById("titleOption");
let popularityOption = document.getElementById("popularityOption")
let optionContainer = document.getElementById("optionContainer");

let options = [popularityOption, titleOption, dateOption];

arrowUp.addEventListener("click", () =>{
    arrowUp.style = "display : none";
    arrowDown.style = "display : inline";  
    options[0].style = "display : block";
    options[1].style = "display : block";
    options[2].style = "display : block";
})

arrowDown.addEventListener("click", () => {
    arrowUp.style = "display : inline";
    arrowDown.style = "display : none";
    options[0].style = "display : block";
    options[1].style = "display : none;";
    options[2].style = "display : none";

})

// ---------------------------------------------------------------

// Déclarations de variables
let myMedias;
let myPhotographer;
const contactButton = document.querySelector('.contact_button')
const photographerHeader = document.querySelector('#photographerHeader')
const photographerSection = document.querySelector('#photoSection');
let mediasArray = [];

// ---------------------------------------------------------------


const displayPhotographerData = async()=> {

    // Réucupération des données JSON avec la fonction getData
    const { photographers, medias } = await getData();


    const params = new URLSearchParams(document.location.search.substring(1));
    const identifier = params.get("id")

    
    // Cherche dans photographers si un photographer a le même id que identifier
    // On l'affecte à photographer
    myPhotographer = photographers.find(
        (photographer) => identifier == photographer.id
        
    )
    
    // Store data of selected photographer

    myPhotographer = new Photographer(myPhotographer);
    
       photographerHeader.insertAdjacentHTML('afterbegin', myPhotographer.createPhotographerHeaderLeft());
       photographerHeader.insertAdjacentHTML('beforeend', myPhotographer.createPhotographerHeaderRight());
    
       
       // Filter datas in medias in order to keep only those matching the photographerId
        myMedias = medias.filter(media => media.photographerId == identifier);

               // Create new Media for each filtered media

               updateMedia(myMedias);
               // Créer un array stockant les medias



        
   
             
 


} 
const filter = () => {
  // Filter by Date
  dateOption.addEventListener("click", () => {
    let mediasByDate = myMedias.sort(function (a, b) {
        let dateA = new Date(a.date), dateB = new Date(b.date)
        return dateA - dateB
    });
    updateMedia(mediasByDate);
    optionContainer.insertAdjacentElement("afterbegin", dateOption);
    // Get index of option in array then delete it and insert it at the beginning of the array
    updateOptions(dateOption);
    
})
  
   
// Filter by Likes
popularityOption.addEventListener("click", () => {
    let mediasByLikes = myMedias?.sort((a, b) => (a.likes > b.likes ? -1 : 1))
    updateMedia(mediasByLikes);
    optionContainer.insertAdjacentElement("afterbegin", popularityOption);
    updateOptions(popularityOption)
})


titleOption.addEventListener("click", () => {
    let mediasByTitle = myMedias?.sort((a, b) => (a.title < b.title ? -1 : 1));
    updateMedia(mediasByTitle);
    optionContainer.insertAdjacentElement("afterbegin", titleOption);
    updateOptions(titleOption);
})
}

  
  


const updateOptions = (option) => {
    let index = options.indexOf(option);
                options.splice(index, 1);
                options.unshift(option);
    optionContainer.children[0].classList.remove('border-button');
    optionContainer.children[2].classList.remove('border-button');
    optionContainer.children[1].classList.add('border-button');
    
}



// Fonction UpdateMedia => Retourne les media séléctionnés et créer les articles html
const updateMedia = (myMedias) => {
    photographerSection.innerHTML = "";
    myMedias.forEach(media => {
        let mediaModel = new Media(media);
        let mediaName = mediaModel.getName(myPhotographer.name)
        photographerSection.innerHTML += mediaModel.displayPhotoCard(mediaName);


    });

}



// Init 
const init = async () => {

    displayPhotographerData();

    filter();
    }
    
    init();
