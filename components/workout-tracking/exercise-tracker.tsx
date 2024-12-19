import { useFieldArray, useFormContext } from 'react-hook-form';
import { View } from 'react-native';

import { type FormData } from './schema';
import { SetTracker } from './set-tracker';
import { Text } from '../ui/text';
import { H4, Muted } from '../ui/typography';

import { Button } from '~/components/ui/button';
import { MEASUREMENT_TYPES, SET_TYPES } from '~/const';
import { ListChecks } from '~/lib/icons/ListChecks';
import { ListPlus } from '~/lib/icons/ListPlus';
import { cn } from '~/lib/utils';
import { RoutineExercise } from '~/types';

export function ExerciseTracker({
  exercise,
  exerciseIndex,
}: {
  exercise: RoutineExercise;
  exerciseIndex: number;
}) {
  const {
    fields: setsTracking,
    append: appendSet,
    // prepend,
    remove,
    // swap,
    // move,
    // insert,
  } = useFieldArray<FormData>({
    name: `exercises.${exerciseIndex}.sets`,
  });

  const { setValue, watch } = useFormContext<FormData>();

  const sets = watch(`exercises.${exerciseIndex}.sets`);
  const weightUnit = watch(`exercises.${exerciseIndex}.weightUnit`);

  return (
    <View className="flex flex-col" key={exercise.id}>
      <H4 className="pb-1">{exercise.data?.name}</H4>
      {exercise.notes && <Muted>{exercise.notes}</Muted>}
      <View className="flex-1 pt-2">
        <View className="flex flex-1 flex-row items-center border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            className="flex-[0_0_36px]"
            onPress={() => {
              const isCompleted = sets.every((set) => set.completed);
              sets.forEach((_, index) => {
                setValue(`exercises.${exerciseIndex}.sets.${index}.completed`, !isCompleted);
              });
            }}>
            <Text asChild className={cn(sets.every((set) => set.completed) && 'text-emerald-500')}>
              <ListChecks size={18} />
            </Text>
          </Button>
          <Text className="flex-[0_0_40px] text-center font-bold text-gray-400">Set</Text>
          <Text className="flex-[0_0_80px] text-center font-bold uppercase text-gray-400">
            {exercise.sets[0]?.intensity.type}
          </Text>
          <Text className="flex-[0_0_60px] text-center font-bold text-gray-400">Target</Text>
          <Text className="flex-1 text-center font-bold text-gray-400">{weightUnit}</Text>
          <Text className="flex-1 text-center font-bold text-gray-400">Reps</Text>
          <Text className="flex-1 text-center font-bold text-gray-400">RPE</Text>
        </View>

        {setsTracking.map((setField, setIndex) => {
          const set = exercise.sets[setIndex];

          return (
            <SetTracker
              key={setField.id}
              exerciseIndex={exerciseIndex}
              setIndex={setIndex}
              plannedSet={set}
              removeSet={remove}
            />
          );
        })}
      </View>
      <View className="py-2">
        <Button
          className="rounded-full"
          variant="outline"
          size="icon"
          onPress={() => {
            appendSet({
              weight: '0',
              measurement: '0',
              measurementType:
                exercise.sets[0] && exercise.sets[0].target.type.startsWith('time')
                  ? MEASUREMENT_TYPES.duration
                  : MEASUREMENT_TYPES.reps,
              completed: false,
              type: { value: SET_TYPES.normal, label: SET_TYPES.normal },
            });
          }}>
          <Text asChild className="translate-x-[1px]">
            <ListPlus size={16} />
          </Text>
        </Button>
      </View>
    </View>
  );
}
