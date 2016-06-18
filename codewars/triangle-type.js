/* Should return ᐃ type:
 0 : if ᐃ cannot be made with given sides
 1 : acute ᐃ
 2 : right ᐃ
 3 : obtuse ᐃ
 */
function triangleType(a, b, c){
  const [x, y, z] = [...arguments].sort((a,b) => a - b); // assign vars in ascending order

  if(z >= x + y) { // Invalid triangle if the longest side is half or greater all the lengths
    return 0;
  }

  const hypotenuse = Math.sqrt(x*x + y*y); // If x and y were sides of a right triangle, what would the hypotenuse be?

  if(z === hypotenuse) {return 2;}
  if(z > hypotenuse) { return 3;}
  return 1; // z must be less than hypotenuse, meaning an acute triangle
}