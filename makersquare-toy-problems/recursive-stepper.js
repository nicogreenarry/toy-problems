/* Write a function to solve the following problem:
     A robot can move (step) in 4 directions: north, west, south, and east (N,W,S,E)
     Use recursion to output all permutations of directions the robot can make in 3 moves
     As an example of the expected output for 2 moves, the robot can go:
      * NN, NW, NS, NE, WN, WW, WS, WE, SN, SW, SS, SE, EN, EW, ES, EE
     The expected output for 3 moves would start something like this:
      * NNN, NNW, NNS, ….
 */

function stepper(rounds){
  var dirs = ['N','W','S','E'];

  function recurse (plays=['']) {
    if(plays[0].length === rounds){return plays;}
    return recurse(plays.reduce((plays,play) => [...plays, play+'N', play+'W', play+'S', play+'E'],[]));
  };

  return recurse();
}

//var dirs = ['N','W','S','E'];
//function stepper(plays=['']){
//  if(plays[0].length === rounds){return plays;}
//  for(var i=0; i<dirs.length; i++){
//
//  }
//
//
//  function recurse (plays=['']) {
//    return recurse(plays
//        .map(path => dirs.map(d => path+d))
//  .);
//  };
//
//  return recurse();
//}

console.log(stepper(0));