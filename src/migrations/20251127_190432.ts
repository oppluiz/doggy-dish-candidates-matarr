import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_about_text_slider_slides_icon" AS ENUM('restaurant', 'nutrition', 'home', 'egg_alt', 'pet_supplies', 'volunteer_activism', 'health_cross', 'scale', 'shield', 'calendar_today', 'sunny', 'bolt', 'water', 'pill', 'sound_detection_dog_barking', 'pets', 'skillet', 'grain', 'family_home', 'meat_icon', 'favorite', 'neurology', 'mood', 'dentistry', 'rheumatology', 'error', 'health_and_safety', 'gastroenterology', 'balance', 'pest_control', 'content_cut', 'vital_signs', 'syringe');
  CREATE TYPE "public"."enum__pages_v_blocks_about_text_slider_slides_icon" AS ENUM('restaurant', 'nutrition', 'home', 'egg_alt', 'pet_supplies', 'volunteer_activism', 'health_cross', 'scale', 'shield', 'calendar_today', 'sunny', 'bolt', 'water', 'pill', 'sound_detection_dog_barking', 'pets', 'skillet', 'grain', 'family_home', 'meat_icon', 'favorite', 'neurology', 'mood', 'dentistry', 'rheumatology', 'error', 'health_and_safety', 'gastroenterology', 'balance', 'pest_control', 'content_cut', 'vital_signs', 'syringe');
  CREATE TABLE "pages_blocks_about_text_slider_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_about_text_slider_slides_icon" DEFAULT 'restaurant',
  	"title" varchar,
  	"paragraph" varchar
  );
  
  CREATE TABLE "pages_blocks_about_text_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"accent_word" varchar,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_text_slider_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_about_text_slider_slides_icon" DEFAULT 'restaurant',
  	"title" varchar,
  	"paragraph" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_text_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"accent_word" varchar,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_about_text_slider_slides" ADD CONSTRAINT "pages_blocks_about_text_slider_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_text_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_text_slider" ADD CONSTRAINT "pages_blocks_about_text_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_text_slider_slides" ADD CONSTRAINT "_pages_v_blocks_about_text_slider_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_text_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_text_slider" ADD CONSTRAINT "_pages_v_blocks_about_text_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_about_text_slider_slides_order_idx" ON "pages_blocks_about_text_slider_slides" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_text_slider_slides_parent_id_idx" ON "pages_blocks_about_text_slider_slides" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_text_slider_order_idx" ON "pages_blocks_about_text_slider" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_text_slider_parent_id_idx" ON "pages_blocks_about_text_slider" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_text_slider_path_idx" ON "pages_blocks_about_text_slider" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_text_slider_slides_order_idx" ON "_pages_v_blocks_about_text_slider_slides" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_text_slider_slides_parent_id_idx" ON "_pages_v_blocks_about_text_slider_slides" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_text_slider_order_idx" ON "_pages_v_blocks_about_text_slider" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_text_slider_parent_id_idx" ON "_pages_v_blocks_about_text_slider" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_text_slider_path_idx" ON "_pages_v_blocks_about_text_slider" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_about_text_slider_slides" CASCADE;
  DROP TABLE "pages_blocks_about_text_slider" CASCADE;
  DROP TABLE "_pages_v_blocks_about_text_slider_slides" CASCADE;
  DROP TABLE "_pages_v_blocks_about_text_slider" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_about_text_slider_slides_icon";
  DROP TYPE "public"."enum__pages_v_blocks_about_text_slider_slides_icon";`)
}
