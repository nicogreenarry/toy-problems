/*
 Write a function called validBraces that takes a string of braces, and determines if the order of the braces is valid. validBraces should return true if the string is valid, and false if it's invalid.

 This Kata is similar to the Valid Parentheses Kata, but introduces four new characters. Open and closed brackets, and open and closed curly braces. Thanks to @arnedag for the idea!

 All input strings will be nonempty, and will only consist of open parentheses '(' , closed parentheses ')', open brackets '[', closed brackets ']', open curly braces '{' and closed curly braces '}'.

 What is considered Valid? A string of braces is considered valid if all braces are matched with the correct brace.
 For example:
 '(){}[]' and '([{}])' would be considered valid, while '(}', '[(])', and '[({})](]' would be considered invalid.

 Examples:
 validBraces( "(){}[]" ) => returns true
 validBraces( "(}" ) => returns false
 validBraces( "[(])" ) => returns false
 validBraces( "([{}])" ) => returns true

 */

const pairs = {'(': ')', '{': '}', '[': ']'};
function isOpen(char){
  return '(' === char || '{' === char || '[' === char;
}

function validBraces(str, stillOpen=''){
  if('' === str && '' === stillOpen) {return true;}
  if(str[0] === pairs[stillOpen.slice(-1)]){
    return validBraces(str.slice(1),stillOpen.slice(0,-1));
  }else if(isOpen(str[0])){
    return validBraces(str.slice(1),stillOpen + str[0]);
  }

  return false; // we must have encountered a closing brace when we weren't supposed to, or the string ended and we
  // still had unbalanced opening braces
}

//function validBraces(str) {
//  let lastOpen = null;
//  const count = {'(': 0, '{': 0, '[': 0}
//  for(let char of str){
//
//
//  }
//}


//
//
//  if(!(str.length % 0)) {return false;} // If the string isn't an even number of characters, return false
