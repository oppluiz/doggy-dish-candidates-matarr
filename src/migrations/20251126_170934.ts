import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_hubs_blocks_slider_aspect_ratio" ADD VALUE 'aspect-[116:75]';
  ALTER TYPE "public"."enum__hubs_v_blocks_slider_aspect_ratio" ADD VALUE 'aspect-[116:75]';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "hubs_blocks_slider" ALTER COLUMN "aspect_ratio" SET DATA TYPE text;
  ALTER TABLE "hubs_blocks_slider" ALTER COLUMN "aspect_ratio" SET DEFAULT 'aspect-[1/1]'::text;
  DROP TYPE "public"."enum_hubs_blocks_slider_aspect_ratio";
  CREATE TYPE "public"."enum_hubs_blocks_slider_aspect_ratio" AS ENUM('aspect-[1/1]', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-[16/9]');
  ALTER TABLE "hubs_blocks_slider" ALTER COLUMN "aspect_ratio" SET DEFAULT 'aspect-[1/1]'::"public"."enum_hubs_blocks_slider_aspect_ratio";
  ALTER TABLE "hubs_blocks_slider" ALTER COLUMN "aspect_ratio" SET DATA TYPE "public"."enum_hubs_blocks_slider_aspect_ratio" USING "aspect_ratio"::"public"."enum_hubs_blocks_slider_aspect_ratio";
  ALTER TABLE "_hubs_v_blocks_slider" ALTER COLUMN "aspect_ratio" SET DATA TYPE text;
  ALTER TABLE "_hubs_v_blocks_slider" ALTER COLUMN "aspect_ratio" SET DEFAULT 'aspect-[1/1]'::text;
  DROP TYPE "public"."enum__hubs_v_blocks_slider_aspect_ratio";
  CREATE TYPE "public"."enum__hubs_v_blocks_slider_aspect_ratio" AS ENUM('aspect-[1/1]', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-[16/9]');
  ALTER TABLE "_hubs_v_blocks_slider" ALTER COLUMN "aspect_ratio" SET DEFAULT 'aspect-[1/1]'::"public"."enum__hubs_v_blocks_slider_aspect_ratio";
  ALTER TABLE "_hubs_v_blocks_slider" ALTER COLUMN "aspect_ratio" SET DATA TYPE "public"."enum__hubs_v_blocks_slider_aspect_ratio" USING "aspect_ratio"::"public"."enum__hubs_v_blocks_slider_aspect_ratio";`)
}
