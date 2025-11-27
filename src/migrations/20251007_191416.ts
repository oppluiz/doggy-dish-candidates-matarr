import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "ingredients_blocks_ingredient_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"author_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "ingredients_blocks_ingredient_tabs_serving_size_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"portion" varchar NOT NULL
  );
  
  CREATE TABLE "ingredients_blocks_ingredient_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"benefits" jsonb NOT NULL,
  	"serving_size_heading" varchar DEFAULT 'SERVING SIZE',
  	"frequency" jsonb NOT NULL,
  	"how_to_serve" jsonb NOT NULL,
  	"enable_warning" boolean DEFAULT false,
  	"warning_heading" varchar DEFAULT 'IMPORTANT',
  	"warning_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "ingredients_blocks_ingredient_references" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'REFERENCES' NOT NULL,
  	"content" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "ingredients" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"name" varchar NOT NULL,
  	"description" jsonb,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "ingredients_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "ingredients_id" integer;
  ALTER TABLE "ingredients_blocks_ingredient_hero" ADD CONSTRAINT "ingredients_blocks_ingredient_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ingredients_blocks_ingredient_hero" ADD CONSTRAINT "ingredients_blocks_ingredient_hero_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ingredients_blocks_ingredient_hero" ADD CONSTRAINT "ingredients_blocks_ingredient_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ingredients_blocks_ingredient_tabs_serving_size_items" ADD CONSTRAINT "ingredients_blocks_ingredient_tabs_serving_size_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ingredients_blocks_ingredient_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ingredients_blocks_ingredient_tabs" ADD CONSTRAINT "ingredients_blocks_ingredient_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ingredients_blocks_ingredient_references" ADD CONSTRAINT "ingredients_blocks_ingredient_references_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ingredients_rels" ADD CONSTRAINT "ingredients_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ingredients_rels" ADD CONSTRAINT "ingredients_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "ingredients_blocks_ingredient_hero_order_idx" ON "ingredients_blocks_ingredient_hero" USING btree ("_order");
  CREATE INDEX "ingredients_blocks_ingredient_hero_parent_id_idx" ON "ingredients_blocks_ingredient_hero" USING btree ("_parent_id");
  CREATE INDEX "ingredients_blocks_ingredient_hero_path_idx" ON "ingredients_blocks_ingredient_hero" USING btree ("_path");
  CREATE INDEX "ingredients_blocks_ingredient_hero_image_idx" ON "ingredients_blocks_ingredient_hero" USING btree ("image_id");
  CREATE INDEX "ingredients_blocks_ingredient_hero_author_idx" ON "ingredients_blocks_ingredient_hero" USING btree ("author_id");
  CREATE INDEX "ingredients_blocks_ingredient_tabs_serving_size_items_order_idx" ON "ingredients_blocks_ingredient_tabs_serving_size_items" USING btree ("_order");
  CREATE INDEX "ingredients_blocks_ingredient_tabs_serving_size_items_parent_id_idx" ON "ingredients_blocks_ingredient_tabs_serving_size_items" USING btree ("_parent_id");
  CREATE INDEX "ingredients_blocks_ingredient_tabs_order_idx" ON "ingredients_blocks_ingredient_tabs" USING btree ("_order");
  CREATE INDEX "ingredients_blocks_ingredient_tabs_parent_id_idx" ON "ingredients_blocks_ingredient_tabs" USING btree ("_parent_id");
  CREATE INDEX "ingredients_blocks_ingredient_tabs_path_idx" ON "ingredients_blocks_ingredient_tabs" USING btree ("_path");
  CREATE INDEX "ingredients_blocks_ingredient_references_order_idx" ON "ingredients_blocks_ingredient_references" USING btree ("_order");
  CREATE INDEX "ingredients_blocks_ingredient_references_parent_id_idx" ON "ingredients_blocks_ingredient_references" USING btree ("_parent_id");
  CREATE INDEX "ingredients_blocks_ingredient_references_path_idx" ON "ingredients_blocks_ingredient_references" USING btree ("_path");
  CREATE INDEX "ingredients_image_idx" ON "ingredients" USING btree ("image_id");
  CREATE INDEX "ingredients_slug_idx" ON "ingredients" USING btree ("slug");
  CREATE INDEX "ingredients_updated_at_idx" ON "ingredients" USING btree ("updated_at");
  CREATE INDEX "ingredients_created_at_idx" ON "ingredients" USING btree ("created_at");
  CREATE INDEX "ingredients_rels_order_idx" ON "ingredients_rels" USING btree ("order");
  CREATE INDEX "ingredients_rels_parent_idx" ON "ingredients_rels" USING btree ("parent_id");
  CREATE INDEX "ingredients_rels_path_idx" ON "ingredients_rels" USING btree ("path");
  CREATE INDEX "ingredients_rels_categories_id_idx" ON "ingredients_rels" USING btree ("categories_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ingredients_fk" FOREIGN KEY ("ingredients_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_ingredients_id_idx" ON "payload_locked_documents_rels" USING btree ("ingredients_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "ingredients_blocks_ingredient_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ingredients_blocks_ingredient_tabs_serving_size_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ingredients_blocks_ingredient_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ingredients_blocks_ingredient_references" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ingredients" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ingredients_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "ingredients_blocks_ingredient_hero" CASCADE;
  DROP TABLE "ingredients_blocks_ingredient_tabs_serving_size_items" CASCADE;
  DROP TABLE "ingredients_blocks_ingredient_tabs" CASCADE;
  DROP TABLE "ingredients_blocks_ingredient_references" CASCADE;
  DROP TABLE "ingredients" CASCADE;
  DROP TABLE "ingredients_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_ingredients_fk";
  
  DROP INDEX "payload_locked_documents_rels_ingredients_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "ingredients_id";`)
}
