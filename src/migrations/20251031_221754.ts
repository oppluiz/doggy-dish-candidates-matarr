import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "workshops_blocks_video_hero" ALTER COLUMN "container_size" SET DATA TYPE text;
  ALTER TABLE "workshops_blocks_video_hero" ALTER COLUMN "container_size" SET DEFAULT 'container'::text;
  DROP TYPE "public"."enum_workshops_blocks_video_hero_container_size";
  CREATE TYPE "public"."enum_workshops_blocks_video_hero_container_size" AS ENUM('container', 'container-small');
  ALTER TABLE "workshops_blocks_video_hero" ALTER COLUMN "container_size" SET DEFAULT 'container'::"public"."enum_workshops_blocks_video_hero_container_size";
  ALTER TABLE "workshops_blocks_video_hero" ALTER COLUMN "container_size" SET DATA TYPE "public"."enum_workshops_blocks_video_hero_container_size" USING "container_size"::"public"."enum_workshops_blocks_video_hero_container_size";
  ALTER TABLE "_workshops_v_blocks_video_hero" ALTER COLUMN "container_size" SET DATA TYPE text;
  ALTER TABLE "_workshops_v_blocks_video_hero" ALTER COLUMN "container_size" SET DEFAULT 'container'::text;
  DROP TYPE "public"."enum__workshops_v_blocks_video_hero_container_size";
  CREATE TYPE "public"."enum__workshops_v_blocks_video_hero_container_size" AS ENUM('container', 'container-small');
  ALTER TABLE "_workshops_v_blocks_video_hero" ALTER COLUMN "container_size" SET DEFAULT 'container'::"public"."enum__workshops_v_blocks_video_hero_container_size";
  ALTER TABLE "_workshops_v_blocks_video_hero" ALTER COLUMN "container_size" SET DATA TYPE "public"."enum__workshops_v_blocks_video_hero_container_size" USING "container_size"::"public"."enum__workshops_v_blocks_video_hero_container_size";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "workshops_blocks_video_hero" ALTER COLUMN "container_size" SET DATA TYPE text;
  ALTER TABLE "workshops_blocks_video_hero" ALTER COLUMN "container_size" SET DEFAULT 'container'::text;
  DROP TYPE "public"."enum_workshops_blocks_video_hero_container_size";
  CREATE TYPE "public"."enum_workshops_blocks_video_hero_container_size" AS ENUM('container', 'container-smalls');
  ALTER TABLE "workshops_blocks_video_hero" ALTER COLUMN "container_size" SET DEFAULT 'container'::"public"."enum_workshops_blocks_video_hero_container_size";
  ALTER TABLE "workshops_blocks_video_hero" ALTER COLUMN "container_size" SET DATA TYPE "public"."enum_workshops_blocks_video_hero_container_size" USING "container_size"::"public"."enum_workshops_blocks_video_hero_container_size";
  ALTER TABLE "_workshops_v_blocks_video_hero" ALTER COLUMN "container_size" SET DATA TYPE text;
  ALTER TABLE "_workshops_v_blocks_video_hero" ALTER COLUMN "container_size" SET DEFAULT 'container'::text;
  DROP TYPE "public"."enum__workshops_v_blocks_video_hero_container_size";
  CREATE TYPE "public"."enum__workshops_v_blocks_video_hero_container_size" AS ENUM('container', 'container-smalls');
  ALTER TABLE "_workshops_v_blocks_video_hero" ALTER COLUMN "container_size" SET DEFAULT 'container'::"public"."enum__workshops_v_blocks_video_hero_container_size";
  ALTER TABLE "_workshops_v_blocks_video_hero" ALTER COLUMN "container_size" SET DATA TYPE "public"."enum__workshops_v_blocks_video_hero_container_size" USING "container_size"::"public"."enum__workshops_v_blocks_video_hero_container_size";`)
}
