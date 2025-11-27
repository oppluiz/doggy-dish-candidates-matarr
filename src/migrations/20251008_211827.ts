import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "ingredients_blocks_tabs_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"anchor" varchar
  );
  
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
  
  DROP TABLE "ingredients_blocks_ingredient_tabs_serving_size_items" CASCADE;
  DROP TABLE "ingredients_blocks_ingredient_tabs" CASCADE;
  DROP TABLE "ingredients_blocks_ingredient_references" CASCADE;
  DROP TABLE "_ingredients_v_blocks_ingredient_tabs_serving_size_items" CASCADE;
  DROP TABLE "_ingredients_v_blocks_ingredient_tabs" CASCADE;
  DROP TABLE "_ingredients_v_blocks_ingredient_references" CASCADE;
  ALTER TABLE "ingredients_blocks_tabs_tabs" ADD CONSTRAINT "ingredients_blocks_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ingredients_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ingredients_blocks_tabs" ADD CONSTRAINT "ingredients_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ingredients_blocks_references" ADD CONSTRAINT "ingredients_blocks_references_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ingredients_v_blocks_tabs_tabs" ADD CONSTRAINT "_ingredients_v_blocks_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ingredients_v_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ingredients_v_blocks_tabs" ADD CONSTRAINT "_ingredients_v_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ingredients_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ingredients_v_blocks_references" ADD CONSTRAINT "_ingredients_v_blocks_references_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ingredients_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "ingredients_blocks_tabs_tabs_order_idx" ON "ingredients_blocks_tabs_tabs" USING btree ("_order");
  CREATE INDEX "ingredients_blocks_tabs_tabs_parent_id_idx" ON "ingredients_blocks_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "ingredients_blocks_tabs_order_idx" ON "ingredients_blocks_tabs" USING btree ("_order");
  CREATE INDEX "ingredients_blocks_tabs_parent_id_idx" ON "ingredients_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX "ingredients_blocks_tabs_path_idx" ON "ingredients_blocks_tabs" USING btree ("_path");
  CREATE INDEX "ingredients_blocks_references_order_idx" ON "ingredients_blocks_references" USING btree ("_order");
  CREATE INDEX "ingredients_blocks_references_parent_id_idx" ON "ingredients_blocks_references" USING btree ("_parent_id");
  CREATE INDEX "ingredients_blocks_references_path_idx" ON "ingredients_blocks_references" USING btree ("_path");
  CREATE INDEX "_ingredients_v_blocks_tabs_tabs_order_idx" ON "_ingredients_v_blocks_tabs_tabs" USING btree ("_order");
  CREATE INDEX "_ingredients_v_blocks_tabs_tabs_parent_id_idx" ON "_ingredients_v_blocks_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "_ingredients_v_blocks_tabs_order_idx" ON "_ingredients_v_blocks_tabs" USING btree ("_order");
  CREATE INDEX "_ingredients_v_blocks_tabs_parent_id_idx" ON "_ingredients_v_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX "_ingredients_v_blocks_tabs_path_idx" ON "_ingredients_v_blocks_tabs" USING btree ("_path");
  CREATE INDEX "_ingredients_v_blocks_references_order_idx" ON "_ingredients_v_blocks_references" USING btree ("_order");
  CREATE INDEX "_ingredients_v_blocks_references_parent_id_idx" ON "_ingredients_v_blocks_references" USING btree ("_parent_id");
  CREATE INDEX "_ingredients_v_blocks_references_path_idx" ON "_ingredients_v_blocks_references" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "ingredients_blocks_ingredient_tabs_serving_size_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"portion" varchar
  );
  
  CREATE TABLE "ingredients_blocks_ingredient_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"benefits" jsonb,
  	"serving_size_heading" varchar DEFAULT 'SERVING SIZE',
  	"frequency" jsonb,
  	"how_to_serve" jsonb,
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
  	"title" varchar DEFAULT 'REFERENCES',
  	"content" jsonb,
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
  
  DROP TABLE "ingredients_blocks_tabs_tabs" CASCADE;
  DROP TABLE "ingredients_blocks_tabs" CASCADE;
  DROP TABLE "ingredients_blocks_references" CASCADE;
  DROP TABLE "_ingredients_v_blocks_tabs_tabs" CASCADE;
  DROP TABLE "_ingredients_v_blocks_tabs" CASCADE;
  DROP TABLE "_ingredients_v_blocks_references" CASCADE;
  ALTER TABLE "ingredients_blocks_ingredient_tabs_serving_size_items" ADD CONSTRAINT "ingredients_blocks_ingredient_tabs_serving_size_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ingredients_blocks_ingredient_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ingredients_blocks_ingredient_tabs" ADD CONSTRAINT "ingredients_blocks_ingredient_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ingredients_blocks_ingredient_references" ADD CONSTRAINT "ingredients_blocks_ingredient_references_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ingredients_v_blocks_ingredient_tabs_serving_size_items" ADD CONSTRAINT "_ingredients_v_blocks_ingredient_tabs_serving_size_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ingredients_v_blocks_ingredient_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ingredients_v_blocks_ingredient_tabs" ADD CONSTRAINT "_ingredients_v_blocks_ingredient_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ingredients_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ingredients_v_blocks_ingredient_references" ADD CONSTRAINT "_ingredients_v_blocks_ingredient_references_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ingredients_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "ingredients_blocks_ingredient_tabs_serving_size_items_order_idx" ON "ingredients_blocks_ingredient_tabs_serving_size_items" USING btree ("_order");
  CREATE INDEX "ingredients_blocks_ingredient_tabs_serving_size_items_parent_id_idx" ON "ingredients_blocks_ingredient_tabs_serving_size_items" USING btree ("_parent_id");
  CREATE INDEX "ingredients_blocks_ingredient_tabs_order_idx" ON "ingredients_blocks_ingredient_tabs" USING btree ("_order");
  CREATE INDEX "ingredients_blocks_ingredient_tabs_parent_id_idx" ON "ingredients_blocks_ingredient_tabs" USING btree ("_parent_id");
  CREATE INDEX "ingredients_blocks_ingredient_tabs_path_idx" ON "ingredients_blocks_ingredient_tabs" USING btree ("_path");
  CREATE INDEX "ingredients_blocks_ingredient_references_order_idx" ON "ingredients_blocks_ingredient_references" USING btree ("_order");
  CREATE INDEX "ingredients_blocks_ingredient_references_parent_id_idx" ON "ingredients_blocks_ingredient_references" USING btree ("_parent_id");
  CREATE INDEX "ingredients_blocks_ingredient_references_path_idx" ON "ingredients_blocks_ingredient_references" USING btree ("_path");
  CREATE INDEX "_ingredients_v_blocks_ingredient_tabs_serving_size_items_order_idx" ON "_ingredients_v_blocks_ingredient_tabs_serving_size_items" USING btree ("_order");
  CREATE INDEX "_ingredients_v_blocks_ingredient_tabs_serving_size_items_parent_id_idx" ON "_ingredients_v_blocks_ingredient_tabs_serving_size_items" USING btree ("_parent_id");
  CREATE INDEX "_ingredients_v_blocks_ingredient_tabs_order_idx" ON "_ingredients_v_blocks_ingredient_tabs" USING btree ("_order");
  CREATE INDEX "_ingredients_v_blocks_ingredient_tabs_parent_id_idx" ON "_ingredients_v_blocks_ingredient_tabs" USING btree ("_parent_id");
  CREATE INDEX "_ingredients_v_blocks_ingredient_tabs_path_idx" ON "_ingredients_v_blocks_ingredient_tabs" USING btree ("_path");
  CREATE INDEX "_ingredients_v_blocks_ingredient_references_order_idx" ON "_ingredients_v_blocks_ingredient_references" USING btree ("_order");
  CREATE INDEX "_ingredients_v_blocks_ingredient_references_parent_id_idx" ON "_ingredients_v_blocks_ingredient_references" USING btree ("_parent_id");
  CREATE INDEX "_ingredients_v_blocks_ingredient_references_path_idx" ON "_ingredients_v_blocks_ingredient_references" USING btree ("_path");`)
}
