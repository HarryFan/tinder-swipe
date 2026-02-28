import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { PanGestureHandler, GestureHandlerStateChangeEvent, State } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';
import { Video, ResizeMode } from 'expo-av';
import { MediaCard } from '~/hooks/use-swipe-with-undo';

const { width, height } = Dimensions.get('window');

interface TinderCardProps {
  item: MediaCard;
  isFirst: boolean;
  swipeRight: (id: string, index: number) => void;
  swipeLeft: (id: string, index: number) => void;
  index: number;
}

export const TinderCard = ({ item, isFirst, swipeRight, swipeLeft, index }: TinderCardProps) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event: GestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.END) {
      if (translateX.value > 100) {
        // Swipe Right (Keep)
        translateX.value = withTiming(width * 1.5, { duration: 250 }, () => {
          runOnJS(swipeRight)(item.id, index);
        });
      } else if (translateX.value < -100) {
        // Swipe Left (Delete)
        translateX.value = withTiming(-width * 1.5, { duration: 250 }, () => {
          runOnJS(swipeLeft)(item.id, index);
        });
      } else {
        // Reset position
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    }
  };

  const cardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(translateX.value, [-width / 2, 0, width / 2], [-10, 0, 10], 'clamp');

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
      ],
      zIndex: isFirst ? 100 : -index, // Ensure top card has higher z-index
      elevation: isFirst ? 10 : 0, // for Android
    };
  });

  const likeOpacity = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translateX.value, [0, width / 4], [0, 1], 'clamp'),
    };
  });

  const nopeOpacity = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translateX.value, [0, -width / 4], [0, 1], 'clamp'),
    };
  });

  if (!isFirst) {
    return (
        <View style={[styles.cardContainer, { zIndex: -index, elevation: 0 }]}>
            {/* Just a static render for cards underneath to improve performance and avoid complex gesture handling. */}
            {item.type === 'video' ? (
                <Video
                  source={{ uri: item.uri }}
                  style={[StyleSheet.absoluteFillObject, styles.media]}
                  resizeMode={ResizeMode.COVER}
                  shouldPlay={false} // Don't play videos underneath
                />
            ) : (
                <Image
                  source={{ uri: item.uri }}
                  style={[StyleSheet.absoluteFillObject, styles.media]}
                />
            )}
             <View style={styles.overlayTextContainer}>
                <Text style={styles.filenameText}>{item.filename}</Text>
                <Text style={styles.dateText}>{new Date(item.creationTime).toLocaleDateString()}</Text>
            </View>
        </View>
    )
  }

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
      <Animated.View style={[styles.cardContainer, cardStyle]}>
        {item.type === 'video' ? (
          <Video
            source={{ uri: item.uri }}
            style={[StyleSheet.absoluteFillObject, styles.media]}
            resizeMode={ResizeMode.COVER}
            shouldPlay={isFirst} // Only play if it's the top card
            isMuted={true}
            isLooping
          />
        ) : (
          <Image
            source={{ uri: item.uri }}
            style={[StyleSheet.absoluteFillObject, styles.media]}
          />
        )}

        {/* Action Overlays */}
        <Animated.View style={[styles.actionIndicator, styles.likeIndicator, likeOpacity]}>
          <Text style={styles.actionTextLike}>KEEP</Text>
        </Animated.View>
        <Animated.View style={[styles.actionIndicator, styles.nopeIndicator, nopeOpacity]}>
          <Text style={styles.actionTextNope}>DELETE</Text>
        </Animated.View>

        {/* Media Info Overlay */}
        <View style={styles.overlayTextContainer}>
            <Text style={styles.filenameText}>{item.filename}</Text>
            <Text style={styles.dateText}>{new Date(item.creationTime).toLocaleDateString()}</Text>
        </View>

      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: 'absolute',
    width: width * 0.9,
    height: height * 0.7,
    backgroundColor: '#000',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden', // Ensure media respects border radius
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    width: '100%',
    height: '100%',
    borderRadius: 24, // Inner border radius
  },
  actionIndicator: {
    position: 'absolute',
    top: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 4,
    borderRadius: 10,
  },
  likeIndicator: {
    left: 40,
    borderColor: '#4ade80', // Tailwind green-400
    transform: [{ rotate: '-15deg' }],
  },
  nopeIndicator: {
    right: 40,
    borderColor: '#ef4444', // Tailwind red-500
    transform: [{ rotate: '15deg' }],
  },
  actionTextLike: {
    color: '#4ade80',
    fontSize: 40,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  actionTextNope: {
    color: '#ef4444',
    fontSize: 40,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  overlayTextContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 12,
  },
  filenameText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dateText: {
    color: '#d1d5db', // Tailwind gray-300
    fontSize: 14,
    marginTop: 4,
  }
});
