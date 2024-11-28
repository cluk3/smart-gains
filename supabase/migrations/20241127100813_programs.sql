create table
  programs (
    id uuid primary key default gen_random_uuid (),
    user_id uuid not null references profiles (id) on delete cascade,
    routine_id uuid not null references routines (id) on delete cascade unique,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
  );

alter table programs
  enable row level security;

create policy "Programs are viewable only by the user who created them." on programs
  for select using ((select auth.uid()) = user_id);

create policy "Users can insert new programs." on programs
  for insert with check (true);

create policy "Users can update own program." on programs
  for update using ((select auth.uid()) = user_id);

create policy "Users can delete own program." on programs
  for delete using ((select auth.uid()) = user_id);