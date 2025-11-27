import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_how_to_blocks_how_to_information_container_size" AS ENUM('container', 'container-small');
  CREATE TYPE "public"."enum__how_to_v_blocks_how_to_information_container_size" AS ENUM('container', 'container-small');
  ALTER TABLE "how_to_blocks_how_to_information" ADD COLUMN "container_size" "enum_how_to_blocks_how_to_information_container_size" DEFAULT 'container';
  ALTER TABLE "_how_to_v_blocks_how_to_information" ADD COLUMN "container_size" "enum__how_to_v_blocks_how_to_information_container_size" DEFAULT 'container';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "how_to_blocks_how_to_information" DROP COLUMN "container_size";
  ALTER TABLE "_how_to_v_blocks_how_to_information" DROP COLUMN "container_size";
  DROP TYPE "public"."enum_how_to_blocks_how_to_information_container_size";
  DROP TYPE "public"."enum__how_to_v_blocks_how_to_information_container_size";`)
}
