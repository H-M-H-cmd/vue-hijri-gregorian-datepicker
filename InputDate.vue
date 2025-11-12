<script setup>
/**
 * @component InputDate
 * @description A customizable date picker component that supports both Gregorian and Hijri calendars
 *
 * This is a standalone, self-contained component with NO external dependencies except Vue 3.
 * Styling matches the original implementation exactly.
 *
 * @example
 * Basic usage with single v-model:
 * ```vue
 * <InputDate
 *   name="birth_date"
 *   v-model="form.date"
 *   placeholder="اختر التاريخ"
 * />
 * ```
 *
 * @props {String} name - Input field name (required)
 * @props {String} [placeholder="اختر التاريخ"] - Placeholder text
 * @props {String|Boolean} [errors=false] - Validation errors to display
 * @props {String} [containerClass="tw-block tw-w-full tw-my-3"] - CSS class for container
 * @props {String} [labelClass="tw-mb-1"] - CSS class for label
 * @props {String} [inputClass=""] - CSS class for input field
 * @props {String} [label=""] - Label text
 * @props {Boolean} [showMonthNames=false] - Show full month names instead of numbers
 * @props {String} [defaultCalendar="gregorian"] - Default calendar type ("gregorian" or "hijri")
 * @props {Number} [yearOffset=0] - Number of years to subtract from current year for end range
 * @props {Number} [beginYearHijri=1350] - Start year for Hijri calendar range
 * @props {Number} [beginYearGregorian=1900] - Start year for Gregorian calendar range
 * @props {Boolean} [autoSelectToday=false] - Whether to auto-select today's date when no value is provided
 * @props {String} [lang="en"] - UI language ("ar" for Arabic, "en" for English)
 */

import { ref, computed, watch, nextTick, onUnmounted } from 'vue';
import DateConverter from './DateConverter.js';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  validateOnInput: {
    type: Boolean,
    default: true
  },
  validateOnMount: {
    type: Boolean,
    default: false,
  },
  errors: {
    default: false,
  },
  containerClass: {
    type: String,
    default: 'tw-block tw-w-full tw-my-3',
  },
  labelClass: {
    type: String,
    default: 'tw-mb-1',
  },
  label: {
    type: String,
    default: '',
  },
  showMonthNames: {
    type: Boolean,
    default: false,
  },
  defaultCalendar: {
    type: String,
    default: 'gregorian',
  },
  placeholder: {
    type: String,
    default: 'اختر التاريخ'
  },
  yearOffset: {
    type: Number,
    default: 0,
  },
  beginYearHijri: {
    type: Number,
    default: 1350,
  },
  beginYearGregorian: {
    type: Number,
    default: 1900,
  },
  autoSelectToday: {
    type: Boolean,
    default: false,
  },
  lang: {
    type: String,
    default: 'en',
    validator: (value) => ['ar', 'en'].includes(value),
  },
  inputClass: {
    type: String,
    default: '',
  },
  confirmButtonClass: {
    type: String,
    default: '',
  },
  cancelButtonClass: {
    type: String,
    default: '',
  },
  drawerMaxWidth: {
    type: String,
    default: '360px',
  },
});

const model = defineModel({
  required: false,
  default: ''
});

const hijriModel = defineModel('hijriDate', {
  required: false,
  default: ''
});

const gregorianModel = defineModel('gregorianDate', {
  required: false,
  default: ''
});

const emit = defineEmits(['change', 'update:modelValue', 'update:hijriDate', 'update:gregorianDate']);

const inputRef = ref(null);
const showDrawer = ref(false);
const calendarType = ref(props.defaultCalendar);
const selectedDate = ref({
  year: null,
  month: null,
  day: null
});

