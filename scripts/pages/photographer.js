// Filter button

let arrowUp = document.getElementById("arrowUp");
let arrowDown = document.getElementById("arrowDown");
let dateOption = document.getElementById("dateOption");
let titleOption = document.getElementById("titleOption");
let popularityOption = document.getElementById("popularityOption")

arrowUp.addEventListener("click", () =>{
    arrowUp.style = "display : none";
    arrowDown.style = "display : inline";
    titleOption.style = "display: block"
    dateOption.style = "display: block"
})

arrowDown.addEventListener("click", () => {
    arrowUp.style = "display : inline";
    arrowDown.style = "display : none";
    titleOption.style = "display: none"
    dateOption.style = "display: none"
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


            //    createMediaArray(myMedias, medias, mediasArray)

        
            //Sort Media by Date
               let sortedMediasByDate = myMedias.sort(function (a, b) {
                   var dateA = new Date(a.date), dateB = new Date(b.date)
                   return dateA - dateB
               });
               
              let sortedMediasByLikes = myMedias?.sort((a, b) => (a.likes > b.likes ? -1 : 1))
              console.log(sortedMediasByLikes);
       
             
 
               dateOption.addEventListener('click', () => {
                   titleOption.style = 'display: none';
                   popularityOption.style = 'display: none';

                updateMedia(sortedMediasByDate)
               })

} 




// Fonction createMediaArray 
// createMediaArray = (myMedias, medias, mediasArray) => {

//     myMedias.forEach(medias => {
//         mediasArray.push(medias);
//     });
//     return mediasArray;
// }


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

    }
    
    init();
