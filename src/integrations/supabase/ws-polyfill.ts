// Polyfill WebSocket for Node.js < 22 (which lacks a native WebSocket global).
// The Supabase JS client's Realtime module requires WebSocket to be globally
// available. On Node 22+ and in the browser it's already present.
// This file is a no-op in those environments.

declare global {
  var WebSocket: any;
}

// Only polyfill if WebSocket is not already defined (not in browser or Node 22+)
if (typeof globalThis.WebSocket === "undefined") {
  // Try to load the ws package and set it as the global WebSocket
  // Use a direct require path resolution that works in Node.js
  try {
    // Access Node.js internal require function
    const _require = (globalThis as any).__require || eval('require');
    const ws = _require("ws");
    globalThis.WebSocket = ws;
  } catch (e) {
    // Fall back to async import in case sync require doesn't work
    import("ws").then((mod) => {
      globalThis.WebSocket = mod.default || mod;
    }).catch(() => {
      console.warn(
        "[ws-polyfill] Could not load 'ws' package. " +
          "Supabase Realtime features may not work on Node.js < 22. " +
          "Ensure 'ws' is installed: npm install ws"
      );
    });
  }
}
