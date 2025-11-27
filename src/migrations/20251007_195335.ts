import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_how_to_blocks_how_to_sections_resources_link_type" AS ENUM('url', 'file');
  CREATE TYPE "public"."enum_how_to_blocks_how_to_sections_steps_tooltip_variant" AS ENUM('proTip', 'important');
  CREATE TYPE "public"."enum_how_to_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__how_to_v_blocks_how_to_sections_resources_link_type" AS ENUM('url', 'file');
  CREATE TYPE "public"."enum__how_to_v_blocks_how_to_sections_steps_tooltip_variant" AS ENUM('proTip', 'important');
  CREATE TYPE "public"."enum__how_to_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "how_to_blocks_how_to_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"heading" varchar,
  	"paragraph" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "how_to_blocks_how_to_sections_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"link_type" "enum_how_to_blocks_how_to_sections_resources_link_type" DEFAULT 'url',
  	"url" varchar,
  	"file_id" integer
  );
  
  CREATE TABLE "how_to_blocks_how_to_sections_steps_content_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"paragraph" jsonb
  );
  
  CREATE TABLE "how_to_blocks_how_to_sections_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"swap_columns" boolean DEFAULT false,
  	"image_id" integer,
  	"use_content_repeater" boolean DEFAULT false,
  	"rich_text" jsonb,
  	"tooltip_enabled" boolean DEFAULT false,
  	"tooltip_variant" "enum_how_to_blocks_how_to_sections_steps_tooltip_variant" DEFAULT 'proTip',
  	"tooltip_text" jsonb
  );
  
  CREATE TABLE "how_to_blocks_how_to_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "how_to_blocks_how_to_information" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'For more information',
  	"list" jsonb,
  	"disclosure" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "how_to" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'How to',
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_how_to_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_how_to_v_blocks_how_to_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"heading" varchar,
  	"paragraph" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_how_to_v_blocks_how_to_sections_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"link_type" "enum__how_to_v_blocks_how_to_sections_resources_link_type" DEFAULT 'url',
  	"url" varchar,
  	"file_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_how_to_v_blocks_how_to_sections_steps_content_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"paragraph" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_how_to_v_blocks_how_to_sections_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"swap_columns" boolean DEFAULT false,
  	"image_id" integer,
  	"use_content_repeater" boolean DEFAULT false,
  	"rich_text" jsonb,
  	"tooltip_enabled" boolean DEFAULT false,
  	"tooltip_variant" "enum__how_to_v_blocks_how_to_sections_steps_tooltip_variant" DEFAULT 'proTip',
  	"tooltip_text" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_how_to_v_blocks_how_to_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_how_to_v_blocks_how_to_information" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'For more information',
  	"list" jsonb,
  	"disclosure" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_how_to_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar DEFAULT 'How to',
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__how_to_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "how_to_id" integer;
  ALTER TABLE "how_to_blocks_how_to_hero" ADD CONSTRAINT "how_to_blocks_how_to_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "how_to_blocks_how_to_hero" ADD CONSTRAINT "how_to_blocks_how_to_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."how_to"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "how_to_blocks_how_to_sections_resources" ADD CONSTRAINT "how_to_blocks_how_to_sections_resources_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "how_to_blocks_how_to_sections_resources" ADD CONSTRAINT "how_to_blocks_how_to_sections_resources_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "how_to_blocks_how_to_sections_resources" ADD CONSTRAINT "how_to_blocks_how_to_sections_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."how_to_blocks_how_to_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "how_to_blocks_how_to_sections_steps_content_rows" ADD CONSTRAINT "how_to_blocks_how_to_sections_steps_content_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."how_to_blocks_how_to_sections_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "how_to_blocks_how_to_sections_steps" ADD CONSTRAINT "how_to_blocks_how_to_sections_steps_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "how_to_blocks_how_to_sections_steps" ADD CONSTRAINT "how_to_blocks_how_to_sections_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."how_to_blocks_how_to_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "how_to_blocks_how_to_sections" ADD CONSTRAINT "how_to_blocks_how_to_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."how_to"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "how_to_blocks_how_to_information" ADD CONSTRAINT "how_to_blocks_how_to_information_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."how_to"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_how_to_v_blocks_how_to_hero" ADD CONSTRAINT "_how_to_v_blocks_how_to_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_how_to_v_blocks_how_to_hero" ADD CONSTRAINT "_how_to_v_blocks_how_to_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_how_to_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_how_to_v_blocks_how_to_sections_resources" ADD CONSTRAINT "_how_to_v_blocks_how_to_sections_resources_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_how_to_v_blocks_how_to_sections_resources" ADD CONSTRAINT "_how_to_v_blocks_how_to_sections_resources_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_how_to_v_blocks_how_to_sections_resources" ADD CONSTRAINT "_how_to_v_blocks_how_to_sections_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_how_to_v_blocks_how_to_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_how_to_v_blocks_how_to_sections_steps_content_rows" ADD CONSTRAINT "_how_to_v_blocks_how_to_sections_steps_content_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_how_to_v_blocks_how_to_sections_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_how_to_v_blocks_how_to_sections_steps" ADD CONSTRAINT "_how_to_v_blocks_how_to_sections_steps_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_how_to_v_blocks_how_to_sections_steps" ADD CONSTRAINT "_how_to_v_blocks_how_to_sections_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_how_to_v_blocks_how_to_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_how_to_v_blocks_how_to_sections" ADD CONSTRAINT "_how_to_v_blocks_how_to_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_how_to_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_how_to_v_blocks_how_to_information" ADD CONSTRAINT "_how_to_v_blocks_how_to_information_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_how_to_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_how_to_v" ADD CONSTRAINT "_how_to_v_parent_id_how_to_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."how_to"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "how_to_blocks_how_to_hero_order_idx" ON "how_to_blocks_how_to_hero" USING btree ("_order");
  CREATE INDEX "how_to_blocks_how_to_hero_parent_id_idx" ON "how_to_blocks_how_to_hero" USING btree ("_parent_id");
  CREATE INDEX "how_to_blocks_how_to_hero_path_idx" ON "how_to_blocks_how_to_hero" USING btree ("_path");
  CREATE INDEX "how_to_blocks_how_to_hero_image_idx" ON "how_to_blocks_how_to_hero" USING btree ("image_id");
  CREATE INDEX "how_to_blocks_how_to_sections_resources_order_idx" ON "how_to_blocks_how_to_sections_resources" USING btree ("_order");
  CREATE INDEX "how_to_blocks_how_to_sections_resources_parent_id_idx" ON "how_to_blocks_how_to_sections_resources" USING btree ("_parent_id");
  CREATE INDEX "how_to_blocks_how_to_sections_resources_image_idx" ON "how_to_blocks_how_to_sections_resources" USING btree ("image_id");
  CREATE INDEX "how_to_blocks_how_to_sections_resources_file_idx" ON "how_to_blocks_how_to_sections_resources" USING btree ("file_id");
  CREATE INDEX "how_to_blocks_how_to_sections_steps_content_rows_order_idx" ON "how_to_blocks_how_to_sections_steps_content_rows" USING btree ("_order");
  CREATE INDEX "how_to_blocks_how_to_sections_steps_content_rows_parent_id_idx" ON "how_to_blocks_how_to_sections_steps_content_rows" USING btree ("_parent_id");
  CREATE INDEX "how_to_blocks_how_to_sections_steps_order_idx" ON "how_to_blocks_how_to_sections_steps" USING btree ("_order");
  CREATE INDEX "how_to_blocks_how_to_sections_steps_parent_id_idx" ON "how_to_blocks_how_to_sections_steps" USING btree ("_parent_id");
  CREATE INDEX "how_to_blocks_how_to_sections_steps_image_idx" ON "how_to_blocks_how_to_sections_steps" USING btree ("image_id");
  CREATE INDEX "how_to_blocks_how_to_sections_order_idx" ON "how_to_blocks_how_to_sections" USING btree ("_order");
  CREATE INDEX "how_to_blocks_how_to_sections_parent_id_idx" ON "how_to_blocks_how_to_sections" USING btree ("_parent_id");
  CREATE INDEX "how_to_blocks_how_to_sections_path_idx" ON "how_to_blocks_how_to_sections" USING btree ("_path");
  CREATE INDEX "how_to_blocks_how_to_information_order_idx" ON "how_to_blocks_how_to_information" USING btree ("_order");
  CREATE INDEX "how_to_blocks_how_to_information_parent_id_idx" ON "how_to_blocks_how_to_information" USING btree ("_parent_id");
  CREATE INDEX "how_to_blocks_how_to_information_path_idx" ON "how_to_blocks_how_to_information" USING btree ("_path");
  CREATE INDEX "how_to_slug_idx" ON "how_to" USING btree ("slug");
  CREATE INDEX "how_to_updated_at_idx" ON "how_to" USING btree ("updated_at");
  CREATE INDEX "how_to_created_at_idx" ON "how_to" USING btree ("created_at");
  CREATE INDEX "how_to__status_idx" ON "how_to" USING btree ("_status");
  CREATE INDEX "_how_to_v_blocks_how_to_hero_order_idx" ON "_how_to_v_blocks_how_to_hero" USING btree ("_order");
  CREATE INDEX "_how_to_v_blocks_how_to_hero_parent_id_idx" ON "_how_to_v_blocks_how_to_hero" USING btree ("_parent_id");
  CREATE INDEX "_how_to_v_blocks_how_to_hero_path_idx" ON "_how_to_v_blocks_how_to_hero" USING btree ("_path");
  CREATE INDEX "_how_to_v_blocks_how_to_hero_image_idx" ON "_how_to_v_blocks_how_to_hero" USING btree ("image_id");
  CREATE INDEX "_how_to_v_blocks_how_to_sections_resources_order_idx" ON "_how_to_v_blocks_how_to_sections_resources" USING btree ("_order");
  CREATE INDEX "_how_to_v_blocks_how_to_sections_resources_parent_id_idx" ON "_how_to_v_blocks_how_to_sections_resources" USING btree ("_parent_id");
  CREATE INDEX "_how_to_v_blocks_how_to_sections_resources_image_idx" ON "_how_to_v_blocks_how_to_sections_resources" USING btree ("image_id");
  CREATE INDEX "_how_to_v_blocks_how_to_sections_resources_file_idx" ON "_how_to_v_blocks_how_to_sections_resources" USING btree ("file_id");
  CREATE INDEX "_how_to_v_blocks_how_to_sections_steps_content_rows_order_idx" ON "_how_to_v_blocks_how_to_sections_steps_content_rows" USING btree ("_order");
  CREATE INDEX "_how_to_v_blocks_how_to_sections_steps_content_rows_parent_id_idx" ON "_how_to_v_blocks_how_to_sections_steps_content_rows" USING btree ("_parent_id");
  CREATE INDEX "_how_to_v_blocks_how_to_sections_steps_order_idx" ON "_how_to_v_blocks_how_to_sections_steps" USING btree ("_order");
  CREATE INDEX "_how_to_v_blocks_how_to_sections_steps_parent_id_idx" ON "_how_to_v_blocks_how_to_sections_steps" USING btree ("_parent_id");
  CREATE INDEX "_how_to_v_blocks_how_to_sections_steps_image_idx" ON "_how_to_v_blocks_how_to_sections_steps" USING btree ("image_id");
  CREATE INDEX "_how_to_v_blocks_how_to_sections_order_idx" ON "_how_to_v_blocks_how_to_sections" USING btree ("_order");
  CREATE INDEX "_how_to_v_blocks_how_to_sections_parent_id_idx" ON "_how_to_v_blocks_how_to_sections" USING btree ("_parent_id");
  CREATE INDEX "_how_to_v_blocks_how_to_sections_path_idx" ON "_how_to_v_blocks_how_to_sections" USING btree ("_path");
  CREATE INDEX "_how_to_v_blocks_how_to_information_order_idx" ON "_how_to_v_blocks_how_to_information" USING btree ("_order");
  CREATE INDEX "_how_to_v_blocks_how_to_information_parent_id_idx" ON "_how_to_v_blocks_how_to_information" USING btree ("_parent_id");
  CREATE INDEX "_how_to_v_blocks_how_to_information_path_idx" ON "_how_to_v_blocks_how_to_information" USING btree ("_path");
  CREATE INDEX "_how_to_v_parent_idx" ON "_how_to_v" USING btree ("parent_id");
  CREATE INDEX "_how_to_v_version_version_slug_idx" ON "_how_to_v" USING btree ("version_slug");
  CREATE INDEX "_how_to_v_version_version_updated_at_idx" ON "_how_to_v" USING btree ("version_updated_at");
  CREATE INDEX "_how_to_v_version_version_created_at_idx" ON "_how_to_v" USING btree ("version_created_at");
  CREATE INDEX "_how_to_v_version_version__status_idx" ON "_how_to_v" USING btree ("version__status");
  CREATE INDEX "_how_to_v_created_at_idx" ON "_how_to_v" USING btree ("created_at");
  CREATE INDEX "_how_to_v_updated_at_idx" ON "_how_to_v" USING btree ("updated_at");
  CREATE INDEX "_how_to_v_latest_idx" ON "_how_to_v" USING btree ("latest");
  CREATE INDEX "_how_to_v_autosave_idx" ON "_how_to_v" USING btree ("autosave");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_how_to_fk" FOREIGN KEY ("how_to_id") REFERENCES "public"."how_to"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_how_to_id_idx" ON "payload_locked_documents_rels" USING btree ("how_to_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "how_to_blocks_how_to_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "how_to_blocks_how_to_sections_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "how_to_blocks_how_to_sections_steps_content_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "how_to_blocks_how_to_sections_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "how_to_blocks_how_to_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "how_to_blocks_how_to_information" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "how_to" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_how_to_v_blocks_how_to_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_how_to_v_blocks_how_to_sections_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_how_to_v_blocks_how_to_sections_steps_content_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_how_to_v_blocks_how_to_sections_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_how_to_v_blocks_how_to_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_how_to_v_blocks_how_to_information" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_how_to_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "how_to_blocks_how_to_hero" CASCADE;
  DROP TABLE "how_to_blocks_how_to_sections_resources" CASCADE;
  DROP TABLE "how_to_blocks_how_to_sections_steps_content_rows" CASCADE;
  DROP TABLE "how_to_blocks_how_to_sections_steps" CASCADE;
  DROP TABLE "how_to_blocks_how_to_sections" CASCADE;
  DROP TABLE "how_to_blocks_how_to_information" CASCADE;
  DROP TABLE "how_to" CASCADE;
  DROP TABLE "_how_to_v_blocks_how_to_hero" CASCADE;
  DROP TABLE "_how_to_v_blocks_how_to_sections_resources" CASCADE;
  DROP TABLE "_how_to_v_blocks_how_to_sections_steps_content_rows" CASCADE;
  DROP TABLE "_how_to_v_blocks_how_to_sections_steps" CASCADE;
  DROP TABLE "_how_to_v_blocks_how_to_sections" CASCADE;
  DROP TABLE "_how_to_v_blocks_how_to_information" CASCADE;
  DROP TABLE "_how_to_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_how_to_fk";
  
  DROP INDEX "payload_locked_documents_rels_how_to_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "how_to_id";
  DROP TYPE "public"."enum_how_to_blocks_how_to_sections_resources_link_type";
  DROP TYPE "public"."enum_how_to_blocks_how_to_sections_steps_tooltip_variant";
  DROP TYPE "public"."enum_how_to_status";
  DROP TYPE "public"."enum__how_to_v_blocks_how_to_sections_resources_link_type";
  DROP TYPE "public"."enum__how_to_v_blocks_how_to_sections_steps_tooltip_variant";
  DROP TYPE "public"."enum__how_to_v_version_status";`)
}
