-- Users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY NOT NULL,
    avatar_url TEXT,
    subscription TEXT,
    credits TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ,
    email TEXT,
    full_name TEXT,
    join_year INTEGER,
    phone_number TEXT,
    profession TEXT
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT REFERENCES public.users(user_id),
    stripe_id TEXT UNIQUE,
    price_id TEXT,
    stripe_price_id TEXT,
    currency TEXT,
    interval TEXT,
    status TEXT,
    current_period_start BIGINT,
    current_period_end BIGINT,
    cancel_at_period_end BOOLEAN,
    amount BIGINT,
    started_at BIGINT,
    ends_at BIGINT,
    ended_at BIGINT,
    canceled_at BIGINT,
    customer_cancellation_reason TEXT,
    customer_cancellation_comment TEXT,
    metadata JSONB,
    custom_field_data JSONB,
    customer_id TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc', now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc', now()) NOT NULL
);

-- Webhook events table
CREATE TABLE IF NOT EXISTS public.webhook_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type TEXT NOT NULL,
    type TEXT NOT NULL,
    stripe_event_id TEXT,
    data JSONB,
    created_at TIMESTAMPTZ DEFAULT timezone('utc', now()) NOT NULL,
    modified_at TIMESTAMPTZ DEFAULT timezone('utc', now()) NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS subscriptions_stripe_id_idx ON public.subscriptions(stripe_id);
CREATE INDEX IF NOT EXISTS subscriptions_user_id_idx ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS webhook_events_type_idx ON public.webhook_events(type);
CREATE INDEX IF NOT EXISTS webhook_events_stripe_event_id_idx ON public.webhook_events(stripe_event_id);
CREATE INDEX IF NOT EXISTS webhook_events_event_type_idx ON public.webhook_events(event_type);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;

-- Create function to handle new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, user_id, email, name, full_name, avatar_url, token_identifier, created_at, updated_at)
  VALUES (NEW.id, NEW.id::TEXT, NEW.email, NEW.raw_user_meta_data->>'name',
          NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url',
          NEW.email, NEW.created_at, NEW.updated_at);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to handle user updates
CREATE OR REPLACE FUNCTION public.handle_user_update()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.users
  SET email = NEW.email,
      name = NEW.raw_user_meta_data->>'name',
      full_name = NEW.raw_user_meta_data->>'full_name',
      avatar_url = NEW.raw_user_meta_data->>'avatar_url',
      updated_at = NEW.updated_at
  WHERE user_id = NEW.id::TEXT;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for user updates
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_user_update();

-- Tickets table
CREATE TABLE IF NOT EXISTS public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  show_date TIMESTAMPTZ NOT NULL,
  hec_student_tickets INTEGER DEFAULT 0,
  young_tickets INTEGER DEFAULT 0,
  hec_staff_tickets INTEGER DEFAULT 0,
  other_tickets INTEGER DEFAULT 0,
  palais_hec_student_tickets INTEGER DEFAULT 0,
  palais_young_tickets INTEGER DEFAULT 0,
  palais_other_tickets INTEGER DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  payment_intent_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on tickets
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;

-- Create policies for tickets
CREATE POLICY "Users can view their own tickets" ON public.tickets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Public access to completed tickets" ON public.tickets
  FOR SELECT USING (payment_status = 'completed');

-- Enable realtime for tickets
ALTER PUBLICATION supabase_realtime ADD TABLE public.tickets;
