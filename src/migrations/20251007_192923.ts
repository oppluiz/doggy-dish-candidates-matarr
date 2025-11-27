import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_ingredients_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__ingredients_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "_ingredients_v_blocks_ingredient_hero" (
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
  
  CREATE TABLE "_ingredients_v_blocks_ingredient_tabs_serving_size_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"portion" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ingredients_v_blocks_ingredient_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"benefits" jsonb,
  	"serving_size_heading" varchar DEFAULT 'SERVING SIZE',
  	"frequency" jsonb,
  	"how_to_serve" jsonb,
  	"enable_warning" boolean DEFAULT false,
  	"warning_heading" varchar DEFAULT 'IMPORTANT',
  	"warning_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_ingredients_v_blocks_ingredient_references" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'REFERENCES',
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
  
  ALTER TABLE "ingredients_blocks_ingredient_hero" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "ingredients_blocks_ingredient_hero" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "ingredients_blocks_ingredient_hero" ALTER COLUMN "author_id" DROP NOT NULL;
  ALTER TABLE "ingredients_blocks_ingredient_tabs_serving_size_items" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "ingredients_blocks_ingredient_tabs_serving_size_items" ALTER COLUMN "portion" DROP NOT NULL;
  ALTER TABLE "ingredients_blocks_ingredient_tabs" ALTER COLUMN "benefits" DROP NOT NULL;
  ALTER TABLE "ingredients_blocks_ingredient_tabs" ALTER COLUMN "frequency" DROP NOT NULL;
  ALTER TABLE "ingredients_blocks_ingredient_tabs" ALTER COLUMN "how_to_serve" DROP NOT NULL;
  ALTER TABLE "ingredients_blocks_ingredient_references" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "ingredients_blocks_ingredient_references" ALTER COLUMN "content" DROP NOT NULL;
  ALTER TABLE "ingredients" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "ingredients" ADD COLUMN "_status" "enum_ingredients_status" DEFAULT 'draft';
  ALTER TABLE "_ingredients_v_blocks_ingredient_hero" ADD CONSTRAINT "_ingredients_v_blocks_ingredient_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ingredients_v_blocks_ingredient_hero" ADD CONSTRAINT "_ingredients_v_blocks_ingredient_hero_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ingredients_v_blocks_ingredient_hero" ADD CONSTRAINT "_ingredients_v_blocks_ingredient_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ingredients_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ingredients_v_blocks_ingredient_tabs_serving_size_items" ADD CONSTRAINT "_ingredients_v_blocks_ingredient_tabs_serving_size_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ingredients_v_blocks_ingredient_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ingredients_v_blocks_ingredient_tabs" ADD CONSTRAINT "_ingredients_v_blocks_ingredient_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ingredients_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ingredients_v_blocks_ingredient_references" ADD CONSTRAINT "_ingredients_v_blocks_ingredient_references_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ingredients_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ingredients_v" ADD CONSTRAINT "_ingredients_v_parent_id_ingredients_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."ingredients"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ingredients_v" ADD CONSTRAINT "_ingredients_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ingredients_v_rels" ADD CONSTRAINT "_ingredients_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_ingredients_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ingredients_v_rels" ADD CONSTRAINT "_ingredients_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "_ingredients_v_blocks_ingredient_hero_order_idx" ON "_ingredients_v_blocks_ingredient_hero" USING btree ("_order");
  CREATE INDEX "_ingredients_v_blocks_ingredient_hero_parent_id_idx" ON "_ingredients_v_blocks_ingredient_hero" USING btree ("_parent_id");
  CREATE INDEX "_ingredients_v_blocks_ingredient_hero_path_idx" ON "_ingredients_v_blocks_ingredient_hero" USING btree ("_path");
  CREATE INDEX "_ingredients_v_blocks_ingredient_hero_image_idx" ON "_ingredients_v_blocks_ingredient_hero" USING btree ("image_id");
  CREATE INDEX "_ingredients_v_blocks_ingredient_hero_author_idx" ON "_ingredients_v_blocks_ingredient_hero" USING btree ("author_id");
  CREATE INDEX "_ingredients_v_blocks_ingredient_tabs_serving_size_items_order_idx" ON "_ingredients_v_blocks_ingredient_tabs_serving_size_items" USING btree ("_order");
  CREATE INDEX "_ingredients_v_blocks_ingredient_tabs_serving_size_items_parent_id_idx" ON "_ingredients_v_blocks_ingredient_tabs_serving_size_items" USING btree ("_parent_id");
  CREATE INDEX "_ingredients_v_blocks_ingredient_tabs_order_idx" ON "_ingredients_v_blocks_ingredient_tabs" USING btree ("_order");
  CREATE INDEX "_ingredients_v_blocks_ingredient_tabs_parent_id_idx" ON "_ingredients_v_blocks_ingredient_tabs" USING btree ("_parent_id");
  CREATE INDEX "_ingredients_v_blocks_ingredient_tabs_path_idx" ON "_ingredients_v_blocks_ingredient_tabs" USING btree ("_path");
  CREATE INDEX "_ingredients_v_blocks_ingredient_references_order_idx" ON "_ingredients_v_blocks_ingredient_references" USING btree ("_order");
  CREATE INDEX "_ingredients_v_blocks_ingredient_references_parent_id_idx" ON "_ingredients_v_blocks_ingredient_references" USING btree ("_parent_id");
  CREATE INDEX "_ingredients_v_blocks_ingredient_references_path_idx" ON "_ingredients_v_blocks_ingredient_references" USING btree ("_path");
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
  CREATE INDEX "ingredients__status_idx" ON "ingredients" USING btree ("_status");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_ingredients_v_blocks_ingredient_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_ingredients_v_blocks_ingredient_tabs_serving_size_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_ingredients_v_blocks_ingredient_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_ingredients_v_blocks_ingredient_references" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_ingredients_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_ingredients_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_ingredients_v_blocks_ingredient_hero" CASCADE;
  DROP TABLE "_ingredients_v_blocks_ingredient_tabs_serving_size_items" CASCADE;
  DROP TABLE "_ingredients_v_blocks_ingredient_tabs" CASCADE;
  DROP TABLE "_ingredients_v_blocks_ingredient_references" CASCADE;
  DROP TABLE "_ingredients_v" CASCADE;
  DROP TABLE "_ingredients_v_rels" CASCADE;
  DROP INDEX "ingredients__status_idx";
  ALTER TABLE "ingredients_blocks_ingredient_hero" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "ingredients_blocks_ingredient_hero" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "ingredients_blocks_ingredient_hero" ALTER COLUMN "author_id" SET NOT NULL;
  ALTER TABLE "ingredients_blocks_ingredient_tabs_serving_size_items" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "ingredients_blocks_ingredient_tabs_serving_size_items" ALTER COLUMN "portion" SET NOT NULL;
  ALTER TABLE "ingredients_blocks_ingredient_tabs" ALTER COLUMN "benefits" SET NOT NULL;
  ALTER TABLE "ingredients_blocks_ingredient_tabs" ALTER COLUMN "frequency" SET NOT NULL;
  ALTER TABLE "ingredients_blocks_ingredient_tabs" ALTER COLUMN "how_to_serve" SET NOT NULL;
  ALTER TABLE "ingredients_blocks_ingredient_references" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "ingredients_blocks_ingredient_references" ALTER COLUMN "content" SET NOT NULL;
  ALTER TABLE "ingredients" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "ingredients" DROP COLUMN "_status";
  DROP TYPE "public"."enum_ingredients_status";
  DROP TYPE "public"."enum__ingredients_v_version_status";`)
}
