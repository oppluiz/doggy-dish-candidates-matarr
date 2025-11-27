import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tabs" ADD COLUMN "content" jsonb;
  ALTER TABLE "_tabs_v" ADD COLUMN "content" jsonb;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tabs" DROP COLUMN "content";
  ALTER TABLE "_tabs_v" DROP COLUMN "content";`)
}
