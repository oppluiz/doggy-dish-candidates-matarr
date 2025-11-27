import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_how_to_blocks_how_to_sections_steps_columns_proportion" AS ENUM('6-6', '8-4');
  CREATE TYPE "public"."enum__how_to_v_blocks_how_to_sections_steps_columns_proportion" AS ENUM('6-6', '8-4');
  ALTER TABLE "how_to_blocks_how_to_sections_steps" ADD COLUMN "columns_proportion" "enum_how_to_blocks_how_to_sections_steps_columns_proportion" DEFAULT '6-6';
  ALTER TABLE "_how_to_v_blocks_how_to_sections_steps" ADD COLUMN "columns_proportion" "enum__how_to_v_blocks_how_to_sections_steps_columns_proportion" DEFAULT '6-6';
  ALTER TABLE "how_to_blocks_how_to_sections_steps" DROP COLUMN "column_gap_px";
  ALTER TABLE "how_to_blocks_how_to_sections_steps" DROP COLUMN "image_col_max_width_px";
  ALTER TABLE "_how_to_v_blocks_how_to_sections_steps" DROP COLUMN "column_gap_px";
  ALTER TABLE "_how_to_v_blocks_how_to_sections_steps" DROP COLUMN "image_col_max_width_px";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "how_to_blocks_how_to_sections_steps" ADD COLUMN "column_gap_px" numeric;
  ALTER TABLE "how_to_blocks_how_to_sections_steps" ADD COLUMN "image_col_max_width_px" numeric;
  ALTER TABLE "_how_to_v_blocks_how_to_sections_steps" ADD COLUMN "column_gap_px" numeric;
  ALTER TABLE "_how_to_v_blocks_how_to_sections_steps" ADD COLUMN "image_col_max_width_px" numeric;
  ALTER TABLE "how_to_blocks_how_to_sections_steps" DROP COLUMN "columns_proportion";
  ALTER TABLE "_how_to_v_blocks_how_to_sections_steps" DROP COLUMN "columns_proportion";
  DROP TYPE "public"."enum_how_to_blocks_how_to_sections_steps_columns_proportion";
  DROP TYPE "public"."enum__how_to_v_blocks_how_to_sections_steps_columns_proportion";`)
}
