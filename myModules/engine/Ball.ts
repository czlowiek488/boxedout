import { nosync } from 'colyseus';
import { Vector } from '../modules/vector';

export class Ball {
    public pos: Vector;
    public moveData: {
        timeStart: number,
        timeEnd: number,
        angle: number,
        radius: number,
    };
    public  size: Vector;
    @nosync private speed: number;
    @nosync private futurePos: Vector;
    @nosync private moveCheck: Function;
    @nosync private newAngle: Function;
    constructor(
        pos: Vector,
        size: Vector,
        angle: number,
        speed: number,
        moveCheck: Function,
        newAngle: Function,
    ) {
        this.pos = pos;
        this.speed = speed;
        this.size = size;
        this.moveCheck = moveCheck;
        this.newAngle = newAngle;
        this.futurePos = new Vector(0,0);
        this.moveData = this.moveDataGenerate(angle); //do new move simulation
    }

    update() {
        this.move();
    }

    move() {
        if(!this.isMoving()){ //check is it time to do new simulation
            if(!this.futurePos.eq(new Vector(0,0))) this.pos = this.futurePos;
            this.moveData = this.moveDataGenerate(this.newAngle(this.moveData.angle));
        } 

    }
    
    moveDataGenerate(angle: number){
        let moveData = {
            radius: 1,
            angle: angle,
            time: 0,
            timeStart: 0,
            timeEnd: 0,
        };
        let newPos;
        let isSimulationOver = false;

        do{
            newPos = this.pos.add(   new Vector(
                ( (moveData.radius) * Math.cos(moveData.angle * (Math.PI/180) )),
                ( (moveData.radius) * Math.sin(moveData.angle * (Math.PI/180) )) ));
            if(this.moveCheck(newPos, this.size)){
                this.futurePos = newPos;
                isSimulationOver = true; //check() -> engine check situations when ball should changeAngle
            }   else    {
                moveData.radius++;
            }
        }while(!isSimulationOver);
        
        moveData.timeStart = new Date().getTime();
        moveData.timeEnd = moveData.timeStart + moveData.radius/this.speed;

        return moveData;
    }

    private isMoving() {
        return this.moveData.timeEnd > new Date().getTime();
    }
}