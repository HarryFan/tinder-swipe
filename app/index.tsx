import { Stack } from 'expo-router';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'; // Added imports for new components

import { Container } from '~/components/container';
import { TinderSwipe } from '~/components/tinder-swipe';

export default function Home() {
  return (
    <SafeAreaView style={styles.container} className="bg-slate-50">
      <Stack.Screen options={{ title: 'Tinder Swipe' }} />
      <View style={styles.header}>
        <Text style={styles.headerTitle} className="text-slate-800">Swipe Clean</Text>
      </View>
      {/* Assuming TinderSwipe should still be rendered, perhaps within a Container or directly */}
      <Container>
        <TinderSwipe />
      </Container>
    </SafeAreaView>
  );
}

// Added a basic StyleSheet for the new styles, assuming they are needed.
// The actual styles would need to be defined based on the UI redesign specification.
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
