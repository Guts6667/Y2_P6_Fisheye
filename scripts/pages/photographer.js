// 1 Récupérer les données du photographe

// 2 Les stocker dans un objet photographe
let photo;
let myPhotographer;
const contactButton = document.querySelector('.contact_button')
const photographerHeader = document.querySelector('header')
const displayPhotographerData = async()=> {

    const { photographers, media } = await getData();
    console.log(photographers, media);

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
    photo = new Photographer(myPhotographer);
    
        photographerHeader.innerHTML += photo.createPhotographerHeader();
    

    
    
} 








// Init 
const init = async () => {

    displayPhotographerData();

    }
    
    init();
