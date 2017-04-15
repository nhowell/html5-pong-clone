// window.performance polyfill
(function() {

  "use strict";

  if (typeof window.performance === 'undefined') {
      window.performance = {};
  }
 
  if (!window.performance.now) {
    
    var startOffset = Date.now();
 
    if (performance.timing && performance.timing.navigationStart){
      startOffset = performance.timing.navigationStart
    }
 
 
    window.performance.now = function now(){
      return Date.now() - startOffset;
    }
 
  }

}());