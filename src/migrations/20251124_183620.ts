import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "search" ADD COLUMN "locked" boolean;
  CREATE INDEX "search_locked_idx" ON "search" USING btree ("locked");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "search_locked_idx";
  ALTER TABLE "search" DROP COLUMN "locked";`)
}
