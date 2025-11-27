import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_hubs_blocks_icon_slider_boxes_icon" ADD VALUE 'syringe';
  ALTER TYPE "public"."enum__hubs_v_blocks_icon_slider_boxes_icon" ADD VALUE 'syringe';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "hubs_blocks_icon_slider_boxes" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "hubs_blocks_icon_slider_boxes" ALTER COLUMN "icon" SET DEFAULT 'restaurant'::text;
  DROP TYPE "public"."enum_hubs_blocks_icon_slider_boxes_icon";
  CREATE TYPE "public"."enum_hubs_blocks_icon_slider_boxes_icon" AS ENUM('restaurant', 'nutrition', 'home', 'egg_alt', 'pet_supplies', 'volunteer_activism', 'health_cross', 'scale', 'shield', 'calendar_today', 'sunny', 'bolt', 'water', 'pill', 'sound_detection_dog_barking', 'pets', 'skillet', 'grain', 'family_home', 'meat_icon', 'favorite', 'neurology', 'mood', 'dentistry', 'rheumatology', 'error', 'health_and_safety', 'gastroenterology', 'balance', 'pest_control', 'content_cut', 'vital_signs');
  ALTER TABLE "hubs_blocks_icon_slider_boxes" ALTER COLUMN "icon" SET DEFAULT 'restaurant'::"public"."enum_hubs_blocks_icon_slider_boxes_icon";
  ALTER TABLE "hubs_blocks_icon_slider_boxes" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_hubs_blocks_icon_slider_boxes_icon" USING "icon"::"public"."enum_hubs_blocks_icon_slider_boxes_icon";
  ALTER TABLE "_hubs_v_blocks_icon_slider_boxes" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "_hubs_v_blocks_icon_slider_boxes" ALTER COLUMN "icon" SET DEFAULT 'restaurant'::text;
  DROP TYPE "public"."enum__hubs_v_blocks_icon_slider_boxes_icon";
  CREATE TYPE "public"."enum__hubs_v_blocks_icon_slider_boxes_icon" AS ENUM('restaurant', 'nutrition', 'home', 'egg_alt', 'pet_supplies', 'volunteer_activism', 'health_cross', 'scale', 'shield', 'calendar_today', 'sunny', 'bolt', 'water', 'pill', 'sound_detection_dog_barking', 'pets', 'skillet', 'grain', 'family_home', 'meat_icon', 'favorite', 'neurology', 'mood', 'dentistry', 'rheumatology', 'error', 'health_and_safety', 'gastroenterology', 'balance', 'pest_control', 'content_cut', 'vital_signs');
  ALTER TABLE "_hubs_v_blocks_icon_slider_boxes" ALTER COLUMN "icon" SET DEFAULT 'restaurant'::"public"."enum__hubs_v_blocks_icon_slider_boxes_icon";
  ALTER TABLE "_hubs_v_blocks_icon_slider_boxes" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__hubs_v_blocks_icon_slider_boxes_icon" USING "icon"::"public"."enum__hubs_v_blocks_icon_slider_boxes_icon";`)
}
