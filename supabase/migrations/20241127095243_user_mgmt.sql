CREATE TYPE weight_unit
AS
ENUM(
    'kg',
    'lb'
);

-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamptz,
  full_name text,
  avatar_url text,
  weight_unit weight_unit
);
-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
returns trigger
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- This trigger automatically updates raw user meta data when a profile is updated
create function public.handle_updated_profile()
returns trigger
set search_path = ''
as $$
begin
  update auth.users
  set raw_user_meta_data =
    jsonb_set(
      jsonb_set(
        jsonb_set(raw_user_meta_data, '{full_name}', to_jsonb(NEW.full_name), true),
        '{avatar_url}', to_jsonb(NEW.avatar_url), true
      ),
      '{weight_unit}', to_jsonb(NEW.weight_unit), true
    )
  where id = new.id;
  return new;
end;
$$ language plpgsql security definer;
create trigger on_profiles_updated
  after update on public.profiles
  for each row execute procedure public.handle_updated_profile();

-- Set up Storage!
insert into storage.buckets (id, name)
  values ('avatars', 'avatars') ON CONFLICT DO NOTHING;

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage#policy-examples for more details.
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');