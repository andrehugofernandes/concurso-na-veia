-- Create lesson_progress table
create table if not exists lesson_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  lesson_id text not null,
  module_id text not null,
  score integer,
  completed boolean default false,
  read_percentage integer default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  unique(user_id, lesson_id, module_id)
);

-- Enable RLS
alter table lesson_progress enable row level security;

-- Policies
create policy "Users can view own progress" 
  on lesson_progress for select 
  using (auth.uid() = user_id);

create policy "Users can insert own progress" 
  on lesson_progress for insert 
  with check (auth.uid() = user_id);

create policy "Users can update own progress" 
  on lesson_progress for update 
  using (auth.uid() = user_id);
