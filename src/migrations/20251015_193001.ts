import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "how_to_blocks_how_to_sections_steps" ADD COLUMN "use_list_indentation" boolean DEFAULT false;
  ALTER TABLE "_how_to_v_blocks_how_to_sections_steps" ADD COLUMN "use_list_indentation" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "how_to_blocks_how_to_sections_steps" DROP COLUMN "use_list_indentation";
  ALTER TABLE "_how_to_v_blocks_how_to_sections_steps" DROP COLUMN "use_list_indentation";`)
}
