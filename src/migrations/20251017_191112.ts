import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "food_blocks_tabs" ADD COLUMN "desktop_gap" varchar DEFAULT '23px';
  ALTER TABLE "food_blocks_tabs" ADD COLUMN "desktop_padding" varchar DEFAULT 'px-[57px]';
  ALTER TABLE "_food_v_blocks_tabs" ADD COLUMN "desktop_gap" varchar DEFAULT '23px';
  ALTER TABLE "_food_v_blocks_tabs" ADD COLUMN "desktop_padding" varchar DEFAULT 'px-[57px]';
  ALTER TABLE "health_blocks_tabs" ADD COLUMN "desktop_gap" varchar DEFAULT '23px';
  ALTER TABLE "health_blocks_tabs" ADD COLUMN "desktop_padding" varchar DEFAULT 'px-[57px]';
  ALTER TABLE "_health_v_blocks_tabs" ADD COLUMN "desktop_gap" varchar DEFAULT '23px';
  ALTER TABLE "_health_v_blocks_tabs" ADD COLUMN "desktop_padding" varchar DEFAULT 'px-[57px]';
  ALTER TABLE "sub_hubs_blocks_tabs" ADD COLUMN "desktop_gap" varchar DEFAULT '23px';
  ALTER TABLE "sub_hubs_blocks_tabs" ADD COLUMN "desktop_padding" varchar DEFAULT 'px-[57px]';
  ALTER TABLE "_sub_hubs_v_blocks_tabs" ADD COLUMN "desktop_gap" varchar DEFAULT '23px';
  ALTER TABLE "_sub_hubs_v_blocks_tabs" ADD COLUMN "desktop_padding" varchar DEFAULT 'px-[57px]';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "food_blocks_tabs" DROP COLUMN "desktop_gap";
  ALTER TABLE "food_blocks_tabs" DROP COLUMN "desktop_padding";
  ALTER TABLE "_food_v_blocks_tabs" DROP COLUMN "desktop_gap";
  ALTER TABLE "_food_v_blocks_tabs" DROP COLUMN "desktop_padding";
  ALTER TABLE "health_blocks_tabs" DROP COLUMN "desktop_gap";
  ALTER TABLE "health_blocks_tabs" DROP COLUMN "desktop_padding";
  ALTER TABLE "_health_v_blocks_tabs" DROP COLUMN "desktop_gap";
  ALTER TABLE "_health_v_blocks_tabs" DROP COLUMN "desktop_padding";
  ALTER TABLE "sub_hubs_blocks_tabs" DROP COLUMN "desktop_gap";
  ALTER TABLE "sub_hubs_blocks_tabs" DROP COLUMN "desktop_padding";
  ALTER TABLE "_sub_hubs_v_blocks_tabs" DROP COLUMN "desktop_gap";
  ALTER TABLE "_sub_hubs_v_blocks_tabs" DROP COLUMN "desktop_padding";`)
}
