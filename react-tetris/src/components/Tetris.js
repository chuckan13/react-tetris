import React, { useState } from 'react';
import { createStage, checkCollision } from '../gameHelpers';
import { StyleTetrisWrapper, StyleTetris } from './styles/StyleTetris';
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

    console.log('re-render');

    const movePlayer = dir => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        }
    };

    const startGame = () => {
        //reset everything
        setStage(createStage());
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
    };

    const drop = () => {
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            setDropTime(1000 / (level + 1) + 200);
        }

        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false });

        } else {
            if (player.pos.y < 1) {
                console.log('GAME OVER');
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    };

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 40) {
                setDropTime(1000 / (level + 1) + 200);
            }
        }
    }

    const dropPlayer = () => {
        setDropTime(null);
        drop();
    };

    const hardDropPlayer = () => {
    //     console.log(drop())
    //     console.log(drop())
    //     console.log(drop())
    //     console.log(drop())
    //     console.log(drop())
    //     console.log(drop())
    //     console.log(drop())
    //     console.log(drop())
    //     console.log(drop())
    //     console.log(drop())
    //     console.log(drop())
    //     console.log(drop())
    //     console.log(drop())
    //     console.log(drop())
    //     console.log(drop())
    //     console.log(drop())
    //     console.log(drop())
    //     // console.log(drop())
    //     try{drop()} catch{
    //         console.log("drop error")
    //     }
    //     try{drop()} catch{
    //         console.log("drop error")
    //     }
    // 	// var i;
    // 	// for (i = 0; i < 30; i++) {
    //     //     console.log(drop())
    // 	// 	// if (drop()) {
    //     //     //     console.log('done dropping')
    // 	// 	// 	break;
    // 	// 	// }
    // 	// }
    };

    const move = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 37) {
                movePlayer(-1);
            } else if (keyCode === 39) {
                movePlayer(1);
            } else if (keyCode === 40) {
                dropPlayer();
            } else if (keyCode === 38) {
                playerRotate(stage, 1);
            }
            else if (keyCode === 32) {
            	hardDropPlayer();
            }
        }
    };

    useInterval(() => {
        drop();
    }, dropTime)

    return (
        <StyleTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
            <StyleTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? (
                        <Display gameover={gameOver} text="Game Over" />
                    ) : (
                            <div>
                                <Display text={`Score: ${score}`} />
                                <Display text={`Rows: ${rows}`} />
                                <Display text={`Levels: ${level}`} />
                            </div>
                        )}
                    <StartButton callback={startGame} />
                </aside>
            </StyleTetris>
        </StyleTetrisWrapper>
    );
};

export default Tetris;
