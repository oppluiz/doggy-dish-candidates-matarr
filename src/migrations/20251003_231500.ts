import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_header_nav_items_icon') THEN
        CREATE TYPE "public"."enum_header_nav_items_icon" AS ENUM('home', 'utensils', 'plus', 'squareStack');
      END IF;
    END
    $$;

    ALTER TABLE "header_nav_items"
      ADD COLUMN IF NOT EXISTS "icon" "public"."enum_header_nav_items_icon";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "header_nav_items" DROP COLUMN IF EXISTS "icon";
    DO $$
    BEGIN
      IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_header_nav_items_icon') THEN
        DROP TYPE "public"."enum_header_nav_items_icon";
      END IF;
    END
    $$;
  `)
}