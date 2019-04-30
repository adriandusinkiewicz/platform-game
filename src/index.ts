import { controller } from "./Controller";
import { sprite_sheet } from "./sprite_sheet";
import Game from "./Game";

////////////////////
//// INITIALIZE ////
////////////////////

//key listeners
window.addEventListener("keydown", controller.keyUpDown);
window.addEventListener("keyup", controller.keyUpDown);

//canvas
const canvas: any = document.querySelector("canvas");
const game = new Game(document.createElement("canvas").getContext("2d"), canvas.getContext("2d"));

game.resize()

window.addEventListener("resize", game.resize);

sprite_sheet.image.addEventListener("load", function (event) {
  window.requestAnimationFrame(game.loop.bind(game));
});

sprite_sheet.image.src = "img/animation.png";