import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { Link, useLocalSearchParams } from 'expo-router';
import { View, Dimensions, SectionList } from 'react-native';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { Badge } from '~/components/ui/badge';
import { Text } from '~/components/ui/text';
import { P, H1, H2, Muted, H4, H3 } from '~/components/ui/typography';
import { getRoutineById, type Routine as RoutineType } from '~/repository';
import type { ExerciseSet, SetTarget, Intensity as IntensityType } from '~/types';

export default function RoutineScreen() {
  const { id } = useLocalSearchParams();
  const { data, isSuccess } = useQuery(getRoutineById(id as string));

  return (
    <View className="flex flex-1 flex-col gap-y-4 bg-background p-4 pt-10">
      {isSuccess && data ? <Routine routine={data} /> : <H2>Loading...</H2>}
    </View>
  );
}

const Routine = ({ routine }: { routine: RoutineType }) => {
  const width = Dimensions.get('window').width;
  // console.log('routine', routine);
  return (
    <View className="flex-1 gap-4">
      <H1>{routine.name}</H1>
      <Muted>{routine.description}</Muted>

      <SectionList
        sections={routine.routine_weeks.map(({ routine_workouts, id, ...week }) => ({
          key: id,
          data: routine_workouts,
          ...week,
        }))}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          // gap: 8,
          paddingBottom: 128,
        }}
        renderItem={({ index, item: workout }) => (
          <Accordion type="single" collapsible key={workout.id}>
            <AccordionItem value={workout.id}>
              <AccordionTrigger>
                <H3>
                  {workout.order} - {workout.name}
                </H3>
              </AccordionTrigger>
              <AccordionContent className="flex-1 gap-4">
                {workout.routine_exercises.map((exercise) => (
                  <View key={exercise.id} className="flex-1 gap-2">
                    <Link href={`/(app)/(protected)/exercises/${exercise.data?.id}`}>
                      <H4 className="text-sm">{exercise.data?.name}</H4>
                    </Link>

                    <View className="flex-1 gap-1">
                      {(exercise.sets as unknown as ExerciseSet[])?.map((set, index) => (
                        <View key={index} className="flex-row gap-2">
                          <Badge variant="outline" className="text-sm">
                            <Text className="text-sm">{index + 1}</Text>
                          </Badge>
                          <Target target={set.target} />
                          <Text className="text-sm">at</Text>
                          <Intensity intensity={set.intensity} />
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        renderSectionHeader={({ section: { week_number, name } }) => (
          <View className="bg-background pb-4">
            <H2>Week #{week_number}</H2>
            <Muted>{name}</Muted>
          </View>
        )}
        SectionSeparatorComponent={() => <View className="h-8" />}
        stickySectionHeadersEnabled
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

function Target({ target }: { target: SetTarget }) {
  if (target.type === 'rep') {
    return <Text className="text-sm">{target.reps} reps</Text>;
  }
  if (target.type === 'repRange') {
    return (
      <Text className="text-sm">
        {target.minReps} to {target.maxReps} reps
      </Text>
    );
  }
  if (target.type === 'repMin') {
    return <Text className="text-sm">at least {target.reps} reps</Text>;
  }
  if (target.type === 'amrap') {
    return <Text className="text-sm">AMRAP {target.timeLimit} seconds</Text>;
  }
  if (target.type === 'time') {
    return <Text className="text-sm">{target.duration} seconds</Text>;
  }
  if (target.type === 'timeRange') {
    return (
      <Text className="text-sm">
        {target.minDuration} to {target.maxDuration} seconds
      </Text>
    );
  }
  return null;
}

function Intensity({ intensity }: { intensity: IntensityType }) {
  if (intensity.type === 'rpe') {
    return <Text className="text-sm"> {intensity.value} RPE</Text>;
  }
  if (intensity.type === 'rpeRange') {
    return (
      <Text className="text-sm">
        {intensity.minValue} to {intensity.maxValue} RPE
      </Text>
    );
  }
  if (intensity.type === 'oneRepMax') {
    return <Text className="text-sm">{intensity.value}% of 1RM</Text>;
  }
  return null;
}
