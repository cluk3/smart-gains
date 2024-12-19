import { useQuery, useUpsertItem } from '@supabase-cache-helpers/postgrest-react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';

import { Screen } from '~/components/screen';
import { Text } from '~/components/ui/text';
import Form from '~/components/workout-tracking/form';
import { getWorkoutById, insertTrackings, InsertTrackingsData } from '~/repository';

export default function TrackScreen() {
  const { workoutId } = useLocalSearchParams<{ workoutId: string }>();

  const {
    data: workout,
    isLoading,
    error,
    isSuccess,
  } = useQuery(getWorkoutById(workoutId), {
    enabled: !!workoutId,
  });
  const upsertWorkoutTracking = useUpsertItem({
    primaryKeys: ['id'],
    table: 'workout_trackings',
    schema: 'public',
  });

  const handleSubmit = useCallback(
    async (data: InsertTrackingsData) => {
      const inserted = await insertTrackings(data);

      upsertWorkoutTracking(inserted);

      router.replace(`/tracking/${inserted.workout_id}?name=${workout?.name || ''}`);
    },
    [workout, upsertWorkoutTracking]
  );

  return (
    <Screen preset="fixed" contentContainerClassName="flex-1" safeAreaEdges={['bottom']}>
      {isSuccess && !!workout ? (
        <Form workout={workout} onSubmit={handleSubmit} />
      ) : (
        <Text>Loading...</Text>
      )}
    </Screen>
  );
}
