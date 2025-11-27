import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "search_rels" ADD COLUMN "food_id" integer;
  ALTER TABLE "search_rels" ADD COLUMN "health_id" integer;
  ALTER TABLE "search_rels" ADD COLUMN "how_to_id" integer;
  ALTER TABLE "search_rels" ADD COLUMN "workshops_id" integer;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_food_fk" FOREIGN KEY ("food_id") REFERENCES "public"."food"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_health_fk" FOREIGN KEY ("health_id") REFERENCES "public"."health"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_how_to_fk" FOREIGN KEY ("how_to_id") REFERENCES "public"."how_to"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_workshops_fk" FOREIGN KEY ("workshops_id") REFERENCES "public"."workshops"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "search_rels_food_id_idx" ON "search_rels" USING btree ("food_id");
  CREATE INDEX "search_rels_health_id_idx" ON "search_rels" USING btree ("health_id");
  CREATE INDEX "search_rels_how_to_id_idx" ON "search_rels" USING btree ("how_to_id");
  CREATE INDEX "search_rels_workshops_id_idx" ON "search_rels" USING btree ("workshops_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "search_rels" DROP CONSTRAINT "search_rels_food_fk";
  
  ALTER TABLE "search_rels" DROP CONSTRAINT "search_rels_health_fk";
  
  ALTER TABLE "search_rels" DROP CONSTRAINT "search_rels_how_to_fk";
  
  ALTER TABLE "search_rels" DROP CONSTRAINT "search_rels_workshops_fk";
  
  DROP INDEX "search_rels_food_id_idx";
  DROP INDEX "search_rels_health_id_idx";
  DROP INDEX "search_rels_how_to_id_idx";
  DROP INDEX "search_rels_workshops_id_idx";
  ALTER TABLE "search_rels" DROP COLUMN "food_id";
  ALTER TABLE "search_rels" DROP COLUMN "health_id";
  ALTER TABLE "search_rels" DROP COLUMN "how_to_id";
  ALTER TABLE "search_rels" DROP COLUMN "workshops_id";`)
}
