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
}
init();
  