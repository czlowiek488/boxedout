export class Collision {
    rectRect(circlePos, circleSize, rectPos, rectSize) {
            let r1 = {
                left: circlePos.x - circleSize.x/2,
                right: circlePos.x + circleSize.x/2,
                top: circlePos.y - circleSize.y/2,
                bottom: circlePos.y + circleSize.y/2
            };
            let r2 = {
                left: rectPos.x,
                right: rectPos.x + rectSize.x,
                top: rectPos.y,
                bottom: rectPos.y + rectSize.y
            };  
        return !(r2.left > r1.right || 
            r2.right < r1.left || 
            r2.top > r1.bottom ||
            r2.bottom < r1.top);
 }
}
