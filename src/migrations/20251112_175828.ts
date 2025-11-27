import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "hubs_rels" DROP CONSTRAINT "hubs_rels_pages_fk";
  
  ALTER TABLE "hubs_rels" DROP CONSTRAINT "hubs_rels_posts_fk";
  
  ALTER TABLE "_hubs_v_rels" DROP CONSTRAINT "_hubs_v_rels_pages_fk";
  
  ALTER TABLE "_hubs_v_rels" DROP CONSTRAINT "_hubs_v_rels_posts_fk";
  
  DROP INDEX "hubs_rels_pages_id_idx";
  DROP INDEX "hubs_rels_posts_id_idx";
  DROP INDEX "_hubs_v_rels_pages_id_idx";
  DROP INDEX "_hubs_v_rels_posts_id_idx";
  ALTER TABLE "hubs_rels" ADD COLUMN "health_id" integer;
  ALTER TABLE "hubs_rels" ADD COLUMN "how_to_id" integer;
  ALTER TABLE "hubs_rels" ADD COLUMN "food_id" integer;
  ALTER TABLE "_hubs_v_rels" ADD COLUMN "health_id" integer;
  ALTER TABLE "_hubs_v_rels" ADD COLUMN "how_to_id" integer;
  ALTER TABLE "_hubs_v_rels" ADD COLUMN "food_id" integer;
  ALTER TABLE "hubs_rels" ADD CONSTRAINT "hubs_rels_health_fk" FOREIGN KEY ("health_id") REFERENCES "public"."health"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hubs_rels" ADD CONSTRAINT "hubs_rels_how_to_fk" FOREIGN KEY ("how_to_id") REFERENCES "public"."how_to"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hubs_rels" ADD CONSTRAINT "hubs_rels_food_fk" FOREIGN KEY ("food_id") REFERENCES "public"."food"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hubs_v_rels" ADD CONSTRAINT "_hubs_v_rels_health_fk" FOREIGN KEY ("health_id") REFERENCES "public"."health"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hubs_v_rels" ADD CONSTRAINT "_hubs_v_rels_how_to_fk" FOREIGN KEY ("how_to_id") REFERENCES "public"."how_to"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hubs_v_rels" ADD CONSTRAINT "_hubs_v_rels_food_fk" FOREIGN KEY ("food_id") REFERENCES "public"."food"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "hubs_rels_health_id_idx" ON "hubs_rels" USING btree ("health_id");
  CREATE INDEX "hubs_rels_how_to_id_idx" ON "hubs_rels" USING btree ("how_to_id");
  CREATE INDEX "hubs_rels_food_id_idx" ON "hubs_rels" USING btree ("food_id");
  CREATE INDEX "_hubs_v_rels_health_id_idx" ON "_hubs_v_rels" USING btree ("health_id");
  CREATE INDEX "_hubs_v_rels_how_to_id_idx" ON "_hubs_v_rels" USING btree ("how_to_id");
  CREATE INDEX "_hubs_v_rels_food_id_idx" ON "_hubs_v_rels" USING btree ("food_id");
  ALTER TABLE "hubs_blocks_slider" DROP COLUMN "title_url";
  ALTER TABLE "hubs_blocks_slider" DROP COLUMN "width_constraint";
  ALTER TABLE "hubs_rels" DROP COLUMN "pages_id";
  ALTER TABLE "hubs_rels" DROP COLUMN "posts_id";
  ALTER TABLE "_hubs_v_blocks_slider" DROP COLUMN "title_url";
  ALTER TABLE "_hubs_v_blocks_slider" DROP COLUMN "width_constraint";
  ALTER TABLE "_hubs_v_rels" DROP COLUMN "pages_id";
  ALTER TABLE "_hubs_v_rels" DROP COLUMN "posts_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "hubs_rels" DROP CONSTRAINT "hubs_rels_health_fk";
  
  ALTER TABLE "hubs_rels" DROP CONSTRAINT "hubs_rels_how_to_fk";
  
  ALTER TABLE "hubs_rels" DROP CONSTRAINT "hubs_rels_food_fk";
  
  ALTER TABLE "_hubs_v_rels" DROP CONSTRAINT "_hubs_v_rels_health_fk";
  
  ALTER TABLE "_hubs_v_rels" DROP CONSTRAINT "_hubs_v_rels_how_to_fk";
  
  ALTER TABLE "_hubs_v_rels" DROP CONSTRAINT "_hubs_v_rels_food_fk";
  
  DROP INDEX "hubs_rels_health_id_idx";
  DROP INDEX "hubs_rels_how_to_id_idx";
  DROP INDEX "hubs_rels_food_id_idx";
  DROP INDEX "_hubs_v_rels_health_id_idx";
  DROP INDEX "_hubs_v_rels_how_to_id_idx";
  DROP INDEX "_hubs_v_rels_food_id_idx";
  ALTER TABLE "hubs_blocks_slider" ADD COLUMN "title_url" varchar;
  ALTER TABLE "hubs_blocks_slider" ADD COLUMN "width_constraint" boolean DEFAULT false;
  ALTER TABLE "hubs_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "hubs_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "_hubs_v_blocks_slider" ADD COLUMN "title_url" varchar;
  ALTER TABLE "_hubs_v_blocks_slider" ADD COLUMN "width_constraint" boolean DEFAULT false;
  ALTER TABLE "_hubs_v_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "_hubs_v_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "hubs_rels" ADD CONSTRAINT "hubs_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hubs_rels" ADD CONSTRAINT "hubs_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hubs_v_rels" ADD CONSTRAINT "_hubs_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_hubs_v_rels" ADD CONSTRAINT "_hubs_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "hubs_rels_pages_id_idx" ON "hubs_rels" USING btree ("pages_id");
  CREATE INDEX "hubs_rels_posts_id_idx" ON "hubs_rels" USING btree ("posts_id");
  CREATE INDEX "_hubs_v_rels_pages_id_idx" ON "_hubs_v_rels" USING btree ("pages_id");
  CREATE INDEX "_hubs_v_rels_posts_id_idx" ON "_hubs_v_rels" USING btree ("posts_id");
  ALTER TABLE "hubs_rels" DROP COLUMN "health_id";
  ALTER TABLE "hubs_rels" DROP COLUMN "how_to_id";
  ALTER TABLE "hubs_rels" DROP COLUMN "food_id";
  ALTER TABLE "_hubs_v_rels" DROP COLUMN "health_id";
  ALTER TABLE "_hubs_v_rels" DROP COLUMN "how_to_id";
  ALTER TABLE "_hubs_v_rels" DROP COLUMN "food_id";`)
}
