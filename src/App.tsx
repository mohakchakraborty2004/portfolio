import { useEffect } from 'react';
import Phaser from 'phaser';
import MainScene from './scenes/MainScene';

function App() {
  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      parent: 'game-container',  
      physics: {                 
        default: 'arcade',
        arcade: {
          gravity: { y: 0, x:0 },
        }
      },
      scene: MainScene,
      audio: {
        disableWebAudio: true
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div id="game-container"></div>
  );
}

export default App;