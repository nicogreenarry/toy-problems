function cache(func) {
  var cache = {};

  return function(){
    var argStr = JSON.stringify(arguments);

    if(cache.hasOwnProperty(argStr)) {return cache[argStr];} // If we found the result in the cache, return it

    return cache[argStr] = func(...arguments); // else calculate the result, cache it, and return the result
  }
}