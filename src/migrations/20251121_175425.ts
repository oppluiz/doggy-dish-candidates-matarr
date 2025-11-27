import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "food" ADD COLUMN "locked" boolean;
  ALTER TABLE "_food_v" ADD COLUMN "version_locked" boolean;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "food" DROP COLUMN "locked";
  ALTER TABLE "_food_v" DROP COLUMN "version_locked";`)
}
