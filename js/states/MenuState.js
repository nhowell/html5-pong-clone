var MenuState = (function() {

  "use strict";

  function MenuState(renderTarget) {
    this.screen = renderTarget;
  }

  MenuState.prototype = {

    update: function(deltaTime) {

    },

    render: function() {
      this.screen.clear("#262626");
    },

    onEnter: function() {
      // nothing yet
    },

    onExit: function() {
      // nothing yet
    }

  };

  return MenuState;

})();
