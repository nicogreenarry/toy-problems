'use strict';

function getCommands(field, power) {
  const side = Math.sqrt(field.length);
  const bestSoFar = { path: [], powerUsed: Infinity };
  let pathsConsidered = 0;
  const robby = {
    position: zToXy(field.indexOf('S'),side),
    orientation: [0,1], // as an x/y coordinate relative to the current position
    path: [],
    powerUsed: 0
  };
  const t = zToXy(field.indexOf('T'),side); // get xy coords of terminus
  // TODO: Optimizations that would decrease runtime:
    // If bestSoFar == best possible (will need to account for turns necessary), return bestSoFar. Probably have a "done"
      // variable, and each move function checks that first, and only continues if it's false.

  function move(robby, field){
    // END CONDITIONS --------------------------------------------------------------------------------------------------
    const distToT = getDist(robby.position, t).dist;
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
    const nextMoves = getNextMoves(robby, field); // Consider possible moves (i.e. directions Robby can move in)
    if(0 === nextMoves.length){ // If no possible moves
      pathsConsidered++;
      return;
    }
    // Recursively move in all directions (using a Move function), in descending order of likelihood. Move function:
    nextMoves.forEach(aMove => { // Optimizing: Is there a way I could break early by using a for loop?
      const turnCommands = getTurnsRequired(robby.orientation,aMove.direction);
      const newRobby = {
        position: aMove.newPosition,
        orientation: aMove.direction,
        powerUsed: robby.powerUsed + turnCommands.length + 1, // 1 for each turn or move forward
        path: robby.path.concat(turnCommands,'f') // turns and the move forward
      };

      // Set up the updated field for the next move: block off current(previous) place we were, so we don't backtrack
      const previousLocation = xyToZ(robby.position, side);
      const newField = field.slice(0,previousLocation).concat('#',field.slice(previousLocation+1)); // Block our current position so we don't return here in future paths

      move(newRobby,newField);
    });
  }

  move(robby, field);

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

  function getNextMoves(robby,field){
    const side = Math.sqrt(field.length);
    const moves = [];
    const moveDirections = [ [-1, 0], [0,1], [1,0], [0,-1] ];
    moveDirections.forEach(move => {
      const newPosition = [robby.position[0] + move[0], robby.position[1] + move[1]];
      const charAtNewPos = field[xyToZ(newPosition,side)];
      if(!validCoord(newPosition,side)) {return;}   // return if the new position falls outside the field
      if('#' === charAtNewPos) {return;}  // return if the new position is a block

      moves.push({newPosition: newPosition, direction: move});                 // push the new position if it's still a legal move
    });

    moves.sort((moveA,moveB) => {
      const slope = (t[1] - robby.position[1]) / (t[0] - robby.position[0]);
      //let

      return getDist(moveA.newPosition,t).dist - getDist(moveB.newPosition,t).dist;
    });

    return moves; // Array of objects like: {newPosition: [2,0], direction: [-1,0]}

    // TODO Identify likeliest candidate moves (i.e. the ones roughly in the direction of T)
    //  .sort((a,b) => { // TODO: Sort the moves according to which is the most likely to be promising
    //
    //});
  }

  function validCoord(xy,side){
    return !(xy[0] < 0 || xy[1] < 0
    || xy[0] > side-1 || xy[1] > side-1);
  }

  function getTurnsRequired(orientation,proposedMove){
    const orientationDeg = degreesFromXy(orientation); // get degrees of current orientation
    const moveDeg = degreesFromXy(proposedMove); // get degrees of current proposedMove
    const degChangeRequired = (moveDeg - orientationDeg + 360) % 360; // Calculate the turn angle required to make the proposed move; no negative values
    
    const turnCommandPossibilities = {
      0: [],
      90: ['l'],
      180: ['r','r'],
      270: ['r']
    };

    return turnCommandPossibilities[degChangeRequired];
  }

  function degreesFromXy(xy){
    if(xy.join(',') === '-1,0') {return 180;} // special case that isn't handled well by the math below

    return ((Math.atan(xy[1] / xy[0]) / (Math.PI*2) * 360)  // get degrees from the xy coordinates
            + 360) % 360                                    // convert it to positive (or 0) value under 360
  }
}

getCommands('................................................................###########.........#.........#.........#.#######.#.........#.#.......#.........#.#.#######.........#.#.#S.#............#.#.##.#............#.#....#............#.######............#...................###############........................................................................................................................T',400).join('');
getCommands(`T.#...#...#.#####........#####.S#...`, 27).join(''); // should return a path
getCommands('T.S.', 10).join(''); // 'f'
getCommands('S.......T', 10).join(''); // 'rffrff'
getCommands('S.......T', 5).join(''); // ''
getCommands('S#.##...T', 20).join(''); // ''
getCommands('.........S......######............#.......######......T.........', 100).join('');

//'rfffffrfflfffffrffflfffff' // what my function produces. Note that the first 'l' should be 'r'

//    ........
//    .S......  r
//    ######..
//    ........
//    ..#.....
//    ..######
//    ......T.
//    ........

//`T6#.7.
// #.2.#.
// #####3
// .7....
// 4#####
// .S#...`