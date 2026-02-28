# swipe-interface

## Purpose

TBD

## Requirements

### Requirement: Card Swiping Interaction
The system SHALL display media assets as stackable cards that can be swiped left or right by the user.

#### Scenario: Swipe left to delete
- **WHEN** the user swipes a card to the left
- **THEN** the asset is marked for deletion (binned) and added to the pending delete list

#### Scenario: Swipe right to keep
- **WHEN** the user swipes a card to the right
- **THEN** the asset is marked to be kept and added to the kept list

### Requirement: Video Playback Support
The system SHALL automatically play video assets when they are the active card.

#### Scenario: Video card becomes active
- **WHEN** a video card becomes the top card in the stack
- **THEN** the video auto-plays in a muted state and loops

### Requirement: Undo Action
The system SHALL provide a way to undo the most recent swipe action.

#### Scenario: User undoes a swipe
- **WHEN** the user triggers the undo action
- **THEN** the previous card returns to the top of the stack and is removed from its respective list (pending delete or kept)
