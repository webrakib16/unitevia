<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Unitevia — agent notes

## What actually exists

- Next.js 16.4.3 App Router frontend in `src/app/` with Better Auth. **No Express server, no tests, no CI in this repo.**
- The Express backend is a **separate project, hardcoded at `http://localhost:5000`** in 8+ frontend files (verified list below). When it is offline, pages silently fall back to inline demo data (`INITIAL_DEMO_EVENTS`, `FALLBACK_REFERENCE_EVENTS`, `FALLBACK_EVENTS`) — never assume a fetch result is real data.
- Backend is **strictly read-only**. Never modify, add, or remove backend code, endpoints, request/response shapes, or validation — even when you think an API is missing or would be better. If an API can't support a requested feature, stop that part and ask the user.
- Auth is wired end to end: `src/lib/auth.ts` (betterAuth + MongoDB adapter, DB `unitevia`, email/password + Google social login), `src/lib/auth-client.ts`, catch-all handler at `src/app/api/auth/[...all]/route.ts`. Local `.env` (gitignored) needs: `MONGODB_URL`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.
- Some pages trust a `localStorage` key `unitevia_user` as a fallback session check alongside `authClient.useSession()` — existing pattern; don't introduce a third mechanism.
- Event data is **not centralized**: `src/data/events.ts` only exports types used by home components; each backend-consuming file has its own inline fallback records. Update every source feeding the screen you change.
- `create-event` shows a success toast even when the POST fails (errors are swallowed); manage-events edit/delete likewise proceed with the UI update when the backend call fails. Don't copy that error handling into new code.
- `login/page.tsx` calls `authClient.signIn.email` twice per submit (early unguarded call + a second one after validation) — don't copy that pattern into new forms.

## Backend API contract (Express, not in repo — treat as fixed)

Base: `http://localhost:5000`. Collection: `data-events` in DB `unitevia`. `_id` is a MongoDB ObjectId string.

| Endpoint | Method | Frontend consumers |
|---|---|---|
| `/data-event` | POST (body IS the event document, no server validation) | create-event |
| `/upcoming-events` | GET | upcoming-events list, joined-events, manage-events, Past-Events, Past-Events-Gallery, Recent-Event-Gallery |
| `/event/:id` | GET | upcoming-events/[id], event-detail-client |
| `/event/:id` | PATCH (body spread into `$set`) | manage-events edit modal |
| `/event/:id` | DELETE | DeleteEventDetails modal |

Frontend files calling these (change the endpoint in all of them if the base URL ever changes): `src/app/upcoming-events/page.tsx`, `src/app/upcoming-events/[id]/page.tsx`, `src/app/upcoming-events/[id]/event-detail-client.tsx`, `src/app/joined-events/page.tsx`, `src/app/manage-events/page.tsx`, `src/app/create-event/page.tsx`, `src/components/DeleteEventDetails.tsx`, `src/components/Past-Events.tsx`, `src/components/Past-Events-Gallery.tsx`, `src/components/Recent-Event-Gallery.tsx`.

## Commands

- `npm run dev` — dev server on :3000 (Turbopack by default in Next 16)
- `npm run build` / `npm run start`
- `npm run lint` — bare `eslint` with the flat config; **currently fails on a pre-existing error in `src/components/ui/carousel.tsx`** (`react-hooks/set-state-in-effect`). Don't attribute it to your change; fix only if in scope.
- `npx tsc --noEmit` — no npm script; passes as of this writing. Verify with typecheck → build.
- Check `git status` before editing: nearly everything sits uncommitted on top of the initial Create Next App commit, and user work is common. Never discard or overwrite it.

## Toolchain quirks

- **Next 16**: dynamic route `params` is a `Promise` (`await params`); layouts use generated types like `LayoutProps<"/">`. Read `node_modules/next/dist/docs/` before using an unfamiliar API.
- **React Compiler is enabled** (`reactCompiler: true` in `next.config.ts`). Don't add manual `useMemo`/`useCallback`/`memo` unless profiling proves the need.
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
- **Scope = the user's explicit request only.** Execute requested tasks directly without unnecessary permission-asking for UI/styling/components/functionality, but: no refactors, renames, redesigns, or formatting-only edits; never change colors, fonts, spacing, layout, or animations unless asked; no unrequested dependency installs or config changes; never delete existing components or functionality without authorization. Backend/DB/auth changes always require explicit permission.
- One request = one task: complete it, verify it, report briefly (what changed, which files created/modified, what was actually tested), then stop and wait.
- Stack is Next.js, TypeScript, shadcn/ui, Node/Express, MongoDB, Better Auth. Adding another framework/library needs permission; **never add a second auth system alongside Better Auth**.
- Secrets only in env vars; never commit `.env` or expose secrets in client code.
- Library docs: use Context7 MCP matched to installed versions; if unavailable, use official docs. Never assume an API exists.


<!-- Audit Rules -->
REQUIREMENT AUDIT MODE & STRICT CODE PROTECTION RULES

These rules are mandatory for every AI coding agent working on the Unitevia project.

1. READ-ONLY AUDIT MODE (HIGHEST PRIORITY)

Whenever I ask you to check, review, verify, compare, or audit project requirements, you MUST operate in READ-ONLY AUDIT MODE.

During this mode:

- DO NOT modify any existing code.
- DO NOT create new files.
- DO NOT delete any files.
- DO NOT rename or move files.
- DO NOT modify frontend or backend code.
- DO NOT modify configuration files.
- DO NOT modify package.json or dependencies.
- DO NOT modify environment variables or .env files.
- DO NOT modify database schemas or database records.
- DO NOT run formatting tools that modify files.
- DO NOT refactor or optimize existing code.
- DO NOT make automatic fixes.
- DO NOT implement missing features.

