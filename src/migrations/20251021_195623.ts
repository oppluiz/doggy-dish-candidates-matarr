import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_sub_hubs_collection" ADD VALUE 'recipes';
  ALTER TYPE "public"."enum__sub_hubs_v_version_collection" ADD VALUE 'recipes';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sub_hubs" ALTER COLUMN "collection" SET DATA TYPE text;
  DROP TYPE "public"."enum_sub_hubs_collection";
  CREATE TYPE "public"."enum_sub_hubs_collection" AS ENUM('health', 'food', 'howTo');
  ALTER TABLE "sub_hubs" ALTER COLUMN "collection" SET DATA TYPE "public"."enum_sub_hubs_collection" USING "collection"::"public"."enum_sub_hubs_collection";
  ALTER TABLE "_sub_hubs_v" ALTER COLUMN "version_collection" SET DATA TYPE text;
  DROP TYPE "public"."enum__sub_hubs_v_version_collection";
  CREATE TYPE "public"."enum__sub_hubs_v_version_collection" AS ENUM('health', 'food', 'howTo');
  ALTER TABLE "_sub_hubs_v" ALTER COLUMN "version_collection" SET DATA TYPE "public"."enum__sub_hubs_v_version_collection" USING "version_collection"::"public"."enum__sub_hubs_v_version_collection";`)
}
