var Pong = (function() {

  "use strict";

  var maxWidth = 1024,
      maxHeight = 748;

  function Pong(canvasId) {
    var canvas = document.getElementById(canvasId);
    if (canvas !== null && canvas.nodeName === 'CANVAS') {
      this.screen = new Screen(canvas, maxWidth, maxHeight);

      this.state = new StateMachine();
      this.loop = new GameLoop(this.state);

      this.state.add('game', new GameState(this.screen));

      this.state.push('game');
    } else {
      console.error("Pong: the ID '%s' doesn't exist or is not a <canvas> element.", canvasId);
    }
  }

  Pong.prototype = {

    start: function() {
      if (this.loop) {
        this.loop.start();
      }
    }

  };

  return Pong;

})();

window.onload = function() {
  new Pong("screen").start();
};
