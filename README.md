# MostaJS SaaS Starter — ship your startup MVP

> A clean **full-stack startup foundation** (Next.js 15 + [@mostajs/orm](https://www.npmjs.com/package/@mostajs/orm)): **landing page · authentication · CRUD dashboard**. Rename the entities, keep the foundation, launch your idea. **No database to install** — it runs SQLite in WebAssembly and boots in your browser.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/apolocine/mostajs-saas-starter)
[![Open in Bolt.new](https://img.shields.io/badge/Open_in-Bolt.new-000?style=for-the-badge&logo=stackblitz)](https://bolt.new/github.com/apolocine/mostajs-saas-starter)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> 💡 **Tip:** open it in **StackBlitz** first — its terminal shows install/build logs and errors clearly (handy while you learn and debug).

**Demo login:** `demo@example.com` / `admin123`

---

## Quick start

```bash
git clone https://github.com/apolocine/mostajs-saas-starter.git
cd mostajs-saas-starter
npm install
npm run dev      # http://localhost:3000
```

The app seeds a demo account on first boot (so it's never empty). Log in with the demo credentials, or sign up a fresh account.

## What you get

| Page | What it does |
|---|---|
| `/` | **Landing page** — marketing hero, features, CTA |
| `/signup` · `/login` | **Auth** — email + password, sessions (homegrown, no library) |
| `/dashboard` | **Your projects** — list + create (scoped to the logged-in user) |
| `/dashboard/projects/[id]` | **Tasks** — add / toggle / delete inside a project |
| `/dashboard/account` | Profile (extend it: edit, password change, billing…) |

## The domain — "rename & go"

The starter ships a **generic** model you rename for *your* startup:

| In the code | Rename it to (examples) |
|---|---|
| `User` | your accounts (keep it) |
| `Project` | `Listing`, `Order`, `Patient`, `Course`, `Property`… |
| `Task` | the child rows of your core entity |

Everything (schemas, repositories, pages, actions) is small and commented — change `lib/orm/schemas.ts` and the labels, and you have *your* product's MVP.

## Architecture

```
app/
├── page.tsx                       # landing
├── (auth)/login · signup          # auth forms (Server Actions)
└── dashboard/                     # protected (guard in layout.tsx)
    ├── page.tsx                   # projects list + create
    ├── projects/[id]/page.tsx     # tasks CRUD
    └── account/page.tsx
lib/
├── orm/        schemas · client · repositories · seed-on-boot   # @mostajs/orm
├── auth/       password (scrypt) · session (cookie + DB)        # homegrown auth
└── actions/    auth · projects · tasks                          # Server Actions
```

- **Data** — `@mostajs/orm` with the `sqljs` (SQLite WASM) dialect by default: no native binary, boots anywhere. One API across **13 databases**.
- **Auth** — passwords hashed with Node's built-in **scrypt** (no `bcrypt` native addon). Sessions = a random token stored in the DB + an `httpOnly` cookie. Readable on purpose, so you can understand and extend it.
- **No client JS required for the core flows** — forms use Next.js **Server Actions** (progressive enhancement).

## Switch database (one env, no code change)

Start on WASM SQLite, move to a real database when you deploy:

```bash
DB_DIALECT=sqlite   DATABASE_URL=./app.db                  # local file (npm i better-sqlite3)
DB_DIALECT=postgres DATABASE_URL=postgres://user:pass@host/db   # production
```

The application code never changes — only the env. (Also available: `pglite` Postgres-in-WASM with `idb://` browser persistence.)

## Before you go live

- Change the demo credentials / remove the seed (`ORM_SEED_ON_BOOT=0`).
- Use a durable database (`sqlite` file or `postgres`).
- Add what your startup needs: teams, roles, billing, emails…

## For students 🎓

This is a teaching starter: every file is short and commented. Read it top-to-bottom in ~30 minutes, then make it yours. The same `@mostajs/orm` you see here scales from this in-browser demo to a production Postgres — without rewriting your data layer.

## License

MIT — © Dr Hamid MADANI. The underlying [@mostajs/orm](https://github.com/apolocine/mosta-orm) is AGPL-3.0 (commercial license: drmdh@msn.com).