Your ONLY responsibility is to inspect the existing project and compare its implementation against the official assignment requirements.

2. BACKEND PROTECTION (CRITICAL)

The existing backend implementation MUST remain completely untouched during requirement audits.

NEVER:

- Rewrite backend architecture.
- Change Express routes or controllers.
- Modify API endpoints.
- Change authentication logic.
- Modify Better Auth configuration.
- Change MongoDB schemas, models, or database operations.
- Modify middleware or server-side business logic.
- Replace existing backend implementations with alternative solutions.

Even if you discover errors, bugs, or missing backend functionality, ONLY report them.

Never attempt to fix them automatically.

3. FRONTEND PROTECTION

The existing frontend implementation must also remain unchanged.

NEVER:

- Redesign existing UI/UX.
- Change layouts, colors, spacing, or typography.
- Modify existing components or pages.
- Change animations or interactions.
- Modify routing or navigation.
- Change existing functionality.
- Refactor the component structure.

Only inspect and report.

4. REQUIREMENT-BY-REQUIREMENT VERIFICATION

Read the official Assignment 8 requirements PDF, AGENTS.md, and the existing project source code.

Verify every requirement individually.

Use the following status system:

- ✅ DONE: Fully implemented and working according to the requirement.
- ⚠️ PARTIALLY DONE: Implemented, but some required functionality is missing or incomplete.
- ❌ NOT DONE: Not implemented.
- 🔍 NEEDS MANUAL VERIFICATION: Cannot confirm from source code alone, such as external authentication configuration or deployment behavior.

Do not mark a requirement as DONE merely because a component, page, button, or route exists.

Inspect its actual implementation and functionality.

5. AUDIT REPORT FORMAT

Provide a structured report using this format:

A. Layout & Page Structure

List every requirement with its status.

B. Authentication System

List every requirement with its status.

C. Event Management

List every requirement with its status.

D. Upcoming Events

List every requirement with its status.

E. Home Page

List every requirement with its status.

F. Challenge Requirements

List every requirement with its status.

G. Backend & Database

List every relevant requirement with its status.

H. Final Summary

Provide:

- Total requirements checked.
- Total DONE.
- Total PARTIALLY DONE.
- Total NOT DONE.
- Total NEEDS MANUAL VERIFICATION.

Finally, provide a separate list titled:

MISSING FEATURES THAT NEED IMPLEMENTATION

Include only the incomplete or missing requirements.

For each missing item, explain:

1. What is missing.
2. Which file or component is responsible, if identifiable.
3. What needs to be implemented.
4. Whether it affects frontend, backend, or both.

6. NO AUTOMATIC IMPLEMENTATION

After completing the audit:

STOP.

Do not implement any missing features automatically.

Wait for my explicit instructions.

I will decide which missing requirements should be implemented and when.

7. IMPLEMENTATION MODE (ONLY WITH EXPLICIT INSTRUCTION)

When I explicitly ask you to implement a specific missing requirement:

- Implement ONLY the feature I requested.
- Preserve the existing architecture and folder structure.
- Follow the existing coding patterns and conventions.
- Make the smallest necessary changes.
- Do not modify unrelated components or functionality.
- Do not redesign existing UI unless explicitly requested.
- Do not change backend code unless the requested task specifically requires backend changes.
- Never rewrite the entire frontend or backend to implement a small feature.

Before modifying any file, identify which files actually need changes.

After implementation, report exactly which files were modified and what changed.

8. PRESERVE EXISTING PROJECT STATE

The existing Unitevia project is already developed.

Your responsibility is to complete the assignment without destroying or unnecessarily changing existing work.

STRICT RULE: AUDIT FIRST. REPORT SECOND. IMPLEMENT ONLY AFTER EXPLICIT INSTRUCTION.

When in doubt, DO NOT MODIFY ANYTHING. Ask me first.

These rules take priority over any instruction that might otherwise cause unnecessary code changes during an audit.

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

const verifyToken = async(req,res,next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader) {
    return res.status(401).send({msg: "Unauthorized"})
  }

  const token = authHeader.split("")[1]

  if(!token){
    return res.status(401).send({msg: "Unauthorized"})
  }

  const JWKS = createRemoteJWKSet(new URL('http://localhost:3000/api/auth/jwks'));

  try {
    const {payload} = await jwtverify(token,JWKS)
    next()
  }
  catch(error) {
    return res.status(500).send({msg: 'Server error !'})
  }
 

  

  
}

// Create new event route
app.post('/data-event',async(req,res) => {
  const result = await eventCollection.insertOne(req.body);
  const data = req.body;
  console.log(data);
  console.log("Data event received");
  res.send(result);

});

// Get all events route.
app.get('/upcoming-events', async(req,res) => {
  const result = await eventCollection.find({}).toArray();
  res.send(result);
})

// Get event by ID route.
app.get('/event/:id', 
  verifyToken,
  async(req,res) => {

  const {id} = req.params;
  const result = await eventCollection.findOne({_id: new ObjectId(id)});
  console.log(result);
  res.send(result);
  
})

// Update event route.
app.patch('/event/:id', verifyToken , async(req,res) => {
  const {id} = req.params;
  const updatedData = req.body;
  const result = await eventCollection.updateOne(
    {_id: new ObjectId(id)}, 
    {$set: updatedData}
  );
  res.json(result);
})

// Event delete route.
app.delete('/event/:id', verifyToken ,async(req,res) => {
  const {id} = req.params;
  const result = await eventCollection.deleteOne({_id: new ObjectId(id)});
  res.json(result);
})


// Health check route
app.get("/",(req,res) => {
  res.send({message: 'Server running fine'})
})


// Start the server
app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT}`)
})