// Translations
const translations = {
  ar: {
    hijri: 'هجري',
    gregorian: 'ميلادي',
    dragHint: 'اسحب الأرقام فوق أو تحت للاختيار',
    confirm: 'تأكيد التاريخ',
    cancel: 'الغاء',
    day: 'يوم',
    month: 'شهر',
    year: 'سنة',
    hijriMonths: ['محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'],
    gregorianMonths: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
  },
  en: {
    hijri: 'Hijri',
    gregorian: 'Gregorian',
    dragHint: 'Drag numbers up or down to select',
    confirm: 'Confirm Date',
    cancel: 'Cancel',
    day: 'Day',
    month: 'Month',
    year: 'Year',
    hijriMonths: ['Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani', 'Jumada al-Ula', 'Jumada al-Akhirah', 'Rajab', 'Sha\'ban', 'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'],
    gregorianMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  }
};

const t = computed(() => translations[props.lang]);
const isRTL = computed(() => props.lang === 'ar');

const hijriMonths = computed(() => {
  return t.value.hijriMonths.map((label, index) => ({
    value: index + 1,
    label
  }));
});

const gregorianMonths = computed(() => {
  return t.value.gregorianMonths.map((label, index) => ({
    value: index + 1,
    label
  }));
});

const getDaysInGregorianMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const getCurrentDateInfo = (isHijri = false) => {
  if (isHijri) {
    const todayGregorian = new Date();
    const todayGregorianStr = `${todayGregorian.getFullYear()}-${String(todayGregorian.getMonth() + 1).padStart(2, '0')}-${String(todayGregorian.getDate()).padStart(2, '0')}`;
    const todayHijri = DateConverter.gregorianToHijri(todayGregorianStr);
    const [year, month, day] = todayHijri.split('-').map(Number);
    return { year, month, day };
  } else {
    const today = new Date();
    return {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate()
    };
  }
};

const years = computed(() => {
  const range = [];
  const start = calendarType.value === 'hijri' ? props.beginYearHijri : props.beginYearGregorian;

  let end;
  if (calendarType.value === 'hijri') {
    const currentHijriInfo = getCurrentDateInfo(true);
    end = currentHijriInfo.year - props.yearOffset;
  } else {
    end = new Date().getFullYear() - props.yearOffset;
  }

  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
});

const months = computed(() => {
  const monthsList = calendarType.value === 'hijri' ? hijriMonths.value : gregorianMonths.value;

  if (!props.showMonthNames) {
    return monthsList.map(month => ({
      value: month.value,
      label: month.value.toString().padStart(2, '0')
    }));
  }

  return monthsList;
});

const days = computed(() => {
  if (!selectedDate.value.year || !selectedDate.value.month) return [];

  let daysInMonth;
  if (calendarType.value === 'hijri') {
    const hijriDaysInMonth = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
    daysInMonth = hijriDaysInMonth[selectedDate.value.month - 1];

    if (selectedDate.value.month === 12) {
      const isLeap = (selectedDate.value.year % 30) < 11;
      daysInMonth = isLeap ? 30 : 29;
    }
  } else {
    daysInMonth = getDaysInGregorianMonth(selectedDate.value.year, selectedDate.value.month);
  }

  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
});

const dragState = ref({
  isDragging: false,
  startY: 0,
  startOffset: 0,
  currentType: null
});

const yearOffset = ref(0);
const monthOffset = ref(0);
const dayOffset = ref(0);

const ITEM_HEIGHT = 44;
const MOMENTUM_FACTOR = 0.5;
const DECELERATION = 0.95;

const velocity = ref(0);
const animationFrame = ref(null);

