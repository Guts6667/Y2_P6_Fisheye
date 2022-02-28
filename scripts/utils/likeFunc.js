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