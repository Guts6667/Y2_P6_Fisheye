const displayPhotographers = (photographers) => {

    console.log(photographers);
    // Create photographerSection
    const photographersSection = document.querySelector(".photographer_section");
    // For each photographer in photographers => Create a new Photographer
    photographers.forEach((photographer) => {

       
        let photographerModel = new Photographer(photographer);
        // Add PhotographerCard to photographersSection
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


