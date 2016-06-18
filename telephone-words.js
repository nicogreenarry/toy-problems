function telephoneWords (digitString) {
  const ltrs = {
    0: ['0'],
    1: ['1'],
    2: ['A','B','C'],
    3: ['D','E','F'],
    4: ['G','H','I'],
    5: ['J','K','L'],
    6: ['M','N','O'],
    7: ['P','Q','R','S'],
    8: ['T','U','V'],
    9: ['W','X','Y','Z']
  };

  return recurse();

  function recurse(combos=['']){
    const i = combos[0].length;
    if(i === digitString.length){ return combos;} // We're done!

    return recurse(
      combos.reduce((combos, combo) => combos.concat(nextStep(combo,digitString[i])), [])
    );
  }

  function nextStep(str,digit){
    return ltrs[digit].reduce((combos,ltr) => combos.concat(str+ltr),[]);
  }
}