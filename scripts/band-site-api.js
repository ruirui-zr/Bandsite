class BandSiteApi{
    constructor(apiKey){
        this.apiKey = apiKey;
        this.baseUrl = "https://unit-2-project-api-25c1595833b2.herokuapp.com";
    }

    async postComment(comment){
        try{
            const url = `${this.baseUrl}/comments?api_key=${this.apiKey}`;
            const response = await axios.post(url, comment);
            console.log(response);

        }catch(error){
            console.error(error)
        }
    }

    async getComments(){
        try{
            const url = `${this.baseUrl}/comments?api_key=${this.apiKey}`;
            const response = await axios.get(url);

             console.log(response.data)
             return response.data;
            
        }catch(error){
            console.error(error)
        }
    }

    async getShows(){
        try{
            const url = `${this.baseUrl}/showdates?api_key=${this.apiKey}`;
            const response = await axios.get(url);
            return response.data;

        }catch(error){
            console.error(error)
        }
    }

    async likeComment(id){
        try{
            const url = `${this.baseUrl}/comments/${id}/like?api_key=${this.apiKey}`;
            const response = await axios.put(url);
            return response.data;
        } catch(error){
            console.error(error)
        }
    }

    async deleteComment(id){
        try{
            const url = `${this.baseUrl}/comments/${id}?api_key=${this.apiKey}`;
            const response = await axios.delete(url);
            return response.data;
        } catch(error){
            console.error(error)
        }
    }
}

// an instance of the BandSiteApi
const comment = {
    name: "Nigel",
    comment : "What a great band."
}

// const bandsite = new BandSiteApi(api_key)
// bandsite.getShows()
// bandsite.getComments()

// bandsite.postComment(comment)