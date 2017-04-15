var Screen = (function() {

  "use strict";

  function Screen(canvas, maxWidth, maxHeight) {
    this.canvas = canvas;
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

    show: function() {
      this.canvas.style.display = "block";
    },

    hide: function() {
      this.canvas.style.display = "none";
    },

    resize: function() {
      var width, height;

      if (window.innerWidth / window.innerHeight > this.aspectRatio) {
        // window is wider than the aspect ratio
        height = Math.min(window.innerHeight, this.maxHeight);
        width = Math.round(height * this.aspectRatio);
      } else {
        // window is taller than the aspect ratio
        width = Math.min(window.innerWidth, this.maxWidth);
        height = Math.round(width / this.aspectRatio);
      }

      // only resize if changed (prevent a redraw on some browsers)
      if (this.canvas.width !== width || this.canvas.height !== height) {
        this.canvas.width = width;
        this.canvas.height = height;
      }
    },

    clear: function(color) {
      if (color === undefined) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      } else {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      }
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
      this.ctx.arc(this.transformX(x), this.transformY(y), this.transformX(r),
        sAngle, eAngle, counterclockwise);
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