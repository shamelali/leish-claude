INSERT INTO studios (id, name, description, created_at)
VALUES
  (gen_random_uuid(), 'Station A', 'Open creative station', now()),
  (gen_random_uuid(), 'Station B', 'Second creative station', now()),
  (gen_random_uuid(), 'Studio Suite', 'Private studio suite', now())
ON CONFLICT (name) DO NOTHING;