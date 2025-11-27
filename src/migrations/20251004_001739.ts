import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_workshops_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__workshops_v_version_status" AS ENUM('draft', 'published');
  -- removed: CREATE TYPE "public"."enum_header_nav_items_icon" AS ENUM('home', 'utensils', 'plus', 'squareStack');
  CREATE TABLE "workshops" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_image_id" integer,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_workshops_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "workshops_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "_workshops_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_image_id" integer,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__workshops_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_workshops_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "workshops_id" integer;
  -- removed: ALTER TABLE "header_nav_items" ADD COLUMN "icon" "enum_header_nav_items_icon";
  ALTER TABLE "workshops" ADD CONSTRAINT "workshops_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "workshops" ADD CONSTRAINT "workshops_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "workshops_rels" ADD CONSTRAINT "workshops_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."workshops"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "workshops_rels" ADD CONSTRAINT "workshops_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_workshops_v" ADD CONSTRAINT "_workshops_v_parent_id_workshops_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."workshops"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_workshops_v" ADD CONSTRAINT "_workshops_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_workshops_v" ADD CONSTRAINT "_workshops_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_workshops_v_rels" ADD CONSTRAINT "_workshops_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_workshops_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_workshops_v_rels" ADD CONSTRAINT "_workshops_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "workshops_hero_image_idx" ON "workshops" USING btree ("hero_image_id");
  CREATE INDEX "workshops_meta_meta_image_idx" ON "workshops" USING btree ("meta_image_id");
  CREATE INDEX "workshops_slug_idx" ON "workshops" USING btree ("slug");
  CREATE INDEX "workshops_updated_at_idx" ON "workshops" USING btree ("updated_at");
  CREATE INDEX "workshops_created_at_idx" ON "workshops" USING btree ("created_at");
  CREATE INDEX "workshops__status_idx" ON "workshops" USING btree ("_status");
  CREATE INDEX "workshops_rels_order_idx" ON "workshops_rels" USING btree ("order");
  CREATE INDEX "workshops_rels_parent_idx" ON "workshops_rels" USING btree ("parent_id");
  CREATE INDEX "workshops_rels_path_idx" ON "workshops_rels" USING btree ("path");
  CREATE INDEX "workshops_rels_categories_id_idx" ON "workshops_rels" USING btree ("categories_id");
  CREATE INDEX "_workshops_v_parent_idx" ON "_workshops_v" USING btree ("parent_id");
  CREATE INDEX "_workshops_v_version_version_hero_image_idx" ON "_workshops_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_workshops_v_version_meta_version_meta_image_idx" ON "_workshops_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_workshops_v_version_version_slug_idx" ON "_workshops_v" USING btree ("version_slug");
  CREATE INDEX "_workshops_v_version_version_updated_at_idx" ON "_workshops_v" USING btree ("version_updated_at");
  CREATE INDEX "_workshops_v_version_version_created_at_idx" ON "_workshops_v" USING btree ("version_created_at");
  CREATE INDEX "_workshops_v_version_version__status_idx" ON "_workshops_v" USING btree ("version__status");
  CREATE INDEX "_workshops_v_created_at_idx" ON "_workshops_v" USING btree ("created_at");
  CREATE INDEX "_workshops_v_updated_at_idx" ON "_workshops_v" USING btree ("updated_at");
  CREATE INDEX "_workshops_v_latest_idx" ON "_workshops_v" USING btree ("latest");
  CREATE INDEX "_workshops_v_autosave_idx" ON "_workshops_v" USING btree ("autosave");
  CREATE INDEX "_workshops_v_rels_order_idx" ON "_workshops_v_rels" USING btree ("order");
  CREATE INDEX "_workshops_v_rels_parent_idx" ON "_workshops_v_rels" USING btree ("parent_id");
  CREATE INDEX "_workshops_v_rels_path_idx" ON "_workshops_v_rels" USING btree ("path");
  CREATE INDEX "_workshops_v_rels_categories_id_idx" ON "_workshops_v_rels" USING btree ("categories_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_workshops_fk" FOREIGN KEY ("workshops_id") REFERENCES "public"."workshops"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_workshops_id_idx" ON "payload_locked_documents_rels" USING btree ("workshops_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "workshops" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "workshops_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_workshops_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_workshops_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "workshops" CASCADE;
  DROP TABLE "workshops_rels" CASCADE;
  DROP TABLE "_workshops_v" CASCADE;
  DROP TABLE "_workshops_v_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_workshops_fk";
  
  DROP INDEX "payload_locked_documents_rels_workshops_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "workshops_id";
  -- removed: ALTER TABLE "header_nav_items" DROP COLUMN "icon";
  DROP TYPE "public"."enum_workshops_status";
  DROP TYPE "public"."enum__workshops_v_version_status";
  -- removed: DROP TYPE "public"."enum_header_nav_items_icon";`)
}
