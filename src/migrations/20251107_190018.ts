import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_hubs_blocks_icon_slider_boxes_icon" AS ENUM('restaurant', 'nutrition', 'home', 'egg_alt', 'pet_supplies', 'volunteer_activism', 'health_cross', 'scale', 'shield', 'calendar_today', 'sunny', 'bolt', 'water', 'pill', 'sound_detection_dog_barking', 'pets');
  CREATE TYPE "public"."enum__hubs_v_blocks_icon_slider_boxes_icon" AS ENUM('restaurant', 'nutrition', 'home', 'egg_alt', 'pet_supplies', 'volunteer_activism', 'health_cross', 'scale', 'shield', 'calendar_today', 'sunny', 'bolt', 'water', 'pill', 'sound_detection_dog_barking', 'pets');
  CREATE TABLE "hubs_blocks_icon_slider_boxes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_hubs_blocks_icon_slider_boxes_icon" DEFAULT 'restaurant',
  	"title" varchar
  );
  
  CREATE TABLE "hubs_blocks_icon_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Explore a Diet',
  	"block_name" varchar
  );
  
  CREATE TABLE "_hubs_v_blocks_icon_slider_boxes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__hubs_v_blocks_icon_slider_boxes_icon" DEFAULT 'restaurant',
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_hubs_v_blocks_icon_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Explore a Diet',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "hubs_blocks_single_page_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_hubs_v_blocks_single_page_hero" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "hubs_blocks_single_page_hero" CASCADE;
  DROP TABLE "_hubs_v_blocks_single_page_hero" CASCADE;
  ALTER TABLE "hubs_rels" DROP CONSTRAINT "hubs_rels_authors_fk";
  
  ALTER TABLE "_hubs_v_rels" DROP CONSTRAINT "_hubs_v_rels_authors_fk";
  
  DROP INDEX "hubs_rels_authors_id_idx";
  DROP INDEX "_hubs_v_rels_authors_id_idx";
  ALTER TABLE "hubs_blocks_icon_slider_boxes" ADD CONSTRAINT "hubs_blocks_icon_slider_boxes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hubs_blocks_icon_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hubs_blocks_icon_slider" ADD CONSTRAINT "hubs_blocks_icon_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hubs_v_blocks_icon_slider_boxes" ADD CONSTRAINT "_hubs_v_blocks_icon_slider_boxes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hubs_v_blocks_icon_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hubs_v_blocks_icon_slider" ADD CONSTRAINT "_hubs_v_blocks_icon_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "hubs_blocks_icon_slider_boxes_order_idx" ON "hubs_blocks_icon_slider_boxes" USING btree ("_order");
  CREATE INDEX "hubs_blocks_icon_slider_boxes_parent_id_idx" ON "hubs_blocks_icon_slider_boxes" USING btree ("_parent_id");
  CREATE INDEX "hubs_blocks_icon_slider_order_idx" ON "hubs_blocks_icon_slider" USING btree ("_order");
  CREATE INDEX "hubs_blocks_icon_slider_parent_id_idx" ON "hubs_blocks_icon_slider" USING btree ("_parent_id");
  CREATE INDEX "hubs_blocks_icon_slider_path_idx" ON "hubs_blocks_icon_slider" USING btree ("_path");
  CREATE INDEX "_hubs_v_blocks_icon_slider_boxes_order_idx" ON "_hubs_v_blocks_icon_slider_boxes" USING btree ("_order");
  CREATE INDEX "_hubs_v_blocks_icon_slider_boxes_parent_id_idx" ON "_hubs_v_blocks_icon_slider_boxes" USING btree ("_parent_id");
  CREATE INDEX "_hubs_v_blocks_icon_slider_order_idx" ON "_hubs_v_blocks_icon_slider" USING btree ("_order");
  CREATE INDEX "_hubs_v_blocks_icon_slider_parent_id_idx" ON "_hubs_v_blocks_icon_slider" USING btree ("_parent_id");
  CREATE INDEX "_hubs_v_blocks_icon_slider_path_idx" ON "_hubs_v_blocks_icon_slider" USING btree ("_path");
  ALTER TABLE "hubs_rels" DROP COLUMN "authors_id";
  ALTER TABLE "_hubs_v_rels" DROP COLUMN "authors_id";
  DROP TYPE "public"."enum_hubs_blocks_single_page_hero_container_size";
  DROP TYPE "public"."enum_hubs_blocks_single_page_hero_orientation";
  DROP TYPE "public"."enum__hubs_v_blocks_single_page_hero_container_size";
  DROP TYPE "public"."enum__hubs_v_blocks_single_page_hero_orientation";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_hubs_blocks_single_page_hero_container_size" AS ENUM('container', 'container-small');
  CREATE TYPE "public"."enum_hubs_blocks_single_page_hero_orientation" AS ENUM('horizontal', 'vertical');
  CREATE TYPE "public"."enum__hubs_v_blocks_single_page_hero_container_size" AS ENUM('container', 'container-small');
  CREATE TYPE "public"."enum__hubs_v_blocks_single_page_hero_orientation" AS ENUM('horizontal', 'vertical');
  CREATE TABLE "hubs_blocks_single_page_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"container_size" "enum_hubs_blocks_single_page_hero_container_size" DEFAULT 'container',
  	"orientation" "enum_hubs_blocks_single_page_hero_orientation" DEFAULT 'horizontal',
  	"image_id" integer,
  	"title" varchar,
  	"enable_author" boolean DEFAULT true,
  	"heading" varchar,
  	"paragraph" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_hubs_v_blocks_single_page_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"container_size" "enum__hubs_v_blocks_single_page_hero_container_size" DEFAULT 'container',
  	"orientation" "enum__hubs_v_blocks_single_page_hero_orientation" DEFAULT 'horizontal',
  	"image_id" integer,
  	"title" varchar,
  	"enable_author" boolean DEFAULT true,
  	"heading" varchar,
  	"paragraph" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "hubs_blocks_icon_slider_boxes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "hubs_blocks_icon_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_hubs_v_blocks_icon_slider_boxes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_hubs_v_blocks_icon_slider" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "hubs_blocks_icon_slider_boxes" CASCADE;
  DROP TABLE "hubs_blocks_icon_slider" CASCADE;
  DROP TABLE "_hubs_v_blocks_icon_slider_boxes" CASCADE;
  DROP TABLE "_hubs_v_blocks_icon_slider" CASCADE;
  ALTER TABLE "hubs_rels" ADD COLUMN "authors_id" integer;
  ALTER TABLE "_hubs_v_rels" ADD COLUMN "authors_id" integer;
  ALTER TABLE "hubs_blocks_single_page_hero" ADD CONSTRAINT "hubs_blocks_single_page_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hubs_blocks_single_page_hero" ADD CONSTRAINT "hubs_blocks_single_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hubs_v_blocks_single_page_hero" ADD CONSTRAINT "_hubs_v_blocks_single_page_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hubs_v_blocks_single_page_hero" ADD CONSTRAINT "_hubs_v_blocks_single_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "hubs_blocks_single_page_hero_order_idx" ON "hubs_blocks_single_page_hero" USING btree ("_order");
  CREATE INDEX "hubs_blocks_single_page_hero_parent_id_idx" ON "hubs_blocks_single_page_hero" USING btree ("_parent_id");
  CREATE INDEX "hubs_blocks_single_page_hero_path_idx" ON "hubs_blocks_single_page_hero" USING btree ("_path");
  CREATE INDEX "hubs_blocks_single_page_hero_image_idx" ON "hubs_blocks_single_page_hero" USING btree ("image_id");
  CREATE INDEX "_hubs_v_blocks_single_page_hero_order_idx" ON "_hubs_v_blocks_single_page_hero" USING btree ("_order");
  CREATE INDEX "_hubs_v_blocks_single_page_hero_parent_id_idx" ON "_hubs_v_blocks_single_page_hero" USING btree ("_parent_id");
  CREATE INDEX "_hubs_v_blocks_single_page_hero_path_idx" ON "_hubs_v_blocks_single_page_hero" USING btree ("_path");
  CREATE INDEX "_hubs_v_blocks_single_page_hero_image_idx" ON "_hubs_v_blocks_single_page_hero" USING btree ("image_id");
  ALTER TABLE "hubs_rels" ADD CONSTRAINT "hubs_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hubs_v_rels" ADD CONSTRAINT "_hubs_v_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "hubs_rels_authors_id_idx" ON "hubs_rels" USING btree ("authors_id");
  CREATE INDEX "_hubs_v_rels_authors_id_idx" ON "_hubs_v_rels" USING btree ("authors_id");
  DROP TYPE "public"."enum_hubs_blocks_icon_slider_boxes_icon";
  DROP TYPE "public"."enum__hubs_v_blocks_icon_slider_boxes_icon";`)
}
