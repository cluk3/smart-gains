import { type QueryData } from '@supabase/supabase-js';

import { supabase } from '~/supabase';
import { Database } from '~/supabase/types';
import { MeasurementType, SetType, WeightUnit } from '~/types';

export function getRoutineById(id: string) {
  return supabase
    .from('routines')
    .select(
      `id, name, description, image, focus_area, minutes_per_workout, difficulty_level,
        routine_weeks (id, name, description, week_number,
        routine_workouts (id, name, order,
            routine_exercises (id, sets, alternative_exercises, order, notes, tempo_eccentric, tempo_iso_bottom, tempo_iso_top, tempo_concentric,
            data:exercises (id, name, category, instructions, equipment, video, primary_muscles, secondary_muscles)
            )
        )
        )
  `
    )
    .eq('id', id)
    .order('week_number', { referencedTable: 'routine_weeks', ascending: true })
    .order('order', { referencedTable: 'routine_weeks.routine_workouts', ascending: true })
    .order('order', {
      referencedTable: 'routine_weeks.routine_workouts.routine_exercises',
      ascending: true,
    })
    .single();
}

export function getExerciseById(id: string) {
  return supabase
    .from('exercises')
    .select(
      `id, name, image, category, instructions, equipment, video, primary_muscles, secondary_muscles,
          workout_exercise_trackings (id, sets, weight_unit, notes, created_at)
    `
    )
    .eq('id', id)
    .single();
}

export function getPrograms() {
  return supabase.from('programs').select(
    `
  routines (id, name, description, image, focus_area, minutes_per_workout, difficulty_level,
    routine_weeks (id, name, description, week_number,
      routine_workouts (id, name, order,
        routine_exercises (id, sets, alternative_exercises, order, notes, tempo_eccentric, tempo_iso_bottom, tempo_iso_top, tempo_concentric,
          data:exercises (id, name, category, instructions, equipment, video, primary_muscles, secondary_muscles)
        )
      )
    )
  )
  `
  );
}

export function getWorkoutById(id: string) {
  return supabase
    .from('routine_workouts')
    .select(
      `id, name, order,
            routine_exercises (id, sets, alternative_exercises, order, notes, tempo_eccentric, tempo_iso_bottom, tempo_iso_top, tempo_concentric,
              data:exercises (id, name, category, instructions, equipment, video, primary_muscles, secondary_muscles)
            ),
            week:routine_weeks!inner (id, name, description, week_number,
              routine:routines!inner (id, name)
            )
  `
    )
    .eq('id', id)
    .order('order', { referencedTable: 'routine_exercises', ascending: true })
    .single();
}

export type InsertTrackingsData =
  Database['public']['Functions']['upsert_workout_tracking']['Args'] & {
    p_exercise_trackings: {
      sets: {
        type: SetType;
        weight: number | string;
        measurement: number;
        measurement_type: MeasurementType;
        completed: boolean;
      }[];
      order: number;
      notes?: string;
      weight_unit: WeightUnit;
    }[];
  };

export async function insertTrackings(data: InsertTrackingsData) {
  const { data: inserted, error } = await supabase.rpc('upsert_workout_tracking', data);
  console.log('inserted', inserted && inserted[0]);

  if (error) {
    console.log('insert error', error);
    throw error;
  }

  return inserted[0];
}

export type Programs = QueryData<ReturnType<typeof getPrograms>>;
export type Routine = QueryData<ReturnType<typeof getRoutineById>>;
export type Exercise = QueryData<ReturnType<typeof getExerciseById>>;
export type Workout = QueryData<ReturnType<typeof getWorkoutById>>;
