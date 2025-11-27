import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_ingredients_blocks_single_page_hero_orientation" RENAME TO "enum_food_blocks_single_page_hero_orientation";
  ALTER TYPE "public"."enum_ingredients_status" RENAME TO "enum_food_status";
  ALTER TYPE "public"."enum__ingredients_v_blocks_single_page_hero_orientation" RENAME TO "enum__food_v_blocks_single_page_hero_orientation";
  ALTER TYPE "public"."enum__ingredients_v_version_status" RENAME TO "enum__food_v_version_status";
  ALTER TABLE "ingredients_blocks_single_page_hero" RENAME TO "food_blocks_single_page_hero";
  ALTER TABLE "ingredients_blocks_tabs_tabs" RENAME TO "food_blocks_tabs_tabs";
  ALTER TABLE "ingredients_blocks_tabs" RENAME TO "food_blocks_tabs";
  ALTER TABLE "ingredients_blocks_references" RENAME TO "food_blocks_references";
  ALTER TABLE "ingredients_blocks_content_block" RENAME TO "food_blocks_content_block";
  ALTER TABLE "ingredients" RENAME TO "food";
  ALTER TABLE "ingredients_rels" RENAME TO "food_rels";
  ALTER TABLE "_ingredients_v_blocks_single_page_hero" RENAME TO "_food_v_blocks_single_page_hero";
  ALTER TABLE "_ingredients_v_blocks_tabs_tabs" RENAME TO "_food_v_blocks_tabs_tabs";
  ALTER TABLE "_ingredients_v_blocks_tabs" RENAME TO "_food_v_blocks_tabs";
  ALTER TABLE "_ingredients_v_blocks_references" RENAME TO "_food_v_blocks_references";
  ALTER TABLE "_ingredients_v_blocks_content_block" RENAME TO "_food_v_blocks_content_block";
  ALTER TABLE "_ingredients_v" RENAME TO "_food_v";
  ALTER TABLE "_ingredients_v_rels" RENAME TO "_food_v_rels";
  ALTER TABLE "pages_rels" RENAME COLUMN "ingredients_id" TO "food_id";
  ALTER TABLE "_pages_v_rels" RENAME COLUMN "ingredients_id" TO "food_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "ingredients_id" TO "food_id";
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_ingredients_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_ingredients_fk";
  
  ALTER TABLE "food_blocks_single_page_hero" DROP CONSTRAINT "ingredients_blocks_single_page_hero_image_id_media_id_fk";
  
  ALTER TABLE "food_blocks_single_page_hero" DROP CONSTRAINT "ingredients_blocks_single_page_hero_author_id_authors_id_fk";
  
  ALTER TABLE "food_blocks_single_page_hero" DROP CONSTRAINT "ingredients_blocks_single_page_hero_parent_id_fk";
  
  ALTER TABLE "food_blocks_tabs_tabs" DROP CONSTRAINT "ingredients_blocks_tabs_tabs_parent_id_fk";
  
  ALTER TABLE "food_blocks_tabs" DROP CONSTRAINT "ingredients_blocks_tabs_parent_id_fk";
  
  ALTER TABLE "food_blocks_references" DROP CONSTRAINT "ingredients_blocks_references_parent_id_fk";
  
  ALTER TABLE "food_blocks_content_block" DROP CONSTRAINT "ingredients_blocks_content_block_parent_id_fk";
  
  ALTER TABLE "food" DROP CONSTRAINT "ingredients_image_id_media_id_fk";
  
  ALTER TABLE "food_rels" DROP CONSTRAINT "ingredients_rels_parent_fk";
  
  ALTER TABLE "food_rels" DROP CONSTRAINT "ingredients_rels_categories_fk";
  
  ALTER TABLE "_food_v_blocks_single_page_hero" DROP CONSTRAINT "_ingredients_v_blocks_single_page_hero_image_id_media_id_fk";
  
  ALTER TABLE "_food_v_blocks_single_page_hero" DROP CONSTRAINT "_ingredients_v_blocks_single_page_hero_author_id_authors_id_fk";
  
  ALTER TABLE "_food_v_blocks_single_page_hero" DROP CONSTRAINT "_ingredients_v_blocks_single_page_hero_parent_id_fk";
  
  ALTER TABLE "_food_v_blocks_tabs_tabs" DROP CONSTRAINT "_ingredients_v_blocks_tabs_tabs_parent_id_fk";
  
  ALTER TABLE "_food_v_blocks_tabs" DROP CONSTRAINT "_ingredients_v_blocks_tabs_parent_id_fk";
  
  ALTER TABLE "_food_v_blocks_references" DROP CONSTRAINT "_ingredients_v_blocks_references_parent_id_fk";
  
  ALTER TABLE "_food_v_blocks_content_block" DROP CONSTRAINT "_ingredients_v_blocks_content_block_parent_id_fk";
  
  ALTER TABLE "_food_v" DROP CONSTRAINT "_ingredients_v_parent_id_ingredients_id_fk";
  
  ALTER TABLE "_food_v" DROP CONSTRAINT "_ingredients_v_version_image_id_media_id_fk";
  
  ALTER TABLE "_food_v_rels" DROP CONSTRAINT "_ingredients_v_rels_parent_fk";
  
  ALTER TABLE "_food_v_rels" DROP CONSTRAINT "_ingredients_v_rels_categories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_ingredients_fk";
  
  DROP INDEX "pages_rels_ingredients_id_idx";
  DROP INDEX "_pages_v_rels_ingredients_id_idx";
  DROP INDEX "ingredients_blocks_single_page_hero_order_idx";
  DROP INDEX "ingredients_blocks_single_page_hero_parent_id_idx";
  DROP INDEX "ingredients_blocks_single_page_hero_path_idx";
  DROP INDEX "ingredients_blocks_single_page_hero_image_idx";
  DROP INDEX "ingredients_blocks_single_page_hero_author_idx";
  DROP INDEX "ingredients_blocks_tabs_tabs_order_idx";
  DROP INDEX "ingredients_blocks_tabs_tabs_parent_id_idx";
  DROP INDEX "ingredients_blocks_tabs_order_idx";
  DROP INDEX "ingredients_blocks_tabs_parent_id_idx";
  DROP INDEX "ingredients_blocks_tabs_path_idx";
  DROP INDEX "ingredients_blocks_references_order_idx";
  DROP INDEX "ingredients_blocks_references_parent_id_idx";
  DROP INDEX "ingredients_blocks_references_path_idx";
  DROP INDEX "ingredients_blocks_content_block_order_idx";
  DROP INDEX "ingredients_blocks_content_block_parent_id_idx";
  DROP INDEX "ingredients_blocks_content_block_path_idx";
  DROP INDEX "ingredients_image_idx";
  DROP INDEX "ingredients_slug_idx";
  DROP INDEX "ingredients_updated_at_idx";
  DROP INDEX "ingredients_created_at_idx";
  DROP INDEX "ingredients__status_idx";
  DROP INDEX "ingredients_rels_order_idx";
  DROP INDEX "ingredients_rels_parent_idx";
  DROP INDEX "ingredients_rels_path_idx";
  DROP INDEX "ingredients_rels_categories_id_idx";
  DROP INDEX "_ingredients_v_blocks_single_page_hero_order_idx";
  DROP INDEX "_ingredients_v_blocks_single_page_hero_parent_id_idx";
  DROP INDEX "_ingredients_v_blocks_single_page_hero_path_idx";
  DROP INDEX "_ingredients_v_blocks_single_page_hero_image_idx";
  DROP INDEX "_ingredients_v_blocks_single_page_hero_author_idx";
  DROP INDEX "_ingredients_v_blocks_tabs_tabs_order_idx";
  DROP INDEX "_ingredients_v_blocks_tabs_tabs_parent_id_idx";
  DROP INDEX "_ingredients_v_blocks_tabs_order_idx";
  DROP INDEX "_ingredients_v_blocks_tabs_parent_id_idx";
  DROP INDEX "_ingredients_v_blocks_tabs_path_idx";
  DROP INDEX "_ingredients_v_blocks_references_order_idx";
  DROP INDEX "_ingredients_v_blocks_references_parent_id_idx";
  DROP INDEX "_ingredients_v_blocks_references_path_idx";
  DROP INDEX "_ingredients_v_blocks_content_block_order_idx";
  DROP INDEX "_ingredients_v_blocks_content_block_parent_id_idx";
  DROP INDEX "_ingredients_v_blocks_content_block_path_idx";
  DROP INDEX "_ingredients_v_parent_idx";
  DROP INDEX "_ingredients_v_version_version_image_idx";
  DROP INDEX "_ingredients_v_version_version_slug_idx";
  DROP INDEX "_ingredients_v_version_version_updated_at_idx";
  DROP INDEX "_ingredients_v_version_version_created_at_idx";
  DROP INDEX "_ingredients_v_version_version__status_idx";
  DROP INDEX "_ingredients_v_created_at_idx";
  DROP INDEX "_ingredients_v_updated_at_idx";
  DROP INDEX "_ingredients_v_latest_idx";
  DROP INDEX "_ingredients_v_autosave_idx";
  DROP INDEX "_ingredients_v_rels_order_idx";
  DROP INDEX "_ingredients_v_rels_parent_idx";
  DROP INDEX "_ingredients_v_rels_path_idx";
  DROP INDEX "_ingredients_v_rels_categories_id_idx";
  DROP INDEX "payload_locked_documents_rels_ingredients_id_idx";
  ALTER TABLE "pages_blocks_featured" ALTER COLUMN "heading" SET DEFAULT 'Featured This Week';
  ALTER TABLE "_pages_v_blocks_featured" ALTER COLUMN "heading" SET DEFAULT 'Featured This Week';
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_food_fk" FOREIGN KEY ("food_id") REFERENCES "public"."food"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_food_fk" FOREIGN KEY ("food_id") REFERENCES "public"."food"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "food_blocks_single_page_hero" ADD CONSTRAINT "food_blocks_single_page_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "food_blocks_single_page_hero" ADD CONSTRAINT "food_blocks_single_page_hero_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "food_blocks_single_page_hero" ADD CONSTRAINT "food_blocks_single_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."food"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "food_blocks_tabs_tabs" ADD CONSTRAINT "food_blocks_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."food_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "food_blocks_tabs" ADD CONSTRAINT "food_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."food"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "food_blocks_references" ADD CONSTRAINT "food_blocks_references_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."food"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "food_blocks_content_block" ADD CONSTRAINT "food_blocks_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."food"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "food" ADD CONSTRAINT "food_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "food_rels" ADD CONSTRAINT "food_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."food"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "food_rels" ADD CONSTRAINT "food_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_food_v_blocks_single_page_hero" ADD CONSTRAINT "_food_v_blocks_single_page_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_food_v_blocks_single_page_hero" ADD CONSTRAINT "_food_v_blocks_single_page_hero_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_food_v_blocks_single_page_hero" ADD CONSTRAINT "_food_v_blocks_single_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_food_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_food_v_blocks_tabs_tabs" ADD CONSTRAINT "_food_v_blocks_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_food_v_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_food_v_blocks_tabs" ADD CONSTRAINT "_food_v_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_food_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_food_v_blocks_references" ADD CONSTRAINT "_food_v_blocks_references_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_food_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_food_v_blocks_content_block" ADD CONSTRAINT "_food_v_blocks_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_food_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_food_v" ADD CONSTRAINT "_food_v_parent_id_food_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."food"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_food_v" ADD CONSTRAINT "_food_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_food_v_rels" ADD CONSTRAINT "_food_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_food_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_food_v_rels" ADD CONSTRAINT "_food_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_food_fk" FOREIGN KEY ("food_id") REFERENCES "public"."food"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_food_id_idx" ON "pages_rels" USING btree ("food_id");
  CREATE INDEX "_pages_v_rels_food_id_idx" ON "_pages_v_rels" USING btree ("food_id");
  CREATE INDEX "food_blocks_single_page_hero_order_idx" ON "food_blocks_single_page_hero" USING btree ("_order");
  CREATE INDEX "food_blocks_single_page_hero_parent_id_idx" ON "food_blocks_single_page_hero" USING btree ("_parent_id");
  CREATE INDEX "food_blocks_single_page_hero_path_idx" ON "food_blocks_single_page_hero" USING btree ("_path");
  CREATE INDEX "food_blocks_single_page_hero_image_idx" ON "food_blocks_single_page_hero" USING btree ("image_id");
  CREATE INDEX "food_blocks_single_page_hero_author_idx" ON "food_blocks_single_page_hero" USING btree ("author_id");
  CREATE INDEX "food_blocks_tabs_tabs_order_idx" ON "food_blocks_tabs_tabs" USING btree ("_order");
  CREATE INDEX "food_blocks_tabs_tabs_parent_id_idx" ON "food_blocks_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "food_blocks_tabs_order_idx" ON "food_blocks_tabs" USING btree ("_order");
  CREATE INDEX "food_blocks_tabs_parent_id_idx" ON "food_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX "food_blocks_tabs_path_idx" ON "food_blocks_tabs" USING btree ("_path");
  CREATE INDEX "food_blocks_references_order_idx" ON "food_blocks_references" USING btree ("_order");
  CREATE INDEX "food_blocks_references_parent_id_idx" ON "food_blocks_references" USING btree ("_parent_id");
  CREATE INDEX "food_blocks_references_path_idx" ON "food_blocks_references" USING btree ("_path");
  CREATE INDEX "food_blocks_content_block_order_idx" ON "food_blocks_content_block" USING btree ("_order");
  CREATE INDEX "food_blocks_content_block_parent_id_idx" ON "food_blocks_content_block" USING btree ("_parent_id");
  CREATE INDEX "food_blocks_content_block_path_idx" ON "food_blocks_content_block" USING btree ("_path");
  CREATE INDEX "food_image_idx" ON "food" USING btree ("image_id");
  CREATE INDEX "food_slug_idx" ON "food" USING btree ("slug");
  CREATE INDEX "food_updated_at_idx" ON "food" USING btree ("updated_at");
  CREATE INDEX "food_created_at_idx" ON "food" USING btree ("created_at");
  CREATE INDEX "food__status_idx" ON "food" USING btree ("_status");
  CREATE INDEX "food_rels_order_idx" ON "food_rels" USING btree ("order");
  CREATE INDEX "food_rels_parent_idx" ON "food_rels" USING btree ("parent_id");
  CREATE INDEX "food_rels_path_idx" ON "food_rels" USING btree ("path");
  CREATE INDEX "food_rels_categories_id_idx" ON "food_rels" USING btree ("categories_id");
  CREATE INDEX "_food_v_blocks_single_page_hero_order_idx" ON "_food_v_blocks_single_page_hero" USING btree ("_order");
  CREATE INDEX "_food_v_blocks_single_page_hero_parent_id_idx" ON "_food_v_blocks_single_page_hero" USING btree ("_parent_id");
  CREATE INDEX "_food_v_blocks_single_page_hero_path_idx" ON "_food_v_blocks_single_page_hero" USING btree ("_path");
  CREATE INDEX "_food_v_blocks_single_page_hero_image_idx" ON "_food_v_blocks_single_page_hero" USING btree ("image_id");
  CREATE INDEX "_food_v_blocks_single_page_hero_author_idx" ON "_food_v_blocks_single_page_hero" USING btree ("author_id");
  CREATE INDEX "_food_v_blocks_tabs_tabs_order_idx" ON "_food_v_blocks_tabs_tabs" USING btree ("_order");
  CREATE INDEX "_food_v_blocks_tabs_tabs_parent_id_idx" ON "_food_v_blocks_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "_food_v_blocks_tabs_order_idx" ON "_food_v_blocks_tabs" USING btree ("_order");
  CREATE INDEX "_food_v_blocks_tabs_parent_id_idx" ON "_food_v_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX "_food_v_blocks_tabs_path_idx" ON "_food_v_blocks_tabs" USING btree ("_path");
  CREATE INDEX "_food_v_blocks_references_order_idx" ON "_food_v_blocks_references" USING btree ("_order");
  CREATE INDEX "_food_v_blocks_references_parent_id_idx" ON "_food_v_blocks_references" USING btree ("_parent_id");
  CREATE INDEX "_food_v_blocks_references_path_idx" ON "_food_v_blocks_references" USING btree ("_path");
  CREATE INDEX "_food_v_blocks_content_block_order_idx" ON "_food_v_blocks_content_block" USING btree ("_order");
  CREATE INDEX "_food_v_blocks_content_block_parent_id_idx" ON "_food_v_blocks_content_block" USING btree ("_parent_id");
  CREATE INDEX "_food_v_blocks_content_block_path_idx" ON "_food_v_blocks_content_block" USING btree ("_path");
  CREATE INDEX "_food_v_parent_idx" ON "_food_v" USING btree ("parent_id");
  CREATE INDEX "_food_v_version_version_image_idx" ON "_food_v" USING btree ("version_image_id");
  CREATE INDEX "_food_v_version_version_slug_idx" ON "_food_v" USING btree ("version_slug");
  CREATE INDEX "_food_v_version_version_updated_at_idx" ON "_food_v" USING btree ("version_updated_at");
  CREATE INDEX "_food_v_version_version_created_at_idx" ON "_food_v" USING btree ("version_created_at");
  CREATE INDEX "_food_v_version_version__status_idx" ON "_food_v" USING btree ("version__status");
  CREATE INDEX "_food_v_created_at_idx" ON "_food_v" USING btree ("created_at");
  CREATE INDEX "_food_v_updated_at_idx" ON "_food_v" USING btree ("updated_at");
  CREATE INDEX "_food_v_latest_idx" ON "_food_v" USING btree ("latest");
  CREATE INDEX "_food_v_autosave_idx" ON "_food_v" USING btree ("autosave");
  CREATE INDEX "_food_v_rels_order_idx" ON "_food_v_rels" USING btree ("order");
  CREATE INDEX "_food_v_rels_parent_idx" ON "_food_v_rels" USING btree ("parent_id");
  CREATE INDEX "_food_v_rels_path_idx" ON "_food_v_rels" USING btree ("path");
  CREATE INDEX "_food_v_rels_categories_id_idx" ON "_food_v_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_food_id_idx" ON "payload_locked_documents_rels" USING btree ("food_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_food_blocks_single_page_hero_orientation" RENAME TO "enum_ingredients_blocks_single_page_hero_orientation";
  ALTER TYPE "public"."enum_food_status" RENAME TO "enum_ingredients_status";
  ALTER TYPE "public"."enum__food_v_blocks_single_page_hero_orientation" RENAME TO "enum__ingredients_v_blocks_single_page_hero_orientation";
  ALTER TYPE "public"."enum__food_v_version_status" RENAME TO "enum__ingredients_v_version_status";
  CREATE TABLE "ingredients_blocks_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "ingredients_blocks_references" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'REFERENCES',
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "ingredients_blocks_content_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "ingredients" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"name" varchar,
  	"description" jsonb,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_ingredients_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "ingredients_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "_ingredients_v_blocks_single_page_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"orientation" "enum__ingredients_v_blocks_single_page_hero_orientation" DEFAULT 'horizontal',
  	"image_id" integer,
  	"title" varchar,
  	"enable_author" boolean DEFAULT true,
  	"author_id" integer,
  	"heading" varchar,
  	"paragraph" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_ingredients_v_blocks_tabs_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ingredients_v_blocks_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_ingredients_v_blocks_references" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'REFERENCES',
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_ingredients_v_blocks_content_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_ingredients_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_image_id" integer,
  	"version_name" varchar,
  	"version_description" jsonb,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__ingredients_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_ingredients_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  ALTER TABLE "food_blocks_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "food_blocks_references" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "food_blocks_content_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "food" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "food_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_food_v_blocks_single_page_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_food_v_blocks_tabs_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_food_v_blocks_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_food_v_blocks_references" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_food_v_blocks_content_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_food_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_food_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "food_blocks_tabs" CASCADE;
  DROP TABLE "food_blocks_references" CASCADE;
  DROP TABLE "food_blocks_content_block" CASCADE;
  DROP TABLE "food" CASCADE;
  DROP TABLE "food_rels" CASCADE;
  DROP TABLE "_food_v_blocks_single_page_hero" CASCADE;
  DROP TABLE "_food_v_blocks_tabs_tabs" CASCADE;
  DROP TABLE "_food_v_blocks_tabs" CASCADE;
  DROP TABLE "_food_v_blocks_references" CASCADE;
  DROP TABLE "_food_v_blocks_content_block" CASCADE;
  DROP TABLE "_food_v" CASCADE;
  DROP TABLE "_food_v_rels" CASCADE;
  ALTER TABLE "food_blocks_single_page_hero" RENAME TO "ingredients_blocks_single_page_hero";
  ALTER TABLE "food_blocks_tabs_tabs" RENAME TO "ingredients_blocks_tabs_tabs";
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_food_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_food_fk";
  
  ALTER TABLE "ingredients_blocks_single_page_hero" DROP CONSTRAINT "food_blocks_single_page_hero_image_id_media_id_fk";
  
  ALTER TABLE "ingredients_blocks_single_page_hero" DROP CONSTRAINT "food_blocks_single_page_hero_author_id_authors_id_fk";
  
  ALTER TABLE "ingredients_blocks_single_page_hero" DROP CONSTRAINT "food_blocks_single_page_hero_parent_id_fk";
  
  ALTER TABLE "ingredients_blocks_tabs_tabs" DROP CONSTRAINT "food_blocks_tabs_tabs_parent_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_food_fk";
  
  DROP INDEX "pages_rels_food_id_idx";
  DROP INDEX "_pages_v_rels_food_id_idx";
  DROP INDEX "food_blocks_single_page_hero_order_idx";
  DROP INDEX "food_blocks_single_page_hero_parent_id_idx";
  DROP INDEX "food_blocks_single_page_hero_path_idx";
  DROP INDEX "food_blocks_single_page_hero_image_idx";
  DROP INDEX "food_blocks_single_page_hero_author_idx";
  DROP INDEX "food_blocks_tabs_tabs_order_idx";
  DROP INDEX "food_blocks_tabs_tabs_parent_id_idx";
  DROP INDEX "payload_locked_documents_rels_food_id_idx";
  ALTER TABLE "pages_blocks_featured" ALTER COLUMN "heading" SET DEFAULT 'FEATURED THIS WEEK';
  ALTER TABLE "_pages_v_blocks_featured" ALTER COLUMN "heading" SET DEFAULT 'FEATURED THIS WEEK';
  ALTER TABLE "pages_rels" ADD COLUMN "ingredients_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "ingredients_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "ingredients_id" integer;
  ALTER TABLE "ingredients_blocks_tabs" ADD CONSTRAINT "ingredients_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ingredients_blocks_references" ADD CONSTRAINT "ingredients_blocks_references_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ingredients_blocks_content_block" ADD CONSTRAINT "ingredients_blocks_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ingredients_rels" ADD CONSTRAINT "ingredients_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ingredients_rels" ADD CONSTRAINT "ingredients_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ingredients_v_blocks_single_page_hero" ADD CONSTRAINT "_ingredients_v_blocks_single_page_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ingredients_v_blocks_single_page_hero" ADD CONSTRAINT "_ingredients_v_blocks_single_page_hero_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ingredients_v_blocks_single_page_hero" ADD CONSTRAINT "_ingredients_v_blocks_single_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ingredients_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ingredients_v_blocks_tabs_tabs" ADD CONSTRAINT "_ingredients_v_blocks_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ingredients_v_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ingredients_v_blocks_tabs" ADD CONSTRAINT "_ingredients_v_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ingredients_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ingredients_v_blocks_references" ADD CONSTRAINT "_ingredients_v_blocks_references_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ingredients_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ingredients_v_blocks_content_block" ADD CONSTRAINT "_ingredients_v_blocks_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ingredients_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ingredients_v" ADD CONSTRAINT "_ingredients_v_parent_id_ingredients_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."ingredients"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ingredients_v" ADD CONSTRAINT "_ingredients_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ingredients_v_rels" ADD CONSTRAINT "_ingredients_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_ingredients_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ingredients_v_rels" ADD CONSTRAINT "_ingredients_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "ingredients_blocks_tabs_order_idx" ON "ingredients_blocks_tabs" USING btree ("_order");
  CREATE INDEX "ingredients_blocks_tabs_parent_id_idx" ON "ingredients_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX "ingredients_blocks_tabs_path_idx" ON "ingredients_blocks_tabs" USING btree ("_path");
  CREATE INDEX "ingredients_blocks_references_order_idx" ON "ingredients_blocks_references" USING btree ("_order");
  CREATE INDEX "ingredients_blocks_references_parent_id_idx" ON "ingredients_blocks_references" USING btree ("_parent_id");
  CREATE INDEX "ingredients_blocks_references_path_idx" ON "ingredients_blocks_references" USING btree ("_path");
  CREATE INDEX "ingredients_blocks_content_block_order_idx" ON "ingredients_blocks_content_block" USING btree ("_order");
  CREATE INDEX "ingredients_blocks_content_block_parent_id_idx" ON "ingredients_blocks_content_block" USING btree ("_parent_id");
  CREATE INDEX "ingredients_blocks_content_block_path_idx" ON "ingredients_blocks_content_block" USING btree ("_path");
  CREATE INDEX "ingredients_image_idx" ON "ingredients" USING btree ("image_id");
  CREATE INDEX "ingredients_slug_idx" ON "ingredients" USING btree ("slug");
  CREATE INDEX "ingredients_updated_at_idx" ON "ingredients" USING btree ("updated_at");
  CREATE INDEX "ingredients_created_at_idx" ON "ingredients" USING btree ("created_at");
  CREATE INDEX "ingredients__status_idx" ON "ingredients" USING btree ("_status");
  CREATE INDEX "ingredients_rels_order_idx" ON "ingredients_rels" USING btree ("order");
  CREATE INDEX "ingredients_rels_parent_idx" ON "ingredients_rels" USING btree ("parent_id");
  CREATE INDEX "ingredients_rels_path_idx" ON "ingredients_rels" USING btree ("path");
  CREATE INDEX "ingredients_rels_categories_id_idx" ON "ingredients_rels" USING btree ("categories_id");
  CREATE INDEX "_ingredients_v_blocks_single_page_hero_order_idx" ON "_ingredients_v_blocks_single_page_hero" USING btree ("_order");
  CREATE INDEX "_ingredients_v_blocks_single_page_hero_parent_id_idx" ON "_ingredients_v_blocks_single_page_hero" USING btree ("_parent_id");
  CREATE INDEX "_ingredients_v_blocks_single_page_hero_path_idx" ON "_ingredients_v_blocks_single_page_hero" USING btree ("_path");
  CREATE INDEX "_ingredients_v_blocks_single_page_hero_image_idx" ON "_ingredients_v_blocks_single_page_hero" USING btree ("image_id");
  CREATE INDEX "_ingredients_v_blocks_single_page_hero_author_idx" ON "_ingredients_v_blocks_single_page_hero" USING btree ("author_id");
  CREATE INDEX "_ingredients_v_blocks_tabs_tabs_order_idx" ON "_ingredients_v_blocks_tabs_tabs" USING btree ("_order");
  CREATE INDEX "_ingredients_v_blocks_tabs_tabs_parent_id_idx" ON "_ingredients_v_blocks_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "_ingredients_v_blocks_tabs_order_idx" ON "_ingredients_v_blocks_tabs" USING btree ("_order");
  CREATE INDEX "_ingredients_v_blocks_tabs_parent_id_idx" ON "_ingredients_v_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX "_ingredients_v_blocks_tabs_path_idx" ON "_ingredients_v_blocks_tabs" USING btree ("_path");
  CREATE INDEX "_ingredients_v_blocks_references_order_idx" ON "_ingredients_v_blocks_references" USING btree ("_order");
  CREATE INDEX "_ingredients_v_blocks_references_parent_id_idx" ON "_ingredients_v_blocks_references" USING btree ("_parent_id");
  CREATE INDEX "_ingredients_v_blocks_references_path_idx" ON "_ingredients_v_blocks_references" USING btree ("_path");
  CREATE INDEX "_ingredients_v_blocks_content_block_order_idx" ON "_ingredients_v_blocks_content_block" USING btree ("_order");
  CREATE INDEX "_ingredients_v_blocks_content_block_parent_id_idx" ON "_ingredients_v_blocks_content_block" USING btree ("_parent_id");
  CREATE INDEX "_ingredients_v_blocks_content_block_path_idx" ON "_ingredients_v_blocks_content_block" USING btree ("_path");
  CREATE INDEX "_ingredients_v_parent_idx" ON "_ingredients_v" USING btree ("parent_id");
  CREATE INDEX "_ingredients_v_version_version_image_idx" ON "_ingredients_v" USING btree ("version_image_id");
  CREATE INDEX "_ingredients_v_version_version_slug_idx" ON "_ingredients_v" USING btree ("version_slug");
  CREATE INDEX "_ingredients_v_version_version_updated_at_idx" ON "_ingredients_v" USING btree ("version_updated_at");
  CREATE INDEX "_ingredients_v_version_version_created_at_idx" ON "_ingredients_v" USING btree ("version_created_at");
  CREATE INDEX "_ingredients_v_version_version__status_idx" ON "_ingredients_v" USING btree ("version__status");
  CREATE INDEX "_ingredients_v_created_at_idx" ON "_ingredients_v" USING btree ("created_at");
  CREATE INDEX "_ingredients_v_updated_at_idx" ON "_ingredients_v" USING btree ("updated_at");
  CREATE INDEX "_ingredients_v_latest_idx" ON "_ingredients_v" USING btree ("latest");
  CREATE INDEX "_ingredients_v_autosave_idx" ON "_ingredients_v" USING btree ("autosave");
  CREATE INDEX "_ingredients_v_rels_order_idx" ON "_ingredients_v_rels" USING btree ("order");
  CREATE INDEX "_ingredients_v_rels_parent_idx" ON "_ingredients_v_rels" USING btree ("parent_id");
  CREATE INDEX "_ingredients_v_rels_path_idx" ON "_ingredients_v_rels" USING btree ("path");
  CREATE INDEX "_ingredients_v_rels_categories_id_idx" ON "_ingredients_v_rels" USING btree ("categories_id");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_ingredients_fk" FOREIGN KEY ("ingredients_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_ingredients_fk" FOREIGN KEY ("ingredients_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ingredients_blocks_single_page_hero" ADD CONSTRAINT "ingredients_blocks_single_page_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ingredients_blocks_single_page_hero" ADD CONSTRAINT "ingredients_blocks_single_page_hero_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ingredients_blocks_single_page_hero" ADD CONSTRAINT "ingredients_blocks_single_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ingredients_blocks_tabs_tabs" ADD CONSTRAINT "ingredients_blocks_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ingredients_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ingredients_fk" FOREIGN KEY ("ingredients_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_ingredients_id_idx" ON "pages_rels" USING btree ("ingredients_id");
  CREATE INDEX "_pages_v_rels_ingredients_id_idx" ON "_pages_v_rels" USING btree ("ingredients_id");
  CREATE INDEX "ingredients_blocks_single_page_hero_order_idx" ON "ingredients_blocks_single_page_hero" USING btree ("_order");
  CREATE INDEX "ingredients_blocks_single_page_hero_parent_id_idx" ON "ingredients_blocks_single_page_hero" USING btree ("_parent_id");
  CREATE INDEX "ingredients_blocks_single_page_hero_path_idx" ON "ingredients_blocks_single_page_hero" USING btree ("_path");
  CREATE INDEX "ingredients_blocks_single_page_hero_image_idx" ON "ingredients_blocks_single_page_hero" USING btree ("image_id");
  CREATE INDEX "ingredients_blocks_single_page_hero_author_idx" ON "ingredients_blocks_single_page_hero" USING btree ("author_id");
  CREATE INDEX "ingredients_blocks_tabs_tabs_order_idx" ON "ingredients_blocks_tabs_tabs" USING btree ("_order");
  CREATE INDEX "ingredients_blocks_tabs_tabs_parent_id_idx" ON "ingredients_blocks_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "payload_locked_documents_rels_ingredients_id_idx" ON "payload_locked_documents_rels" USING btree ("ingredients_id");
  ALTER TABLE "pages_rels" DROP COLUMN "food_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "food_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "food_id";`)
}
