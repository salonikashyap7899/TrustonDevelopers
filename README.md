# Truston1

Environment setup
-----------------

This project requires the following environment variables related to Supabase. Create a local `.env` file (not committed) with the values below or configure them in your hosting provider.

Required:

- `SUPABASE_URL` — your Supabase project URL (e.g. `https://xyz.supabase.co`)
- `SUPABASE_PUBLISHABLE_KEY` — the publishable anon key used by client code
- `SUPABASE_SERVICE_ROLE_KEY` — the service role key for server/admin operations
- `VITE_SUPABASE_PROJECT_ID` — (optional) project id used by Vite builds
- `VITE_SUPABASE_PUBLISHABLE_KEY` — (optional) same as publishable key exposed to Vite
- `VITE_SUPABASE_URL` — (optional) same as `SUPABASE_URL` for client builds

See `.env.example` for a template. Never commit your real keys to the repository.

If you see the error message "Server misconfiguration: Supabase API key is invalid or missing", ensure the above variables are set in your environment where the server runs.

Local dev quick start
---------------------

1. Copy `.env.example` to `.env` and fill real values.
2. Install dependencies: `pnpm install` (or `npm install`)
3. Run the dev server: `pnpm dev` or `npm run dev`

Security note
-------------
Service role keys are sensitive and grant elevated privileges. Only set them in server-side environment variables (not in client-side bundles or public hosting variables that expose them).

