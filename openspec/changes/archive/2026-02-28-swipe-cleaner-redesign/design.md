## Context

The "Swipe Cleaner" app natively integrates with the device gallery to delete media, but currently uses a generic "dark mode Tinder" aesthetic originally from a mockup. To communicate the brand effectively ("clean", "space freeing", "system utility"), we are redesigning the app to a "Blue/White Clean Tech" aesthetic.

## Goals / Non-Goals

**Goals:**
- Transition the color palette to White/Slate-50 for backgrounds, and Indigo/Blue-500 for brand accents.
- Soften the UI (replace borders with drop shadows, reduce harsh contrast).
- Replace "stamped" text indicators for Keep/Delete with a glassmorphism (or translucent gradient) overlay.

**Non-Goals:**
- We skip structural changes: The Reanimated logic for swipes remains exactly the same.
- We skip functional changes: The batch-deletion system and Permissions hooks remain unchanged.

## Decisions

- **Styling Framework**: We will continue using NativeWind. The class names (`bg-gray-900` → `bg-slate-50`) will be cleanly swapped.
- **Card Feedback Shadows**: Instead of hard-coded colors, we will use soft shadows using NativeWind's `shadow-lg shadow-black/10` to make cards feel like floating sheets of paper.
- **Action Feedback**: The Keep/Delete overlay indicators will be rendered as translucent banners (`bg-teal-500/80` or `bg-rose-500/80` with `backdrop-blur`) instead of the bold border-styled text currently used.

## Risks / Trade-offs

- **Risk**: A white background might make very bright or white photos hard to distinguish from the background.
- **Mitigation**: We will ensure the card drop shadow provides sufficient contrast separation between the card edges and the app background.
