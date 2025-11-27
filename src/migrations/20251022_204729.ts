import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tabbed_content" ADD COLUMN "enable_scale" boolean DEFAULT false;
  ALTER TABLE "_tabbed_content_v" ADD COLUMN "enable_scale" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tabbed_content" DROP COLUMN "enable_scale";
  ALTER TABLE "_tabbed_content_v" DROP COLUMN "enable_scale";`)
}
