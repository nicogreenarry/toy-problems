'use strict';

function getCommands(field, power) {
  const side = Math.sqrt(field.length);
  const bestSoFar = {
    path: [],
    power: 0
  };
  const robby = {
    position: zToXy(field.indexOf('S'),side),
    orientation: 0 // 0 == north, 1 == east, 2 == south, 3 == west
  }
  const t = zToXy(field.indexOf('T'),side); // get xy coords of terminus

}

function xyToZ(x,y,side){
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

//for(let i = 0; i < 9; i++){
//  console.log(zToXy(i,9));
//}