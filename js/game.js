window.GAME = (function() {

    var _P = { /* Private variables */

    },

    _M, // ref to model
    _V, // ref to view
    _C; // ref to controller

    return {

    	/* MODEL */
        model: {
            speed: 15
        },

        /* VIEW */
        view: {
        	init: function () {
                //Instantiating the luchador sprite with the luchador data (defined below in els
    			_V.els.characters.luchador.sprite = new createjs.BitmapAnimation(new createjs.SpriteSheet(_V.els.characters.luchador.data));

                //Looping through obstacles to create all of the obstacles based on the data below
                for (var obstaclesElement in _V.els.obstacles) {
                    _V.els.obstacles[obstaclesElement].sprite = new createjs.BitmapAnimation(new createjs.SpriteSheet(_V.els.obstacles[obstaclesElement].data));
                    _V.els.obstacles[obstaclesElement].checkPos = function () {
                        if (this.sprite.x+100 < 0) {
                            this.sprite.x = _V.els.stage.canvas.width + Math.random()*200;
                        }
                    };
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
                _V.els.characters.luchador.sprite.gotoAndPlay("run");

                //Barrel
                _V.els.stage.addChild(_V.els.obstacles.barrel.sprite);
                _V.els.obstacles.barrel.sprite.x = 500;
                _V.els.obstacles.barrel.sprite.y = 275;
                _V.els.obstacles.barrel.sprite.gotoAndStop(0);

                //Chili
                _V.els.stage.addChild(_V.els.obstacles.chili.sprite);
                _V.els.obstacles.chili.sprite.x = 800;
                _V.els.obstacles.chili.sprite.y = 180;
                _V.els.obstacles.chili.sprite.gotoAndStop(0);

                _V.currentTerrain = _V.els.decor.theTerrain.sprite;
                _V.newTerrain = _V.els.decor.theTerrainSecondary.sprite;
                _V.oldTerrain = null;

                _V.els.stage.addChild(_V.els.debugLabel);
                _V.els.debugLabel.x = 800;
                _V.els.debugLabel.y = 20;
        	},  
        	els: {
        		window:                     $(window),
                document:                   $(document),
                debugLabel:                   new createjs.Text("-- input","bold 14px Arial","#000"),
                stage: 						new createjs.Stage(document.getElementById('gameCanvas')),
                characters: 				{
                								luchador: 	{
                												data: {
                                                                    "images": ["img/spritesheets/luchador-spritesheet.png"],
                                                                    "frames": [[190, 0, 112, 209, 0, -19, -37], [610, 0, 111, 200, 0, -21, -41], [836, 0, 119, 196, 0, -15, -45], [721, 0, 115, 196, 0, -29, -45], [463, 0, 147, 200, 0, -11, -42], [302, 0, 161, 200, 0, -2, -42], [0, 0, 97, 210, 0, -22, -34], [97, 0, 93, 210, 0, -29, -34], [391, 210, 172, 180, 0, 0, -14], [0, 210, 126, 190, 0, -12, -51], [251, 210, 140, 184, 0, -2, -55], [126, 210, 125, 185, 0, -5, -55]],
                                                                    "animations": {"stand": {"frames": [0]}, "all": {"frames": [11]}, "jump": {"frames": [8]}, "run": {"frames": [1, 2, 2, 3, 4, 5, 5, 6, 7]}, "ouch": {"frames": [9, 10, 11, 9, 10, 11]}}
                                                                },
                                                                //170 x 250
                                                                width: 150,
                                                                height: 220
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
                                                                    "frames": [[2, 2, 76, 97, 0, -2, -2]],
                                                                },
                                                                speed: 0,
                                                                width: 50,
                                                                height: 100,
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
                                                                },
                                                                speed: 3,
                                                                width: 30,
                                                                height: 40,
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
                                                theTerrainSecondary: {
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
                    theTerrainSecondary = _V.els.decor.theTerrainSecondary.sprite,
                    theCloud = _V.els.decor.theCloud.sprite,
        			theSun = _V.els.decor.theSun.sprite;

        		theSun.x = 800;
                theSun.y = 10
                theSun.vX = _M.speed / 50;
                theSun.gotoAndPlay(1);
                _V.els.stage.addChild(theSun);

                theCloud.x = -90;
                theCloud.y = Math.floor(Math.random()*130);
                theCloud.vX = -((_M.speed/5) * Math.random());
                theCloud.gotoAndStop(Math.floor(Math.random()*3));
                _V.els.stage.addChild(theCloud);

                theTerrain.x = 0;
                theTerrain.y = 70;
                theTerrain.vX = _M.speed;
                theTerrain.gotoAndPlay(1);
                _V.els.stage.addChild(theTerrain);

                theTerrainSecondary.x = _V.els.stage.canvas.width;
                theTerrainSecondary.y = 70;
                theTerrainSecondary.vX = _M.speed;
                theTerrainSecondary.gotoAndPlay(1);
                _V.els.stage.addChild(theTerrainSecondary);
        	}
        },

        /* CONTROLLER */
        controller: {
        	init: function () {
        		_P = GAME.pr;
                _M = GAME.model;
                _V = GAME.view;
                _C = GAME.controller;
                _C.gesture = {};

                _V.init();

                _V.els.stage.onMouseMove = _C.events.moveCanvas;
				_V.els.stage.onMouseDown = _C.events.clickCanvas;
                _V.els.stage.onMouseUp = _C.events.releaseClickCanvas;

                _C.gesture.startX = -1;
                _C.gesture.startY = -1;
                _C.gesture.timeout = -1

                createjs.Ticker.setFPS(20);
 				createjs.Ticker.addListener(_C.tick);
        	},
        	events: {
        		moveCanvas: function (e) {

        		},
        		clickCanvas: function (e) {
                    _V.els.debugLabel.text = "click input";
                    _V.els.characters.luchador.sprite.gotoAndPlay("jump");
                    _V.els.characters.luchador.startTick = createjs.Ticker.getTicks();

                    _C.gesture.startX = e.stageX;
                    _C.gesture.startY = e.stageY;
                    _C.gesture.timeout = createjs.Ticker.getTicks()+20;

                    for (var obstacle in _V.els.obstacles) {
                        
                        var x = _V.els.obstacles[obstacle].sprite.x + _V.els.obstacles[obstacle].width;
                        var y = _V.els.obstacles[obstacle].sprite.y + _V.els.obstacles[obstacle].height;

                        if ((e.stageX >= _V.els.obstacles[obstacle].sprite.x && e.stageX <= x) && (e.stageY >= _V.els.obstacles[obstacle].sprite.y && e.stageY <= y)) {

                            _V.els.obstacles[obstacle].sprite.x = _V.els.stage.canvas.width + Math.random()*500;

                        }
                    }   
        		},
                releaseClickCanvas: function (e) {
                    if (_C.gesture.timeout >= createjs.Ticker.getTicks()) {
                        if (e.stageX > _C.gesture.startX+300) {
                            _V.els.debugLabel.text = "horizontal swipe input";
                            _C.gesture.startX = -1;
                            _C.gesture.startY = -1;
                            _C.gesture.timeout = -1;
                        } else if ( e.stageY > _C.gesture.startY+200 ) {
                            _V.els.debugLabel.text = "vertical swipe input";
                            _C.gesture.startX = -1;
                            _C.gesture.startY = -1;
                            _C.gesture.timeout = -1;
                        }
                    } else {
                        _C.gesture.startX = -1;
                        _C.gesture.startY = -1;
                        _C.gesture.timeout = -1;
                    }
                }
        	},
        	tick: function () {

        		_V.currentTerrain.x -= _V.currentTerrain.vX;
                _V.els.decor.theSun.sprite.x -= _V.els.decor.theSun.sprite.vX;
                _V.els.decor.theCloud.sprite.x -= _V.els.decor.theCloud.sprite.vX;

                for (var obstacle in _V.els.obstacles) {
                    _V.els.obstacles[obstacle].sprite.x -= _M.speed+_V.els.obstacles[obstacle].speed;
                    _V.els.obstacles[obstacle].checkPos();
                }

                if (createjs.Ticker.getTicks() < (_V.els.characters.luchador.startTick + 5)) {
                    // _V.els.characters.luchador.sprite.gotoAndStop("jump");
                } else if ((_V.els.characters.luchador.sprite.currentAnimation != "run")) {
                    _V.els.characters.luchador.sprite.gotoAndPlay("run");
                     _V.els.debugLabel.text = "-- input";     
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
                if (_V.els.decor.theCloud.sprite.x >= _V.els.stage.canvas.width) {
                    _V.els.decor.theCloud.sprite.x = -90;
                    _V.els.decor.theCloud.sprite.y = Math.floor(Math.random()*130);
                    _V.els.decor.theCloud.sprite.vX = -((_M.speed/5) * Math.random());
                    _V.els.decor.theCloud.sprite.gotoAndStop(Math.floor(Math.random()*3));
                }

                //Luchador hit testin'

                var luchaRight = _V.els.characters.luchador.sprite.x + _V.els.characters.luchador.width;
                var luchaBottom = _V.els.characters.luchador.sprite.y + _V.els.characters.luchador.height;

                for (var obstacle in _V.els.obstacles) {
                    
                    var obstacleX = _V.els.obstacles[obstacle].sprite.x + _V.els.obstacles[obstacle].height;
                    var obstacleY = _V.els.obstacles[obstacle].sprite.y + _V.els.obstacles[obstacle].width;


                    /*if ((e.stageX >= _V.els.obstacles[obstacle].sprite.x && e.stageX <= x) && (e.stageY >= _V.els.obstacles[obstacle].sprite.y && e.stageY <= y)) {
                        _V.els.stage.removeChild(_V.els.obstacles[obstacle].sprite);
                    }*/

                    if (luchaRight == _V.els.obstacles[obstacle].sprite.x) {
                        _V.els.debugLabel.text = "OUCH!";   

                        if (_V.els.characters.luchador.sprite.currentAnimation != "ouch") {
                            _V.els.characters.luchador.sprite.gotoAndPlay("ouch");  
                        }
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
