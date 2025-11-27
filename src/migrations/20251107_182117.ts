import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_hubs_blocks_hub_hero_container_size" AS ENUM('container', 'container-small');
  CREATE TYPE "public"."enum__hubs_v_blocks_hub_hero_container_size" AS ENUM('container', 'container-small');
  CREATE TABLE "hubs_blocks_hub_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"container_size" "enum_hubs_blocks_hub_hero_container_size" DEFAULT 'container',
  	"background_color" varchar DEFAULT '#41A690',
  	"heading" varchar DEFAULT 'Food Hub',
  	"subheading" varchar DEFAULT 'Science-backed nutrition for your dog''s best life',
  	"search_placeholder" varchar DEFAULT 'Search ingredients, diets, recipes, and more',
  	"block_name" varchar
  );
  
  CREATE TABLE "_hubs_v_blocks_hub_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"container_size" "enum__hubs_v_blocks_hub_hero_container_size" DEFAULT 'container',
  	"background_color" varchar DEFAULT '#41A690',
  	"heading" varchar DEFAULT 'Food Hub',
  	"subheading" varchar DEFAULT 'Science-backed nutrition for your dog''s best life',
  	"search_placeholder" varchar DEFAULT 'Search ingredients, diets, recipes, and more',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "sub_hubs" ADD COLUMN "hub_id" integer;
  ALTER TABLE "_sub_hubs_v" ADD COLUMN "version_hub_id" integer;
  ALTER TABLE "hubs_blocks_hub_hero" ADD CONSTRAINT "hubs_blocks_hub_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hubs_v_blocks_hub_hero" ADD CONSTRAINT "_hubs_v_blocks_hub_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "hubs_blocks_hub_hero_order_idx" ON "hubs_blocks_hub_hero" USING btree ("_order");
  CREATE INDEX "hubs_blocks_hub_hero_parent_id_idx" ON "hubs_blocks_hub_hero" USING btree ("_parent_id");
  CREATE INDEX "hubs_blocks_hub_hero_path_idx" ON "hubs_blocks_hub_hero" USING btree ("_path");
  CREATE INDEX "_hubs_v_blocks_hub_hero_order_idx" ON "_hubs_v_blocks_hub_hero" USING btree ("_order");
  CREATE INDEX "_hubs_v_blocks_hub_hero_parent_id_idx" ON "_hubs_v_blocks_hub_hero" USING btree ("_parent_id");
  CREATE INDEX "_hubs_v_blocks_hub_hero_path_idx" ON "_hubs_v_blocks_hub_hero" USING btree ("_path");
  ALTER TABLE "sub_hubs" ADD CONSTRAINT "sub_hubs_hub_id_hubs_id_fk" FOREIGN KEY ("hub_id") REFERENCES "public"."hubs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sub_hubs_v" ADD CONSTRAINT "_sub_hubs_v_version_hub_id_hubs_id_fk" FOREIGN KEY ("version_hub_id") REFERENCES "public"."hubs"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "sub_hubs_hub_idx" ON "sub_hubs" USING btree ("hub_id");
  CREATE INDEX "_sub_hubs_v_version_version_hub_idx" ON "_sub_hubs_v" USING btree ("version_hub_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "hubs_blocks_hub_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_hubs_v_blocks_hub_hero" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "hubs_blocks_hub_hero" CASCADE;
  DROP TABLE "_hubs_v_blocks_hub_hero" CASCADE;
  ALTER TABLE "sub_hubs" DROP CONSTRAINT "sub_hubs_hub_id_hubs_id_fk";
  
  ALTER TABLE "_sub_hubs_v" DROP CONSTRAINT "_sub_hubs_v_version_hub_id_hubs_id_fk";
  
  DROP INDEX "sub_hubs_hub_idx";
  DROP INDEX "_sub_hubs_v_version_version_hub_idx";
  ALTER TABLE "sub_hubs" DROP COLUMN "hub_id";
  ALTER TABLE "_sub_hubs_v" DROP COLUMN "version_hub_id";
  DROP TYPE "public"."enum_hubs_blocks_hub_hero_container_size";
  DROP TYPE "public"."enum__hubs_v_blocks_hub_hero_container_size";`)
}
