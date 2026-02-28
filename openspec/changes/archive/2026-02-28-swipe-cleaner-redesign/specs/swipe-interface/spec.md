# Spec: Swipe Interface (UI Redesign Delta)

## Overview
The visual presentation of the swipe interface is being updated to reflect a clean-tech, blue/white aesthetic (instead of the previous dark mode prototype styling), improving contrast, trust, and clarity for a storage cleaning app.

## Requirements

1. **Card Presentation**
   - The card background MUST be white (`bg-white`).
   - The card container MUST have a soft drop shadow (`shadow-md` or `shadow-lg shadow-black/10`) to separate it from the app background.
   - The card MUST NOT have hard borders.
   - The card corners MUST be rounded (`rounded-3xl` or `rounded-2xl`).

2. **Action Overlays (Keep / Delete Feedback)**
   - The positive "Keep" feedback overlay MUST use a Teal/Mint or Indigo theme (e.g., `bg-teal-500/80` or `text-teal-500`).
   - The negative "Delete" feedback overlay MUST use a softer Rose/Coral theme (e.g., `bg-rose-500/80` or `text-rose-500`).
   - The overlays SHOULD implement a blurred or translucent pill shape, or soft gradient, rather than a raw bordered stamp.

3. **Background & Typography**
   - The app's main background MUST be light (e.g., `bg-slate-50`).
   - Empty state text or navigation indicators MUST be updated to dark/slate readable colors (`text-slate-800` or `text-slate-500`) to contrast against the light background.
   - Text overlays on the media itself (like filename/date) MUST remain readable with a dark translucent background (`bg-black/40` or similar), as the media behind it is unpredictable.

4. **Bottom Controls**
   - The "Undo" button and "Execute Deletion" button MUST conform to the new color scheme (e.g., Indigo/Blue for primary actions).

## Architecture Changes (Delta)
- Changes are restricted to stylistic utility classes (`className` using NativeWind) inside `components/tinder-card.tsx`, `components/tinder-swipe.tsx`, and `app/index.tsx`.
- The `useSwipeWithUndo` logic remains untouched.
