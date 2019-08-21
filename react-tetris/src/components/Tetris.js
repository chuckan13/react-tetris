import React from 'react';

import { createStage } from '../gameHelpers';
import { StyleTetrisWrapper, StyleTetris } from './styles/StyleTetris';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
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
