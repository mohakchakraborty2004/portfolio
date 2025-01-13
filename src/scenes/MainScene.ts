import Phaser from "phaser";


class MainScene extends Phaser.Scene {

    private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody; // Define the player
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys; // Define the keyboard controls

    constructor (){
        super('MainScene');
    }

    public preload(): void {
        //loading assests here.
        // havent created the pngs yet.
        this.load.spritesheet('palyer', 'assets/player.png', {
            frameWidth : 30,
            frameHeight : 30
        });
    }

    public create(): void {
        // player and its animations 
        this.player = this.physics.add.sprite(400, 300, 'player');
        this.anims.create({
            key : 'walk', 
            frames : this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });
        
        //key controls 
        this.cursors = this.input.keyboard!.createCursorKeys();
    }

   public update(): void {
        
    this.player.setVelocity(0);

    if (this.cursors.left?.isDown) {
        this.player.setVelocityX(-200);
        this.player.anims.play('walk', true);
    } else if (this.cursors.right?.isDown) {
        this.player.setVelocityX(200);
        this.player.anims.play('walk', true);
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