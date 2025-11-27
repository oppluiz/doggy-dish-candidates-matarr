import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "health_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "_health_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  ALTER TABLE "health_rels" ADD CONSTRAINT "health_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."health"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "health_rels" ADD CONSTRAINT "health_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_health_v_rels" ADD CONSTRAINT "_health_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_health_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_health_v_rels" ADD CONSTRAINT "_health_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "health_rels_order_idx" ON "health_rels" USING btree ("order");
  CREATE INDEX "health_rels_parent_idx" ON "health_rels" USING btree ("parent_id");
  CREATE INDEX "health_rels_path_idx" ON "health_rels" USING btree ("path");
  CREATE INDEX "health_rels_categories_id_idx" ON "health_rels" USING btree ("categories_id");
  CREATE INDEX "_health_v_rels_order_idx" ON "_health_v_rels" USING btree ("order");
  CREATE INDEX "_health_v_rels_parent_idx" ON "_health_v_rels" USING btree ("parent_id");
  CREATE INDEX "_health_v_rels_path_idx" ON "_health_v_rels" USING btree ("path");
  CREATE INDEX "_health_v_rels_categories_id_idx" ON "_health_v_rels" USING btree ("categories_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "health_rels" CASCADE;
  DROP TABLE "_health_v_rels" CASCADE;`)
}
