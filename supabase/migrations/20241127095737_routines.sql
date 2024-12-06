CREATE TYPE difficulty_level
AS
ENUM(
    'beginner',
    'novice',
    'intermediate',
    'advanced'
);

create table
  routines (
    id uuid primary key default gen_random_uuid (),
    name text not null,
    description text,
    image text,
    focus_area text,
    minutes_per_workout int,
    difficulty_level difficulty_level[],
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
  );

create table
  routine_weeks (
    id uuid primary key default gen_random_uuid (),
    routine_id uuid not null references routines (id) on delete cascade,
    week_number int not null,
    name text not null,
    description text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
  );

create table
  routine_workouts (
    id uuid primary key default gen_random_uuid (),
    name text not null,
    "order" int not null,
    week_id uuid not null references routine_weeks (id) on delete cascade,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
  );

create table
  routine_exercises (
    id uuid primary key default gen_random_uuid (),
    exercise_id uuid not null references exercises (id) on delete cascade,
    workout_id uuid not null references routine_workouts (id) on delete cascade,
    sets jsonb not null,
    alternative_exercises json,
    "order" int not null,
    notes text,
    tempo_eccentric int,
    tempo_iso_bottom int,
    tempo_iso_top int,
    tempo_concentric int,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
  );
