import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_workshops_blocks_video_hero_container_size" AS ENUM('container', 'container-small');
  CREATE TYPE "public"."enum__workshops_v_blocks_video_hero_container_size" AS ENUM('container', 'container-small');
  ALTER TABLE "workshops_blocks_video_hero" ADD COLUMN "container_size" "enum_workshops_blocks_video_hero_container_size";
  ALTER TABLE "_workshops_v_blocks_video_hero" ADD COLUMN "container_size" "enum__workshops_v_blocks_video_hero_container_size";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "workshops_blocks_video_hero" DROP COLUMN "container_size";
  ALTER TABLE "_workshops_v_blocks_video_hero" DROP COLUMN "container_size";
  DROP TYPE "public"."enum_workshops_blocks_video_hero_container_size";
  DROP TYPE "public"."enum__workshops_v_blocks_video_hero_container_size";`)
}
