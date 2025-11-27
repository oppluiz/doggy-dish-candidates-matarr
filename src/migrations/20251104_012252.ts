import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Update existing data to the new proportion
    UPDATE "how_to_blocks_how_to_sections_steps"
      SET "columns_proportion" = '7-5'
      WHERE "columns_proportion" = '8-4';

    UPDATE "_how_to_v_blocks_how_to_sections_steps"
      SET "columns_proportion" = '7-5'
      WHERE "columns_proportion" = '8-4';

    -- Set default to '7-5'
    ALTER TABLE "how_to_blocks_how_to_sections_steps"
      ALTER COLUMN "columns_proportion"
      SET DEFAULT '7-5'::"public"."enum_how_to_blocks_how_to_sections_steps_columns_proportion";

    ALTER TABLE "_how_to_v_blocks_how_to_sections_steps"
      ALTER COLUMN "columns_proportion"
      SET DEFAULT '7-5'::"public"."enum__how_to_v_blocks_how_to_sections_steps_columns_proportion";
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Restore default and data back to '8-4'
    ALTER TABLE "how_to_blocks_how_to_sections_steps"
      ALTER COLUMN "columns_proportion"
      SET DEFAULT '8-4'::"public"."enum_how_to_blocks_how_to_sections_steps_columns_proportion";

    ALTER TABLE "_how_to_v_blocks_how_to_sections_steps"
      ALTER COLUMN "columns_proportion"
      SET DEFAULT '8-4'::"public"."enum__how_to_v_blocks_how_to_sections_steps_columns_proportion";

    UPDATE "how_to_blocks_how_to_sections_steps"
      SET "columns_proportion" = '8-4'
      WHERE "columns_proportion" = '7-5';

    UPDATE "_how_to_v_blocks_how_to_sections_steps"
      SET "columns_proportion" = '8-4'
      WHERE "columns_proportion" = '7-5';
  `)
}
