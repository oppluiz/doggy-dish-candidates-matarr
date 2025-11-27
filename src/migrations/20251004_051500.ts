import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Convert enum column to text
    ALTER TABLE "header_nav_items"
      ALTER COLUMN "icon" DROP DEFAULT;

    ALTER TABLE "header_nav_items"
      ALTER COLUMN "icon" TYPE text USING "icon"::text;

    -- Drop the enum type if it exists (no longer needed)
    DO $$
    BEGIN
      IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_header_nav_items_icon') THEN
        DROP TYPE "public"."enum_header_nav_items_icon";
      END IF;
    END
    $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // No safe automatic rollback to enum without validating data.
  await db.execute(sql`SELECT 1;`)
}