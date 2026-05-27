# Quick Start: Admin Content Management

## The Problem (Fixed ✓)
Admin panel changes weren't showing up on the website because changes were saved to the database but the website wasn't listening for updates.

## The Solution (Implemented ✓)
Added **real-time Supabase subscriptions** to the `usePageContent` hook. Now:
- Admin edits content → Database updates → Website sees the change instantly
- No page refresh needed
- Multiple users see updates at the same time
- Changes are permanent (saved in database)

---

## Quick Test

### Open in Two Browser Tabs:

**Tab 1 - Admin Panel:**
```
http://localhost:5000/admin
→ Select "Home — Hero"
→ Change the title to "TEST UPDATE"
→ Click "Update Asset"
```

**Tab 2 - Website:**
```
http://localhost:5000
→ Watch the homepage title change in real-time
→ No refresh needed!
```

---

## What Changed in Code

### File: `src/hooks/usePageContent.ts`

**BEFORE:** Static cache, no real-time updates
```typescript
// Old way - cache never updated
supabase
  .from("site_content")
  .select("data")
  .eq("key", key)
  .maybeSingle()
  .then(({ data: row }) => { ... });
```

**AFTER:** Real-time subscription
```typescript
// New way - listens to database changes
const subscription = supabase
  .channel(`content:${key}`)
  .on('postgres_changes', {
    event: "*",
    schema: "public",
    table: "site_content",
    filter: `key=eq.${key}`,
  }, (payload) => {
    setData(payload.new.data); // ← Updates automatically
  })
  .subscribe();
```

---

## All Editable Content Blocks

| Block Key | Used In | What to Edit |
|-----------|---------|--------------|
| `home.hero` | Homepage | Heading, subtitle, video |
| `about.hero` | About page | About heading, description |
| `services.hero` | Services page | Services title, content |
| `project.hero` | Projects page | Projects title, intro |
| `contact.hero` | Contact page | Contact heading |
| `partner.hero` | Partners page | Partner heading |
| `site.settings` | All pages | Phone, email, address, etc. |

---

## How to Use in Any Page

```typescript
import { usePageContent } from "@/hooks/usePageContent";

export function MyPage() {
  // This automatically updates when admin changes it
  const content = usePageContent("home.hero");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.subtitle}</p>
      {content.video_url && <video src={content.video_url} />}
      {content.image_url && <img src={content.image_url} />}
    </div>
  );
}
```

---

## Architecture Diagram

```
┌─────────────────────┐
│   Admin Panel       │
│   (edit content)    │
└──────────┬──────────┘
           │
           ↓ Save
┌─────────────────────┐
│  Supabase Database  │
│  (site_content)     │
└──────────┬──────────┘
           │
           ↓ Real-time Event
┌─────────────────────┐
│  Website Component  │
│  (usePageContent)   │
└──────────┬──────────┘
           │
           ↓ Update State
┌─────────────────────┐
│  Browser Display    │
│  (instant update!)  │
└─────────────────────┘
```

---

## Verification Checklist

- ✅ Admin panel saves successfully ("Empire architecture updated")
- ✅ Website receives update immediately (no refresh needed)
- ✅ Changes persist after page reload (saved to database)
- ✅ Multiple browsers see the same content
- ✅ Images and videos update correctly
- ✅ No console errors

---

## Deployment

When you deploy to Vercel:
1. All code changes are included ✓
2. Supabase integration stays the same ✓
3. Real-time updates work globally ✓
4. Admin content works anywhere ✓

---

## Need Help?

1. **Check the logs:** `ADMIN_CONTENT_MANAGEMENT.md` (full documentation)
2. **Admin not loading?** Make sure you're logged in and have admin role
3. **Changes not appearing?** Hard refresh browser (Ctrl+Shift+R)
4. **Real-time not working?** Check Supabase credentials in `.env`

---

## Summary

Your admin panel now has **live, real-time updates**. When you or anyone on your team makes changes in the admin panel, the website updates instantly without anyone needing to refresh the page. The database is the source of truth, and all connected users see the changes immediately.

Enjoy your new admin powers! 🚀
