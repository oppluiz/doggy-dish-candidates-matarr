import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "ingredients_blocks_content_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_ingredients_v_blocks_content_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "ingredients_blocks_content_block" ADD CONSTRAINT "ingredients_blocks_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ingredients_v_blocks_content_block" ADD CONSTRAINT "_ingredients_v_blocks_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ingredients_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "ingredients_blocks_content_block_order_idx" ON "ingredients_blocks_content_block" USING btree ("_order");
  CREATE INDEX "ingredients_blocks_content_block_parent_id_idx" ON "ingredients_blocks_content_block" USING btree ("_parent_id");
  CREATE INDEX "ingredients_blocks_content_block_path_idx" ON "ingredients_blocks_content_block" USING btree ("_path");
  CREATE INDEX "_ingredients_v_blocks_content_block_order_idx" ON "_ingredients_v_blocks_content_block" USING btree ("_order");
  CREATE INDEX "_ingredients_v_blocks_content_block_parent_id_idx" ON "_ingredients_v_blocks_content_block" USING btree ("_parent_id");
  CREATE INDEX "_ingredients_v_blocks_content_block_path_idx" ON "_ingredients_v_blocks_content_block" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "ingredients_blocks_content_block" CASCADE;
  DROP TABLE "_ingredients_v_blocks_content_block" CASCADE;`)
}
