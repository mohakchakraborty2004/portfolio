import Phaser from "phaser";

class MainScene extends Phaser.Scene {
    private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super('MainScene');
    }

    public preload(): void {
        // Add console logs to verify loading
        console.log('Preload started');
        
        this.load.image('tileset', '/src/assets/tiles/tileset.png');
        this.load.tilemapTiledJSON('map', '/src/assets/maps/TiledMap.json');
        this.load.spritesheet('player', '/src/assets/sprites/player.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        // Add error handlers for asset loading
        this.load.on('loaderror', (file: any) => {
            console.error('Error loading asset:', file.src);
        });
    }

    public create(): void {
        console.log('Create started');
        
        try {
            const map = this.make.tilemap({ key: 'map' });
            console.log('Map loaded:', map);

            const tileset = map.addTilesetImage('cpws', 'tileset');
            console.log('Tileset created:', tileset);

            if (!tileset) {
                throw new Error('Failed to load tileset. Check if the tileset name matches the one in Tiled.');
            }

            // Create layers
            const layer1 = map.createLayer('Tile Layer 1', tileset, 0, 0);
            const layer2 = map.createLayer('Tile Layer 2', tileset, 0, 0);
            const layer3 = map.createLayer('Tile Layer 3', tileset, 0, 0);
            const layer4 = map.createLayer('Tile Layer 4', tileset, 0, 0);

            console.log('Layers created:', { layer1, layer2, layer3, layer4 });

            // Create player
            this.player = this.physics.add.sprite(400, 300, 'player');
            
            // Create animation
            this.anims.create({
                key: 'walk',
                frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1,
            });

            // Set up controls
            this.cursors = this.input.keyboard!.createCursorKeys();

        } catch (error) {
            console.error('Error in create():', error);
        }
    }

    public update(): void {
        if (!this.player || !this.cursors) return;

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