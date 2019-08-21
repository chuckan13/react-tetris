import React from 'react';
import {StyleStartButton} from './styles/StyleStartButton'

const StartButton = ({ callback }) => <StyleStartButton onClick={callback}>Start Game</StyleStartButton>;

export default StartButton;
