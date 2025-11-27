import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "workshops" DROP CONSTRAINT "workshops_hero_image_id_media_id_fk";
  
  ALTER TABLE "_workshops_v" DROP CONSTRAINT "_workshops_v_version_hero_image_id_media_id_fk";
  
  DROP INDEX "workshops_hero_image_idx";
  DROP INDEX "_workshops_v_version_version_hero_image_idx";
  ALTER TABLE "header" ADD COLUMN "logo_id" integer;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  ALTER TABLE "workshops" DROP COLUMN "hero_image_id";
  ALTER TABLE "_workshops_v" DROP COLUMN "version_hero_image_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header" DROP CONSTRAINT "header_logo_id_media_id_fk";
  
  DROP INDEX "header_logo_idx";
  ALTER TABLE "workshops" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "_workshops_v" ADD COLUMN "version_hero_image_id" integer;
  ALTER TABLE "workshops" ADD CONSTRAINT "workshops_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_workshops_v" ADD CONSTRAINT "_workshops_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "workshops_hero_image_idx" ON "workshops" USING btree ("hero_image_id");
  CREATE INDEX "_workshops_v_version_version_hero_image_idx" ON "_workshops_v" USING btree ("version_hero_image_id");
  ALTER TABLE "header" DROP COLUMN "logo_id";`)
}
