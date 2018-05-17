export class Vector {
    constructor(
       public x: number,
       public y: number,
    ){
        this.x = x;
        this.y = y;
    }

    add(vector: Vector, speed){
        return  new Vector(this.x + (vector.x * speed), this.y + (vector.y * speed));
    }

    div(vector: Vector) {
        return new Vector( this.x / vector.x, this.y / vector.y);
    }

    mult(vector: Vector) {
        return new Vector( this.x * vector.x, this.y * vector.y);
    }
}