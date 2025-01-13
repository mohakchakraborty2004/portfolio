import { useEffect, useState } from 'react';
import Phaser, { Physics, Scene } from 'phaser';
import MainScene from './scenes/MainScene';



function App() {

  useEffect(() => {

    const config = {
      type : Phaser.AUTO,
      width : 800,
      height : 600,
      Physics : {
        default : 'arcade',
        arcade : {
          gravity : { y : 0}
        }
      },
      Scene : MainScene
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    }
  }, [])

  return (
    <>
    <div id='game-container'></div>
    </>
  )
}

export default App
