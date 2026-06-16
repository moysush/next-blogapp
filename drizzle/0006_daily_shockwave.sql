ALTER TABLE "users" ALTER COLUMN "passwordHash" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "token" text;