create table
  workout_trackings (
    id uuid primary key default gen_random_uuid (),
    routine_workout_id uuid references routine_workouts (id) on delete cascade unique,
    user_id uuid not null references profiles (id) on delete cascade,
    duration int not null,
    start_date timestamptz not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
  );

create table
  workout_exercise_trackings (
    id uuid primary key default gen_random_uuid (),
    exercise_id uuid not null references exercises (id) on delete cascade,
    workout_id uuid not null references workout_trackings (id) on delete cascade,
    sets jsonb not null,
    "order" int not null,
    notes text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    weight_unit weight_unit not null
  );

alter table workout_trackings
  enable row level security;

create policy "Workout trackings are viewable only by the user who created them." on workout_trackings
  for select using ((select auth.uid()) = user_id);

create policy "Users can insert new workout trackings." on workout_trackings
  for insert with check (true);

create policy "Users can update own workout tracking." on workout_trackings
  for update using ((select auth.uid()) = user_id);

create policy "Users can delete own workout tracking." on workout_trackings
  for delete using ((select auth.uid()) = user_id);