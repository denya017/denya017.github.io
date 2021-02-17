
// Our game scene
var scene = new Phaser.Scene("game");

var config = {
	type: Phaser.AUTO,
	width: window.innerWidth,
	height: window.innerHeight,
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: true
        }
    },
	scene : scene
};

// Create the game with our config values
// this will also inject our canvas element into the HTML source 
// for us
var game = new Phaser.Game(config);

scene.init = function() {
	this.score = 0;
	this.lives = 3;
	this.speed= 1.5;

	this.score_text;
	this.lives_text;
};

scene.preload = function() {
	this.load.image('background', 'img/background.png');
	this.load.spritesheet('player', 'img/player.png', {
		frameWidth: 68,
		frameHeight: 79
	});

	// load the PNG file
	this.load.image('tile0', 'assets/map/tile0.png');

	// load the JSON file
	this.load.tilemapTiledJSON('tilemap', 'assets/map/mymap.json');
};
var sprite;
var layermy;
scene.create = function() {

	// add the background
	var bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background');
   	bg.setOrigin(0,0);
   	bg.setScrollFactor(0);

   	const map = this.make.tilemap({ key: 'tilemap' });

	// add the tileset image we are using
	const tileset = map.addTilesetImage('tile0', 'tile0');
	
	// create the layers we want in the right order
	layermy = map.createStaticLayer('layer1', tileset);



   	//add player
   	sprite = this.physics.add.sprite(100, 200, 'player');
   	sprite.setOrigin(0,0);
   	sprite.setBounce(0.1);
   	//sprite.setBounds(0, 0, 900, game.config.height);
	//sprite.setCollideWorldBounds(true);


	this.physics.add.collider(sprite, layermy);
	
	//layermy.setCollisionByProperty({collides:true});
	//layermy.setCollision([36,56,21]);
	//layermy.setCollisionByExclusion([0]);
	layermy.setCollisionBetween(1, 100);


	this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
	this.cameras.main.startFollow(sprite);

   	this.anims.create({
   		key: "player_stay",
   		frames: this.anims.generateFrameNumbers("player", { start: 0, end: 19 }),
   		frameRate: 20,
   		repeat: -1 });
   	this.anims.create({
   		key: "player_right",
   		frames: this.anims.generateFrameNumbers("player", { start: 20, end: 39 }),
   		frameRate: 30,
   		repeat: -1 });

   	sprite.play({key:"player_stay"});

   	cursors = this.input.keyboard.createCursorKeys();

   	// add score text & game text to screen
   //this.scoreText = this.add.text(16, 16, 'score: '+this.score, { fontSize: '20px', fill: '#000' });
   //this.liveText = this.add.text(16, this.sys.game.config.height-50, 'Lives: ' + this.lives, {fontSize: '20px', fill: '#000'});
};

scene.update = function() {
	if (cursors.left.isDown)
	{
	    sprite.setVelocityX(-160);

	    sprite.anims.play('player_right', true).flipX = true;

	}
	else if (cursors.right.isDown)
	{
	    sprite.setVelocityX(160);

	    sprite.anims.play('player_right', true).flipX = false;
	}
	else
	{
	    sprite.setVelocityX(0);

	    sprite.anims.play('player_stay');
	}


	if (cursors.up.isDown)
	{
	    sprite.setVelocityY(-260);

	    //sprite.anims.play('player_left', true);
	}
	// else
	// {
	//     sprite.setVelocityY(0);

	//     sprite.anims.play('player_stay');
	// }

if (cursors.up.isDown && sprite.body.touching.down)
{
    sprite.setVelocityY(-330);
}
};


scene.end = function() {

};