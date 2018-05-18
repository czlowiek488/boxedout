//Provided modules
import { EntityMap } from "colyseus";
import { nosync } from 'colyseus';
//My main modules
import { Player } from './engine/Player';
import { Tile } from './engine/Tile';
import { Ball } from './engine/Ball';
//My small modules
import { Collision } from './modules/collision';
import { Vector } from "./modules/vector";


export class Engine {  
    public players: EntityMap<Player> = {};
    public tiles: EntityMap<Tile> = {};
    public balls: EntityMap<Ball> = {};
    public mapSize;

    
    @nosync private tilesSet;
    @nosync private tileSize;
    @nosync private ballsAmmount;
    @nosync private tilesAmmount;

    constructor(
        mapSize: Vector,
        tilesSet: Vector,
        ballsAmmount: number,
    ) {
        this.mapSize = mapSize;
        this.tilesSet = tilesSet;
        this.tileSize = new Vector(  this.mapSize.x/this.tilesSet.x,  this.mapSize.y/this.tilesSet.y );
        this.ballsAmmount = ballsAmmount;
        this.tilesAmmount = tilesSet.x * tilesSet.y;

        this.setTiles();
        this.setBalls();
    }
    //global functions

        update() {
            this.playersUpdate();
            this.ballsUpdate();
        }

        private isOnOpenTile(pos: Vector, size: Vector) {
            let openTiles = this.getTiles('open');
            let result = false;
            openTiles.forEach(element => {
                if( new Collision().rectRect(pos,size,element.pos,element.size) ){
                     result = true;
                    return;
                }
            });
            return result;
        }

        private isOnMap(pos, size) {
            return  (   pos.isBiggerEq(new Vector(0,-1)) &&
                        pos.isSmaller(this.mapSize.sub(new Vector(0,1))) 
                    );
        }

    //players FUNCTIONS

        playerAdd(sessionId, index) {
            this.players[ index ] = new Player(new Vector(0,0), sessionId, this.tileSize, (pos, size) => {
                return this.isOnMap(pos, size);
            });
        }

        playerRemove(sessionId) {
        delete this.players[ this.playerIndex( sessionId ) ];
        }

        playerVector(id, vector: Vector) {
            this.players[ id ].moveVector = vector.mult(this.tileSize);
        }

        playerIndex(sessionId) {
            let id = 0;
            while('undefined' != typeof(this.players[ id ]) ){
                if(this.players[ id ].sessionId == sessionId) return id;
                id++;
            }
            return null;
        }

        playersUpdate() {
            for(let id in this.players) {
                this.players[ id ].update();
            }
        }

        private getPlayersAmmount() {
            let ammount = 0;
            for(let id in this.players){
                ammount++;
            }
            return ammount;
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

    private getTiles(status: string) {
        let Tiles = [];
        for(let i = 0; i < this.tilesAmmount; i++) {
            if(this.tiles[ i ].status == status) Tiles.push(this.tiles[ i ]);    
        }
        return Tiles; 
    }



    //balls FUNCTIONS

    setBalls() {
        let id = 0;
        for(let i = 0; i < this.ballsAmmount; i++) {
            let ball = this.getNewBall();
            this.balls [ id ] = new Ball(ball.pos, ball.size, ball.angle, 0.33,
                (pos, size) => { //check before applying moves
                    return this.isOnOpenTile( pos, size );
                }, (angle)=>{
                    return (angle+90)%360;
                },);
            id++;
        }
    }

    private getNewBall() {
        let size = this.tileSize.div(new Vector(2,2));
        let angle = Math.floor((Math.random() * 360) + 0);
        let pos;
        do{
            pos = new Vector(
                Math.floor((Math.random() * this.mapSize.x) + 0),
                Math.floor((Math.random() * this.mapSize.y) + 0),
            );
        }while( this.isOnOpenTile(pos,size) );
        return {pos: pos, size: size, angle: angle};
    }

    private ballsUpdate() {
        for(let id in this.balls) {
            this.balls[ id ].update();
        }
    }

    
}