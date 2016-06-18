// This was my work before I was able to read the problem description. It's incomplete.
//function letterFrequency(str){
//  var freq = getLetterFrequencies(str);
//
//
//  // HOISTED HELPER FUNCTIONS
//  function getLetterFrequencies(str){
//    var freq = {};
//
//    for(var i = 0; i < str.length; i++){
//      freq[str[i]] = freq[str[i]] ? freq[str[i]] + 1 : 1;
//    }
//
//    return freq;
//  }
//
//  function findMostFrequent(freq){
//    var letters = Object.keys(freq);
//    var mostFrequent = null;
//    var highestFrequency = 0;
//
//    for(var i = 0; i < letters.length; i++){
//      if(freq[letters[i]] > highestFrequency){
//
//      }
//    }
//  }
//}

// Problem description: Write a function that takes as its input a string and returns an array of arrays as shown below
// sorted in descending order by frequency and then by ascending order by character.
function characterFrequency (string) {
  var frq = {};

  string.split('').forEach(lt => (frq[lt] = frq[lt] ? frq[lt] + 1 : 1));

  return Object.keys(frq) // get letters in string
      .map(lt => [lt, frq[lt]]) // get them into array form
.sort((a,b) => b[1] - a[1] || a[0].charCodeAt() - b[0].charCodeAt()); // sort
}