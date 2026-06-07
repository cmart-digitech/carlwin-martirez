# Carlwin Martirez — Professional Profile Website

A minimalist, editorial-style professional profile and portfolio site.  
Built with Next.js 14, TypeScript, Tailwind CSS, and a local JSON content store.

---

## Quick start

### 1. Install dependencies

```bash
npm install
```

### 2. Create your environment file

Copy the example file and set your admin password:

```bash
cp .env.local.example .env.local
```

Open `.env.local` and change `ADMIN_PASSWORD` to something secure:

```
ADMIN_PASSWORD=your-secure-password-here
COOKIE_SECRET=any-long-random-string
```

### 3. Run in development

```bash
npm run dev
```

The site will be available at **http://localhost:3000**  
The admin panel is at **http://localhost:3000/admin**

---

## Editing content

### Via the admin panel (recommended)

1. Go to `http://localhost:3000/admin`
2. Sign in with your admin password
3. Use the sidebar tabs to edit each section
4. Click **Save all changes** — updates are written immediately to `content/site.json`
5. Refresh the public site to see changes

### Directly in the JSON file

All site content lives in `content/site.json`. You can edit it directly in any text editor.  
The structure is self-explanatory — each section maps to a page section.

---

## Uploading project images

1. In the admin panel, go to **Selected Work**
2. Expand a project
3. Click **Upload image** — JPG, PNG, or WebP, max 10 MB
4. Images are stored in `public/uploads/` and referenced by path

To use images from your own hosting, paste the full URL directly into `content/site.json`  
under the project's `"image"` field.

---

## File structure

```
├── app/
│   ├── page.tsx              Public site (one page)
│   ├── layout.tsx            HTML shell, fonts, metadata
│   ├── globals.css           Design tokens and utility styles
│   ├── admin/
│   │   ├── page.tsx          Admin dashboard
│   │   └── login/page.tsx    Login form
│   └── api/
│       ├── content/          Read & write site.json
│       ├── auth/             Login & logout
│       └── upload/           Image upload
├── components/
│   ├── sections/             Hero, About, PracticeAreas, SelectedWork, etc.
│   ├── ui/                   Nav, ThemeWrapper, ImagePlaceholder
│   └── admin/                All editor components
├── content/
│   └── site.json             All editable site content
├── lib/
│   ├── types.ts              TypeScript interfaces
│   └── content.ts            Read/write helpers
├── public/
│   └── uploads/              Uploaded project images
└── middleware.ts             Admin route protection
```

---

## Deploying

### Vercel (recommended — free tier)

1. Push this repo to GitHub
2. Import into [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard:
   - `ADMIN_PASSWORD` → your secure password
   - `COOKIE_SECRET` → any long random string
4. Deploy

> **Note:** Vercel runs on a serverless filesystem — direct file writes (`content/site.json`) will not persist between deployments on the free tier. For persistent editing on Vercel, migrate the content store to **Supabase** (see below).

### Local / self-hosted (simplest for persistent editing)

Run `npm run build && npm start` on any Node.js server. File writes will persist normally.

---

## Migrating to Supabase (future step)

The content model in `lib/types.ts` is designed to map cleanly to Supabase tables.

1. Create a Supabase project
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`
3. Replace `lib/content.ts` with Supabase client calls
4. Use Supabase Storage for image uploads instead of `/public/uploads/`

The component interfaces are unchanged — only the data layer needs updating.

---

## Customising the design

All design tokens are in `app/globals.css`. The admin **Style & Theme** tab controls:

- **Light / Dark** mode
- **Accent colour** — affects links, selections, and interactive elements
- **Font family** — Inter, DM Sans, Libre Baskerville, Playfair Display
- **Font size** — Small / Default / Large
- **Layout density** — Compact / Balanced / Spacious

---

## Adding new projects

1. Admin → Selected Work → **+ Add project**
2. Fill in title, category, location, role, description, tags
3. Upload an image
4. Save

Or add directly in `content/site.json` under `"projects"` following the existing structure.

---

## Content placeholders

Fields marked `[To be added]` in the site are placeholders.  
Update them in the admin panel or directly in `content/site.json` when the information is ready.
