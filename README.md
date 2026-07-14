# Amara's Clothing Boutique 🌈

Clothing for your little sunshine — an e-commerce web app for kids', men's, women's, and streetwear clothing built with React, Vite, and Supabase.

---

## ✨ Features

### Customer-facing
- **Home page** with hero section, featured collections (Men's, Women's, Kids', Streetwear), and contact form
- **Shop page** — full product catalog with category filters, search, and add-to-cart
- **Category pages** — dedicated pages for Men's, Women's, Kids', and Streetwear collections
- **Shopping cart** with quantity controls, powered by React Context
- **Checkout** with delivery details form and order placement
- **User accounts** — register/login with email & password, or **Google / Facebook OAuth**
- **Profile page** — view account info, current cart, and order history
- **Fully responsive** — mobile hamburger menu, stacked layouts on small screens

### Admin panel (`/admin`)
- **Dashboard** — total products, orders, revenue, and registered users at a glance, plus recent orders
- **Products** — add (single or bulk), edit, delete products; filter by category and search
- **Sales** — view all orders, filter by status, update order status (pending → processing → shipped → completed/cancelled)
- **Users** — view all registered users, promote/demote between `user` and `admin` roles
- **Responsive admin sidebar** — collapses into a mobile-friendly top bar with hamburger menu

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Routing | React Router (`react-router-dom`) |
| Backend / Database | [Supabase](https://supabase.com) (Postgres, Auth, RLS) |
| Auth | Supabase Auth — Email/Password, Google OAuth, Facebook OAuth |
| Styling | Inline styles (no CSS framework) |

---

## 📁 Project Structure

```
src/
├── assets/                 # Images, logos
├── App.jsx                 # Home page + navbar
├── main.jsx                # Router setup (all <Route> definitions)
├── supabase.js              # Supabase client init
├── AuthContext.jsx         # Auth state, signUp/signIn/signOut/signInWithProvider
├── CartContext.jsx         # Cart state (add/remove/update items)
├── ProtectedRoute.jsx      # Route guard (auth required / admin only)
│
├── LoginPage.jsx           # Email/password + Google/Facebook login
├── RegisterPage.jsx        # Email/password + Google/Facebook signup
├── ProfilePage.jsx         # Account info, cart summary, order history
├── ShopPage.jsx            # Full product catalog
├── MensPage.jsx / WomenPage.jsx / KidsPage.jsx / StreetwearPage.jsx
├── CheckoutPage.jsx        # Cart review + delivery form + place order
├── ContactForm.jsx
│
├── AdminLayout.jsx         # Admin sidebar + responsive mobile top bar
├── AdminDashboard.jsx      # Stats cards + recent orders
├── AdminProducts.jsx       # Product CRUD
├── AdminSales.jsx          # Order management
├── AdminUsers.jsx          # User role management
│
└── utils.js                 # Shared helpers (e.g. formatPrice)
```

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up Supabase
Create a project at [supabase.com](https://supabase.com), then create the following tables in the `public` schema:

- **`profiles`** — `id (uuid, PK, references auth.users)`, `email (text)`, `full_name (text)`, `role (text, default: 'user')`, `created_at (timestamptz)`
- **`products`** — `id`, `name`, `price`, `old_price`, `image`, `category`, `tag`, `stock`, `status`, `created_at`
- **`orders`** — `id`, `customer_name`, `email`, `phone`, `address`, `total`, `status`, `user_id`, `created_at`

### 3. Configure environment
Open `src/supabase.js` and set your project credentials:
```js
const supabaseUrl = 'https://YOUR_PROJECT.supabase.co'
const supabaseKey = 'YOUR_ANON_PUBLIC_KEY'
```
Both values are found in **Supabase Dashboard → Project Settings → API**.

### 4. Enable authentication providers (optional but recommended)
In **Supabase Dashboard → Authentication → Sign In / Providers**:
- Enable **Google** — requires a Client ID/Secret from [Google Cloud Console](https://console.cloud.google.com/)
- Enable **Facebook** — requires an App ID/Secret from [Meta for Developers](https://developers.facebook.com/)
- For both, set the redirect URI to:
  ```
  https://YOUR_PROJECT.supabase.co/auth/v1/callback
  ```

### 5. Run the dev server
```bash
npm run dev
```
To access from another device on the same network (e.g. your phone):
```bash
npm run dev -- --host
```
Then open the **Network** URL shown in the terminal from your phone's browser.

---

## 👑 Creating the first admin account

There's no self-serve "become admin" button (for security). To create your first admin:

1. Register a normal account through the website (`/register`)
2. In **Supabase Dashboard → Table Editor → `profiles`**, find your row
3. Change the `role` column value from `user` to `admin`
4. Log out and log back in on the website
5. Visit `/admin` — you now have access to the Admin Panel

After that, you can promote other users to admin directly from **Admin Panel → Users**.

---

## 📱 Mobile Responsiveness

The site adapts to mobile (≤768px) with:
- Hamburger navigation menu on the main site
- Collapsible admin sidebar (becomes a top bar)
- Stacked (single-column) layouts on Profile and Checkout pages instead of side-by-side columns

---

## 📝 Notes

- Email confirmation is enabled by default in Supabase — new sign-ups must confirm their email before logging in, unless disabled in **Authentication → Providers → Email**.
- Currency is displayed in Philippine Peso (₱) via the `formatPrice()` helper in `utils.js`.