
import axios from "axios";

var helper = {

 
  runQuery: function(articleSearch) {

    console.log("articleSearch", articleSearch);
    
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    queryURL += '?' + $.param({
      'api-key': "",
      'q': articleSearch.term,
      'begin_date': articleSearch.begin_date + "0101",
      'end_date': articleSearch.end_date + "1231"
    });
    console.log("queryURL ", queryURL)
    return axios.get(queryURL).then(function(response) {
      console.log("response ", response.data.response.docs)
      let fetchResult = [];
      if (response.data.response.docs[0]) {
        for (let article of response.data.response.docs) {
          let info = {};
          info["title"] = article.headline.main;
          info["pub_date"] = article.pub_date;
          info["url"] = article.web_url;
          info["snippet"] = article.snippet;
          info["art_id"] = article._id;
          fetchResult.push(info);
        }
      }
      return fetchResult;
    });
  },

  getSaved: function() {
    return axios.get("/api");
  },

  postSaved: function(obj) {
    console.log("post saved object, ", obj);
    return axios.post("/api", {
      title: obj.title,
      snippet: obj.snippet,
      url: obj.url,
      pub_date: obj.pub_date,
      art_id: obj.art_id
    });
  },

  
  deleteSaved: function(id) {
      console.log("id helper ", id);
      return axios.post("/api/delete", {
          _id: id
      });
  },
};

module.exports = helper;