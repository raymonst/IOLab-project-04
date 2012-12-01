var func = {

    //----------------------------------------------------------------------------------------------------------
    init : function() {
	    func.form();
    },

    //----------------------------------------------------------------------------------------------------------
    form : function() {


	    trending_topics = twitter.get();
	    var trend_count = 0;

	    var count = 0;
	    $("#content form").on("submit", function() {

		    if ($("#guess-tag").val() != trending_topics[trend_count]) {
			    count++;
		    };

		    switch(count) {
		    case 1:
		    	instagram.get(trending_topics[trend_count]);
		    	break;
		    case 2:
		    	tumblr.get(trending_topics[trend_count]);
		    	break;
		    case 3:
		    	alert("show tweets");
		    	break;
		    case 4:
		    	alert("show answer");
		    	console.log(trend_count);
		    	console.log(trending_topics[trend_count]);
		    	trend_count++;
		    	break;
		    default:
		    	alert("correct!");
		    	break;
		    }
		    return false;
	    });
    }

}



//--------------------------------------------------------------------------------------------------------------

var twitter = {

    //----------------------------------------------------------------------------------------------------------
    get : function() {

	    var main_url = "https://api.twitter.com/1/trends/1.json?callback=?";
/* 	    var main_url = "https://api.twitter.com/1.1/trends/place.json?id=1&callback=?"; */
	    var trending_topics = new Array();

	    // sample trending topics array 
	    var trending_topics_sample = ["rain","snow","sun"];

/*
	    $.getJSON(main_url, function(json) {	
		    $(json).each(function(index) {
			    var trends = this.trends;
			    $.each(trends, function() {
				    trending_topics.push(this.name);
			    });
			});
	    });
*/


		return trending_topics_sample;
		
    }

}



//--------------------------------------------------------------------------------------------------------------

var instagram = {

    //----------------------------------------------------------------------------------------------------------
    get : function(tag) {

	    // get instagram pics with 'tag' tagged and append to "#instagramImages"
	    var api_key = "access_token=215516.f2e0088.4d29740528bf40b08b1e976bc41ac66d";
	    var main_url = "https://api.instagram.com/v1/tags/";
	    var recent_tag = "/media/recent";

	    // console.log(main_url + tag + recent_tag + '?' + api_key);
	    $.getJSON(main_url + tag + recent_tag + '?' + api_key + '&callback=?', function(json) {	
		    //console.log(json);
		    var count = 0;
		    $(json.data).each(function(index) {
			    //console.log(this);
			    if (count < 5) {
				    var html_str = '<a href="' + this.link + '">' + '<img src="' + this.images.standard_resolution.url + '"' 
				    	//+ ' title="' + this.caption.text + '"' 
				    	+ ' class="label label-info" width="100" />' + '</a>';
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
    get : function(tag) {
		
	    // default variables
		var api_key ="api_key=UwFy7hJFKL01D3e5ny0XhUcGYHoWyeJzaq7E6i8WpQtgSRuLE9"
		var url = "http://api.tumblr.com/v2/tagged?limit=5&tag="
			
		// width of extracted image
		var image_width = 100
	
		// cleaning #tumblr
		$('#tumblr').html('');
		$.getJSON(url+ tag+ '&' + api_key+'&callback=?', function(json) {
			$(json).each(function(index) {
				var response = this.response
				// only extract photo-contained post
				for (var i in response) {
					for (var j in response[i].photos) {
						$('<li></li>').html('<img src='+response[i].photos[j].original_size.url+' class="label label-info" width = '+image_width+'/>')
						.appendTo('#tumblr');								
					}
				}
			});
		});   
		return false;
	}

}



//--------------------------------------------------------------------------------------------------------------
$(document).ready(function() {

    func.init();

});
