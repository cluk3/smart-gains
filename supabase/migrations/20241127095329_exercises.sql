CREATE TYPE muscle
AS
ENUM(
    'neck',
    'traps',
    'shoulders',
    'chest',
    'biceps',
    'triceps',
    'forearms',
    'lats',
    'middle back',
    'lower back',
    'abs',
    'obliques',
    'glutes',
    'adductors',
    'quads',
    'hamstrings',
    'calves'
  );

CREATE TYPE equipment
AS
ENUM(
    'none',
    'ez curl bar',
    'barbell',
    'dumbbell',
    'gym mat',
    'exercise ball',
    'medicine ball',
    'pull-up bar',
    'bench',
    'incline bench',
    'kettlebell',
    'machine',
    'cable',
    'bands',
    'foam roll',
    'other'
);

create table
  exercises (
    id uuid primary key default gen_random_uuid (),
    user_id uuid references profiles (id) on delete cascade,
    name text not null unique,
    equipment equipment[],
    image text,
    category text not null,
    instructions text[],
    primary_muscles muscle[],
    secondary_muscles muscle[],
    video text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
  );

alter table exercises
  enable row level security;

create policy "Exercises without a user are viewable by everyone." on exercises
  for select using ((select auth.uid()) = user_id or user_id is null);

create policy "Users can insert new exercises." on exercises
  for insert with check (true);

create policy "Users can update own exercise." on exercises
  for update using ((select auth.uid()) = user_id);

create policy "Users can delete own exercise." on exercises
  for delete using ((select auth.uid()) = user_id);