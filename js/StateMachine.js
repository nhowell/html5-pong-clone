var StateMachine = (function() {

  "use strict";

  function StateMachine() {
    this.states = {};
    this.stack = [];
  }

  StateMachine.prototype = {

    update: function(deltaTime) {
      this.top().update.call(this.top(), deltaTime);
    },

    render: function() {
      this.top().render.call(this.top());
    },

    add: function(name, state) {
      // ensure the name doesn't already exist
      if (this.states[name] === undefined) {
        this.states[name] = state;
        return true;
      } else {
        if (this.states[name] !== undefined)
          console.error("StateMachine: Couldn't add state '%s' because " +
                        "one by the same name already exists.", name);
      }
      return false;
    },

    remove: function(name) {
      // ensure this state exists and is not in the stack
      if (this.states[name] !== undefined &&
          this.stack.indexOf(this.states[name]) === -1) {
        delete this.states[name];
        return true;
      } else {
        if (this.states[name] === undefined)
          console.error("StateMachine: Couldn't remove state '%s' because " +
                        "it doesn't exist.", name);
        else if (this.stack.indexOf(this.states[name]) !== -1)
          console.error("StateMachine: Couldn't remove state '%s' because " +
                        "it's still in the stack.", name);
      }
      return false;
    },

    push: function(name) {
      // ensure this state exists and is not already in the stack
      if (this.states[name] !== undefined &&
          this.stack.indexOf(this.states[name]) === -1) {
        if (this.stack.length > 0) this.exit(this.top()); // exit the old top
        this.stack.push(this.states[name]);
        this.enter(this.top()); // enter the new top
        return true;
      } else {
        if (this.states[name] === undefined)
          console.error("StateMachine: Couldn't push state '%s' because " +
                        "it doesn't exist.", name);
        else if (this.stack.indexOf(this.states[name]) !== -1)
          console.error("StateMachine: Couldn't push state '%s' because " +
                        "it's already in the stack.", name);
      }
      return false;
    },

    pop: function() {
      if (this.stack.length > 0) {
        this.exit(this.stack.pop()); // exit the old top
        if (this.stack.length >= 1) this.enter(this.top()); // enter the new top
        return true;
      }
      return false;
    },
    
    top: function() {
      return this.stack[this.stack.length - 1];
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