class Draggable {
  width;
  height;
  x;
  y;
  xOffset = 0.0;
  yOffset = 0.0;
  wasUnderMouse = false;
  onMouseOver = () => {};
  onMouseOut = () => {};
  onDrag = () => {};

  isDragging = false;

  constructor({ x, y, w, h } = {}) {
    this.x = x ?? 100;
    this.y = y ?? 100;
    this.width = w ?? 100;
    this.height = h ?? 100;

    cnv.elt.addEventListener("mousedown", () => {
      this.onMousePressed();
    });
    cnv.elt.addEventListener("mousemove", () => {
      this.onMouseMoved();
    });
    cnv.elt.addEventListener("mouseup", () => {
      this.onMouseReleased();
    });
  }

  onMousePressed() {
    if (this.isUnderMouse()) this.isDragging = true;
    this.xOffset = mouseX - this.x;
    this.yOffset = mouseY - this.y;
  }

  onMouseReleased() {
    this.isDragging = false;
  }

  onMouseMoved() {
    if (this.isUnderMouse()) {
      if (!this.wasUnderMouse) {
        this.wasUnderMouse = true;
        this.onMouseOver(this);
        cursor(HAND);
      }
    } else {
      if (this.wasUnderMouse) {
        this.wasUnderMouse = false;
        this.onMouseOut(this);
        cursor(ARROW);
      }
    }

    if (this.isDragging) {
      this.onDrag(this);
      this.x = mouseX - this.xOffset;
      this.y = mouseY - this.yOffset;
    }
  }

  getFillColor() {
    if (this.isDragging) return this.dragColor;
    if (this.isUnderMouse()) return this.hoverColor;
    return this.restColor;
  }

  isUnderMouse() {
    return (
      mouseX > this.x &&
      mouseX < this.x + this.width &&
      mouseY > this.y &&
      mouseY < this.y + this.height
    );
  }
}
