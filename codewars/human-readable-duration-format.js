// https://www.codewars.com/kata/human-readable-duration-format/train/javascript

function formatDuration (seconds) {
  if (!seconds) {
    return 'now';
  }
  let remainder = seconds;
  const units = [
    {
      unit: 'year',
      seconds: 365 * 24 * 60 * 60,
    },
    {
      unit: 'day',
      seconds: 24 * 60 * 60,
    },
    {
      unit: 'hour',
      seconds: 60 * 60,
    },
    {
      unit: 'minute',
      seconds: 60,
    },
    {
      unit: 'second',
      seconds: 1,
    },
  ];

  return units.reduce((duration, unit) => {
    const count = Math.floor(remainder / unit.seconds);
    if (count) {
      const plural = count === 1 ? '' : 's';
      duration.push(`${count} ${unit.unit}${plural}`);
      remainder -= count * unit.seconds;
    }
    return duration;
  }, [])
    .reduce((result, duration, i, arr) => {
      if (!i) {
        return duration;
      }
      return (i < arr.length - 1) ?
        `${result}, ${duration}` :
        `${result} and ${duration}`;
    }, '');
}

console.log(formatDuration(321))