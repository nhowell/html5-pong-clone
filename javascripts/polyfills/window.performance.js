// window.performance polyfill
(function() {

  "use strict";

  if (!window.performance) {
    var perf = window.performance;

    // window.performance.now 
    if (!perf.now) {
      var startTime = Date.now();

      perf.now = function() {
        return Date.now() - startTime;
      };
    }
  }

}());