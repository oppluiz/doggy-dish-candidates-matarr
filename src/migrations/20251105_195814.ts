import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_workshops_blocks_author_display_mode" AS ENUM('default', 'recipe');
  CREATE TYPE "public"."enum__workshops_v_blocks_author_display_mode" AS ENUM('default', 'recipe');
  CREATE TYPE "public"."enum_recipes_blocks_author_display_mode" AS ENUM('default', 'recipe');
  CREATE TYPE "public"."enum__recipes_v_blocks_author_display_mode" AS ENUM('default', 'recipe');
  ALTER TABLE "workshops_blocks_author" ADD COLUMN "display_mode" "enum_workshops_blocks_author_display_mode" DEFAULT 'default';
  ALTER TABLE "_workshops_v_blocks_author" ADD COLUMN "display_mode" "enum__workshops_v_blocks_author_display_mode" DEFAULT 'default';
  ALTER TABLE "recipes_blocks_author" ADD COLUMN "display_mode" "enum_recipes_blocks_author_display_mode" DEFAULT 'default';
  ALTER TABLE "_recipes_v_blocks_author" ADD COLUMN "display_mode" "enum__recipes_v_blocks_author_display_mode" DEFAULT 'default';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "workshops_blocks_author" DROP COLUMN "display_mode";
  ALTER TABLE "_workshops_v_blocks_author" DROP COLUMN "display_mode";
  ALTER TABLE "recipes_blocks_author" DROP COLUMN "display_mode";
  ALTER TABLE "_recipes_v_blocks_author" DROP COLUMN "display_mode";
  DROP TYPE "public"."enum_workshops_blocks_author_display_mode";
  DROP TYPE "public"."enum__workshops_v_blocks_author_display_mode";
  DROP TYPE "public"."enum_recipes_blocks_author_display_mode";
  DROP TYPE "public"."enum__recipes_v_blocks_author_display_mode";`)
}
