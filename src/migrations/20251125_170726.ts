import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ADD COLUMN "locked" boolean;
  ALTER TABLE "_pages_v" ADD COLUMN "version_locked" boolean;
  ALTER TABLE "posts" ADD COLUMN "locked" boolean;
  ALTER TABLE "_posts_v" ADD COLUMN "version_locked" boolean;
  ALTER TABLE "workshops" ADD COLUMN "locked" boolean;
  ALTER TABLE "_workshops_v" ADD COLUMN "version_locked" boolean;
  ALTER TABLE "recipes" ADD COLUMN "locked" boolean;
  ALTER TABLE "_recipes_v" ADD COLUMN "version_locked" boolean;
  ALTER TABLE "how_to" ADD COLUMN "locked" boolean;
  ALTER TABLE "_how_to_v" ADD COLUMN "version_locked" boolean;
  ALTER TABLE "health" ADD COLUMN "locked" boolean;
  ALTER TABLE "_health_v" ADD COLUMN "version_locked" boolean;
  ALTER TABLE "sub_hubs" ADD COLUMN "locked" boolean;
  ALTER TABLE "_sub_hubs_v" ADD COLUMN "version_locked" boolean;
  ALTER TABLE "hubs" ADD COLUMN "locked" boolean;
  ALTER TABLE "_hubs_v" ADD COLUMN "version_locked" boolean;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP COLUMN "locked";
  ALTER TABLE "_pages_v" DROP COLUMN "version_locked";
  ALTER TABLE "posts" DROP COLUMN "locked";
  ALTER TABLE "_posts_v" DROP COLUMN "version_locked";
  ALTER TABLE "workshops" DROP COLUMN "locked";
  ALTER TABLE "_workshops_v" DROP COLUMN "version_locked";
  ALTER TABLE "recipes" DROP COLUMN "locked";
  ALTER TABLE "_recipes_v" DROP COLUMN "version_locked";
  ALTER TABLE "how_to" DROP COLUMN "locked";
  ALTER TABLE "_how_to_v" DROP COLUMN "version_locked";
  ALTER TABLE "health" DROP COLUMN "locked";
  ALTER TABLE "_health_v" DROP COLUMN "version_locked";
  ALTER TABLE "sub_hubs" DROP COLUMN "locked";
  ALTER TABLE "_sub_hubs_v" DROP COLUMN "version_locked";
  ALTER TABLE "hubs" DROP COLUMN "locked";
  ALTER TABLE "_hubs_v" DROP COLUMN "version_locked";`)
}
