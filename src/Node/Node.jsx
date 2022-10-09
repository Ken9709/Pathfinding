import { isCursorAtStart } from '@testing-library/user-event/dist/utils';
import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component { 
    render(){
        const {
        col,
        isFinish,
        isStart,
        isWall,
        row,
        onMouseDown,
        onMouseEnter,
        onMouseUp,
    } = this.props;
        const typeClassName = isFinish
        ? 'finish-node'
        : isStart 
        ? 'start-node'
        : isWall
        ? 'wall-node'
        : '';
        
        
        
        return(
     <div
        id ={`node-${row}-${col}`}
        className={`node ${typeClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}></div>
        );
    }
}

