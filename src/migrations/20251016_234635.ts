import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_sub_hubs_blocks_single_page_hero_orientation" AS ENUM('horizontal', 'vertical');
  CREATE TYPE "public"."enum_sub_hubs_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_sub_hubs_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_sub_hubs_collection" AS ENUM('health', 'food', 'howTo');
  CREATE TYPE "public"."enum_sub_hubs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__sub_hubs_v_blocks_single_page_hero_orientation" AS ENUM('horizontal', 'vertical');
  CREATE TYPE "public"."enum__sub_hubs_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__sub_hubs_v_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__sub_hubs_v_version_collection" AS ENUM('health', 'food', 'howTo');
  CREATE TYPE "public"."enum__sub_hubs_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "sub_hubs_blocks_single_page_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"orientation" "enum_sub_hubs_blocks_single_page_hero_orientation" DEFAULT 'horizontal',
  	"image_id" integer,
  	"title" varchar,
  	"enable_author" boolean DEFAULT true,
  	"author_id" integer,
  	"heading" varchar,
  	"paragraph" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "sub_hubs_blocks_tabs_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"anchor" varchar
  );
  
  CREATE TABLE "sub_hubs_blocks_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "sub_hubs_blocks_health_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "sub_hubs_blocks_content_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "sub_hubs_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_sub_hubs_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_sub_hubs_blocks_cta_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "sub_hubs_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "sub_hubs_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "sub_hubs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"category_id" integer,
  	"collection" "enum_sub_hubs_collection",
  	"published_at" timestamp(3) with time zone,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_sub_hubs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "sub_hubs_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "_sub_hubs_v_blocks_single_page_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"orientation" "enum__sub_hubs_v_blocks_single_page_hero_orientation" DEFAULT 'horizontal',
  	"image_id" integer,
  	"title" varchar,
  	"enable_author" boolean DEFAULT true,
  	"author_id" integer,
  	"heading" varchar,
  	"paragraph" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sub_hubs_v_blocks_tabs_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sub_hubs_v_blocks_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sub_hubs_v_blocks_health_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sub_hubs_v_blocks_content_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sub_hubs_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__sub_hubs_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__sub_hubs_v_blocks_cta_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sub_hubs_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sub_hubs_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sub_hubs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_category_id" integer,
  	"version_collection" "enum__sub_hubs_v_version_collection",
  	"version_published_at" timestamp(3) with time zone,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__sub_hubs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_sub_hubs_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  ALTER TABLE "sects" DROP CONSTRAINT "sects_parent_id_fk";
  
  ALTER TABLE "health_rels" DROP CONSTRAINT "health_rels_categories_fk";
  
  ALTER TABLE "_sects_v" DROP CONSTRAINT "_sects_v_parent_id_fk";
  
  ALTER TABLE "_health_v_rels" DROP CONSTRAINT "_health_v_rels_categories_fk";
  
  DROP INDEX "health_rels_categories_id_idx";
  DROP INDEX "_health_v_rels_categories_id_idx";
  ALTER TABLE "food_rels" ADD COLUMN "sub_hubs_id" integer;
  ALTER TABLE "_food_v_rels" ADD COLUMN "sub_hubs_id" integer;
  ALTER TABLE "health_rels" ADD COLUMN "sub_hubs_id" integer;
  ALTER TABLE "_health_v_rels" ADD COLUMN "sub_hubs_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "sub_hubs_id" integer;
  ALTER TABLE "sub_hubs_blocks_single_page_hero" ADD CONSTRAINT "sub_hubs_blocks_single_page_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sub_hubs_blocks_single_page_hero" ADD CONSTRAINT "sub_hubs_blocks_single_page_hero_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sub_hubs_blocks_single_page_hero" ADD CONSTRAINT "sub_hubs_blocks_single_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sub_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sub_hubs_blocks_tabs_tabs" ADD CONSTRAINT "sub_hubs_blocks_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sub_hubs_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sub_hubs_blocks_tabs" ADD CONSTRAINT "sub_hubs_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sub_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sub_hubs_blocks_health_sections" ADD CONSTRAINT "sub_hubs_blocks_health_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sub_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sub_hubs_blocks_content_block" ADD CONSTRAINT "sub_hubs_blocks_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sub_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sub_hubs_blocks_cta_links" ADD CONSTRAINT "sub_hubs_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sub_hubs_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sub_hubs_blocks_cta" ADD CONSTRAINT "sub_hubs_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sub_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sub_hubs_blocks_media_block" ADD CONSTRAINT "sub_hubs_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sub_hubs_blocks_media_block" ADD CONSTRAINT "sub_hubs_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sub_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sub_hubs" ADD CONSTRAINT "sub_hubs_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sub_hubs" ADD CONSTRAINT "sub_hubs_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sub_hubs_rels" ADD CONSTRAINT "sub_hubs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."sub_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sub_hubs_rels" ADD CONSTRAINT "sub_hubs_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sub_hubs_rels" ADD CONSTRAINT "sub_hubs_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sub_hubs_v_blocks_single_page_hero" ADD CONSTRAINT "_sub_hubs_v_blocks_single_page_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sub_hubs_v_blocks_single_page_hero" ADD CONSTRAINT "_sub_hubs_v_blocks_single_page_hero_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sub_hubs_v_blocks_single_page_hero" ADD CONSTRAINT "_sub_hubs_v_blocks_single_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sub_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sub_hubs_v_blocks_tabs_tabs" ADD CONSTRAINT "_sub_hubs_v_blocks_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sub_hubs_v_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sub_hubs_v_blocks_tabs" ADD CONSTRAINT "_sub_hubs_v_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sub_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sub_hubs_v_blocks_health_sections" ADD CONSTRAINT "_sub_hubs_v_blocks_health_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sub_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sub_hubs_v_blocks_content_block" ADD CONSTRAINT "_sub_hubs_v_blocks_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sub_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sub_hubs_v_blocks_cta_links" ADD CONSTRAINT "_sub_hubs_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sub_hubs_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sub_hubs_v_blocks_cta" ADD CONSTRAINT "_sub_hubs_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sub_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sub_hubs_v_blocks_media_block" ADD CONSTRAINT "_sub_hubs_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sub_hubs_v_blocks_media_block" ADD CONSTRAINT "_sub_hubs_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sub_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sub_hubs_v" ADD CONSTRAINT "_sub_hubs_v_parent_id_sub_hubs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."sub_hubs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sub_hubs_v" ADD CONSTRAINT "_sub_hubs_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sub_hubs_v" ADD CONSTRAINT "_sub_hubs_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sub_hubs_v_rels" ADD CONSTRAINT "_sub_hubs_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_sub_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sub_hubs_v_rels" ADD CONSTRAINT "_sub_hubs_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sub_hubs_v_rels" ADD CONSTRAINT "_sub_hubs_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "sub_hubs_blocks_single_page_hero_order_idx" ON "sub_hubs_blocks_single_page_hero" USING btree ("_order");
  CREATE INDEX "sub_hubs_blocks_single_page_hero_parent_id_idx" ON "sub_hubs_blocks_single_page_hero" USING btree ("_parent_id");
  CREATE INDEX "sub_hubs_blocks_single_page_hero_path_idx" ON "sub_hubs_blocks_single_page_hero" USING btree ("_path");
  CREATE INDEX "sub_hubs_blocks_single_page_hero_image_idx" ON "sub_hubs_blocks_single_page_hero" USING btree ("image_id");
  CREATE INDEX "sub_hubs_blocks_single_page_hero_author_idx" ON "sub_hubs_blocks_single_page_hero" USING btree ("author_id");
  CREATE INDEX "sub_hubs_blocks_tabs_tabs_order_idx" ON "sub_hubs_blocks_tabs_tabs" USING btree ("_order");
  CREATE INDEX "sub_hubs_blocks_tabs_tabs_parent_id_idx" ON "sub_hubs_blocks_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "sub_hubs_blocks_tabs_order_idx" ON "sub_hubs_blocks_tabs" USING btree ("_order");
  CREATE INDEX "sub_hubs_blocks_tabs_parent_id_idx" ON "sub_hubs_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX "sub_hubs_blocks_tabs_path_idx" ON "sub_hubs_blocks_tabs" USING btree ("_path");
  CREATE INDEX "sub_hubs_blocks_health_sections_order_idx" ON "sub_hubs_blocks_health_sections" USING btree ("_order");
  CREATE INDEX "sub_hubs_blocks_health_sections_parent_id_idx" ON "sub_hubs_blocks_health_sections" USING btree ("_parent_id");
  CREATE INDEX "sub_hubs_blocks_health_sections_path_idx" ON "sub_hubs_blocks_health_sections" USING btree ("_path");
  CREATE INDEX "sub_hubs_blocks_content_block_order_idx" ON "sub_hubs_blocks_content_block" USING btree ("_order");
  CREATE INDEX "sub_hubs_blocks_content_block_parent_id_idx" ON "sub_hubs_blocks_content_block" USING btree ("_parent_id");
  CREATE INDEX "sub_hubs_blocks_content_block_path_idx" ON "sub_hubs_blocks_content_block" USING btree ("_path");
  CREATE INDEX "sub_hubs_blocks_cta_links_order_idx" ON "sub_hubs_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "sub_hubs_blocks_cta_links_parent_id_idx" ON "sub_hubs_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "sub_hubs_blocks_cta_order_idx" ON "sub_hubs_blocks_cta" USING btree ("_order");
  CREATE INDEX "sub_hubs_blocks_cta_parent_id_idx" ON "sub_hubs_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "sub_hubs_blocks_cta_path_idx" ON "sub_hubs_blocks_cta" USING btree ("_path");
  CREATE INDEX "sub_hubs_blocks_media_block_order_idx" ON "sub_hubs_blocks_media_block" USING btree ("_order");
  CREATE INDEX "sub_hubs_blocks_media_block_parent_id_idx" ON "sub_hubs_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "sub_hubs_blocks_media_block_path_idx" ON "sub_hubs_blocks_media_block" USING btree ("_path");
  CREATE INDEX "sub_hubs_blocks_media_block_media_idx" ON "sub_hubs_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "sub_hubs_category_idx" ON "sub_hubs" USING btree ("category_id");
  CREATE INDEX "sub_hubs_meta_meta_image_idx" ON "sub_hubs" USING btree ("meta_image_id");
  CREATE INDEX "sub_hubs_slug_idx" ON "sub_hubs" USING btree ("slug");
  CREATE INDEX "sub_hubs_updated_at_idx" ON "sub_hubs" USING btree ("updated_at");
  CREATE INDEX "sub_hubs_created_at_idx" ON "sub_hubs" USING btree ("created_at");
  CREATE INDEX "sub_hubs__status_idx" ON "sub_hubs" USING btree ("_status");
  CREATE INDEX "sub_hubs_rels_order_idx" ON "sub_hubs_rels" USING btree ("order");
  CREATE INDEX "sub_hubs_rels_parent_idx" ON "sub_hubs_rels" USING btree ("parent_id");
  CREATE INDEX "sub_hubs_rels_path_idx" ON "sub_hubs_rels" USING btree ("path");
  CREATE INDEX "sub_hubs_rels_pages_id_idx" ON "sub_hubs_rels" USING btree ("pages_id");
  CREATE INDEX "sub_hubs_rels_posts_id_idx" ON "sub_hubs_rels" USING btree ("posts_id");
  CREATE INDEX "_sub_hubs_v_blocks_single_page_hero_order_idx" ON "_sub_hubs_v_blocks_single_page_hero" USING btree ("_order");
  CREATE INDEX "_sub_hubs_v_blocks_single_page_hero_parent_id_idx" ON "_sub_hubs_v_blocks_single_page_hero" USING btree ("_parent_id");
  CREATE INDEX "_sub_hubs_v_blocks_single_page_hero_path_idx" ON "_sub_hubs_v_blocks_single_page_hero" USING btree ("_path");
  CREATE INDEX "_sub_hubs_v_blocks_single_page_hero_image_idx" ON "_sub_hubs_v_blocks_single_page_hero" USING btree ("image_id");
  CREATE INDEX "_sub_hubs_v_blocks_single_page_hero_author_idx" ON "_sub_hubs_v_blocks_single_page_hero" USING btree ("author_id");
  CREATE INDEX "_sub_hubs_v_blocks_tabs_tabs_order_idx" ON "_sub_hubs_v_blocks_tabs_tabs" USING btree ("_order");
  CREATE INDEX "_sub_hubs_v_blocks_tabs_tabs_parent_id_idx" ON "_sub_hubs_v_blocks_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "_sub_hubs_v_blocks_tabs_order_idx" ON "_sub_hubs_v_blocks_tabs" USING btree ("_order");
  CREATE INDEX "_sub_hubs_v_blocks_tabs_parent_id_idx" ON "_sub_hubs_v_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX "_sub_hubs_v_blocks_tabs_path_idx" ON "_sub_hubs_v_blocks_tabs" USING btree ("_path");
  CREATE INDEX "_sub_hubs_v_blocks_health_sections_order_idx" ON "_sub_hubs_v_blocks_health_sections" USING btree ("_order");
  CREATE INDEX "_sub_hubs_v_blocks_health_sections_parent_id_idx" ON "_sub_hubs_v_blocks_health_sections" USING btree ("_parent_id");
  CREATE INDEX "_sub_hubs_v_blocks_health_sections_path_idx" ON "_sub_hubs_v_blocks_health_sections" USING btree ("_path");
  CREATE INDEX "_sub_hubs_v_blocks_content_block_order_idx" ON "_sub_hubs_v_blocks_content_block" USING btree ("_order");
  CREATE INDEX "_sub_hubs_v_blocks_content_block_parent_id_idx" ON "_sub_hubs_v_blocks_content_block" USING btree ("_parent_id");
  CREATE INDEX "_sub_hubs_v_blocks_content_block_path_idx" ON "_sub_hubs_v_blocks_content_block" USING btree ("_path");
  CREATE INDEX "_sub_hubs_v_blocks_cta_links_order_idx" ON "_sub_hubs_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_sub_hubs_v_blocks_cta_links_parent_id_idx" ON "_sub_hubs_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_sub_hubs_v_blocks_cta_order_idx" ON "_sub_hubs_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_sub_hubs_v_blocks_cta_parent_id_idx" ON "_sub_hubs_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_sub_hubs_v_blocks_cta_path_idx" ON "_sub_hubs_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_sub_hubs_v_blocks_media_block_order_idx" ON "_sub_hubs_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_sub_hubs_v_blocks_media_block_parent_id_idx" ON "_sub_hubs_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_sub_hubs_v_blocks_media_block_path_idx" ON "_sub_hubs_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_sub_hubs_v_blocks_media_block_media_idx" ON "_sub_hubs_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_sub_hubs_v_parent_idx" ON "_sub_hubs_v" USING btree ("parent_id");
  CREATE INDEX "_sub_hubs_v_version_version_category_idx" ON "_sub_hubs_v" USING btree ("version_category_id");
  CREATE INDEX "_sub_hubs_v_version_meta_version_meta_image_idx" ON "_sub_hubs_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_sub_hubs_v_version_version_slug_idx" ON "_sub_hubs_v" USING btree ("version_slug");
  CREATE INDEX "_sub_hubs_v_version_version_updated_at_idx" ON "_sub_hubs_v" USING btree ("version_updated_at");
  CREATE INDEX "_sub_hubs_v_version_version_created_at_idx" ON "_sub_hubs_v" USING btree ("version_created_at");
  CREATE INDEX "_sub_hubs_v_version_version__status_idx" ON "_sub_hubs_v" USING btree ("version__status");
  CREATE INDEX "_sub_hubs_v_created_at_idx" ON "_sub_hubs_v" USING btree ("created_at");
  CREATE INDEX "_sub_hubs_v_updated_at_idx" ON "_sub_hubs_v" USING btree ("updated_at");
  CREATE INDEX "_sub_hubs_v_latest_idx" ON "_sub_hubs_v" USING btree ("latest");
  CREATE INDEX "_sub_hubs_v_autosave_idx" ON "_sub_hubs_v" USING btree ("autosave");
  CREATE INDEX "_sub_hubs_v_rels_order_idx" ON "_sub_hubs_v_rels" USING btree ("order");
  CREATE INDEX "_sub_hubs_v_rels_parent_idx" ON "_sub_hubs_v_rels" USING btree ("parent_id");
  CREATE INDEX "_sub_hubs_v_rels_path_idx" ON "_sub_hubs_v_rels" USING btree ("path");
  CREATE INDEX "_sub_hubs_v_rels_pages_id_idx" ON "_sub_hubs_v_rels" USING btree ("pages_id");
  CREATE INDEX "_sub_hubs_v_rels_posts_id_idx" ON "_sub_hubs_v_rels" USING btree ("posts_id");
  ALTER TABLE "food_rels" ADD CONSTRAINT "food_rels_sub_hubs_fk" FOREIGN KEY ("sub_hubs_id") REFERENCES "public"."sub_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_food_v_rels" ADD CONSTRAINT "_food_v_rels_sub_hubs_fk" FOREIGN KEY ("sub_hubs_id") REFERENCES "public"."sub_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sects" ADD CONSTRAINT "sects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sub_hubs_blocks_health_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "health_rels" ADD CONSTRAINT "health_rels_sub_hubs_fk" FOREIGN KEY ("sub_hubs_id") REFERENCES "public"."sub_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sects_v" ADD CONSTRAINT "_sects_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sub_hubs_v_blocks_health_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_health_v_rels" ADD CONSTRAINT "_health_v_rels_sub_hubs_fk" FOREIGN KEY ("sub_hubs_id") REFERENCES "public"."sub_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sub_hubs_fk" FOREIGN KEY ("sub_hubs_id") REFERENCES "public"."sub_hubs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "food_rels_sub_hubs_id_idx" ON "food_rels" USING btree ("sub_hubs_id");
  CREATE INDEX "_food_v_rels_sub_hubs_id_idx" ON "_food_v_rels" USING btree ("sub_hubs_id");
  CREATE INDEX "health_rels_sub_hubs_id_idx" ON "health_rels" USING btree ("sub_hubs_id");
  CREATE INDEX "_health_v_rels_sub_hubs_id_idx" ON "_health_v_rels" USING btree ("sub_hubs_id");
  CREATE INDEX "payload_locked_documents_rels_sub_hubs_id_idx" ON "payload_locked_documents_rels" USING btree ("sub_hubs_id");
  ALTER TABLE "health_rels" DROP COLUMN "categories_id";
  ALTER TABLE "_health_v_rels" DROP COLUMN "categories_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sub_hubs_blocks_single_page_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sub_hubs_blocks_tabs_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sub_hubs_blocks_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sub_hubs_blocks_health_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sub_hubs_blocks_content_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sub_hubs_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sub_hubs_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sub_hubs_blocks_media_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sub_hubs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sub_hubs_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sub_hubs_v_blocks_single_page_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sub_hubs_v_blocks_tabs_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sub_hubs_v_blocks_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sub_hubs_v_blocks_health_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sub_hubs_v_blocks_content_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sub_hubs_v_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sub_hubs_v_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sub_hubs_v_blocks_media_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sub_hubs_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sub_hubs_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "sub_hubs_blocks_single_page_hero" CASCADE;
  DROP TABLE "sub_hubs_blocks_tabs_tabs" CASCADE;
  DROP TABLE "sub_hubs_blocks_tabs" CASCADE;
  DROP TABLE "sub_hubs_blocks_health_sections" CASCADE;
  DROP TABLE "sub_hubs_blocks_content_block" CASCADE;
  DROP TABLE "sub_hubs_blocks_cta_links" CASCADE;
  DROP TABLE "sub_hubs_blocks_cta" CASCADE;
  DROP TABLE "sub_hubs_blocks_media_block" CASCADE;
  DROP TABLE "sub_hubs" CASCADE;
  DROP TABLE "sub_hubs_rels" CASCADE;
  DROP TABLE "_sub_hubs_v_blocks_single_page_hero" CASCADE;
  DROP TABLE "_sub_hubs_v_blocks_tabs_tabs" CASCADE;
  DROP TABLE "_sub_hubs_v_blocks_tabs" CASCADE;
  DROP TABLE "_sub_hubs_v_blocks_health_sections" CASCADE;
  DROP TABLE "_sub_hubs_v_blocks_content_block" CASCADE;
  DROP TABLE "_sub_hubs_v_blocks_cta_links" CASCADE;
  DROP TABLE "_sub_hubs_v_blocks_cta" CASCADE;
  DROP TABLE "_sub_hubs_v_blocks_media_block" CASCADE;
  DROP TABLE "_sub_hubs_v" CASCADE;
  DROP TABLE "_sub_hubs_v_rels" CASCADE;
  ALTER TABLE "food_rels" DROP CONSTRAINT "food_rels_sub_hubs_fk";
  
  ALTER TABLE "_food_v_rels" DROP CONSTRAINT "_food_v_rels_sub_hubs_fk";
  
  ALTER TABLE "sects" DROP CONSTRAINT "sects_parent_id_fk";
  
  ALTER TABLE "health_rels" DROP CONSTRAINT "health_rels_sub_hubs_fk";
  
  ALTER TABLE "_sects_v" DROP CONSTRAINT "_sects_v_parent_id_fk";
  
  ALTER TABLE "_health_v_rels" DROP CONSTRAINT "_health_v_rels_sub_hubs_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_sub_hubs_fk";
  
  DROP INDEX "food_rels_sub_hubs_id_idx";
  DROP INDEX "_food_v_rels_sub_hubs_id_idx";
  DROP INDEX "health_rels_sub_hubs_id_idx";
  DROP INDEX "_health_v_rels_sub_hubs_id_idx";
  DROP INDEX "payload_locked_documents_rels_sub_hubs_id_idx";
  ALTER TABLE "health_rels" ADD COLUMN "categories_id" integer;
  ALTER TABLE "_health_v_rels" ADD COLUMN "categories_id" integer;
  ALTER TABLE "sects" ADD CONSTRAINT "sects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."health_blocks_health_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "health_rels" ADD CONSTRAINT "health_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sects_v" ADD CONSTRAINT "_sects_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_health_v_blocks_health_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_health_v_rels" ADD CONSTRAINT "_health_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "health_rels_categories_id_idx" ON "health_rels" USING btree ("categories_id");
  CREATE INDEX "_health_v_rels_categories_id_idx" ON "_health_v_rels" USING btree ("categories_id");
  ALTER TABLE "food_rels" DROP COLUMN "sub_hubs_id";
  ALTER TABLE "_food_v_rels" DROP COLUMN "sub_hubs_id";
  ALTER TABLE "health_rels" DROP COLUMN "sub_hubs_id";
  ALTER TABLE "_health_v_rels" DROP COLUMN "sub_hubs_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "sub_hubs_id";
  DROP TYPE "public"."enum_sub_hubs_blocks_single_page_hero_orientation";
  DROP TYPE "public"."enum_sub_hubs_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_sub_hubs_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_sub_hubs_collection";
  DROP TYPE "public"."enum_sub_hubs_status";
  DROP TYPE "public"."enum__sub_hubs_v_blocks_single_page_hero_orientation";
  DROP TYPE "public"."enum__sub_hubs_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__sub_hubs_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__sub_hubs_v_version_collection";
  DROP TYPE "public"."enum__sub_hubs_v_version_status";`)
}
