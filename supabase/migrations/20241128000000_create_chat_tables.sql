-- Chats table
create table if not exists chats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null default 'New Chat',
  created_at timestamp with time zone default now() not null
);

-- Messages table
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  chat_id uuid references chats(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamp with time zone default now() not null
);

-- Enable Row Level Security
alter table chats enable row level security;
alter table messages enable row level security;

-- RLS Policies for chats
create policy "Users can view own chats"
  on chats for select
  using (auth.uid() = user_id);

create policy "Users can insert own chats"
  on chats for insert
  with check (auth.uid() = user_id);

create policy "Users can update own chats"
  on chats for update
  using (auth.uid() = user_id);

create policy "Users can delete own chats"
  on chats for delete
  using (auth.uid() = user_id);

-- RLS Policies for messages
create policy "Users can view messages of own chats"
  on messages for select
  using (
    exists (
      select 1 from chats
      where chats.id = messages.chat_id
      and chats.user_id = auth.uid()
    )
  );

create policy "Users can insert messages to own chats"
  on messages for insert
  with check (
    exists (
      select 1 from chats
      where chats.id = messages.chat_id
      and chats.user_id = auth.uid()
    )
  );

-- Indexes for performance
create index if not exists idx_chats_user_id on chats(user_id);
create index if not exists idx_messages_chat_id on messages(chat_id);
create index if not exists idx_messages_created_at on messages(created_at);