watch(showDrawer, (newVal) => {
  if (newVal) {
    calendarType.value = props.defaultCalendar;

    let initialDate;

    if (model.value) {
      try {
        if (props.defaultCalendar === 'hijri') {
          const [year, month, day] = model.value.split('-').map(Number);

          if (calendarType.value === 'gregorian') {
            const gregorianDate = DateConverter.hijriToGregorian(model.value);
            const [gYear, gMonth, gDay] = gregorianDate.split('-').map(Number);
            initialDate = { year: gYear, month: gMonth, day: gDay };
          } else {
            initialDate = { year, month, day, isHijri: true };
          }
        } else {
          const [year, month, day] = model.value.split('-').map(Number);
          initialDate = { year, month, day };

          if (calendarType.value === 'hijri') {
            const hijriDate = DateConverter.gregorianToHijri(model.value);
            const [hYear, hMonth, hDay] = hijriDate.split('-').map(Number);
            initialDate = { year: hYear, month: hMonth, day: hDay, isHijri: true };
          }
        }
      } catch (e) {
        console.error('Error parsing main model value:', e);
        initialDate = null;
      }
    }

    if (!initialDate && (hijriModel.value || gregorianModel.value)) {
      try {
        if (calendarType.value === 'hijri') {
          if (hijriModel.value) {
            const [year, month, day] = hijriModel.value.split('-').map(Number);
            initialDate = { year, month, day, isHijri: true };
          } else if (gregorianModel.value) {
            const hijriDate = DateConverter.gregorianToHijri(gregorianModel.value);
            const [year, month, day] = hijriDate.split('-').map(Number);
            initialDate = { year, month, day, isHijri: true };
          }
        } else {
          if (gregorianModel.value) {
            const [year, month, day] = gregorianModel.value.split('-').map(Number);
            initialDate = { year, month, day };
          } else if (hijriModel.value) {
            const gregorianDate = DateConverter.hijriToGregorian(hijriModel.value);
            const [year, month, day] = gregorianDate.split('-').map(Number);
            initialDate = { year, month, day };
          }
        }
      } catch (e) {
        console.error('Error parsing alternate model values:', e);
        initialDate = null;
      }
    }

    if (initialDate) {
      selectedDate.value = {
        year: initialDate.year,
        month: initialDate.month,
        day: initialDate.day
      };
    } else {
      if (props.autoSelectToday) {
        const todayInfo = getCurrentDateInfo(calendarType.value === 'hijri');
        selectedDate.value = todayInfo;
      } else {
        if (calendarType.value === 'hijri') {
          const todayInfo = getCurrentDateInfo(true);
          const lastYear = todayInfo.year - props.yearOffset;
          const hijriDaysInMonth = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
          let lastDay = hijriDaysInMonth[todayInfo.month - 1];

          if (todayInfo.month === 12) {
            const isLeap = (lastYear % 30) < 11;
            lastDay = isLeap ? 30 : 29;
          }

          selectedDate.value = {
            year: lastYear,
            month: todayInfo.month,
            day: lastDay
          };
        } else {
          const today = new Date();
          const lastYear = today.getFullYear() - props.yearOffset;
          const lastMonth = today.getMonth() + 1;
          const lastDay = getDaysInGregorianMonth(lastYear, lastMonth);

          selectedDate.value = {
            year: lastYear,
            month: lastMonth,
            day: lastDay
          };
        }
      }
    }

    nextTick(() => {
      updateOffsets();
    });
  }
});

const updateOffsets = () => {
  const { year, month, day } = selectedDate.value;

  if (year) {
    const yearIndex = years.value.findIndex(y => y === year);
    if (yearIndex !== -1) {
      yearOffset.value = -yearIndex * ITEM_HEIGHT;
    }
  }

  if (month) {
    const monthIndex = months.value.findIndex(m => m.value === month);
    if (monthIndex !== -1) {
      monthOffset.value = -monthIndex * ITEM_HEIGHT;
    }
  }

  if (day) {
    const dayIndex = days.value.findIndex(d => d === day);
    if (dayIndex !== -1) {
      dayOffset.value = -dayIndex * ITEM_HEIGHT;
    }
  }
};

const startDrag = (type, event) => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value);
  }

  event.preventDefault();
  const y = event.touches ? event.touches[0].clientY : event.clientY;

  dragState.value = {
    isDragging: true,
    startY: y,
    currentY: y,
    startOffset: getOffset(type),
    currentType: type,
    lastTime: Date.now(),
    velocity: 0
  };
};

