import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_recipes_blocks_single_page_hero_orientation" AS ENUM('horizontal', 'vertical');
  CREATE TYPE "public"."enum__recipes_v_blocks_single_page_hero_orientation" AS ENUM('horizontal', 'vertical');
  CREATE TABLE "recipes_blocks_single_page_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"orientation" "enum_recipes_blocks_single_page_hero_orientation" DEFAULT 'horizontal',
  	"image_id" integer,
  	"title" varchar,
  	"enable_author" boolean DEFAULT true,
  	"heading" varchar,
  	"paragraph" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "recipes_blocks_tabs_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"anchor" varchar
  );
  
  CREATE TABLE "recipes_blocks_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"desktop_gap" varchar DEFAULT '23px',
  	"desktop_padding" varchar DEFAULT '57px',
  	"block_name" varchar
  );
  
  CREATE TABLE "recipes_blocks_references" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'REFERENCES',
  	"width_constraint" boolean DEFAULT false,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "recipes_blocks_content_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "tabbed_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" varchar DEFAULT '#f8f9fa',
  	"inactive_tab_color" varchar DEFAULT '#6c757d',
  	"border_color" varchar DEFAULT '#dee2e6',
  	"block_name" varchar
  );
  
  CREATE TABLE "_recipes_v_blocks_single_page_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"orientation" "enum__recipes_v_blocks_single_page_hero_orientation" DEFAULT 'horizontal',
  	"image_id" integer,
  	"title" varchar,
  	"enable_author" boolean DEFAULT true,
  	"heading" varchar,
  	"paragraph" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_recipes_v_blocks_tabs_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_recipes_v_blocks_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"desktop_gap" varchar DEFAULT '23px',
  	"desktop_padding" varchar DEFAULT '57px',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_recipes_v_blocks_references" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'REFERENCES',
  	"width_constraint" boolean DEFAULT false,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_recipes_v_blocks_content_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tabs_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tabbed_content_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" varchar DEFAULT '#f8f9fa',
  	"inactive_tab_color" varchar DEFAULT '#6c757d',
  	"border_color" varchar DEFAULT '#dee2e6',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "recipes" ADD COLUMN "description" jsonb;
  ALTER TABLE "recipes" ADD COLUMN "slug_lock" boolean DEFAULT true;
  ALTER TABLE "recipes_rels" ADD COLUMN "authors_id" integer;
  ALTER TABLE "recipes_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "recipes_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "_recipes_v" ADD COLUMN "version_description" jsonb;
  ALTER TABLE "_recipes_v" ADD COLUMN "version_slug_lock" boolean DEFAULT true;
  ALTER TABLE "_recipes_v_rels" ADD COLUMN "authors_id" integer;
  ALTER TABLE "_recipes_v_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "_recipes_v_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "recipes_blocks_single_page_hero" ADD CONSTRAINT "recipes_blocks_single_page_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "recipes_blocks_single_page_hero" ADD CONSTRAINT "recipes_blocks_single_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recipes_blocks_tabs_tabs" ADD CONSTRAINT "recipes_blocks_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipes_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recipes_blocks_tabs" ADD CONSTRAINT "recipes_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recipes_blocks_references" ADD CONSTRAINT "recipes_blocks_references_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recipes_blocks_content_block" ADD CONSTRAINT "recipes_blocks_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tabs" ADD CONSTRAINT "tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tabbed_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tabbed_content" ADD CONSTRAINT "tabbed_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recipes_v_blocks_single_page_hero" ADD CONSTRAINT "_recipes_v_blocks_single_page_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_recipes_v_blocks_single_page_hero" ADD CONSTRAINT "_recipes_v_blocks_single_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recipes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recipes_v_blocks_tabs_tabs" ADD CONSTRAINT "_recipes_v_blocks_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recipes_v_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recipes_v_blocks_tabs" ADD CONSTRAINT "_recipes_v_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recipes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recipes_v_blocks_references" ADD CONSTRAINT "_recipes_v_blocks_references_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recipes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recipes_v_blocks_content_block" ADD CONSTRAINT "_recipes_v_blocks_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recipes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tabs_v" ADD CONSTRAINT "_tabs_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tabbed_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tabbed_content_v" ADD CONSTRAINT "_tabbed_content_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recipes_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "recipes_blocks_single_page_hero_order_idx" ON "recipes_blocks_single_page_hero" USING btree ("_order");
  CREATE INDEX "recipes_blocks_single_page_hero_parent_id_idx" ON "recipes_blocks_single_page_hero" USING btree ("_parent_id");
  CREATE INDEX "recipes_blocks_single_page_hero_path_idx" ON "recipes_blocks_single_page_hero" USING btree ("_path");
  CREATE INDEX "recipes_blocks_single_page_hero_image_idx" ON "recipes_blocks_single_page_hero" USING btree ("image_id");
  CREATE INDEX "recipes_blocks_tabs_tabs_order_idx" ON "recipes_blocks_tabs_tabs" USING btree ("_order");
  CREATE INDEX "recipes_blocks_tabs_tabs_parent_id_idx" ON "recipes_blocks_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "recipes_blocks_tabs_order_idx" ON "recipes_blocks_tabs" USING btree ("_order");
  CREATE INDEX "recipes_blocks_tabs_parent_id_idx" ON "recipes_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX "recipes_blocks_tabs_path_idx" ON "recipes_blocks_tabs" USING btree ("_path");
  CREATE INDEX "recipes_blocks_references_order_idx" ON "recipes_blocks_references" USING btree ("_order");
  CREATE INDEX "recipes_blocks_references_parent_id_idx" ON "recipes_blocks_references" USING btree ("_parent_id");
  CREATE INDEX "recipes_blocks_references_path_idx" ON "recipes_blocks_references" USING btree ("_path");
  CREATE INDEX "recipes_blocks_content_block_order_idx" ON "recipes_blocks_content_block" USING btree ("_order");
  CREATE INDEX "recipes_blocks_content_block_parent_id_idx" ON "recipes_blocks_content_block" USING btree ("_parent_id");
  CREATE INDEX "recipes_blocks_content_block_path_idx" ON "recipes_blocks_content_block" USING btree ("_path");
  CREATE INDEX "tabs_order_idx" ON "tabs" USING btree ("_order");
  CREATE INDEX "tabs_parent_id_idx" ON "tabs" USING btree ("_parent_id");
  CREATE INDEX "tabbed_content_order_idx" ON "tabbed_content" USING btree ("_order");
  CREATE INDEX "tabbed_content_parent_id_idx" ON "tabbed_content" USING btree ("_parent_id");
  CREATE INDEX "tabbed_content_path_idx" ON "tabbed_content" USING btree ("_path");
  CREATE INDEX "_recipes_v_blocks_single_page_hero_order_idx" ON "_recipes_v_blocks_single_page_hero" USING btree ("_order");
  CREATE INDEX "_recipes_v_blocks_single_page_hero_parent_id_idx" ON "_recipes_v_blocks_single_page_hero" USING btree ("_parent_id");
  CREATE INDEX "_recipes_v_blocks_single_page_hero_path_idx" ON "_recipes_v_blocks_single_page_hero" USING btree ("_path");
  CREATE INDEX "_recipes_v_blocks_single_page_hero_image_idx" ON "_recipes_v_blocks_single_page_hero" USING btree ("image_id");
  CREATE INDEX "_recipes_v_blocks_tabs_tabs_order_idx" ON "_recipes_v_blocks_tabs_tabs" USING btree ("_order");
  CREATE INDEX "_recipes_v_blocks_tabs_tabs_parent_id_idx" ON "_recipes_v_blocks_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "_recipes_v_blocks_tabs_order_idx" ON "_recipes_v_blocks_tabs" USING btree ("_order");
  CREATE INDEX "_recipes_v_blocks_tabs_parent_id_idx" ON "_recipes_v_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX "_recipes_v_blocks_tabs_path_idx" ON "_recipes_v_blocks_tabs" USING btree ("_path");
  CREATE INDEX "_recipes_v_blocks_references_order_idx" ON "_recipes_v_blocks_references" USING btree ("_order");
  CREATE INDEX "_recipes_v_blocks_references_parent_id_idx" ON "_recipes_v_blocks_references" USING btree ("_parent_id");
  CREATE INDEX "_recipes_v_blocks_references_path_idx" ON "_recipes_v_blocks_references" USING btree ("_path");
  CREATE INDEX "_recipes_v_blocks_content_block_order_idx" ON "_recipes_v_blocks_content_block" USING btree ("_order");
  CREATE INDEX "_recipes_v_blocks_content_block_parent_id_idx" ON "_recipes_v_blocks_content_block" USING btree ("_parent_id");
  CREATE INDEX "_recipes_v_blocks_content_block_path_idx" ON "_recipes_v_blocks_content_block" USING btree ("_path");
  CREATE INDEX "_tabs_v_order_idx" ON "_tabs_v" USING btree ("_order");
  CREATE INDEX "_tabs_v_parent_id_idx" ON "_tabs_v" USING btree ("_parent_id");
  CREATE INDEX "_tabbed_content_v_order_idx" ON "_tabbed_content_v" USING btree ("_order");
  CREATE INDEX "_tabbed_content_v_parent_id_idx" ON "_tabbed_content_v" USING btree ("_parent_id");
  CREATE INDEX "_tabbed_content_v_path_idx" ON "_tabbed_content_v" USING btree ("_path");
  ALTER TABLE "recipes_rels" ADD CONSTRAINT "recipes_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recipes_rels" ADD CONSTRAINT "recipes_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recipes_rels" ADD CONSTRAINT "recipes_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recipes_v_rels" ADD CONSTRAINT "_recipes_v_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recipes_v_rels" ADD CONSTRAINT "_recipes_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recipes_v_rels" ADD CONSTRAINT "_recipes_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "recipes_rels_authors_id_idx" ON "recipes_rels" USING btree ("authors_id");
  CREATE INDEX "recipes_rels_pages_id_idx" ON "recipes_rels" USING btree ("pages_id");
  CREATE INDEX "recipes_rels_posts_id_idx" ON "recipes_rels" USING btree ("posts_id");
  CREATE INDEX "_recipes_v_rels_authors_id_idx" ON "_recipes_v_rels" USING btree ("authors_id");
  CREATE INDEX "_recipes_v_rels_pages_id_idx" ON "_recipes_v_rels" USING btree ("pages_id");
  CREATE INDEX "_recipes_v_rels_posts_id_idx" ON "_recipes_v_rels" USING btree ("posts_id");
  ALTER TABLE "recipes" DROP COLUMN "published_at";
  ALTER TABLE "_recipes_v" DROP COLUMN "version_published_at";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "recipes_blocks_single_page_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recipes_blocks_tabs_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recipes_blocks_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recipes_blocks_references" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recipes_blocks_content_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tabbed_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recipes_v_blocks_single_page_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recipes_v_blocks_tabs_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recipes_v_blocks_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recipes_v_blocks_references" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recipes_v_blocks_content_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tabs_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tabbed_content_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "recipes_blocks_single_page_hero" CASCADE;
  DROP TABLE "recipes_blocks_tabs_tabs" CASCADE;
  DROP TABLE "recipes_blocks_tabs" CASCADE;
  DROP TABLE "recipes_blocks_references" CASCADE;
  DROP TABLE "recipes_blocks_content_block" CASCADE;
  DROP TABLE "tabs" CASCADE;
  DROP TABLE "tabbed_content" CASCADE;
  DROP TABLE "_recipes_v_blocks_single_page_hero" CASCADE;
  DROP TABLE "_recipes_v_blocks_tabs_tabs" CASCADE;
  DROP TABLE "_recipes_v_blocks_tabs" CASCADE;
  DROP TABLE "_recipes_v_blocks_references" CASCADE;
  DROP TABLE "_recipes_v_blocks_content_block" CASCADE;
  DROP TABLE "_tabs_v" CASCADE;
  DROP TABLE "_tabbed_content_v" CASCADE;
  ALTER TABLE "recipes_rels" DROP CONSTRAINT "recipes_rels_authors_fk";
  
  ALTER TABLE "recipes_rels" DROP CONSTRAINT "recipes_rels_pages_fk";
  
  ALTER TABLE "recipes_rels" DROP CONSTRAINT "recipes_rels_posts_fk";
  
  ALTER TABLE "_recipes_v_rels" DROP CONSTRAINT "_recipes_v_rels_authors_fk";
  
  ALTER TABLE "_recipes_v_rels" DROP CONSTRAINT "_recipes_v_rels_pages_fk";
  
  ALTER TABLE "_recipes_v_rels" DROP CONSTRAINT "_recipes_v_rels_posts_fk";
  
  DROP INDEX "recipes_rels_authors_id_idx";
  DROP INDEX "recipes_rels_pages_id_idx";
  DROP INDEX "recipes_rels_posts_id_idx";
  DROP INDEX "_recipes_v_rels_authors_id_idx";
  DROP INDEX "_recipes_v_rels_pages_id_idx";
  DROP INDEX "_recipes_v_rels_posts_id_idx";
  ALTER TABLE "recipes" ADD COLUMN "published_at" timestamp(3) with time zone;
  ALTER TABLE "_recipes_v" ADD COLUMN "version_published_at" timestamp(3) with time zone;
  ALTER TABLE "recipes" DROP COLUMN "description";
  ALTER TABLE "recipes" DROP COLUMN "slug_lock";
  ALTER TABLE "recipes_rels" DROP COLUMN "authors_id";
  ALTER TABLE "recipes_rels" DROP COLUMN "pages_id";
  ALTER TABLE "recipes_rels" DROP COLUMN "posts_id";
  ALTER TABLE "_recipes_v" DROP COLUMN "version_description";
  ALTER TABLE "_recipes_v" DROP COLUMN "version_slug_lock";
  ALTER TABLE "_recipes_v_rels" DROP COLUMN "authors_id";
  ALTER TABLE "_recipes_v_rels" DROP COLUMN "pages_id";
  ALTER TABLE "_recipes_v_rels" DROP COLUMN "posts_id";
  DROP TYPE "public"."enum_recipes_blocks_single_page_hero_orientation";
  DROP TYPE "public"."enum__recipes_v_blocks_single_page_hero_orientation";`)
}
