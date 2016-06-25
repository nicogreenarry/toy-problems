'use strict';

function getCommands(field, power) {
  const side = Math.sqrt(field.length);
  const bestSoFar = { path: [], power: 0 };
  const robby = {
    pos: zToXy(field.indexOf('S'),side),
    orientation: 0, // 0 == north, 1 == east, 2 == south, 3 == west,
    path: [],
    powerUsed: 0
  };
  //const t = zToXy(field.indexOf('T'),side); // get xy coords of terminus

  function move(robby, field){
    // Consider possible moves (i.e. directions Robby can move in)
    const nextMoves = getNextMoves(robby.pos, field);
    if(0 === nextMoves.length){ // If no possible moves
      return [];
    }
    // Recursively move in all directions (using a Move function), in descending order of likelihood. Move function:
    nextMoves.forEach(move => { // Optimizing: Is there a way I could break early by using a for loop?
      const orientationChange = Math.abs(robby.orientation - move.direction); // e.g. abs(0 (north) - 2 (south)) --> 2
      
      let turnsRequired;
      if(!orientationChange){
        turnsRequired = [];
      }else{
        turnsRequired =
      }
      const newRobby = {
        pos: move.newPos,
        orientation: move.direction,
        powerUsed: robby.powerUsed + orientationChange + 1 // The 1 is for the move forward
      };
      newRobby.path = robby.path.concat(
        ( 'f').split(',')
      )

      // determine orientation change required; increment powerUsed accordingly
      // Update orientation and position
      // Params:
        // pass in new field with former location blocked off
      // Are we blocked in all directions? If so, return empty array
      // Compare current best path to best case possible; if current power used + power required for best case >= current best path, return []
      // If we have arrived, save the bestSoFar info
        // If bestSoFar == best possible (will need to account for turns necessary), return bestSoFar.
      // Should have a chooseBestPath function; when recursing through multiple paths,


      const newField = field.slice();
      newField[xyToZ(robby.pos, side)] = '#'; // Block our current position so we don't return here in future paths


    });

  }

  move(robby, field);

  return bestSoFar.path;
}

function xyToZ(x,y,side){
  if(Array.isArray(x)){ // User may submit coords as a single array rather than two separate params
    [x, y, side] = [x[0], x[1], y];
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
  const moveDirections = [
    {posChange: [-1, 0], direction: '3'},
    {posChange: [0,1], direction: '0'},
    {posChange: [1,0], direction: '1'},
    {posChange: [0,-1], direction: '2'}
  ];
  moveDirections.forEach(move => {
    const newPos = [pos[0] + move.posChange[0], pos[1] + move.posChange[1]];
    const charAtNewPos = field[xyToZ(newPos)];
    if(!validCoord(newPos)) {return;}   // return if the new position falls outside the field
    if('#' === charAtNewPos) {return;}  // return if the new position is a block

    moves.push({newPos: newPos, direction: move.direction});                 // push the new position if it's still a legal move
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