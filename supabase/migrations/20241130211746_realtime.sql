CREATE OR REPLACE FUNCTION public.handle_updated_at()
    RETURNS trigger
    SET search_path = ''
    AS $$
    BEGIN
        NEW.updated_at = now();
        RETURN NEW;
    END;
    $$ language plpgsql;

CREATE OR REPLACE FUNCTION public.create_times_trigger(table_name text)
RETURNS void
set search_path = ''
AS $$
BEGIN
    EXECUTE format('
        CREATE TRIGGER handle_updated_at
        BEFORE UPDATE ON %s
        FOR EACH ROW
        EXECUTE PROCEDURE public.handle_updated_at();
    ', table_name);
END;
$$ LANGUAGE plpgsql;

SELECT public.create_times_trigger('public.routines');
SELECT public.create_times_trigger('public.routine_weeks');
SELECT public.create_times_trigger('public.routine_workouts');
SELECT public.create_times_trigger('public.routine_exercises');
SELECT public.create_times_trigger('public.workout_trackings');
SELECT public.create_times_trigger('public.workout_exercise_trackings');
SELECT public.create_times_trigger('public.programs');

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS deleted BOOLEAN DEFAULT false;
ALTER TABLE public.routines ADD COLUMN IF NOT EXISTS deleted BOOLEAN DEFAULT false;
ALTER TABLE public.routine_weeks ADD COLUMN IF NOT EXISTS deleted BOOLEAN DEFAULT false;
ALTER TABLE public.routine_workouts ADD COLUMN IF NOT EXISTS deleted BOOLEAN DEFAULT false;
ALTER TABLE public.routine_exercises ADD COLUMN IF NOT EXISTS deleted BOOLEAN DEFAULT false;
ALTER TABLE public.workout_trackings ADD COLUMN IF NOT EXISTS deleted BOOLEAN DEFAULT false;
ALTER TABLE public.workout_exercise_trackings ADD COLUMN IF NOT EXISTS deleted BOOLEAN DEFAULT false;
ALTER TABLE public.programs ADD COLUMN IF NOT EXISTS deleted BOOLEAN DEFAULT false;