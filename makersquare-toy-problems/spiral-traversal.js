/*
 Write a function that accepts a 2-dimensional array (that is, an array containing many same-length arrays),
 and prints out every value found, but in a spiral from the upper left in to the center.

 Examples
 Input	Output
 matrix:
 [ [ 1, 2, 3, 4, 5 ], [ 6, 7, 8, 9, 10 ], [ 11, 12, 13, 14, 15 ], [ 16, 17, 18, 19, 20 ], [ 21, 22, 23, 24, 25 ] ]	[ 1, 2, 3, 4, 5, 10, 15, 20, 25, 24, 23, 22, 21, 16, 11, 6, 7, 8, 9, 14, 19, 18, 17, 12, 13 ]
 matrix:
 [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ], [ 10, 11, 12 ], [ 13, 14, 15 ], [ 16, 17, 18 ], [ 19, 20, 21 ], [ 22, 23, 24 ] ]	[ 1, 2, 3, 6, 9, 12, 15, 18, 21, 24, 23, 22, 19, 16, 13, 10, 7, 4, 5, 8, 11, 14, 17, 20 ]
 matrix:
 [ [ 1 ], [ 2 ], [ 3 ], [ 4 ] ]	[ 1, 2, 3, 4 ]
 matrix:
 [ [ 1, 2, 3, 4, 5, 6, 7 ] ]	[ 1, 2, 3, 4, 5, 6, 7 ]

 */

'use strict';

function spiralTraversal (matrix) {
  if(1 === matrix.length) {return matrix[0];} // edge case - just a single nested array
  const width = matrix[0].length;
  const height = matrix.length;
  const flattened = [...matrix[0]]; // Grab the top row
  const bounds = { // Inclusive bounds
    x: [0, width-1],
    y: [1, height-1]
  };
  let direction = [0,1]; // An x/y coordinate
  let curr = [width-1, 1]; // current coordinate

  for(let i = width-1; i < height*width-1; i++){
    flattened.push(matrix[curr[1]][curr[0]]); // push current coordinate into results array
    direction = getNewDirection(curr);
    curr = [curr[0] + direction[0], curr[1] + direction[1]];
  }

  return flattened;

  function getNewDirection(curr){
    if(curr[0] + direction[0] < bounds.x[0]) {
      bounds.y[1]--;
      return [0,-1];
    }
    if(curr[0] + direction[0] > bounds.x[1]) {
      bounds.y[0]++;
      return [0,1];
    }
    if(curr[1] + direction[1] < bounds.y[0]) {
      bounds.x[0]++;
      return [1,0];
    }
    if(curr[1] + direction[1] > bounds.y[1]) {
      bounds.x[1]--;
      return [-1,0];
    }
    return direction;
  }
}