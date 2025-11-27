import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "how_to_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"authors_id" integer
  );
  
  CREATE TABLE "_how_to_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"authors_id" integer
  );
  
  ALTER TABLE "food_blocks_single_page_hero" DROP CONSTRAINT "food_blocks_single_page_hero_author_id_authors_id_fk";
  
  ALTER TABLE "_food_v_blocks_single_page_hero" DROP CONSTRAINT "_food_v_blocks_single_page_hero_author_id_authors_id_fk";
  
  ALTER TABLE "how_to_blocks_single_page_hero" DROP CONSTRAINT "how_to_blocks_single_page_hero_author_id_authors_id_fk";
  
  ALTER TABLE "_how_to_v_blocks_single_page_hero" DROP CONSTRAINT "_how_to_v_blocks_single_page_hero_author_id_authors_id_fk";
  
  ALTER TABLE "health_blocks_single_page_hero" DROP CONSTRAINT "health_blocks_single_page_hero_author_id_authors_id_fk";
  
  ALTER TABLE "_health_v_blocks_single_page_hero" DROP CONSTRAINT "_health_v_blocks_single_page_hero_author_id_authors_id_fk";
  
  ALTER TABLE "sub_hubs_blocks_single_page_hero" DROP CONSTRAINT "sub_hubs_blocks_single_page_hero_author_id_authors_id_fk";
  
  ALTER TABLE "_sub_hubs_v_blocks_single_page_hero" DROP CONSTRAINT "_sub_hubs_v_blocks_single_page_hero_author_id_authors_id_fk";
  
  DROP INDEX "food_blocks_single_page_hero_author_idx";
  DROP INDEX "_food_v_blocks_single_page_hero_author_idx";
  DROP INDEX "how_to_blocks_single_page_hero_author_idx";
  DROP INDEX "_how_to_v_blocks_single_page_hero_author_idx";
  DROP INDEX "health_blocks_single_page_hero_author_idx";
  DROP INDEX "_health_v_blocks_single_page_hero_author_idx";
  DROP INDEX "sub_hubs_blocks_single_page_hero_author_idx";
  DROP INDEX "_sub_hubs_v_blocks_single_page_hero_author_idx";
  ALTER TABLE "food_rels" ADD COLUMN "authors_id" integer;
  ALTER TABLE "_food_v_rels" ADD COLUMN "authors_id" integer;
  ALTER TABLE "health_rels" ADD COLUMN "authors_id" integer;
  ALTER TABLE "_health_v_rels" ADD COLUMN "authors_id" integer;
  ALTER TABLE "sub_hubs_rels" ADD COLUMN "authors_id" integer;
  ALTER TABLE "_sub_hubs_v_rels" ADD COLUMN "authors_id" integer;
  ALTER TABLE "how_to_rels" ADD CONSTRAINT "how_to_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."how_to"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "how_to_rels" ADD CONSTRAINT "how_to_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_how_to_v_rels" ADD CONSTRAINT "_how_to_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_how_to_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_how_to_v_rels" ADD CONSTRAINT "_how_to_v_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "how_to_rels_order_idx" ON "how_to_rels" USING btree ("order");
  CREATE INDEX "how_to_rels_parent_idx" ON "how_to_rels" USING btree ("parent_id");
  CREATE INDEX "how_to_rels_path_idx" ON "how_to_rels" USING btree ("path");
  CREATE INDEX "how_to_rels_authors_id_idx" ON "how_to_rels" USING btree ("authors_id");
  CREATE INDEX "_how_to_v_rels_order_idx" ON "_how_to_v_rels" USING btree ("order");
  CREATE INDEX "_how_to_v_rels_parent_idx" ON "_how_to_v_rels" USING btree ("parent_id");
  CREATE INDEX "_how_to_v_rels_path_idx" ON "_how_to_v_rels" USING btree ("path");
  CREATE INDEX "_how_to_v_rels_authors_id_idx" ON "_how_to_v_rels" USING btree ("authors_id");
  ALTER TABLE "food_rels" ADD CONSTRAINT "food_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_food_v_rels" ADD CONSTRAINT "_food_v_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "health_rels" ADD CONSTRAINT "health_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_health_v_rels" ADD CONSTRAINT "_health_v_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sub_hubs_rels" ADD CONSTRAINT "sub_hubs_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sub_hubs_v_rels" ADD CONSTRAINT "_sub_hubs_v_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "food_rels_authors_id_idx" ON "food_rels" USING btree ("authors_id");
  CREATE INDEX "_food_v_rels_authors_id_idx" ON "_food_v_rels" USING btree ("authors_id");
  CREATE INDEX "health_rels_authors_id_idx" ON "health_rels" USING btree ("authors_id");
  CREATE INDEX "_health_v_rels_authors_id_idx" ON "_health_v_rels" USING btree ("authors_id");
  CREATE INDEX "sub_hubs_rels_authors_id_idx" ON "sub_hubs_rels" USING btree ("authors_id");
  CREATE INDEX "_sub_hubs_v_rels_authors_id_idx" ON "_sub_hubs_v_rels" USING btree ("authors_id");
  ALTER TABLE "food_blocks_single_page_hero" DROP COLUMN "author_id";
  ALTER TABLE "_food_v_blocks_single_page_hero" DROP COLUMN "author_id";
  ALTER TABLE "how_to_blocks_single_page_hero" DROP COLUMN "author_id";
  ALTER TABLE "_how_to_v_blocks_single_page_hero" DROP COLUMN "author_id";
  ALTER TABLE "health_blocks_single_page_hero" DROP COLUMN "author_id";
  ALTER TABLE "_health_v_blocks_single_page_hero" DROP COLUMN "author_id";
  ALTER TABLE "sub_hubs_blocks_single_page_hero" DROP COLUMN "author_id";
  ALTER TABLE "_sub_hubs_v_blocks_single_page_hero" DROP COLUMN "author_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "how_to_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_how_to_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "how_to_rels" CASCADE;
  DROP TABLE "_how_to_v_rels" CASCADE;
  ALTER TABLE "food_rels" DROP CONSTRAINT "food_rels_authors_fk";
  
  ALTER TABLE "_food_v_rels" DROP CONSTRAINT "_food_v_rels_authors_fk";
  
  ALTER TABLE "health_rels" DROP CONSTRAINT "health_rels_authors_fk";
  
  ALTER TABLE "_health_v_rels" DROP CONSTRAINT "_health_v_rels_authors_fk";
  
  ALTER TABLE "sub_hubs_rels" DROP CONSTRAINT "sub_hubs_rels_authors_fk";
  
  ALTER TABLE "_sub_hubs_v_rels" DROP CONSTRAINT "_sub_hubs_v_rels_authors_fk";
  
  DROP INDEX "food_rels_authors_id_idx";
  DROP INDEX "_food_v_rels_authors_id_idx";
  DROP INDEX "health_rels_authors_id_idx";
  DROP INDEX "_health_v_rels_authors_id_idx";
  DROP INDEX "sub_hubs_rels_authors_id_idx";
  DROP INDEX "_sub_hubs_v_rels_authors_id_idx";
  ALTER TABLE "food_blocks_single_page_hero" ADD COLUMN "author_id" integer;
  ALTER TABLE "_food_v_blocks_single_page_hero" ADD COLUMN "author_id" integer;
  ALTER TABLE "how_to_blocks_single_page_hero" ADD COLUMN "author_id" integer;
  ALTER TABLE "_how_to_v_blocks_single_page_hero" ADD COLUMN "author_id" integer;
  ALTER TABLE "health_blocks_single_page_hero" ADD COLUMN "author_id" integer;
  ALTER TABLE "_health_v_blocks_single_page_hero" ADD COLUMN "author_id" integer;
  ALTER TABLE "sub_hubs_blocks_single_page_hero" ADD COLUMN "author_id" integer;
  ALTER TABLE "_sub_hubs_v_blocks_single_page_hero" ADD COLUMN "author_id" integer;
  ALTER TABLE "food_blocks_single_page_hero" ADD CONSTRAINT "food_blocks_single_page_hero_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_food_v_blocks_single_page_hero" ADD CONSTRAINT "_food_v_blocks_single_page_hero_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "how_to_blocks_single_page_hero" ADD CONSTRAINT "how_to_blocks_single_page_hero_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_how_to_v_blocks_single_page_hero" ADD CONSTRAINT "_how_to_v_blocks_single_page_hero_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "health_blocks_single_page_hero" ADD CONSTRAINT "health_blocks_single_page_hero_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_health_v_blocks_single_page_hero" ADD CONSTRAINT "_health_v_blocks_single_page_hero_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sub_hubs_blocks_single_page_hero" ADD CONSTRAINT "sub_hubs_blocks_single_page_hero_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sub_hubs_v_blocks_single_page_hero" ADD CONSTRAINT "_sub_hubs_v_blocks_single_page_hero_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "food_blocks_single_page_hero_author_idx" ON "food_blocks_single_page_hero" USING btree ("author_id");
  CREATE INDEX "_food_v_blocks_single_page_hero_author_idx" ON "_food_v_blocks_single_page_hero" USING btree ("author_id");
  CREATE INDEX "how_to_blocks_single_page_hero_author_idx" ON "how_to_blocks_single_page_hero" USING btree ("author_id");
  CREATE INDEX "_how_to_v_blocks_single_page_hero_author_idx" ON "_how_to_v_blocks_single_page_hero" USING btree ("author_id");
  CREATE INDEX "health_blocks_single_page_hero_author_idx" ON "health_blocks_single_page_hero" USING btree ("author_id");
  CREATE INDEX "_health_v_blocks_single_page_hero_author_idx" ON "_health_v_blocks_single_page_hero" USING btree ("author_id");
  CREATE INDEX "sub_hubs_blocks_single_page_hero_author_idx" ON "sub_hubs_blocks_single_page_hero" USING btree ("author_id");
  CREATE INDEX "_sub_hubs_v_blocks_single_page_hero_author_idx" ON "_sub_hubs_v_blocks_single_page_hero" USING btree ("author_id");
  ALTER TABLE "food_rels" DROP COLUMN "authors_id";
  ALTER TABLE "_food_v_rels" DROP COLUMN "authors_id";
  ALTER TABLE "health_rels" DROP COLUMN "authors_id";
  ALTER TABLE "_health_v_rels" DROP COLUMN "authors_id";
  ALTER TABLE "sub_hubs_rels" DROP COLUMN "authors_id";
  ALTER TABLE "_sub_hubs_v_rels" DROP COLUMN "authors_id";`)
}
