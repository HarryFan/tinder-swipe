import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { TinderCard } from './tinder-card';
import { useSwipeWithUndo } from '~/hooks/use-swipe-with-undo';
import { RotateCcw, Trash2 } from 'lucide-react-native';

export const TinderSwipe = () => {
  const {
    cards,
    loading,
    swiperRef, // we will need to refactor custom swiper back logic if we drop react-native-deck-swiper, but for now we manage state here
    handleSwipedLeft,
    handleSwipedRight,
    undoLastAction,
    executeBatchDelete,
    canUndo,
    pendingCount
  } = useSwipeWithUndo();

  // Local state to track which card is on top
  const [currentIndex, setCurrentIndex] = useState(0);

  // We need to manage the stack manually if we aren't using a pre-built swiper that handles 'undo' nicely based on simple state updates.
  // Wait, if we rewrite our TinderCard to just render the `cards[currentIndex]`, we handle swipe callbacks to increment currentIndex.

  const onSwipeLeft = (id: string, index: number) => {
    handleSwipedLeft(index);
    setCurrentIndex(prev => prev + 1);
  };

  const onSwipeRight = (id: string, index: number) => {
    handleSwipedRight(index);
    setCurrentIndex(prev => prev + 1);
  };

  const onUndo = () => {
    if (canUndo && currentIndex > 0) {
      undoLastAction();
      setCurrentIndex(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Loading Gallery...</Text>
      </View>
    );
  }

  // Display only the top 3 cards in the stack to prevent rendering 50 videos at once.
  const stackCards = cards.slice(currentIndex, currentIndex + 3).reverse();

  return (
    <View style={styles.container}>

      {/* Progress / Status Header */}
      <View style={styles.header}>
        <Text style={styles.progressText}>{currentIndex} / {cards.length}</Text>
      </View>

      {/* Cards Area */}
      <View style={styles.cardsContainer}>
        {currentIndex >= cards.length ? (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>All Done! 🎉</Text>
            </View>
        ) : (
            stackCards.map((card, idx) => {
                // Since we reverse the sliced array, the ACTUAL top card is the LAST one in the mapped array
                // (e.g., if rendering 3 cards, index 2 is the top card).
                const isFirst = idx === stackCards.length - 1;
                // We pass the absolute index in the `cards` array to the callbacks, so it perfectly references the data.
                const absoluteIndex = currentIndex + (stackCards.length - 1 - idx);

                return (
                    <TinderCard
                        key={card.id}
                        item={card}
                        isFirst={isFirst}
                        index={idx}
                        swipeLeft={onSwipeLeft}
                        swipeRight={onSwipeRight}
                    />
                );
            })
        )}
      </View>

      {/* Bottom Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.controlButton, canUndo ? styles.buttonActive : styles.buttonDisabled]}
          onPress={onUndo}
          disabled={!canUndo}
        >
          <RotateCcw color={canUndo ? "#FFB800" : "#A1A1AA"} size={32} />
        </TouchableOpacity>

        {/* Floating Badge above Trash if pending */}
        <View style={styles.trashContainer}>
            {pendingCount > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{pendingCount}</Text>
                </View>
            )}
            <TouchableOpacity
                style={[styles.controlButton, styles.deleteButton, pendingCount === 0 && styles.buttonDisabledRed]}
                onPress={executeBatchDelete}
                disabled={pendingCount === 0}
            >
                <Trash2 color={pendingCount > 0 ? "white" : "#fca5a5"} size={32} />
            </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#111827', // Tailwind gray-900 for dark premium feel
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  progressText: {
    color: '#9ca3af', // gray-400
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardsContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 40,
    height: 120, // Ensure space for badge
  },
  controlButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.3)',
    elevation: 5,
  },
  buttonActive: {
    backgroundColor: 'white',
  },
  buttonDisabled: {
    backgroundColor: '#374151', // gray-700
    boxShadow: 'none',
    elevation: 0,
  },
  deleteButton: {
    backgroundColor: '#ef4444', // red-500
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  buttonDisabledRed: {
    backgroundColor: '#7f1d1d', // red-900
    boxShadow: 'none',
    elevation: 0,
  },
  trashContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#f59e0b', // amber-500
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    borderWidth: 2,
    borderColor: '#111827',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  }
});
