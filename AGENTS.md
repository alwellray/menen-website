# Repository Guidelines

Whatever action you can do yourself, please do yourself, this includes starting apps and verification

## Project Scope

MANEN Facility & Project Solutions Ltd is an engineering-led business in Lagos. Phase 1 is a responsive corporate website that explains its services, sectors, and asset lifecycle approach and generates consultation and quotation enquiries. Use **Plan. Build. Operate. Sustain.** consistently. Follow the navy, corporate blue, gold, and neutral palette. Publish portfolio entries only when MANEN supplies approved details and imagery.

## Proposed Project Structure

The workspace is unscaffolded. Next.js, React, TypeScript, and Tailwind CSS are the proposed stack. If adopted, place routes and layouts in `src/app/`, shared UI in `src/components/`, structured service and portfolio content in `src/content/`, and approved static assets in `public/`. Keep payment processing, transaction reporting, and administrative access for later phases.

## Development and Verification

Once scaffolding is approved, use the package manager specified by the lockfile and run the scripts declared in `package.json`. With npm, `npm run dev` would start local development and `npm run build` would verify the production build. There are currently no runnable scripts, configured test framework, or coverage requirements. For UI changes, verify mobile and desktop layouts, keyboard navigation, and the enquiry flow. Once a test runner is configured, add regression tests for form validation and failure handling using names such as `enquiry.test.ts`.

## Coding Style and Naming

Use two-space indentation and follow the configured formatter and linter once available. Use PascalCase for React components, camelCase for functions and variables, and kebab-case for route segments. Prefer semantic HTML, labelled form controls, and visible keyboard focus.

## Commits and Pull Requests

There is no Git history to establish a convention. Use concise, imperative commit subjects such as `Add consultation form validation`. In pull requests, describe the change and how it was verified, link the relevant issue if one exists, and include desktop and mobile screenshots for visual changes.

## Security and Configuration

Keep credentials in server-only environment variables. When Paystack is introduced, verify payment status server-side before recording a successful transaction.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
