 import { Grid } from "./grid.js";
    import { Tile } from "./tile.js";
    
    const gameBackground = document.getElementById("game-background");

    const grid = new Grid(gameBackground);
    grid.getEmptyCell().linkTile(new Tile(gameBackground));
    grid.getEmptyCell().linkTile(new Tile(gameBackground));
    setupInputOnce();

    function setupInputOnce() {
        window.addEventListener("keydown", handleInput, {once: true});
    }
    
 

    function handleInput(event) {
        switch(event.key) {
            case "ArrowUp":
                if(!canMoveUp()) {
                    setupInputOnce();
                    return;
                }
            moveUp();
            break;

            case "ArrowDown":
                if(!canMoveDown()) {
                    setupInputOnce();
                    return;
                }
            moveDown();
            break;
            

            case "ArrowLeft":
                if(!canMoveLeft()) {
                    setupInputOnce();
                    return;
                }
            moveLeft();
            break;

            case "ArrowRight":
                if(!canMoveRight()) {
                    setupInputOnce();
                    return;
                }
            moveRight();
            break;

            default:
            setupInputOnce();
            return;
        }

        const newTile = new Tile(gameBackground);
        grid.getEmptyCell().linkTile(newTile);

        if(!canMoveDown() && !canMoveLeft() && !canMoveRight() && !canMoveUp()) {
            alert("GAME OVER!");
            return;
        }
        if(Tile.value === "2048") {
            alert("YOU WIN!");
        }
        setupInputOnce();
    }


    function moveUp() {
        slideTiles(grid.cellsByColumn);
    }

    function moveDown() {
        slideTiles(grid.cellsByReversedColumn);
    }

    function moveLeft() {
        slideTiles(grid.cellsByRow);
    }

    function moveRight() {
        slideTiles(grid.cellsByReversedRow);
    }

    function slideTiles(groupedCells) {
        groupedCells.forEach(group => slideTilesInGroup(group));
        grid.cells.forEach(cell => {
            cell.hasTileForConnect() && cell.connectTiles();
        });
    }

    function slideTilesInGroup(group) {
        for(let i =1; i < group.length; i++) {
            if(group[i].isEmpty()) {
                continue;
            }

            const cellWithTile = group[i];

            let targetCell;
            let j = i - 1;
            while (j >= 0 && group[j].canAccept(cellWithTile.linkedTile)) {
                targetCell = group[j];
                j--;
            }

            if(!targetCell) {
                continue;
            }

            if(targetCell.isEmpty()) {
                targetCell.linkTile(cellWithTile.linkedTile);
            }else {
                targetCell.linkTileForConnect(cellWithTile.linkedTile);
            }

            cellWithTile.unlinkTile();
        }

    

    }

    function canMoveUp() {
        return canMove(grid.cellsByColumn);
    }

    function canMoveDown() {
        return canMove(grid.cellsByReversedColumn);
    }

    function canMoveLeft() {
        return canMove(grid.cellsByRow);
    }

    function canMoveRight() {
        return canMove(grid.cellsByReversedRow);
    }
    
    function canMove(groupedCells) {
        return groupedCells.some(group => canMoveInGroup(group));
    }

    function canMoveInGroup(group) {
        return group.some((cell, i) => {
            if( i === 0) {
                return false;
            }
            if(cell.isEmpty()) {
                return false;
            }

            const nextCell = group[i - 1];
            return nextCell.canAccept(cell.linkTile);
        });
    }

   

    
    



