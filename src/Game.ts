import { platforms } from './platforms';
import { coins } from "./coins";
import { rectanglesColliding, rectangleCircleColliding } from "./collisions";
import { controller } from "./Controller";
import { sprite_sheet } from "./sprite_sheet";
import Player from "./Player";
import Animation from "./Animation";

const player = new Player(new Animation([], 0), true, 16, 16, 0, 40 - 18, 0, 0);
const SPRITE_SIZE = 16;

export default class Game {

    buffer: any;
    display: any;
    ground: number;
    points: number;
  
    constructor(
      buffer: any,
      display: any
    ) {
      this.buffer = buffer;
      this.points = 0;
      this.ground = 0;
      this.display = display;
    }
  
    resize() {
      this.display.canvas.width = document.documentElement.clientWidth - 32;
      if (this.display.canvas.width > document.documentElement.clientHeight + 300) {
        this.display.canvas.width = document.documentElement.clientHeight + 300;
      }
      this.display.canvas.height = this.display.canvas.width * 0.6;
      this.display.imageSmoothingEnabled = false;
    }
  
    draw() {
      this.buffer.canvas.width = 200;
      this.buffer.canvas.height = 100;
  
      /* Draw the background. */
      this.buffer.fillStyle = "#7ec0ff";
      this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
      this.buffer.strokeStyle = "#8ed0ff";
      this.buffer.lineWidth = 10;
      this.buffer.beginPath();
      this.buffer.moveTo(0, 0);
      this.buffer.bezierCurveTo(this.buffer.canvas.height, 40, this.buffer.canvas.height, 0, this.buffer.canvas.width, 0);
      this.buffer.moveTo(0, 0);
      this.buffer.bezierCurveTo(this.buffer.canvas.height, 40, this.buffer.canvas.height, 20, this.buffer.canvas.width, 0);
      this.buffer.closePath();
      this.buffer.stroke();
  
      /* Draw the ground. */
      this.buffer.fillStyle = "#009900";
      this.buffer.fillRect(0, this.buffer.canvas.height - 4, this.buffer.canvas.width, 4);
  
      /* Draw the platforms. */
      this.buffer.fillStyle = "saddlebrown";
      platforms.forEach(platform => this.buffer.fillRect(platform.x, platform.y, platform.w, platform.h))
  
      /* Draw the coins. */
      this.buffer.fillStyle = "yellow";
      coins.forEach(coin => {
        this.buffer.beginPath();
        this.buffer.arc(coin.x, coin.y, coin.r, 0, Math.PI * 2, true);
        this.buffer.closePath();
        this.buffer.fill();
      });
  
      /* Draw the score. */
      this.buffer.font = "10px Arial";
      if (this.points < 4) {
        this.buffer.fillText(this.points, this.buffer.canvas.width - 10, 10);
      } else {
        this.buffer.fillText("WINNER", this.buffer.canvas.width - 45, 10);
      }
  
      this.buffer.drawImage(sprite_sheet.image, player.animation.frame * SPRITE_SIZE, 0, SPRITE_SIZE, SPRITE_SIZE, Math.floor(player.x), Math.floor(player.y), SPRITE_SIZE, SPRITE_SIZE);
      this.display.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.display.canvas.width, this.display.canvas.height);
  
    }
  
    loop() {
      if (controller.up.active && !player.jumping) {
        controller.up.active = false;
        player.jumping = true;
        player.y_velocity -= 6;
      }
  
      if (controller.left.active) {
  
        /* To change the animation, all you have to do is call animation.change. */
        player.animation.change(sprite_sheet.frame_sets[2], 15);
        player.x_velocity -= 0.1;
  
      }
  
      if (controller.right.active) {
  
        player.animation.change(sprite_sheet.frame_sets[1], 15);
        player.x_velocity += 0.1;
  
      }
  
      /* If you're just standing still, change the animation to standing still. */
      if (!controller.left.active && !controller.right.active) {
  
        player.animation.change(sprite_sheet.frame_sets[0], 30);
  
      }
  
      player.y_velocity += 0.25;
  
      player.x += player.x_velocity;
      player.y += player.y_velocity;
      player.x_velocity *= 0.9;
      player.y_velocity *= 0.9;
  
      if (player.y + player.h > this.ground) {
  
        player.jumping = false;
        player.y = this.ground - player.h;
        player.y_velocity = 0;
      }
  
      if (player.x + player.w < 0) {
  
        player.x = this.buffer.canvas.width;
  
      } else if (player.x > this.buffer.canvas.width) {
  
        player.x = -player.w;
  
      }
  
      this.ground = this.buffer.canvas.height - 2
  
      //platforms collision
      platforms.forEach(platform => {
        if (rectanglesColliding(player, platform) === 'top') {
          this.ground = platform.y;
        } else if (rectanglesColliding(player, platform) === 'bottom') {
          player.y = platform.y + platform.h;
          player.y_velocity += 3;
        } else if (rectanglesColliding(player, platform) === 'left') {
          player.x_velocity -= 3;
        } else if (rectanglesColliding(player, platform) === 'right') {
          player.x_velocity += 3;
        }
      })
  
      //coins collision
      coins.forEach((coin, index) => {
        if (rectangleCircleColliding(player, coin)) {
          coins.splice(index, 1);
          if (coin.r < 4) {
            this.points += 1;
          } else {
            this.points = 4;
          }
        }
      })
  
      player.animation.update();
  
      this.draw();
  
      window.requestAnimationFrame(this.loop.bind(this));
  
    };
  
  }