var history_input = [];
var hint_counter = 1;
var answer = "";
var life = 5;
var duplicate_flag = false;
var trending_topics = new Array();

//--------------------------------------------------------------------------------------------------------------
var func = {

    //----------------------------------------------------------------------------------------------------------
    init : function() {
	    hottrend.get();
    },
 
	//----------------------------------------------------------------------------------------------------------
	validate : function(input, answer) {
		//prevent duplicate input
		for (var i=0;i<history_input.length ; i++){
			if (input ==history_input[i] && life <5){ 
				duplicate_flag = true;
			}
			else duplicate_flag = false;
		}	
		if (duplicate_flag)	{
			console.log(duplicate_flag);
			$('#msg').html("You repeated your answer. Please try something different.");
		} else {
			if (input == answer) {
				//load ending screen function
				msg_header = "Congratulations!";
				msg_body = "You got the correct answer!";
				$("#help").show();
				$("#button").hide();
				$("#answer").click();
				func.overlay(msg_header, msg_body);
			} else {
				// still life left
				if (life > 1) {
					$('#guess-tag').html('');
					// try again message
					$('#msg').html("Oops, wrong answer. Please try again.");

					// decrease life, then show the remained life
					life --;
					$('#life').attr("class", ("life-"+life));

					// show "more hint" btn & "show answer" btn
					$('#help').fadeIn(200).css({"display":"block"});

					// show the history of the input
					$('#history_input').append("<span>"+input+"</span>&nbsp;&nbsp;&nbsp;");
					history_input.push(input);
					console.log("after life : " +life);
					// (optional) how close the input was
				}
				else if(life == 1){
  				    $("#answer").click();
					var msg_header = "Game Over. Wanna try again?";
					var msg_body = "<p>The correct answer is: <span>&ldquo;" + answer + "&rdquo;</span></p>";
					func.overlay(msg_header, msg_body);
				}
			}
		}// duplicate check
	},

    //----------------------------------------------------------------------------------------------------------
    form : function(count, answer) {

//	    trending_topics = twitter.get();
//	    var trend_count = 0;
//
//	    var count = 0;
//	    $("#content form").on("submit", function() {
//
//		    if ($("#guess-tag").val() != trending_topics[trend_count]) {
//			    count++;
//		    };

      console.log("in form: ", answer, count)
		switch(count) {
			case 1:
				instagram.get(answer);
				break;
			case 2:
				tumblr.get(answer);
				$("#instagram").animate({top:"40%"});
				break;
			case 3:
			   twitter.search(answer);
				$("#tumblr").animate({top:"20%"});
				$("#instagram").animate({top:"60%"});
				break;
			case 4:
				alert("show answer");
				//console.log(trend_count);
				//console.log(trending_topics[trend_count]);
				trend_count++;
				break;
			default:
				alert("correct!");
				break;
		}
		return false;

    },

	//----------------------------------------------------------------------------------------------------------
	buttons : function() {

		// click submit button
		$("#header form").on("submit", function() {
			var input = $("#guess-tag").val();
			//console.log(input);
			func.validate(input, answer);
			//func.buttons();
			return false;
		});
		
		//--------------------------------------------------------------------------------------------------------------
		// click "show more hints"
		$("#hints").on("click", function() {
			//console.log(hint_counter);
			hint_counter ++;
			func.form(hint_counter, answer);
			return false;
		});
		
		//--------------------------------------------------------------------------------------------------------------
		$("#header .overlay-open").unbind("click").on("click", function() {
			$("#overlay").fadeIn();
			if ($(this).attr("id") == "answer") {
				var msg_header = "Sorry :(";
				var msg_body = "<p>The correct answer is: <span>&ldquo;" + answer + "&rdquo;</span></p>";
			}
			func.overlay(msg_header, msg_body);
		});

		$("#overlay-close").unbind("click").on("click", function() {
			$("#overlay").fadeOut();
		});

	},

	//----------------------------------------------------------------------------------------------------------
	content_resize : function() {

		$("#container").height($(window).height());
		
		var item_width = $("#instagram li").width();
		var item_height = $("#instagram li").height();

		$("#instagram li img").each(function() {
			var self = $(this);
			var ratio = self.width() / self.height();
			if (item_height > item_width) {
				self.height(item_height);
				self.width(self.height() * ratio);
			} else {
				self.width(item_width);
				self.height(self.width() * 1/ratio);
			}
/*
			var margin_top = ($("#instagram li").height() - self.width()) / 2 + "px"; 
			self.css({"margin-top" : margin_top});
*/
		});

		$("#tumblr li img").each(function() {
			var self = $(this);
			var ratio = self.width() / self.height();
			
			if (item_width < item_height) {
				if (self.width() < self.height()) {
					self.width(item_height);
					self.height(self.width() * 1/ratio);
				} else {
					self.height(item_height);
					self.width(self.height() * ratio);
				}
			} else {
				if (self.width() < self.height()) {
					self.width(item_width);
					self.height(self.width() * 1/ratio);
				} else {
					self.height(item_height);
					self.width(self.height() * ratio);
				}
			}

/*
			if (self.height() > self.width()) {
				var margin_left = (item_width - self.width()) / 2 + "px";
			    self.height(item_height);
			    self.width(item_height * ratio);
			    self.css({"margin-left" : margin_left, "margin-top" : 0});
			} else if (self.height() < self.width() || self.height() == self.width()) {
				var margin_top = (item_height - self.height()) / 2 + "px";
			    self.width(item_width);
			    self.height(item_width * 1/ratio);
			    self.css({"margin-top" : margin_top});
			}
*/
		});
	
	},

	//----------------------------------------------------------------------------------------------------------
	image_hover : function() {
		$("#content li").on("mouseenter", function() {
			var self = $(this);
			$("#content li").not(self).css({"opacity":.5});
		}).on("mouseleave", function() {
			var self = $(this);
			$("#content li").css({"opacity":1});
		});
	},

/*
	//----------------------------------------------------------------------------------------------------------
	ending_screen : function(msg) {
		$('#msg').html(msg);
		$('#msg').append("<a href='javascript:document.location.reload();'>Play again!</a>");
		$("#life").attr("class","life-0");
		$('#history_input').html('');
		$('#button').html('');

		// initiate default variables
		hint_counter = 1;
		life =5;
		duplicate_flag=false;
		for (var i=0;i=history_input.length;i++){
			history_input.pop();
		}
	},
*/

	//----------------------------------------------------------------------------------------------------------
	overlay : function(msg_header, msg_body) {
	
		$("#overlay h2").html(msg_header);
		$("#overlay-message").html(msg_body);
		$("#life").attr("class","life-0");
		$('#history_input').html('');
		$('#button').html('');

		// YOUTUBE CODE HERE
		$("#overlay-video").html("video");

		// initiate default variables
		hint_counter = 1;
		life = 5;
		duplicate_flag = false;
		for (var i=0;i=history_input.length;i++){
			history_input.pop();
		}

	}

}



