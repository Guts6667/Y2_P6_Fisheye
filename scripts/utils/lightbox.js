
// Fonction lightboxInit => Permet de démarrer la lightbox
const lightboxInit = () => {
    // Ici je récupère la section contenant les articles
    let mediasToGet = document.querySelector('#photoSection')
    // Je récupère toutes les box dans ma lightbox
    const mediasToClick = mediasToGet.querySelectorAll('.box')
    // Je récupère toutes mes lightbox
    let myLightboxes = document.querySelectorAll('.lightboxImg');
    myLightboxes = [...myLightboxes];
    
    mediasToClick.forEach( media => {
        // Pour chaque media
        media.addEventListener('click', (e) => {
            console.log(e);
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
                }
            })
        })
        media.addEventListener('keydown', (e) => {
            console.log(e);
            if(e.code == 'Enter'){
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
                    }
                })
            }
            
        })
    })

// ---------------------------------------------------------------------------------
let nextBox ;
let currentBoxIndex;
// Fonction appelée par L'EventListener pour aller à droite
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
  // Si l'index de ma box suivante est inférieure à la longeur de mon tableau
  if(nextBox < myLightboxes.length){
      // Alors je démasque la prochaine box
      myLightboxes[nextBox].classList.remove('hidden');
  }
  else{
      // Sinon je reviens à la première box => Permet de créer un carousel
      myLightboxes[0].classList.remove('hidden');
  }
}

// ---------------------------------------------------------------------------------
const boxRight = document.querySelector('.fa-chevron-right')
const navRight = () => {
// Event au click et sur flèche droite
boxRight.addEventListener('click', () => { goRight() })
document.addEventListener('keydown',(e) => { if(e.code == 'ArrowRight'){ goRight() }})
}

// ---------------------------------------------------------------------------------
// Fonction appelée par L'EventListener pour aller à gauhe
const goLeft = () => {
    // Vérifie chaque lightbox pour trouver laquelle n'a pas 'hidden'
    myLightboxes.forEach( myBox => {
        // Si une de mes box n'a pas la classe 'hidden'
       if(myBox.classList.contains('hidden') == false){
           // Récupération de l'index de la box affichée
           currentBoxIndex = myLightboxes.indexOf(myBox);
           // Masquage de la box actuelle
           myBox.classList.add('hidden');
           nextBox = currentBoxIndex -1;
           // Retourne l'index de ma box suivante
           return nextBox;
       }
   })  
   // Si l'index de la box suivante est inférieure à la longueur du tableur
   // Et si son index et supérieur à -1
   if(nextBox < myLightboxes.length && nextBox > -1){
       // alors je démasque la box suivante
       myLightboxes[nextBox].classList.remove('hidden');
   }
   else{
       // Sinon, je démasque la box avec le dernier index du tableau
       let lastElement = myLightboxes.length-1;
       myLightboxes[lastElement].classList.remove('hidden');
   }
}

// ---------------------------------------------------------------------------------
const boxLeft = document.querySelector('.fa-chevron-left')
const navLeft = () => {
     // Event au click et sur flèche droite
    boxLeft.addEventListener('click', () => { goLeft() });
    document.addEventListener('keydown', (e) => {if(e.code == 'ArrowLeft'){ goLeft() }});
}

// ---------------------------------------------------------------------------------
// Function closeLightBox
const close = () => {
    lightboxSection.classList.add('hidden');
    myLightboxes.forEach(lightbox => {
            lightbox.classList.add('hidden')
    })
}

const closeLightBox = () => {
    let closeBtn = document.querySelector('.fa-times');
    closeBtn.addEventListener('click', () => { close() });
    document.addEventListener('keydown', (e)=> {if( e.code =='Escape'){ close() } })
}

navRight();
navLeft();
    }

// ---------------------------------------------------------------------------------

