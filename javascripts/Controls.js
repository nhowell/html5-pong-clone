var Controls = (function () {

  var validKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    65: "a",
    68: "d",
    83: "s",
    87: "w"
  }

  function Controls() {
    this.activeList = [];

    window.onkeydown = this.handleKeydown.bind(this);
    window.onkeyup = this.handleKeyup.bind(this);
  }

  Controls.prototype = {

    handleKeydown: function(e) {
      var code = e.which ? e.which : e.keyCode;

      if (code in validKeys) {
        if (!this.active(code)) {
          this.activeList.push(validKeys[code]);
        }
      }
    },

    handleKeyup: function(e) {
      var code = e.which ? e.which : e.keyCode;

      if (code in validKeys) {
        if (this.active(code)) {
          this.activeList.splice(this.activeList.indexOf(validKeys[code]), 1);
        }
      }
    },

    addTouchListeners: function(ids) {
      for (var i = 0; i < ids.length; i++) {
        var el = document.getElementById(ids[i]);
        el.addEventListener("touchstart", this.handleStart.bind(this), false);
        el.addEventListener("touchend", this.handleEnd.bind(this), false);
        el.addEventListener("touchleave", this.handleEnd.bind(this), false);
        el.addEventListener("touchcancel", this.handleEnd.bind(this), false);
      }
    },

    handleStart: function(e) {
      this.activeList.push(e.target.id);
    },

    handleEnd: function(e) {
      if (this.active(e.target.id)) {
        this.activeList.splice(this.activeList.indexOf(e.target.id), 1);
      }
    },

    active: function(control) {
      // allow the passing in of a key code
      if (typeof control === "number") {
        control = validKeys[control];
      }

      if (this.activeList.indexOf(control) !== -1) {
        return true;
      } else {
        return false;
      }
    }

  };

  return Controls;

})();