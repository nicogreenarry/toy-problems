function anagramPosition (string) {
  function getFreqs(str) {
    return [...str].reduce((freqs, ltr) => {
      freqs[ltr] = freqs[ltr] ? freqs[ltr] + 1 : 1;
      return freqs;
    }, {});
  }

  function fact(n) {
    if (n <= 1) {
      return 1;
    }
    return n * fact(n - 1);
  }

  function perms(str) {
    const frequencies = getFreqs(str);
    const uniqueLetters = Object.keys(frequencies);
    const permutationsDenominator = uniqueLetters.reduce(
      (total, ltr) => total * fact(frequencies[ltr]),
      1);
    return fact(str.length) / permutationsDenominator;
  }

  function getEarlierLetterPositions(targetLtr, str) {
    return [...str].reduce((positions, ltr, i) => {
      if (targetLtr > ltr) {
        positions[ltr] = positions[ltr] === undefined ? i : positions[ltr]; // only save the earliest position
      }
      return positions;
    }, {});
  }

  let positionOfThisPermutation = 1;

  // Work backwards through `string` and calculate permutations as we go
  for (let i = string.length - 2; i >= 0; i--) {
    const earlierLetterPositions = getEarlierLetterPositions(string[i], string.slice(i + 1));
    const earlierLetters = Object.keys(earlierLetterPositions);
    if (earlierLetters.length) {
      earlierLetters.forEach(ltr => {
        const pos = earlierLetterPositions[ltr];
        let strRemaining = string.slice(i+1, i+1 + pos) + // segment up until the earlier letter
          string[i] + // the letter we're currently checking in the for loop, which is later than the 'earlier' letters
          string.slice(i+1 + pos + 1);
        positionOfThisPermutation += perms(strRemaining);
      });
    }
  }

  return positionOfThisPermutation;
}
/*
0  abdd 0
1  adbd 1
2  addb 1 + 1
3  badd 3
4  bdad 1 + 3
5  bdda 1 + 1 + 3
6  dabd 6
7  dadb 1 + 3 + 3
8  dbad 2 + 3 + 3
9  dbda 1 + 2 + 3 + 3
10 ddab 2 + 2 + 3 + 3
11 ddba 1 + 2 + 2 + 3 + 3

 0 mppt 0
 1 mptp 1
 2 mtpp 2 (not 2 + 2, for the permutations possible when switching the t with each of the p's)
 3 pmpt
 4 pmtp
 5 ppmt
 6 pptm
 7 ptmp
 8 ptpm
 9 tmpp
10 tpmp
11 tppm


 abbs
 absb
 asbb
 babs
 bbas
 bbsa
 bsab
 bsba

 1 abcd 0 out of order
 2 abdc d is 2nd; 1 perm possible after it
 3 acbd c out of order; it's 2nd possibility; 2 perms possible if it swaps with lower letter
 4 acdb 1 + 2 (d before b and c before b)
 5 adbc 2 + 2 (d before b and d before c, each of which could be in 2 positions)
 6 adcb 2 + 2 + 1 (above, plus c before b)
 7 bacd 6 (b could be switched with a, and bcd has 6 perms)
 8 badc
 9 bcad
 10 bcda
 11 bdac
 12 bdca

 bbbb 1
 bbba 4
 bbaa 6



 aabb
 abab
 abba
 baab
 baba
 bbaa

 a 1 = 1
 ab 2 = 1*2
 abc 6 = 1*2*3
 abcc = 3 + 3 + 6 = 12
 abcd 24 = 1*2*3*4 = n!


 // Optimizations:
 // Ignore the beginning of the string if it's alphabetized
 */