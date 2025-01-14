import { useEffect } from 'react';
import Phaser from 'phaser';
import MainScene from './scenes/MainScene';

function App() {
  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 960,
      height: 576,
      parent: 'game-container',  
      physics: {                 
        default: 'arcade',
        arcade: {
          gravity: { y: 0, x:0 },
          debug: true           // Added debug for development
        }
      },
      scene: MainScene,
      audio: {
        disableWebAudio: true
      },
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div id="game-container" style={{ width: '960px', height: '576px' }}></div>
  );
}

export default App;