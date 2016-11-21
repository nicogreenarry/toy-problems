const Sudoku = function(data) {
  const n = data.length;
  const isMatrixOfIntegers = () => {
    if (data.some(row => !Array.isArray(row))) { // check if each element of data is an array
      return false;
    }
    // Check if each row contains integers and nothing but integers
    if (!data.every(row => row.every(el => (typeof el === 'number' && el % 1 === 0)))) {
      return false;
    }
    return true;
  };
  const isSquare = () => (data.map(row => row.length).every(length => length === n));
  const hasSquareLength = () => (Math.sqrt(n) % 1 === 0);
  const setIsValid = (set) => {
    const usedAlready = {};
    return set.every(num => {
      if (!(num >= 1 && num <= n)) {
        return false;
      }
      if (usedAlready[num]) {
        return false;
      }
      return usedAlready[num] = true;
    });
  }
  const hasValidRows = () => data.every(row => setIsValid(row));
  const hasValidColumns = () => (
    data
      .map((row, i) => (data.map(row => row[i])))
      .every(column => setIsValid(column))
  );
  const hasValidPanels = () => {
    const panelLength = Math.sqrt(n);
    for (var i = 0; i < panelLength; i++) { // panel rows
      const rowStart = i * panelLength;
      const rows = data.slice(rowStart, rowStart + panelLength);
      for (var j = 0; j < panelLength; j++) { // panel columns
        const columnStart = j * panelLength;
        const panel = rows.map(row => row.slice(columnStart, columnStart + panelLength))
          .reduce((a, b) => [...a, ...b]);
        if (!setIsValid(panel)) {
          return false;
        }
      }
    }
    return true;
  };

  return {
    isValid: function() {
      return [
        isMatrixOfIntegers,
        isSquare,
        hasSquareLength,
        hasValidRows,
        hasValidColumns,
        hasValidPanels,
      ]
        .every(fn => fn());
    }
  };
};

var goodSudoku1 = new Sudoku([
  [7,8,4, 1,5,9, 3,2,6],
  [5,3,9, 6,7,2, 8,4,1],
  [6,1,2, 4,3,8, 7,5,9],

  [9,2,8, 7,1,5, 4,6,3],
  [3,5,7, 8,4,6, 1,9,2],
  [4,6,1, 9,2,3, 5,8,7],

  [8,7,6, 3,9,4, 2,1,5],
  [2,4,3, 5,6,1, 9,7,8],
  [1,9,5, 2,8,7, 6,3,4]
]);

var goodSudoku2 = new Sudoku([
  [1,4, 2,3],
  [3,2, 4,1],

  [4,1, 3,2],
  [2,3, 1,4]
]);

var badSudoku1 = new Sudoku([
  [1,2,3, 4,5,6, 7,8,9],
  [1,2,3, 4,5,6, 7,8,9],
  [1,2,3, 4,5,6, 7,8,9],

  [1,2,3, 4,5,6, 7,8,9],
  [1,2,3, 4,5,6, 7,8,9],
  [1,2,3, 4,5,6, 7,8,9],

  [1,2,3, 4,5,6, 7,8,9],
  [1,2,3, 4,5,6, 7,8,9],
  [1,2,3, 4,5,6, 7,8,9]
]);

var badSudoku2 = new Sudoku([
  [1,2,3,4,5],
  [1,2,3,4],
  [1,2,3,4],
  [1]
]);

console.log(
  goodSudoku1.isValid(),
  goodSudoku2.isValid(),
  badSudoku1.isValid(),
  badSudoku2.isValid()
);