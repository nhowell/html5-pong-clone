var Button = (function() {

  "use strict";

  function Button(x, y, width, height) {

  }

  Button.prototype = {

    setControls: function(controls, gameControls) {
      this.gameControls = gameControls;

      for (var c in controls) {
        this.controls[c] = this.controls[c].concat(controls[c]);
      }
    },

    update: function(deltaTime) {

    },

    render: function(screen) {
      screen.fillStyle("#f00");
      screen.fillRect(this.x, this.y, this.w, this.h);
    }

  };

  return Button;

})();
