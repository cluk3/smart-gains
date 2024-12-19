import { useFormContext } from 'react-hook-form';
import { View } from 'react-native';

import { type FormData } from './schema';

import { Button } from '~/components/ui/button';
import { FormCheckbox, FormField, FormInput, FormSelect } from '~/components/ui/form';
import { SelectItem, SelectTrigger, SelectContent } from '~/components/ui/select';
import { Text } from '~/components/ui/text';
import { SET_TYPES_ARR } from '~/const';
import { Trash } from '~/lib/icons/Trash';
import { cn } from '~/lib/utils';
import type { ExerciseSet, Intensity as IntensityType, SetTarget, SetType } from '~/types';

export function SetTracker({
  exerciseIndex,
  setIndex,
  plannedSet,
  removeSet,
}: {
  exerciseIndex: number;
  setIndex: number;
  plannedSet: ExerciseSet | undefined;
  removeSet: (index: number) => void;
}) {
  const { watch, control } = useFormContext<FormData>();

  const isSetCompleted = watch(`exercises.${exerciseIndex}.sets.${setIndex}.completed`);
  return (
    <View
      className={cn('flex flex-1 flex-row items-center py-2', isSetCompleted && 'bg-emerald-50')}>
      <View className="flex flex-[0_0_36px] items-center">
        <FormField
          control={control}
          name={`exercises.${exerciseIndex}.sets.${setIndex}.completed`}
          render={({ field: { ref, ...field } }) => (
            <FormCheckbox uncheckedText={`${setIndex + 1}`} {...field} />
          )}
        />
      </View>
      <View className="flex flex-[0_0_40px] items-center justify-center">
        <FormField
          control={control}
          name={`exercises.${exerciseIndex}.sets.${setIndex}.type`}
          render={({ field: { ref, ...field } }) => (
            <FormSelect {...field}>
              <SelectTrigger className="native:h-8 border-none p-1 shadow-none">
                <SetTypeIcon type={field.value.value} />
              </SelectTrigger>
              <SelectContent>
                {SET_TYPES_ARR.map((type) => (
                  <SelectItem key={type} value={type} label={type} className="gap-2">
                    <SetTypeIcon type={type} />
                    <Text>{type}</Text>
                  </SelectItem>
                ))}
              </SelectContent>
            </FormSelect>
          )}
        />
      </View>
      <Text className="flex flex-[0_0_80px] items-center text-center">
        {plannedSet ? <Intensity intensity={plannedSet.intensity} /> : '-'}
      </Text>
      <Text className="flex flex-[0_0_60px] items-center text-center">
        {plannedSet ? <Target target={plannedSet.target} /> : '-'}
      </Text>

      <FormField
        control={control}
        name={`exercises.${exerciseIndex}.sets.${setIndex}.weight`}
        render={({ field }) => (
          <FormInput
            className="mx-2 w-full text-center"
            containerClassName="flex-1 items-center px-1"
            placeholder="0"
            keyboardType="numeric"
            {...field}
          />
        )}
      />

      <FormField
        control={control}
        name={`exercises.${exerciseIndex}.sets.${setIndex}.measurement`}
        render={({ field }) => (
          <FormInput
            className="w-full px-0 text-center"
            containerClassName="flex-1 items-center px-1"
            placeholder="0"
            keyboardType="numeric"
            {...field}
          />
        )}
      />
      <FormField
        control={control}
        name={`exercises.${exerciseIndex}.sets.${setIndex}.rpe`}
        render={({ field }) => (
          <FormInput
            containerClassName="flex-1 items-center px-1"
            className="w-full text-center"
            // placeholder="0"
            keyboardType="numeric"
            {...field}
          />
        )}
      />

      {!plannedSet && (
        <Button variant="ghost" size="icon" onPress={() => removeSet(setIndex)}>
          <Text asChild className="translate-x-[1px]">
            <Trash size={16} />
          </Text>
        </Button>
      )}
    </View>
  );
}

function Target({ target }: { target: SetTarget }) {
  switch (target.type) {
    case 'rep':
      return <Text>{target.reps}</Text>;
    case 'repRange':
      return (
        <Text>
          {target.minReps} - {target.maxReps}
        </Text>
      );
    case 'repMin':
      return <Text>{target.reps}+</Text>;
    case 'amrap':
      return <Text>AMRAP</Text>;
    case 'time':
      return <Text>{target.duration}</Text>;
    case 'timeRange':
      return (
        <Text>
          {target.minDuration} - {target.maxDuration}
        </Text>
      );
  }
}

function Intensity({ intensity }: { intensity: IntensityType }) {
  switch (intensity.type) {
    case 'rpe':
      return <Text>{intensity.value}</Text>;
    case 'rpeRange':
      return (
        <Text>
          {intensity.minValue} - {intensity.maxValue}
        </Text>
      );
    case 'oneRepMax':
      return <Text>{intensity.value}</Text>;
  }
}

function SetTypeIcon({ type }: { type: SetType }) {
  switch (type) {
    case 'warmup':
      return <Text className="text-base font-bold text-amber-500">W</Text>;
    case 'drop':
      return <Text className="text-base font-bold text-orange-500">D</Text>;
    case 'myoreps':
      return <Text className="text-base font-bold text-red-500">M</Text>;
    case 'normal':
      return <Text className="text-base font-bold text-primary">N</Text>;
  }
}
