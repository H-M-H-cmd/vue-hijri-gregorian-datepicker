/**
 * Date Converter Utility for Hijri-Gregorian conversion
 *
 * Provides accurate conversion between Gregorian and Hijri (Islamic) calendars
 * using Julian Day calculations.
 */
declare class DateConverter {
  /**
   * Convert Gregorian date to Hijri date
   *
   * @param date - Date string in format 'YYYY-MM-DD' (e.g., '2023-08-20')
   * @param format - Optional format pattern (default: 'YYYY-MM-DD')
   * @returns Hijri date string in format 'YYYY-MM-DD' (e.g., '1445-02-04')
   *
   * @example
   * ```typescript
   * const hijriDate = DateConverter.gregorianToHijri('2023-08-20');
   * console.log(hijriDate); // "1445-02-04"
   * ```
   */
  static gregorianToHijri(date: string, format?: string): string;

  /**
   * Convert Hijri date to Gregorian date
   *
   * @param date - Date string in format 'YYYY-MM-DD' (e.g., '1445-02-04')
   * @param format - Optional format pattern (default: 'YYYY-MM-DD')
   * @returns Gregorian date string in format 'YYYY-MM-DD' (e.g., '2023-08-20')
   *
   * @example
   * ```typescript
   * const gregorianDate = DateConverter.hijriToGregorian('1445-02-04');
   * console.log(gregorianDate); // "2023-08-20"
   * ```
   */
  static hijriToGregorian(date: string, format?: string): string;

  /**
   * Test conversion accuracy by performing a round-trip conversion
   *
   * @param gregorianDate - Gregorian date to test
   * @returns Object with original, converted, and back-converted dates
   *
   * @example
   * ```typescript
   * DateConverter.testConversion('2023-08-20');
   * // Logs: "Gregorian: 2023-08-20 -> Hijri: 1445-02-04 -> Back to Gregorian: 2023-08-20"
   * ```
   */
  static testConversion(gregorianDate: string): {
    gregorian: string;
    hijri: string;
    backToGregorian: string;
  };
}

export default DateConverter;
