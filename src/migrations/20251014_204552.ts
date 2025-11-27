import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "food" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "food" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "food" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "_food_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_food_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "_food_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "how_to" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "how_to" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "how_to" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "_how_to_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_how_to_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "_how_to_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "health" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "health" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "health" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "_health_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_health_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "_health_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "food" ADD CONSTRAINT "food_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_food_v" ADD CONSTRAINT "_food_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "how_to" ADD CONSTRAINT "how_to_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_how_to_v" ADD CONSTRAINT "_how_to_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "health" ADD CONSTRAINT "health_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_health_v" ADD CONSTRAINT "_health_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "food_meta_meta_image_idx" ON "food" USING btree ("meta_image_id");
  CREATE INDEX "_food_v_version_meta_version_meta_image_idx" ON "_food_v" USING btree ("version_meta_image_id");
  CREATE INDEX "how_to_meta_meta_image_idx" ON "how_to" USING btree ("meta_image_id");
  CREATE INDEX "_how_to_v_version_meta_version_meta_image_idx" ON "_how_to_v" USING btree ("version_meta_image_id");
  CREATE INDEX "health_meta_meta_image_idx" ON "health" USING btree ("meta_image_id");
  CREATE INDEX "_health_v_version_meta_version_meta_image_idx" ON "_health_v" USING btree ("version_meta_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "food" DROP CONSTRAINT "food_meta_image_id_media_id_fk";
  
  ALTER TABLE "_food_v" DROP CONSTRAINT "_food_v_version_meta_image_id_media_id_fk";
  
  ALTER TABLE "how_to" DROP CONSTRAINT "how_to_meta_image_id_media_id_fk";
  
  ALTER TABLE "_how_to_v" DROP CONSTRAINT "_how_to_v_version_meta_image_id_media_id_fk";
  
  ALTER TABLE "health" DROP CONSTRAINT "health_meta_image_id_media_id_fk";
  
  ALTER TABLE "_health_v" DROP CONSTRAINT "_health_v_version_meta_image_id_media_id_fk";
  
  DROP INDEX "food_meta_meta_image_idx";
  DROP INDEX "_food_v_version_meta_version_meta_image_idx";
  DROP INDEX "how_to_meta_meta_image_idx";
  DROP INDEX "_how_to_v_version_meta_version_meta_image_idx";
  DROP INDEX "health_meta_meta_image_idx";
  DROP INDEX "_health_v_version_meta_version_meta_image_idx";
  ALTER TABLE "food" DROP COLUMN "meta_title";
  ALTER TABLE "food" DROP COLUMN "meta_image_id";
  ALTER TABLE "food" DROP COLUMN "meta_description";
  ALTER TABLE "_food_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_food_v" DROP COLUMN "version_meta_image_id";
  ALTER TABLE "_food_v" DROP COLUMN "version_meta_description";
  ALTER TABLE "how_to" DROP COLUMN "meta_title";
  ALTER TABLE "how_to" DROP COLUMN "meta_image_id";
  ALTER TABLE "how_to" DROP COLUMN "meta_description";
  ALTER TABLE "_how_to_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_how_to_v" DROP COLUMN "version_meta_image_id";
  ALTER TABLE "_how_to_v" DROP COLUMN "version_meta_description";
  ALTER TABLE "health" DROP COLUMN "meta_title";
  ALTER TABLE "health" DROP COLUMN "meta_image_id";
  ALTER TABLE "health" DROP COLUMN "meta_description";
  ALTER TABLE "_health_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_health_v" DROP COLUMN "version_meta_image_id";
  ALTER TABLE "_health_v" DROP COLUMN "version_meta_description";`)
}
