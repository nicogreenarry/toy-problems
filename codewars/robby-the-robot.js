'use strict';

function getCommands(field, power) {
  const side = Math.sqrt(field.length);
  const bestSoFar = { path: [], powerUsed: 0 };
  const robby = {
    pos: zToXy(field.indexOf('S'),side),
    orientation: 0, // 0 == north, 1 == east, 2 == south, 3 == west,
    path: [],
    powerUsed: 0
  };
  const t = zToXy(field.indexOf('T'),side); // get xy coords of terminus
  // TODO: Optimizations that would decrease runtime:
    // If bestSoFar == best possible (will need to account for turns necessary), return bestSoFar. Probably have a "done"
      // variable, and each move function checks that first, and only continues if it's false.

  function move(robby, field){
    // END CONDITIONS --------------------------------------------------------------------------------------------------
    const distToT = getDist(robby.pos, t);
    if(0 === distToT){ // We reached Terminus!
      if(bestSoFar.path.length && (bestSoFar.path.length > robby.path)){ // If bestSoFar.path isn't an empty array, and we found a superior path
        bestSoFar.path = robby.path;
        bestSoFar.powerUsed = robby.powerUsed;
      }
      return;
    }
    if(robby.powerUsed + distToT >= Math.min(power, bestSoFar.powerUsed)){ // If the power used + distance remaining > either available power or best path recorded, then return early
      // TODO: I should incorporate the minimum energy required for turns into the left side of the if conditional; will probably need helper function for that
      return;
    }

    // IF NO END CONDITIONS, RECURSIVELY CONSIDER NEXT MOVES -----------------------------------------------------------
    const nextMoves = getNextMoves(robby.pos, field); // Consider possible moves (i.e. directions Robby can move in)
    if(0 === nextMoves.length){ // If no possible moves
      return;
    }
    // Recursively move in all directions (using a Move function), in descending order of likelihood. Move function:
    nextMoves.forEach(aMove => { // Optimizing: Is there a way I could break early by using a for loop?
      const orientationChange = Math.abs(robby.orientation - aMove.direction); // e.g. abs(0 (north) - 2 (south)) --> 2
      const relativeDirectionToTurns = {0: [], 1: ['r'], 2: ['r', 'r'], 3: ['l']};
      const newRobby = {
        pos: aMove.newPos,
        orientation: aMove.direction,
        powerUsed: robby.powerUsed + orientationChange + 1, // The 1 is for the move forward
        path: robby.path.concat(
          relativeDirectionToTurns[(aMove.direction - robby.orientation + 4) % 4], // concat the turns required
          'f' // ...and the move forward
        )
      };

      // Set up the updated field for the next move: block off current(previous) place we were, so we don't backtrack
      const newField = field.slice();
      newField[xyToZ(robby.pos, side)] = '#'; // Block our current position so we don't return here in future paths

      move(newRobby,newField);
    });

  }

  move(robby, field);

  return bestSoFar.path;
}

function xyToZ(x,y,side){
  if(Array.isArray(x)){ // User may submit coords as a single array rather than two separate params
    side = y;
    y = x[1];
    x = x[0];
    // [x, y, side] = [x[0], x[1], y];
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

console.log('Path: ' + getCommands('T.S.', 10).join(''));      // 'f'
console.log('Path: ' + getCommands('S.......T', 10).join('')); // 'rffrff'
console.log('Path: ' + getCommands('S.......T', 5).join(''));  // ''
console.log('Path: ' + getCommands('S#.##...T', 20).join('')); // ''