alter
  publication supabase_realtime add table public.routines, public.routine_weeks,
     public.routine_workouts, public.routine_exercises, public.workout_trackings,
      public.workout_exercise_trackings, public.programs;

-- Legend-State helper to facilitate "Sync only diffs" (changesSince: 'last-sync') mode
CREATE OR REPLACE FUNCTION handle_times()
    RETURNS trigger AS
    $$
    BEGIN
    IF (TG_OP = 'INSERT') THEN
        NEW.created_at := now();
        NEW.updated_at := now();
    ELSEIF (TG_OP = 'UPDATE') THEN
        NEW.created_at = OLD.created_at;
        NEW.updated_at = now();
    END IF;
    RETURN NEW;
    END;
    $$ language plpgsql;

CREATE OR REPLACE FUNCTION create_times_trigger(table_name text)
RETURNS void AS
$$
BEGIN
    EXECUTE format('
        CREATE TRIGGER handle_times
        BEFORE INSERT OR UPDATE ON %s
        FOR EACH ROW
        EXECUTE PROCEDURE handle_times();
    ', table_name);
END;
$$ LANGUAGE plpgsql;

SELECT create_times_trigger('public.routines');
SELECT create_times_trigger('public.routine_weeks');
SELECT create_times_trigger('public.routine_workouts');
SELECT create_times_trigger('public.routine_exercises');
SELECT create_times_trigger('public.workout_trackings');
SELECT create_times_trigger('public.workout_exercise_trackings');
SELECT create_times_trigger('public.programs');

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS deleted BOOLEAN DEFAULT false;
ALTER TABLE public.routines ADD COLUMN IF NOT EXISTS deleted BOOLEAN DEFAULT false;
ALTER TABLE public.routine_weeks ADD COLUMN IF NOT EXISTS deleted BOOLEAN DEFAULT false;
ALTER TABLE public.routine_workouts ADD COLUMN IF NOT EXISTS deleted BOOLEAN DEFAULT false;
ALTER TABLE public.routine_exercises ADD COLUMN IF NOT EXISTS deleted BOOLEAN DEFAULT false;
ALTER TABLE public.workout_trackings ADD COLUMN IF NOT EXISTS deleted BOOLEAN DEFAULT false;
ALTER TABLE public.workout_exercise_trackings ADD COLUMN IF NOT EXISTS deleted BOOLEAN DEFAULT false;
ALTER TABLE public.programs ADD COLUMN IF NOT EXISTS deleted BOOLEAN DEFAULT false;