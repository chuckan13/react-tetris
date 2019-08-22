import React, { useState } from 'react';
import { StyleTetrisWrapper, StyleTetris } from './styles/StyleTetris';
import { userPlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
	const [ dropTime, setDropTime ] = useState(null);
	const [ gameOver, setGameOver ] = useState(false);

	console.log('re-render');
	return (
		<StyleTetrisWrapper>
			<StyleTetris>
				<Stage stage={createStage()} />
				<aside>
					<div>
						<Display text="Score" />
						<Display text="Rows" />
						<Display text="Level" />
					</div>
					<StartButton />
				</aside>
			</StyleTetris>
		</StyleTetrisWrapper>
	);
};

export default Tetris;
