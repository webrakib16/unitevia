<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Unitevia — agent notes

## What actually exists

- Next.js 16.4.3 App Router frontend (`src/app/`) plus Better Auth. **There is no Express server, no event API, no tests, and no CI in this repo.**
- Event UI calls a **separate Express backend hardcoded at `http://localhost:5000`** (`/upcoming-events`, `/event/:id`, `/data-event`). It is not in this repo. When it is offline, list/detail pages silently fall back to hardcoded mock data — don't assume a fetch result is real data.
- Auth is wired end to end: `src/lib/auth.ts` (betterAuth + MongoDB adapter, DB `unitevia`), `src/lib/auth-client.ts`, catch-all handler at `src/app/api/auth/[...all]/route.ts`. Local `.env` (gitignored) needs `MONGODB_URL`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`.
- Event data is **not centralized**: home carousel/past gallery read `src/data/events.ts`; `src/app/upcoming-events/page.tsx` has its own inline `REFERENCE_EVENTS`; `upcoming-events/[id]/page.tsx` has `FALLBACK_EVENTS`. Update every source that feeds the screen you are changing.
- `manage-events` and `joined-events` are empty stub pages. `create-event` posts to the backend but shows a success toast even when the request fails (errors are swallowed).
- `login`/`sign-up` call `authClient` twice per submit (leftover duplicate block) — don't copy that pattern into new forms.

## Commands

- `npm run dev` — dev server on :3000 (Turbopack by default in Next 16)
- `npm run build` / `npm run start`
- `npm run lint` — bare `eslint` with the flat config; **currently fails on a pre-existing error in `src/components/ui/carousel.tsx`** (`react-hooks/set-state-in-effect`) plus 3 unused-var warnings. Don't attribute it to your change; fix only if in scope.
- `npx tsc --noEmit` — no npm script; passes as of this writing. Verify with typecheck → build.
- Check `git status` before editing: almost everything sits uncommitted on top of the initial Create Next App commit, and user work is common. Never discard or overwrite it.

## Toolchain quirks

- **Next 16**: dynamic route `params` is a `Promise` (`await params`); layouts use generated types like `LayoutProps<"/">`. Read `node_modules/next/dist/docs/` before using an unfamiliar API.
- **React Compiler is enabled** (`reactCompiler: true`). Don't add manual `useMemo`/`useCallback`/`memo` unless profiling proves the need.
- **Tailwind v4, CSS-first**: tokens and shadcn variables live in `src/app/globals.css` (`@theme inline`); there is no `tailwind.config.*`. `next.config.ts` registers the `@tailwindcss/turbopack` CSS loader — don't remove that rule.
- **shadcn/ui style "base-nova"** is built on `@base-ui/react`, not Radix — never import `@radix-ui/*`. Add components with `npx shadcn@latest add <component>`.
- **`cn` comes from the `cn` npm package**, not clsx/tailwind-merge. `src/lib/utils.ts` just re-exports it; generated `ui/` files import `from "cn"`.
- **Toasts**: `import { toast } from "@/components/ui/toast"`, then `toast.add({ title, description, type: "success" | "error" })`. Not sonner.
- Site is dark-only: `dark` is hardcoded on `<html>` in `layout.tsx`; the Navbar theme button has no handler. Navbar returns `null` on `/login` and `/sign-up`.
- Local images mostly use `unoptimized`. Replacing a `public/` file with the same filename can keep serving a stale optimized copy in dev; keep `unoptimized` for local assets and don't use query-string `src` (Next 16 blocks it without `images.localPatterns.search`).
- Path alias `@/*` → `./src/*`.

## Working rules

- **Font**: the whole site uses **Poppins** via `next/font/google` in `src/app/layout.tsx` (`--font-poppins` → `--font-sans` in `globals.css`). Use the default `font-sans`; no other font families or hardcoded `font-[...]` stacks without permission.
- **Responsive**: every UI change must work from ~320px phones through tablets (~768–1024px) and desktops (1440px+, iOS Safari). Use `sm:`/`md:`/`lg:`; verify with headless-browser screenshots at 375×812, 768×1024, and 1440/1920 before reporting done.
- Scope = the user's explicit request only. No refactors, renames, redesigns, or formatting-only edits; never change colors, fonts, spacing, layout, or animations unless asked. Inspect existing code and get permission before architectural changes.
- Stack is Next.js, TypeScript, shadcn/ui, Node/Express, MongoDB, Better Auth. Adding another framework/library needs permission; **never add a second auth system alongside Better Auth**.
- Secrets only in env vars; never commit `.env` or expose secrets in client code.
- Library docs: use Context7 MCP matched to installed versions (repo config: `kilo.json`); if unavailable, say so and use official docs. Never assume an API exists.

MOST IMPORTANT: the user's explicit request defines scope. Preserving working code beats improving it. When in doubt, inspect first and ask.


Mandatory Rule: Preserve Original Code & Explicit Permission Before Changes

These rules are mandatory and must be followed by every AI coding agent working on this project.

1. Preserve All Original Code

- Never modify, delete, overwrite, replace, rename, move, or refactor existing original code without my explicit permission.
- Preserve the existing project architecture, folder structure, components, pages, styling, animations, functionality, and coding patterns.
- Do not make unnecessary changes to existing files.
- Do not rewrite an entire file when only a small, targeted change is required.
- Never remove existing code just because you think a different implementation would be better.
- Do not make assumptions that existing code is unnecessary or outdated.

2. Explicit Permission Is Required Before Editing

Before modifying any existing file or original code, you MUST ask for my permission and wait for my approval.

Follow this process:

1. Inspect the relevant files and understand the existing implementation.
2. Identify exactly which files need changes.
3. Explain why each change is necessary.
4. Show me the proposed modifications and their expected impact.
5. Ask for my explicit permission.
6. Wait until I approve before editing any existing file.

Do not interpret silence, general project instructions, or a request to implement a feature as permission to modify unrelated existing code.

3. Minimal Changes Only

After receiving permission:

- Modify only the files I approved.
- Make only the minimum changes required to complete the requested task.
- Preserve all unrelated original code.
- Do not perform unrelated cleanup, optimization, refactoring, formatting, or redesign.
- Do not introduce unnecessary dependencies, components, hooks, utilities, or configuration changes.
- Do not change existing UI, colors, spacing, typography, responsiveness, or animations unless explicitly requested.

4. New Files and Components

- Do not create duplicate pages, components, folders, or utilities.
- Inspect the existing project structure before creating anything.
- Create a new file only when it is genuinely necessary.
- Explain the purpose and location of every proposed new file.
- Ask for my permission before creating new files or folders.

5. Protect Existing User Changes

- Check "git status" before starting any task.
- Never overwrite, discard, reset, or remove my uncommitted changes.
- Never run destructive Git commands without my explicit permission.
- Do not restore or replace original files automatically.

6. Strict Permission Policy

If a task requires modifying existing code beyond the approved scope, STOP.

Explain:

- Which additional file needs modification.
- Why the modification is necessary.
- What functionality may be affected.

Ask for my permission and wait for approval.

Never proceed with unapproved changes.

7. Final Verification

After implementation:

- List every file created.
- List every existing file modified.
- Explain exactly what changed in each file.
- Confirm that unrelated original code was preserved.
- Report any tests actually performed.

Golden Rule: My original code belongs to me. Do not change anything outside the explicitly approved scope. Always ask before modifying existing code.

Mandatory Rule: Backend Code Protection & Frontend-Only Integration

This rule is mandatory for every AI coding agent working on this project.

1. Backend Code Must Never Be Modified

The entire backend is strictly read-only.

- Never modify, edit, delete, overwrite, replace, rename, move, or refactor any backend file.
- Never add or remove backend code.
- Never modify backend APIs, routes, controllers, middleware, models, schemas, database configuration, authentication logic, or server configuration.
- Never change existing API endpoints, HTTP methods, request structures, response structures, or validation rules.
- Never modify backend environment configuration or dependencies.
- Never attempt to fix a frontend issue by changing backend code.

This restriction applies even if you believe a backend modification would improve the implementation.

2. Backend Must Be Used as the Source of Truth

The existing backend implementation defines how the frontend must communicate with the server.

Before implementing any frontend functionality:

1. Inspect the existing backend code.
2. Read the available API routes and HTTP methods.
3. Inspect the controllers and their actual business logic.
4. Inspect MongoDB models and schemas.
5. Understand the required request body, query parameters, headers, and response structures.
6. Understand existing authentication and authorization requirements.
7. Identify the correct API endpoints for the requested functionality.

Treat the existing backend implementation as the single source of truth.

3. All Required Functionality Must Be Implemented in the Frontend

Implement the requested features by consuming the existing backend APIs.

- Make API calls using the actual existing endpoints.
- Send the exact request structure expected by the backend.
- Read and process the actual backend responses.
- Use the existing authentication/session mechanism.
- Display real database data in the UI.
- Implement loading, success, empty, and error states.
- Implement frontend validation according to the backend's existing requirements.
- Handle API errors without changing backend code.
- Ensure all frontend actions work with the existing backend.

Do not use mock data, hardcoded records, or fake API responses as substitutes for actual functionality.

4. If an API Is Missing or Insufficient

If a requested feature cannot be implemented because the required backend API does not exist or does not support that operation:

1. Stop implementation of that specific feature.
2. Explain which API or capability is missing.
3. Explain why the existing backend cannot support the requested functionality.
4. Ask for my explicit permission before considering any backend modification.

Never modify the backend automatically, even when an API is missing.

5. Frontend and Backend Separation

- Backend: Read-only. No modifications under any circumstances without my explicit permission.
- Frontend: Changes are allowed only within the explicitly approved task scope.
- Follow the existing backend API contract when implementing frontend features.
- Do not duplicate backend business logic unnecessarily in the frontend.
- Never bypass server-side authentication or authorization.

6. Final Verification

After implementation, report:

- Which existing backend APIs were inspected.
- Which API endpoints were consumed by the frontend.
- Which frontend files were created or modified.
- Which actual backend operations were successfully tested.
- Any missing backend functionality or limitations.
- Confirmation that no backend files were modified.

Golden Rule

THE BACKEND IS STRICTLY READ-ONLY.

Use the existing backend code and APIs exactly as they are. Implement all requested frontend functionality by following the existing API contracts.

Never change backend code, add backend code, or remove backend code without my explicit permission.

BAckend Code:
import express from "express";
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config'
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT =process.env.PORT || 5000;
const client = new MongoClient(process.env.MONGODB_URL,);
// http://localhost:5000/data-event

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const mongoClient = await connectToMongoDB();
const db = mongoClient.db("unitevia");
const eventCollection = db.collection("data-events");

// Create new event route
app.post('/data-event',async(req,res) => {
  const result = await eventCollection.insertOne(req.body);
  const data = req.body;
  console.log(data);
  console.log("Data event received");
  res.send(result);

});

// Get all events route
app.get('/upcoming-events', async(req,res) => {
  const result = await eventCollection.find({}).toArray();
  res.send(result);
})

// Get event by ID route
app.get('/event/:id',async(req,res) => {
  const {id} = req.params;
  const result = await eventCollection.findOne({_id: new ObjectId(id)});
  console.log(result);
  res.send(result);
  
})

// Event update route
app.patch('/event/:id',async(req,res) => {
  const {id} = req.params;
  const updatedData = req.body;
  const result = await eventCollection.updateOne(
    {_id: new ObjectId(id)}, 
    {$set: updatedData}
  );
  res.json(result);
})

// Event delete route
app.delete('/event/:id',async(req,res) => {
  const {id} = req.params;
  const result = await eventCollection.deleteOne({_id: new ObjectId(id)});
  res.json(result);
})


// Get root route
app.get("/",(req,res) => {
  res.send({message: 'Server running fine'})
})


// Start the server
app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT}`)
})
