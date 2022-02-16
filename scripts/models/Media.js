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
                <img src="../../assets/Sample_Photos/${name}/${this.image}" alt="${this.title}" style = "width : 250px; height : 250px;">
            </div>
            <div class = "like-box">
                <div>
                    <h4>${this.title}</h4>
                </div>
                <div class = "like-box">
                    <div>
                        <h5>${this.likes}</h5>
                    </div>
                    <div>
                        <i class="far fa-heart"></i>
                        <i class="far fa-heart" style = "display : none;"></i>
                    </div>
                </div>
            </div>
        </article>`
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
                <video style = "width : 250px; height : 250px;" controls>
                    <source src= "../../assets/Sample_Photos/${name}/${this.video}" alt="${this.title} type = "video/mp4">
                </video>
            </div>
            <div>
                <div>
                    <h4>${this.title}</h4>
                </div>
                <div>
                    <h5>${this.likes}</h5>
                </div>
            </div>
        </article>`
    }
}