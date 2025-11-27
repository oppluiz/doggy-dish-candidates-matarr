import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_ingredients_blocks_single_page_hero_orientation" AS ENUM('horizontal', 'vertical');
  CREATE TYPE "public"."enum__ingredients_v_blocks_single_page_hero_orientation" AS ENUM('horizontal', 'vertical');
  CREATE TYPE "public"."enum_how_to_blocks_single_page_hero_orientation" AS ENUM('horizontal', 'vertical');
  CREATE TYPE "public"."enum__how_to_v_blocks_single_page_hero_orientation" AS ENUM('horizontal', 'vertical');
  CREATE TYPE "public"."enum_health_blocks_single_page_hero_orientation" AS ENUM('horizontal', 'vertical');
  CREATE TYPE "public"."enum__health_v_blocks_single_page_hero_orientation" AS ENUM('horizontal', 'vertical');
  CREATE TABLE "ingredients_blocks_single_page_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"orientation" "enum_ingredients_blocks_single_page_hero_orientation" DEFAULT 'horizontal',
  	"image_id" integer,
  	"title" varchar,
  	"enable_author" boolean DEFAULT true,
  	"author_id" integer,
  	"heading" varchar,
  	"paragraph" jsonb,
  	"block_name" varchar
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
  
  CREATE TABLE "how_to_blocks_single_page_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"orientation" "enum_how_to_blocks_single_page_hero_orientation" DEFAULT 'horizontal',
  	"image_id" integer,
  	"title" varchar,
  	"enable_author" boolean DEFAULT true,
  	"author_id" integer,
  	"heading" varchar,
  	"paragraph" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_how_to_v_blocks_single_page_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"orientation" "enum__how_to_v_blocks_single_page_hero_orientation" DEFAULT 'horizontal',
  	"image_id" integer,
  	"title" varchar,
  	"enable_author" boolean DEFAULT true,
  	"author_id" integer,
  	"heading" varchar,
  	"paragraph" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "health_blocks_single_page_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"orientation" "enum_health_blocks_single_page_hero_orientation" DEFAULT 'horizontal',
  	"image_id" integer,
  	"title" varchar,
  	"enable_author" boolean DEFAULT true,
  	"author_id" integer,
  	"heading" varchar,
  	"paragraph" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_health_v_blocks_single_page_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"orientation" "enum__health_v_blocks_single_page_hero_orientation" DEFAULT 'horizontal',
  	"image_id" integer,
  	"title" varchar,
  	"enable_author" boolean DEFAULT true,
  	"author_id" integer,
  	"heading" varchar,
  	"paragraph" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DROP TABLE "ingredients_blocks_ingredient_hero" CASCADE;
  DROP TABLE "_ingredients_v_blocks_ingredient_hero" CASCADE;
  DROP TABLE "how_to_blocks_how_to_hero" CASCADE;
  DROP TABLE "_how_to_v_blocks_how_to_hero" CASCADE;
  DROP TABLE "health_blocks_health_hero" CASCADE;
  DROP TABLE "_health_v_blocks_health_hero" CASCADE;
  ALTER TABLE "ingredients_blocks_single_page_hero" ADD CONSTRAINT "ingredients_blocks_single_page_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ingredients_blocks_single_page_hero" ADD CONSTRAINT "ingredients_blocks_single_page_hero_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ingredients_blocks_single_page_hero" ADD CONSTRAINT "ingredients_blocks_single_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ingredients_v_blocks_single_page_hero" ADD CONSTRAINT "_ingredients_v_blocks_single_page_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ingredients_v_blocks_single_page_hero" ADD CONSTRAINT "_ingredients_v_blocks_single_page_hero_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ingredients_v_blocks_single_page_hero" ADD CONSTRAINT "_ingredients_v_blocks_single_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ingredients_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "how_to_blocks_single_page_hero" ADD CONSTRAINT "how_to_blocks_single_page_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "how_to_blocks_single_page_hero" ADD CONSTRAINT "how_to_blocks_single_page_hero_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "how_to_blocks_single_page_hero" ADD CONSTRAINT "how_to_blocks_single_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."how_to"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_how_to_v_blocks_single_page_hero" ADD CONSTRAINT "_how_to_v_blocks_single_page_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_how_to_v_blocks_single_page_hero" ADD CONSTRAINT "_how_to_v_blocks_single_page_hero_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_how_to_v_blocks_single_page_hero" ADD CONSTRAINT "_how_to_v_blocks_single_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_how_to_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "health_blocks_single_page_hero" ADD CONSTRAINT "health_blocks_single_page_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "health_blocks_single_page_hero" ADD CONSTRAINT "health_blocks_single_page_hero_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "health_blocks_single_page_hero" ADD CONSTRAINT "health_blocks_single_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."health"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_health_v_blocks_single_page_hero" ADD CONSTRAINT "_health_v_blocks_single_page_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_health_v_blocks_single_page_hero" ADD CONSTRAINT "_health_v_blocks_single_page_hero_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_health_v_blocks_single_page_hero" ADD CONSTRAINT "_health_v_blocks_single_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_health_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "ingredients_blocks_single_page_hero_order_idx" ON "ingredients_blocks_single_page_hero" USING btree ("_order");
  CREATE INDEX "ingredients_blocks_single_page_hero_parent_id_idx" ON "ingredients_blocks_single_page_hero" USING btree ("_parent_id");
  CREATE INDEX "ingredients_blocks_single_page_hero_path_idx" ON "ingredients_blocks_single_page_hero" USING btree ("_path");
  CREATE INDEX "ingredients_blocks_single_page_hero_image_idx" ON "ingredients_blocks_single_page_hero" USING btree ("image_id");
  CREATE INDEX "ingredients_blocks_single_page_hero_author_idx" ON "ingredients_blocks_single_page_hero" USING btree ("author_id");
  CREATE INDEX "_ingredients_v_blocks_single_page_hero_order_idx" ON "_ingredients_v_blocks_single_page_hero" USING btree ("_order");
  CREATE INDEX "_ingredients_v_blocks_single_page_hero_parent_id_idx" ON "_ingredients_v_blocks_single_page_hero" USING btree ("_parent_id");
  CREATE INDEX "_ingredients_v_blocks_single_page_hero_path_idx" ON "_ingredients_v_blocks_single_page_hero" USING btree ("_path");
  CREATE INDEX "_ingredients_v_blocks_single_page_hero_image_idx" ON "_ingredients_v_blocks_single_page_hero" USING btree ("image_id");
  CREATE INDEX "_ingredients_v_blocks_single_page_hero_author_idx" ON "_ingredients_v_blocks_single_page_hero" USING btree ("author_id");
  CREATE INDEX "how_to_blocks_single_page_hero_order_idx" ON "how_to_blocks_single_page_hero" USING btree ("_order");
  CREATE INDEX "how_to_blocks_single_page_hero_parent_id_idx" ON "how_to_blocks_single_page_hero" USING btree ("_parent_id");
  CREATE INDEX "how_to_blocks_single_page_hero_path_idx" ON "how_to_blocks_single_page_hero" USING btree ("_path");
  CREATE INDEX "how_to_blocks_single_page_hero_image_idx" ON "how_to_blocks_single_page_hero" USING btree ("image_id");
  CREATE INDEX "how_to_blocks_single_page_hero_author_idx" ON "how_to_blocks_single_page_hero" USING btree ("author_id");
  CREATE INDEX "_how_to_v_blocks_single_page_hero_order_idx" ON "_how_to_v_blocks_single_page_hero" USING btree ("_order");
  CREATE INDEX "_how_to_v_blocks_single_page_hero_parent_id_idx" ON "_how_to_v_blocks_single_page_hero" USING btree ("_parent_id");
  CREATE INDEX "_how_to_v_blocks_single_page_hero_path_idx" ON "_how_to_v_blocks_single_page_hero" USING btree ("_path");
  CREATE INDEX "_how_to_v_blocks_single_page_hero_image_idx" ON "_how_to_v_blocks_single_page_hero" USING btree ("image_id");
  CREATE INDEX "_how_to_v_blocks_single_page_hero_author_idx" ON "_how_to_v_blocks_single_page_hero" USING btree ("author_id");
  CREATE INDEX "health_blocks_single_page_hero_order_idx" ON "health_blocks_single_page_hero" USING btree ("_order");
  CREATE INDEX "health_blocks_single_page_hero_parent_id_idx" ON "health_blocks_single_page_hero" USING btree ("_parent_id");
  CREATE INDEX "health_blocks_single_page_hero_path_idx" ON "health_blocks_single_page_hero" USING btree ("_path");
  CREATE INDEX "health_blocks_single_page_hero_image_idx" ON "health_blocks_single_page_hero" USING btree ("image_id");
  CREATE INDEX "health_blocks_single_page_hero_author_idx" ON "health_blocks_single_page_hero" USING btree ("author_id");
  CREATE INDEX "_health_v_blocks_single_page_hero_order_idx" ON "_health_v_blocks_single_page_hero" USING btree ("_order");
  CREATE INDEX "_health_v_blocks_single_page_hero_parent_id_idx" ON "_health_v_blocks_single_page_hero" USING btree ("_parent_id");
  CREATE INDEX "_health_v_blocks_single_page_hero_path_idx" ON "_health_v_blocks_single_page_hero" USING btree ("_path");
  CREATE INDEX "_health_v_blocks_single_page_hero_image_idx" ON "_health_v_blocks_single_page_hero" USING btree ("image_id");
  CREATE INDEX "_health_v_blocks_single_page_hero_author_idx" ON "_health_v_blocks_single_page_hero" USING btree ("author_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "ingredients_blocks_ingredient_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"author_id" integer,
  	"block_name" varchar
  );
  
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
  
  DROP TABLE "ingredients_blocks_single_page_hero" CASCADE;
  DROP TABLE "_ingredients_v_blocks_single_page_hero" CASCADE;
  DROP TABLE "how_to_blocks_single_page_hero" CASCADE;
  DROP TABLE "_how_to_v_blocks_single_page_hero" CASCADE;
  DROP TABLE "health_blocks_single_page_hero" CASCADE;
  DROP TABLE "_health_v_blocks_single_page_hero" CASCADE;
  ALTER TABLE "ingredients_blocks_ingredient_hero" ADD CONSTRAINT "ingredients_blocks_ingredient_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ingredients_blocks_ingredient_hero" ADD CONSTRAINT "ingredients_blocks_ingredient_hero_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ingredients_blocks_ingredient_hero" ADD CONSTRAINT "ingredients_blocks_ingredient_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ingredients_v_blocks_ingredient_hero" ADD CONSTRAINT "_ingredients_v_blocks_ingredient_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ingredients_v_blocks_ingredient_hero" ADD CONSTRAINT "_ingredients_v_blocks_ingredient_hero_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ingredients_v_blocks_ingredient_hero" ADD CONSTRAINT "_ingredients_v_blocks_ingredient_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ingredients_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "how_to_blocks_how_to_hero" ADD CONSTRAINT "how_to_blocks_how_to_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "how_to_blocks_how_to_hero" ADD CONSTRAINT "how_to_blocks_how_to_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."how_to"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_how_to_v_blocks_how_to_hero" ADD CONSTRAINT "_how_to_v_blocks_how_to_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_how_to_v_blocks_how_to_hero" ADD CONSTRAINT "_how_to_v_blocks_how_to_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_how_to_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "health_blocks_health_hero" ADD CONSTRAINT "health_blocks_health_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "health_blocks_health_hero" ADD CONSTRAINT "health_blocks_health_hero_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "health_blocks_health_hero" ADD CONSTRAINT "health_blocks_health_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."health"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_health_v_blocks_health_hero" ADD CONSTRAINT "_health_v_blocks_health_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_health_v_blocks_health_hero" ADD CONSTRAINT "_health_v_blocks_health_hero_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_health_v_blocks_health_hero" ADD CONSTRAINT "_health_v_blocks_health_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_health_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "ingredients_blocks_ingredient_hero_order_idx" ON "ingredients_blocks_ingredient_hero" USING btree ("_order");
  CREATE INDEX "ingredients_blocks_ingredient_hero_parent_id_idx" ON "ingredients_blocks_ingredient_hero" USING btree ("_parent_id");
  CREATE INDEX "ingredients_blocks_ingredient_hero_path_idx" ON "ingredients_blocks_ingredient_hero" USING btree ("_path");
  CREATE INDEX "ingredients_blocks_ingredient_hero_image_idx" ON "ingredients_blocks_ingredient_hero" USING btree ("image_id");
  CREATE INDEX "ingredients_blocks_ingredient_hero_author_idx" ON "ingredients_blocks_ingredient_hero" USING btree ("author_id");
  CREATE INDEX "_ingredients_v_blocks_ingredient_hero_order_idx" ON "_ingredients_v_blocks_ingredient_hero" USING btree ("_order");
  CREATE INDEX "_ingredients_v_blocks_ingredient_hero_parent_id_idx" ON "_ingredients_v_blocks_ingredient_hero" USING btree ("_parent_id");
  CREATE INDEX "_ingredients_v_blocks_ingredient_hero_path_idx" ON "_ingredients_v_blocks_ingredient_hero" USING btree ("_path");
  CREATE INDEX "_ingredients_v_blocks_ingredient_hero_image_idx" ON "_ingredients_v_blocks_ingredient_hero" USING btree ("image_id");
  CREATE INDEX "_ingredients_v_blocks_ingredient_hero_author_idx" ON "_ingredients_v_blocks_ingredient_hero" USING btree ("author_id");
  CREATE INDEX "how_to_blocks_how_to_hero_order_idx" ON "how_to_blocks_how_to_hero" USING btree ("_order");
  CREATE INDEX "how_to_blocks_how_to_hero_parent_id_idx" ON "how_to_blocks_how_to_hero" USING btree ("_parent_id");
  CREATE INDEX "how_to_blocks_how_to_hero_path_idx" ON "how_to_blocks_how_to_hero" USING btree ("_path");
  CREATE INDEX "how_to_blocks_how_to_hero_image_idx" ON "how_to_blocks_how_to_hero" USING btree ("image_id");
  CREATE INDEX "_how_to_v_blocks_how_to_hero_order_idx" ON "_how_to_v_blocks_how_to_hero" USING btree ("_order");
  CREATE INDEX "_how_to_v_blocks_how_to_hero_parent_id_idx" ON "_how_to_v_blocks_how_to_hero" USING btree ("_parent_id");
  CREATE INDEX "_how_to_v_blocks_how_to_hero_path_idx" ON "_how_to_v_blocks_how_to_hero" USING btree ("_path");
  CREATE INDEX "_how_to_v_blocks_how_to_hero_image_idx" ON "_how_to_v_blocks_how_to_hero" USING btree ("image_id");
  CREATE INDEX "health_blocks_health_hero_order_idx" ON "health_blocks_health_hero" USING btree ("_order");
  CREATE INDEX "health_blocks_health_hero_parent_id_idx" ON "health_blocks_health_hero" USING btree ("_parent_id");
  CREATE INDEX "health_blocks_health_hero_path_idx" ON "health_blocks_health_hero" USING btree ("_path");
  CREATE INDEX "health_blocks_health_hero_image_idx" ON "health_blocks_health_hero" USING btree ("image_id");
  CREATE INDEX "health_blocks_health_hero_author_idx" ON "health_blocks_health_hero" USING btree ("author_id");
  CREATE INDEX "_health_v_blocks_health_hero_order_idx" ON "_health_v_blocks_health_hero" USING btree ("_order");
  CREATE INDEX "_health_v_blocks_health_hero_parent_id_idx" ON "_health_v_blocks_health_hero" USING btree ("_parent_id");
  CREATE INDEX "_health_v_blocks_health_hero_path_idx" ON "_health_v_blocks_health_hero" USING btree ("_path");
  CREATE INDEX "_health_v_blocks_health_hero_image_idx" ON "_health_v_blocks_health_hero" USING btree ("image_id");
  CREATE INDEX "_health_v_blocks_health_hero_author_idx" ON "_health_v_blocks_health_hero" USING btree ("author_id");
  DROP TYPE "public"."enum_ingredients_blocks_single_page_hero_orientation";
  DROP TYPE "public"."enum__ingredients_v_blocks_single_page_hero_orientation";
  DROP TYPE "public"."enum_how_to_blocks_single_page_hero_orientation";
  DROP TYPE "public"."enum__how_to_v_blocks_single_page_hero_orientation";
  DROP TYPE "public"."enum_health_blocks_single_page_hero_orientation";
  DROP TYPE "public"."enum__health_v_blocks_single_page_hero_orientation";`)
}
