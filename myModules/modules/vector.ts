export class Vector {
    constructor(
       public x: number,
       public y: number,
    ){
        this.x = x;
        this.y = y;
    }

    add(vector: Vector){
        return  new Vector(this.x + vector.x, this.y + vector.y);
    }

    div(vector: Vector) {
        return new Vector( this.x / vector.x, this.y / vector.y);
    }

    mult(vector: Vector) {
        return new Vector( this.x * vector.x, this.y * vector.y);
    }

    sub(vector: Vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    isSmaller(vector: Vector) {
        // console.log('isSmaller');
        // console.log(this);
        // console.log(vector);
        // console.log(( vector.x > this.x && vector.y > this.y));
        return ( vector.x > (this.x) && vector.y > this.y);
    }

    isBigger(vector: Vector) {
        // console.log('isBigger');
        // console.log(this);
        // console.log(vector);
        // console.log(( vector.x < this.x && vector.y < this.y));
       return (  vector.x < (this.x)   &&    vector.y < this.y   ); 
    }
    isBiggerEq(vector: Vector) {
        // console.log('isBigger');
        // console.log(this);
        // console.log(vector);
        // console.log(( vector.x < this.x && vector.y < this.y));
       return (  vector.x <= (this.x)   &&    vector.y <= this.y   ); 
    }
    eq(vector: Vector) {
        return  ( this.x == vector.x && this.x == vector.y );
    }
}