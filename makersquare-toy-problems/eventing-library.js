var mixEvents = function(obj) {
  const events = {};

  obj.trigger = function (event, ...cbArgs) {
    if(events[event]){
      events[event].forEach(fn => fn.apply(null,cbArgs));
    }
  };

  obj.on = function (event, callback) {
    if(events[event]){ // If there's already a bucket for this particular event
      events[event].add(callback);
    }else{
      events[event] = new Set([callback]); // Set prevents fn being added twice
    }
  };
  return obj;
};