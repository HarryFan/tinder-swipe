## 1. Setup & Environment

- [x] 1.1 Install required Expo and community packages (`expo-media-library`, `expo-av`, `react-native-reanimated`, etc.) if not already present.
- [x] 1.2 Verify `App.tsx` or main entry point structure supports requested navigation or basic screen flow.
- [x] 1.3 Add iOS and Android permission configurations for media library access in `app.json`.

## 2. Media Access & State Management

- [ ] 2.1 Implement `useSwipeWithUndo` hook to manage `pendingDeleteIds`, `keptIds`, and `history` state.
- [ ] 2.2 Implement the `fetchMedia` function within the hook to request OS permissions and fetch the 50 most recent assets.
- [ ] 2.3 Implement the `executeBatchDelete` function that calls `MediaLibrary.deleteAssetsAsync()`.
- [ ] 2.4 Map the raw media assets into the required `MediaCard` structure for the swiper.

## 3. Core UI Implementation

- [ ] 3.1 Create the `CardItem` component supporting both `Image` (for photos) and `Video` (for videos from `expo-av`, muted and autoplaying).
- [ ] 3.2 Implement the main `Swiper` component wrapper (e.g., using `pakenfit/tinder-swipe` or similar) configured with `onSwipedLeft` and `onSwipedRight` callbacks connecting to the state hooks.
- [ ] 3.3 Create the visually distinct Overlay Labels (Red "Delete" and Green "Keep") for swiping actions based on Anti Gravity styling hints (`text-red-500 font-bold uppercase text-4xl`).

## 4. Bottom Controls & Feedback

- [ ] 4.1 Implement the bottom control bar featuring the "Undo" button (connected to the history stack) and the "Execute Delete" button.
- [ ] 4.2 Restyle the buttons using NativeWind/Tailwind (Anti Gravity focus), ensuring dynamic styling (e.g., red when `pendingCount > 0`, gray when disabled).
- [ ] 4.3 Add a floating badge or text element to clearly show the user the current `pendingCount`.

## 5. Testing & Verification

- [ ] 5.1 Test media fetching and swiping continuously using a device or simulator with photos/videos.
- [ ] 5.2 Validate that the "Undo" action reverts both UI changes and internal state lists (`pendingDeleteIds` and `keptIds`).
- [ ] 5.3 Test the batch deletion flow safely to ensure assets are only deleted upon final user OS-level confirmation.
