import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TYPE "public"."enum_how_to_blocks_how_to_sections_steps_columns_proportion" ADD VALUE IF NOT EXISTS '7-5';
    ALTER TYPE "public"."enum__how_to_v_blocks_how_to_sections_steps_columns_proportion" ADD VALUE IF NOT EXISTS '7-5';
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   -- Convert columns to text to allow dropping and recreating enums
  ALTER TABLE "how_to_blocks_how_to_sections_steps" ALTER COLUMN "columns_proportion" SET DATA TYPE text;
  ALTER TABLE "_how_to_v_blocks_how_to_sections_steps" ALTER COLUMN "columns_proportion" SET DATA TYPE text;

  -- Revert data back to '8-4' where '7-5' was set
  UPDATE "how_to_blocks_how_to_sections_steps" SET "columns_proportion" = '8-4' WHERE "columns_proportion" = '7-5';
  UPDATE "_how_to_v_blocks_how_to_sections_steps" SET "columns_proportion" = '8-4' WHERE "columns_proportion" = '7-5';

  -- Recreate enums without '7-5'
  DROP TYPE "public"."enum_how_to_blocks_how_to_sections_steps_columns_proportion";
  CREATE TYPE "public"."enum_how_to_blocks_how_to_sections_steps_columns_proportion" AS ENUM('6-6', '8-4');
  DROP TYPE "public"."enum__how_to_v_blocks_how_to_sections_steps_columns_proportion";
  CREATE TYPE "public"."enum__how_to_v_blocks_how_to_sections_steps_columns_proportion" AS ENUM('6-6', '8-4');

  -- Convert columns back to enum and restore default to '8-4'
  ALTER TABLE "how_to_blocks_how_to_sections_steps" ALTER COLUMN "columns_proportion" SET DEFAULT '8-4'::"public"."enum_how_to_blocks_how_to_sections_steps_columns_proportion";
  ALTER TABLE "how_to_blocks_how_to_sections_steps" ALTER COLUMN "columns_proportion" SET DATA TYPE "public"."enum_how_to_blocks_how_to_sections_steps_columns_proportion" USING "columns_proportion"::"public"."enum_how_to_blocks_how_to_sections_steps_columns_proportion";

  ALTER TABLE "_how_to_v_blocks_how_to_sections_steps" ALTER COLUMN "columns_proportion" SET DEFAULT '8-4'::"public"."enum__how_to_v_blocks_how_to_sections_steps_columns_proportion";
  ALTER TABLE "_how_to_v_blocks_how_to_sections_steps" ALTER COLUMN "columns_proportion" SET DATA TYPE "public"."enum__how_to_v_blocks_how_to_sections_steps_columns_proportion" USING "columns_proportion"::"public"."enum__how_to_v_blocks_how_to_sections_steps_columns_proportion";`)
}
