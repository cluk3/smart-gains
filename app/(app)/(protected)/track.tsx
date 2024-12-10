import { useQuery, useInsertMutation } from '@supabase-cache-helpers/postgrest-react-query';
import { useLocalSearchParams } from 'expo-router';

import { Container } from '~/components/layout';
import { Text } from '~/components/ui/text';
import Form from '~/components/workout-tracking/form';
import { getWorkoutById } from '~/repository';
import { supabase } from '~/supabase';

export default function TrackScreen() {
  const { workoutId } = useLocalSearchParams<{ workoutId: string }>();

  const { data, isLoading, error, isSuccess } = useQuery(getWorkoutById(workoutId), {
    enabled: !!workoutId,
  });

  const insert = async (data) => {
    // const { data, error } = await supabase.rpc('upsert_workout_tracking', {
    //     p_routine_workout_id: 'your-routine-workout-id', // Replace with the actual routine workout ID
    //     p_duration: 60, // Replace with the actual duration in minutes
    //     p_start_date: new Date().toISOString(), // Replace with the actual start date
    //     p_exercise_trackings: [
    //         {
    //             exercise_id: 'your-exercise-id-1', // Replace with the actual exercise ID
    //             sets: { /* Your sets data here */ },
    //             order: 1,
    //             notes: 'First exercise notes',
    //             weight_unit: 'kg' // Replace with the actual weight unit
    //         },
    //         {
    //             exercise_id: 'your-exercise-id-2', // Replace with the actual exercise ID
    //             sets: { /* Your sets data here */ },
    //             order: 2,
    //             notes: 'Second exercise notes',
    //             weight_unit: 'kg' // Replace with the actual weight unit
    //         }
    //         // Add more exercises as needed
    //     ]
    // });

    const { data: inserted, error } = await supabase.rpc('upsert_workout_tracking', data);
    console.log('inserted', inserted);
    console.log('insert error', error);
  };

  if (isLoading)
    return (
      <Container>
        <Text>Loading...</Text>
      </Container>
    );
  if (error)
    return (
      <Container>
        <Text>Error: {error.message}</Text>
      </Container>
    );

  return (
    <Container className="p-0">
      {isSuccess && !!data && <Form workout={data} onSubmit={insert} />}
    </Container>
  );
}
