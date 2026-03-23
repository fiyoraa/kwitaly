-- Extensions
create extension if not exists "uuid-ossp";

-- Clients table
create table public.clients (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  email text not null,
  phone text,
  address text,
  created_at timestamptz default now()
);

-- Invoices table
create table public.invoices (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  client_id uuid references public.clients(id) on delete set null,
  invoice_number text not null,
  status text check (status in ('draft','sent','paid','overdue')) default 'draft',
  issue_date date not null default current_date,
  due_date date not null,
  subtotal numeric(12,2) default 0,
  tax_rate numeric(5,2) default 0,
  total numeric(12,2) default 0,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Invoice Items table
create table public.invoice_items (
  id uuid primary key default uuid_generate_v4(),
  invoice_id uuid references public.invoices(id) on delete cascade not null,
  description text not null,
  quantity numeric(10,2) not null default 1,
  unit_price numeric(12,2) not null,
  total numeric(12,2) generated always as (quantity * unit_price) stored
);

-- Indexes
create index clients_user_id_idx on public.clients(user_id);
create index invoices_user_id_idx on public.invoices(user_id);
create index invoices_client_id_idx on public.invoices(client_id);
create index invoice_items_invoice_id_idx on public.invoice_items(invoice_id);

-- RLS Policies
alter table public.clients enable row level security;
alter table public.invoices enable row level security;
alter table public.invoice_items enable row level security;

-- Clients RLS
create policy "Users own clients" on public.clients 
  for all using (auth.uid() = user_id);

-- Invoices RLS
create policy "Users own invoices" on public.invoices 
  for all using (auth.uid() = user_id);

-- Invoice Items RLS
create policy "Users own invoice items" on public.invoice_items
  for all using (invoice_id in (select id from public.invoices where user_id = auth.uid()));

-- Updated_at Trigger for Invoices
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
  before update on public.invoices
  for each row
  execute function public.handle_updated_at();
