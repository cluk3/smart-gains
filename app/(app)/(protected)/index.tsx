import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { Button } from '~/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { H1, H2, Muted } from '~/components/ui/typography';
import { supabase } from '~/supabase';

export default function Home() {
  const [programs, setPrograms] = useState(true);
  useEffect(() => {
    supabase
      .from('programs')
      .select(
        `
    routines (id, name, description, image, focus_area, minutes_per_workout, difficulty_level,
      routine_weeks (id, name, description, week_number,
        routine_workouts (id, name, order,
          routine_exercises (id, sets, alternative_exercises, order, notes, tempo_eccentric, tempo_iso_bottom, tempo_iso_top, tempo_concentric,
            data:exercises (id, name, category, instructions, equipment, video, primary_muscles, secondary_muscles)
          )
        )
      )
    )
  `
      )
      .then((res) => {
        setPrograms(res.data?.map((x) => x.routines));
      });
  }, []);

  return (
    <View className="flex-1 items-center justify-center gap-y-4 bg-background p-4 pt-10">
      <H1 className="text-center">Home</H1>
      <Muted className="text-center">
        You are now authenticated and this session will persist even after closing the app.
      </Muted>
      <Button
        className="w-full"
        variant="default"
        size="default"
        onPress={() => router.push('/(app)/modal')}>
        <Text>Open Modal</Text>
      </Button>
      <FlatList
        data={programs}
        renderItem={({ item }) => (
          <Card>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
          </Card>
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => <H2>Programs</H2>}
        ItemSeparatorComponent={() => <View className="h-px bg-border" />}
        contentContainerStyle={{ paddingBottom: 10, gap: 8 }}
      />
    </View>
  );
}
