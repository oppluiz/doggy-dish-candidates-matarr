import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "hubs_blocks_slider" ADD COLUMN "center_slides_on_mobile" boolean DEFAULT true;
  ALTER TABLE "_hubs_v_blocks_slider" ADD COLUMN "center_slides_on_mobile" boolean DEFAULT true;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "hubs_blocks_slider" DROP COLUMN "center_slides_on_mobile";
  ALTER TABLE "_hubs_v_blocks_slider" DROP COLUMN "center_slides_on_mobile";`)
}
