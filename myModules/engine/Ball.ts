import { nosync } from 'colyseus';
import { Vector } from '../modules/vector';

export class Ball {
    public pos: Vector;
    public size: Vector;

    @nosync private speed: number;
    @nosync private angle: number;

    constructor(
        pos: Vector,
        size: Vector,
        angle: number,
        speed: number,
    ) {
        this.pos = pos;
        this.speed = speed;
        this.angle = angle;
        this.size = size;
    }
}