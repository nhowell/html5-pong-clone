var StateMachine = (function () {

  function StateMachine() {
    this.states = {};
    this.stack = [];
    this.top = null;
  }

  StateMachine.prototype = {

    top: function() {
      return this.stack[this.stack.length - 1];
    },

    update: function(elapsedTime) {
      this.top().update(elapsedTime);
    },

    render: function() {
      this.top().render();
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
      this.enter(this.top());
    },

    pop: function() {
      var state = this.stack.pop();
      this.exit(state);
    },

    enter: function(state) {
      state.onEnter();
    },

    exit: function(state) {
      state.onExit();
    }

  };

  return StateMachine;

})();