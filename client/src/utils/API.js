import axios from "axios";


const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
const queryURLBase =
"https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
authKey +
"&q=";

export default {
    queryTimes: function(query) {
        return axios.get(queryURLBase + query );
    },

    saveArticle: function(articleData) {
        // console.log(`From React API.js: ${articleData}`)
        return axios.post("/api/article", articleData);
    },

    queryArticles: function() {
        // return axios.get("/api/article", articleData);
        return axios.get("/api/article");
    }
};