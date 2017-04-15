var Paddle = (function() {

  "use strict";

  function Paddle(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.resetX = x;
    this.resetY = y;
    this.w = width;
    this.h = height;
    this.color = color;
    this.controls = {up: [], down: [], left: [], right: []};
    this.speed = 420;
    this.score = 0;
  }

  Paddle.prototype = {

    setControls: function(controls, gameControls) {
      this.gameControls = gameControls;

      for (var c in controls) {
        this.controls[c] = this.controls[c].concat(controls[c]);
      }
    },

    setBoundry: function(x1, y1, x2, y2) {
      this.boundry = {x1: x1, y1: y1, x2: x2, y2: y2};
    },

    move: function(deltaTime) {
      var dx = 0, dy = 0;

      for (var dir in this.controls) {
        var control = this.controls[dir];
        for (var i = 0; i < control.length; i++) {
          if (this.gameControls.active(control[i])) {
            if (dir === "up") {
              dy--;
            } else if (dir === "down") {
              dy++;
            } else if (dir === "left") {
              dx--;
            } else if (dir === "right") {
              dx++;
            }
          }
        }
      }

      // fix when keyboard "up" plus a touch "up" can make you go double speed
      dx = (dx > 0) ? this.speed * deltaTime : dx;
      dx = (dx < 0) ? -this.speed * deltaTime : dx;
      dy = (dy > 0) ? this.speed * deltaTime : dy;
      dy = (dy < 0) ? -this.speed * deltaTime : dy

      this.x += dx;
      this.y += dy;
    },

    checkBoundry: function() {
      this.x = (this.x < this.boundry.x1) ? this.boundry.x1 : this.x;
      this.y = (this.y < this.boundry.y1) ? this.boundry.y1 : this.y;
      this.x = (this.x + this.w - 1 > this.boundry.x2) ? this.boundry.x2 - this.w + 1 : this.x;
      this.y = (this.y + this.h - 1 > this.boundry.y2) ? this.boundry.y2 - this.h + 1 : this.y;
    },

    addPoint: function() {
      this.score++;
    },

    resetPosition: function() {
      this.x = this.resetX;
      this.y = this.resetY;
    },

    update: function(deltaTime) {
      this.move(deltaTime);
      if (this.boundry) this.checkBoundry();
    },

    render: function(screen) {
      screen.fillStyle(this.color);
      screen.fillRect(this.x, this.y, this.w, this.h);
    }

  };

  return Paddle;

})();
