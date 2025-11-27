import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "workshops" ADD COLUMN "total_watch_time" varchar;
  ALTER TABLE "_workshops_v" ADD COLUMN "version_total_watch_time" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "workshops" DROP COLUMN "total_watch_time";
  ALTER TABLE "_workshops_v" DROP COLUMN "version_total_watch_time";`)
}