const onDrag = (type, event) => {
  if (!dragState.value.isDragging || dragState.value.currentType !== type) return;

  event.preventDefault();
  const y = event.touches ? event.touches[0].clientY : event.clientY;
  const deltaY = y - dragState.value.currentY;
  const currentTime = Date.now();
  const deltaTime = currentTime - dragState.value.lastTime;

  if (deltaTime > 0) {
    dragState.value.velocity = deltaY / deltaTime;
  }

  dragState.value.currentY = y;
  dragState.value.lastTime = currentTime;

  const newOffset = dragState.value.startOffset + (y - dragState.value.startY);
  setOffset(type, newOffset);

  const itemIndex = Math.round(-newOffset / ITEM_HEIGHT);
  snapToIndex(type, itemIndex);
};

const endDrag = (type) => {
  if (!dragState.value.isDragging || dragState.value.currentType !== type) return;

  const finalVelocity = dragState.value.velocity * MOMENTUM_FACTOR;
  dragState.value.isDragging = false;

  if (Math.abs(finalVelocity) > 0.1) {
    applyMomentum(type, finalVelocity);
  } else {
    snapToNearest(type);
  }
};

const getOffset = (type) => {
  switch (type) {
    case 'year': return yearOffset.value;
    case 'month': return monthOffset.value;
    case 'day': return dayOffset.value;
    default: return 0;
  }
};

const setOffset = (type, offset) => {
  const items = type === 'year' ? years.value :
    type === 'month' ? months.value :
      days.value;

  const maxOffset = 0;
  const minOffset = -((items.length - 1) * ITEM_HEIGHT);
  const constrainedOffset = Math.min(maxOffset, Math.max(minOffset, offset));

  switch (type) {
    case 'year':
      yearOffset.value = constrainedOffset;
      break;
    case 'month':
      monthOffset.value = constrainedOffset;
      break;
    case 'day':
      dayOffset.value = constrainedOffset;
      break;
  }
};

const snapToIndex = (type, index) => {
  const items = type === 'year' ? years.value :
    type === 'month' ? months.value :
      days.value;

  const constrainedIndex = Math.max(0, Math.min(items.length - 1, index));
  const targetOffset = -constrainedIndex * ITEM_HEIGHT;

  const currentOffset = getOffset(type);

  animateToOffset(type, currentOffset, targetOffset, () => {
    switch (type) {
      case 'year':
        selectedDate.value.year = years.value[constrainedIndex];
        break;
      case 'month':
        selectedDate.value.month = months.value[constrainedIndex].value;
        break;
      case 'day':
        selectedDate.value.day = days.value[constrainedIndex];
        break;
    }
  });
};

const confirmDate = () => {
  const { year, month, day } = selectedDate.value;
  if (!year || !month || !day) return;

  let finalDate;
  let hijriValue;
  let gregorianValue;

  if (calendarType.value === 'hijri') {
    hijriValue = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    gregorianValue = DateConverter.hijriToGregorian(hijriValue);
  } else {
    gregorianValue = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    hijriValue = DateConverter.gregorianToHijri(gregorianValue);
  }

  finalDate = props.defaultCalendar === 'hijri' ? hijriValue : gregorianValue;

  model.value = finalDate;
  hijriModel.value = hijriValue;
  gregorianModel.value = gregorianValue;

  emit('change', finalDate);
  emit('update:modelValue', finalDate);
  emit('update:hijriDate', hijriValue);
  emit('update:gregorianDate', gregorianValue);

  showDrawer.value = false;
};

