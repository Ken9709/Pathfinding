// g - movement cost to move from startNode to a given square
// h - movement cost to move from given square to to finishNode
// we dont really know the actuaal distance, but this is the guess
// f - sum of g and h

export function AStar(grid, startNode, finishNode) {
    //Initialize the open list, and put start node on the open list
    let openList = [];
    openList.push(startNode);
    // initialize the closed list
    let closeList = [];
    // while open list is not empty
    while (openList != null) {
        // find node with least f on the open list
        const currentNode = getNodeWithShortestDistance(openList);
        
        // remove node n with smallest f from open and move it to closed
        if (currentNode === finishNode) {
            return closeList;
        }
        closeList.push(currentNode);
        openList = openList.filter((x) => x !== currentNode);

        const neighbors = getNeighbors(currentNode, grid);

        for (const neighbor of neighbors) {
            if (closeList.includes(neighbor) || neighbor.isWall) {
                continue;
            }
            let tempG = currentNode.g + 1;
            let tempGisBest = false;

            if (!openList.includes(neighbor)) {
                tempGisBest = true;
                neighbor.h = heuristic(neighbor, finishNode)
                openList.push(neighbor);
            }
                else if (tempG < neighbor.g) {
                    tempGisBest = true;
                }
                if (tempGisBest) {
                    neighbor.parent = currentNode;
                    neighbor.g = tempG;
                    neighbor.f = neighbor.g + neighbor.h;
                    openList.push(neighbor);
                }
                
                
                // calculate and saave g h and f, save current parent
                
                // add neighbor to openList
            }
        }
    }

function heuristic(a, b) {
    //const { col, row } = a
    let c = b.row - a.row;
    let d = b.col - a.row;
    let dist = Math.sqrt(c * c + d * d);
    return dist;
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

//problem must be here
function getNodeWithShortestDistance(openList) {
    let low = 0;
    for (let i = 0; i < openList.length; i++) {
        if (openList[i].f < openList[low].f) {
            low = i;
        }
        console.log(low);
    }
        return openList[low];
    
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function getNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors;
}
function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}
