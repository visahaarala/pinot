// Modify PIVOT_INDEX for different results
// 0 = f#
// 7 = c1
// 12 = f#1
// const PIVOT_INDEX = 12;

export const getNoteName = (index: number) => {
  const noteNames = [
    'c',
    'c#',
    'd',
    'd#',
    'e',
    'f',
    'f#', // start (index + 6)
    'g',
    'g#',
    'a',
    'a#',
    'b',
  ];
  const name = noteNames[(index + 6) % 12];
  const octave = Math.floor((index + 6) / 12);
  return name + (octave > 0 ? octave : '');
};

export const getPivotDispersion = (
  pivotIndex: number,
  highestPivotIndex: number,
) => {
  const rs = [];

  // initialize
  for (let i = 0; i <= highestPivotIndex * 2; i++) {
    rs[i] = 0;
  }

  rs[0]++;
  if (pivotIndex === 0) return rs;

  rs[0]++;
  rs[1]++;
  rs[2]++;
  if (pivotIndex === 1) return rs;

  for (let i = 2; i <= pivotIndex; i++) {
    // i = running pivot index

    rs[i]++;
    rs[i - 1]++;
    rs[i + 1]++;

    let cs = 2; // chromaticSteps
    while (cs <= i) {
      for (let j = i - cs; j <= i + cs; j++) {
        rs[j]++;
      }
      rs[i]++;
      cs++;
    }
  }
  return rs;
};

// // LOG
// const dispersion = getPivotDispersion(PIVOT_INDEX);
// console.log();
// console.log('Pivot: ' + getNoteName(PIVOT_INDEX));
// console.log('Highest note: ' + getNoteName(PIVOT_INDEX * 2));
// console.log('Total notes: ' + dispersion.reduce((acc, num) => acc + num, 0));
// console.log();
// console.log('Dispersion:');
// console.log();
// const dispersionText = dispersion.map(
//   (value, index) => getNoteName(index) + ': ' + value,
// );
// dispersionText.reverse().forEach((value) => console.log(value));
