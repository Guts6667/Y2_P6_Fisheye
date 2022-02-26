// Filter button
let arrowUp = document.getElementById("arrowUp");
let arrowDown = document.getElementById("arrowDown");
let dateOption = document.getElementById("dateOption");
let titleOption = document.getElementById("titleOption");
let popularityOption = document.getElementById("popularityOption")
let optionContainer = document.getElementById("optionContainer");
let options = [popularityOption, titleOption, dateOption];
let lightboxSection = document.querySelector('.lightbox');
let lightboxMedia = document.querySelector('.lightbox-media');
// -------------------------------------------
// Event Menu filter
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




   

    const getMediaTargets = () => {

let targetMedias = document.querySelectorAll('article');
        targetMedias.forEach(targetMedia => {
            // Récupérer les sources de mes targets
          targetMedia = targetMedia.firstElementChild.firstElementChild;
          console.log(targetMedia);
           // Faire un for each et comparer les images de la lightbox pour démasquer la bonne.
    // Au click sur la flèche, faire un foreach sur la lightbox, utiliser les index pour se déplacer.
    // Permettre la navigation avec les flèches du clavier. 
            
        })
    }
    getMediaTargets();    

    // J'ouvre ma lightbox et je démasque les médias qui correspondent à mes articles: createLightbox()
// J'utilise un i++ ou i-- pour naviguer dans mon tableau de media et afficher le suivant ou précédent
// Je n'oublie pas de masquer remasquer tous les autres medias avant d'afficher le nouveau média : maskMediaBox()
} 

// ---------------------------------------------------------------
// Like Function
const likeFunc = () => {
let heart = document.querySelectorAll(".heart")
let fullHeart = document.querySelectorAll(".fullHeart")
let likes = document.querySelectorAll('.likes')
let likesArray =[];

// Hide fullHeart
fullHeart.forEach(element => {
    element.setAttribute('style', 'display : none')
});

// Push all likes in an array
likes.forEach(element => {
likesArray.push(element.innerHTML);
});

// Turn the likes into numbers
likesArray = likesArray.map(element => parseInt(element));
let sumLikes = likesArray.reduce((a, b) => a + b, 0);

// Function update Thumbnail
let updateThumb = ()=> {
    let thumbnail = document.querySelector('.thumbnail')
    thumbnail.innerHTML= 
    ` <div>
         <span>${sumLikes}</span>
         <i class="fas fa-heart"></i>
     </div>
     <div>
         <span>${myPhotographer.price}€ / jour</span>
     </div>
    `
}
updateThumb()
    // Update hearts ++
    heart.forEach(element => {
        
        element.addEventListener("click", () =>{
            element.setAttribute('style', 'display : none')
            fullHeart = element.nextElementSibling.setAttribute('style', 'display : inline;')
            let like = element.closest('div').previousElementSibling.firstElementChild
            like.innerHTML ++
            sumLikes ++
            updateThumb()
        })
    })
    // Update hearts --
    fullHeart.forEach(element => {
        element.addEventListener("click", () =>{
            element.setAttribute('style', 'display : none')
            heart = element.previousElementSibling.setAttribute("style", 'display : inline;')
            let like = element.closest('div').previousElementSibling.firstElementChild
            like.innerHTML--
            sumLikes --
            updateThumb()
        })
    })
}

// ---------------------------------------------------------------------------------
// Filter fonction
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
    likeFunc();
})
  
// Filter by Likes
popularityOption.addEventListener("click", () => {
    let mediasByLikes = myMedias?.sort((a, b) => (a.likes > b.likes ? -1 : 1))
    updateMedia(mediasByLikes);
    optionContainer.insertAdjacentElement("afterbegin", popularityOption);
    updateOptions(popularityOption)
    likeFunc()
})

titleOption.addEventListener("click", () => {
    let mediasByTitle = myMedias?.sort((a, b) => (a.title < b.title ? -1 : 1));
    updateMedia(mediasByTitle);
    optionContainer.insertAdjacentElement("afterbegin", titleOption);
    updateOptions(titleOption);
    likeFunc()
})
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
        console.log(mediaBox);
        mediaBox.setAttribute('style', 'display : none');
    })
}


// ---------------------------------------------------------------------------------
// Init 
const init = async () => {

    displayPhotographerData();

    filter();
    closeLightBox()
    }
    
    init();
  