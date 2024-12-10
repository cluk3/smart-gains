import { useInsertMutation } from '@supabase-cache-helpers/postgrest-react-query';
import { useCallback, useState, useEffect } from 'react';
import { useFieldArray, useForm, FormProvider, useFormContext } from 'react-hook-form';
import { View } from 'react-native';

import { ExerciseTracker } from './exercise-tracker';
import { resolver, type FormData } from './schema';
import { H1, H2, H3, Large, Lead, Muted } from '../ui/typography';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '~/components/ui/alert-dialog';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { SET_TYPES } from '~/const';
import { useUser } from '~/context/supabase-provider';
import { Plus } from '~/lib/icons/Plus';
import { type Workout } from '~/repository';
import { WeightUnit } from '~/types';

export default function TrackingForm({ workout, onSubmit }: { workout: Workout }) {
  const [plannedExercises, setPlannedExercises] = useState<Workout['routine_exercises']>(
    workout.routine_exercises
  );
  const [values, setValues] = useState<FormData>();

  const { user_metadata } = useUser();

  // console.log('workout', workout);

  const methods = useForm<FormData>({
    resolver,
    defaultValues: {
      duration: 120,
      workoutId: workout.id,
      exercises: plannedExercises.map((exercise) => ({
        exerciseId: exercise.data.id,
        weightUnit: user_metadata.weight_unit ?? 'kg',
        order: exercise.order,
        sets: exercise.sets.map((set) => ({
          type: set.type,
          weight: '0',
          measurement: '0',
          measurementType: set.type.startsWith('time') ? 'duration' : 'reps',
          completed: false,
        })),
      })),
    },
    values,
  });

  //   useEffect(() => {
  //     const saved = localStorage.getItem(key);
  //     if (saved) {
  //       const { plannedExercises, ...rest } = JSON.parse(saved);
  //       setPlannedExercises(plannedExercises);
  //       setValues(rest);
  //     }
  //   }, [key]);

  //   // Save form data on changes
  //   useEffect(() => {
  //     const subscription = methods.watch((values) => {
  //       localStorage.setItem(
  //         key,
  //         JSON.stringify({
  //           plannedExercises,
  //           ...values,
  //         })
  //       );
  //     });
  //     return () => subscription.unsubscribe();
  //   }, [key, methods, plannedExercises]);

  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
  } = methods;

  const {
    fields: exerciseTrackings,
    append,
    // prepend,
    // remove,
    // swap,
    // move,
    // insert,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: 'exercises',
  });

  const _onSubmit = async (data) => {
    // if (!response.issues) localStorage.removeItem(key);

    console.log('data', data);

    onSubmit({
      p_routine_workout_id: data.workoutId,
      p_duration: data.duration,
      p_start_date: new Date(data.startDate).toISOString(),
      p_exercise_trackings: data.exercises.map((exercise) => ({
        exercise_id: exercise.exerciseId,
        sets: exercise.sets.map((set, index) => ({
          type: set.type,
          weight: set.weight,
          measurement: set.measurement,
          measurement_type: set.measurementType,
          completed: set.completed,
        })),
        order: exercise.order,
        notes: exercise.notes,
        weight_unit: exercise.weightUnit,
      })),
    });
  };

  const [addedExercises, setAddedExercises] = useState<ExerciseSelectModel[]>([]);

  const addNewExercises = useCallback(() => {
    append(
      addedExercises.map((exercise) => ({
        exerciseId: exercise.id,
        sets: [
          {
            type: SET_TYPES.normal,
            weight: '0',
            measurement: '0',
            measurementType: 'reps',
            completed: false,
          },
        ],
      }))
    );

    const newExercises = addedExercises.map<Partial<Exercise>>((exercise) => ({
      exerciseId: exercise.id,
      data: exercise,
      sets: [],
    }));
    setPlannedExercises([...plannedExercises, ...newExercises]);
    setAddedExercises([]);
  }, [addedExercises, plannedExercises, append]);

  console.log('errors', errors);
  return (
    <View className="flex-1">
      <FormProvider {...methods}>
        <View className="flex flex-1 flex-col p-4">
          <View className="flex flex-1 flex-col">
            <H2>{workout.week.routine.name}</H2>
            <Muted>
              Week {workout.week.week_number} of {workout.week.routine.name} - Day {workout.order}
            </Muted>
          </View>

          <View className="flex flex-1 flex-col gap-8">
            {/* {exerciseTrackings.map((field, exerciseIndex) => {
            const exercise = plannedExercises[exerciseIndex];

            return (
              <ExerciseTracker
                exercise={exercise}
                exerciseIndex={exerciseIndex}
                weightUnit={weightUnit}
                key={field.id}
              />
            );
          })} */}
          </View>
          {/* <Drawer>
          <DrawerTrigger asChild>
            <Button>
              <Plus />
              Add Exercise
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Exercises</DrawerTitle>
            </DrawerHeader>
            <ExercisePicker
              value={addedExercises}
              onChange={setAddedExercises}
            />

            <DrawerFooter>
              <DrawerClose asChild>
                <Button
                  disabled={!addedExercises.length}
                  onClick={addNewExercises}
                >
                  Add Exercises
                </Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer> */}
        </View>

        <Toolbar onSubmit={handleSubmit(_onSubmit)} />
      </FormProvider>
    </View>
  );
}

function Toolbar({ onSubmit }: { onSubmit: () => void }) {
  return (
    <View className="flex-1 border-t border-zinc-200">
      <View className="flex w-full flex-1 gap-4 px-4 py-4">
        <SubmitButton onSubmit={onSubmit} />
        <View className="flex-1">
          <Button variant="outline" onPress={() => null}>
            <Text>Rest Timer</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

function SubmitButton({ onSubmit }: { onSubmit: () => void }) {
  const { watch, formState } = useFormContext<FormData>();
  const exercises = watch(`exercises`);

  const isAllCompleted = exercises.every(({ sets }) => sets.every((set) => set.completed));
  return (
    <View className="flex-1">
      {!formState.isValid || isAllCompleted ? (
        <Button
          onPress={onSubmit}
          disabled={formState.isSubmitting}

          // isLoading={formState.isSubmitting}
        >
          <Text>Submit</Text>
        </Button>
      ) : (
        <AlertDialog className="flex-1">
          <AlertDialogTrigger asChild>
            <Button className="">
              <Text>Submit</Text>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                There are uncompleted sets, are you sure you want to finish the workout?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                <Text>Cancel</Text>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  onPress={onSubmit}
                  disabled={formState.isSubmitted}
                  className="w-full bg-black"
                  // isLoading={formState.isSubmitting}
                >
                  <Text>Submit</Text>
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </View>
  );
}
