import { isCursorAtStart } from '@testing-library/user-event/dist/utils';
import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component { 
    render(){
        const {
        col,
        isFinish,
        isStart,
        row,
    } = this.props;
        const typeClassName = isFinish
        ? 'finish-node'
        : isStart 
        ? 'start-node'
        : '';
        
        
        return(
     <div
        id ={`node-${row}-${col}`}
        className={`node ${typeClassName}`}></div>
        );
    }
}

