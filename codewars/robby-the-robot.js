'use strict';

function getCommands(field, power) {
  console.log(field, power);
  const side = Math.sqrt(field.length);
  const bestSoFar = { path: [], powerUsed: Infinity };
  let pathsConsidered = 0;
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
    debugger;
    // END CONDITIONS --------------------------------------------------------------------------------------------------
    const distToT = getDist(robby.pos, t).dist;
    if(0 === distToT){ // We reached Terminus!
      if(bestSoFar.powerUsed > robby.powerUsed){ // If we found a superior path than the previous best path
        bestSoFar.path = robby.path;
        bestSoFar.powerUsed = robby.powerUsed;
        pathsConsidered++;
      }
      return;
    }
    if(robby.powerUsed + distToT >= Math.min(power+1, bestSoFar.powerUsed)){ // If the power used + distance remaining > either available power or best path recorded, then return early
      // TODO: I should incorporate the minimum energy required for turns into the left side of the if conditional; will probably need helper function for that
      pathsConsidered++;
      return;
    }

    // IF NO END CONDITIONS, RECURSIVELY CONSIDER NEXT MOVES -----------------------------------------------------------
    const nextMoves = getNextMoves(robby.pos, field); // Consider possible moves (i.e. directions Robby can move in)
    if(0 === nextMoves.length){ // If no possible moves
      pathsConsidered++;
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
      const previousLocation = xyToZ(robby.pos, side);
      const newField = field.slice(0,previousLocation).concat('#',field.slice(previousLocation+1)); // Block our current position so we don't return here in future paths

      move(newRobby,newField);
    });
  }

  move(robby, field);

  console.log(`Considered ${pathsConsidered} paths.`);
  return bestSoFar.path;

  // HELPER FUNCTIONS --------------------------------------------------------------------------------------------------
  function xyToZ(xy,side){
    return xy[0] + (side - xy[1] - 1) * side; // 'z' coordinate, i.e. the coordinate on the input string
  }

  function zToXy(z,side){
    return [z % side, // x coordinate
      side - Math.floor(z/side) - 1]; // y coordinate
  }

// TODO: Optimize by incorporating current orientation into this function - i.e. get energy required to get from point A to point B
  function getDist(startXy,endXy){
    return {
      dist: Math.abs(endXy[0] - startXy[0])   +    Math.abs(endXy[1] - startXy[1]),
      steps: [endXy[0] - startXy[0]  ,   endXy[1] - startXy[1]]
    };
  }

  function getNextMoves(pos,field){
    const side = Math.sqrt(field.length);
    const moves = [];
    const moveDirections = [
      {posChange: [-1, 0], direction: '3'},
      {posChange: [0,1], direction: '0'},
      {posChange: [1,0], direction: '1'},
      {posChange: [0,-1], direction: '2'}
    ];
    moveDirections.forEach(move => {
      const newPos = [pos[0] + move.posChange[0], pos[1] + move.posChange[1]];
      const charAtNewPos = field[xyToZ(newPos,side)];
      if(!validCoord(newPos,side)) {return;}   // return if the new position falls outside the field
      if('#' === charAtNewPos) {return;}  // return if the new position is a block

      moves.push({newPos: newPos, direction: move.direction});                 // push the new position if it's still a legal move
    });

    moves.sort((moveA,moveB) => getDist(moveA.newPos,t).dist - getDist(moveB.newPos,t).dist);

    return moves;

    // TODO Identify likeliest candidate moves (i.e. the ones roughly in the direction of T)
    //  .sort((a,b) => { // TODO: Sort the moves according to which is the most likely to be promising
    //
    //});
  }

  function validCoord(xy,side){
    return !(xy[0] < 0 || xy[1] < 0
    || xy[0] > side-1 || xy[1] > side-1);
  }
}

console.log(getCommands('................................................................###########.........#.........#.........#.#######.#.........#.#.......#.........#.#.#######.........#.#.#S.#............#.#.##.#............#.#....#............#.######............#...................###############........................................................................................................................T',400).join(''));
//console.log(getCommands(`T.#...
//                         #...#.
//                         #####.
//                         ......
//                         .#####
//                         .S#...`, 27).join('')); // should return a path

//`T6#.7.
// #.2.#.
// #####3
// .7....
// 4#####
// .S#...`