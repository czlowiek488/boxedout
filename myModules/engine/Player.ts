//My small modules
import { nosync } from "colyseus";
import { Vector } from "../modules/vector";

export class Player {   

    public pos;
    public size;

    @nosync private speed;
    @nosync public sessionId;
    @nosync public controls;
    @nosync public moveVector;
    @nosync private moveCheck;
    
    constructor(
        pos: Vector,
        sessionId: string,
        size: Vector,
        moveCheck: Function,
    ) {
        this.pos = pos.mult(size);
        this.moveVector = new Vector(0,0);
        this.sessionId = sessionId;
        this.speed = 1;
        this.size = size;
        this.controls = {
                up: 87, //w
                left: 65, //a
                down:83, //s
                right: 68, //d  
            };
        this.moveCheck = moveCheck; 
    }

    update() {
        this.move();
    }

    move() {
        let pos = this.pos.add(this.moveVector.mult(new Vector(this.speed, this.speed)));
        if( this.moveCheck(pos, this.size) ) this.pos = pos;
    }
}