//--------------------------------------------------------------------------------------------------------------

var hottrend = {
    //----------------------------------------------------------------------------------------------------------
    get : function() {
       // using Google Feed API to load Google Hot Trend Feed as JSON with JSONP style
       var feed_url = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http%3A%2F%2Fwww.google.com%2Ftrends%2Fhottrends%2Fatom%2Fhourly";
	 
	    $.getJSON(feed_url + '&callback=?', function(json) {
	       var feed = $(json.responseData.feed.entries[0].content);
	       $("li span a", feed).each(function(){
	          // console.log(this.innerHTML);
	          trending_topics.push(this.innerHTML);
          });
          console.log(trending_topics);
	       var random_num = (Math.floor((Math.random()*100)+1)) % 20;
	       answer = trending_topics[random_num];
	       console.log(random_num, answer);

	       func.form(hint_counter,answer);
	       func.buttons();
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
		
    },

    //----------------------------------------------------------------------------------------------------------
    search : function(term) {
       var search_url = "http://search.twitter.com/search.json?q=";
       var tweets = new Array();
       console.log(search_url + term.replace(/\s+/g, '') + '&callback=?');
       $.getJSON(search_url + term.replace(/\s+/g, '') + '&callback=?', function(json) {
	       $.each(json.results, function(){
	         tweets.push(this.text);
	         $('<li></li>').html(this.text).appendTo('#twitter');
	         
	       });
	       console.log(tweets);
       });
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

	    console.log(main_url + tag.replace(/\s+/g, '') + recent_tag + '?' + api_key + '&callback=?');
	    $.getJSON(main_url + tag.replace(/\s+/g, '') + recent_tag + '?' + api_key + '&callback=?', function(json) {	
		    //console.log(json);
		    var count = 0;
		    $(json.data).each(function(index) {
			    //console.log(this);
			    if (count < 5) {
				    var html_str = '<a href="' + this.link + '">' + '<img src="' + this.images.standard_resolution.url + '"' 
				    	//+ ' title="' + this.caption.text + '"' 
				    	+ ' class="label label-info" />' + '</a>';
				    //console.log(html_str);
				    $('<li></li>').html(html_str).appendTo('#instagram');
			    }
			    count++;
			});
			func.content_resize();
			func.image_hover();
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
		console.log(url+ tag.replace(/\s+/g, '')+ '&' + api_key+'&callback=?');
		$.getJSON(url+ tag.replace(/\s+/g, '')+ '&' + api_key+'&callback=?', function(json) {
			$(json).each(function(index) {
				var response = this.response
				// only extract photo-contained post
				for (var i in response) {
					for (var j in response[i].photos) {
						$('<li></li>').html('<img src='+response[i].photos[j].original_size.url+' class="label label-info"' + '/>')
						.appendTo('#tumblr');								
					}
				}
			});
		});   
		func.content_resize();
		func.image_hover();

	}

}



//--------------------------------------------------------------------------------------------------------------
$(document).ready(function() {
    func.init();
    func.content_resize();
	func.image_hover();
	//twitter.search("lunar eclipse");
});

$(window).resize(function() {
    func.content_resize();
});

