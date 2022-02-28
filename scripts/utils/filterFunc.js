// Filter button
let arrowUp = document.getElementById("arrowUp");
let arrowDown = document.getElementById("arrowDown");
let dateOption = document.getElementById("dateOption");
let titleOption = document.getElementById("titleOption");
let popularityOption = document.getElementById("popularityOption")
let optionContainer = document.getElementById("optionContainer");
let options = [popularityOption, titleOption, dateOption];



// -------------------------------------------
// Event Menu filter
arrowDown.addEventListener("click", () =>{
    arrowUp.style = "display : inline";
    arrowDown.style = "display : none"; 
    options[0].style = "display : block";
    options[1].style = "display : block";
    options[2].style = "display : block";
})

arrowUp.addEventListener("click", () => {
    arrowUp.style = "display : none";
    arrowDown.style = "display : inline";  
    
    options[0].style = "display : block";
    options[1].style = "display : none;";
    options[2].style = "display : none";
})

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
  
  filter()