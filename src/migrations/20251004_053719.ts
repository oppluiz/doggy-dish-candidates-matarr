import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "workshops" ADD COLUMN "hero_video_url" varchar;
  ALTER TABLE "workshops" ADD COLUMN "hero_thumbnail_id" integer;
  ALTER TABLE "_workshops_v" ADD COLUMN "version_hero_video_url" varchar;
  ALTER TABLE "_workshops_v" ADD COLUMN "version_hero_thumbnail_id" integer;
  ALTER TABLE "workshops" ADD CONSTRAINT "workshops_hero_thumbnail_id_media_id_fk" FOREIGN KEY ("hero_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_workshops_v" ADD CONSTRAINT "_workshops_v_version_hero_thumbnail_id_media_id_fk" FOREIGN KEY ("version_hero_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "workshops_hero_hero_thumbnail_idx" ON "workshops" USING btree ("hero_thumbnail_id");
  CREATE INDEX "_workshops_v_version_hero_version_hero_thumbnail_idx" ON "_workshops_v" USING btree ("version_hero_thumbnail_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "workshops" DROP CONSTRAINT "workshops_hero_thumbnail_id_media_id_fk";
  
  ALTER TABLE "_workshops_v" DROP CONSTRAINT "_workshops_v_version_hero_thumbnail_id_media_id_fk";
  
  DROP INDEX "workshops_hero_hero_thumbnail_idx";
  DROP INDEX "_workshops_v_version_hero_version_hero_thumbnail_idx";
  ALTER TABLE "workshops" DROP COLUMN "hero_video_url";
  ALTER TABLE "workshops" DROP COLUMN "hero_thumbnail_id";
  ALTER TABLE "_workshops_v" DROP COLUMN "version_hero_video_url";
  ALTER TABLE "_workshops_v" DROP COLUMN "version_hero_thumbnail_id";`)
}
