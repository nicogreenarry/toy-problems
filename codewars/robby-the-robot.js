'use strict';

function getCommands(field, power) {
  const side = Math.sqrt(field.length);
  const bestSoFar = { path: [], power: 0 };
  const robby = {
    pos: zToXy(field.indexOf('S'),side),
    orientation: 0 // 0 == north, 1 == east, 2 == south, 3 == west,
    path: [],
    powerUsed: 0
  }
  const t = zToXy(field.indexOf('T'),side); // get xy coords of terminus

  field[xyToZ(robby.pos, side)] = '#'; // Block our current position so we don't return here in future paths

  // Consider possible moves (i.e. directions Robby can move in)
  const nextMoves = getNextMoves(robby.pos, field);
  // Recursively move in all directions (using a Move function), in descending order of likelihood. Move function:
    // Params:
      // new Robby (use Object.assign to create a clone - does it return anything?)
      // pass in new field with former location blocked off
    // Are we blocked in all directions? If so, return empty array
    // Compare current best path to best case possible; if current power used + power required for best case >= current best path, return []
    // If we have arrived, save the bestSoFar info
      // If bestSoFar == best possible (will need to account for turns necessary), return bestSoFar.
    // Should have a chooseBestPath function; when recursing through multiple paths,
}

function xyToZ(x,y,side){
  if(Array.isArray(x)){ // User may submit coords as a single array rather than two separate params
    [x, y, side] = x[0], x[1], y;
  }
  return x + (side - y - 1) * side; // 'z' coordinate, i.e. the coordinate on the input string
}

function zToXy(z,side){
  return [z % side, // x coordinate
    side - Math.floor(z/side) - 1]; // y coordinate
}

// TODO: Optimize by incorporating current orientation into this function - i.e. get energy required to get from point A to point B
function getDist(startXy,endXy){
  return Math.abs(endXy[0] - startXy[0])
    + Math.abs(endXy[1] - startXy[1]);
}

function getNextMoves(pos,field){
  const moves = [];
  [[-1, 0],[0,1],[1,0],[0,-1]].forEach(move => {
    const newPos = [pos[0] + newPos[0], pos[1] + newPos[1]];
    const charAtNewPos = field[xyToZ(newPos)];
    if(!validCoord(newPos)) {return;}   // return if the new position falls outside the field
    if('#' === charAtNewPos) {return;}  // return if the new position is a block

    moves.push(newPos);                 // push the new position if it's still a legal move
  });
  return moves;

  // TODO Identify likeliest candidate moves (i.e. the ones roughly in the direction of T)
  //  .sort((a,b) => { // TODO: Sort the moves according to which is the most likely to be promising
  //
  //});
}

function validCoord(x,y,side){
  return !(x < 0 || y < 0
            || x > side-1 || y > side-1);
}
//for(let i = 0; i < 9; i++){
//  console.log(zToXy(i,9));
//}