//Provided modules
import { EntityMap } from "colyseus";
import { nosync } from 'colyseus';
//My main modules
import { Player } from './engine/Player';
import { Tile } from './engine/Tile';
import { Ball } from './engine/Ball';
import { Vector } from "./modules/vector";
//My small modules


export class Engine {  
    public players: EntityMap<Player> = {};
    public tiles: EntityMap<Tile> = {};
    public balls: EntityMap<Ball> = {};
    public mapSize;
    
    @nosync private tilesSet;
    @nosync private tileSize;
    @nosync private ballsAmmount;
    
    constructor(
        mapSize: Vector,
        tilesSet: Vector,
        ballsAmmount: number,
    ) {
        this.mapSize = mapSize;
        this.tilesSet = tilesSet;
        this.tileSize = new Vector(  this.mapSize.x/this.tilesSet.x,  this.mapSize.y/this.tilesSet.y );
        this.ballsAmmount = ballsAmmount;
        this.setTiles();
        this.setBalls();
    }

    //players FUNCTIONS
        playerAdd(sessionId, index) {
            this.players[ index ] = new Player(new Vector(1,1).mult(this.tileSize), sessionId, this.tileSize);
        }

        playerRemove(sessionId) {
        delete this.players[ this.playerIndex( sessionId ) ];
        }

        playerMove(id, pos) {
           this.players[ id ].move( new Vector(pos.x, pos.y).mult(this.tileSize) );
        }

        playerIndex(sessionId) {
            let id = 0;
            while('undefined' != typeof(this.players[ id ]) ){
                if(this.players[ id ].sessionId == sessionId) return id;
                id++;
            }
            return null;
        }
        
    //tiles FUNCTIONS

    setTiles() {
        let id = 0;
        for(let i = 0; i < this.tilesSet.x; i++){
            for(let j = 0; j < this.tilesSet.y; j++){ 
                let pos = new Vector(i, j);
                let status = 'open';
                if( i > 3 && i < 10 && j > 3 && j < 18) status = 'closed';
                this.tiles[ id ] = new Tile(pos.mult(this.tileSize), status, this.tileSize);
                id++;
            }
        }
    }

    //balls FUNCTIONS

    setBalls() {
        let id = 0;
        for(let i = 0; i < this.ballsAmmount; i++) {
            let pos = new Vector(5,6);//get random position from closed Tiles FUTURE!!!!!!!!!!!!!!!!!
            let angle = 45;//get random angle <0,360) FUTURE!!!!!!!!!!!!!!!!!!!
            this.balls [ id ] = new Ball(pos, this.tileSize.div(new Vector(3,3)), angle, 2);
            id++;
        }

    }
}