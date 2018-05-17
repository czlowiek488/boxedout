//My small modules
import { nosync } from "colyseus";
import { Vector } from "../modules/vector";

export class Player {   

    public pos;
    public size;

    @nosync private speed;
    @nosync public sessionId;
    @nosync public controls;
    
    constructor(
        pos: Vector,
        sessionId: string,
        size: Vector,
    ) {
        this.pos = pos;
        this.sessionId = sessionId;
        this.speed = 1;
        this.size = size;
        this.controls = {
                up: 87, //w
                left: 65, //a
                down:83, //s
                right: 68, //d  
            } 
    }

    move(pos) {
        this.pos = this.pos.add(pos, this.speed);
    }
}