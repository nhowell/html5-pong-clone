var GameLoop = (function () {

  var updateInterval = 1000 / 60; // 60 updates per second target

  // requires an object with an 'update' and 'render' method
  function GameLoop(loopable) {
    this.running = false;

    this.loopable = loopable;

    this.lastTime = 0;
    this.updateId = 0;
  }

  GameLoop.prototype = {

    start: function() {
      if (!this.isRunning()) {
        this.running = true;
        this.lastTime = this.getNow();

        this.update();
        this.render();
      }
    },

    stop: function() {
      this.running = false;
      window.clearTimeout(this.updateId);
    },

    // calls loopable's update at a regular interval and sends the elapsed time
    update: function() {
      if (this.isRunning()) {
        var currTime = this.getNow();

        this.loopable.update.call(this.loopable, (currTime - this.lastTime) / 1000);

        this.lastTime = currTime;

        // setTimeout has a minimum delay time of 4ms per the spec
        // let's keep it that way so we don't have any surprises
        timeToCall = Math.max(4, updateInterval - (this.getNow() - currTime));

        this.updateId = window.setTimeout(this.update.bind(this), timeToCall);
      }
    },

    render: function() {
      if (this.isRunning()) {
        window.requestAnimationFrame(this.render.bind(this));

        this.loopable.render.call(this.loopable);
      }
    },

    isRunning: function() {
      return this.running;
    },

    getNow: function() {
      return window.performance.now();
    }

  };

  return GameLoop;

})();