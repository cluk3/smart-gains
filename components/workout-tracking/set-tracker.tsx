import { useFormContext } from 'react-hook-form';

import { type FormData, Exercise } from './schema';

import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { FormField, FormItem } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Select, SelectItem, SelectTrigger, SelectContent } from '~/components/ui/select';
import { SET_TYPES_ARR } from '~/const';
import { Trash } from '~/lib/icons/Trash';
import { cn } from '~/lib/utils';
import type { Intensity as IntensityType, SetTarget, SetType } from '~/types';

export function SetTracker({
  exerciseIndex,
  setIndex,
  plannedSet,
  removeSet,
}: {
  exerciseIndex: number;
  setIndex: number;
  plannedSet: Exercise['sets'][0] | undefined;
  removeSet: (index: number) => void;
}) {
  const { register, watch, control } = useFormContext<FormData>();

  const isSetCompleted = watch(`exercises.${exerciseIndex}.sets.${setIndex}.completed`);
  return (
    <div
      className={cn(
        'col-span-7 grid grid-cols-subgrid items-center justify-items-center gap-2 p-2',
        isSetCompleted && 'bg-emerald-50'
      )}>
      <div className="flex flex-row items-center gap-1 justify-self-start">
        <label>
          <input
            className="peer sr-only"
            type="checkbox"
            {...register(`exercises.${exerciseIndex}.sets.${setIndex}.completed`)}
            onKeyDown={preventSubmitOnEnter}
          />
          <div
            className={cn(
              'relative mx-2 flex size-8 h-full items-center justify-center rounded-full border p-1 font-bold',
              'text-zinc-400 peer-focus-visible:outline-none peer-focus-visible:ring-1 peer-focus-visible:ring-zinc-950',
              'hover:bg-primary-200 hover:border-primary-500 transition-colors hover:text-white',
              isSetCompleted && 'border-primary-500 bg-primary-500 text-white'
            )}>
            {setIndex + 1}
          </div>
        </label>
        <FormField
          control={control}
          name={`exercises.${exerciseIndex}.sets.${setIndex}.type`}
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="border-none shadow-none">
                  <SetTypeIcon type={field.value} />
                </SelectTrigger>
                <SelectContent>
                  {SET_TYPES_ARR.map((type) => (
                    <SelectItem
                      key={type}
                      value={type}
                      label={
                        <>
                          <SetTypeIcon type={type} /> {type}
                        </>
                      }
                    />
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>
      <p>{plannedSet ? <Intensity intensity={plannedSet.intensity} /> : '-'}</p>
      <span>{plannedSet ? <Target target={plannedSet.target} /> : '-'}</span>

      <Input
        type="number"
        className="hide-arrows px-1 text-center"
        {...register(`exercises.${exerciseIndex}.sets.${setIndex}.weight`)}
        onKeyDown={preventSubmitOnEnter}
      />
      <Input
        type="number"
        className="hide-arrows px-1 text-center"
        {...register(`exercises.${exerciseIndex}.sets.${setIndex}.measurement`)}
        onKeyDown={preventSubmitOnEnter}
      />
      <Input
        type="number"
        className="hide-arrows px-1 text-center"
        {...register(`exercises.${exerciseIndex}.sets.${setIndex}.rpe`)}
        onKeyDown={preventSubmitOnEnter}
      />
      <input
        type="hidden"
        {...register(`exercises.${exerciseIndex}.sets.${setIndex}.measurementType`)}
      />
      {!plannedSet && (
        <Button variant="ghost" onClick={() => removeSet(setIndex)}>
          <Trash />
        </Button>
      )}
    </div>
  );
}

function Target({ target }: { target: SetTarget }) {
  switch (target.type) {
    case 'rep':
      return <span>{target.reps}</span>;
    case 'repRange':
      return (
        <span>
          {target.minReps} - {target.maxReps}
        </span>
      );
    case 'repMin':
      return <span>{target.reps}+</span>;
    case 'amrap':
      return <span>AMRAP</span>;
    case 'time':
      return <span>{target.duration}</span>;
    case 'timeRange':
      return (
        <span>
          {target.minDuration} - {target.maxDuration}
        </span>
      );
  }
}

function Intensity({ intensity }: { intensity: IntensityType }) {
  switch (intensity.type) {
    case 'rpe':
      return <span>{intensity.value}</span>;
    case 'rpeRange':
      return (
        <span>
          {intensity.minValue} - {intensity.maxValue}
        </span>
      );
    case 'oneRepMax':
      return <span>{intensity.percentage}</span>;
  }
}

function SetTypeIcon({ type }: { type: SetType }) {
  switch (type) {
    case 'warmup':
      return <Badge className="text-base font-bold text-amber-500">W</Badge>;
    case 'drop':
      return <Badge className="text-base font-bold text-orange-500">D</Badge>;
    case 'myoreps':
      return (
        <Badge variant="outline" className="text-base font-bold text-red-500">
          M
        </Badge>
      );
    case 'normal':
  }
}

function preventSubmitOnEnter(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
}
