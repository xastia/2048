 export class Cell {
        constructor(gridElement, x, y) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            gridElement.append(cell);
            this.x = x;
            this.y = y;
        }

        linkTile(tile) {
            tile.setXY(this.x, this.y);
            this.linkedTile = tile;
        }

        unlinkTile() {
            this.linkedTile = null;
        }

        isEmpty() {
            return !this.linkedTile;
        }

        linkTileForConnect(tile) {
            tile.setXY(this.x, this.y);
            this.linkedTileForConnect = tile;
        }


        unlinkTileForConnect() {
            this.linkedTileForConnect = null;
        }


        hasTileForConnect() {
            return this.linkedTileForConnect;
        }

        canAccept(newTile) {
            return this.isEmpty() || (!this.hasTileForConnect() && this.linkedTile.value === newTile.value);
        }


        connectTiles() {
            this.linkedTile.setValue(this.linkedTile.value + this.linkedTileForConnect.value);
            this.linkedTileForConnect.removeFrom();
            this.unlinkTileForConnect();
           }

         unlinkTileForConnection() {
            this.linkedTileForConnect = null;
        }

    }
