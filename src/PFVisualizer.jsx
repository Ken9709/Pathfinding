import React, { Component } from "react";
import Node from "./Node/Node";
import {BFS} from './algos/BFS';

import "./PFVisualizer.css";

const GRID_COL_LENGTH = 25;
const GRID_ROW_LENGTH = 25;
const START_NODE_ROW = 1;
const START_NODE_COL = 1;
const FINISH_NODE_ROW = 24;
const FINISH_NODE_COL = 24;

export default class PFVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
        };
    }
    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({ grid });
    }


    animateBFS(visitedNodesInOrder){
        for (let i = 0; i<= visitedNodesInOrder.length; i++){
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    "node animate-node";
                }, i);
        }
    }
    
    doBFS(){
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = BFS(grid, startNode, finishNode);
        console.log(visitedNodesInOrder);
        this.animateBFS(visitedNodesInOrder);
        console.log("DONE!")
    }

    render() {
        const { grid } = this.state;

        return (
            <>
                <button onClick={() => this.doBFS()}>animate</button>
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const { row, col, isStart, isFinish } =
                                        node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            col={col}
                                            isStart={isStart}
                                            isFinish={isFinish}
                                            row={row}
                                        ></Node>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }
}

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < GRID_ROW_LENGTH; row++) {
        const currentRow = [];
        for (let col = 0; col < GRID_COL_LENGTH; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};

const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    };
};
