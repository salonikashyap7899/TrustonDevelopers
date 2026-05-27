# Real-Time Admin Content Updates - Testing Guide

## ✅ What's Now Fixed

Your admin panel is **now fully connected** to your website with real-time updates. When you make changes in the admin panel, the website updates **instantly without needing a page refresh**.

## 🧪 How to Test It

### Step 1: Open Two Browser Tabs

1. **Tab 1:** Open the **Admin Panel** → http://localhost:5000/admin
2. **Tab 2:** Open the **About Us Page** → http://localhost:5000/about-us

### Step 2: Edit Content in Admin Panel

1. In Tab 1 (Admin Panel), click on **"About — Hero"** in the System Modules panel
2. Change any of these fields:
   - **Eyebrow:** Change "About Truston" to something else
   - **Title:** Modify "Crafting Lucknow's most coveted addresses."
   - **Title Accent:** Change "Build the Legacy."
   - **Subtitle:** Edit the description

### Step 3: Click "UPDATE ASSET"

Click the **cyan "UPDATE ASSET"** button to save your changes.

### Step 4: Watch Tab 2 Update

**Switch to Tab 2** (About Us Page) and you'll see the changes appear **in real-time** without any refresh!

## 🔍 What's Happening Behind the Scenes

### Real-Time Subscription Flow:
```
Admin Panel
    ↓ (clicks UPDATE ASSET)
Supabase Database (site_content table)
    ↓ (database updates)
Real-Time WebSocket
    ↓ (instant notification)
About Page Hook (usePageContent)
    ↓ (subscribes to changes)
React State Updated
    ↓
UI Re-renders with New Content
```

### Browser Console Logs

Open your browser's Developer Console (F12) and look for these debug messages:

```
[v0] Setting up real-time subscription for: content:about.hero:1
[v0] Subscription status for about.hero : SUBSCRIBED
[v0] Fetched content for key: about.hero {...}
[v0] Real-time update received for about.hero : {new: {...}, old: {...}}
[v0] Content updated for key: about.hero {...}
```

These logs confirm the real-time system is working.

## 📋 Pages Connected to Admin

Currently, these pages pull from the admin panel:
- ✅ **About Us Page** (`about.hero` content key)

## 🚀 How to Connect More Pages

To connect other pages to the admin panel, add the `usePageContent` hook:

```tsx
import { usePageContent } from "@/hooks/usePageContent";

export function MyComponent() {
  const content = usePageContent("my-page.hero", {
    title: "Default Title",
    subtitle: "Default Subtitle",
  });

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.subtitle}</p>
    </div>
  );
}
```

Then add a corresponding row to the `site_content` table in Supabase with:
- `key`: `my-page.hero`
- `label`: `My Page — Hero`
- `data`: `{ "title": "...", "subtitle": "..." }`

## 🐛 Troubleshooting

### Changes Not Appearing?

1. **Check browser console** for error messages (F12)
2. **Verify Supabase connection** - ensure real-time is enabled in your Supabase project
3. **Wait 1-2 seconds** - real-time updates may take a moment
4. **Refresh the page** (F5) - as a last resort, this will fetch the latest data

### No Console Logs?

If you don't see `[v0] Setting up real-time subscription...` logs:

1. Check that Supabase real-time is **enabled** for the `site_content` table
2. Verify your Supabase URL and anon key are correct in `.env`
3. Check browser Network tab for WebSocket connections to Supabase

## ✨ Features

- ✅ Real-time updates via Supabase WebSockets
- ✅ No page refresh needed
- ✅ Multiple pages can be updated simultaneously
- ✅ Client-side caching for performance
- ✅ Automatic cleanup on unmount
- ✅ Detailed debugging logs
- ✅ Fallback content if not in database

## 📝 Admin Panel Fields

The admin panel auto-detects these fields for each content block:
- `eyebrow` - Small text above main title
- `title` - Main heading
- `title_accent` - Secondary heading (often styled differently)
- `subtitle` - Description text
- `image_url` - Hero image URL
- `video_url` - Background video URL

You can add custom fields by editing the `site_content` table directly in Supabase.
