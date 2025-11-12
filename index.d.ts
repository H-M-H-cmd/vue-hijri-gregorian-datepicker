import { DefineComponent } from 'vue';

export interface InputDateProps {
  /**
   * Input field name (required)
   */
  name: string;

  /**
   * UI language ('ar' for Arabic, 'en' for English)
   * @default 'en'
   */
  lang?: 'ar' | 'en';

  /**
   * Placeholder text
   * @default 'اختر التاريخ'
   */
  placeholder?: string;

  /**
   * Label text
   */
  label?: string;

  /**
   * Validation error message
   */
  errors?: string | boolean;

  /**
   * Default calendar type ('gregorian' or 'hijri')
   * @default 'gregorian'
   */
  defaultCalendar?: 'gregorian' | 'hijri';

  /**
   * Show full month names instead of numbers
   * @default false
   */
  showMonthNames?: boolean;

  /**
   * Auto-select today's date when no value provided
   * @default false
   */
  autoSelectToday?: boolean;

  /**
   * Years to subtract from current year for end range
   * @default 0
   */
  yearOffset?: number;

  /**
   * Start year for Hijri calendar
   * @default 1350
   */
  beginYearHijri?: number;

  /**
   * Start year for Gregorian calendar
   * @default 1900
   */
  beginYearGregorian?: number;

  /**
   * CSS class for container
   * @default 'tw-block tw-w-full tw-my-3'
   */
  containerClass?: string;

  /**
   * CSS class for label
   * @default 'tw-mb-1'
   */
  labelClass?: string;

  /**
   * CSS class for input field
   * @default ''
   */
  inputClass?: string;

  /**
   * Validate on input
   * @default true
   */
  validateOnInput?: boolean;

  /**
   * Validate on mount
   * @default false
   */
  validateOnMount?: boolean;
}

export interface InputDateEmits {
  /**
   * Emitted when date selection is confirmed
   */
  (e: 'change', value: string): void;

  /**
   * Emitted when main model value changes
   */
  (e: 'update:modelValue', value: string): void;

  /**
   * Emitted when Hijri date changes
   */
  (e: 'update:hijriDate', value: string): void;

  /**
   * Emitted when Gregorian date changes
   */
  (e: 'update:gregorianDate', value: string): void;
}

/**
 * Vue Hijri-Gregorian Date Picker Component
 *
 * A standalone, self-contained Vue 3 date picker with bilingual support
 * for both Gregorian and Hijri (Islamic) calendars.
 *
 * @example
 * ```vue
 * <script setup>
 * import { ref } from 'vue';
 * import InputDate from 'vue-hijri-gregorian-datepicker';
 *
 * const selectedDate = ref('');
 * </script>
 *
 * <template>
 *   <InputDate
 *     name="birth_date"
 *     lang="en"
 *     v-model="selectedDate"
 *     placeholder="Select date"
 *   />
 * </template>
 * ```
 */
declare const InputDate: DefineComponent<InputDateProps, {}, any, {}, {}, any, any, InputDateEmits>;

export default InputDate;
