window.GAME = (function() {

    var _P = { /* Private variables */

    },

    _M, // ref to model
    _V, // ref to view
    _C; // ref to controller

    return {

    	/* MODEL */
        model: {
            speed: 1
        },

        /* VIEW */
        view: {
        	init: function () {
                //Instantiating the luchador sprite with the luchador data (defined below in els
    			_V.els.characters.luchador.sprite = new createjs.BitmapAnimation(new createjs.SpriteSheet(_V.els.characters.luchador.data));

                //Looping through obstacles to create all of the obstacles based on the data below
                for (var obstaclesElement in _V.els.obstacles) {
                    _V.els.obstacles[obstaclesElement].sprite = new createjs.BitmapAnimation(new createjs.SpriteSheet(_V.els.obstacles[obstaclesElement].data));
                };

                //Looping through all of the background elements using the decor attribute/object defined in else
        		for (var decorElement in _V.els.decor) {
        			_V.els.decor[decorElement].sprite = new createjs.BitmapAnimation(new createjs.SpriteSheet(_V.els.decor[decorElement].data));
        		};
                //Background terrain
        		_V.buildEnvironment();
                _V.els.stage.addChild(_V.els.characters.luchador.sprite);
                _V.els.characters.luchador.sprite.x = 200;
                _V.els.characters.luchador.sprite.y = 110;
                _V.els.characters.luchador.sprite.gotoAndPlay("ouch");

                //Barrel
                _V.els.stage.addChild(_V.els.obstacles.barrel.sprite);
                _V.els.obstacles.barrel.sprite.x = 500;
                _V.els.obstacles.barrel.sprite.y = 295;
                _V.els.obstacles.barrel.sprite.gotoAndStop(0);

                //Chili
                _V.els.stage.addChild(_V.els.obstacles.chili.sprite);
                _V.els.obstacles.chili.sprite.x = 800;
                _V.els.obstacles.chili.sprite.y = 180;
                _V.els.obstacles.chili.sprite.gotoAndStop(0);

        	},  
        	els: {
        		window:                     $(window),
                document:                   $(document),
                stage: 						new createjs.Stage(document.getElementById('gameCanvas')),
                characters: 				{
                								luchador: 	{
                												data: {
                                                                    "images": ["img/spritesheets/luchador-spritesheet.png"],
                                                                    "frames": [[190, 0, 112, 209, 0, -19, -37], [610, 0, 111, 200, 0, -21, -41], [836, 0, 119, 196, 0, -15, -45], [721, 0, 115, 196, 0, -29, -45], [463, 0, 147, 200, 0, -11, -42], [302, 0, 161, 200, 0, -2, -42], [0, 0, 97, 210, 0, -22, -34], [97, 0, 93, 210, 0, -29, -34], [391, 210, 172, 180, 0, 0, -14], [0, 210, 126, 190, 0, -12, -51], [251, 210, 140, 184, 0, -2, -55], [126, 210, 125, 185, 0, -5, -55]],
                                                                    "animations": {"stand": {"frames": [0]}, "all": {"frames": [11]}, "jump": {"frames": [8]}, "run": {"frames": [1, 2, 2, 3, 4, 5, 5, 6, 7]}, "ouch": {"frames": [9, 10, 11, 9, 10, 11]}}
                                                                }
                                                }
                							},
                obstacles:                  {
                                                barrel:     {
                                                                data: {
                                                                    "animations": {
                                                                        "all": {
                                                                            "frames": [0]
                                                                        }
                                                                    },
                                                                    "images": ["img/spritesheets/barrel.png"],
                                                                    "frames": [[2, 2, 76, 97, 0, -2, -2]]
                                                                }
                                                }, 
                                                chili:     {
                                                                data: {
                                                                    "animations": {
                                                                        "all": {
                                                                            "frames": [0]
                                                                        }
                                                                    },
                                                                    "images": ["img/spritesheets/chili.png"],
                                                                    "frames": [[2, 2, 18, 48, 0, -1, -1]]
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
                								},
                                                theCloud: {
                                                                data: {
                                                                    images: ["img/spritesheets/cloud.png"],
                                                                    frames: {width:120,height:55,regX:0,regY:0}
                                                                }
                                                }
                							}
        	},
        	buildEnvironment: function () {
        		var theTerrain = _V.els.decor.theTerrain.sprite,
                    theCloud = _V.els.decor.theCloud.sprite,
        			theSun = _V.els.decor.theSun.sprite;

        		theSun.x = 800;
        		theSun.y = 10
                theSun.vX = _M.speed / 2;
        		theSun.gotoAndPlay(1);
        		_V.els.stage.addChild(theSun);

        		theTerrain.x = 0;
        		theTerrain.y = 70;
                theTerrain.vX = _M.speed;
        		theTerrain.gotoAndPlay(1);
        		_V.els.stage.addChild(theTerrain);

                theCloud.x = 0;
                theCloud.y = 70;
                theCloud.vX = (_M.speed * Math.random())+1;
                theCloud.gotoAndStop(Math.floor(Math.random()*3));
                _V.els.stage.addChild(theCloud);
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
        			//console.log(e);
                    console.log("hey");
                    _V.els.characters.luchador.sprite.gotoAndPlay("jump");
                    var start = createjs.Ticker.getTicks();
                        console.log (start);
                    if (createjs.Ticker.getTicks() > (start + 20)) {
                        console.log("woah");
                    }        
        		}
        	},
        	tick: function () {

<<<<<<< HEAD
        		_V.els.decor.theTerrain.sprite.x -= _V.els.decor.theTerrain.sprite.vX;
                _V.els.decor.theSun.sprite.x -= _V.els.decor.theSun.sprite.vX;
                _V.els.decor.theCloud.sprite.x += _V.els.decor.theCloud.sprite.vX;
=======
        		_V.currentTerrain.x -= _V.currentTerrain.vX;
                _V.els.decor.theSun.sprite.x -= _V.els.decor.theSun.sprite.vX;
                _V.els.decor.theCloud.sprite.x += _V.els.decor.theCloud.sprite.vX;

                if (_V.els.characters.luchador.sprite.currentAnimation == "run" && createjs.Ticker.getTicks() < (_V.els.characters.luchador.startTick + 20)) {
                    _V.els.characters.luchador.sprite.gotoAndPlay("jump");
                } else {
                        if (_V.els.characters.luchador.sprite.currentAnimation == "run") {
                            console.log('nice');
                        }
                        else {
                        _V.els.characters.luchador.sprite.gotoAndPlay("run");
                        }
                }

                if (_V.currentTerrain.x <= (_V.els.stage.canvas.width-30)*-1) {
                    _V.oldTerrain = _V.currentTerrain;
                    _V.currentTerrain = _V.newTerrain;
                }
                if (_V.oldTerrain != null) { 
                    _V.oldTerrain.x -= _V.oldTerrain.vX;
                    if (_V.oldTerrain.x <= -_V.oldTerrain.spriteSheet._frameWidth) {
                        _V.oldTerrain.x = _V.els.stage.canvas.width;
                        _V.newTerrain = _V.oldTerrain
                        _V.oldTerrain = null;
                    }
                }

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
