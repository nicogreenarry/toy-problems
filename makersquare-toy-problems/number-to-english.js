// HELPER OBJECTS PROVIDED TO US
var numbersToWords = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen',
  20: 'twenty',
  30: 'thirty',
  40: 'forty',
  50: 'fifty',
  60: 'sixty',
  70: 'seventy',
  80: 'eighty',
  90: 'ninety'
};

var numbersToPlace = {
  10: 'ten',
  100: 'hundred',
  1000: 'thousand',
  1000000: 'million',
  1000000000: 'billion',
  1000000000000: 'trillion',
  1000000000000000: 'quadrillion',
  1000000000000000000: 'quintillion'
};

// MY ANSWER
function numberToEnglish(number){
  if(number === 0) {return 'zero';} // edge case; we never use 'zero' string in any other number
  var str = '';
  var placeCounter;

  for(i = 1000; i <= 1000000000000000000000; i *= 1000){
    if(i > number) {break;}
    placeCounter = Math.floor((number % (i*1000))/i);
    str = (!placeCounter || under1000ToEnglish(placeCounter) === 'zero') ?
      '' :
      under1000ToEnglish(placeCounter) + ' ' + numbersToPlace[i] + ' ' + str;
  }

  return (str + ' ' + under1000ToEnglish(number % 1000)).trim().replace('  ',' ');

  function under1000ToEnglish(number){
    var tensAndOnesStr;

    var hundreds = Math.floor(number/100);
    var tens = Math.floor((number % 100)/10);
    var ones = Math.floor(number % 10);

    // Set tensAndOnes string, which is an unusual case because it contains teen (15 != 'ten five')
    if(!tens && !ones){
      tensAndOnesStr = '';
    }else if(tens < 2){ // i.e. tens and ones are less than 20
      tensAndOnesStr = numbersToWords[tens*10 + ones];
    }else{ // tens is 2+
      tensAndOnesStr = numbersToWords[tens*10] +
        (ones ? '-' + numbersToWords[ones] : '');
    }

    return ((hundreds ? numbersToWords[hundreds] + ' hundred ' : '') +
      tensAndOnesStr).trim().replace('  ',' ');
  }
}

console.log(numberToEnglish(973563700353));