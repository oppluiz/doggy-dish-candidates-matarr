import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_food_blocks_references_container_size" AS ENUM('container', 'container-small');
  CREATE TYPE "public"."enum__food_v_blocks_references_container_size" AS ENUM('container', 'container-small');
  CREATE TYPE "public"."enum_recipes_blocks_references_container_size" AS ENUM('container', 'container-small');
  CREATE TYPE "public"."enum__recipes_v_blocks_references_container_size" AS ENUM('container', 'container-small');
  ALTER TABLE "food_blocks_references" ADD COLUMN "container_size" "enum_food_blocks_references_container_size" DEFAULT 'container';
  ALTER TABLE "_food_v_blocks_references" ADD COLUMN "container_size" "enum__food_v_blocks_references_container_size" DEFAULT 'container';
  ALTER TABLE "recipes_blocks_references" ADD COLUMN "container_size" "enum_recipes_blocks_references_container_size" DEFAULT 'container';
  ALTER TABLE "_recipes_v_blocks_references" ADD COLUMN "container_size" "enum__recipes_v_blocks_references_container_size" DEFAULT 'container';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "food_blocks_references" DROP COLUMN "container_size";
  ALTER TABLE "_food_v_blocks_references" DROP COLUMN "container_size";
  ALTER TABLE "recipes_blocks_references" DROP COLUMN "container_size";
  ALTER TABLE "_recipes_v_blocks_references" DROP COLUMN "container_size";
  DROP TYPE "public"."enum_food_blocks_references_container_size";
  DROP TYPE "public"."enum__food_v_blocks_references_container_size";
  DROP TYPE "public"."enum_recipes_blocks_references_container_size";
  DROP TYPE "public"."enum__recipes_v_blocks_references_container_size";`)
}
