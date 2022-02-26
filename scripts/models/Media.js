// Factory Pattern
class Media {
    constructor(data){
        if(data.type == "image"){
            return new Photo(data);
        }
        else if(data.type == "video"){
            return new Video(data);
        }
    }
}


// Class Photo
class Photo {
    constructor(data){
        this.id = data.id
        this.photographerId = data.photographerId
        this.title = data.title
        this.image = data.image
        this.likes = data.likes
        this.date = data.date
        this.price = data.price
        
    }
    getName(nameToCut){

        const name = nameToCut.split(' ')[0];
        return name
    }

    displayPhotoCard(name){
        return`
        <article>
            <div>
                <img src="../../assets/Sample_Photos/${name}/${this.image}" alt="${this.title}"  class = "media">
            </div>
            <div class = "legend">
                <div>
                    <h4>${this.title}</h4>
                </div>
                <div class = "like-box">
                    <div>
                        <h5 class ="likes">${this.likes}</h5>
                    </div>
                    <div>
                        <i class="far fa-heart heart" ></i>
                        <i class="fas fa-heart fullHeart"></i>
                    </div>
                </div>
            </div>
        </article>`
    }

    displayLightbox(name){
        return `
         <div class="lightboxImg">
             <img src="../../assets/Sample_Photos/${name}/${this.image}" alt="${this.title}"  >
             <h4>${this.title}</h4>
         </div>
         `
     }
}

// Class Video
class Video {
    constructor(data){
        this.id = data.id
        this.photographerId = data.photographerId
        this.title = data.title
        this.video = data.video
        this.likes = data.likes
        this.date = data.date
        this.price = data.price
        
    }
    getName(nameToCut){

        const name = nameToCut.split(' ')[0];
        return name
    }
    // Modfier le code HTML pour traiter les vidéos
    displayPhotoCard(name){
        return`
        <article>
            <div>
                <video  controls class = "media">
                    <source src= "../../assets/Sample_Photos/${name}/${this.video}" alt="${this.title} type = "video/mp4" >
                </video>
            </div>
            <div class = "legend">
            <div>
                <h4>${this.title}</h4>
            </div>
            <div class = "like-box">
                <div>
                    <h5 class ="likes">${this.likes}</h5>
                </div>
                <div>
                    <i class="far fa-heart heart" ></i>
                    <i class="fas fa-heart fullHeart"></i>
                </div>
            </div>
        </div>
        </article>`
    }
    displayLightbox(name){
        return `
         <div class="lightboxImg">
            <video  controls>
                <source src= "../../assets/Sample_Photos/${name}/${this.video}" alt="${this.title} type = "video/mp4">
            </video>
            <h4>${this.title}</h4>
         </div>
         `
     }

}