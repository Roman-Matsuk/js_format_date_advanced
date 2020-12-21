'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  let dateArray = date.split(fromFormat[3]);
  let fromFormatCopy = [...fromFormat];
  const result = [];
  let add = 0;

  if (fromFormatCopy[1] !== toFormat[1]) {
    const temp = dateArray[1];

    dateArray[1] = dateArray[2];
    dateArray[2] = temp;
  };

  if (fromFormatCopy[0][0] !== toFormat[0][0]) {
    fromFormatCopy = fromFormatCopy.reverse();
    dateArray = dateArray.reverse();
  };

  if (dateArray[fromFormatCopy.indexOf('YY')] >= 30) {
    add = 19;
  } else {
    add = 20;
  }

  for (let i = 0; i < fromFormatCopy.length - 1; i++) {
    switch (true) {
      case fromFormatCopy[i] === 'YYYY' && toFormat[i] === 'YY':
        result.push(dateArray[i].slice(2));
        break;

      case fromFormatCopy[i] === 'YY' && toFormat[i] === 'YYYY':
        result.push(add + dateArray[i]);
        break;

      default:
        result.push(dateArray[i]);
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