const switchCalendarType = (newType) => {
  if (calendarType.value === newType) return;

  const { year, month, day } = selectedDate.value;
  if (!year || !month || !day) return;

  if (calendarType.value === 'hijri' && newType === 'gregorian') {
    const hijriDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const gregorianDate = DateConverter.hijriToGregorian(hijriDate);
    const [newYear, newMonth, newDay] = gregorianDate.split('-').map(Number);

    selectedDate.value = {
      year: newYear,
      month: newMonth,
      day: newDay
    };
  } else if (calendarType.value === 'gregorian' && newType === 'hijri') {
    const gregorianDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const hijriDate = DateConverter.gregorianToHijri(gregorianDate);
    const [newYear, newMonth, newDay] = hijriDate.split('-').map(Number);

    selectedDate.value = {
      year: newYear,
      month: newMonth,
      day: newDay
    };
  }

  calendarType.value = newType;

  nextTick(() => {
    updateOffsets();
  });
};

const displayValue = computed(() => {
  if (!model.value && !hijriModel.value && !gregorianModel.value) {
    return props.placeholder;
  }
  if (props.defaultCalendar === 'hijri') {
    return hijriModel.value;
  }
  return gregorianModel.value;
});

watch(
  () => [selectedDate.value.year, selectedDate.value.month, calendarType.value],
  () => {
    if (selectedDate.value.year && selectedDate.value.month) {
      let daysInMonth;

      if (calendarType.value === 'hijri') {
        const hijriDaysInMonth = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
        daysInMonth = hijriDaysInMonth[selectedDate.value.month - 1];

        if (selectedDate.value.month === 12) {
          const isLeap = (selectedDate.value.year % 30) < 11;
          daysInMonth = isLeap ? 30 : 29;
        }
      } else {
        daysInMonth = getDaysInGregorianMonth(selectedDate.value.year, selectedDate.value.month);
      }

      if (selectedDate.value.day > daysInMonth) {
        selectedDate.value.day = daysInMonth;
      }
    }
  }
);

watch(selectedDate, () => {
  nextTick(() => {
    updateOffsets();
  });
}, { deep: true });

const applyMomentum = (type, initialVelocity) => {
  let currentVelocity = initialVelocity;
  let currentOffset = getOffset(type);
  let lastTime = Date.now();

  const animate = () => {
    const currentTime = Date.now();
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    currentVelocity *= Math.pow(DECELERATION, deltaTime / 16);
    currentOffset += currentVelocity * deltaTime;

    setOffset(type, currentOffset);

    if (Math.abs(currentVelocity) > 0.01) {
      const itemIndex = Math.round(-currentOffset / ITEM_HEIGHT);
      snapToIndex(type, itemIndex);

      animationFrame.value = requestAnimationFrame(animate);
    } else {
      snapToNearest(type);
    }
  };

  animationFrame.value = requestAnimationFrame(animate);
};

const snapToNearest = (type) => {
  const currentOffset = getOffset(type);
  const itemIndex = Math.round(-currentOffset / ITEM_HEIGHT);
  snapToIndex(type, itemIndex);
};

const handleWheel = (type, event) => {
  event.preventDefault();

  const delta = Math.sign(event.deltaY);

  const currentOffset = getOffset(type);
  const currentIndex = Math.round(-currentOffset / ITEM_HEIGHT);
  const newIndex = currentIndex + delta;

  const items = type === 'year' ? years.value :
    type === 'month' ? months.value :
      days.value;

  if (newIndex >= 0 && newIndex < items.length) {
    snapToIndex(type, newIndex);
  }
};

const dragText = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes('iphone');
};

const animateToOffset = (type, startOffset, targetOffset, callback) => {
  const duration = 200;
  const startTime = Date.now();

  const animate = () => {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;

    if (elapsed >= duration) {
      setOffset(type, targetOffset);
      if (callback) callback();
      return;
    }

    const progress = elapsed / duration;
    const eased = -progress * (progress - 2);

    const currentOffset = startOffset + (targetOffset - startOffset) * eased;
    setOffset(type, currentOffset);

    requestAnimationFrame(animate);
  };

  animate();
};

onUnmounted(() => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value);
  }
});
</script>

