import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_workshops_blocks_author_container_size" AS ENUM('container', 'container-small');
  CREATE TYPE "public"."enum__workshops_v_blocks_author_container_size" AS ENUM('container', 'container-small');
  ALTER TABLE "workshops_blocks_video_hero" ALTER COLUMN "container_size" SET DEFAULT 'container';
  ALTER TABLE "_workshops_v_blocks_video_hero" ALTER COLUMN "container_size" SET DEFAULT 'container';
  ALTER TABLE "workshops_blocks_author" ADD COLUMN "container_size" "enum_workshops_blocks_author_container_size" DEFAULT 'container';
  ALTER TABLE "_workshops_v_blocks_author" ADD COLUMN "container_size" "enum__workshops_v_blocks_author_container_size" DEFAULT 'container';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "workshops_blocks_video_hero" ALTER COLUMN "container_size" DROP DEFAULT;
  ALTER TABLE "_workshops_v_blocks_video_hero" ALTER COLUMN "container_size" DROP DEFAULT;
  ALTER TABLE "workshops_blocks_author" DROP COLUMN "container_size";
  ALTER TABLE "_workshops_v_blocks_author" DROP COLUMN "container_size";
  DROP TYPE "public"."enum_workshops_blocks_author_container_size";
  DROP TYPE "public"."enum__workshops_v_blocks_author_container_size";`)
}
