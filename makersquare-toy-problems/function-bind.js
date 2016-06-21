// Implement the function ‘bind’, which accepts a function and a context as arguments. The context argument should
// override an existing context that the function is defined in. Your bind function should return the passed in
// function.



var bind = function(func, context,...theRest){
  return function(){
    console.log('invoked returned function');
    if(null === context){
      return func(...theRest, ...arguments);
    }
    context.func = func;
    return context.func(...theRest, ...arguments);
  }
};

Function.prototype.bind = function(context, ...theRest) {
  return bind(this, context, ...theRest);
};


var alice = {
  name: 'alice',
  shout: function () {
    console.log('here comes' + ' ' + this.name);
  }
};

console.log('test')
alice.shout(); //=> 'here comes alice'

boundShout = bind(alice.shout, { name: 'bob' })

boundShout();