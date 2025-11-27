import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."col_type" AS ENUM('text', 'input');
  CREATE TYPE "public"."in_type" AS ENUM('checkbox', 'text', 'number', 'textarea');
  CREATE TYPE "public"."enum_acc_items_icon" AS ENUM('paw', 'leaf', 'sparkles', 'medkit', 'activity');
  CREATE TYPE "public"."enum_sects_type" AS ENUM('richText', 'accordion', 'table', 'content');
  CREATE TYPE "public"."enum_health_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__acc_items_v_icon" AS ENUM('paw', 'leaf', 'sparkles', 'medkit', 'activity');
  CREATE TYPE "public"."enum__sects_v_type" AS ENUM('richText', 'accordion', 'table', 'content');
  CREATE TYPE "public"."enum__health_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "health_blocks_health_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"author_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "health_blocks_health_tabs_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"anchor" varchar
  );
  
  CREATE TABLE "health_blocks_health_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "cols" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"column_type" "col_type" DEFAULT 'text',
  	"input_type" "in_type" DEFAULT 'checkbox'
  );
  
  CREATE TABLE "cls" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "trows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "crows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"left_heading" varchar,
  	"right_text" jsonb
  );
  
  CREATE TABLE "acc_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"icon" "enum_acc_items_icon",
  	"content" jsonb
  );
  
  CREATE TABLE "sects" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_sects_type" DEFAULT 'richText',
  	"heading" varchar,
  	"anchor" varchar,
  	"table_intro" jsonb,
  	"top_content" jsonb,
  	"enable_important" boolean DEFAULT false,
  	"important_title" varchar DEFAULT 'IMPORTANT',
  	"important_text" jsonb,
  	"bottom_content" jsonb,
  	"content" jsonb,
  	"accordion_intro" jsonb
  );
  
  CREATE TABLE "health_blocks_health_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "health" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Health',
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_health_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_health_v_blocks_health_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"author_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_health_v_blocks_health_tabs_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_health_v_blocks_health_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_cols_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"column_type" "col_type" DEFAULT 'text',
  	"input_type" "in_type" DEFAULT 'checkbox',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_cls_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_trows_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_crows_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"left_heading" varchar,
  	"right_text" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_acc_items_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"icon" "enum__acc_items_v_icon",
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sects_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__sects_v_type" DEFAULT 'richText',
  	"heading" varchar,
  	"anchor" varchar,
  	"table_intro" jsonb,
  	"top_content" jsonb,
  	"enable_important" boolean DEFAULT false,
  	"important_title" varchar DEFAULT 'IMPORTANT',
  	"important_text" jsonb,
  	"bottom_content" jsonb,
  	"content" jsonb,
  	"accordion_intro" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_health_v_blocks_health_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_health_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar DEFAULT 'Health',
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__health_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "health_id" integer;
  ALTER TABLE "health_blocks_health_hero" ADD CONSTRAINT "health_blocks_health_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "health_blocks_health_hero" ADD CONSTRAINT "health_blocks_health_hero_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "health_blocks_health_hero" ADD CONSTRAINT "health_blocks_health_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."health"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "health_blocks_health_tabs_tabs" ADD CONSTRAINT "health_blocks_health_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."health_blocks_health_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "health_blocks_health_tabs" ADD CONSTRAINT "health_blocks_health_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."health"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cols" ADD CONSTRAINT "cols_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cls" ADD CONSTRAINT "cls_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trows" ADD CONSTRAINT "trows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "crows" ADD CONSTRAINT "crows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "acc_items" ADD CONSTRAINT "acc_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sects" ADD CONSTRAINT "sects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."health_blocks_health_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "health_blocks_health_sections" ADD CONSTRAINT "health_blocks_health_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."health"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_health_v_blocks_health_hero" ADD CONSTRAINT "_health_v_blocks_health_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_health_v_blocks_health_hero" ADD CONSTRAINT "_health_v_blocks_health_hero_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_health_v_blocks_health_hero" ADD CONSTRAINT "_health_v_blocks_health_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_health_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_health_v_blocks_health_tabs_tabs" ADD CONSTRAINT "_health_v_blocks_health_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_health_v_blocks_health_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_health_v_blocks_health_tabs" ADD CONSTRAINT "_health_v_blocks_health_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_health_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cols_v" ADD CONSTRAINT "_cols_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cls_v" ADD CONSTRAINT "_cls_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_trows_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_trows_v" ADD CONSTRAINT "_trows_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_crows_v" ADD CONSTRAINT "_crows_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_acc_items_v" ADD CONSTRAINT "_acc_items_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sects_v" ADD CONSTRAINT "_sects_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_health_v_blocks_health_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_health_v_blocks_health_sections" ADD CONSTRAINT "_health_v_blocks_health_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_health_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_health_v" ADD CONSTRAINT "_health_v_parent_id_health_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."health"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "health_blocks_health_hero_order_idx" ON "health_blocks_health_hero" USING btree ("_order");
  CREATE INDEX "health_blocks_health_hero_parent_id_idx" ON "health_blocks_health_hero" USING btree ("_parent_id");
  CREATE INDEX "health_blocks_health_hero_path_idx" ON "health_blocks_health_hero" USING btree ("_path");
  CREATE INDEX "health_blocks_health_hero_image_idx" ON "health_blocks_health_hero" USING btree ("image_id");
  CREATE INDEX "health_blocks_health_hero_author_idx" ON "health_blocks_health_hero" USING btree ("author_id");
  CREATE INDEX "health_blocks_health_tabs_tabs_order_idx" ON "health_blocks_health_tabs_tabs" USING btree ("_order");
  CREATE INDEX "health_blocks_health_tabs_tabs_parent_id_idx" ON "health_blocks_health_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "health_blocks_health_tabs_order_idx" ON "health_blocks_health_tabs" USING btree ("_order");
  CREATE INDEX "health_blocks_health_tabs_parent_id_idx" ON "health_blocks_health_tabs" USING btree ("_parent_id");
  CREATE INDEX "health_blocks_health_tabs_path_idx" ON "health_blocks_health_tabs" USING btree ("_path");
  CREATE INDEX "cols_order_idx" ON "cols" USING btree ("_order");
  CREATE INDEX "cols_parent_id_idx" ON "cols" USING btree ("_parent_id");
  CREATE INDEX "cls_order_idx" ON "cls" USING btree ("_order");
  CREATE INDEX "cls_parent_id_idx" ON "cls" USING btree ("_parent_id");
  CREATE INDEX "trows_order_idx" ON "trows" USING btree ("_order");
  CREATE INDEX "trows_parent_id_idx" ON "trows" USING btree ("_parent_id");
  CREATE INDEX "crows_order_idx" ON "crows" USING btree ("_order");
  CREATE INDEX "crows_parent_id_idx" ON "crows" USING btree ("_parent_id");
  CREATE INDEX "acc_items_order_idx" ON "acc_items" USING btree ("_order");
  CREATE INDEX "acc_items_parent_id_idx" ON "acc_items" USING btree ("_parent_id");
  CREATE INDEX "sects_order_idx" ON "sects" USING btree ("_order");
  CREATE INDEX "sects_parent_id_idx" ON "sects" USING btree ("_parent_id");
  CREATE INDEX "health_blocks_health_sections_order_idx" ON "health_blocks_health_sections" USING btree ("_order");
  CREATE INDEX "health_blocks_health_sections_parent_id_idx" ON "health_blocks_health_sections" USING btree ("_parent_id");
  CREATE INDEX "health_blocks_health_sections_path_idx" ON "health_blocks_health_sections" USING btree ("_path");
  CREATE INDEX "health_slug_idx" ON "health" USING btree ("slug");
  CREATE INDEX "health_updated_at_idx" ON "health" USING btree ("updated_at");
  CREATE INDEX "health_created_at_idx" ON "health" USING btree ("created_at");
  CREATE INDEX "health__status_idx" ON "health" USING btree ("_status");
  CREATE INDEX "_health_v_blocks_health_hero_order_idx" ON "_health_v_blocks_health_hero" USING btree ("_order");
  CREATE INDEX "_health_v_blocks_health_hero_parent_id_idx" ON "_health_v_blocks_health_hero" USING btree ("_parent_id");
  CREATE INDEX "_health_v_blocks_health_hero_path_idx" ON "_health_v_blocks_health_hero" USING btree ("_path");
  CREATE INDEX "_health_v_blocks_health_hero_image_idx" ON "_health_v_blocks_health_hero" USING btree ("image_id");
  CREATE INDEX "_health_v_blocks_health_hero_author_idx" ON "_health_v_blocks_health_hero" USING btree ("author_id");
  CREATE INDEX "_health_v_blocks_health_tabs_tabs_order_idx" ON "_health_v_blocks_health_tabs_tabs" USING btree ("_order");
  CREATE INDEX "_health_v_blocks_health_tabs_tabs_parent_id_idx" ON "_health_v_blocks_health_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "_health_v_blocks_health_tabs_order_idx" ON "_health_v_blocks_health_tabs" USING btree ("_order");
  CREATE INDEX "_health_v_blocks_health_tabs_parent_id_idx" ON "_health_v_blocks_health_tabs" USING btree ("_parent_id");
  CREATE INDEX "_health_v_blocks_health_tabs_path_idx" ON "_health_v_blocks_health_tabs" USING btree ("_path");
  CREATE INDEX "_cols_v_order_idx" ON "_cols_v" USING btree ("_order");
  CREATE INDEX "_cols_v_parent_id_idx" ON "_cols_v" USING btree ("_parent_id");
  CREATE INDEX "_cls_v_order_idx" ON "_cls_v" USING btree ("_order");
  CREATE INDEX "_cls_v_parent_id_idx" ON "_cls_v" USING btree ("_parent_id");
  CREATE INDEX "_trows_v_order_idx" ON "_trows_v" USING btree ("_order");
  CREATE INDEX "_trows_v_parent_id_idx" ON "_trows_v" USING btree ("_parent_id");
  CREATE INDEX "_crows_v_order_idx" ON "_crows_v" USING btree ("_order");
  CREATE INDEX "_crows_v_parent_id_idx" ON "_crows_v" USING btree ("_parent_id");
  CREATE INDEX "_acc_items_v_order_idx" ON "_acc_items_v" USING btree ("_order");
  CREATE INDEX "_acc_items_v_parent_id_idx" ON "_acc_items_v" USING btree ("_parent_id");
  CREATE INDEX "_sects_v_order_idx" ON "_sects_v" USING btree ("_order");
  CREATE INDEX "_sects_v_parent_id_idx" ON "_sects_v" USING btree ("_parent_id");
  CREATE INDEX "_health_v_blocks_health_sections_order_idx" ON "_health_v_blocks_health_sections" USING btree ("_order");
  CREATE INDEX "_health_v_blocks_health_sections_parent_id_idx" ON "_health_v_blocks_health_sections" USING btree ("_parent_id");
  CREATE INDEX "_health_v_blocks_health_sections_path_idx" ON "_health_v_blocks_health_sections" USING btree ("_path");
  CREATE INDEX "_health_v_parent_idx" ON "_health_v" USING btree ("parent_id");
  CREATE INDEX "_health_v_version_version_slug_idx" ON "_health_v" USING btree ("version_slug");
  CREATE INDEX "_health_v_version_version_updated_at_idx" ON "_health_v" USING btree ("version_updated_at");
  CREATE INDEX "_health_v_version_version_created_at_idx" ON "_health_v" USING btree ("version_created_at");
  CREATE INDEX "_health_v_version_version__status_idx" ON "_health_v" USING btree ("version__status");
  CREATE INDEX "_health_v_created_at_idx" ON "_health_v" USING btree ("created_at");
  CREATE INDEX "_health_v_updated_at_idx" ON "_health_v" USING btree ("updated_at");
  CREATE INDEX "_health_v_latest_idx" ON "_health_v" USING btree ("latest");
  CREATE INDEX "_health_v_autosave_idx" ON "_health_v" USING btree ("autosave");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_health_fk" FOREIGN KEY ("health_id") REFERENCES "public"."health"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_health_id_idx" ON "payload_locked_documents_rels" USING btree ("health_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "health_blocks_health_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "health_blocks_health_tabs_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "health_blocks_health_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cols" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cls" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "trows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "crows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "acc_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "health_blocks_health_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "health" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_health_v_blocks_health_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_health_v_blocks_health_tabs_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_health_v_blocks_health_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_cols_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_cls_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_trows_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_crows_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_acc_items_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sects_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_health_v_blocks_health_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_health_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "health_blocks_health_hero" CASCADE;
  DROP TABLE "health_blocks_health_tabs_tabs" CASCADE;
  DROP TABLE "health_blocks_health_tabs" CASCADE;
  DROP TABLE "cols" CASCADE;
  DROP TABLE "cls" CASCADE;
  DROP TABLE "trows" CASCADE;
  DROP TABLE "crows" CASCADE;
  DROP TABLE "acc_items" CASCADE;
  DROP TABLE "sects" CASCADE;
  DROP TABLE "health_blocks_health_sections" CASCADE;
  DROP TABLE "health" CASCADE;
  DROP TABLE "_health_v_blocks_health_hero" CASCADE;
  DROP TABLE "_health_v_blocks_health_tabs_tabs" CASCADE;
  DROP TABLE "_health_v_blocks_health_tabs" CASCADE;
  DROP TABLE "_cols_v" CASCADE;
  DROP TABLE "_cls_v" CASCADE;
  DROP TABLE "_trows_v" CASCADE;
  DROP TABLE "_crows_v" CASCADE;
  DROP TABLE "_acc_items_v" CASCADE;
  DROP TABLE "_sects_v" CASCADE;
  DROP TABLE "_health_v_blocks_health_sections" CASCADE;
  DROP TABLE "_health_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_health_fk";
  
  DROP INDEX "payload_locked_documents_rels_health_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "health_id";
  DROP TYPE "public"."col_type";
  DROP TYPE "public"."in_type";
  DROP TYPE "public"."enum_acc_items_icon";
  DROP TYPE "public"."enum_sects_type";
  DROP TYPE "public"."enum_health_status";
  DROP TYPE "public"."enum__acc_items_v_icon";
  DROP TYPE "public"."enum__sects_v_type";
  DROP TYPE "public"."enum__health_v_version_status";`)
}
