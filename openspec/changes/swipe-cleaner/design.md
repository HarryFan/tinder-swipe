## Context

The goal is to transform a Tinder-like dating app interface into a functional photo and video cleaning tool (SwipeClean). Users need a fast, intuitive way to clear out redundant media from their devices to free up storage space. The system must seamlessly integrate with the device's native photo gallery while providing a safe, strictly controlled deletion mechanism.

## Goals / Non-Goals

**Goals:**
- Provide a smooth card-swiping interface (swipe left for bin, swipe right to keep) for media review.
- Support both photos and videos (with muted autoplay for videos).
- Ensure safe deletion by using a "delayed batch processing" approach rather than instantaneous deletion.
- Implement an "Undo" feature to allow users to reverse accidental swipes.

**Non-Goals:**
- Cloud backup or synchronization of the media.
- Advanced image or video editing features.
- Deep analysis of photos (e.g., detecting duplicates automatically), focusing only on manual user review for now.

## Decisions

**Decision 1: State Management using explicit `pendingDeleteIds` and `keptIds` mapped with a `history` stack.**
- **Rationale**: To support the "Undo" functionality, we cannot delete files immediately upon left-swiping, nor can we lose track of the action sequence. We will use a `history` array recording `{ id, direction }`. When an undo is requested, we pop from the history, update the corresponding ID list, and trigger `swiperRef.current.swipeBack()`.
- **Alternatives Considered**: Immediate physical deletion on each swipe, which was rejected because it triggers constant system confirmation dialogs (especially on iOS) and makes Undo impossible.

**Decision 2: UI implementation with NativeWind and Expo SDKs.**
- **Rationale**: `expo-media-library` provides robust, cross-platform access to the gallery. `expo-av` enables reliable video playback in cards. NativeWind allows for quick, responsive, and "premium" styling (shadows, rounded corners, dynamic colors based on state).
- **Alternatives Considered**: Standard StyleSheet, which is perfectly fine but NativeWind accelerates the styling process in alignment with the "Anti Gravity" premium design directive.

**Decision 3: Performance optimizations for massive galleries.**
- **Rationale**: Loading thousands of high-res photos at once crashes the app. The design will fetch assets in chunks (e.g., `first: 50` via `MediaLibrary.getAssetsAsync`) and rely on efficient rendering (considering FlashList or Swiper's internal windowing).

## Risks / Trade-offs

- **[Risk] High Memory Usage from Video/Image Components** → Mitigation: Keep the rendering window small (only load the current, previous, and next few cards into memory).
- **[Risk] Unbounded History Array** → Mitigation: If memory becomes a problem, the undo history stack can be capped (e.g., `history.slice(-20)`).
- **[Risk] Permissions Denied** → Mitigation: If the user denies photo deletion permissions, gracefully fallback to a warning state explaining why the app cannot function.
