## Why

The current generic Tinder-like design (dark background, harsh red/green colors) does not accurately reflect the application's true purpose: being a focused, utility-driven tool for cleaning device storage. To communicate trust, modern tech reliability, and a clean feeling (like freeing up space), the app needs a UI/UX redesign adopting a minimal Blue/White “Clean Tech” aesthetic typical of memory or storage cleaning applications.

## What Changes

- **Background & Theme**: Replace dark `bg-gray-900` with clean white/light-gray backgrounds (`bg-white` or `bg-slate-50`).
- **Accent Colors**: Introduce Blue (`bg-blue-500` or Indigo) as the primary brand color for progress indicators and action buttons.
- **Card Styling**: Remove harsh borders, replacing them with soft, modern drop shadows (`drop-shadow-sm` or `shadow-md`) to create a floating sensation.
- **Action Feedbacks (Keep/Delete)**:
  - Change "Keep" indicator from harsh green to a modern Teal (`#2DD4BF`) or Slate Blue.
  - Change "Delete" indicator to a softer Coral Red (`#F43F5E`) or Rose.
  - Implement glassmorphism or smooth gradient overlays for the action indicators instead of raw text stamps.
- **Typography & Icons**: Update the navigation indicators (e.g., replacing the plain fraction counter with a sleek, blue progress bar).

## Capabilities

### Modified Capabilities
- `swipe-interface`: The swipe interaction's visual feedback (shadows, background colors, overlay stamps) is being overhauled from a dark mode theme to a minimal light mode theme.

## Impact

The visual appearance of `app/index.tsx`, `components/tinder-swipe.tsx`, and `components/tinder-card.tsx` will be completely overhauled. No native OS permissions, media batching APIs, or Reanimated physics logic are broken by this; this is strictly a presentational and stylistic layer overhaul.
