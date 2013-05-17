var Screen = (function () {

  function Screen(id, maxWidth, maxHeight) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");

    // only do resizing if max dimensions are provided
    // otherwise we're assuming you want a fixed size
    if (maxWidth !== undefined && maxHeight !== undefined) {
      this.maxWidth = maxWidth;
      this.maxHeight = maxHeight;
      this.aspectRatio = maxWidth / maxHeight;

      this.resize(); // force an initial resize
      window.onresize = this.resize.bind(this);
    }
  }

  Screen.prototype = {

    resize: function () {
      var width, height;

      if (window.innerWidth / window.innerHeight > this.aspectRatio) {
        // window is wider than the aspect ratio
        height = Math.min(window.innerHeight, this.maxHeight);
        width = height * this.aspectRatio;
      } else {
        // window is taller than the aspect ratio
        width = Math.min(window.innerWidth, this.maxWidth);
        height = width / this.aspectRatio;
      }

      this.canvas.width = width;
      this.canvas.height = height;
    },

    clear: function() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    fillStyle: function(style) {
      this.ctx.fillStyle = style;
    },

    fillRect: function(x, y, w, h) {
      var newX = this.transformX(x);
      var newY = this.transformY(y);
      var newW = this.transformX(w);
      var newH = this.transformY(h);
      this.ctx.fillRect(newX, newY, newW, newH);
    },

    beginPath: function() {
      this.ctx.beginPath();
    },

    arc: function(x, y, r, sAngle, eAngle, counterclockwise) {
      this.ctx.arc(this.transformX(x), this.transformY(y), this.transformX(r), sAngle, eAngle, counterclockwise);
    },

    fill: function() {
      this.ctx.fill();
    },

    font: function(style, size, font) {
      this.ctx.font = style + " " + this.transformY(size) + "px " + font;
    },

    textAlign: function(pos) {
      this.ctx.textAlign = pos;
    },

    fillText: function(text, x, y) {
      this.ctx.fillText(text, this.transformX(x), this.transformY(y));
    },

    transformX: function(x) {
      var ratio = this.canvas.width / this.maxWidth;

      return Math.round(x * ratio);
    },

    transformY: function(y) {
      var ratio = this.canvas.height / this.maxHeight;

      return Math.round(y * ratio);
    },

  };

  return Screen;

})();