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
        <article class = "photographer_article" id = "photographerArticle" >
            <a href = "../../photographer.html?id=${this.id}">
                <div class = "photographer_thumbnail">
                    <img src="../../assets/Sample_Photos/PhotographersIDPhotos/${this.portrait}" alt= "Portrait de ${this.name}">
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

    createPhotographerHeaderLeft(){
        return `
        <div class ="header-box" >
            <div class ="photographer_name">
                <h2 tabindex="2">${this.name}</h2>
            </div> 
            <div>
                <h3 class ="header-box-location" tabindex="3">${this.city}, ${this.country}</h3>
            </div>
            <div class = "photographer_tagline">
                    <p tabindex="4">${this.tagline}</p>
            </div>
        </div>
        `
    }
    createPhotographerHeaderRight(){
        return `
        <div class = "photograph-thumbnail header-box">
            <img src="../../assets/Sample_Photos/PhotographersIDPhotos/${this.portrait}" alt= "Portrait de ${this.name}" tabindex="5">
        </div>
        `
    }

}