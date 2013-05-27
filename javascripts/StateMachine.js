var StateMachine = (function() {

  "use strict";

  function StateMachine() {
    this.states = {};
    this.stack = [];

    this.top = null;
  }

  StateMachine.prototype = {

    update: function(deltaTime) {
      this.top.update.call(this.top, deltaTime);
    },

    render: function() {
      this.top.render.call(this.top);
    },

    add: function(name, state) {
      // TODO: should check to make sure the name doesn't already exist
      this.states[name] = state;
    },

    remove: function(name) {
      // TODO: should check to make sure this state is not in the stack
      delete this.states[name];
    },

    push: function(name) {
      // TODO: should check to make sure this state is not already in the stack
      this.stack.push(this.states[name]);
      this.top = this.stack[this.stack.length - 1];
      this.enter(this.top);
    },

    pop: function() {
      var state = this.stack.pop();
      this.top = this.stack[this.stack.length - 1];
      this.exit(state);
    },

    enter: function(state) {
      state.onEnter.call(state);
    },

    exit: function(state) {
      state.onExit.call(state);
    }

  };

  return StateMachine;

})();