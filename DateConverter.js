/**
 * DateConverter - Bidirectional Gregorian/Hijri Date Converter
 *
 * Provides accurate conversion between Gregorian and Hijri (Islamic) calendars
 * using Julian Day calculations. This implementation is completely self-contained
 * with no external dependencies.
 *
 * @version 1.0.0
 * @license MIT
 *
 * @example
 * // Convert Gregorian to Hijri
 * const hijriDate = DateConverter.gregorianToHijri('2023-08-20');
 * console.log(hijriDate); // Output: "1445-02-04"
 *
 * @example
 * // Convert Hijri to Gregorian
 * const gregorianDate = DateConverter.hijriToGregorian('1445-02-04');
 * console.log(gregorianDate); // Output: "2023-08-20"
 *
 * @example
 * // Test conversion accuracy
 * DateConverter.testConversion('2023-08-20');
 */

class DateConverter {
  static Day = '';
  static Month = '';
  static Year = '';

  /**
   * Convert Hijri date to Gregorian date
   *
   * @param {string} date - Date in format like "1445-02-04"
   * @param {string} format - Format string like "YYYY/MM/DD" or "YYYY-MM-DD" (default: "YYYY-MM-DD")
   * @returns {string} - Gregorian date in YYYY-MM-DD format
   *
   * @example
   * DateConverter.hijriToGregorian('1445-02-04'); // Returns: "2023-08-20"
   * DateConverter.hijriToGregorian('1445/02/04', 'YYYY/MM/DD'); // Returns: "2023-08-20"
   */
  static hijriToGregorian(date, format = "YYYY-MM-DD") {
    this.constructDayMonthYear(date, format);
    const d = parseInt(this.Day);
    const m = parseInt(this.Month);
    const y = parseInt(this.Year);

    if (y < 1700) {
      const jd = this.intPart((11 * y + 3) / 30) + 354 * y + 30 * m - this.intPart((m - 1) / 2) + d + 1948440 - 385;

      let newD, newM, newY;

      if (jd > 2299160) {
        const l = jd + 68569;
        const n = this.intPart((4 * l) / 146097);
        let l2 = l - this.intPart((146097 * n + 3) / 4);
        const i = this.intPart((4000 * (l2 + 1)) / 1461001);
        l2 = l2 - this.intPart((1461 * i) / 4) + 31;
        const j = this.intPart((80 * l2) / 2447);
        newD = l2 - this.intPart((2447 * j) / 80);
        const l3 = this.intPart(j / 11);
        newM = j + 2 - 12 * l3;
        newY = 100 * (n - 49) + i + l3;
      } else {
        const j = jd + 1402;
        const k = this.intPart((j - 1) / 1461);
        const l = j - 1461 * k;
        const n = this.intPart((l - 1) / 365) - this.intPart(l / 1461);
        const i = l - 365 * n + 30;
        const j2 = this.intPart((80 * i) / 2447);
        newD = i - this.intPart((2447 * j2) / 80);
        const i2 = this.intPart(j2 / 11);
        newM = j2 + 2 - 12 * i2;
        newY = 4 * k + n + i2 - 4716;
      }

      if (newD < 10) newD = "0" + newD;
      if (newM < 10) newM = "0" + newM;

      return `${newY}-${newM}-${newD}`;
    } else {
      return "";
    }
  }

