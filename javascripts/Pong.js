var Pong = (function() {

  "use strict";

  var maxWidth = 1024,
    maxHeight = 748;

  function Pong(id) {
    this.screen = new Screen(id, maxWidth, maxHeight);

    this.state = new StateMachine();
    this.loop = new GameLoop(this.state);

    this.state.add("game", new GameState(this.screen));

    this.state.push("game");
  }

  Pong.prototype = {

    start: function() {
      this.loop.start();
    }

  };

  return Pong;

})();