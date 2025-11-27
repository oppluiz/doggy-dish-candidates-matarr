import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "workshops_blocks_author" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"author_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_workshops_v_blocks_author" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"author_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "workshops_blocks_author" ADD CONSTRAINT "workshops_blocks_author_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "workshops_blocks_author" ADD CONSTRAINT "workshops_blocks_author_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workshops"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_workshops_v_blocks_author" ADD CONSTRAINT "_workshops_v_blocks_author_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_workshops_v_blocks_author" ADD CONSTRAINT "_workshops_v_blocks_author_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_workshops_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "workshops_blocks_author_order_idx" ON "workshops_blocks_author" USING btree ("_order");
  CREATE INDEX "workshops_blocks_author_parent_id_idx" ON "workshops_blocks_author" USING btree ("_parent_id");
  CREATE INDEX "workshops_blocks_author_path_idx" ON "workshops_blocks_author" USING btree ("_path");
  CREATE INDEX "workshops_blocks_author_author_idx" ON "workshops_blocks_author" USING btree ("author_id");
  CREATE INDEX "_workshops_v_blocks_author_order_idx" ON "_workshops_v_blocks_author" USING btree ("_order");
  CREATE INDEX "_workshops_v_blocks_author_parent_id_idx" ON "_workshops_v_blocks_author" USING btree ("_parent_id");
  CREATE INDEX "_workshops_v_blocks_author_path_idx" ON "_workshops_v_blocks_author" USING btree ("_path");
  CREATE INDEX "_workshops_v_blocks_author_author_idx" ON "_workshops_v_blocks_author" USING btree ("author_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "workshops_blocks_author" CASCADE;
  DROP TABLE "_workshops_v_blocks_author" CASCADE;`)
}
