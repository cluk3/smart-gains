import { type QueryData } from '@supabase/supabase-js';

import { supabase } from '~/supabase';

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

export type Programs = QueryData<ReturnType<typeof getPrograms>>;
export type Routine = QueryData<ReturnType<typeof getRoutineById>>;
export type Exercise = QueryData<ReturnType<typeof getExerciseById>>;
