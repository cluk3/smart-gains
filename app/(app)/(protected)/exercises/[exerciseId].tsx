import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { useLocalSearchParams } from 'expo-router';
import { View, Dimensions, SectionList, ScrollView } from 'react-native';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { Badge } from '~/components/ui/badge';
import { Text } from '~/components/ui/text';
import { P, H1, H2, Muted, H4 } from '~/components/ui/typography';
import { getExerciseById, type Exercise as ExerciseType } from '~/repository';
import { SetTracking } from '~/types';

export default function RoutineScreen() {
  const { exerciseId } = useLocalSearchParams();
  const { data, isSuccess, error } = useQuery(getExerciseById(exerciseId as string));
  if (error) {
    return <P>Error: {error.message}</P>;
  }

  return (
    <View className="flex-1 bg-background p-4 pt-10">
      {isSuccess && data ? <Exercise exercise={data} /> : <H2>Loading...</H2>}
    </View>
  );
}

function Exercise({ exercise }: { exercise: ExerciseType }) {
  return (
    <ScrollView className="flex-1 gap-4">
      <H1>{exercise.name}</H1>

      <View className="flex-shrink-0 gap-4 bg-purple-500">
        {exercise.primary_muscles && exercise.primary_muscles.length > 0 && (
          <View>
            <Muted className="text-lg font-semibold">Primary Muscles:</Muted>
            <P>{exercise.primary_muscles.join(', ')}</P>
          </View>
        )}
        {exercise.secondary_muscles && exercise.secondary_muscles.length > 0 && (
          <View>
            <Muted className="text-lg font-semibold">Secondary Muscles:</Muted>
            <P>{exercise.secondary_muscles.join(', ')}</P>
          </View>
        )}
        {exercise.equipment && exercise.equipment.length > 0 && (
          <View className="flex-1 gap-2">
            <Muted className="text-lg font-semibold">Equipment:</Muted>
            <P>{exercise.equipment.join(', ')}</P>
          </View>
        )}
      </View>

      {exercise.instructions && (
        <View className="">
          <Accordion type="single" collapsible>
            <AccordionItem value="instructions">
              <AccordionTrigger>
                <Muted className="text-lg font-semibold">Instructions:</Muted>
              </AccordionTrigger>
              <AccordionContent className="flex-1">
                {exercise.instructions.map((instruction, index) => (
                  <P key={index}>{instruction}</P>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </View>
      )}
    </ScrollView>
  );
}

function History({ exercise }: { exercise: ExerciseType }) {
  // TODO: group by workout and sort by order and workout date
  const sections = exercise.workout_exercise_trackings.map(({ id, sets, weight_unit }) => ({
    key: id,
    data: sets as unknown as SetTracking[],
    weightUnit: weight_unit,
  }));
  return (
    <View className="flex-1 gap-4">
      <H2>History</H2>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          // gap: 8,
          paddingBottom: 128,
        }}
        renderItem={({ index, item: set, section: { weightUnit } }) => (
          <View className="flex-row gap-2">
            <Badge variant="outline" className="text-sm">
              <Text className="text-sm">{index + 1}</Text>
            </Badge>
            <Text className="text-sm">
              {set.measurementType === 'duration'
                ? `${set.measurement} seconds`
                : `${set.measurement} reps with ${set.weight}${weightUnit}`}
              {typeof set.rpe === 'number' && ` at RPE ${set.rpe}`}
            </Text>
          </View>
        )}
        renderSectionHeader={({ section: { weightUnit } }) => (
          <View className="bg-background pb-4">
            <H2>Weight: {weightUnit}</H2>
          </View>
        )}
        SectionSeparatorComponent={() => <View className="h-8" />}
        stickySectionHeadersEnabled
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
