// window.performance polyfill
(function() {

  if (!window.performance) {
    var perf = window.performance;

    // window.performance.now 
    if (!perf.now) {
      var startTime = Date.now();

      perf.now = function() {
        console.log("called");
        return Date.now() - startTime;
      };
    }
  }

}());