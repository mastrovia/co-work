# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CoWork Kerala Admin Panel - A Next.js 16 dashboard application for managing coworking spaces in Kerala. Built with TypeScript, React 19, Tailwind CSS v4, and shadcn/ui components.

## Development Commands

This project uses **Bun** as the package manager, not npm/yarn/pnpm.

```bash
# Development server (runs on port 8080)
bun run dev

# Production build
bun run build

# Start production server (port 8080)
bun run start

# Linting
bun run lint

# Code formatting
bun run format              # Format all files
bun run format:check        # Check formatting without changes

# Install new packages
bun add <package>           # Add dependency
bun add --dev <package>     # Add dev dependency

# shadcn/ui components
bunx shadcn@latest add <component-name>
```

## Architecture Overview

### Layout Pattern

The application uses a consistent three-layer layout architecture:

1. **AppLayout** (`components/layout/app-layout.tsx`) - Root layout wrapper that provides the sidebar and main content area
2. **Page Component** (e.g., `app/analytics/page.tsx`) - Individual route pages that use AppLayout
3. **Header** (`components/layout/header.tsx`) - Reusable page header with breadcrumbs and actions

**Important**: All page components that use interactive elements (onClick handlers, state) must be marked as `'use client'`.

Example structure:

```tsx
'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';

export default function YourPage() {
  return (
    <AppLayout>
      <Header
        title="Page Title"
        breadcrumbs={[{ label: 'Dashboard' }, { label: 'Current' }]}
        action={{ label: 'Action', onClick: () => {} }}
      />
      {/* Page content */}
    </AppLayout>
  );
}
```

### Component Organization

```
components/
├── dashboard/     # Dashboard-specific components (charts, stats)
├── layout/        # Layout components (sidebar, header, app-layout)
└── ui/            # shadcn/ui base components (managed by shadcn CLI)
```

**Do not manually edit `components/ui/` files** - these are managed by shadcn CLI. Instead, use them as building blocks for custom components.

### Navigation System

Navigation items are defined in `components/layout/sidebar.tsx` in the `navigationItems` array. To add a new route:

1. Add the navigation item to the array
2. Create the page in `app/[route]/page.tsx`
3. Use the AppLayout + Header pattern

The sidebar is hidden on mobile (`md:block`) and shows at 64 (256px) width on desktop.

### Color System

All colors are defined as CSS variables in `app/globals.css` using HSL values:

- **Primary colors**: Lines 13-14 (teal/green theme)
- **Accent colors**: Lines 25-26 (success green)
- **Chart colors**: Lines 38-42 (5 chart color variables)

To change the theme, modify these HSL values in `app/globals.css`. Colors automatically propagate to all components via Tailwind utilities (`bg-primary`, `text-accent`, etc.).

### Data Visualization

Uses **Recharts** for all charts. Chart components follow this pattern:

- Must be marked `'use client'`
- Use `ResponsiveContainer` for responsive sizing
- Import chart types from recharts
- Type all Recharts callback props (avoid `any`)

Example: See `components/dashboard/space-type-chart.tsx` for proper TypeScript typing with Recharts.

### Path Aliases

Configured in `tsconfig.json` and `components.json`:

- `@/components/*` → `components/*`
- `@/lib/*` → `lib/*`
- `@/app/*` → `app/*`

Always use path aliases for imports, never relative paths across directories.

## Git Workflow

### Pre-commit Hooks

Husky + lint-staged automatically runs on every commit:

1. ESLint with auto-fix
2. Prettier formatting
3. Commitlint validation

**Do not use `git commit --no-verify`** unless absolutely necessary. Fix the issues instead.

### Commit Message Format

Follows conventional commits with strict validation:

```
<type>: <subject>

<body with max 100 characters per line>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

Body lines must not exceed 100 characters (enforced by commitlint).

## Adding New Features

### New Dashboard Module

1. Add navigation item in `components/layout/sidebar.tsx`
2. Create `app/[module]/page.tsx` with AppLayout wrapper
3. Mark as `'use client'` if using interactivity
4. Create module-specific components in `components/[module]/`

### New shadcn Component

```bash
bunx shadcn@latest add <component-name>
```

This installs to `components/ui/` and updates `components.json` config.

### New Dashboard Chart

1. Create in `components/dashboard/` directory
2. Use `'use client'` directive
3. Wrap in `<Card>` from `@/components/ui/card`
4. Use `ResponsiveContainer` from recharts
5. Type all callback props (no `any` types)
6. Use CSS variables for colors (e.g., `fill="hsl(var(--primary))"`)

## TypeScript Notes

- Strict mode is enabled
- No `any` types allowed (enforced by ESLint)
- Type all Recharts callback props explicitly
- Use `interface` over `type` for object shapes

## Port Configuration

- Development: Port **8080** (not 3000)
- Production: Port **8080**

This is configured in `package.json` scripts with `-p 8080` flag.

## Styling

- Uses Tailwind CSS v4 (latest)
- No Tailwind config file - uses CSS `@theme` directive in `globals.css`
- All styling via utility classes
- Custom theme colors via CSS variables
- Responsive: mobile-first with `md:` breakpoint at 768px

## Coding Rules

- Follow ESLint and Prettier formatting.
- Use TypeScript wherever possible.
- Use consistent naming: `camelCase` for variables, `PascalCase` for components.
- Don’t modify `.env`, `package.json`, or deployment config files unless explicitly asked.
- Don’t install new packages unless required and confirmed.
- Prefer functional components and hooks in React.
- Keep all text content in a `constants` file if reused.

## Additional Commit Rules

- Always add descriptive commit messages.
- Do not automatically commit generated or AI-assistant files.
- Ignore temporary Claude outputs (`claude.log`, `claude_cache/`, etc.) in `.gitignore`.

## Security and Privacy

- Never expose API keys or tokens in code.
- Use environment variables for sensitive data.

## Claude Interaction Guidelines

- Before editing, summarize the plan of change.
- Avoid touching files unrelated to the request.
- When generating code, follow existing structure and naming.
- Always check for compatibility with the current version of dependencies.

## Output Format

- Always use Markdown fenced code blocks (`js, `ts, ```json) for code outputs.
- Include minimal explanations unless specifically asked for documentation.

## Things Not to Do

- Do not create unnecessary example files.
- Do not modify `.git` or `README.md` unless told.
- Do not auto-add or commit files.
