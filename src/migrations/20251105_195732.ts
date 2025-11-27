import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_recipes_blocks_author_container_size" AS ENUM('container', 'container-small');
  CREATE TYPE "public"."enum__recipes_v_blocks_author_container_size" AS ENUM('container', 'container-small');
  CREATE TABLE "recipes_blocks_author" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"container_size" "enum_recipes_blocks_author_container_size" DEFAULT 'container',
  	"author_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_recipes_v_blocks_author" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"container_size" "enum__recipes_v_blocks_author_container_size" DEFAULT 'container',
  	"author_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "recipes_blocks_author" ADD CONSTRAINT "recipes_blocks_author_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "recipes_blocks_author" ADD CONSTRAINT "recipes_blocks_author_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recipes_v_blocks_author" ADD CONSTRAINT "_recipes_v_blocks_author_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_recipes_v_blocks_author" ADD CONSTRAINT "_recipes_v_blocks_author_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_recipes_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "recipes_blocks_author_order_idx" ON "recipes_blocks_author" USING btree ("_order");
  CREATE INDEX "recipes_blocks_author_parent_id_idx" ON "recipes_blocks_author" USING btree ("_parent_id");
  CREATE INDEX "recipes_blocks_author_path_idx" ON "recipes_blocks_author" USING btree ("_path");
  CREATE INDEX "recipes_blocks_author_author_idx" ON "recipes_blocks_author" USING btree ("author_id");
  CREATE INDEX "_recipes_v_blocks_author_order_idx" ON "_recipes_v_blocks_author" USING btree ("_order");
  CREATE INDEX "_recipes_v_blocks_author_parent_id_idx" ON "_recipes_v_blocks_author" USING btree ("_parent_id");
  CREATE INDEX "_recipes_v_blocks_author_path_idx" ON "_recipes_v_blocks_author" USING btree ("_path");
  CREATE INDEX "_recipes_v_blocks_author_author_idx" ON "_recipes_v_blocks_author" USING btree ("author_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "recipes_blocks_author" CASCADE;
  DROP TABLE "_recipes_v_blocks_author" CASCADE;
  DROP TYPE "public"."enum_recipes_blocks_author_container_size";
  DROP TYPE "public"."enum__recipes_v_blocks_author_container_size";`)
}
