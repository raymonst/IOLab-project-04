var func = {

    //----------------------------------------------------------------------------------------------------------
    init : function() {
    }

}



//--------------------------------------------------------------------------------------------------------------

var twitter = {

    //----------------------------------------------------------------------------------------------------------
    init : function() {
    }

}



//--------------------------------------------------------------------------------------------------------------

var instagram = {

    //----------------------------------------------------------------------------------------------------------
    get : function(tag) {
       // get instagram pics with 'tag' tagged and append to "#instagramImages"
       var api_key = "access_token=215516.f2e0088.4d29740528bf40b08b1e976bc41ac66d"
       var url = "https://api.instagram.com/v1/tags/"
       var recent_tag = "/media/recent"
       
       console.log(url + tag + recent_tag + '?' + api_key);
       $.getJSON(url + tag + recent_tag + '?' + api_key +'&callback=?',
         function(json) {
            console.log(json);
            $(json.data).each(function(index) {
               //console.log(this);
               var html_str = '<a href="' + this.link + '">' +
                                 '<img src="' + this.images.standard_resolution.url + '"' +
                                 //' title="' + this.caption.text + '"' + 
                                 ' class="label label-info" width = 250px/>' +
                              '</a>';
               //console.log(html_str);
               $('<li style="float:left;list-style-type: none"></li>').html(html_str).appendTo('#instagramImages');
            });
         });
    }
}



//--------------------------------------------------------------------------------------------------------------

var tumblr = {

    //----------------------------------------------------------------------------------------------------------
    init : function() {
    }

}



//--------------------------------------------------------------------------------------------------------------
$(document).ready(function() {

    func.init();
    instagram.get("snow");

});
