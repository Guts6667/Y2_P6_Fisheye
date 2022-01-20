class Photographer {
    
    constructor(data){

        this.name = data.name
        this.id = data.id
        this.city = data.city
        this.country = data.country
        this.tagline = data.tagline
        this.price = data.price 
        this.portrait = data.portrait
    }


    // Regarder la page figma et ajouter les classes nécessaires.
    

    createPhotographerCard(){

        return `
        <article class = "photographer_article" id = "photographerArticle">
            <a href = "../../photographer.html?id=${this.id}">
                <div class = "photographer_thumbnail">
                    <img src="../../assets/Sample_Photos/PhotographersIDPhotos/${this.portrait}" >
                </div>
                <div>
                    <h2>${this.name}</h2>
                </div>
                <div>
                    <h3>${this.city}, ${this.country}</h3>
                </div>
                <div class = "photographer_tagline">
                    <p>${this.tagline}</p>
                </div>
                <div class = "photographer_price">
                    <p>${this.price}/jour</p>
                </div>
             </a>
        </article>
        
        
        `
    }

    createPhotographerHeader(){
        return `
        <div>
            <div>
                <h2>${this.name}</h2>
            </div> 
            <div>
                <h3>${this.city}, ${this.country}</h3>
            </div>
            <div class = "photographer_tagline">
                    <p>${this.tagline}</p>
            </div>
        </div>
        ${contactButton}
        <div class = "photographer_thumbnail">
            <img src="../../assets/Sample_Photos/PhotographersIDPhotos/${this.portrait}" >
        </div>
        `
    }
}