window.GAME = (function() {

    var _P = { /* Private variables */

    },

    _M, // ref to model
    _V, // ref to view
    _C; // ref to controller

    return {

    	/* MODEL */
        model: {

        },

        /* VIEW */
        view: {
        	init: function () {
        		for (var character in _V.els.characters) {
        			_V.els.characters[character].sprite = new createjs.BitmapAnimation(new createjs.SpriteSheet(_V.els.characters[character].data));
        		};
        		for (var decorElement in _V.els.decor) {
        			_V.els.decor[decorElement].sprite = new createjs.BitmapAnimation(new createjs.SpriteSheet(_V.els.decor[decorElement].data));
        		};
        		_V.els.decor.theTerrain.sprite.x = 0;
        		_V.els.decor.theTerrain.sprite.y = 70;
        		_V.els.decor.theTerrain.sprite.gotoAndPlay(1);
        		_V.els.stage.addChild(_V.els.decor.theTerrain.sprite);
        		console.log(_V.els.stage);
        	},
        	els: {
        		window:                     $(window),
                document:                   $(document),
                stage: 						new createjs.Stage(document.getElementById('gameCanvas')),
                characters: 				{
                								luchador: 	{
                												data: {
															 		images: ["img/spritesheets/luchador-spritesheet.png"],
															 		frames: {width:21,height:23,regX:10,regY:11}
                                                                    
															 	}
                								},
                								bunny: 	{
                												data: {
															 		images: ["img/spritesheets/luchadorTEST.png"],
															 		frames: {width:21,height:23,regX:10,regY:11}
															 	}
                								} 
                							},
                decor: 						{
                								theSun: 	{
                												data: {
															 		images: ["img/spritesheets/sun.png"],
															 		frames: {width:89,height:105,regX:0,regY:0}
															 	}
                								},
                								theTerrain: {
                												data: {
                													images: ["img/spritesheets/terrain.png"],
															 		frames: {width:1920,height:331,regX:0,regY:0}
                												}
                								}
                							}
        	}
        },

        /* CONTROLLER */
        controller: {
        	init: function () {
        		_P = GAME.pr;
                _M = GAME.model;
                _V = GAME.view;
                _C = GAME.controller;

                _V.init();

                _V.els.stage.onMouseMove = _C.events.moveCanvas;
				_V.els.stage.onMouseDown = _C.events.clickCanvas;

                createjs.Ticker.setFPS(20);
 				createjs.Ticker.addListener(_C.tick);
        	},
        	events: {
        		moveCanvas: function () {
        			// console.log("move");
        		},
        		clickCanvas: function (e) {
        			console.log(e);
        		}
        	},
        	tick: function () {
        		_V.els.stage.update();
        	}
        }
    }

}());

$(document).ready(function() {
    GAME.controller.init();
});

 // var canvas;
 // var stage;

 // var imgSeq = new Image();		// The image for the sparkle animation
 // var bmpAnim;						// The animated sparkle template to clone
 // var fpsLabel;

 // function init() {
 // 	// create a new stage and point it at our canvas:
 // 	canvas = document.getElementById("gameCanvas");
 // 	stage = new createjs.Stage(canvas);

 // 	stage.onMouseMove = moveCanvas;
 // 	stage.onMouseDown = clickCanvas;

 // 	// define simple sprite sheet data specifying the image(s) to use, the size of the frames,
 // 	// and the registration point of the frame
 // 	// it will auto-calculate the number of frames from the image dimensions and loop them
 // 	var data = {
 // 		images: ["assets/sparkle_21x23.png"],
 // 		frames: {width:21,height:23,regX:10,regY:11}
 // 	}

 // 	// set up an animation instance, which we will clone
 // 	bmpAnim = new createjs.BitmapAnimation(new createjs.SpriteSheet(data));

 // 	// add a text object to output the current FPS:
 // 	fpsLabel = new createjs.Text("-- fps","bold 14px Arial","#FFF");
 // 	stage.addChild(fpsLabel);
 // 	fpsLabel.x = 10;
 // 	fpsLabel.y = 20;

 // 	// start the tick and point it at the window so we can do some work before updating the stage:
 // 	createjs.Ticker.setFPS(20);
 // 	createjs.Ticker.addListener(window);
 // }


 // function tick() {
 // 	// loop through all of the active sparkles on stage:
 // 	var l = stage.getNumChildren();
 // 	for (var i=l-1; i>0; i--) {
 // 		var sparkle = stage.getChildAt(i);

 // 		// apply gravity and friction
 // 		sparkle.vY += 2;
 // 		sparkle.vX *= 0.98;

 // 		// update position, scale, and alpha:
 // 		sparkle.x += sparkle.vX;
 // 		sparkle.y += sparkle.vY;
 // 		sparkle.scaleX = sparkle.scaleY = sparkle.scaleX+sparkle.vS;
 // 		sparkle.alpha += sparkle.vA;

 // 		//remove sparkles that are off screen or not invisble
 // 		if (sparkle.alpha <= 0 || sparkle.y > canvas.height) {
 // 			stage.removeChildAt(i);
 // 		}
 // 	}

 // 	fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS())+" fps";

 // 	// draw the updates to stage
 // 	stage.update();
 // }

 // //sparkle explosion
 // function clickCanvas(evt) {
 // 	addSparkles(Math.random()*200+100|0, stage.mouseX, stage.mouseY,2);
 // }

 // //sparkle trail
 // function moveCanvas(evt) {
 // 	addSparkles(Math.random()*2+1|0, stage.mouseX, stage.mouseY,1);
 // }

 // function addSparkles(count, x, y, speed) {
 // 	//create the specified number of sparkles
 // 	for (var i=0; i<count; i++) {
 // 		// clone the original sparkle, so we don't need to set shared properties:
 // 		var sparkle = bmpAnim.clone();

 // 		// set display properties:
 // 		sparkle.x = x;
 // 		sparkle.y = y;
 // 		//sparkle.rotation = Math.random()*360;
 // 		sparkle.alpha = Math.random()*0.5+0.5;
 // 		sparkle.scaleX = sparkle.scaleY = Math.random()+0.3;

 // 		// set up velocities:
 // 		var a = Math.PI*2*Math.random();
 // 		var v = (Math.random()-0.5)*30*speed;
 // 		sparkle.vX = Math.cos(a)*v;
 // 		sparkle.vY = Math.sin(a)*v;
 // 		sparkle.vS = (Math.random()-0.5)*0.2; // scale
 // 		sparkle.vA = -Math.random()*0.05-0.01; // alpha

 // 		// start the animation on a random frame:
 // 		sparkle.gotoAndPlay(Math.random()*sparkle.spriteSheet.getNumFrames()|0);

 // 		// add to the display list:
 // 		stage.addChild(sparkle);
 // 	}
 // }
