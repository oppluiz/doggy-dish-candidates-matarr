import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_tabbed_content_container_size" AS ENUM('container', 'container-small');
  CREATE TYPE "public"."enum__tabbed_content_v_container_size" AS ENUM('container', 'container-small');
  ALTER TABLE "tabbed_content" ADD COLUMN "container_size" "enum_tabbed_content_container_size" DEFAULT 'container';
  ALTER TABLE "_tabbed_content_v" ADD COLUMN "container_size" "enum__tabbed_content_v_container_size" DEFAULT 'container';
  ALTER TABLE "tabs" DROP COLUMN "container_size";
  ALTER TABLE "_tabs_v" DROP COLUMN "container_size";
  DROP TYPE "public"."enum_tabs_container_size";
  DROP TYPE "public"."enum__tabs_v_container_size";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_tabs_container_size" AS ENUM('container', 'container-small');
  CREATE TYPE "public"."enum__tabs_v_container_size" AS ENUM('container', 'container-small');
  ALTER TABLE "tabs" ADD COLUMN "container_size" "enum_tabs_container_size" DEFAULT 'container';
  ALTER TABLE "_tabs_v" ADD COLUMN "container_size" "enum__tabs_v_container_size" DEFAULT 'container';
  ALTER TABLE "tabbed_content" DROP COLUMN "container_size";
  ALTER TABLE "_tabbed_content_v" DROP COLUMN "container_size";
  DROP TYPE "public"."enum_tabbed_content_container_size";
  DROP TYPE "public"."enum__tabbed_content_v_container_size";`)
}
