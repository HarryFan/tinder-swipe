# media-access

## Purpose

TBD

## Requirements

### Requirement: Request Media Permissions
The system SHALL request user permission to access and delete assets from the device's photo gallery upon starting the cleaning flow.

#### Scenario: User grants permission
- **WHEN** the user starts the cleaning session and accepts the OS-level permission prompt
- **THEN** the system proceeds to load media assets

#### Scenario: User denies permission
- **WHEN** the user denies the OS-level permission prompt
- **THEN** the system displays an alert explaining that permission is required to function

### Requirement: Load Media Assets
The system SHALL fetch a batch of the most recent photos and videos from the user's gallery.

#### Scenario: Successful load
- **WHEN** the application is authorized
- **THEN** the system retrieves up to 50 of the most recent media assets (photos and videos)

### Requirement: Delete Media Assets
The system SHALL permanently delete specified assets from the device when requested.

#### Scenario: Successful deletion
- **WHEN** the system is provided a list of asset IDs to delete
- **THEN** the system requests OS-level deletion and removes the assets from the device
