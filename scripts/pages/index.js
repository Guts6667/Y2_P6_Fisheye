const displayPhotographers = (photographers) => {

    console.log(photographers);

    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {

       
        let photographerModel = new Photographer(photographer);

        photographersSection.innerHTML += photographerModel.createPhotographerCard();



      });

}






// Init 
 const init = async () => {
// Stocker les données dans un objet photographers
  const { photographers } = await getData();
// Vérifier que les données soient arrivées
  console.log(photographers);
  // Afficher les photographers
    displayPhotographers(photographers);
}

init();


