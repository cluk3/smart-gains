import { FlashList } from '@shopify/flash-list';
import { useInsertMutation } from '@supabase-cache-helpers/postgrest-react-query';
import { useCallback, useState, useEffect } from 'react';
import { useFieldArray, useForm, FormProvider, useFormContext } from 'react-hook-form';
import { FlatList, Platform, ScrollView, View } from 'react-native';

import { ExerciseTracker } from './exercise-tracker';
import { resolver, type FormData, type ValidatedFormData } from './schema';
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
import { InsertTrackingsData, type Workout } from '~/repository';
import { RoutineExercise } from '~/types';

export default function TrackingForm({
  workout,
  onSubmit,
}: {
  workout: Workout;
  onSubmit: (data: InsertTrackingsData) => void;
}) {
  const [plannedExercises, setPlannedExercises] = useState<RoutineExercise[]>(
    workout.routine_exercises as unknown as RoutineExercise[]
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
          type: { value: set.type, label: set.type },
          weight: '',
          measurement: '',
          measurementType: set.target.type.startsWith('time') ? 'duration' : 'reps',
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
  } = methods;

  const {
    fields: exerciseTrackings,
    // append,
    // prepend,
    // remove,
    // swap,
    // move,
    // insert,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: 'exercises',
  });

  console.log('exercises', exerciseTrackings);

  const _onSubmit = async (data: ValidatedFormData) => {
    // if (!response.issues) localStorage.removeItem(key);

    console.log('data', data);

    onSubmit({
      p_routine_workout_id: data.workoutId,
      p_duration: data.duration,
      p_start_date: new Date(data.startDate).toISOString(),
      p_exercise_trackings: data.exercises.map((exercise) => ({
        exercise_id: exercise.exerciseId,
        sets: exercise.sets.map((set, index) => ({
          type: set.type.value,
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

  // const addNewExercises = useCallback(() => {
  //   append(
  //     addedExercises.map((exercise) => ({
  //       exerciseId: exercise.id,
  //       sets: [
  //         {
  //           type: SET_TYPES.normal,
  //           weight: '0',
  //           measurement: '0',
  //           measurementType: 'reps',
  //           completed: false,
  //         },
  //       ],
  //     }))
  //   );

  //   const newExercises = addedExercises.map<Partial<Exercise>>((exercise) => ({
  //     exerciseId: exercise.id,
  //     data: exercise,
  //     sets: [],
  //   }));
  //   setPlannedExercises([...plannedExercises, ...newExercises]);
  //   setAddedExercises([]);
  // }, [addedExercises, plannedExercises, append]);

  console.log('errors', errors);
  return (
    <FormProvider {...methods}>
      <View className="flex flex-1 flex-col p-4">
        <View className="flex flex-col">
          <H2>{workout.week.routine.name}</H2>
          <Muted>
            Week {workout.week.week_number} of {workout.week.routine.name} - Day {workout.order}
          </Muted>
        </View>

        {/* <ScrollView className="flex flex-col pt-6" contentContainerClassName="pb-24 gap-8">
          {exerciseTrackings.map((field, exerciseIndex) => {
            const exercise = plannedExercises[exerciseIndex];

            return (
              <ExerciseTracker exercise={exercise} exerciseIndex={exerciseIndex} key={field.id} />
            );
          })}
        </ScrollView> */}
        <FlashList
          data={exerciseTrackings}
          className="flex flex-col pt-6"
          contentContainerClassName="pb-24 gap-8"
          ItemSeparatorComponent={() => <View className="h-6" />}
          renderItem={({ item: field, index: exerciseIndex }) => {
            const exercise = plannedExercises[exerciseIndex];
            return (
              <ExerciseTracker exercise={exercise} exerciseIndex={exerciseIndex} key={field.id} />
            );
          }}
          estimatedItemSize={200}
        />
      </View>
      {/* @ts-expect-error - TODO: fix type */}
      <Toolbar onSubmit={handleSubmit(_onSubmit)} />
    </FormProvider>
  );
}

function Toolbar({ onSubmit }: { onSubmit: () => void }) {
  return (
    <View className="absolute bottom-0 left-0 right-0 border-t border-border bg-background">
      <View className="flex w-full flex-row gap-4 p-4">
        <SubmitButton onSubmit={onSubmit} />
        <View className="flex-1">
          <Button onPress={() => null}>
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

// const AddExercisesDrawer = ({
//   addedExercises,
//   setAddedExercises,
//   addNewExercises,
// }: {
//   addedExercises: ExerciseSelectModel[];
//   setAddedExercises: (value: ExerciseSelectModel[]) => void;
//   addNewExercises: () => void;
// }) => (
//   <Drawer>
//     <DrawerTrigger asChild>
//       <Button>
//         <Plus />
//         Add Exercise
//       </Button>
//     </DrawerTrigger>
//     <DrawerContent>
//       <DrawerHeader>
//         <DrawerTitle>Exercises</DrawerTitle>
//       </DrawerHeader>
//       <ExercisePicker value={addedExercises} onChange={setAddedExercises} />

//       <DrawerFooter>
//         <DrawerClose asChild>
//           <Button disabled={!addedExercises.length} onClick={addNewExercises}>
//             Add Exercises
//           </Button>
//         </DrawerClose>
//         <DrawerClose asChild>
//           <Button variant="outline">Cancel</Button>
//         </DrawerClose>
//       </DrawerFooter>
//     </DrawerContent>
//   </Drawer>
// );
