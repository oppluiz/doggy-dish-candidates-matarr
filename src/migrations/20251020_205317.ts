import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_recipes_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__recipes_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "recipes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"image_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"slug" varchar,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_recipes_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "recipes_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"sub_hubs_id" integer,
  	"categories_id" integer
  );
  
  CREATE TABLE "_recipes_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_image_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_slug" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__recipes_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_recipes_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"sub_hubs_id" integer,
  	"categories_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "recipes_id" integer;
  ALTER TABLE "recipes" ADD CONSTRAINT "recipes_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "recipes" ADD CONSTRAINT "recipes_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "recipes_rels" ADD CONSTRAINT "recipes_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recipes_rels" ADD CONSTRAINT "recipes_rels_sub_hubs_fk" FOREIGN KEY ("sub_hubs_id") REFERENCES "public"."sub_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recipes_rels" ADD CONSTRAINT "recipes_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recipes_v" ADD CONSTRAINT "_recipes_v_parent_id_recipes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."recipes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_recipes_v" ADD CONSTRAINT "_recipes_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_recipes_v" ADD CONSTRAINT "_recipes_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_recipes_v_rels" ADD CONSTRAINT "_recipes_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_recipes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recipes_v_rels" ADD CONSTRAINT "_recipes_v_rels_sub_hubs_fk" FOREIGN KEY ("sub_hubs_id") REFERENCES "public"."sub_hubs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_recipes_v_rels" ADD CONSTRAINT "_recipes_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "recipes_image_idx" ON "recipes" USING btree ("image_id");
  CREATE INDEX "recipes_meta_meta_image_idx" ON "recipes" USING btree ("meta_image_id");
  CREATE INDEX "recipes_slug_idx" ON "recipes" USING btree ("slug");
  CREATE INDEX "recipes_updated_at_idx" ON "recipes" USING btree ("updated_at");
  CREATE INDEX "recipes_created_at_idx" ON "recipes" USING btree ("created_at");
  CREATE INDEX "recipes__status_idx" ON "recipes" USING btree ("_status");
  CREATE INDEX "recipes_rels_order_idx" ON "recipes_rels" USING btree ("order");
  CREATE INDEX "recipes_rels_parent_idx" ON "recipes_rels" USING btree ("parent_id");
  CREATE INDEX "recipes_rels_path_idx" ON "recipes_rels" USING btree ("path");
  CREATE INDEX "recipes_rels_sub_hubs_id_idx" ON "recipes_rels" USING btree ("sub_hubs_id");
  CREATE INDEX "recipes_rels_categories_id_idx" ON "recipes_rels" USING btree ("categories_id");
  CREATE INDEX "_recipes_v_parent_idx" ON "_recipes_v" USING btree ("parent_id");
  CREATE INDEX "_recipes_v_version_version_image_idx" ON "_recipes_v" USING btree ("version_image_id");
  CREATE INDEX "_recipes_v_version_meta_version_meta_image_idx" ON "_recipes_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_recipes_v_version_version_slug_idx" ON "_recipes_v" USING btree ("version_slug");
  CREATE INDEX "_recipes_v_version_version_updated_at_idx" ON "_recipes_v" USING btree ("version_updated_at");
  CREATE INDEX "_recipes_v_version_version_created_at_idx" ON "_recipes_v" USING btree ("version_created_at");
  CREATE INDEX "_recipes_v_version_version__status_idx" ON "_recipes_v" USING btree ("version__status");
  CREATE INDEX "_recipes_v_created_at_idx" ON "_recipes_v" USING btree ("created_at");
  CREATE INDEX "_recipes_v_updated_at_idx" ON "_recipes_v" USING btree ("updated_at");
  CREATE INDEX "_recipes_v_latest_idx" ON "_recipes_v" USING btree ("latest");
  CREATE INDEX "_recipes_v_autosave_idx" ON "_recipes_v" USING btree ("autosave");
  CREATE INDEX "_recipes_v_rels_order_idx" ON "_recipes_v_rels" USING btree ("order");
  CREATE INDEX "_recipes_v_rels_parent_idx" ON "_recipes_v_rels" USING btree ("parent_id");
  CREATE INDEX "_recipes_v_rels_path_idx" ON "_recipes_v_rels" USING btree ("path");
  CREATE INDEX "_recipes_v_rels_sub_hubs_id_idx" ON "_recipes_v_rels" USING btree ("sub_hubs_id");
  CREATE INDEX "_recipes_v_rels_categories_id_idx" ON "_recipes_v_rels" USING btree ("categories_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_recipes_fk" FOREIGN KEY ("recipes_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_recipes_id_idx" ON "payload_locked_documents_rels" USING btree ("recipes_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "recipes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recipes_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recipes_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_recipes_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "recipes" CASCADE;
  DROP TABLE "recipes_rels" CASCADE;
  DROP TABLE "_recipes_v" CASCADE;
  DROP TABLE "_recipes_v_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_recipes_fk";
  
  DROP INDEX "payload_locked_documents_rels_recipes_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "recipes_id";
  DROP TYPE "public"."enum_recipes_status";
  DROP TYPE "public"."enum__recipes_v_version_status";`)
}