  /**
   * Convert Gregorian date to Hijri date
   *
   * @param {string} date - Date in format like "2023-08-20"
   * @param {string} format - Format string like "YYYY/MM/DD" or "YYYY-MM-DD" (default: "YYYY-MM-DD")
   * @returns {string} - Hijri date in YYYY-MM-DD format
   *
   * @example
   * DateConverter.gregorianToHijri('2023-08-20'); // Returns: "1445-02-04"
   * DateConverter.gregorianToHijri('2023/08/20', 'YYYY/MM/DD'); // Returns: "1445-02-04"
   */
  static gregorianToHijri(date, format = "YYYY-MM-DD") {
    this.constructDayMonthYear(date, format);
    const d = parseInt(this.Day);
    const m = parseInt(this.Month);
    const y = parseInt(this.Year);

    if (y > 1700) {
      let jd;

      if ((y > 1582) || ((y === 1582) && (m > 10)) || ((y === 1582) && (m === 10) && (d > 14))) {
        jd = this.intPart((1461 * (y + 4800 + this.intPart((m - 14) / 12))) / 4) +
             this.intPart((367 * (m - 2 - 12 * (this.intPart((m - 14) / 12)))) / 12) -
             this.intPart((3 * (this.intPart((y + 4900 + this.intPart((m - 14) / 12)) / 100))) / 4) +
             d - 32075;
      } else {
        jd = 367 * y - this.intPart((7 * (y + 5001 + this.intPart((m - 9) / 7))) / 4) +
             this.intPart((275 * m) / 9) + d + 1729777;
      }

      const l = jd - 1948440 + 10632;
      const n = this.intPart((l - 1) / 10631);
      let l2 = l - 10631 * n + 354;
      const j = (this.intPart((10985 - l2) / 5316)) * (this.intPart((50 * l2) / 17719)) +
                (this.intPart(l2 / 5670)) * (this.intPart((43 * l2) / 15238));
      l2 = l2 - (this.intPart((30 - j) / 15)) * (this.intPart((17719 * j) / 50)) -
           (this.intPart(j / 16)) * (this.intPart((15238 * j) / 43)) + 29;
      let newM = this.intPart((24 * l2) / 709);
      let newD = l2 - this.intPart((709 * newM) / 24);
      let newY = 30 * n + j - 30;

      if (newD < 10) newD = "0" + newD;
      if (newM < 10) newM = "0" + newM;

      return `${newY}-${newM}-${newD}`;
    } else {
      return "";
    }
  }

  /**
   * Helper function equivalent to PHP's intval with floor/ceil logic
   * Handles precise integer conversion with floating point tolerance
   *
   * @param {number} floatNum - The float number to convert
   * @returns {number} - Integer part of the number
   * @private
   */
  static intPart(floatNum) {
    if (floatNum < -0.0000001) {
      return Math.ceil(floatNum - 0.0000001);
    }
    return Math.floor(floatNum + 0.0000001);
  }

  /**
   * Parse date string according to format and extract Day, Month, Year
   * Supports flexible format patterns like "YYYY-MM-DD", "YYYY/MM/DD", "DD-MM-YYYY", etc.
   *
   * @param {string} date - The date string to parse
   * @param {string} format - The format pattern (e.g., "YYYY-MM-DD")
   * @private
   */
  static constructDayMonthYear(date, format) {
    this.Day = "";
    this.Month = "";
    this.Year = "";

    const formatUpper = format.toUpperCase();
    const formatArray = formatUpper.split('');
    const srcDateArray = date.split('');

    for (let i = 0; i < formatArray.length; i++) {
      switch (formatArray[i]) {
        case "D":
          this.Day += srcDateArray[i];
          break;
        case "M":
          this.Month += srcDateArray[i];
          break;
        case "Y":
          this.Year += srcDateArray[i];
          break;
      }
    }
  }

  /**
   * Test the conversion accuracy by performing round-trip conversion
   * Converts Gregorian -> Hijri -> Gregorian to verify accuracy
   *
   * @param {string} gregorianDate - Gregorian date to test (format: YYYY-MM-DD)
   * @returns {Object} - Object containing original, hijri, and converted back dates
   *
   * @example
   * DateConverter.testConversion('2023-08-20');
   * // Logs: "Gregorian: 2023-08-20 -> Hijri: 1445-02-04 -> Back to Gregorian: 2023-08-20"
   * // Returns: { gregorian: '2023-08-20', hijri: '1445-02-04', backToGregorian: '2023-08-20' }
   */
  static testConversion(gregorianDate) {
    const hijri = this.gregorianToHijri(gregorianDate);
    const backToGregorian = this.hijriToGregorian(hijri);
    console.log(`Gregorian: ${gregorianDate} -> Hijri: ${hijri} -> Back to Gregorian: ${backToGregorian}`);
    return { gregorian: gregorianDate, hijri, backToGregorian };
  }
}

export default DateConverter;
