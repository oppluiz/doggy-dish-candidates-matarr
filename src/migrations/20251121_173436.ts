import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "popup_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "popup_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"cta_label" varchar,
  	"cta_url" varchar
  );
  
  CREATE TABLE "popup" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT false,
  	"dismissible" boolean DEFAULT true,
  	"title" varchar,
  	"content" jsonb,
  	"overlay_color" varchar DEFAULT 'rgba(0,0,0,0.5)',
  	"accent_color" varchar DEFAULT '#41A690',
  	"panel_background" varchar DEFAULT '#FFFFFF',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "popup_plans_features" ADD CONSTRAINT "popup_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."popup_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "popup_plans" ADD CONSTRAINT "popup_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."popup"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "popup_plans_features_order_idx" ON "popup_plans_features" USING btree ("_order");
  CREATE INDEX "popup_plans_features_parent_id_idx" ON "popup_plans_features" USING btree ("_parent_id");
  CREATE INDEX "popup_plans_order_idx" ON "popup_plans" USING btree ("_order");
  CREATE INDEX "popup_plans_parent_id_idx" ON "popup_plans" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "popup_plans_features" CASCADE;
  DROP TABLE "popup_plans" CASCADE;
  DROP TABLE "popup" CASCADE;`)
}