<template>
  <div :class="containerClass">
    <label v-if="label" :class="labelClass">{{ label }}</label>
    <div class="input-wrapper">
      <input
        :placeholder="placeholder"
        type="text"
        :name="name"
        :id="name + '-id-field'"
        :class="[inputClass ? inputClass : 'input-field', { 'error': errors }]"
        :value="displayValue"
        readonly
        @click="showDrawer = true"
        ref="inputRef"
      />
    </div>
    <span v-if="errors && typeof errors === 'string' && errors[0] !== ' '" class="validationError">
      {{ typeof errors === 'string' ? errors : errors[0] }}
    </span>

    <!-- PrimeVue-style Drawer -->
    <Teleport to="body">
      <transition name="drawer">
        <div v-if="showDrawer" class="p-drawer-mask" @click.self="showDrawer = false">
          <div class="p-drawer p-drawer-bottom" :dir="isRTL ? 'rtl' : 'ltr'" :style="{ maxWidth: drawerMaxWidth }">
            <div class="flex flex-col h-full bg-white rounded-t-3xl">
                <!-- Calendar Type Switcher -->
                <div class="px-6 pt-4">
                  <div class="tw-flex tw-justify-center">
                    <div class="tw-flex tw-bg-gray-100 tw-rounded-xl p-1">
                      <button
                        v-for="type in [{ value: 'hijri', label: t.hijri }, { value: 'gregorian', label: t.gregorian }]"
                        :key="type.value"
                        @click="switchCalendarType(type.value)"
                        :class="[
                          'tw-px-8 py-2 tw-rounded-lg tw-transition-all tw-text-sm',
                          calendarType === type.value
                            ? 'tw-bg-white tw-shadow-sm tw-text-gray-500 tw-font-medium'
                            : 'tw-text-gray-500 hover-tw-bg-gray-100'
                        ]"
                      >
                        {{ type.label }}
                      </button>
                    </div>
                  </div>
                  <div v-if="!dragText()" class="tw-text-center tw-text-sm tw-text-gray-400 tw-mt-3">
                    {{ t.dragHint }}
                  </div>
                </div>

                <!-- Date Picker -->
                <div>
                  <div class="date-picker-container">
                    <!-- Day Column -->
                    <div class="picker-column">
                      <div class="column-label">{{ t.day }}</div>
                      <div
                        class="picker-scroller"
                        @mousedown="startDrag('day', $event)"
                        @mousemove="onDrag('day', $event)"
                        @mouseup="endDrag('day')"
                        @mouseleave="endDrag('day')"
                        @touchstart="startDrag('day', $event)"
                        @touchmove="onDrag('day', $event)"
                        @touchend="endDrag('day')"
                        @wheel="handleWheel('day', $event)"
                      >
                        <ul :style="{ transform: `translateY(${dayOffset}px)` }">
                          <li
                            v-for="day in days"
                            :key="day"
                            :class="{ 'selected': selectedDate.day === day }"
                          >
                            {{ day }}
                          </li>
                        </ul>
                      </div>
                    </div>

                    <!-- Month Column -->
                    <div class="picker-column">
                      <div class="column-label">{{ t.month }}</div>
                      <div
                        class="picker-scroller"
                        @mousedown="startDrag('month', $event)"
                        @mousemove="onDrag('month', $event)"
                        @mouseup="endDrag('month')"
                        @mouseleave="endDrag('month')"
                        @touchstart="startDrag('month', $event)"
                        @touchmove="onDrag('month', $event)"
                        @touchend="endDrag('month')"
                        @wheel="handleWheel('month', $event)"
                      >
                        <ul :style="{ transform: `translateY(${monthOffset}px)` }">
                          <li
                            v-for="month in months"
                            :key="month.value"
                            :class="{ 'selected': selectedDate.month === month.value }"
                          >
                            {{ month.label }}
                          </li>
                        </ul>
                      </div>
                    </div>

                    <!-- Year Column -->
                    <div class="picker-column">
                      <div class="column-label">{{ t.year }}</div>
                      <div
                        class="picker-scroller"
                        @mousedown="startDrag('year', $event)"
                        @mousemove="onDrag('year', $event)"
                        @mouseup="endDrag('year')"
                        @mouseleave="endDrag('year')"
                        @touchstart="startDrag('year', $event)"
                        @touchmove="onDrag('year', $event)"
                        @touchend="endDrag('year')"
                        @wheel="handleWheel('year', $event)"
                      >
                        <ul :style="{ transform: `translateY(${yearOffset}px)` }">
                          <li
                            v-for="year in years"
                            :key="year"
                            :class="{ 'selected': selectedDate.year === year }"
                          >
                            {{ year }}
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div class="selection-mask">
                      <div class="selection-frame"></div>
                    </div>
                  </div>
                </div>

                <!-- Footer with buttons -->
                <div class="tw-flex tw-items-center tw-gap-4 tw-justify-between tw-px-4 tw-pb-4 tw-shrink-0 tw-border-b tw-border-gray-100">
                  <button :class="confirmButtonClass ? confirmButtonClass : 'ui-button ui-button--primary tw-rounded-md w-100'" @click="confirmDate">
                    {{ t.confirm }}
                  </button>
                  <button :class="cancelButtonClass ? cancelButtonClass : 'ui-button ui-button--secondary tw-rounded-md w-100'" @click="showDrawer = false">
                    {{ t.cancel }}
                  </button>
                </div>
              </div>
            </div>
          </div>
      </transition>
    </Teleport>
  </div>
