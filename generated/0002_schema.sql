CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS "users" (
  "id" uuid DEFAULT gen_random_uuid(),
  "email" text NOT NULL,
  "password_hash" text,
  "provider" text,
  "created_at" timestamptz DEFAULT now(),
  PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");

CREATE TABLE IF NOT EXISTS "bookings" (
  "id" uuid DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL,
  "studio_id" uuid NOT NULL,
  "starts_at" timestamptz NOT NULL,
  "ends_at" timestamptz NOT NULL,
  "status" text DEFAULT 'pending',
  "price" numeric,
  "discount_code" text,
  PRIMARY KEY ("id")
);