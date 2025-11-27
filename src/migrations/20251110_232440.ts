import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "hubs_blocks_icon_slider" ADD COLUMN "title_mobile" varchar;
  ALTER TABLE "_hubs_v_blocks_icon_slider" ADD COLUMN "title_mobile" varchar;
  ALTER TABLE "hubs_blocks_icon_slider_boxes" DROP COLUMN "title_mobile";
  ALTER TABLE "_hubs_v_blocks_icon_slider_boxes" DROP COLUMN "title_mobile";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "hubs_blocks_icon_slider_boxes" ADD COLUMN "title_mobile" varchar;
  ALTER TABLE "_hubs_v_blocks_icon_slider_boxes" ADD COLUMN "title_mobile" varchar;
  ALTER TABLE "hubs_blocks_icon_slider" DROP COLUMN "title_mobile";
  ALTER TABLE "_hubs_v_blocks_icon_slider" DROP COLUMN "title_mobile";`)
}
