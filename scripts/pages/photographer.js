// 1 Récupérer les données du photographe

// 2 Les stocker dans un objet photographe
let myMedias;
let myPhotographer;
const contactButton = document.querySelector('.contact_button')
const photographerHeader = document.querySelector('#photographerHeader')
const photographerSection = document.querySelector('#photoSection');
const displayPhotographerData = async()=> {

    const { photographers, medias } = await getData();
    console.log(photographers, medias);

    const params = new URLSearchParams(document.location.search.substring(1));
    const identifier = params.get("id")
    console.log(identifier);
    
    // Cherche dans photographers si un photographer a le même id que identifier
    // On l'affecte à photographer
    myPhotographer = photographers.find(
        (photographer) => identifier == photographer.id
        
    )
    
    // Store data of selected photographer
    console.log(myPhotographer);
    myPhotographer = new Photographer(myPhotographer);
    
       photographerHeader.insertAdjacentHTML('afterbegin', myPhotographer.createPhotographerHeaderLeft());
       photographerHeader.insertAdjacentHTML('beforeend', myPhotographer.createPhotographerHeaderRight());
    
       
       // Filter datas in medias in order to keep only those matching the photographerId
        myMedias = medias.filter(media => media.photographerId == identifier);
        // Create new Media for each filtered media
        myMedias.forEach(media => {
            let mediaModel = new Media(media);
            console.log(mediaModel);
            let mediaName = mediaModel.getName(myPhotographer.name)
            console.log(mediaName);
            photographerSection.innerHTML += mediaModel.displayPhotoCard(mediaName);

        
        });
        
           
       
  

    
} 








// Init 
const init = async () => {

    displayPhotographerData();

    }
    
    init();
