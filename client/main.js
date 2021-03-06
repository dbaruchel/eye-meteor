import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

if (Meteor.isClient) {

	var ww = $( window ).width();
	var wh = $( window ).height();

    // YouTube API will call onYouTubeIframeAPIReady() when API ready.
    // Make sure it's a global variable.
    onYouTubeIframeAPIReady = function () {
  
        // New Video Player, the first argument is the id of the div.
        // Make sure it's a global variable.
        player1 = new YT.Player("player-1", {
    
            height: wh/2, 
            width: ww/2, 
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
        
            height: wh/2, 
            width: ww/2, 
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
        
            height: wh/2, 
            width: ww/2, 
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
        
            height: wh/2, 
            width: ww/2, 
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

startMutePlayer = function(player) {
	player.playVideo();
	player.mute();
}

togglePlayer = function (player) {
	if (player.getPlayerState() == 1) {
		player.pauseVideo();
	}
	else {
		player.playVideo();
	}
};

switchTo = function (number) {
	if (number == 1) {
		player2.pauseVideo();
		player3.pauseVideo();
		player4.pauseVideo();
		player1.playVideo();
	}
	else if (number == 2) {
		player1.pauseVideo();
		player3.pauseVideo();
		player4.pauseVideo();
		player2.playVideo();
	}
	else if (number == 3) {
		player1.pauseVideo();
		player2.pauseVideo();
		player4.pauseVideo();
		player3.playVideo();
	}
	else if (number == 4) {
		player1.pauseVideo();
		player2.pauseVideo();
		player3.pauseVideo();
		player4.playVideo();
	}
	else {
		console.log('switchTo bloup');
	}
}


Template.hello.onRendered(function helloOnCreated() {
  	// counter starts at 0
	this.counter = new ReactiveVar(0);

  	$.getScript( "webgazer.js" );
  	webgazer.begin();

    clearInterval(time_update_interval);
    
	var time_update_interval = setInterval(function () {
		// console.log("loop");
  		var prediction = webgazer.getCurrentPrediction();
  		// console.log(prediction);

  	    if ( prediction.x < ww/2 && prediction.y < wh/2 ) {
  	    	$("#target-2, #target-3, #target-4").removeClass("gazed");
  	    	// $("#target-2 .gif, #target-3 .gif, #target-4 .gif").gifplayer('stop');
  	    	// $("#target-1 .gif").gifplayer('play');
  	    	$("#target-1").addClass("gazed");
  	    	switchTo(1);

  	    }
  	    else if ( prediction.x > ww/2 && prediction.y < wh/2  ){
  	    	$("#target-1, #target-3, #target-4").removeClass("gazed");
  	    	// $("#target-1 .gif, #target-3 .gif, #target-4 .gif").gifplayer('stop');
  	    	// $("#target-2 .gif").gifplayer('play');
  	    	$("#target-2").addClass("gazed");
  	    	switchTo(2);
  	    }
  	    else if ( prediction.x > ww/2 && prediction.y > wh/2  ){
  	    	$("#target-1, #target-2, #target-4").removeClass("gazed");
  	    	// $("#target-1 .gif, #target-2 .gif, #target-4 .gif").gifplayer('stop');
  	    	// $("#target-3 .gif").gifplayer('play');
  	    	$("#target-3").addClass("gazed");
  	    	switchTo(3);
  	    }
  	    else if ( prediction.x < ww/2 && prediction.y > wh/2  ) {
  	    	$("#target-1, #target-2, #target-3").removeClass("gazed");
  	    	// $("#target-2 .gif, #target-3 .gif, #target-1 .gif").gifplayer('stop');
  	    	// $("#target-4 .gif").gifplayer('play');
  	    	$("#target-4").addClass("gazed");
  	    	switchTo(4);
  	    }
  	    else {
  	    	console.log('prediction ouch!');
  	    }
  	}, 1000);

});


Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});


Template.hello.events({
  'click #my-canvas': function(event, instance) {

    instance.counter.set(instance.counter.get() + 1);
    console.log(instance.counter.get());

    if (instance.counter.get() == 20) {
    	$('#start').css('display', 'block');
    }

 	var prediction = webgazer.getCurrentPrediction();

    $('#my-canvas').append('<div class="dot" style="left:' + prediction.x + 'px; top:' + prediction.y + 'px;"></div>');

     // $(".gif").freezeframe();
     // $(".gif").gifplayer('stop');
  },
  // 'click #target-1': function(e, i) {
  // 	player1.mute();
  // 	switchTo(1);
  // },
  // 'click #target-2': function(e, i) {
  // 	player2.mute();
  // 	switchTo(2);
  // },
  // 'click #target-3': function(e, i) {
  // 	player3.mute();
  // 	switchTo(3);
  // },
  // 'click #target-4': function(e, i) {
  // 	player4.mute();
  // 	switchTo(4);
  // },
  'click #webgazer-pause': function(e, i) {
  	webgazer.pause();
  },
  'click #webgazer-resume': function(e, i) {
  	webgazer.resume();
  },
  'click #webgazer-pause': function(e, i) {
  	webgazer.end();
  },
  'click #start': function(e, i) {
  	$('.screen').css('display', 'none');
  	$('#start').css('display', 'none');
  	$('.dot').css('display', 'none');
  },
});
