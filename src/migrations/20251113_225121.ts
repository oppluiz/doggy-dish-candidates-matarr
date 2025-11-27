import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "how_to_blocks_how_to_sections_steps" ADD COLUMN "mobile_image_id" integer;
  ALTER TABLE "_how_to_v_blocks_how_to_sections_steps" ADD COLUMN "mobile_image_id" integer;
  ALTER TABLE "how_to_blocks_how_to_sections_steps" ADD CONSTRAINT "how_to_blocks_how_to_sections_steps_mobile_image_id_media_id_fk" FOREIGN KEY ("mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_how_to_v_blocks_how_to_sections_steps" ADD CONSTRAINT "_how_to_v_blocks_how_to_sections_steps_mobile_image_id_media_id_fk" FOREIGN KEY ("mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "how_to_blocks_how_to_sections_steps_mobile_image_idx" ON "how_to_blocks_how_to_sections_steps" USING btree ("mobile_image_id");
  CREATE INDEX "_how_to_v_blocks_how_to_sections_steps_mobile_image_idx" ON "_how_to_v_blocks_how_to_sections_steps" USING btree ("mobile_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "how_to_blocks_how_to_sections_steps" DROP CONSTRAINT "how_to_blocks_how_to_sections_steps_mobile_image_id_media_id_fk";
  
  ALTER TABLE "_how_to_v_blocks_how_to_sections_steps" DROP CONSTRAINT "_how_to_v_blocks_how_to_sections_steps_mobile_image_id_media_id_fk";
  
  DROP INDEX "how_to_blocks_how_to_sections_steps_mobile_image_idx";
  DROP INDEX "_how_to_v_blocks_how_to_sections_steps_mobile_image_idx";
  ALTER TABLE "how_to_blocks_how_to_sections_steps" DROP COLUMN "mobile_image_id";
  ALTER TABLE "_how_to_v_blocks_how_to_sections_steps" DROP COLUMN "mobile_image_id";`)
}
