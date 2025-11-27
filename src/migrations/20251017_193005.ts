import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "food_blocks_tabs" ALTER COLUMN "desktop_padding" SET DEFAULT '57px';
  ALTER TABLE "_food_v_blocks_tabs" ALTER COLUMN "desktop_padding" SET DEFAULT '57px';
  ALTER TABLE "health_blocks_tabs" ALTER COLUMN "desktop_padding" SET DEFAULT '57px';
  ALTER TABLE "_health_v_blocks_tabs" ALTER COLUMN "desktop_padding" SET DEFAULT '57px';
  ALTER TABLE "sub_hubs_blocks_tabs" ALTER COLUMN "desktop_padding" SET DEFAULT '57px';
  ALTER TABLE "_sub_hubs_v_blocks_tabs" ALTER COLUMN "desktop_padding" SET DEFAULT '57px';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "food_blocks_tabs" ALTER COLUMN "desktop_padding" SET DEFAULT 'px-[57px]';
  ALTER TABLE "_food_v_blocks_tabs" ALTER COLUMN "desktop_padding" SET DEFAULT 'px-[57px]';
  ALTER TABLE "health_blocks_tabs" ALTER COLUMN "desktop_padding" SET DEFAULT 'px-[57px]';
  ALTER TABLE "_health_v_blocks_tabs" ALTER COLUMN "desktop_padding" SET DEFAULT 'px-[57px]';
  ALTER TABLE "sub_hubs_blocks_tabs" ALTER COLUMN "desktop_padding" SET DEFAULT 'px-[57px]';
  ALTER TABLE "_sub_hubs_v_blocks_tabs" ALTER COLUMN "desktop_padding" SET DEFAULT 'px-[57px]';`)
}
