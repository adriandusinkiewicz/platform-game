export default class Player {

    animation: any;
    jumping: boolean;
    w: number;
    h: number;
    x: number;
    y: number;
    x_velocity: number;
    y_velocity: number;

    constructor(
        animation: any,
        jumping: boolean,
        w: number,
        h: number,
        x: number,
        y: number,
        x_velocity: number,
        y_velocity: number
    ) {
        this.animation = animation;
        this.jumping = jumping;
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.x_velocity = x_velocity;
        this.y_velocity = y_velocity;
    }
    
}