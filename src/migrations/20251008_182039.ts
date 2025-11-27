import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "health_blocks_content_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_health_v_blocks_content_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DROP TABLE "health_blocks_rich_text_block" CASCADE;
  DROP TABLE "_health_v_blocks_rich_text_block" CASCADE;
  ALTER TABLE "health_blocks_content_block" ADD CONSTRAINT "health_blocks_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."health"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_health_v_blocks_content_block" ADD CONSTRAINT "_health_v_blocks_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_health_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "health_blocks_content_block_order_idx" ON "health_blocks_content_block" USING btree ("_order");
  CREATE INDEX "health_blocks_content_block_parent_id_idx" ON "health_blocks_content_block" USING btree ("_parent_id");
  CREATE INDEX "health_blocks_content_block_path_idx" ON "health_blocks_content_block" USING btree ("_path");
  CREATE INDEX "_health_v_blocks_content_block_order_idx" ON "_health_v_blocks_content_block" USING btree ("_order");
  CREATE INDEX "_health_v_blocks_content_block_parent_id_idx" ON "_health_v_blocks_content_block" USING btree ("_parent_id");
  CREATE INDEX "_health_v_blocks_content_block_path_idx" ON "_health_v_blocks_content_block" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "health_blocks_rich_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_health_v_blocks_rich_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DROP TABLE "health_blocks_content_block" CASCADE;
  DROP TABLE "_health_v_blocks_content_block" CASCADE;
  ALTER TABLE "health_blocks_rich_text_block" ADD CONSTRAINT "health_blocks_rich_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."health"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_health_v_blocks_rich_text_block" ADD CONSTRAINT "_health_v_blocks_rich_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_health_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "health_blocks_rich_text_block_order_idx" ON "health_blocks_rich_text_block" USING btree ("_order");
  CREATE INDEX "health_blocks_rich_text_block_parent_id_idx" ON "health_blocks_rich_text_block" USING btree ("_parent_id");
  CREATE INDEX "health_blocks_rich_text_block_path_idx" ON "health_blocks_rich_text_block" USING btree ("_path");
  CREATE INDEX "_health_v_blocks_rich_text_block_order_idx" ON "_health_v_blocks_rich_text_block" USING btree ("_order");
  CREATE INDEX "_health_v_blocks_rich_text_block_parent_id_idx" ON "_health_v_blocks_rich_text_block" USING btree ("_parent_id");
  CREATE INDEX "_health_v_blocks_rich_text_block_path_idx" ON "_health_v_blocks_rich_text_block" USING btree ("_path");`)
}
