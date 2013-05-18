var Pong = (function () {

  var FPS = 60;
  var maxWidth = 1024, maxHeight = 748;
  var borderHeight = 15;

  function Pong(id) {
    this.screen = new Screen(id, maxWidth, maxHeight);

    var width = 15, height = 150;
    var y = maxHeight / 2 - height / 2;

    this.controls = new Controls();
    this.controls.addTouchListeners(["player1-up", "player1-down", "player2-up", "player2-down"]);

    this.player1 = new Paddle(40, y, width, height, "#ff1f1f");
    this.player1.setControls({up: ["w", "player1-up"], down: ["s", "player1-down"]}, this.controls);
    this.player1.setBoundry(0, borderHeight, maxWidth / 2 - 1, maxHeight - 1 - borderHeight);

    this.player2 = new Paddle(maxWidth - width - 40, y, width, height, "#1f8eff");
    this.player2.setControls({up: ["up", "player2-up"], down: ["down", "player2-down"]}, this.controls);
    this.player2.setBoundry(maxWidth / 2, borderHeight, maxWidth - 1, maxHeight - 1 - borderHeight);

    this.ball = new Ball(maxWidth / 2, maxHeight / 2, 10);
    this.ball.setBoundry(0, borderHeight, maxWidth - 1, maxHeight - 1 - borderHeight);

    this.freeze = FPS * 2;
  }

  Pong.prototype = {

    start: function() {
      setInterval(this.update.bind(this), 1000 / FPS)
      requestAnimationFrame(this.render.bind(this));
    },

    update: function() {
      if (this.freeze > 0) {
        this.freeze--;
      } else {
        this.player1.update();
        this.player2.update();
        this.ball.update([this.player1, this.player2]);
      }

      var p1 = false, p2 = false;

      if (this.ball.position[0] < 0) {
        this.player2.addPoint();
        p2 = true;
      } else if (this.ball.position[0] > maxWidth) {
        this.player1.addPoint();
        p1 = true;
      }

      if (p1 || p2) {
        this.player1.resetPosition();
        this.player2.resetPosition();
        this.ball.reset(p2);
        this.freeze = FPS * 1;
      }
    },

    render: function() {
      // must call to keep loop going
      requestAnimationFrame(this.render.bind(this));

      this.screen.clear("#262626");

      this.renderBorder();
      this.renderDivider();
      this.renderScore();

      this.player1.render(this.screen);
      this.player2.render(this.screen);
      this.ball.render(this.screen);
    },

    renderBorder: function() {
      this.screen.fillStyle("#ccc");
      this.screen.fillRect(0, 0, maxWidth, borderHeight);
      this.screen.fillRect(0, maxHeight - borderHeight, maxWidth, borderHeight);
    },

    renderDivider: function() {
      this.screen.fillStyle("#999");

      for (var i = 0; i < 15; i++) {
        this.screen.fillRect(maxWidth / 2 - borderHeight / 4, borderHeight * 2 + i * borderHeight * 3.15, borderHeight / 2, borderHeight * 2);
      };
    },

    renderScore: function() {
      this.screen.fillStyle("#ccc");
      this.screen.font("bold", "80", "Courier");

      this.screen.textAlign("right");
      this.screen.fillText(this.player1.score, maxWidth / 2 - 30, borderHeight + 70);

      this.screen.textAlign("left");
      this.screen.fillText(this.player2.score, maxWidth / 2 + 30, borderHeight + 70);
    }

  };

  return Pong;

})();