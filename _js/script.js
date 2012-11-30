var func = {

    //----------------------------------------------------------------------------------------------------------
    init : function() {
	    func.form();
    },

    //----------------------------------------------------------------------------------------------------------
    form : function() {
	    var count = 0
	    $("#content form").on("submit", function() {
		    count++;
		    switch(count) {
		    case 1:
		    	instagram.get("rain");
		    	//alert("show instagram");
		    	return false;
		    	break;
		    case 2:
		    	alert("show tumblr");
		    	break;
		    case 3:
		    	alert("show tweets");
		    	break;
		    case 4:
		    	alert("show answer");
		    	break;
		    default:
		    	alert("nothing");
		    	break;
		    }
		    return false;
	    });
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
	    var main_url = "https://api.instagram.com/v1/tags/"
	    var recent_tag = "/media/recent"

	    console.log(main_url + tag + recent_tag + '?' + api_key);
	    $.getJSON(main_url + tag + recent_tag + '?' + api_key + '&callback=?', function(json) {	
		    //console.log(json);
		    var count = 0;
		    $(json.data).each(function(index) {
			    //console.log(this);
			    if (count < 5) {
				    var html_str = '<a href="' + this.link + '">' + '<img src="' + this.images.standard_resolution.url + '"' 
				    	//+ ' title="' + this.caption.text + '"' 
				    	+ ' class="label label-info" width="100" height="100"/>' + '</a>';
				    //console.log(html_str);
				    $('<li></li>').html(html_str).appendTo('#instagram');
			    }
			    count++;
			});
			$("#instagram").show();
		});

/*
		$.ajax({
			url: main_url + tag + recent_tag + '?' + api_key + '&callback=?',
			success: function(json) {
		    	var count = 0;
		    	$(json.data).each(function(index) {
			    	//console.log(this);
			    	if (count < 5) {
				    	var html_str = '<a href="' + this.link + '">' + '<img src="' + this.images.standard_resolution.url + '"' + ' title="' + this.caption.text + '"' + ' class="label label-info" width="100" height="100"/>' + '</a>';
				    	//console.log(html_str);
				    	$('<li></li>').html(html_str).appendTo('#instagram');
				    }
				    count++;
				});
				alert('Load was performed.');
			}
		});
*/


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

});
