var Ball = (function () {

  function Ball(x, y, radius) {
    this.position = vec2.fromValues(x, y);
    this.resetPosition = vec2.clone(this.position);
    this.radius = radius;
    this.speed = 720;
    this.newVelocity(Math.random() > 0.5);
    this.trail = [];
  }

  Ball.prototype = {

    setBoundry: function(x1, y1, x2, y2) {
      this.boundry = {x1: x1, y1: y1, x2: x2, y2: y2};
    },

    move: function(deltaTime) {
      if (this.trail.length >= 10) {
        this.trail.splice(0, 1);
      }
      this.trail.push({x: this.position[0], y: this.position[1]});

      var vel = vec2.clone(this.velocity);

      vec2.add(this.position, this.position, vec2.scale(vel, vel, deltaTime));
    },

    checkBoundry: function() {
      var x = this.position[0], 
          y = this.position[1],
          r = this.radius;

      if (y - r < this.boundry.y1) {
        this.bounce(vec2.fromValues(0, -1));
      }

      if (y + r > this.boundry.y2) {
        this.bounce(vec2.fromValues(0, 1));
      }
    },

    intersects: function(rect) {
      var x = this.position[0], 
          y = this.position[1],
          r = this.radius;

      return !(rect.x > x + r ||
        rect.x + rect.w < x - r || 
        rect.y > y + r ||
        rect.y + rect.h < y - r);
    },

    bounce: function(normal) {
      var newVel = vec2.create();
      vec2.scale(newVel, normal, -2 * vec2.dot(this.velocity, normal));
      vec2.add(newVel, newVel, this.velocity);
      vec2.copy(this.velocity, newVel);
    },

    reset: function(p2) {
      vec2.copy(this.position, this.resetPosition);
      this.newVelocity(p2);
      this.trail = [];
    },

    // argument is to determine if ball should travel left or right
    newVelocity: function(p2) {
      this.velocity = vec2.fromValues(this.speed, Math.random() * 2 - 1);
      // if player 2 scored, send ball at player 1
      if (p2) vec2.negate(this.velocity, this.velocity);
    },

    update: function(deltaTime, paddles) {
      this.move(deltaTime);
      if (this.boundry) this.checkBoundry();

      for (var i = 0; i < paddles.length; i++) {
        if (this.intersects(paddles[i])) {
          if (this.velocity[0] < 0) { // moving left
            // set the ball position outside of the paddle
            this.position[0] = paddles[i].x + paddles[i].w + this.radius;
            this.bounce(vec2.fromValues(1, 0));
          } else { // moving right
            // set the ball position outside of the paddle
            this.position[0] = paddles[i].x - this.radius;
            this.bounce(vec2.fromValues(-1, 0));
          }
        }
      }
    },

    render: function(screen) {
      // render ball
      screen.fillStyle("#fff");
      screen.beginPath();
      screen.arc(this.position[0], this.position[1], this.radius, 0, Math.PI*2, true);
      screen.fill();

      // render trail
      for (var i = 0; i < this.trail.length; i++) {
        var alpha = i * 0.01;
        screen.fillStyle("rgba(255, 255, 255, " + alpha + ")");
        screen.beginPath();
        screen.arc(this.trail[i].x, this.trail[i].y, this.radius - (this.trail.length - i) * 0.5, 0, Math.PI*2, true);
        screen.fill();
      };
    }

  };

  return Ball;

})();