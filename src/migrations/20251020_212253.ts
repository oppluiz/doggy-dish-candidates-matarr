import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_recipes_blocks_recipe_hero_who_is_this_for_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__recipes_v_blocks_recipe_hero_who_is_this_for_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "recipes_blocks_recipe_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"heading" varchar,
  	"who_is_this_for_text" varchar,
  	"who_is_this_for_link_type" "enum_recipes_blocks_recipe_hero_who_is_this_for_link_type" DEFAULT 'reference',
  	"who_is_this_for_link_new_tab" boolean,
  	"who_is_this_for_link_url" varchar,
  	"who_is_this_for_link_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_recipes_v_blocks_recipe_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"heading" varchar,
  	"who_is_this_for_text" varchar,
  	"who_is_this_for_link_type" "enum__recipes_v_blocks_recipe_hero_who_is_this_for_link_type" DEFAULT 'reference',
  	"who_is_this_for_link_new_tab" boolean,
  	"who_is_this_for_link_url" varchar,
  	"who_is_this_for_link_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "recipes_blocks_recipe_hero" ADD CONSTRAINT "recipes_blocks_recipe_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "recipes_blocks_recipe_hero" ADD CONSTRAINT "recipes_blocks_recipe_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recipes_v_blocks_recipe_hero" ADD CONSTRAINT "_recipes_v_blocks_recipe_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_recipes_v_blocks_recipe_hero" ADD CONSTRAINT "_recipes_v_blocks_recipe_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recipes_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "recipes_blocks_recipe_hero_order_idx" ON "recipes_blocks_recipe_hero" USING btree ("_order");
  CREATE INDEX "recipes_blocks_recipe_hero_parent_id_idx" ON "recipes_blocks_recipe_hero" USING btree ("_parent_id");
  CREATE INDEX "recipes_blocks_recipe_hero_path_idx" ON "recipes_blocks_recipe_hero" USING btree ("_path");
  CREATE INDEX "recipes_blocks_recipe_hero_image_idx" ON "recipes_blocks_recipe_hero" USING btree ("image_id");
  CREATE INDEX "_recipes_v_blocks_recipe_hero_order_idx" ON "_recipes_v_blocks_recipe_hero" USING btree ("_order");
  CREATE INDEX "_recipes_v_blocks_recipe_hero_parent_id_idx" ON "_recipes_v_blocks_recipe_hero" USING btree ("_parent_id");
  CREATE INDEX "_recipes_v_blocks_recipe_hero_path_idx" ON "_recipes_v_blocks_recipe_hero" USING btree ("_path");
  CREATE INDEX "_recipes_v_blocks_recipe_hero_image_idx" ON "_recipes_v_blocks_recipe_hero" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "recipes_blocks_recipe_hero" CASCADE;
  DROP TABLE "_recipes_v_blocks_recipe_hero" CASCADE;
  DROP TYPE "public"."enum_recipes_blocks_recipe_hero_who_is_this_for_link_type";
  DROP TYPE "public"."enum__recipes_v_blocks_recipe_hero_who_is_this_for_link_type";`)
}
