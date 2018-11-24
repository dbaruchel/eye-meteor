import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

if (Meteor.isClient) {

    // YouTube API will call onYouTubeIframeAPIReady() when API ready.
    // Make sure it's a global variable.
    localStorage.clear(); 
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
                playsinline:'1',
                rel:'0'
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

    // 4. The API will call this function when the video player is ready.
    // function onPlayerReady(event) {
    //   event.target.playVideo();
    // }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    // var done = false;
    // function onPlayerStateChange(event) {
    //   if (event.data == YT.PlayerState.PLAYING && !done) {
    //     setTimeout(stopVideo, 6000);
    //     done = true;
    //   }
    // }
    function stopVideo() {
      player1.stopVideo();
    }
    // player1.playVideo();
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
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click'(event, instance) {
  	player1.playVideo();
  	player1.mute();
 //    // instance.counter.set(instance.counter.get() + 1);
 	var prediction = webgazer.getCurrentPrediction();

    $('#my-canvas').append('<div class="square" style="left:' + prediction.x + 'px; top:' + prediction.y + 'px;"></div>');

     // $(".gif").freezeframe();
     $(".gif").gifplayer('stop');
  },
  'click #webgazer-pause'(event) {
  	webgazer.pause()
  },
  'click #webgazer-resume'(event) {
  	webgazer.resume()
  },
  'click #webgazer-pause'(event) {
  	webgazer.end()
  },
});
