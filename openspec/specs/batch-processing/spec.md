# batch-processing

## Purpose

TBD

## Requirements

### Requirement: Delayed Batch Deletion
The system SHALL NOT permanently delete an asset at the exact moment a user swipes left. Instead, the system SHALL store the asset's ID in a temporary "pending delete" queue.

#### Scenario: Left swipe does not immediately delete
- **WHEN** the user swipes left on a card
- **THEN** the asset is added to the pending queue but remains on the device's storage

### Requirement: Batch Deletion Confirmation
The system SHALL require explicit user confirmation before executing the physical deletion of the queued assets.

#### Scenario: User confirms batch deletion
- **WHEN** the user views the summary of pending deletions and selects "Confirm"
- **THEN** the system executes a batch deletion request to the OS and empties the pending queue upon success

#### Scenario: User cancels batch deletion
- **WHEN** the user views the summary of pending deletions and selects "Cancel"
- **THEN** the system does not delete the assets and the pending queue remains unchanged
