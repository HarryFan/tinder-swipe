import { Stack } from 'expo-router';

import { Container } from '~/components/container';
import { TinderSwipe } from '~/components/tinder-swipe';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tinder Swipe' }} />
      <Container>
        <TinderSwipe />
      </Container>
    </>
  );
}
