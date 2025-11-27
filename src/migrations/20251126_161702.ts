import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_hubs_blocks_featured_workshop_container_size" AS ENUM('container', 'container-small');
  CREATE TYPE "public"."enum__hubs_v_blocks_featured_workshop_container_size" AS ENUM('container', 'container-small');
  CREATE TABLE "hubs_blocks_featured_workshop" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Featured Collection',
  	"container_size" "enum_hubs_blocks_featured_workshop_container_size" DEFAULT 'container',
  	"workshop_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_hubs_v_blocks_featured_workshop" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Featured Collection',
  	"container_size" "enum__hubs_v_blocks_featured_workshop_container_size" DEFAULT 'container',
  	"workshop_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "workshops" ADD COLUMN "watch_time" varchar;
  ALTER TABLE "_workshops_v" ADD COLUMN "version_watch_time" varchar;
  ALTER TABLE "hubs_blocks_featured_workshop" ADD CONSTRAINT "hubs_blocks_featured_workshop_workshop_id_workshops_id_fk" FOREIGN KEY ("workshop_id") REFERENCES "public"."workshops"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hubs_blocks_featured_workshop" ADD CONSTRAINT "hubs_blocks_featured_workshop_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hubs_v_blocks_featured_workshop" ADD CONSTRAINT "_hubs_v_blocks_featured_workshop_workshop_id_workshops_id_fk" FOREIGN KEY ("workshop_id") REFERENCES "public"."workshops"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_hubs_v_blocks_featured_workshop" ADD CONSTRAINT "_hubs_v_blocks_featured_workshop_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_hubs_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "hubs_blocks_featured_workshop_order_idx" ON "hubs_blocks_featured_workshop" USING btree ("_order");
  CREATE INDEX "hubs_blocks_featured_workshop_parent_id_idx" ON "hubs_blocks_featured_workshop" USING btree ("_parent_id");
  CREATE INDEX "hubs_blocks_featured_workshop_path_idx" ON "hubs_blocks_featured_workshop" USING btree ("_path");
  CREATE INDEX "hubs_blocks_featured_workshop_workshop_idx" ON "hubs_blocks_featured_workshop" USING btree ("workshop_id");
  CREATE INDEX "_hubs_v_blocks_featured_workshop_order_idx" ON "_hubs_v_blocks_featured_workshop" USING btree ("_order");
  CREATE INDEX "_hubs_v_blocks_featured_workshop_parent_id_idx" ON "_hubs_v_blocks_featured_workshop" USING btree ("_parent_id");
  CREATE INDEX "_hubs_v_blocks_featured_workshop_path_idx" ON "_hubs_v_blocks_featured_workshop" USING btree ("_path");
  CREATE INDEX "_hubs_v_blocks_featured_workshop_workshop_idx" ON "_hubs_v_blocks_featured_workshop" USING btree ("workshop_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "hubs_blocks_featured_workshop" CASCADE;
  DROP TABLE "_hubs_v_blocks_featured_workshop" CASCADE;
  ALTER TABLE "workshops" DROP COLUMN "watch_time";
  ALTER TABLE "_workshops_v" DROP COLUMN "version_watch_time";
  DROP TYPE "public"."enum_hubs_blocks_featured_workshop_container_size";
  DROP TYPE "public"."enum__hubs_v_blocks_featured_workshop_container_size";`)
}
