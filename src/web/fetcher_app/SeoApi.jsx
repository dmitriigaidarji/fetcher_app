import $ from "jquery"

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});


export default class SeoApi {
  static postQuery(query, type){
      $.ajax({
        url : process.env.BASE_API_URL + 'query/',
        type : "POST",
        data : {query : query, type : type}
      });
  }
  static getUserQueries(callback){
      $.ajax({
        url : process.env.BASE_API_URL + 'userqueries/',
        type : "GET",
        success : callback
      });
  }
  static getQueries(callback){
      $.ajax({
        url : process.env.BASE_API_URL + 'queries/',
        type : "GET",
        success : callback
      });
  }
  static getQuery(id, callback){
    $.ajax({
        url : process.env.BASE_API_URL + 'getquery/',
        type : "GET",
        data : { id : id},
        success : callback
      });
  }
  static deleteQuery(id, callback){
    $.ajax({
        url : process.env.BASE_API_URL + 'deletequery/',
        type : "POST",
        data : { id : id},
        success : callback
      });
  }
  static getMoreWebsites(query,count,offset,callback){
    $.ajax({
        url : process.env.BASE_API_URL + 'querywebsites/',
        type : "GET",
        data : { query : query, count : count, offset : offset},
        success : callback
      });
  }
  static getTags(query,count, callback){
    $.ajax({
        url : process.env.BASE_API_URL + 'websitestags/',
        type : "GET",
        data : { query : query, count : count},
        success : callback
      });
  }
  static getWebsiteTags(website, callback){
    $.ajax({
        url : process.env.BASE_API_URL + 'websitetags/',
        type : "GET",
        data : { website : website},
        success : callback
      });
  }
}