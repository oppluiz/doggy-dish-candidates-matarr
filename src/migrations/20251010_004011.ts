import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_onboarding_checklist_populate_by" AS ENUM('recent', 'manual');
  CREATE TYPE "public"."enum__pages_v_blocks_onboarding_checklist_populate_by" AS ENUM('recent', 'manual');
  CREATE TABLE "pages_blocks_onboarding_checklist_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_onboarding_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'ONBOARDING CHECKLIST',
  	"populate_by" "enum_pages_blocks_onboarding_checklist_populate_by" DEFAULT 'recent',
  	"use_placeholders" boolean DEFAULT false,
  	"placeholder_text" varchar DEFAULT 'Recipe Title Here',
  	"placeholder_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_onboarding_checklist_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_onboarding_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'ONBOARDING CHECKLIST',
  	"populate_by" "enum__pages_v_blocks_onboarding_checklist_populate_by" DEFAULT 'recent',
  	"use_placeholders" boolean DEFAULT false,
  	"placeholder_text" varchar DEFAULT 'Recipe Title Here',
  	"placeholder_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_onboarding_checklist_items" ADD CONSTRAINT "pages_blocks_onboarding_checklist_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_onboarding_checklist"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_onboarding_checklist" ADD CONSTRAINT "pages_blocks_onboarding_checklist_placeholder_image_id_media_id_fk" FOREIGN KEY ("placeholder_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_onboarding_checklist" ADD CONSTRAINT "pages_blocks_onboarding_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_onboarding_checklist_items" ADD CONSTRAINT "_pages_v_blocks_onboarding_checklist_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_onboarding_checklist"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_onboarding_checklist" ADD CONSTRAINT "_pages_v_blocks_onboarding_checklist_placeholder_image_id_media_id_fk" FOREIGN KEY ("placeholder_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_onboarding_checklist" ADD CONSTRAINT "_pages_v_blocks_onboarding_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_onboarding_checklist_items_order_idx" ON "pages_blocks_onboarding_checklist_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_onboarding_checklist_items_parent_id_idx" ON "pages_blocks_onboarding_checklist_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_onboarding_checklist_order_idx" ON "pages_blocks_onboarding_checklist" USING btree ("_order");
  CREATE INDEX "pages_blocks_onboarding_checklist_parent_id_idx" ON "pages_blocks_onboarding_checklist" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_onboarding_checklist_path_idx" ON "pages_blocks_onboarding_checklist" USING btree ("_path");
  CREATE INDEX "pages_blocks_onboarding_checklist_placeholder_image_idx" ON "pages_blocks_onboarding_checklist" USING btree ("placeholder_image_id");
  CREATE INDEX "_pages_v_blocks_onboarding_checklist_items_order_idx" ON "_pages_v_blocks_onboarding_checklist_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_onboarding_checklist_items_parent_id_idx" ON "_pages_v_blocks_onboarding_checklist_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_onboarding_checklist_order_idx" ON "_pages_v_blocks_onboarding_checklist" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_onboarding_checklist_parent_id_idx" ON "_pages_v_blocks_onboarding_checklist" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_onboarding_checklist_path_idx" ON "_pages_v_blocks_onboarding_checklist" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_onboarding_checklist_placeholder_image_idx" ON "_pages_v_blocks_onboarding_checklist" USING btree ("placeholder_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_onboarding_checklist_items" CASCADE;
  DROP TABLE "pages_blocks_onboarding_checklist" CASCADE;
  DROP TABLE "_pages_v_blocks_onboarding_checklist_items" CASCADE;
  DROP TABLE "_pages_v_blocks_onboarding_checklist" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_onboarding_checklist_populate_by";
  DROP TYPE "public"."enum__pages_v_blocks_onboarding_checklist_populate_by";`)
}