</template>

<style>
/* Tailwind utility classes - converted to CSS */
.tw-block { display: block; }
.tw-w-full { width: 100%; }
.tw-my-3 { margin-top: 0.75rem; margin-bottom: 0.75rem; }
.tw-mb-1 { margin-bottom: 0.25rem; }
.tw-flex { display: flex; }
.tw-justify-center { justify-content: center; }
.tw-items-center { align-items: center; }
.tw-gap-4 { gap: 1rem; }
.tw-justify-between { justify-content: space-between; }
.tw-px-4 { padding-left: 1rem; padding-right: 1rem; }
.tw-px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.tw-px-8 { padding-left: 2rem; padding-right: 2rem; }
.tw-pb-4 { padding-bottom: 1rem; }
.tw-pt-4 { padding-top: 1rem; }
.tw-shrink-0 { flex-shrink: 0; }
.tw-bg-gray-100 { background-color: #f3f4f6; }
.tw-bg-white { background-color: #ffffff; }
.tw-rounded-xl { border-radius: 0.75rem; }
.tw-rounded-lg { border-radius: 0.5rem; }
.tw-rounded-md { border-radius: 0.375rem; }
.tw-shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
.tw-text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.tw-text-gray-400 { color: #9ca3af; }
.tw-text-gray-500 { color: #6b7280; }
.tw-font-medium { font-weight: 500; }
.tw-text-center { text-align: center; }
.tw-mt-3 { margin-top: 0.75rem; }
.tw-transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.tw-border-b { border-bottom-width: 1px; }
.tw-border-gray-100 { border-color: #f3f4f6; }
.hover-tw-bg-gray-100:hover { background-color: #f3f4f6; }

/* Input Field Styling */
.input-wrapper {
  position: relative;
}

.input-field {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: #fff;
  transition: border-color 0.15s ease-in-out;
  line-height: 1.5;
}

.input-field:hover {
  border-color: #9ca3af;
}

.input-field:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-field.error {
  border-color: #ef4444;
}

.validationError {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #ef4444;
}

/* PrimeVue Drawer Styles */
.p-drawer-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1100;
}

.p-drawer {
  display: flex;
  flex-direction: column;
  pointer-events: auto;
  transform: translate3d(0, 0, 0);
  position: relative;
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  height: fit-content;
}

.p-drawer-bottom {
  width: 100%;
  height: fit-content;
}

/* Drawer Transition - Combined backdrop fade and drawer slide */
.drawer-enter-active {
  transition: opacity 0.3s ease;
}

.drawer-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-enter-from {
  opacity: 0;
}

.drawer-enter-to {
  opacity: 1;
}

.drawer-leave-from {
  opacity: 1;
}

.drawer-leave-to {
  opacity: 0;
}

/* Drawer slide animation */
.drawer-enter-active .p-drawer,
.drawer-leave-active .p-drawer {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.drawer-enter-from .p-drawer {
  transform: translateY(100%);
}

.drawer-enter-to .p-drawer {
  transform: translateY(0);
}

.drawer-leave-from .p-drawer {
  transform: translateY(0);
}

.drawer-leave-to .p-drawer {
  transform: translateY(100%);
}

/* Flexbox utilities */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.h-full { height: 100%; }
.bg-white { background-color: #fff; }
.rounded-t-3xl { border-top-left-radius: 1.5rem; border-top-right-radius: 1.5rem; }
.p-1 { padding: 0.25rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }

/* Button Styles - matching ElButton */
.ui-button {
  width: 120px;
  height: 40px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}

.ui-button:active {
  transform: scale(0.98);
}

.ui-button--primary {
  background-color: #10b981;
  color: white;
}

.ui-button--primary:hover {
  background-color: #059669;
}

.ui-button--secondary {
  background-color: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.ui-button--secondary:hover {
  background-color: #e5e7eb;
}

.w-100 {
  width: 100%;
}

/* Date Picker Container */
.date-picker-container {
  height: 200px;
  display: flex;
  position: relative;
  background: #fff;
  overflow: hidden;
  border-radius: 10px;
  margin: 0;
  gap: 1rem;
  padding: 0;
}

.picker-column {
  flex: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.column-label {
  text-align: center;
  padding: 0.75rem 0;
  font-weight: 600;
  font-size: 0.875rem;
  color: #4b5563;
  background: #fff;
  position: relative;
  z-index: 2;
  opacity: 0;
  display: none;
}

.picker-scroller {
  height: 100%;
  position: relative;
  flex: 1;
  overflow: hidden;
  touch-action: none;
  -webkit-overflow-scrolling: touch;
  transform: translateY(-20%);
  cursor: grab;
  user-select: none;
}

.picker-scroller:active {
  cursor: grabbing;
}

.picker-scroller ul {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 131px 0;
  margin: 0;
  list-style: none;
  transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1);
  direction: rtl;
}

.picker-scroller li {
  height: 44px;
  line-height: 44px;
  text-align: center;
  color: #9ca3af;
  font-size: 1rem;
  transition: all 0.15s ease;
  cursor: pointer;
  font-weight: 500;
  padding: 0 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transform-origin: center center;
  position: relative;
}

.picker-scroller li:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
}

.picker-scroller li:last-child::after {
  border-bottom: 0;
  background-color: transparent;
}

.picker-scroller li.selected {
  color: #4b5563;
  font-weight: 700;
  transform: scale(1.05);
  position: relative;
  z-index: 1;
}

.picker-scroller li.selected::after {
  opacity: 0;
}

.picker-scroller li.selected + li::after {
  opacity: 0;
}

.selection-mask {
  position: absolute;
  top: 13px;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  height: 205px;
  background: linear-gradient(
    to bottom,
    #fff 0%,
    rgba(255, 255, 255, 0.9) 5%,
    rgba(255, 255, 255, 0.3) 30%,
    rgba(255, 255, 255, 0) 45%,
    rgba(255, 255, 255, 0) 55%,
    rgba(255, 255, 255, 0.3) 70%,
    rgba(255, 255, 255, 0.9) 95%,
    #fff 100%
  );
}

.selection-frame {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 44px;
  transform: translateY(calc(-50% - 1px));
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  pointer-events: none;
}
</style>
