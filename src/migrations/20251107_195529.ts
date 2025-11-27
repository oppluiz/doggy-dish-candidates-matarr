import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "hubs_blocks_icon_slider" ADD COLUMN "url" varchar;
  ALTER TABLE "_hubs_v_blocks_icon_slider" ADD COLUMN "url" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "hubs_blocks_icon_slider" DROP COLUMN "url";
  ALTER TABLE "_hubs_v_blocks_icon_slider" DROP COLUMN "url";`)
}
