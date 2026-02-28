import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useVideoPlayer, VideoView } from 'expo-video';
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
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const player = useVideoPlayer(item.uri, player => {
    player.loop = true;
    player.muted = true;
    if (isFirst) {
        player.play();
    } else {
        player.pause();
    }
  });

  const pan = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate((event) => {
      translateX.value = startX.value + event.translationX;
      translateY.value = startY.value + event.translationY;
    })
    .onEnd((event) => {
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
    });

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
                <VideoView
                  player={player}
                  style={styles.media}
                  contentFit="cover"
                  nativeControls={false}
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
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.cardContainer, cardStyle]}>
        {item.type === 'video' ? (
          <VideoView
            player={player}
            style={styles.media}
            contentFit="cover"
            nativeControls={false}
          />
        ) : (
          <Image
            source={{ uri: item.uri }}
            style={styles.media}
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
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: 'absolute',
    width: width * 0.9,
    height: height * 0.65,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    overflow: 'hidden',
  },
  media: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  actionIndicator: {
    position: 'absolute',
    top: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 9999, // Pill shape
    overflow: 'hidden',
  },
  likeIndicator: {
    left: 20,
    backgroundColor: 'rgba(45, 212, 191, 0.9)', // Teal-400
  },
  nopeIndicator: {
    right: 20,
    backgroundColor: 'rgba(244, 63, 94, 0.9)', // Rose-500
  },
  actionTextLike: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
  },
  actionTextNope: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
  },
  overlayTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingTop: 40,
    paddingBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  filenameText: {
    color: '#1e293b', // slate-800
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  dateText: {
    color: '#64748b', // slate-500
    fontSize: 14,
  },
});
