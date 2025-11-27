import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_hubs_blocks_slider_desktop_slides_per_view" AS ENUM('3', '4', '5', '6');
  CREATE TYPE "public"."enum__hubs_v_blocks_slider_desktop_slides_per_view" AS ENUM('3', '4', '5', '6');
  ALTER TABLE "hubs_blocks_slider" ADD COLUMN "desktop_slides_per_view" "enum_hubs_blocks_slider_desktop_slides_per_view" DEFAULT '5';
  ALTER TABLE "_hubs_v_blocks_slider" ADD COLUMN "desktop_slides_per_view" "enum__hubs_v_blocks_slider_desktop_slides_per_view" DEFAULT '5';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "hubs_blocks_slider" DROP COLUMN "desktop_slides_per_view";
  ALTER TABLE "_hubs_v_blocks_slider" DROP COLUMN "desktop_slides_per_view";
  DROP TYPE "public"."enum_hubs_blocks_slider_desktop_slides_per_view";
  DROP TYPE "public"."enum__hubs_v_blocks_slider_desktop_slides_per_view";`)
}
