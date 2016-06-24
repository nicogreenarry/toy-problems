// Problem description: Write a function that takes as its input a string and returns an array of arrays as shown below
// sorted in descending order by frequency and then by ascending order by character.
function characterFrequency (string) {
  var frq = {};

  string.split('').forEach(lt => (frq[lt] = frq[lt] ? frq[lt] + 1 : 1));

  return Object.keys(frq) // get letters in string
      .map(lt => [lt, frq[lt]]) // get them into array form
.sort((a,b) => b[1] - a[1] || a[0].charCodeAt() - b[0].charCodeAt()); // sort
}