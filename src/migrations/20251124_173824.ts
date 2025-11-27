import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "popup" ALTER COLUMN "panel_background" SET DEFAULT '#FFFFF8';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "popup" ALTER COLUMN "panel_background" SET DEFAULT '#FFFFFF';`)
}
