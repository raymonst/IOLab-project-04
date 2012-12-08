var history_input = [];
var hint_counter = 1;
var answer = "";
var life = 5;
var duplicate_flag = false;
var trending_topics = new Array();
var videoText = "";

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
			//removing punctuations, spaces and changing to lower case

				var temp_input = ((input.replace(/[-.,()&$#!\[\]\/{}"']+/g, "")).replace(/\s+/g, "")).toLowerCase();

				var temp_answer = ((answer.replace(/[-.,()&$#!\[\]\/{}"']+/g, "")).replace(/\s+/g, "")).toLowerCase();


			if (temp_input == temp_answer) {
				//load ending screen function
				var msg_header = "Congratulations!";
				var msg_body = "<p>You won! You guessed <strong>"+answer+"</strong> correctly. You deserve a break.</p>";

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
				}
				else if(life == 1){
  				    $("#answer").click();
					var msg_header = "Life is Hard!";
					var msg_body = "<p>You lost. The correct answer is <strong>"+answer+".</strong> No worries!</p>";
					func.overlay(msg_header, msg_body);
				}
			}
		}// duplicate check
	},

    //----------------------------------------------------------------------------------------------------------
    form : function(count, answer) {

		switch(count) {
			case 1:
				instagram.get(answer);
				func.content_resize();
				func.image_hover();
				setTimeout(function() {
					$("#instagram").show();
				    $("#instagram img").each(function(i) {
				        var self = $(this);
				        setTimeout(function() {
				            self.fadeIn(100);
				        }, 100 * i);
				    })
				}, 1000);
				break;
			case 2:
				$("#tumblr").addClass("bg-gradient");
				$("#instagram").show().animate({top:"40%"});
				tumblr.get(answer);
				setTimeout(function() {
					setTimeout(function() {
						$("#tumblr img").each(function(i) {
						    var self = $(this);
						    setTimeout(function() {
						        self.fadeIn(100);
						    }, 100 * i);
						})
					}, 400);
/*
					func.content_resize();
					func.image_hover();
*/
				}, 750);
				break;
			case 3:
				$("#twitter").addClass("bg-gradient").show();
				$("#tumblr").show().animate({top:"20%"});
				$("#instagram").show().animate({top:"60%"});
			 	twitter.search(answer);
				setTimeout(function() {
					setTimeout(function() {
						$("#twitter li").each(function(i) {
						    var self = $(this);
						    setTimeout(function() {
						        self.fadeIn(100);
						    }, 100 * i);
						})
					}, 400);
/*
					func.content_resize();
					func.image_hover();
*/
				}, 750);
				break;
			case 4:
				trend_count++;
				break;
			default:
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
				var msg_header = "Gave up?";
				var msg_body = "<p>The correct answer is <strong>"+answer+".</strong> Refresh yourself before you try again.";
			}
			func.overlay(msg_header, msg_body);
		});

		$("#overlay .overlay-close").unbind("click").on("click", function() {
			$("#overlay").fadeOut();
			$("#header form").hide();
			$("#reload").show().css({"display":"inline-block"});
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

	//----------------------------------------------------------------------------------------------------------
	overlay : function(msg_header, msg_body) {

		$("#overlay h2").html(msg_header);
		$("#end-message").html(msg_body);
		$("#life").attr("class","life-0");
		$('#history_input').html('');
		$('#button').html('');
		
		// YOUTUBE CODE HERE
		$("#overlay-video").html(videoText);

	},

	//----------------------------------------------------------------------------------------------------------
	pick_answer : function() {
		var random_num = (Math.floor((Math.random()*100)+1)) % 20;
		answer = trending_topics[random_num];
		console.log(random_num, answer);
		var tag = answer;
		
		// instagram check
		var api_key = "access_token=215516.f2e0088.4d29740528bf40b08b1e976bc41ac66d";
		var main_url = "https://api.instagram.com/v1/tags/";
		var recent_tag = "/media/recent";
		$.getJSON(main_url + tag.replace(/\s+/g, '').replace(/'/g, '') + recent_tag + '?' + api_key + '&callback=?', function(json) {
        	if ($(json.data).length >= 2) {
            	console.log("instagram checked.")
            	// tumblr check
            	var api_key ="api_key=UwFy7hJFKL01D3e5ny0XhUcGYHoWyeJzaq7E6i8WpQtgSRuLE9"
            	var url = "http://api.tumblr.com/v2/tagged?limit=20&tag="
            	$.getJSON(url+ tag.replace(/\s+/g, '')+ '&' + api_key+'&callback=?', function(json) {
	            	if ($(json.response).length >= 2) {
		            console.log("tumblr checked.")
		            console.log("all pass.")
		            func.form(hint_counter,answer);
		            func.buttons();
           
		            //GETTING VIDEO FROM YOUTUBE ON THE TAG
		            $.ajax({ 
			            url: 'http://people.ischool.berkeley.edu/~suhani/IOLab/YoutubeVideo.php',
			            data:{tag:answer},
			            type: 'GET',  //Need to keep it POST data so that we can send out a longer string
			            success: function(WholeURL) { //From php, the whole file should be returned as CSV string
			               videoText = "<iframe src="+WholeURL+" width='520' height='300'></iframe>";
			               //console.log(WholeURL);
			            }
		            });
               }
               else {
                  //console.log("tumblr not pass.")
                  func.pick_answer();
               }
            }).error(function() {
               //console.log("tumblr not pass.")
               func.pick_answer();
            })
         } else {
            //console.log("instagram not pass.")
            func.pick_answer();
         }
      }).error(function () {
         //console.log("instagram not pass.")
         func.pick_answer();
      });
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
			//console.log(trending_topics);
			func.pick_answer();
		});		

    }

}



//--------------------------------------------------------------------------------------------------------------

var twitter = {

    //----------------------------------------------------------------------------------------------------------
    search : function(term) {
       var search_url = "http://search.twitter.com/search.json?q=";
       var tweets = new Array();
       console.log(search_url + term.replace(/\s+/g, '') + '&callback=?');
       $.getJSON(search_url + term.replace(/\s+/g, '') + '&callback=?', function(json) {
	       $.each(json.results, function(){
	         var term_nospace = term.replace(/\s+/g, '');
	         var re = new RegExp(term, "gi");
	         var re_nospace = new RegExp(term_nospace, "gi");
	         var new_text = "<p>" + this.text.replace(re_nospace, "<span>" + term_nospace + "</span>").replace(re, "<span>" + term + "</span>") + "</p>"
	         tweets.push(new_text);
	         $('<li></li>').html(new_text).appendTo('#twitter');
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

	    //console.log(main_url + tag.replace(/\s+/g, '') + recent_tag + '?' + api_key + '&callback=?');
	    $.getJSON(main_url + tag.replace(/\s+/g, '') + recent_tag + '?' + api_key + '&callback=?', function(json) {	
		    //console.log(json);
		    var count = 0;
		    $(json.data).each(function(index) {
			    //console.log(this);
			    if (count < 5) {
/*
				    var html_str = '<a href="' + this.link + '">' + '<img src="' + this.images.standard_resolution.url + '"' 
				    	+ ' class="label label-info" />' + '</a>';
*/
				    var html_str = '<img src="' + this.images.standard_resolution.url + '"' + '" />';
				    $('<li></li>').html(html_str).appendTo('#instagram');
			    }
			    count++;
			});
			func.content_resize();
			func.image_hover();
		});

	}

}



//--------------------------------------------------------------------------------------------------------------

var tumblr = {

    //----------------------------------------------------------------------------------------------------------
    get : function(tag) {

	    // default variables
		var api_key ="api_key=UwFy7hJFKL01D3e5ny0XhUcGYHoWyeJzaq7E6i8WpQtgSRuLE9"
		var url = "http://api.tumblr.com/v2/tagged?limit=20&tag="

		// width of extracted image
		var image_width = 100

		// cleaning #tumblr
		$('#tumblr').html('');
		//console.log(url+ tag.replace(/\s+/g, '')+ '&' + api_key+'&callback=?');
		$.getJSON(url+ tag.replace(/\s+/g, '')+ '&' + api_key+'&callback=?', function(json) {
		   var photo_count = 0;
			$(json).each(function(index) {
				var response = this.response
				// only extract photo-contained post
				for (var i in response) {
					for (var j in response[i].photos) {
						$('<li></li>').html('<img src='+response[i].photos[j].original_size.url+' class="label label-info"' + '/>')
						.appendTo('#tumblr');
						photo_count++;
						if (photo_count >= 5)
						   break;
					}
					if (photo_count >= 5)
						break;
				}
			});
			func.content_resize();
			func.image_hover();
		});   
	}

}



//--------------------------------------------------------------------------------------------------------------
$(document).ready(function() {
    func.init();
    func.content_resize();
	func.image_hover();
});

$(window).resize(function() {
    func.content_resize();
});
