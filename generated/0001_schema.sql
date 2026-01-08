CREATE TABLE IF NOT EXISTS "studios" (
  "id" uuid DEFAULT gen_random_uuid(),
  "name" text NOT NULL,
  "description" text,
  "created_at" timestamptz DEFAULT now(),
  PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "studios_name_idx" ON "studios" ("name");