CREATE OR REPLACE FUNCTION public.upsert_workout_tracking (
  p_routine_workout_id uuid,
  p_duration integer,
  p_start_date timestamp with time zone,
  p_exercise_trackings jsonb
) RETURNS TABLE (
  workout_id uuid,
  user_id uuid,
  routine_workout_id uuid,
  duration integer,
  start_date timestamp with time zone,
  exercise_trackings jsonb
)
SET search_path = ''
AS $$
#variable_conflict use_column
DECLARE
    v_workout_id uuid;
BEGIN
    -- Upsert into workout_trackings using auth.uid() for user_id
    INSERT INTO public.workout_trackings (user_id, routine_workout_id, duration, start_date)
    VALUES (auth.uid(), p_routine_workout_id, p_duration, p_start_date)
    ON CONFLICT (routine_workout_id) DO UPDATE
    SET duration = EXCLUDED.duration,
        start_date = EXCLUDED.start_date,
        updated_at = now()
    RETURNING id INTO v_workout_id;

     -- Update multiple workout_exercise_trackings
    UPDATE public.workout_exercise_trackings
    SET 
        exercise_id = (exercise->>'exercise_id')::uuid,
        workout_id = v_workout_id,
        sets = exercise->'sets',
        "order" = (exercise->>'order')::integer,
        notes = exercise->>'notes',
        weight_unit = (exercise->>'weight_unit')::public.weight_unit
    FROM jsonb_array_elements(p_exercise_trackings) AS exercise
    WHERE exercise->>'id' IS NOT NULL
      AND public.workout_exercise_trackings.id = (exercise->>'id')::uuid;  -- Match the existing id

    -- Insert new exercise trackings if id is NULL
    INSERT INTO public.workout_exercise_trackings (exercise_id, workout_id, sets, "order", notes, weight_unit)
    SELECT 
        (exercise->>'exercise_id')::uuid,
        v_workout_id,
        exercise->'sets',
        (exercise->>'order')::integer,
        exercise->>'notes',
        (exercise->>'weight_unit')::public.weight_unit
    FROM jsonb_array_elements(p_exercise_trackings) AS exercise
    WHERE exercise->>'id' IS NULL;  -- Only insert if id is not provided

    -- Return the workout tracking along with related exercise trackings
    RETURN QUERY
    SELECT 
        w.id AS workout_id,
        w.user_id,
        w.routine_workout_id,
        w.duration,
        w.start_date,
        jsonb_agg(
            jsonb_build_object(
                'exercise_id', e.exercise_id,
                'sets', e.sets,
                'order', e."order",
                'notes', e.notes,
                'weight_unit', e.weight_unit
            )
        ) AS exercise_trackings
    FROM public.workout_trackings w
    LEFT JOIN public.workout_exercise_trackings e ON e.workout_id = w.id
    WHERE w.id = v_workout_id
    GROUP BY w.id;

END;
$$ LANGUAGE plpgsql;