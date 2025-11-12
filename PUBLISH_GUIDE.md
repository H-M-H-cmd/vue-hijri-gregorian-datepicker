# 📦 Publishing Guide for vue-hijri-gregorian-datepicker

This guide will walk you through publishing this package to npm.

## ✅ Pre-Publishing Checklist

Before publishing, make sure you have completed the following:

- [x] ✅ README.md is comprehensive with examples and documentation
- [x] ✅ package.json is configured with proper metadata
- [x] ✅ LICENSE file exists (MIT License)
- [x] ✅ .npmignore is configured to exclude unnecessary files
- [x] ✅ BILINGUAL_SUPPORT.md documentation is complete
- [x] ✅ InputDate.vue component is finalized
- [x] ✅ DateConverter.js utility is tested
- [x] ✅ Package tested locally with `npm pack --dry-run`

**Package Size**: 18.5 KB (compressed) / 70.1 KB (unpacked) ✨

---

## 🚀 Step-by-Step Publishing Instructions

### Step 1: Update package.json with Your Details

Before publishing, you need to update the `package.json` file with your information:

```json
{
  "author": {
    "name": "Your Name",  // ← Update this
    "email": "your.email@example.com"  // ← Update this
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/vue-hijri-gregorian-datepicker.git"  // ← Update this
  },
  "bugs": {
    "url": "https://github.com/yourusername/vue-hijri-gregorian-datepicker/issues"  // ← Update this
  },
  "homepage": "https://github.com/yourusername/vue-hijri-gregorian-datepicker#readme"  // ← Update this
}
```

### Step 2: Create npm Account (if you don't have one)

