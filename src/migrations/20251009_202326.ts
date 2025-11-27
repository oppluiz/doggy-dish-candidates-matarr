import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "how_to_blocks_how_to_sections_steps" ADD COLUMN "column_gap_px" numeric;
  ALTER TABLE "how_to_blocks_how_to_sections_steps" ADD COLUMN "tip_max_width_px" numeric;
  ALTER TABLE "how_to_blocks_how_to_sections_steps" ADD COLUMN "image_col_max_width_px" numeric;
  ALTER TABLE "_how_to_v_blocks_how_to_sections_steps" ADD COLUMN "column_gap_px" numeric;
  ALTER TABLE "_how_to_v_blocks_how_to_sections_steps" ADD COLUMN "tip_max_width_px" numeric;
  ALTER TABLE "_how_to_v_blocks_how_to_sections_steps" ADD COLUMN "image_col_max_width_px" numeric;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "how_to_blocks_how_to_sections_steps" DROP COLUMN "column_gap_px";
  ALTER TABLE "how_to_blocks_how_to_sections_steps" DROP COLUMN "tip_max_width_px";
  ALTER TABLE "how_to_blocks_how_to_sections_steps" DROP COLUMN "image_col_max_width_px";
  ALTER TABLE "_how_to_v_blocks_how_to_sections_steps" DROP COLUMN "column_gap_px";
  ALTER TABLE "_how_to_v_blocks_how_to_sections_steps" DROP COLUMN "tip_max_width_px";
  ALTER TABLE "_how_to_v_blocks_how_to_sections_steps" DROP COLUMN "image_col_max_width_px";`)
}
