# reboot-pc-dashboard

Dashboard web application built with **Next.js 16** and **TypeScript**. It provides authentication, role-based access, and basic management of products and users. The backend is powered by Supabase, and Tailwind CSS handles styling.

---

## 🛠 Requirements

- Node.js 20 or newer
- [pnpm](https://pnpm.io/) (project uses a workspace)
- A Supabase project with **Auth** and **Database** enabled
- (Optional) Supabase CLI for local development and type generation

---

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone <repository-url>
cd reboot-pc-dashboard
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Configure environment variables**

Copy the example env and fill in your Supabase credentials:

```bash
cp .env.example .env.local
# edit .env.local with your values
```

Required variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. **Generate database types** (optional but recommended)

```bash
pnpm run gen:types
```

The script uses the project ID defined in `package.json` to fetch and generate TypeScript types under `./types/database.types.ts`.

5. **Start the development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📁 Project Structure

- `app/` – Next.js app router entrypoints and layouts
  - `(auth)` – login and authentication flows
  - `(dashboard)` – protected dashboard with nested routes (`products/`, `users/`)
- `components/` – shared UI components (e.g. `theme-toggle.tsx`)
- `lib/` – utilities, Supabase client, auth guards
- `constants/`, `types/`, `schemas/` – shared definitions and validation
- `supabase/` – local Supabase configuration and migrations
- `public/` – static assets

---

## 📦 Available Scripts

| Command              | Description                |
| -------------------- | -------------------------- |
| `pnpm dev`           | Run development server     |
| `pnpm build`         | Build for production       |
| `pnpm start`         | Start production server    |
| `pnpm lint`          | Run ESLint                 |
| `pnpm run gen:types` | Generate Supabase DB types |

---

## 💡 Technologies

- Next.js 16 (app directory)
- React 19 + TypeScript
- Tailwind CSS 4 & PostCSS
- Supabase (Auth + Database)
- Zod for validation
- ESLint + Prettier configuration

---

## 📦 Deployment

You can deploy to any Node.js hosting provider. Vercel is recommended for easy integration with Next.js.
Ensure environment variables are set in production and run:

```bash
pnpm build
pnpm start
```

---

## 🤝 Contributing

Feel free to open issues or pull requests. Keep code style consistent and run `pnpm lint` before committing.

---

## 📜 License

This project is released under the MIT License. (Update if different.)
