import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_featured_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_featured" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'FEATURED THIS WEEK',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_featured_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_featured" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'FEATURED THIS WEEK',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_rels" ADD COLUMN "workshops_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "ingredients_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "how_to_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "health_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "workshops_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "ingredients_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "how_to_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "health_id" integer;
  ALTER TABLE "pages_blocks_featured_items" ADD CONSTRAINT "pages_blocks_featured_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_featured"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured" ADD CONSTRAINT "pages_blocks_featured_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured_items" ADD CONSTRAINT "_pages_v_blocks_featured_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_featured"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_featured" ADD CONSTRAINT "_pages_v_blocks_featured_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_featured_items_order_idx" ON "pages_blocks_featured_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_featured_items_parent_id_idx" ON "pages_blocks_featured_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_featured_order_idx" ON "pages_blocks_featured" USING btree ("_order");
  CREATE INDEX "pages_blocks_featured_parent_id_idx" ON "pages_blocks_featured" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_featured_path_idx" ON "pages_blocks_featured" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_featured_items_order_idx" ON "_pages_v_blocks_featured_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_featured_items_parent_id_idx" ON "_pages_v_blocks_featured_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_featured_order_idx" ON "_pages_v_blocks_featured" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_featured_parent_id_idx" ON "_pages_v_blocks_featured" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_featured_path_idx" ON "_pages_v_blocks_featured" USING btree ("_path");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_workshops_fk" FOREIGN KEY ("workshops_id") REFERENCES "public"."workshops"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_ingredients_fk" FOREIGN KEY ("ingredients_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_how_to_fk" FOREIGN KEY ("how_to_id") REFERENCES "public"."how_to"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_health_fk" FOREIGN KEY ("health_id") REFERENCES "public"."health"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_workshops_fk" FOREIGN KEY ("workshops_id") REFERENCES "public"."workshops"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_ingredients_fk" FOREIGN KEY ("ingredients_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_how_to_fk" FOREIGN KEY ("how_to_id") REFERENCES "public"."how_to"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_health_fk" FOREIGN KEY ("health_id") REFERENCES "public"."health"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_workshops_id_idx" ON "pages_rels" USING btree ("workshops_id");
  CREATE INDEX "pages_rels_ingredients_id_idx" ON "pages_rels" USING btree ("ingredients_id");
  CREATE INDEX "pages_rels_how_to_id_idx" ON "pages_rels" USING btree ("how_to_id");
  CREATE INDEX "pages_rels_health_id_idx" ON "pages_rels" USING btree ("health_id");
  CREATE INDEX "_pages_v_rels_workshops_id_idx" ON "_pages_v_rels" USING btree ("workshops_id");
  CREATE INDEX "_pages_v_rels_ingredients_id_idx" ON "_pages_v_rels" USING btree ("ingredients_id");
  CREATE INDEX "_pages_v_rels_how_to_id_idx" ON "_pages_v_rels" USING btree ("how_to_id");
  CREATE INDEX "_pages_v_rels_health_id_idx" ON "_pages_v_rels" USING btree ("health_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_featured_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_featured" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_featured_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_featured" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_featured_items" CASCADE;
  DROP TABLE "pages_blocks_featured" CASCADE;
  DROP TABLE "_pages_v_blocks_featured_items" CASCADE;
  DROP TABLE "_pages_v_blocks_featured" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_workshops_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_ingredients_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_how_to_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_health_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_workshops_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_ingredients_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_how_to_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_health_fk";
  
  DROP INDEX "pages_rels_workshops_id_idx";
  DROP INDEX "pages_rels_ingredients_id_idx";
  DROP INDEX "pages_rels_how_to_id_idx";
  DROP INDEX "pages_rels_health_id_idx";
  DROP INDEX "_pages_v_rels_workshops_id_idx";
  DROP INDEX "_pages_v_rels_ingredients_id_idx";
  DROP INDEX "_pages_v_rels_how_to_id_idx";
  DROP INDEX "_pages_v_rels_health_id_idx";
  ALTER TABLE "pages_rels" DROP COLUMN "workshops_id";
  ALTER TABLE "pages_rels" DROP COLUMN "ingredients_id";
  ALTER TABLE "pages_rels" DROP COLUMN "how_to_id";
  ALTER TABLE "pages_rels" DROP COLUMN "health_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "workshops_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "ingredients_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "how_to_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "health_id";`)
}
