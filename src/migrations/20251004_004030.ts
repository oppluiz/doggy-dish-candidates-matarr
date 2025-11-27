import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_workshops_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_workshops_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_workshops_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum__workshops_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__workshops_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__workshops_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TABLE "workshops_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_workshops_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_workshops_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "_workshops_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__workshops_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__workshops_v_version_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  ALTER TABLE "workshops" ADD COLUMN "hero_type" "enum_workshops_hero_type" DEFAULT 'highImpact';
  ALTER TABLE "workshops" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "workshops" ADD COLUMN "hero_media_id" integer;
  ALTER TABLE "workshops_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "workshops_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "_workshops_v" ADD COLUMN "version_hero_type" "enum__workshops_v_version_hero_type" DEFAULT 'highImpact';
  ALTER TABLE "_workshops_v" ADD COLUMN "version_hero_rich_text" jsonb;
  ALTER TABLE "_workshops_v" ADD COLUMN "version_hero_media_id" integer;
  ALTER TABLE "_workshops_v_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "_workshops_v_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "workshops_hero_links" ADD CONSTRAINT "workshops_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workshops"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_workshops_v_version_hero_links" ADD CONSTRAINT "_workshops_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_workshops_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "workshops_hero_links_order_idx" ON "workshops_hero_links" USING btree ("_order");
  CREATE INDEX "workshops_hero_links_parent_id_idx" ON "workshops_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_workshops_v_version_hero_links_order_idx" ON "_workshops_v_version_hero_links" USING btree ("_order");
  CREATE INDEX "_workshops_v_version_hero_links_parent_id_idx" ON "_workshops_v_version_hero_links" USING btree ("_parent_id");
  ALTER TABLE "workshops" ADD CONSTRAINT "workshops_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "workshops_rels" ADD CONSTRAINT "workshops_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "workshops_rels" ADD CONSTRAINT "workshops_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_workshops_v" ADD CONSTRAINT "_workshops_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_workshops_v_rels" ADD CONSTRAINT "_workshops_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_workshops_v_rels" ADD CONSTRAINT "_workshops_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "workshops_hero_hero_media_idx" ON "workshops" USING btree ("hero_media_id");
  CREATE INDEX "workshops_rels_pages_id_idx" ON "workshops_rels" USING btree ("pages_id");
  CREATE INDEX "workshops_rels_posts_id_idx" ON "workshops_rels" USING btree ("posts_id");
  CREATE INDEX "_workshops_v_version_hero_version_hero_media_idx" ON "_workshops_v" USING btree ("version_hero_media_id");
  CREATE INDEX "_workshops_v_rels_pages_id_idx" ON "_workshops_v_rels" USING btree ("pages_id");
  CREATE INDEX "_workshops_v_rels_posts_id_idx" ON "_workshops_v_rels" USING btree ("posts_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "workshops_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_workshops_v_version_hero_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "workshops_hero_links" CASCADE;
  DROP TABLE "_workshops_v_version_hero_links" CASCADE;
  ALTER TABLE "workshops" DROP CONSTRAINT "workshops_hero_media_id_media_id_fk";
  
  ALTER TABLE "workshops_rels" DROP CONSTRAINT "workshops_rels_pages_fk";
  
  ALTER TABLE "workshops_rels" DROP CONSTRAINT "workshops_rels_posts_fk";
  
  ALTER TABLE "_workshops_v" DROP CONSTRAINT "_workshops_v_version_hero_media_id_media_id_fk";
  
  ALTER TABLE "_workshops_v_rels" DROP CONSTRAINT "_workshops_v_rels_pages_fk";
  
  ALTER TABLE "_workshops_v_rels" DROP CONSTRAINT "_workshops_v_rels_posts_fk";
  
  DROP INDEX "workshops_hero_hero_media_idx";
  DROP INDEX "workshops_rels_pages_id_idx";
  DROP INDEX "workshops_rels_posts_id_idx";
  DROP INDEX "_workshops_v_version_hero_version_hero_media_idx";
  DROP INDEX "_workshops_v_rels_pages_id_idx";
  DROP INDEX "_workshops_v_rels_posts_id_idx";
  ALTER TABLE "workshops" DROP COLUMN "hero_type";
  ALTER TABLE "workshops" DROP COLUMN "hero_rich_text";
  ALTER TABLE "workshops" DROP COLUMN "hero_media_id";
  ALTER TABLE "workshops_rels" DROP COLUMN "pages_id";
  ALTER TABLE "workshops_rels" DROP COLUMN "posts_id";
  ALTER TABLE "_workshops_v" DROP COLUMN "version_hero_type";
  ALTER TABLE "_workshops_v" DROP COLUMN "version_hero_rich_text";
  ALTER TABLE "_workshops_v" DROP COLUMN "version_hero_media_id";
  ALTER TABLE "_workshops_v_rels" DROP COLUMN "pages_id";
  ALTER TABLE "_workshops_v_rels" DROP COLUMN "posts_id";
  DROP TYPE "public"."enum_workshops_hero_links_link_type";
  DROP TYPE "public"."enum_workshops_hero_links_link_appearance";
  DROP TYPE "public"."enum_workshops_hero_type";
  DROP TYPE "public"."enum__workshops_v_version_hero_links_link_type";
  DROP TYPE "public"."enum__workshops_v_version_hero_links_link_appearance";
  DROP TYPE "public"."enum__workshops_v_version_hero_type";`)
}
