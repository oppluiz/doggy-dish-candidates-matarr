import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_hubs_blocks_single_page_hero_container_size" AS ENUM('container', 'container-small');
  CREATE TYPE "public"."enum_hubs_blocks_single_page_hero_orientation" AS ENUM('horizontal', 'vertical');
  CREATE TYPE "public"."enum_hubs_blocks_tabs_container_size" AS ENUM('container', 'container-small');
  CREATE TYPE "public"."enum_hubs_blocks_tabs_tabs_gap" AS ENUM('default', 'small');
  CREATE TYPE "public"."enum_hubs_blocks_tabs_tabs_padding" AS ENUM('default', 'small');
  CREATE TYPE "public"."enum_hubs_blocks_content_block_container_size" AS ENUM('container', 'container-small');
  CREATE TYPE "public"."enum_hubs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__hubs_v_blocks_single_page_hero_container_size" AS ENUM('container', 'container-small');
  CREATE TYPE "public"."enum__hubs_v_blocks_single_page_hero_orientation" AS ENUM('horizontal', 'vertical');
  CREATE TYPE "public"."enum__hubs_v_blocks_tabs_container_size" AS ENUM('container', 'container-small');
  CREATE TYPE "public"."enum__hubs_v_blocks_tabs_tabs_gap" AS ENUM('default', 'small');
  CREATE TYPE "public"."enum__hubs_v_blocks_tabs_tabs_padding" AS ENUM('default', 'small');
  CREATE TYPE "public"."enum__hubs_v_blocks_content_block_container_size" AS ENUM('container', 'container-small');
  CREATE TYPE "public"."enum__hubs_v_version_status" AS ENUM('draft', 'published');
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
  
  CREATE TABLE "hubs_blocks_tabs_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"anchor" varchar
  );
  
  CREATE TABLE "hubs_blocks_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"container_size" "enum_hubs_blocks_tabs_container_size" DEFAULT 'container',
  	"tabs_gap" "enum_hubs_blocks_tabs_tabs_gap" DEFAULT 'default',
  	"tabs_padding" "enum_hubs_blocks_tabs_tabs_padding" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "hubs_blocks_content_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"container_size" "enum_hubs_blocks_content_block_container_size" DEFAULT 'container',
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "hubs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_hubs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "hubs_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"sub_hubs_id" integer,
  	"authors_id" integer
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
  
  CREATE TABLE "_hubs_v_blocks_tabs_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_hubs_v_blocks_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"container_size" "enum__hubs_v_blocks_tabs_container_size" DEFAULT 'container',
  	"tabs_gap" "enum__hubs_v_blocks_tabs_tabs_gap" DEFAULT 'default',
  	"tabs_padding" "enum__hubs_v_blocks_tabs_tabs_padding" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_hubs_v_blocks_content_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"container_size" "enum__hubs_v_blocks_content_block_container_size" DEFAULT 'container',
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_hubs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__hubs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_hubs_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"sub_hubs_id" integer,
  	"authors_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "hubs_id" integer;
  ALTER TABLE "hubs_blocks_single_page_hero" ADD CONSTRAINT "hubs_blocks_single_page_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hubs_blocks_single_page_hero" ADD CONSTRAINT "hubs_blocks_single_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hubs_blocks_tabs_tabs" ADD CONSTRAINT "hubs_blocks_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hubs_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hubs_blocks_tabs" ADD CONSTRAINT "hubs_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hubs_blocks_content_block" ADD CONSTRAINT "hubs_blocks_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hubs" ADD CONSTRAINT "hubs_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hubs_rels" ADD CONSTRAINT "hubs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hubs_rels" ADD CONSTRAINT "hubs_rels_sub_hubs_fk" FOREIGN KEY ("sub_hubs_id") REFERENCES "public"."sub_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hubs_rels" ADD CONSTRAINT "hubs_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hubs_v_blocks_single_page_hero" ADD CONSTRAINT "_hubs_v_blocks_single_page_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hubs_v_blocks_single_page_hero" ADD CONSTRAINT "_hubs_v_blocks_single_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hubs_v_blocks_tabs_tabs" ADD CONSTRAINT "_hubs_v_blocks_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hubs_v_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hubs_v_blocks_tabs" ADD CONSTRAINT "_hubs_v_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hubs_v_blocks_content_block" ADD CONSTRAINT "_hubs_v_blocks_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hubs_v" ADD CONSTRAINT "_hubs_v_parent_id_hubs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."hubs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hubs_v" ADD CONSTRAINT "_hubs_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hubs_v_rels" ADD CONSTRAINT "_hubs_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hubs_v_rels" ADD CONSTRAINT "_hubs_v_rels_sub_hubs_fk" FOREIGN KEY ("sub_hubs_id") REFERENCES "public"."sub_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hubs_v_rels" ADD CONSTRAINT "_hubs_v_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "hubs_blocks_single_page_hero_order_idx" ON "hubs_blocks_single_page_hero" USING btree ("_order");
  CREATE INDEX "hubs_blocks_single_page_hero_parent_id_idx" ON "hubs_blocks_single_page_hero" USING btree ("_parent_id");
  CREATE INDEX "hubs_blocks_single_page_hero_path_idx" ON "hubs_blocks_single_page_hero" USING btree ("_path");
  CREATE INDEX "hubs_blocks_single_page_hero_image_idx" ON "hubs_blocks_single_page_hero" USING btree ("image_id");
  CREATE INDEX "hubs_blocks_tabs_tabs_order_idx" ON "hubs_blocks_tabs_tabs" USING btree ("_order");
  CREATE INDEX "hubs_blocks_tabs_tabs_parent_id_idx" ON "hubs_blocks_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "hubs_blocks_tabs_order_idx" ON "hubs_blocks_tabs" USING btree ("_order");
  CREATE INDEX "hubs_blocks_tabs_parent_id_idx" ON "hubs_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX "hubs_blocks_tabs_path_idx" ON "hubs_blocks_tabs" USING btree ("_path");
  CREATE INDEX "hubs_blocks_content_block_order_idx" ON "hubs_blocks_content_block" USING btree ("_order");
  CREATE INDEX "hubs_blocks_content_block_parent_id_idx" ON "hubs_blocks_content_block" USING btree ("_parent_id");
  CREATE INDEX "hubs_blocks_content_block_path_idx" ON "hubs_blocks_content_block" USING btree ("_path");
  CREATE INDEX "hubs_meta_meta_image_idx" ON "hubs" USING btree ("meta_image_id");
  CREATE INDEX "hubs_slug_idx" ON "hubs" USING btree ("slug");
  CREATE INDEX "hubs_updated_at_idx" ON "hubs" USING btree ("updated_at");
  CREATE INDEX "hubs_created_at_idx" ON "hubs" USING btree ("created_at");
  CREATE INDEX "hubs__status_idx" ON "hubs" USING btree ("_status");
  CREATE INDEX "hubs_rels_order_idx" ON "hubs_rels" USING btree ("order");
  CREATE INDEX "hubs_rels_parent_idx" ON "hubs_rels" USING btree ("parent_id");
  CREATE INDEX "hubs_rels_path_idx" ON "hubs_rels" USING btree ("path");
  CREATE INDEX "hubs_rels_sub_hubs_id_idx" ON "hubs_rels" USING btree ("sub_hubs_id");
  CREATE INDEX "hubs_rels_authors_id_idx" ON "hubs_rels" USING btree ("authors_id");
  CREATE INDEX "_hubs_v_blocks_single_page_hero_order_idx" ON "_hubs_v_blocks_single_page_hero" USING btree ("_order");
  CREATE INDEX "_hubs_v_blocks_single_page_hero_parent_id_idx" ON "_hubs_v_blocks_single_page_hero" USING btree ("_parent_id");
  CREATE INDEX "_hubs_v_blocks_single_page_hero_path_idx" ON "_hubs_v_blocks_single_page_hero" USING btree ("_path");
  CREATE INDEX "_hubs_v_blocks_single_page_hero_image_idx" ON "_hubs_v_blocks_single_page_hero" USING btree ("image_id");
  CREATE INDEX "_hubs_v_blocks_tabs_tabs_order_idx" ON "_hubs_v_blocks_tabs_tabs" USING btree ("_order");
  CREATE INDEX "_hubs_v_blocks_tabs_tabs_parent_id_idx" ON "_hubs_v_blocks_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "_hubs_v_blocks_tabs_order_idx" ON "_hubs_v_blocks_tabs" USING btree ("_order");
  CREATE INDEX "_hubs_v_blocks_tabs_parent_id_idx" ON "_hubs_v_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX "_hubs_v_blocks_tabs_path_idx" ON "_hubs_v_blocks_tabs" USING btree ("_path");
  CREATE INDEX "_hubs_v_blocks_content_block_order_idx" ON "_hubs_v_blocks_content_block" USING btree ("_order");
  CREATE INDEX "_hubs_v_blocks_content_block_parent_id_idx" ON "_hubs_v_blocks_content_block" USING btree ("_parent_id");
  CREATE INDEX "_hubs_v_blocks_content_block_path_idx" ON "_hubs_v_blocks_content_block" USING btree ("_path");
  CREATE INDEX "_hubs_v_parent_idx" ON "_hubs_v" USING btree ("parent_id");
  CREATE INDEX "_hubs_v_version_meta_version_meta_image_idx" ON "_hubs_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_hubs_v_version_version_slug_idx" ON "_hubs_v" USING btree ("version_slug");
  CREATE INDEX "_hubs_v_version_version_updated_at_idx" ON "_hubs_v" USING btree ("version_updated_at");
  CREATE INDEX "_hubs_v_version_version_created_at_idx" ON "_hubs_v" USING btree ("version_created_at");
  CREATE INDEX "_hubs_v_version_version__status_idx" ON "_hubs_v" USING btree ("version__status");
  CREATE INDEX "_hubs_v_created_at_idx" ON "_hubs_v" USING btree ("created_at");
  CREATE INDEX "_hubs_v_updated_at_idx" ON "_hubs_v" USING btree ("updated_at");
  CREATE INDEX "_hubs_v_latest_idx" ON "_hubs_v" USING btree ("latest");
  CREATE INDEX "_hubs_v_autosave_idx" ON "_hubs_v" USING btree ("autosave");
  CREATE INDEX "_hubs_v_rels_order_idx" ON "_hubs_v_rels" USING btree ("order");
  CREATE INDEX "_hubs_v_rels_parent_idx" ON "_hubs_v_rels" USING btree ("parent_id");
  CREATE INDEX "_hubs_v_rels_path_idx" ON "_hubs_v_rels" USING btree ("path");
  CREATE INDEX "_hubs_v_rels_sub_hubs_id_idx" ON "_hubs_v_rels" USING btree ("sub_hubs_id");
  CREATE INDEX "_hubs_v_rels_authors_id_idx" ON "_hubs_v_rels" USING btree ("authors_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_hubs_fk" FOREIGN KEY ("hubs_id") REFERENCES "public"."hubs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_hubs_id_idx" ON "payload_locked_documents_rels" USING btree ("hubs_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "hubs_blocks_single_page_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "hubs_blocks_tabs_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "hubs_blocks_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "hubs_blocks_content_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "hubs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "hubs_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_hubs_v_blocks_single_page_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_hubs_v_blocks_tabs_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_hubs_v_blocks_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_hubs_v_blocks_content_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_hubs_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_hubs_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "hubs_blocks_single_page_hero" CASCADE;
  DROP TABLE "hubs_blocks_tabs_tabs" CASCADE;
  DROP TABLE "hubs_blocks_tabs" CASCADE;
  DROP TABLE "hubs_blocks_content_block" CASCADE;
  DROP TABLE "hubs" CASCADE;
  DROP TABLE "hubs_rels" CASCADE;
  DROP TABLE "_hubs_v_blocks_single_page_hero" CASCADE;
  DROP TABLE "_hubs_v_blocks_tabs_tabs" CASCADE;
  DROP TABLE "_hubs_v_blocks_tabs" CASCADE;
  DROP TABLE "_hubs_v_blocks_content_block" CASCADE;
  DROP TABLE "_hubs_v" CASCADE;
  DROP TABLE "_hubs_v_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_hubs_fk";
  
  DROP INDEX "payload_locked_documents_rels_hubs_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "hubs_id";
  DROP TYPE "public"."enum_hubs_blocks_single_page_hero_container_size";
  DROP TYPE "public"."enum_hubs_blocks_single_page_hero_orientation";
  DROP TYPE "public"."enum_hubs_blocks_tabs_container_size";
  DROP TYPE "public"."enum_hubs_blocks_tabs_tabs_gap";
  DROP TYPE "public"."enum_hubs_blocks_tabs_tabs_padding";
  DROP TYPE "public"."enum_hubs_blocks_content_block_container_size";
  DROP TYPE "public"."enum_hubs_status";
  DROP TYPE "public"."enum__hubs_v_blocks_single_page_hero_container_size";
  DROP TYPE "public"."enum__hubs_v_blocks_single_page_hero_orientation";
  DROP TYPE "public"."enum__hubs_v_blocks_tabs_container_size";
  DROP TYPE "public"."enum__hubs_v_blocks_tabs_tabs_gap";
  DROP TYPE "public"."enum__hubs_v_blocks_tabs_tabs_padding";
  DROP TYPE "public"."enum__hubs_v_blocks_content_block_container_size";
  DROP TYPE "public"."enum__hubs_v_version_status";`)
}
