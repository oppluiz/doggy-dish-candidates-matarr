import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "how_to_blocks_how_to_sections_steps" ALTER COLUMN "columns_proportion" SET DEFAULT '8-4';
  ALTER TABLE "_how_to_v_blocks_how_to_sections_steps" ALTER COLUMN "columns_proportion" SET DEFAULT '8-4';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "how_to_blocks_how_to_sections_steps" ALTER COLUMN "columns_proportion" SET DEFAULT '6-6';
  ALTER TABLE "_how_to_v_blocks_how_to_sections_steps" ALTER COLUMN "columns_proportion" SET DEFAULT '6-6';`)
}
