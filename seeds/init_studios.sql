INSERT INTO studios (id, name, description, created_at)
VALUES
  (gen_random_uuid(), 'Station A', 'Open creative station with modular setup', now()),
  (gen_random_uuid(), 'Station B', 'Second creative station with shared resources', now()),
  (gen_random_uuid(), 'Studio Suite', 'Private studio suite with full equipment', now())
ON CONFLICT (name) DO NOTHING;