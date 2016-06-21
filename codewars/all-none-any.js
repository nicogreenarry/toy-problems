/*
 As a part of this Kata, you need to create three functions that one needs to be able to call upon an array:

 all

 This function returns true only if the predicate supplied returns true for all the items in the array

 [1, 2, 3].all(isGreaterThanZero) => true
 [-1, 0, 2].all(isGreaterThanZero) => false
 none

 This function returns true only if the predicate supplied returns false for all the items in the array

 [-1, 2, 3].none(isLessThanZero) => false
 [-1, -2, -3].none(isGreaterThanZero) => true
 any

 This function returns true if at least one of the items in the array returns true for the predicate supplied
 */

Array.prototype.all = function (p) {
  for(let el of this){
    if(!p(el)) {return false;}
  }
  return true;
};

Array.prototype.none = function (p) {
  for(let el of this){
    if(p(el)) {return false;}
  }
  return true;
};

Array.prototype.any = function (p) {
  for(let el of this){
    if(p(el)) {return true;}
  }
  return false;
};