import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_recipes_blocks_recipe_hero_container_size" AS ENUM('container', 'container-small');
  CREATE TYPE "public"."enum_tabs_container_size" AS ENUM('container', 'container-small');
  CREATE TYPE "public"."enum__recipes_v_blocks_recipe_hero_container_size" AS ENUM('container', 'container-small');
  CREATE TYPE "public"."enum__tabs_v_container_size" AS ENUM('container', 'container-small');
  ALTER TABLE "recipes_blocks_recipe_hero" ADD COLUMN "container_size" "enum_recipes_blocks_recipe_hero_container_size" DEFAULT 'container';
  ALTER TABLE "tabs" ADD COLUMN "container_size" "enum_tabs_container_size" DEFAULT 'container';
  ALTER TABLE "_recipes_v_blocks_recipe_hero" ADD COLUMN "container_size" "enum__recipes_v_blocks_recipe_hero_container_size" DEFAULT 'container';
  ALTER TABLE "_tabs_v" ADD COLUMN "container_size" "enum__tabs_v_container_size" DEFAULT 'container';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "recipes_blocks_recipe_hero" DROP COLUMN "container_size";
  ALTER TABLE "tabs" DROP COLUMN "container_size";
  ALTER TABLE "_recipes_v_blocks_recipe_hero" DROP COLUMN "container_size";
  ALTER TABLE "_tabs_v" DROP COLUMN "container_size";
  DROP TYPE "public"."enum_recipes_blocks_recipe_hero_container_size";
  DROP TYPE "public"."enum_tabs_container_size";
  DROP TYPE "public"."enum__recipes_v_blocks_recipe_hero_container_size";
  DROP TYPE "public"."enum__tabs_v_container_size";`)
}
