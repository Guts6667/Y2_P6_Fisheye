// ---------------------------------------------------------------
// Déclarations de variables
let myMedias;
let myPhotographer;
const contactButton = document.querySelector('.contact_button')
const photographerHeader = document.querySelector('#photographerHeader')
const photographerSection = document.querySelector('#photoSection');
let mediasArray = [];
let lightboxSection = document.querySelector('.lightbox');
let lightboxMedia = document.querySelector('.lightbox-media');

// ---------------------------------------------------------------
// Display the photographers
const displayPhotographerData = async()=> {

    // Récupération des données JSON avec la fonction getData
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

// ---------------------------------------------------------------
    // Call likeFunc
    likeFunc();
 
// ---------------------------------------------------------------------------------
// ici je récupère les titres de mes lightboxes
let lightboxes = document.querySelectorAll('.lightboxImg');
let myBoxes = [];
lightboxes.forEach(lightbox => {
myBoxes.push(lightbox.lastElementChild);

})
   } 

// ---------------------------------------------------------------------------------
// Fonction UpdateMedia => Retourne les media séléctionnés et créer les articles html
const updateMedia = (myMedias) => {
    photographerSection.innerHTML = "";
    myMedias.forEach(media => {
        let mediaModel = new Media(media);
        let mediaName = mediaModel.getName(myPhotographer.name)
        photographerSection.innerHTML += mediaModel.displayPhotoCard(mediaName);
        // J'appelle ma fonction display lightbox => Elles sont toutes masquées par défaut.
    });
    lightboxMedia.innerHTML = "";
    createLightbox();
}

// ---------------------------------------------------------------------------------
const lightboxInit = () => {
    // Ici je récupère la section contenant les articles
    let mediasToGet = document.querySelector('#photoSection')
    // Je récupère toutes les sources des medias dans cette section
    const mediasToClick = mediasToGet.querySelectorAll('img[src$=".jpg"],source[src$=".mp4"]')
    // Je récupère toutes mes lightbox
    let myLightboxes = document.querySelectorAll('.lightboxImg');
    myLightboxes = [...myLightboxes];
    mediasToClick.forEach( media => {
        // Pour chaque media
        media.addEventListener('click', (e) => {
            // Je récupère l'attribut src du media à afficher
            const mediaToDisplay = e.target.getAttribute('src')
            // Pour chaque lightbox
            myLightboxes.forEach(mediaBox => {
                // Je récupère l'attribut src
              let myMedia = mediaBox.firstElementChild.getAttribute('src');
              // Je compare si les attributs src correspondent
                if(myMedia == mediaToDisplay){ // Si oui, je retire la class 'hidden'
                    mediaBox.classList.remove('hidden')
                    lightboxSection.classList.remove('hidden');
                    closeLightBox();
                    navRight();
                    navLeft();

                }
            })
        })
    })

// ---------------------------------------------------------------------------------
const boxRight = document.querySelector('.fa-chevron-right')
const boxLeft = document.querySelector('.fa-chevron-left')

const navRight = () => {
    let nextBox ;
let currentBoxIndex;
    // Event au click sur flèche droite
    boxRight.addEventListener('click', () => {
       goRight() 
    })
    document.addEventListener('keydown',(e) => { if(e.code == 'ArrowRight'){ goRight() }})
   
    const goRight = () => {
        // Vérifie chaque lightbox pour trouver laquelle n'a pas 'hidden'
        myLightboxes.forEach( myBox => {
          if(myBox.classList.contains('hidden') == false){
              // Récupération de l'index de la box affichée
              currentBoxIndex = myLightboxes.indexOf(myBox);
              // Masquage de la box actuelle
              myBox.classList.add('hidden');
              // La box suivante a un index supérieur à la box actuelle
              nextBox = currentBoxIndex +1;
              return nextBox;
          }
      })  
      console.log(nextBox);
      if(nextBox < myLightboxes.length){
          myLightboxes[nextBox].classList.remove('hidden');
      }
      else{
          currentBoxIndex = 0;
          myLightboxes[currentBoxIndex].classList.remove('hidden');
          // myLightboxes[nextBox].classList.remove('hidden');
      }
    }
}

// ---------------------------------------------------------------------------------
const navLeft = () => {
    let nextBox ;
    let currentBoxIndex;
    
    boxLeft.addEventListener('click', () => { goLeft() });
     // Event au click sur flèche droite
    document.addEventListener('keydown', (e) => {if(e.code == 'ArrowLeft'){goLeft()}});

// ---------------------------------------------------------------------------------
    const goLeft = () => {
        // Vérifie chaque lightbox pour trouver laquelle n'a pas 'hidden'
        myLightboxes.forEach( myBox => {
           if(myBox.classList.contains('hidden') == false){
               // Récupération de l'index de la box affichée
               currentBoxIndex = myLightboxes.indexOf(myBox);
               // Masquage de la box actuelle
               myBox.classList.add('hidden');
               
               nextBox = currentBoxIndex -1;
               return nextBox;
           }
       })  
       console.log(nextBox);
       if(nextBox < myLightboxes.length && nextBox > -1){
           myLightboxes[nextBox].classList.remove('hidden');
       }
       
       else{
           console.log(myLightboxes.length);
           myLightboxes[9].classList.remove('hidden');
       }
               }
    
}

// ---------------------------------------------------------------------------------
    // Function closeLightBox
const closeLightBox = () => {
    let closeBtn = document.querySelector('.fa-times');
    closeBtn.addEventListener('click', () => { close() });
    document.addEventListener('keydown', (e)=> {if( e.code =='Escape'){ close() } })

    const close = () => {
        lightboxSection.classList.add('hidden');
        myLightboxes.forEach(lightbox => {
            lightbox.classList.add('hidden')
        })
    }

}

    }

// ---------------------------------------------------------------------------------
// Function create Lightbox
const createLightbox = () => {
    myMedias.forEach(media => {
        let mediaModel = new Media(media)
        let mediaName = mediaModel.getName(myPhotographer.name);
        lightboxMedia.innerHTML += mediaModel.displayLightbox(mediaName)
    });
    lightboxInit();
}




// ---------------------------------------------------------------------------------
// Init 
const init = async () => {
    displayPhotographerData();
    lightboxInit()
}
init();
  