# GitHub Copilot Instructions for Next.js 15 Project

## 🧠 Project Context
This is a modern web application built with Next.js 15 using the App Router. It uses React 19, TypeScript for type safety, Tailwind CSS for styling, and Radix UI for accessible components.

## 🛠️ Tech Stack
- Next.js 15 (App Router)
- React 19
- TypeScript (strict mode)
- Tailwind CSS v4
- Radix UI
- pnpm for package management

## 🧩 Code Generation Priorities
- **TypeScript-first**: Always use TypeScript with strict typing.
- **Server-first**: Prefer React Server Components unless client interactivity is required.
- **Performance-first**: Optimize for Core Web Vitals and bundle size.
- **Accessibility-first**: Use semantic HTML and ARIA best practices.

## 🗂️ Project Structure
```
src/
├── app/              # App Router pages and layouts
│   ├── api/          # Route handlers (route.ts)
│   └── globals.css   # Global styles
├── components/       # Reusable components
│   └── ui/           # Base UI components (Radix + Tailwind)
├── lib/              # Shared utilities and logic
│   └── cache/        # Caching utilities
├── types/            # Shared TypeScript types
└── __tests__/        # Jest tests
```
- Use `@/*` as import alias for paths inside `src/`.

## ⚛️ React & Next.js Patterns
- Use **functional components** and **React Hooks**.
- Prefer **server components** with explicit `PageProps` interfaces.
- Use `'use client'` directive only when necessary.
- Always handle **loading** and **error states** in data fetching.

## 📦 Package Management
- Use `pnpm` for installing dependencies and running scripts.

## 🧪 Testing
- Use **Jest** and **React Testing Library**.
- Write unit tests for components and utilities in `__tests__/`.

## 📚 Documentation
- Place all documentation in the `docs/` folder.
- Use Markdown for guides and architecture decisions.

## 🧼 Code Style
- Follow Prettier and ESLint rules.
- Use descriptive variable and function names.
- Avoid magic numbers and hardcoded strings.
- Keep components small and focused.
