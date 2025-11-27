import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "show_dividers" boolean DEFAULT true;
    ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "show_search" boolean DEFAULT true;
    ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "show_account" boolean DEFAULT true;
    ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "show_location" boolean DEFAULT false;

    UPDATE "header"
    SET
      "show_dividers" = COALESCE("show_dividers", true),
      "show_search" = COALESCE("show_search", true),
      "show_account" = COALESCE("show_account", true),
      "show_location" = COALESCE("show_location", false);
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "header" DROP COLUMN IF EXISTS "show_dividers";
    ALTER TABLE "header" DROP COLUMN IF EXISTS "show_search";
    ALTER TABLE "header" DROP COLUMN IF EXISTS "show_account";
    ALTER TABLE "header" DROP COLUMN IF EXISTS "show_location";
  `)
}
