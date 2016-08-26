function alphaCount (alphabet, text) {
  [alphabet, text] = [alphabet.toLowerCase(), text.toLowerCase()];
  const alphabetInventory = [...alphabet].reduce((inv, ltr) => {
    inv.order = inv[ltr] ? inv.order : inv.order + ltr;
    inv[ltr] = true;
    return inv;
  }, { order: '' });

  const textFreqs = [...text].reduce((inv, ltr) => {
    if (alphabetInventory[ltr]) {
      inv[ltr] = inv[ltr] ? inv[ltr] + 1 : 1;
    }
    return inv;
  }, {});

  return [...alphabetInventory.order].reduce((freqs, ltr) => {
      return textFreqs[ltr] ?
      freqs + `${ltr}:${textFreqs[ltr]},` :
        freqs;
    }, '').replace(/,$/,'') || 'no matches';
}
