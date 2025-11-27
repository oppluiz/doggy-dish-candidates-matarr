import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "food_blocks_references" ADD COLUMN "width_constraint" boolean DEFAULT false;
  ALTER TABLE "_food_v_blocks_references" ADD COLUMN "width_constraint" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "food_blocks_references" DROP COLUMN "width_constraint";
  ALTER TABLE "_food_v_blocks_references" DROP COLUMN "width_constraint";`)
}
