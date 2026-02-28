## Why

Users accumulate redundant photos and videos in their phone's gallery over time, taking up valuable storage space. A quick, intuitive, and gesture-based way to review and delete these files is needed.

## What Changes

- Add an interactive card-swiping interface (Tinder-like) to review media.
- Integrate with `expo-media-library` to fetch and display actual device photos and videos.
- Add support for playing videos with mute/unmute capabilities (`expo-av`).
- Implement batch deletion of marked media at the end of a session, safely requiring a final confirmation.
- Apply a "premium" design style with native-like UI components and animations.

## Capabilities

### New Capabilities
- `media-access`: Accessing, listing, and physically deleting device photos and videos.
- `swipe-interface`: The core gesture-based interaction for keeping or binning media.
- `batch-processing`: Queueing up deletions and executing them in a batch.

### Modified Capabilities

## Impact

- Requires user permission for photo library access and deletion.
- Integration with Expo SDK for media and AV capabilities.
- New UI layer built with NativeWind and react-native-reanimated.
