import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   -- First, clean up any invalid data by setting it to 'container' (the only currently valid enum value)
  UPDATE "workshops_blocks_video_hero" SET "container_size" = 'container' WHERE "container_size" NOT IN ('container');
  UPDATE "_workshops_v_blocks_video_hero" SET "container_size" = 'container' WHERE "container_size" NOT IN ('container');
  
  -- Convert columns to text temporarily
  ALTER TABLE "workshops_blocks_video_hero" ALTER COLUMN "container_size" SET DATA TYPE text;
  ALTER TABLE "workshops_blocks_video_hero" ALTER COLUMN "container_size" SET DEFAULT 'container'::text;
  ALTER TABLE "_workshops_v_blocks_video_hero" ALTER COLUMN "container_size" SET DATA TYPE text;
  ALTER TABLE "_workshops_v_blocks_video_hero" ALTER COLUMN "container_size" SET DEFAULT 'container'::text;
  
  -- Drop existing enum types if they exist
  DROP TYPE IF EXISTS "public"."enum_workshops_blocks_video_hero_container_size";
  DROP TYPE IF EXISTS "public"."enum__workshops_v_blocks_video_hero_container_size";
  
  -- Create new enum types with correct values
  CREATE TYPE "public"."enum_workshops_blocks_video_hero_container_size" AS ENUM('container', 'container-small');
  CREATE TYPE "public"."enum__workshops_v_blocks_video_hero_container_size" AS ENUM('container', 'container-small');
  
  -- Convert columns back to enum type
  ALTER TABLE "workshops_blocks_video_hero" ALTER COLUMN "container_size" SET DEFAULT 'container'::"public"."enum_workshops_blocks_video_hero_container_size";
  ALTER TABLE "workshops_blocks_video_hero" ALTER COLUMN "container_size" SET DATA TYPE "public"."enum_workshops_blocks_video_hero_container_size" USING "container_size"::"public"."enum_workshops_blocks_video_hero_container_size";
  ALTER TABLE "_workshops_v_blocks_video_hero" ALTER COLUMN "container_size" SET DEFAULT 'container'::"public"."enum__workshops_v_blocks_video_hero_container_size";
  ALTER TABLE "_workshops_v_blocks_video_hero" ALTER COLUMN "container_size" SET DATA TYPE "public"."enum__workshops_v_blocks_video_hero_container_size" USING "container_size"::"public"."enum__workshops_v_blocks_video_hero_container_size";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
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
