import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "popup" DROP COLUMN "accent_color";
  ALTER TABLE "popup" DROP COLUMN "panel_background";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "popup" ADD COLUMN "accent_color" varchar DEFAULT '#41A690';
  ALTER TABLE "popup" ADD COLUMN "panel_background" varchar DEFAULT '#FFFFF8';`)
}
