# Tinder Swipe App

A React Native/Expo application that demonstrates a Tinder-like swipe interface with smooth animations and gesture handling.

## Features

- **Swipe Gestures**: Swipe left or right on cards with smooth animations
- **Gesture Handling**: Built with `react-native-gesture-handler` for responsive touch interactions
- **Smooth Animations**: Uses `react-native-reanimated` for fluid card movements and rotations
- **Modern UI**: Styled with NativeWind (Tailwind CSS for React Native)
- **Cross-Platform**: Runs on iOS, Android, and Web using Expo

## Tech Stack

- **React Native** with Expo Router
- **TypeScript** for type safety
- **NativeWind** for styling (Tailwind CSS)
- **React Native Gesture Handler** for touch gestures
- **React Native Reanimated** for animations
- **Expo** for cross-platform development

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd tinder-swipe
```

2. Install dependencies:

```bash
npm install
# or
bun install
```

3. Start the development server:

```bash
npm start
# or
bun start
```

4. Run on your preferred platform:

```bash
# iOS
npm run ios
# or
bun run ios

# Android
npm run android
# or
bun run android

# Web
npm run web
# or
bun run web
```

## Project Structure

```
├── app/                    # Expo Router pages
│   ├── _layout.tsx         # Root layout with gesture handler
│   ├── index.tsx          # Main home screen
│   └── +html.tsx          # HTML template for web
├── components/            # Reusable components
│   ├── tinder-card.tsx    # Individual swipeable card
│   ├── tinder-swipe.tsx   # Card stack management
│   ├── container.tsx      # Safe area container
│   └── button.tsx         # Custom button component
├── assets/                # Images and icons
└── global.css             # Global styles
```

## How It Works

1. **Card Stack**: The app displays a stack of cards with sample data
2. **Gesture Detection**: Pan gestures are detected on each card
3. **Animation**: Cards animate smoothly when swiped, including rotation effects
4. **Threshold Logic**: Cards must be swiped beyond 50% of screen width to trigger actions
5. **Card Removal**: Swiped cards are removed from the stack after animation completes

## Key Components

### TinderCard

- Handles individual card gestures and animations
- Implements swipe thresholds and spring animations
- Manages card rotation based on swipe direction

### TinderSwipe

- Manages the card stack state
- Handles swipe callbacks (left/right)
- Renders multiple cards in a stack

## Development

### Available Scripts

- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint and Prettier checks
- `npm run format` - Format code with ESLint and Prettier

### Code Quality

The project uses:

- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type checking

## Learning Objectives

This project demonstrates:

- React Native gesture handling
- Animation libraries integration
- State management with React hooks
- Cross-platform development with Expo
- Modern React Native development patterns
- TypeScript usage in React Native

## Contributing

This is an educational project. Feel free to fork and experiment with:

- Adding more card data
- Implementing different animation effects
- Adding sound effects
- Creating custom card designs
- Adding user profiles and matching logic
