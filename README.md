# Syntra — Motion-First Creative Studio & Creator Agency Network

Syntra is a high-velocity motion editing studio and creator-agency platform built in accordance with the **Dark Luxury Cyber-Editorial** design system (`#080808` Obsidian & `#FFD100` Golden Amber — **Zero Purple**).

---

## 🚀 Live Routes

- **Public Website:** `http://localhost:3000/`
- **Creator & Channel Admin Portal:** `http://localhost:3000/admin`
- **Creators REST API:** `http://localhost:3000/api/creators`
- **Bulk Upload API:** `http://localhost:3000/api/admin/upload`
- **Google Sheets Sync Bridge:** `http://localhost:3000/api/admin/sync-sheet`

---

## 🛠️ Admin Panel Features (`/admin`)

The Admin Panel allows you to upload, edit, and curate all channel and creator details:

1. **Add / Edit Channel:**
   - Channel / Creator Name & Handle
   - Profile / Channel URL (YouTube, Instagram, etc.)
   - Avatar & Banner Thumbnail URLs
   - Niche Category (`Tech & Gadgets`, `AI & Automation`, `SaaS & Productivity`, `Beauty & Grooming`, `Finance & Business`, `Lifestyle & Entertainment`, `Gaming & Esports`)
   - Primary Language (`Hindi`, `English`, `Hinglish`, etc.)
   - Follower / Subscriber Count & Median Views
   - Auto-computed View-to-Follower Ratio (`%`)
   - Public Rate Card Document URL (Google Drive, Notion, PDF)
   - Approval Status (`Approved`, `Pending`, `Draft`)
   - Featured Channel toggle

2. **Bulk Channel Upload:**
   - Drag-and-drop `.csv` or `.json` files
   - Direct copy-paste raw CSV / JSON
   - Pre-built downloadable templates available:
     - `/templates/channels-template.csv`
     - `/templates/channels-template.json`

3. **Google Sheets CRM Live Sync:**
   - Connect your deployed Google Apps Script Web App URL (`Code.gs`)
   - One-click live synchronization and automatic field normalization

4. **Data Persistence:**
   - All records are saved to `data/creators.json` and immediately reflected across the website.
   - Export channels to JSON anytime.

---

## 🎨 Design System & Constraints

- **Theme:** Dark Luxury Cyber-Editorial (Default: Dark Obsidian)
- **Primary Accent:** `#FFD100` Golden Amber
- **Background Foundations:** `#080808`, `#0d0d0d`
- **Typography:** `Syne` (Headings & Numbers) + `Inter` (Body & Navigation)
- **Rule Verification:** **Strictly zero purple / violet / indigo** anywhere in the project.

---

## 💻 Commands

```bash
# Start development server
npm run dev

# Build production bundle
npm run build

# Start production server
npm run start
```
