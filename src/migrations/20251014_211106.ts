import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_toggled_collections_collections_collection" AS ENUM('food', 'health', 'howTo');
  CREATE TYPE "public"."enum__pages_v_blocks_toggled_collections_collections_collection" AS ENUM('food', 'health', 'howTo');
  CREATE TABLE "pages_blocks_toggled_collections_collections" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"collection" "enum_pages_blocks_toggled_collections_collections_collection",
  	"item_count" numeric DEFAULT 8,
  	"fill_content" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_toggled_collections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_toggled_collections_collections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"collection" "enum__pages_v_blocks_toggled_collections_collections_collection",
  	"item_count" numeric DEFAULT 8,
  	"fill_content" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_toggled_collections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_toggled_collections_collections" ADD CONSTRAINT "pages_blocks_toggled_collections_collections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_toggled_collections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_toggled_collections" ADD CONSTRAINT "pages_blocks_toggled_collections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_toggled_collections_collections" ADD CONSTRAINT "_pages_v_blocks_toggled_collections_collections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_toggled_collections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_toggled_collections" ADD CONSTRAINT "_pages_v_blocks_toggled_collections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_toggled_collections_collections_order_idx" ON "pages_blocks_toggled_collections_collections" USING btree ("_order");
  CREATE INDEX "pages_blocks_toggled_collections_collections_parent_id_idx" ON "pages_blocks_toggled_collections_collections" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_toggled_collections_order_idx" ON "pages_blocks_toggled_collections" USING btree ("_order");
  CREATE INDEX "pages_blocks_toggled_collections_parent_id_idx" ON "pages_blocks_toggled_collections" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_toggled_collections_path_idx" ON "pages_blocks_toggled_collections" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_toggled_collections_collections_order_idx" ON "_pages_v_blocks_toggled_collections_collections" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_toggled_collections_collections_parent_id_idx" ON "_pages_v_blocks_toggled_collections_collections" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_toggled_collections_order_idx" ON "_pages_v_blocks_toggled_collections" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_toggled_collections_parent_id_idx" ON "_pages_v_blocks_toggled_collections" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_toggled_collections_path_idx" ON "_pages_v_blocks_toggled_collections" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_toggled_collections_collections" CASCADE;
  DROP TABLE "pages_blocks_toggled_collections" CASCADE;
  DROP TABLE "_pages_v_blocks_toggled_collections_collections" CASCADE;
  DROP TABLE "_pages_v_blocks_toggled_collections" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_toggled_collections_collections_collection";
  DROP TYPE "public"."enum__pages_v_blocks_toggled_collections_collections_collection";`)
}
