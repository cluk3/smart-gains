import { useFieldArray, useFormContext } from 'react-hook-form';
import { View } from 'react-native';

import { type FormData } from './schema';
import { SetTracker } from './set-tracker';

import { Button } from '~/components/ui/button';
import { MEASUREMENT_TYPES, SET_TYPES } from '~/const';
import { ListPlus } from '~/lib/icons/ListPlus';
import { cn } from '~/lib/utils';
import { type Workout } from '~/repository';
import { WeightUnit } from '~/types';

export function ExerciseTracker({
  exercise,
  exerciseIndex,
  weightUnit,
}: {
  exercise: Workout['routine_exercises'][0];
  exerciseIndex: number;
  weightUnit: WeightUnit;
}) {
  const {
    fields: setsTracking,
    append,
    // prepend,
    remove,
    // swap,
    // move,
    // insert,
  } = useFieldArray({
    name: `exercises.${exerciseIndex}.sets`,
  });

  const { register, setValue, watch } = useFormContext<FormData>();

  const sets = watch(`exercises.${exerciseIndex}.sets`);

  return (
    <View className="flex flex-col" key={exercise.id}>
      <H3 className="from-primary-500 to-primary-500/0 hover:to-primary-500/10 from-[-100%] to-60% pb-1 text-xl font-medium text-zinc-950 [background-image:linear-gradient(35deg,var(--tw-gradient-stops))]">
        {exercise.data.name}
      </H3>
      {exercise.notes && <p>{exercise.notes}</p>}
      <input type="hidden" {...register(`exercises.${exerciseIndex}.exerciseId`)} />
      <View className="grid grid-cols-[auto_auto_auto_4rem_4rem_4rem_2rem]">
        <View className="col-span-7 grid grid-cols-subgrid items-center justify-items-center gap-2 border-b border-zinc-200 p-2 pb-0">
          <View className="flex items-center gap-2 justify-self-start">
            <Button
              variant="ghost"
              onClick={() => {
                const isCompleted = sets.every((set) => set.completed);
                sets.forEach((_, index) => {
                  setValue(`exercises.${exerciseIndex}.sets.${index}.completed`, !isCompleted);
                });
              }}>
              <ListChecks
                className={cn(sets.every((set) => set.completed) && 'text-emerald-500')}
              />
            </Button>
            <span className="font-bold text-gray-400">Set</span>
          </View>

          <span className="font-bold text-gray-400">Intensity</span>
          <span className="font-bold text-gray-400">Target</span>
          <span className="font-bold text-gray-400">{weightUnit}</span>
          <span className="font-bold text-gray-400">Reps</span>
          <span className="font-bold text-gray-400">RPE</span>
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
      <View className="self-start px-4 py-2">
        <Button
          className="size-8 flex-grow-0 rounded-full p-2"
          variant="outline"
          onClick={() => {
            append({
              weight: '0',
              measurement: '0',
              measurementType:
                exercise.sets[0] && exercise.sets[0].type.startsWith('time')
                  ? MEASUREMENT_TYPES.duration
                  : MEASUREMENT_TYPES.reps,
              completed: false,
              type: SET_TYPES.normal,
            });
          }}>
          <ListPlus className="size-6 translate-x-[2px]" />
        </Button>
      </View>
    </View>
  );
}
