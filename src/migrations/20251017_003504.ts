import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sub_hubs" DROP CONSTRAINT "sub_hubs_category_id_categories_id_fk";
  
  ALTER TABLE "_sub_hubs_v" DROP CONSTRAINT "_sub_hubs_v_version_category_id_categories_id_fk";
  
  DROP INDEX "sub_hubs_category_idx";
  DROP INDEX "_sub_hubs_v_version_version_category_idx";
  ALTER TABLE "sub_hubs" DROP COLUMN "category_id";
  ALTER TABLE "_sub_hubs_v" DROP COLUMN "version_category_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sub_hubs" ADD COLUMN "category_id" integer;
  ALTER TABLE "_sub_hubs_v" ADD COLUMN "version_category_id" integer;
  ALTER TABLE "sub_hubs" ADD CONSTRAINT "sub_hubs_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sub_hubs_v" ADD CONSTRAINT "_sub_hubs_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "sub_hubs_category_idx" ON "sub_hubs" USING btree ("category_id");
  CREATE INDEX "_sub_hubs_v_version_version_category_idx" ON "_sub_hubs_v" USING btree ("version_category_id");`)
}
