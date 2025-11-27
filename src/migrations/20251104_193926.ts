import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."tbl_overflow" AS ENUM('default', 'overflow');
  ALTER TABLE "sects" ADD COLUMN "table_overflow" "tbl_overflow" DEFAULT 'default';
  ALTER TABLE "_sects_v" ADD COLUMN "table_overflow" "tbl_overflow" DEFAULT 'default';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sects" DROP COLUMN "table_overflow";
  ALTER TABLE "_sects_v" DROP COLUMN "table_overflow";
  DROP TYPE "public"."tbl_overflow";`)
}
