export class Player {   
    constructor(
        public x: number,
        public y: number,
    ) {
        this.x = x;
        this.y = y;
    }

    move(pos) {
        this.x += pos.x;
        this.y += pos.y;
    }
}