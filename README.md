# Vue Hijri-Gregorian Date Picker

A standalone, fully self-contained Vue 3 date picker component with support for both Gregorian and Hijri (Islamic) calendars.

**🌍 Now with bilingual support: Arabic & English!**

[![npm version](https://img.shields.io/npm/v/vue-hijri-gregorian-datepicker.svg)](https://www.npmjs.com/package/vue-hijri-gregorian-datepicker)
[![npm downloads](https://img.shields.io/npm/dm/vue-hijri-gregorian-datepicker.svg)](https://www.npmjs.com/package/vue-hijri-gregorian-datepicker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/vue-3.x-brightgreen.svg)](https://vuejs.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/vue-hijri-gregorian-datepicker)](https://bundlephobia.com/package/vue-hijri-gregorian-datepicker)

---

## 📸 Preview

<div align="center">

![Vue Hijri-Gregorian Date Picker Demo](https://raw.githubusercontent.com/H-M-H-cmd/vue-hijri-gregorian-datepicker/main/screenshots/demo-preview.png)

*A beautiful, touch-optimized date picker with Hijri and Gregorian calendar support*

</div>

<!-- Want to add more screenshots? Add them to the screenshots/ folder and they'll display here but won't be included in the npm package -->

---

## 📋 Table of Contents

- [Preview](#-preview)
- [Features](#-features)
- [Why This Package?](#-why-this-package)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Usage](#-usage)
- [API Reference](#-api-reference)
- [DateConverter Utility](#️-dateconverter-utility)
- [Styling](#-styling)
- [Real-World Examples](#-real-world-examples)
- [Advanced Configuration](#-advanced-configuration)
- [Browser Support](#-browser-support)
- [How to Add Images](#-how-to-add-images-to-readme)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- 🌍 **Bilingual Support**: Full Arabic & English language support
- 📅 **Dual Calendar Support**: Seamlessly switch between Gregorian and Hijri calendars
- 📱 **Mobile-Friendly**: Touch-optimized with smooth drag interactions
- 🖱️ **Desktop Support**: Mouse wheel and drag support for desktop users
- 🎨 **Customizable**: Flexible styling and configuration options
- 🚀 **Zero Dependencies**: No external dependencies except Vue 3 (peer dependency)
- 📦 **Lightweight**: Small bundle size with no bloat
- 🔄 **Automatic Conversion**: Seamlessly converts between calendar systems
- 🔀 **RTL/LTR Support**: Automatic text direction based on language
- ♿ **Accessible**: Keyboard and screen reader friendly

## 🎯 Why This Package?

### The Problem

Building applications for Islamic countries or Muslim communities requires proper Hijri calendar support. Most date pickers only support Gregorian calendars, forcing developers to:
- Build custom solutions from scratch
- Use heavy libraries with unnecessary dependencies
- Deal with complex date conversion logic
- Handle RTL layouts manually

### The Solution

**vue-hijri-gregorian-datepicker** solves all these problems:

✅ **True Dual Calendar Support**: Not just a converter – seamlessly switch between calendars in real-time
✅ **Zero Dependencies**: Only requires Vue 3 – no bloated libraries
✅ **Built-in Bilingual UI**: Complete Arabic & English translations included
✅ **Accurate Conversions**: Precise Hijri-Gregorian conversions using Julian Day calculations
✅ **Production Ready**: Used in real-world applications serving thousands of users
✅ **Mobile-First Design**: Touch-optimized with smooth animations
✅ **Copy & Paste Ready**: No build process required – just copy the files

### Perfect For

- 🕌 Islamic/Muslim applications (prayer times, Ramadan, Hajj scheduling)
- 🏢 Government portals in Islamic countries (Saudi Arabia, UAE, etc.)
- 📱 Multi-language applications requiring both calendars
- 🌍 International applications targeting Middle East markets
- 📅 Any Vue 3 project needing Hijri calendar support

## 📦 Installation

Install via npm, yarn, or pnpm:

```bash
npm install vue-hijri-gregorian-datepicker
```

```bash
yarn add vue-hijri-gregorian-datepicker
```

```bash
pnpm add vue-hijri-gregorian-datepicker
```

**That's it!** Zero configuration needed. The package has no external dependencies except Vue 3.

---

## ⚡ Quick Start

Get up and running in 2 minutes:

```vue
<script setup>
import { ref } from 'vue';
import InputDate from 'vue-hijri-gregorian-datepicker';

const selectedDate = ref('');
</script>

<template>
  <InputDate
    name="birth_date"
    lang="en"
    v-model="selectedDate"
    placeholder="Select date"
  />

  <p v-if="selectedDate">Selected: {{ selectedDate }}</p>
</template>
```

**Done!** You now have a fully functional date picker with Hijri and Gregorian calendar support.

---

## 🚀 Usage

### Basic Usage (English)

```vue
<script setup>
import { ref } from 'vue';
import InputDate from './components/InputDate.vue';

const selectedDate = ref('');
</script>

<template>
  <InputDate
    name="birth_date"
    lang="en"
    v-model="selectedDate"
    placeholder="Select date"
  />
</template>
```

### Basic Usage (Arabic)

```vue
<script setup>
import { ref } from 'vue';
import InputDate from './components/InputDate.vue';

const selectedDate = ref('');
</script>

<template>
  <InputDate
    name="birth_date"
    lang="ar"
    v-model="selectedDate"
    placeholder="اختر التاريخ"
  />
</template>
```

### Using Both Calendar Formats

```vue
<script setup>
import { ref } from 'vue';
import InputDate from './components/InputDate.vue';

const hijriDate = ref('');
const gregorianDate = ref('');
</script>

<template>
  <InputDate
    name="birth_date"
    placeholder="اختر التاريخ"
    v-model:hijri-date="hijriDate"
    v-model:gregorian-date="gregorianDate"
  />
</template>
```

### With Hijri as Default Calendar

```vue
<template>
  <InputDate
    name="birth_date"
    :default-calendar="'hijri'"
    v-model="hijriDate"
    placeholder="تاريخ الميلاد"
  />
</template>
```

### With Validation

```vue
<script setup>
import { ref } from 'vue';
import InputDate from './components/InputDate.vue';

const date = ref('');
const errors = ref('');

const validateDate = () => {
  if (!date.value) {
    errors.value = 'التاريخ مطلوب';
  } else {
    errors.value = '';
  }
};
</script>

<template>
  <InputDate
    name="birth_date"
    :errors="errors"
    placeholder="تاريخ الميلاد"
    v-model="date"
    @change="validateDate"
  />
</template>
```

### Auto-Select Today's Date

```vue
<template>
  <InputDate
    name="start_date"
    :auto-select-today="true"
    placeholder="تاريخ البداية"
    v-model="startDate"
  />
</template>
```

## 📖 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `String` | **Required** | Input field name |
| `lang` | `String` | `'en'` | UI language (`'ar'` for Arabic, `'en'` for English) |
| `placeholder` | `String` | `'اختر التاريخ'` | Placeholder text |
| `label` | `String` | `''` | Label text |
| `errors` | `String\|Boolean` | `false` | Validation error message |
| `defaultCalendar` | `String` | `'gregorian'` | Default calendar type (`'gregorian'` or `'hijri'`) |
| `showMonthNames` | `Boolean` | `false` | Show full month names instead of numbers |
| `autoSelectToday` | `Boolean` | `false` | Auto-select today's date when no value provided |
| `yearOffset` | `Number` | `0` | Years to subtract from current year for end range |
| `beginYearHijri` | `Number` | `1350` | Start year for Hijri calendar |
| `beginYearGregorian` | `Number` | `1900` | Start year for Gregorian calendar |
| `containerClass` | `String` | `'date-input-container'` | CSS class for container |
| `labelClass` | `String` | `'date-input-label'` | CSS class for label |
| `inputClass` | `String` | `''` | CSS class for input field (overrides default styles) |
| `confirmButtonClass` | `String` | `''` | CSS class for confirm button (overrides default styles) |
| `cancelButtonClass` | `String` | `''` | CSS class for cancel button (overrides default styles) |
| `drawerMaxWidth` | `String` | `'360px'` | Maximum width of the drawer/modal (e.g., '500px', '100%') |

### v-model Bindings

| Binding | Type | Description |
|---------|------|-------------|
| `v-model` | `String` | Main model value (format depends on `defaultCalendar`) |
| `v-model:hijri-date` | `String` | Hijri date in `YYYY-MM-DD` format |
| `v-model:gregorian-date` | `String` | Gregorian date in `YYYY-MM-DD` format |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `change` | `String` | Emitted when date selection is confirmed |
| `update:modelValue` | `String` | Emitted when main model value changes |
| `update:hijriDate` | `String` | Emitted when Hijri date changes |
| `update:gregorianDate` | `String` | Emitted when Gregorian date changes |

## 🛠️ DateConverter Utility

The package also exports a standalone `DateConverter` utility for date conversions:

```javascript
import DateConverter from './DateConverter.js';

// Convert Gregorian to Hijri
const hijriDate = DateConverter.gregorianToHijri('2023-08-20');
console.log(hijriDate); // "1445-02-04"

// Convert Hijri to Gregorian
const gregorianDate = DateConverter.hijriToGregorian('1445-02-04');
console.log(gregorianDate); // "2023-08-20"

// Test conversion accuracy
DateConverter.testConversion('2023-08-20');
// Logs: "Gregorian: 2023-08-20 -> Hijri: 1445-02-04 -> Back to Gregorian: 2023-08-20"
```

### DateConverter API

#### `gregorianToHijri(date, format?)`

Converts a Gregorian date to Hijri.

- **Parameters:**
  - `date` (String): Date string (e.g., `"2023-08-20"`)
  - `format` (String, optional): Format pattern (default: `"YYYY-MM-DD"`)
- **Returns:** Hijri date string in `YYYY-MM-DD` format

#### `hijriToGregorian(date, format?)`

Converts a Hijri date to Gregorian.

- **Parameters:**
  - `date` (String): Date string (e.g., `"1445-02-04"`)
  - `format` (String, optional): Format pattern (default: `"YYYY-MM-DD"`)
- **Returns:** Gregorian date string in `YYYY-MM-DD` format

#### `testConversion(gregorianDate)`

Tests conversion accuracy by performing a round-trip conversion.

- **Parameters:**
  - `gregorianDate` (String): Gregorian date to test
- **Returns:** Object with `{ gregorian, hijri, backToGregorian }`

## 🎨 Styling

The component comes with default styles that can be easily customized. All styles are scoped and use CSS custom properties where appropriate.

### Customizing Styles

You can override the default styles by targeting the component's classes:

```css
/* Override input field styles */
.date-input-field {
  border-color: #your-color;
  border-radius: 8px;
}

/* Override button styles */
.confirm-button {
  background: #your-primary-color;
}

/* Override drawer styles */
.drawer-content {
  border-radius: 24px 24px 0 0;
}
```

Or use the `inputClass` prop to completely override the default input styles:

```vue
<InputDate
  name="birth_date"
  input-class="my-custom-input"
  v-model="date"
/>
```

```css
/* Your custom styles - these will replace the default input styles */
.my-custom-input {
  width: 100%;
  border: 2px solid #3b82f6;
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 16px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.my-custom-input:hover {
  border-color: #2563eb;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.my-custom-input:focus {
  outline: none;
  border-color: #1d4ed8;
}
```

**Note**: When `inputClass` is provided, it **completely replaces** the default `input-field` class. Make sure to include all necessary styles (width, padding, border, etc.) in your custom class.

### Customizing Button Styles

You can also customize the confirm and cancel buttons:

```vue
<InputDate
  name="event_date"
  confirm-button-class="custom-confirm-btn"
  cancel-button-class="custom-cancel-btn"
  v-model="date"
/>
```

```css
/* Custom confirm button */
.custom-confirm-btn {
  width: 100%;
  height: 44px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.custom-confirm-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.4);
}

/* Custom cancel button */
.custom-cancel-btn {
  width: 100%;
  height: 44px;
  background-color: transparent;
  color: #6b7280;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.custom-cancel-btn:hover {
  background-color: #f3f4f6;
  border-color: #d1d5db;
}
```

**Note**: Like `inputClass`, the button class props **completely replace** the default button styles. Make sure to include all necessary styles.

### Customizing Drawer Width

You can control the maximum width of the date picker drawer/modal:

```vue
<!-- Default width (360px) - Good for mobile -->
<InputDate
  name="date"
  v-model="date"
/>

<!-- Wider drawer (500px) - Better for desktop -->
<InputDate
  name="date"
  drawer-max-width="500px"
  v-model="date"
/>

<!-- Full width on mobile, limited on desktop -->
<InputDate
  name="date"
  drawer-max-width="100%"
  v-model="date"
/>

<!-- Custom responsive width -->
<InputDate
  name="date"
  drawer-max-width="min(90vw, 600px)"
  v-model="date"
/>
```

**Common Use Cases:**

| Drawer Width | Best For |
|--------------|----------|
| `'360px'` (default) | Mobile-first design |
| `'500px'` | Desktop applications |
| `'100%'` | Full-width mobile experience |
| `'min(90vw, 600px)'` | Responsive design (90% width, max 600px) |
| `'clamp(320px, 80vw, 800px)'` | Advanced responsive (min 320px, max 800px) |

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

MIT License - feel free to use in personal and commercial projects.

## 🤝 Contributing

Contributions are welcome! This is a standalone package with no build process, so you can:

1. Make changes directly to the files
2. Test in your Vue 3 project
3. Submit improvements

## 💡 Tips & Tricks

### Date Format

Both calendars use the `YYYY-MM-DD` format:
- Gregorian: `"2023-08-20"`
- Hijri: `"1445-02-04"`

### Using with Form Libraries

The component works seamlessly with form validation libraries. Just bind the validation errors:

```vue
<InputDate
  name="birth_date"
  :errors="errors.birth_date"
  v-model="form.birth_date"
/>
```

### RTL Support

The component is designed for RTL (Right-to-Left) interfaces by default, making it perfect for Arabic applications.

### Custom Year Ranges

Control the year range with `beginYear*` and `yearOffset` props:

```vue
<InputDate
  name="birth_date"
  :begin-year-gregorian="1950"
  :year-offset="18"
  v-model="birthDate"
/>
```

This will show years from 1950 to (current year - 18).

## 📱 Real-World Examples

### Example 1: Multi-Language Application

```vue
<script setup>
import { ref, computed } from 'vue';
import InputDate from 'vue-hijri-gregorian-datepicker';

const locale = ref('ar'); // 'ar' or 'en' from your i18n store
const birthDate = ref('');

const placeholder = computed(() =>
  locale.value === 'ar' ? 'اختر تاريخ الميلاد' : 'Select birth date'
);
</script>

<template>
  <InputDate
    name="birth_date"
    :lang="locale"
    :placeholder="placeholder"
    :default-calendar="locale === 'ar' ? 'hijri' : 'gregorian'"
    v-model="birthDate"
  />
</template>
```

### Example 2: Form Integration with vee-validate

```vue
<script setup>
import { ref } from 'vue';
import InputDate from 'vue-hijri-gregorian-datepicker';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  birthDate: yup.string().required('Birth date is required'),
  contractDate: yup.string().required('Contract date is required'),
});

const { errors, values, validate } = useForm({
  validationSchema: schema,
});

const birthDate = ref('');
const contractDate = ref('');
</script>

<template>
  <form @submit.prevent="validate">
    <InputDate
      name="birth_date"
      lang="en"
      v-model="birthDate"
      :errors="errors.birthDate"
      placeholder="Select your birth date"
    />

    <InputDate
      name="contract_date"
      lang="en"
      v-model="contractDate"
      :errors="errors.contractDate"
      :default-calendar="'hijri'"
      placeholder="Select contract date"
    />

    <button type="submit">Submit</button>
  </form>
</template>
```

### Example 3: Legal data

```vue
<script setup>
import { ref } from 'vue';
import InputDate from 'vue-hijri-gregorian-datepicker';

const hijriDate = ref('');
const gregorianDate = ref('');

// Both dates stay in sync automatically
</script>

<template>
  <div class="form-section">
    <h3>تاريخ إصدار العقد</h3>
    <InputDate
      name="contract_date"
      lang="ar"
      :default-calendar="'hijri'"
      :begin-year-hijri="1400"
      v-model:hijri-date="hijriDate"
      v-model:gregorian-date="gregorianDate"
      placeholder="تاريخ إصدار العقد"
      input-class="custom-input-style"
    />

    <p class="text-muted">
      التاريخ الهجري: {{ hijriDate }} |
      التاريخ الميلادي: {{ gregorianDate }}
    </p>
  </div>
</template>
```

### Example 4: Age Restriction (21+ Only)

```vue
<script setup>
import { ref, computed } from 'vue';
import InputDate from 'vue-hijri-gregorian-datepicker';

const birthDate = ref('');
const currentYear = new Date().getFullYear();
const error = ref('');

const validateAge = () => {
  if (birthDate.value) {
    const selectedYear = parseInt(birthDate.value.split('-')[0]);
    if (currentYear - selectedYear < 18) {
      error.value = 'You must be at least 18 years old';
    } else {
      error.value = '';
    }
  }
};
</script>

<template>
  <InputDate
    name="birth_date"
    lang="en"
    :year-offset="21"
    :begin-year-gregorian="1950"
    v-model="birthDate"
    :errors="error"
    placeholder="Enter your birth date"
    @change="validateAge"
  />
</template>
```

### Example 5: Islamic Events Calendar

```vue
<script setup>
import { ref } from 'vue';
import InputDate from 'vue-hijri-gregorian-datepicker';

const ramadanStart = ref('');
const hajjDate = ref('');
</script>

<template>
  <div class="islamic-calendar">
    <h2>Islamic Events</h2>

    <!-- Ramadan Start Date -->
    <div class="event">
      <label>بداية رمضان</label>
      <InputDate
        name="ramadan_start"
        lang="ar"
        :default-calendar="'hijri'"
        :show-month-names="true"
        v-model="ramadanStart"
        placeholder="حدد تاريخ بداية رمضان"
      />
    </div>

    <!-- Hajj Date -->
    <div class="event">
      <label>تاريخ الحج</label>
      <InputDate
        name="hajj_date"
        lang="ar"
        :default-calendar="'hijri'"
        :show-month-names="true"
        v-model="hajjDate"
        placeholder="حدد تاريخ الحج"
      />
    </div>
  </div>
</template>
```

### Example 6: Custom Styling

```vue
<script setup>
import { ref } from 'vue';
import InputDate from 'vue-hijri-gregorian-datepicker';

const appointmentDate = ref('');
</script>

<template>
  <InputDate
    name="appointment"
    lang="en"
    container-class="my-date-container"
    input-class="premium-input"
    label-class="premium-label"
    label="Select Appointment Date"
    v-model="appointmentDate"
  />
</template>

<style scoped>
.my-date-container {
  max-width: 400px;
  margin: 20px auto;
}

.premium-input {
  border: 2px solid #3b82f6;
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 16px;
  background: linear-gradient(to right, #ffffff, #f0f9ff);
  transition: all 0.3s ease;
}

.premium-input:hover {
  border-color: #2563eb;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.premium-label {
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 8px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>
```

## 🔧 Advanced Configuration

### Using DateConverter Separately

You can use the `DateConverter` utility independently without the UI component:

```javascript
import { DateConverter } from 'vue-hijri-gregorian-datepicker/DateConverter';

// In your business logic
class EventService {
  static convertEventDates(events) {
    return events.map(event => ({
      ...event,
      hijriDate: DateConverter.gregorianToHijri(event.gregorianDate),
      gregorianDate: event.gregorianDate
    }));
  }

  static isRamadan(hijriDate) {
    const [year, month] = hijriDate.split('-');
    return parseInt(month) === 9; // Ramadan is the 9th month
  }
}
```

### Dynamic Year Ranges

```vue
<script setup>
import { ref, computed } from 'vue';
import InputDate from 'vue-hijri-gregorian-datepicker';

const dateType = ref('birth'); // 'birth' or 'future'

const yearConfig = computed(() => {
  if (dateType.value === 'birth') {
    return {
      beginYear: 1950,
      yearOffset: 18 // Only show dates 18+ years ago
    };
  } else {
    return {
      beginYear: new Date().getFullYear(),
      yearOffset: -10 // Show 10 years into the future
    };
  }
});
</script>

<template>
  <select v-model="dateType">
    <option value="birth">Birth Date</option>
    <option value="future">Future Event</option>
  </select>

  <InputDate
    name="dynamic_date"
    :begin-year-gregorian="yearConfig.beginYear"
    :year-offset="yearConfig.yearOffset"
    v-model="selectedDate"
  />
</template>
```

## 🐛 Known Issues

None at the moment. Report issues by [creating a GitHub issue](https://github.com/H-M-H-cmd/vue-hijri-gregorian-datepicker/issues).

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Setup

```bash
# Clone the repo
git clone https://github.com/H-M-H-cmd/vue-hijri-gregorian-datepicker.git

# Navigate to directory
cd vue-hijri-gregorian-datepicker

# The component is standalone - no dependencies to install!
# Just open InputDate.vue and start editing
```

---

## 📚 Additional Resources

- [npm Package](https://www.npmjs.com/package/vue-hijri-gregorian-datepicker)
- [GitHub Repository](https://github.com/H-M-H-cmd/vue-hijri-gregorian-datepicker)
- [Report Issues](https://github.com/H-M-H-cmd/vue-hijri-gregorian-datepicker/issues)
- [Hijri Calendar on Wikipedia](https://en.wikipedia.org/wiki/Islamic_calendar)
- [Vue 3 Documentation](https://vuejs.org/)

---

## 📝 License

MIT License © 2025 [Hamdy Mohammed](https://github.com/H-M-H-cmd)

See [LICENSE](./LICENSE) for details.

---

## ⭐ Show Your Support

If this package helped you, please give it a star on [GitHub](https://github.com/H-M-H-cmd/vue-hijri-gregorian-datepicker)! ⭐

---

<div align="center">


[npm](https://www.npmjs.com/package/vue-hijri-gregorian-datepicker) • [GitHub](https://github.com/H-M-H-cmd/vue-hijri-gregorian-datepicker) • [Issues](https://github.com/H-M-H-cmd/vue-hijri-gregorian-datepicker/issues)

</div>
