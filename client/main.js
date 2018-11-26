import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

if (Meteor.isClient) {

    // YouTube API will call onYouTubeIframeAPIReady() when API ready.
    // Make sure it's a global variable.
    onYouTubeIframeAPIReady = function () {
  
        // New Video Player, the first argument is the id of the div.
        // Make sure it's a global variable.
        player1 = new YT.Player("player-1", {
    
            height: "315", 
            width: "560", 
            videoId: "NVb5GV6lntU",
            playerVars: {
                color: 'white',
                controls: '0',
                disablekb: '1',
                fs:'0',
                showinfo:'0',
                iv_load_policy:'3',
                modestbranding:'1',
                rel:'0',
                playsinline:'1'
                
            },
      
            // Events like ready, state change, 
            events: {
                onReady: function (event) {
                    // Play video when player ready.
                    event.target.playVideo();
                }
            }
        });

        player2 = new YT.Player("player-2", {
        
            height: "315", 
            width: "560", 
            videoId: "NVb5GV6lntU",
            playerVars: {
                color: 'white',
                controls: '0',
                disablekb: '1',
                fs:'0',
                showinfo:'0',
                iv_load_policy:'3',
                modestbranding:'1',
                rel:'0',
                playsinline:'1'
                
            },
        
            // Events like ready, state change, 
            events: {
                onReady: function (event) {
                    // Play video when player ready.
                    event.target.playVideo();
                }
            }
        });

        player3 = new YT.Player("player-3", {
        
            height: "315", 
            width: "560", 
            videoId: "NVb5GV6lntU",
            playerVars: {
                color: 'white',
                controls: '0',
                disablekb: '1',
                fs:'0',
                showinfo:'0',
                iv_load_policy:'3',
                modestbranding:'1',
                rel:'0',
                playsinline:'1'
                
            },
        
            // Events like ready, state change, 
            events: {
                onReady: function (event) {
                    // Play video when player ready.
                    event.target.playVideo();
                }
            }
        });

        player4 = new YT.Player("player-4", {
        
            height: "315", 
            width: "560", 
            videoId: "NVb5GV6lntU",
            playerVars: {
                color: 'white',
                controls: '0',
                disablekb: '1',
                fs:'0',
                showinfo:'0',
                iv_load_policy:'3',
                modestbranding:'1',
                rel:'0',
                playsinline:'1'
                
            },
        
            // Events like ready, state change, 
            events: {
                onReady: function (event) {
                    // Play video when player ready.
                    event.target.playVideo();
                }
            }
        });
    };

    YT.load();
}


Template.hello.onRendered(function helloOnCreated() {
  	// counter starts at 0
	// this.counter = new ReactiveVar(0);

  	// var player1;
  	// function onYouTubeIframeAPIReady() {
  	// 	console.log('yt api');
  	//   	player1 = new YT.Player('player-1', {
  	//     events: {
  	//       'onReady': onPlayerReady,
  	//       'onStateChange': onPlayerStateChange
  	//     }
  	//   });
  	// }

  	$.getScript( "webgazer.js" );
  	webgazer.begin();

  	var ww = $( window ).width();
	var wh = $( window ).height();
  	

    clearInterval(time_update_interval);
    
	var time_update_interval = setInterval(function () {
		// console.log("loop");
  		var prediction = webgazer.getCurrentPrediction();
  		// console.log(prediction);

  	    if ( prediction.x < ww/2 && prediction.y < wh/2 ) {
  	    	$("#target-2, #target-3, #target-4").removeClass("gazed");
  	    	$("#target-2 .gif, #target-3 .gif, #target-4 .gif").gifplayer('stop');
  	    	$("#target-1 .gif").gifplayer('play');
  	    	$("#target-1").addClass("gazed");

  	    }
  	    else if ( prediction.x > ww/2 && prediction.y < wh/2  ){
  	    	$("#target-1, #target-3, #target-4").removeClass("gazed");
  	    	$("#target-1 .gif, #target-3 .gif, #target-4 .gif").gifplayer('stop');
  	    	$("#target-2 .gif").gifplayer('play');
  	    	$("#target-2").addClass("gazed");
  	    }
  	    else if ( prediction.x > ww/2 && prediction.y > wh/2  ){
  	    	$("#target-1, #target-2, #target-4").removeClass("gazed");
  	    	$("#target-1 .gif, #target-2 .gif, #target-4 .gif").gifplayer('stop');
  	    	$("#target-3 .gif").gifplayer('play');
  	    	$("#target-3").addClass("gazed");
  	    }
  	    else if ( prediction.x < ww/2 && prediction.y > wh/2  ) {
  	    	$("#target-1, #target-2, #target-3").removeClass("gazed");
  	    	$("#target-2 .gif, #target-3 .gif, #target-1 .gif").gifplayer('stop');
  	    	$("#target-4 .gif").gifplayer('play');
  	    	$("#target-4").addClass("gazed");
  	    }
  	    else {
  	    	console.log('ouch!');
  	    }
  	}, 1000);

	// instance.counter.set(instance.counter.get() + 1);
});


Template.hello.helpers({
  // counter() {
  //   return Template.instance().counter.get();
  // },
});


Template.hello.events({
  'click #my-canvas': function(event, instance) {
 //    // instance.counter.set(instance.counter.get() + 1);
 	var prediction = webgazer.getCurrentPrediction();

    $('#my-canvas').append('<div class="square" style="left:' + prediction.x + 'px; top:' + prediction.y + 'px;"></div>');

     // $(".gif").freezeframe();
     // $(".gif").gifplayer('stop');
  },
  'click #target-1': function(e, i) {
  	player1.mute();
  	if (player1.getPlayerState() == 1) {
  		player1.pauseVideo();
  	}
  	else {
  		player1.playVideo();
  	}

  },
  'click #target-2': function(e, i) {
  	player2.mute();
  	if (player2.getPlayerState() == 1) {
  		player2.pauseVideo();
  	}
  	else {
  		player2.playVideo();
  	}
  },
  'click #target-3': function(e, i) {
  	player3.mute();
  	if (player3.getPlayerState() == 1) {
  		player3.pauseVideo();
  	}
  	else {
  		player3.playVideo();
  	}
  },
  'click #target-4': function(e, i) {
  	player4.mute();
  	if (player4.getPlayerState() == 1) {
  		player4.pauseVideo();
  	}
  	else {
  		player4.playVideo();
  	}
  },
  'click #webgazer-pause': function(e, i) {
  	webgazer.pause();
  },
  'click #webgazer-resume': function(e, i) {
  	webgazer.resume();
  },
  'click #webgazer-pause': function(e, i) {
  	webgazer.end();
  },
});
