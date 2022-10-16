import React, { Component } from "react";
import Node from "./Node/Node";
import { BFS, getNodesInShortestPathOrder } from "./algos/BFS";
import { DFS } from "./algos/DFS";
import "./PFVisualizer.css";
import { Dijkstra } from "./algos/Dijkstra";
import { AStar } from "./algos/AStar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const GRID_COL_LENGTH = 30;
const GRID_ROW_LENGTH = 30;

export default class PFVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            mouseIsPressed: false,
            START_NODE_ROW: 5,
            START_NODE_COL: 5,
            FINISH_NODE_ROW: 10,
            FINISH_NODE_COL: 10,
        };
        this.onInputchange = this.onInputchange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onInputchange(event) {
        this.setState({
            [event.target.name]: parseInt(event.target.value),
        });
    }

    onSubmitForm() {
        console.log(this.state);
        const grid = this.getInitialGrid();
        this.setState({ grid });
    }

    componentDidMount() {
        const grid = this.getInitialGrid();
        this.setState({ grid });
    }

    animateBFS(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(
                    `node-${node.row}-${node.col}`
                ).className = "node node-visited";
            }, 10 * i);
        }
    }

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(
                    `node-${node.row}-${node.col}`
                ).className = "node node-visited";
            }, 10 * i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(
                    `node-${node.row}-${node.col}`
                ).className = "node node-shortest-path";
            }, 50 * i);
        }
    }

    doDijkstra() {
        const {
            grid,
            START_NODE_ROW,
            START_NODE_COL,
            FINISH_NODE_ROW,
            FINISH_NODE_COL,
        } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = Dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder =
            getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    doBFS() {
        const {
            grid,
            START_NODE_ROW,
            START_NODE_COL,
            FINISH_NODE_ROW,
            FINISH_NODE_COL,
        } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = BFS(grid, startNode, finishNode);
        const nodesInShortestPathOrder =
            getNodesInShortestPathOrder(finishNode);
        this.animateBFS(visitedNodesInOrder, nodesInShortestPathOrder);
        console.log("DONE!");
    }

    doDFS() {
        const {
            grid,
            START_NODE_ROW,
            START_NODE_COL,
            FINISH_NODE_ROW,
            FINISH_NODE_COL,
        } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = DFS(grid, startNode, finishNode);
        const nodesInShortestPathOrder =
            getNodesInShortestPathOrder(finishNode);
        this.animateBFS(visitedNodesInOrder, nodesInShortestPathOrder);
        console.log("DONE!");
    }

    doAStar() {
        const {
            grid,
            START_NODE_ROW,
            START_NODE_COL,
            FINISH_NODE_ROW,
            FINISH_NODE_COL,
        } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = AStar(grid, startNode, finishNode);
        const nodesInShortestPathOrder =
            getNodesInShortestPathOrder(finishNode);
        this.animateBFS(visitedNodesInOrder, nodesInShortestPathOrder);
        console.log("DONE!");
    }

    handleMouseDown(row, col) {
        const newGrid = this.getNewGridWithWallToggled(
            this.state.grid,
            row,
            col
        );
        this.setState({ grid: newGrid, mouseIsPressed: true });
    }
    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
        const newGrid = this.getNewGridWithWallToggled(
            this.state.grid,
            row,
            col
        );
        this.setState({ grid: newGrid });
    }

    handleMouseUp() {
        this.setState({ mouseIsPressed: false });
    }

    getInitialGrid = () => {
        const grid = [];
        for (let row = 0; row < GRID_ROW_LENGTH; row++) {
            const currentRow = [];
            for (let col = 0; col < GRID_COL_LENGTH; col++) {
                currentRow.push(this.createNode(col, row));
            }
            grid.push(currentRow);
        }
        return grid;
    };

    getNewGridWithWallToggled = (grid, row, col) => {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
        return newGrid;
    };

    createNode = (col, row) => {
        const {
            START_NODE_ROW,
            START_NODE_COL,
            FINISH_NODE_ROW,
            FINISH_NODE_COL,
        } = this.state;

        return {
            col,
            row,
            isStart: row === START_NODE_ROW && col === START_NODE_COL,
            isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
            distance: Infinity,
            isWall: false,
            f: 0,
            g: 0,
            h: 0,
        };
    };

    redoGrid = () => {
        const {
            START_NODE_ROW,
            START_NODE_COL,
            FINISH_NODE_ROW,
            FINISH_NODE_COL,
        } = this.state;
        const newGrid = this.getInitialGrid();
        for (let i = 0; i < GRID_ROW_LENGTH; i++) {
            for (let j = 0; j < GRID_COL_LENGTH; j++) {
                const node = document.getElementById(`node-${i}-${j}`);

                if ((i == START_NODE_ROW && j == START_NODE_COL)) {
                    node.className = "node start-node";
                } else if (i == FINISH_NODE_ROW && j == FINISH_NODE_COL){
                    node.className = "node finish-node";
                }
                else {
                    node.className = "node";
                }

                
            }
        }
        this.setState({ grid: newGrid });
    };

    render() {
        const { grid, mouseIsPressed } = this.state;

        return (
            <>
                <div className="header">
                    <div className="fields">
                        <label>
                            Start:
                            <TextField
                                name="START_NODE_ROW"
                                variant="outlined"
                                type="number"
                                value={this.state.START_NODE_ROW}
                                onChange={this.onInputchange}
                                size="small"
                                min="0"
                                max="30"
                            />
                        </label>
                        <label>
                            <TextField
                                name="START_NODE_COL"
                                variant="outlined"
                                type="number"
                                value={this.state.START_NODE_COL}
                                onChange={this.onInputchange}
                                size="small"
                                min="0"
                                max="30"
                            />
                        </label>
                        <label>
                            Finish:
                            <TextField
                                name="FINISH_NODE_ROW"
                                variant="outlined"
                                type="number"
                                value={this.state.FINISH_NODE_ROW}
                                onChange={this.onInputchange}
                                size="small"
                                min="0"
                                max="30"
                            />
                        </label>
                        <label>
                            <TextField
                                name="FINISH_NODE_COL"
                                variant="outlined"
                                type="number"
                                value={this.state.FINISH_NODE_COL}
                                onChange={this.onInputchange}
                                size="small"
                                min="0"
                                max="30"
                            />
                        </label>

                        <Button color="success" onClick={this.onSubmitForm}>
                            Submit
                        </Button>
                        <Button color="success" onClick={this.redoGrid}>
                            redoGrid
                        </Button>
                    </div>
                    <div className="buttons">
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={() => this.doBFS()}
                        >
                            BFS
                        </Button>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={() => this.doDFS()}
                        >
                            DFS
                        </Button>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={() => this.doDijkstra()}
                        >
                            Dijkstra
                        </Button>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={() => this.doAStar()}
                        >
                            A*
                        </Button>
                    </div>
                </div>
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const {
                                        row,
                                        col,
                                        isStart,
                                        isFinish,
                                        isWall,
                                        f,
                                        g,
                                        h,
                                    } = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            col={col}
                                            isStart={isStart}
                                            isFinish={isFinish}
                                            isWall={isWall}
                                            row={row}
                                            f={f}
                                            g={g}
                                            h={h}
                                            mouseIsPressed={mouseIsPressed}
                                            onMouseDown={(row, col) =>
                                                this.handleMouseDown(row, col)
                                            }
                                            onMouseEnter={(row, col) =>
                                                this.handleMouseEnter(row, col)
                                            }
                                            onMouseUp={() =>
                                                this.handleMouseUp()
                                            }
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
