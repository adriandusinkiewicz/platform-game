
interface rect {
  x: number,
  y: number,
  w: number,
  h: number
}
interface circle {
  x: number,
  y: number,
  r: number
}

export const rectanglesColliding = (rect1: rect, rect2: rect) => {
  if (
    rect1.x < rect2.x + rect2.w - 5 &&
    rect1.x + rect1.w - 5 > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.h + rect1.y > rect2.y
  ) {
    const t_collision = (rect1.y + rect1.h) - rect2.y;
    const b_collision = (rect2.y + rect2.h) - rect1.y;
    const l_collision = (rect1.x + rect1.w) - rect2.x;
    const r_collision = (rect2.x + rect2.w) - rect1.x;
    if (
      t_collision < b_collision &&
      t_collision < l_collision &&
      t_collision < r_collision
    ) {
      return "top";
    }
    else if (
      b_collision < t_collision &&
      b_collision < l_collision &&
      b_collision < r_collision
    ) {
      return "bottom";
    }
    else if (
      l_collision < r_collision &&
      l_collision < t_collision &&
      l_collision < b_collision
    ) {
      return "left";
    }
    else if (
      r_collision < l_collision &&
      r_collision < t_collision &&
      r_collision < b_collision
    ) {
      return "right";
    }
  }
  return false;
};

export const rectangleCircleColliding = (rect: rect, circle: circle) => {
  const distX = Math.abs(circle.x - rect.x - rect.w / 2);
  const distY = Math.abs(circle.y - rect.y - rect.h / 2);
  if (distX > (rect.w - 10) / 2 + circle.r) {
    return false;
  }
  if (distY > rect.h / 2 + circle.r) {
    return false;
  }
  if (distX <= (rect.w - 10) / 2) {
    return true;
  }
  if (distY <= rect.h / 2) {
    return true;
  }
  const dx = distX - (rect.w - 10) / 2;
  const dy = distY - rect.h / 2;
  return dx * dx + dy * dy <= circle.r * circle.r;
};
