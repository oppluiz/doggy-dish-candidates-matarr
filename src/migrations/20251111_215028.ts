import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_hubs_blocks_slider_container_size" AS ENUM('container', 'container-small');
  CREATE TYPE "public"."enum_hubs_blocks_slider_aspect_ratio" AS ENUM('aspect-[1/1]', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-[16/9]');
  CREATE TYPE "public"."enum_hubs_blocks_slider_overflow_setting" AS ENUM('overflow-hidden', 'overflow-visible', 'overflow-hidden md:overflow-visible');
  CREATE TYPE "public"."enum_hubs_blocks_testimonial_container_size" AS ENUM('container', 'container-small');
  CREATE TYPE "public"."enum__hubs_v_blocks_slider_container_size" AS ENUM('container', 'container-small');
  CREATE TYPE "public"."enum__hubs_v_blocks_slider_aspect_ratio" AS ENUM('aspect-[1/1]', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-[16/9]');
  CREATE TYPE "public"."enum__hubs_v_blocks_slider_overflow_setting" AS ENUM('overflow-hidden', 'overflow-visible', 'overflow-hidden md:overflow-visible');
  CREATE TYPE "public"."enum__hubs_v_blocks_testimonial_container_size" AS ENUM('container', 'container-small');
  CREATE TABLE "hubs_blocks_slider_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "hubs_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"container_size" "enum_hubs_blocks_slider_container_size" DEFAULT 'container',
  	"title" varchar,
  	"title_url" varchar,
  	"aspect_ratio" "enum_hubs_blocks_slider_aspect_ratio" DEFAULT 'aspect-[1/1]',
  	"overflow_setting" "enum_hubs_blocks_slider_overflow_setting" DEFAULT 'overflow-hidden md:overflow-visible',
  	"width_constraint" boolean DEFAULT false,
  	"use_placeholders" boolean DEFAULT false,
  	"placeholder_image_id" integer,
  	"placeholder_title" varchar DEFAULT 'Placeholder',
  	"placeholder_count" numeric DEFAULT 5,
  	"block_name" varchar
  );
  
  CREATE TABLE "hubs_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"container_size" "enum_hubs_blocks_testimonial_container_size" DEFAULT 'container',
  	"content" jsonb,
  	"author_id" integer,
  	"author_title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_hubs_v_blocks_slider_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_hubs_v_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"container_size" "enum__hubs_v_blocks_slider_container_size" DEFAULT 'container',
  	"title" varchar,
  	"title_url" varchar,
  	"aspect_ratio" "enum__hubs_v_blocks_slider_aspect_ratio" DEFAULT 'aspect-[1/1]',
  	"overflow_setting" "enum__hubs_v_blocks_slider_overflow_setting" DEFAULT 'overflow-hidden md:overflow-visible',
  	"width_constraint" boolean DEFAULT false,
  	"use_placeholders" boolean DEFAULT false,
  	"placeholder_image_id" integer,
  	"placeholder_title" varchar DEFAULT 'Placeholder',
  	"placeholder_count" numeric DEFAULT 5,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_hubs_v_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"container_size" "enum__hubs_v_blocks_testimonial_container_size" DEFAULT 'container',
  	"content" jsonb,
  	"author_id" integer,
  	"author_title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "authors" ADD COLUMN "author_title" varchar;
  ALTER TABLE "hubs_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "hubs_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "hubs_rels" ADD COLUMN "workshops_id" integer;
  ALTER TABLE "hubs_rels" ADD COLUMN "recipes_id" integer;
  ALTER TABLE "_hubs_v_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "_hubs_v_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "_hubs_v_rels" ADD COLUMN "workshops_id" integer;
  ALTER TABLE "_hubs_v_rels" ADD COLUMN "recipes_id" integer;
  ALTER TABLE "hubs_blocks_slider_items" ADD CONSTRAINT "hubs_blocks_slider_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hubs_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hubs_blocks_slider" ADD CONSTRAINT "hubs_blocks_slider_placeholder_image_id_media_id_fk" FOREIGN KEY ("placeholder_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hubs_blocks_slider" ADD CONSTRAINT "hubs_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hubs_blocks_testimonial" ADD CONSTRAINT "hubs_blocks_testimonial_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hubs_blocks_testimonial" ADD CONSTRAINT "hubs_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hubs_v_blocks_slider_items" ADD CONSTRAINT "_hubs_v_blocks_slider_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hubs_v_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hubs_v_blocks_slider" ADD CONSTRAINT "_hubs_v_blocks_slider_placeholder_image_id_media_id_fk" FOREIGN KEY ("placeholder_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hubs_v_blocks_slider" ADD CONSTRAINT "_hubs_v_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hubs_v_blocks_testimonial" ADD CONSTRAINT "_hubs_v_blocks_testimonial_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hubs_v_blocks_testimonial" ADD CONSTRAINT "_hubs_v_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "hubs_blocks_slider_items_order_idx" ON "hubs_blocks_slider_items" USING btree ("_order");
  CREATE INDEX "hubs_blocks_slider_items_parent_id_idx" ON "hubs_blocks_slider_items" USING btree ("_parent_id");
  CREATE INDEX "hubs_blocks_slider_order_idx" ON "hubs_blocks_slider" USING btree ("_order");
  CREATE INDEX "hubs_blocks_slider_parent_id_idx" ON "hubs_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "hubs_blocks_slider_path_idx" ON "hubs_blocks_slider" USING btree ("_path");
  CREATE INDEX "hubs_blocks_slider_placeholder_image_idx" ON "hubs_blocks_slider" USING btree ("placeholder_image_id");
  CREATE INDEX "hubs_blocks_testimonial_order_idx" ON "hubs_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "hubs_blocks_testimonial_parent_id_idx" ON "hubs_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "hubs_blocks_testimonial_path_idx" ON "hubs_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "hubs_blocks_testimonial_author_idx" ON "hubs_blocks_testimonial" USING btree ("author_id");
  CREATE INDEX "_hubs_v_blocks_slider_items_order_idx" ON "_hubs_v_blocks_slider_items" USING btree ("_order");
  CREATE INDEX "_hubs_v_blocks_slider_items_parent_id_idx" ON "_hubs_v_blocks_slider_items" USING btree ("_parent_id");
  CREATE INDEX "_hubs_v_blocks_slider_order_idx" ON "_hubs_v_blocks_slider" USING btree ("_order");
  CREATE INDEX "_hubs_v_blocks_slider_parent_id_idx" ON "_hubs_v_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "_hubs_v_blocks_slider_path_idx" ON "_hubs_v_blocks_slider" USING btree ("_path");
  CREATE INDEX "_hubs_v_blocks_slider_placeholder_image_idx" ON "_hubs_v_blocks_slider" USING btree ("placeholder_image_id");
  CREATE INDEX "_hubs_v_blocks_testimonial_order_idx" ON "_hubs_v_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "_hubs_v_blocks_testimonial_parent_id_idx" ON "_hubs_v_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "_hubs_v_blocks_testimonial_path_idx" ON "_hubs_v_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "_hubs_v_blocks_testimonial_author_idx" ON "_hubs_v_blocks_testimonial" USING btree ("author_id");
  ALTER TABLE "hubs_rels" ADD CONSTRAINT "hubs_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hubs_rels" ADD CONSTRAINT "hubs_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hubs_rels" ADD CONSTRAINT "hubs_rels_workshops_fk" FOREIGN KEY ("workshops_id") REFERENCES "public"."workshops"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hubs_rels" ADD CONSTRAINT "hubs_rels_recipes_fk" FOREIGN KEY ("recipes_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hubs_v_rels" ADD CONSTRAINT "_hubs_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hubs_v_rels" ADD CONSTRAINT "_hubs_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hubs_v_rels" ADD CONSTRAINT "_hubs_v_rels_workshops_fk" FOREIGN KEY ("workshops_id") REFERENCES "public"."workshops"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hubs_v_rels" ADD CONSTRAINT "_hubs_v_rels_recipes_fk" FOREIGN KEY ("recipes_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "hubs_rels_pages_id_idx" ON "hubs_rels" USING btree ("pages_id");
  CREATE INDEX "hubs_rels_posts_id_idx" ON "hubs_rels" USING btree ("posts_id");
  CREATE INDEX "hubs_rels_workshops_id_idx" ON "hubs_rels" USING btree ("workshops_id");
  CREATE INDEX "hubs_rels_recipes_id_idx" ON "hubs_rels" USING btree ("recipes_id");
  CREATE INDEX "_hubs_v_rels_pages_id_idx" ON "_hubs_v_rels" USING btree ("pages_id");
  CREATE INDEX "_hubs_v_rels_posts_id_idx" ON "_hubs_v_rels" USING btree ("posts_id");
  CREATE INDEX "_hubs_v_rels_workshops_id_idx" ON "_hubs_v_rels" USING btree ("workshops_id");
  CREATE INDEX "_hubs_v_rels_recipes_id_idx" ON "_hubs_v_rels" USING btree ("recipes_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "hubs_blocks_slider_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "hubs_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "hubs_blocks_testimonial" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_hubs_v_blocks_slider_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_hubs_v_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_hubs_v_blocks_testimonial" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "hubs_blocks_slider_items" CASCADE;
  DROP TABLE "hubs_blocks_slider" CASCADE;
  DROP TABLE "hubs_blocks_testimonial" CASCADE;
  DROP TABLE "_hubs_v_blocks_slider_items" CASCADE;
  DROP TABLE "_hubs_v_blocks_slider" CASCADE;
  DROP TABLE "_hubs_v_blocks_testimonial" CASCADE;
  ALTER TABLE "hubs_rels" DROP CONSTRAINT "hubs_rels_pages_fk";
  
  ALTER TABLE "hubs_rels" DROP CONSTRAINT "hubs_rels_posts_fk";
  
  ALTER TABLE "hubs_rels" DROP CONSTRAINT "hubs_rels_workshops_fk";
  
  ALTER TABLE "hubs_rels" DROP CONSTRAINT "hubs_rels_recipes_fk";
  
  ALTER TABLE "_hubs_v_rels" DROP CONSTRAINT "_hubs_v_rels_pages_fk";
  
  ALTER TABLE "_hubs_v_rels" DROP CONSTRAINT "_hubs_v_rels_posts_fk";
  
  ALTER TABLE "_hubs_v_rels" DROP CONSTRAINT "_hubs_v_rels_workshops_fk";
  
  ALTER TABLE "_hubs_v_rels" DROP CONSTRAINT "_hubs_v_rels_recipes_fk";
  
  DROP INDEX "hubs_rels_pages_id_idx";
  DROP INDEX "hubs_rels_posts_id_idx";
  DROP INDEX "hubs_rels_workshops_id_idx";
  DROP INDEX "hubs_rels_recipes_id_idx";
  DROP INDEX "_hubs_v_rels_pages_id_idx";
  DROP INDEX "_hubs_v_rels_posts_id_idx";
  DROP INDEX "_hubs_v_rels_workshops_id_idx";
  DROP INDEX "_hubs_v_rels_recipes_id_idx";
  ALTER TABLE "authors" DROP COLUMN "author_title";
  ALTER TABLE "hubs_rels" DROP COLUMN "pages_id";
  ALTER TABLE "hubs_rels" DROP COLUMN "posts_id";
  ALTER TABLE "hubs_rels" DROP COLUMN "workshops_id";
  ALTER TABLE "hubs_rels" DROP COLUMN "recipes_id";
  ALTER TABLE "_hubs_v_rels" DROP COLUMN "pages_id";
  ALTER TABLE "_hubs_v_rels" DROP COLUMN "posts_id";
  ALTER TABLE "_hubs_v_rels" DROP COLUMN "workshops_id";
  ALTER TABLE "_hubs_v_rels" DROP COLUMN "recipes_id";
  DROP TYPE "public"."enum_hubs_blocks_slider_container_size";
  DROP TYPE "public"."enum_hubs_blocks_slider_aspect_ratio";
  DROP TYPE "public"."enum_hubs_blocks_slider_overflow_setting";
  DROP TYPE "public"."enum_hubs_blocks_testimonial_container_size";
  DROP TYPE "public"."enum__hubs_v_blocks_slider_container_size";
  DROP TYPE "public"."enum__hubs_v_blocks_slider_aspect_ratio";
  DROP TYPE "public"."enum__hubs_v_blocks_slider_overflow_setting";
  DROP TYPE "public"."enum__hubs_v_blocks_testimonial_container_size";`)
}
