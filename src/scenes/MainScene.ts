import Phaser from "phaser";


class MainScene extends Phaser.Scene {

    private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody; // Define the player
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys; // Define the keyboard controls

    constructor (){
        super('MainScene');
    }

    public preload(): void {
        //loading assests here.
        
        this.load.image('tileset', '../assets/tiles/tileset.png')
        this.load.tilemapTiledJSON('map', '../assets/maps/TiledMap.json')
        this.load.spritesheet('player', 'assets/player.png', {
            frameWidth : 32,
            frameHeight : 32
        });
    }

    public create(): void {
        // player and its animations 
        const map = this.make.tilemap({key : 'map'})
        const tileset = map.addTilesetImage('cpws','tileset');

        const backgroundLayer = map.createLayer('Background', tileset!, 0,0)
        const collisionLayer = map.createLayer('Collision', tileset!, 0, 0);

        collisionLayer?.setCollisionByProperty({collides : true})

        this.player = this.physics.add.sprite(400, 300, 'player');
        this.anims.create({
            key : 'walk', 
            frames : this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });

        this.physics.add.collider(this.player, collisionLayer!)
        
        //key controls 
        this.cursors = this.input.keyboard!.createCursorKeys();
    }

   public update(): void {
        
    this.player.setVelocity(0);

    if (this.cursors.left?.isDown) {
        this.player.setVelocityX(-200);
        this.player.anims.play('walk', true);
        this.player.flipX = true; 
    } else if (this.cursors.right?.isDown) {
        this.player.setVelocityX(200);
        this.player.anims.play('walk', true);
        this.player.flipX = false;
    } else if (this.cursors.up?.isDown) {
        this.player.setVelocityY(-200);
        this.player.anims.play('walk', true);
    } else if (this.cursors.down?.isDown) {
        this.player.setVelocityY(200);
        this.player.anims.play('walk', true);
    } else {
        this.player.anims.stop();
    }

}

}

export default MainScene;