1. Go to [https://www.npmjs.com/signup](https://www.npmjs.com/signup)
2. Create a free account
3. Verify your email address

### Step 3: Login to npm via CLI

```bash
npm login
```

You'll be prompted to enter:
- **Username**: Your npm username
- **Password**: Your npm password
- **Email**: Your npm email

### Step 4: Verify Package Contents

Before publishing, verify what will be included:

```bash
cd /home/hamdy/Projects/Domais/agd/vue-hijri-gregorian-datepicker
npm pack --dry-run
```

This should show:
```
📦 vue-hijri-gregorian-datepicker@1.0.0
Tarball Contents:
- BILINGUAL_SUPPORT.md (8.4kB)
- DateConverter.js (7.1kB)
- InputDate.vue (33.7kB)
- LICENSE (1.1kB)
- README.md (18.2kB)
- package.json (1.6kB)
```

### Step 5: Check Package Name Availability

Before publishing, check if the package name is available:

```bash
npm search vue-hijri-gregorian-datepicker
```

If it shows "No matches found", the name is available! ✅

If the name is taken, you'll need to choose a different name in `package.json`.

### Step 6: Publish to npm

**Option A: Public Package (Recommended)**

```bash
npm publish --access public
```

**Option B: Scoped Package (if you want to publish under your username)**

If you want to publish as `@yourusername/vue-hijri-gregorian-datepicker`:

1. Update package name in `package.json`:
   ```json
   "name": "@yourusername/vue-hijri-gregorian-datepicker"
   ```

2. Publish:
   ```bash
   npm publish --access public
   ```

### Step 7: Verify Publication

After publishing, verify your package is live:

1. Go to: `https://www.npmjs.com/package/vue-hijri-gregorian-datepicker`
2. Try installing it:
   ```bash
   npm info vue-hijri-gregorian-datepicker
   ```

---

## 🔄 Updating the Package (Future Versions)

When you make changes and want to publish an update:

### 1. Update Version Number

Follow [Semantic Versioning](https://semver.org/):

```bash
# For bug fixes (1.0.0 → 1.0.1)
npm version patch

# For new features (1.0.0 → 1.1.0)
npm version minor

# For breaking changes (1.0.0 → 2.0.0)
npm version major
```

### 2. Publish Update

```bash
npm publish
```

---

## 📊 Complete Publishing Command Sequence

Here's the complete sequence of commands to publish:

```bash
# 1. Navigate to package directory
cd /home/hamdy/Projects/Domais/agd/vue-hijri-gregorian-datepicker

# 2. Update package.json with your details (manually)
# Edit: author, repository, bugs, homepage

# 3. Login to npm (if not already logged in)
npm login

# 4. Verify package contents
npm pack --dry-run

# 5. Check package name availability
npm search vue-hijri-gregorian-datepicker

# 6. Publish!
npm publish --access public

# 7. Verify
npm info vue-hijri-gregorian-datepicker
```

---

## 🎉 After Publishing

### 1. Update README Badges

Your npm badge will now work! It shows:
```markdown
[![npm version](https://img.shields.io/npm/v/vue-hijri-gregorian-datepicker.svg)](https://www.npmjs.com/package/vue-hijri-gregorian-datepicker)
```

### 2. Test Installation

Try installing your package in a test project:

```bash
npm install vue-hijri-gregorian-datepicker
```

### 3. Create a GitHub Repository (Recommended)

1. Create a new repository on GitHub
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial release v1.0.0"
   git branch -M main
   git remote add origin https://github.com/yourusername/vue-hijri-gregorian-datepicker.git
   git push -u origin main
   ```

### 4. Create a Release Tag

```bash
git tag v1.0.0
git push origin v1.0.0
```

### 5. Announce Your Package!

Share your package on:
- Twitter/X with hashtags: #vuejs #vue3 #hijri #datepicker
- Reddit: r/vuejs
- Vue.js Forum: [https://forum.vuejs.org/](https://forum.vuejs.org/)
- Dev.to: Write an article about it
- Your personal blog/portfolio

---

## 📈 Package Statistics

After publishing, you can track your package statistics:

- **Downloads**: [https://npm-stat.com/charts.html?package=vue-hijri-gregorian-datepicker](https://npm-stat.com/charts.html?package=vue-hijri-gregorian-datepicker)
- **npm Package Page**: [https://www.npmjs.com/package/vue-hijri-gregorian-datepicker](https://www.npmjs.com/package/vue-hijri-gregorian-datepicker)
- **Bundlephobia (Size Analysis)**: [https://bundlephobia.com/package/vue-hijri-gregorian-datepicker](https://bundlephobia.com/package/vue-hijri-gregorian-datepicker)

---

## ⚠️ Important Notes

1. **Package Name**: Must be unique on npm. If taken, choose a different name or use a scoped package (@yourusername/package-name)

2. **Semantic Versioning**: Always follow semver:
   - **Patch** (1.0.x): Bug fixes
   - **Minor** (1.x.0): New features (backward compatible)
   - **Major** (x.0.0): Breaking changes

3. **Cannot Unpublish**: You can only unpublish within 72 hours of publishing. After that, the version is permanent. Be careful!

4. **Two-Factor Authentication**: Consider enabling 2FA on your npm account for security.

5. **Documentation**: Keep README.md updated with every release.

---

## 🐛 Troubleshooting

### Error: "Package name already exists"

**Solution**: Choose a different name or use a scoped package:
```json
"name": "@yourusername/vue-hijri-gregorian-datepicker"
```

### Error: "You must be logged in to publish packages"

**Solution**: Run `npm login` first

### Error: "You do not have permission to publish"

**Solution**: If using a scoped package, ensure you use:
```bash
npm publish --access public
```

### Error: "Version already exists"

**Solution**: Bump the version number:
```bash
npm version patch
```

---

## ✅ Final Checklist Before Publishing

- [ ] Updated `package.json` with your author details
- [ ] Updated repository URLs in `package.json`
- [ ] Logged in to npm (`npm login`)
- [ ] Verified package contents (`npm pack --dry-run`)
- [ ] Checked package name availability
- [ ] Ready to run `npm publish --access public`

---

## 🎊 Success!

Once published, your package will be available worldwide at:

```bash
npm install vue-hijri-gregorian-datepicker
```

Congratulations on publishing your first (or next) npm package! 🎉

---

**Package**: vue-hijri-gregorian-datepicker
**Version**: 1.0.0
**Size**: 18.5 KB (gzipped)
**License**: MIT
**Dependencies**: 0 (only Vue 3 as peer dependency)
