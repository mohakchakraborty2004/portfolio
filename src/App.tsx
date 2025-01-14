import { useEffect } from 'react';
import Phaser from 'phaser';
import MainScene from './scenes/MainScene';
import './App.css';

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
    <>
      <div className="navbar">
    <div className="name">moChak.rs</div>
    <div className="github-link">
      <a href="https://github.com/mohakchakraborty2004/portfolio" target="_blank">GitHub</a>
    </div>
  </div>
     <div id="game-container"></div>
    </>
   
  );
}

export default App;