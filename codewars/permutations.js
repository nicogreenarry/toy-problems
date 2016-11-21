// https://www.codewars.com/kata/permutations/train/javascript

function permutations(string) {
  if (string.length === 1) {
    return [string];
  }
  const used = {};
  return [...string].reduce((perms, char, i) => {
    if (used[char]) {
      return perms;
    }
    used[char] = true;
    return [
      ...perms,
      ...permutations(string.slice(0,i) + string.slice(i+1)).map(str => char + str),
    ];
  }, []);
}

console.log(permutations('abc'));