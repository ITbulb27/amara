# React + Vite

# 🌈 Amara's Collection — Project Documentation

> **Clothing For Your Little Sunshine**  
> A React + Vite clothing boutique website built with JSX.

---

## 📁 Project Structure

```
my-react-app/
├── src/
│   ├── assets/
│   │   ├── amara.jpg          # Amara's logo
│   │   ├── clothing1.webp     # Men's wear photo
│   │   ├── clothing2.webp     # Women's wear photo
│   │   ├── clothing4.webp     # Kids' clothing photo
│   │   └── hero.png
│   ├── App.jsx                # Main landing page
│   ├── App.css                # Global styles
│   ├── ContactForm.jsx        # Contact/order form
│   ├── MensPage.jsx           # Men's Wear page
│   ├── WomenPage.jsx          # Women's Wear page
│   ├── KidsPage.jsx           # Kids' Clothing page
│   ├── StreetwearPage.jsx     # Streetwear page
│   ├── main.jsx               # App entry point with React Router
│   └── index.css              # Base CSS
├── public/
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 How to Run the Project

### Step 1 — Open terminal in VS Code
```
Ctrl + ` (backtick)
```

### Step 2 — Go to the project folder
```bash
cd Desktop/jsx/my-react-app
```

### Step 3 — Install dependencies (first time only)
```bash
npm install
```

### Step 4 — Run the development server
```bash
npm run dev
```

### Step 5 — Open in browser
```
http://localhost:5173
```

### To stop the server
```
Ctrl + C
```

---

## 📄 Pages

| Page | URL | File |
|------|-----|------|
| Home / Landing | `/` | `App.jsx` |
| Men's Wear | `/mens` | `MensPage.jsx` |
| Women's Wear | `/women` | `WomenPage.jsx` |
| Kids' Clothing | `/kids` | `KidsPage.jsx` |
| Streetwear | `/streetwear` | `StreetwearPage.jsx` |

---

## 🧩 Features

- ✅ **Landing page** with hero, stats, collections, why us, about, contact
- ✅ **4 collection pages** — Men's, Women's, Kids', Streetwear
- ✅ **Modal popups** on collection cards (Women's & Streetwear)
- ✅ **Separate pages** for Men's, Kids', Women's, Streetwear with product grids
- ✅ **Contact form** with validation
- ✅ **React Router** for navigation between pages
- ✅ **Amara's logo** with blurred hero background
- ✅ **Free Unsplash images** — no download needed
- ✅ **Hover effects** on all cards and buttons
- ✅ **Add to cart** buttons on product pages
- ✅ **Responsive grid** layout

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **Vite** | Build tool & dev server |
| **JSX** | Component syntax |
| **React Router DOM** | Page navigation |
| **CSS-in-JS** | Inline styles |

---

## 📦 Dependencies

```bash
npm install react-router-dom
```

---

## 🎨 Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Pink | `#be185d` | Primary / buttons |
| Light Pink | `#fce7f3` | Backgrounds / borders |
| Dark | `#1a1a2e` | Footer / text |
| Purple | `#7c3aed` | Kids' page accent |
| Dark Gray | `#111827` | Streetwear theme |

---

## ⚠️ Common Errors & Fixes

### ❌ `npm run dev` not working
Make sure you are in the correct folder:
```bash
cd Desktop/jsx/my-react-app
npm run dev
```

### ❌ Blank page / white screen
Open browser console (F12 → Console) to see the error.

### ❌ `useState` already declared
Remove duplicate imports at the top of the file. Keep only one:
```jsx
import { useState } from 'react'
```

### ❌ `Cannot find module './assets/filename'`
Check for typos — common mistake: `assests` instead of `assets`

### ❌ `does not provide an export named 'default'`
Make sure every component file ends with:
```jsx
export default ComponentName
```

### ❌ `useNavigate() must be used inside a Router`
Make sure `main.jsx` has `<BrowserRouter>` wrapping everything.

---

## 📝 How to Add a New Page

1. Create new file: `src/NewPage.jsx`
2. Add `export default function NewPage()` at the bottom
3. In `main.jsx`, add:
```jsx
import NewPage from './NewPage.jsx'
<Route path="/newpage" element={<NewPage />} />
```
4. In `App.jsx` COLLECTIONS, add:
```jsx
link: '/newpage',
```

---

## 🖼️ How to Add Your Own Photos

1. Save photo in `src/assets/` folder
2. Import it in your JSX file:
```jsx
import myPhoto from './assets/myPhoto.jpg'
```
3. Use it as image src:
```jsx
<img src={myPhoto} alt="description" />
```

---

*© 2025 Amara's Collection. Clothing For Your Little Sunshine. 🌈*

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
