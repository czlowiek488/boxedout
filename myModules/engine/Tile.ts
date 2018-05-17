import { Vector } from "../modules/vector";


export class Tile {
    public pos;
    public status;
    public size;
    
    constructor(
        pos: Vector,
        status: string,
        size: Vector,
    ) {
        this.pos = pos;
        this.status = status;
        this.size = size;
    }
}