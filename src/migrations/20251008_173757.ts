import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "health_blocks_tabs_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"anchor" varchar
  );
  
  CREATE TABLE "health_blocks_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_health_v_blocks_tabs_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_health_v_blocks_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DROP TABLE "health_blocks_health_tabs_tabs" CASCADE;
  DROP TABLE "health_blocks_health_tabs" CASCADE;
  DROP TABLE "_health_v_blocks_health_tabs_tabs" CASCADE;
  DROP TABLE "_health_v_blocks_health_tabs" CASCADE;
  ALTER TABLE "health_blocks_tabs_tabs" ADD CONSTRAINT "health_blocks_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."health_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "health_blocks_tabs" ADD CONSTRAINT "health_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."health"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_health_v_blocks_tabs_tabs" ADD CONSTRAINT "_health_v_blocks_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_health_v_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_health_v_blocks_tabs" ADD CONSTRAINT "_health_v_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_health_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "health_blocks_tabs_tabs_order_idx" ON "health_blocks_tabs_tabs" USING btree ("_order");
  CREATE INDEX "health_blocks_tabs_tabs_parent_id_idx" ON "health_blocks_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "health_blocks_tabs_order_idx" ON "health_blocks_tabs" USING btree ("_order");
  CREATE INDEX "health_blocks_tabs_parent_id_idx" ON "health_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX "health_blocks_tabs_path_idx" ON "health_blocks_tabs" USING btree ("_path");
  CREATE INDEX "_health_v_blocks_tabs_tabs_order_idx" ON "_health_v_blocks_tabs_tabs" USING btree ("_order");
  CREATE INDEX "_health_v_blocks_tabs_tabs_parent_id_idx" ON "_health_v_blocks_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "_health_v_blocks_tabs_order_idx" ON "_health_v_blocks_tabs" USING btree ("_order");
  CREATE INDEX "_health_v_blocks_tabs_parent_id_idx" ON "_health_v_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX "_health_v_blocks_tabs_path_idx" ON "_health_v_blocks_tabs" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "health_blocks_health_tabs_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"anchor" varchar
  );
  
  CREATE TABLE "health_blocks_health_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_health_v_blocks_health_tabs_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_health_v_blocks_health_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DROP TABLE "health_blocks_tabs_tabs" CASCADE;
  DROP TABLE "health_blocks_tabs" CASCADE;
  DROP TABLE "_health_v_blocks_tabs_tabs" CASCADE;
  DROP TABLE "_health_v_blocks_tabs" CASCADE;
  ALTER TABLE "health_blocks_health_tabs_tabs" ADD CONSTRAINT "health_blocks_health_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."health_blocks_health_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "health_blocks_health_tabs" ADD CONSTRAINT "health_blocks_health_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."health"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_health_v_blocks_health_tabs_tabs" ADD CONSTRAINT "_health_v_blocks_health_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_health_v_blocks_health_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_health_v_blocks_health_tabs" ADD CONSTRAINT "_health_v_blocks_health_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_health_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "health_blocks_health_tabs_tabs_order_idx" ON "health_blocks_health_tabs_tabs" USING btree ("_order");
  CREATE INDEX "health_blocks_health_tabs_tabs_parent_id_idx" ON "health_blocks_health_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "health_blocks_health_tabs_order_idx" ON "health_blocks_health_tabs" USING btree ("_order");
  CREATE INDEX "health_blocks_health_tabs_parent_id_idx" ON "health_blocks_health_tabs" USING btree ("_parent_id");
  CREATE INDEX "health_blocks_health_tabs_path_idx" ON "health_blocks_health_tabs" USING btree ("_path");
  CREATE INDEX "_health_v_blocks_health_tabs_tabs_order_idx" ON "_health_v_blocks_health_tabs_tabs" USING btree ("_order");
  CREATE INDEX "_health_v_blocks_health_tabs_tabs_parent_id_idx" ON "_health_v_blocks_health_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "_health_v_blocks_health_tabs_order_idx" ON "_health_v_blocks_health_tabs" USING btree ("_order");
  CREATE INDEX "_health_v_blocks_health_tabs_parent_id_idx" ON "_health_v_blocks_health_tabs" USING btree ("_parent_id");
  CREATE INDEX "_health_v_blocks_health_tabs_path_idx" ON "_health_v_blocks_health_tabs" USING btree ("_path");`)
}
