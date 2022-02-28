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
   
// ---------------------------------------------------------------
    //Create Lightbox Function
    createLightbox();

// ---------------------------------------------------------------
// Faire un for each et comparer les images de la lightbox pour démasquer la bonne.
// Au click sur la flèche, faire un foreach sur la lightbox, utiliser les index pour se déplacer.
// Permettre la navigation avec les flèches du clavier. 
// J'ouvre ma lightbox et je démasque les médias qui correspondent à mes articles: createLightbox()
// J'utilise un i++ ou i-- pour naviguer dans mon tableau de media et afficher le suivant ou précédent
// Je n'oublie pas de masquer remasquer tous les autres medias avant d'afficher le nouveau média : maskMediaBox()
    
// Ici, je récupère les images et vidéos sur ma pages et je les stock dans un array.
let mediasArray = [];
    const getMediaTargets = () => {
        let targetMedias = document.querySelectorAll('article');
        targetMedias.forEach(targetMedia => {
            // Récupérer les sources de mes targets
          targetMedia = targetMedia.firstElementChild.firstElementChild;
        mediasArray.push(targetMedia)
        })
        return mediasArray
    }  
    mediasArray = getMediaTargets();

// Puis ouvrir le bon media
let mediaBoxArray = []
let getMediaboxArray = () => {
    
    let mediasBox = document.querySelectorAll('.lightboxImg')
    mediasBox.forEach(mediaBox => {
        mediaBox = mediaBox;
        mediaBoxArray.push(mediaBox)
    })
    return mediaBoxArray;
}
getMediaboxArray()
let currentLightbox;
const openLightbox = () => {
    mediasArray.forEach(media => {
        media.addEventListener('click', () => {
            maskMediasbox();
            let mediaIndex = mediasArray.indexOf(media);
            lightboxSection.setAttribute('style', 'display : flex')
            let myMediaBox = mediaBoxArray[mediaIndex];
            myMediaBox.classList.add('visible')
            currentLightbox = document.querySelector('.visible');
        })
    })
}
openLightbox()


const lightboxNav = () => {
    
    let navRight = document.querySelector('.fa-chevron-right').parentElement;
    let navLeft = document.querySelector('.fa-chevron-left').parentElement;
    
    navLeft.addEventListener('click', (e) => {
        currentLightbox.classList.add('hidden');
        currentLightbox.classList.remove('visible');
        currentLightbox.previousElementSibling.classList.add('visible')
        
    })

    navRight.addEventListener('click', () => {
        currentLightbox.classList.add('hidden');
        currentLightbox.classList.remove('visible');
        currentLightbox.nextElementSibling.classList.add('visible')
    })
    getMediaboxArray();

}
lightboxNav()

} 

// ---------------------------------------------------------------------------------
// Update options in menu
const updateOptions = (option) => {
    let index = options.indexOf(option);
                options.splice(index, 1);
                options.unshift(option);
    optionContainer.children[0].classList.remove('border-button');
    optionContainer.children[2].classList.remove('border-button');
    optionContainer.children[1].classList.add('border-button');
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
}

// ---------------------------------------------------------------------------------
// Function closeLightBox
const closeLightBox = () => {
    let closeBtn = document.querySelector('.fa-times');
    closeBtn.addEventListener('click', () => {
        lightboxSection.setAttribute('style', 'display : none')
    })
    maskMediasbox()
}

// ---------------------------------------------------------------------------------
// Je créé ma lightbox qui contient tous mes medias déjà prêts
// Je leur attribut une classe qui les masquent
// Function create Lightbox
const createLightbox = () => {
    myMedias.forEach(media => {
        let mediaModel = new Media(media)
        let mediaName = mediaModel.getName(myPhotographer.name);
        lightboxMedia.innerHTML += mediaModel.displayLightbox(mediaName)
    });
}

// ---------------------------------------------------------------------------------
// Func hide media Box
// Je masque les medias contenus dans la lightbox
const maskMediasbox = () => {
    let mediasBox = document.querySelectorAll('.lightboxImg')
    mediasBox.forEach(mediaBox => {
        mediaBox.classList.remove('visible');
        mediaBox.classList.add('hidden');
        
    })
}


// ---------------------------------------------------------------------------------
// Init 
const init = async () => {
    displayPhotographerData();
    closeLightBox()
}
init();
  