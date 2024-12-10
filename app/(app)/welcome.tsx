import { Redirect, useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { Image } from '~/components/image';
import { Center, Container } from '~/components/layout';
import { SafeAreaView } from '~/components/safe-area-view';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { H1, Muted } from '~/components/ui/typography';
import { useSupabase } from '~/context/supabase-provider';

export default function WelcomeScreen() {
  const router = useRouter();
  const { user } = useSupabase();
  if (user) {
    return <Redirect href="/(app)/(protected)/(tabs)" />;
  }

  return (
    <Container>
      <Center className="gap-y-4 web:m-4">
        <Image source={require('~/assets/icon.png')} className="h-16 w-16 rounded-xl" />
        <H1 className="text-center">Welcome to Expo Supabase Starter</H1>
        <Muted className="text-center">
          A comprehensive starter project for developing React Native and Expo applications with
          Supabase as the backend.
        </Muted>
      </Center>
      <View className="flex flex-col gap-y-4 web:m-4">
        <Button
          onPress={() => {
            router.push('/sign-up');
          }}>
          <Text>Sign Up</Text>
        </Button>
        <Button
          variant="secondary"
          onPress={() => {
            router.push('/sign-in');
          }}>
          <Text>Sign In</Text>
        </Button>
      </View>
    </Container>
  );
}
