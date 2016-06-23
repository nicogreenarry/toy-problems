'use strict';

function validSolution(board){
  for(let row of board){
    if(!validateCells(row)) {
      //console.log('row: ',row);
      return false;}
  }
  for(let i = 0; i < 9; i++){
    let column = [board[0][i], board[1][i], board[2][i], board[3][i], board[4][i], board[5][i], board[6][i],
      board[7][i], board[8][i]];
    //console.log(board[0], board[1]);
    if(!validateCells(column)) {
      //console.log('column: ',column);
      return false;}
  }
  for(let i = 0; i < 9; i += 3){    // rows
    for(let j = 0; j < 9; j += 3) { // columns
      let block = [board[i][j],   board[i][j+1],   board[i][j+2],
        board[i+1][j], board[i+1][j+1], board[i+1][j+2],
        board[i+2][j], board[i+2][j+1], board[i+2][j+2]];
      if (!validateCells(block)) {
        //console.log('block: ',block);
        return false;}
    }
  }

  return true;

  function validateCells(arr){
    return arr.slice().sort().join('') === '123456789';
  }
}

console.log(validSolution([[5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]]));