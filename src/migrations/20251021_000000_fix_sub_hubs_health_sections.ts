import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_sects_type" AS ENUM('richText', 'accordion', 'table', 'content');
  CREATE TYPE "public"."enum_sects_columns_column_type" AS ENUM('text', 'input');
  CREATE TYPE "public"."enum_sects_columns_input_type" AS ENUM('checkbox', 'text', 'number', 'textarea');
  CREATE TYPE "public"."enum_sects_items_icon" AS ENUM('paw', 'leaf', 'sparkles', 'medkit', 'activity');
  CREATE TYPE "public"."enum__sects_v_type" AS ENUM('richText', 'accordion', 'table', 'content');
  CREATE TYPE "public"."enum__sects_v_columns_column_type" AS ENUM('text', 'input');
  CREATE TYPE "public"."enum__sects_v_columns_input_type" AS ENUM('checkbox', 'text', 'number', 'textarea');
  CREATE TYPE "public"."enum__sects_v_items_icon" AS ENUM('paw', 'leaf', 'sparkles', 'medkit', 'activity');

  CREATE TABLE "sects" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_sects_type" DEFAULT 'richText',
  	"heading" varchar,
  	"anchor" varchar,
  	"table_intro" jsonb,
  	"top_content" jsonb,
  	"enable_important" boolean DEFAULT false,
  	"important_title" varchar DEFAULT 'IMPORTANT',
  	"important_text" jsonb,
  	"bottom_content" jsonb,
  	"content" jsonb,
  	"accordion_intro" jsonb
  );

  CREATE TABLE "cols" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"column_type" "enum_sects_columns_column_type" DEFAULT 'text',
  	"input_type" "enum_sects_columns_input_type" DEFAULT 'checkbox'
  );

  CREATE TABLE "trows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );

  CREATE TABLE "cls" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cell_value" varchar
  );

  CREATE TABLE "crows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"left_heading" varchar,
  	"right_text" jsonb
  );

  CREATE TABLE "acc_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"icon" "enum_sects_items_icon",
  	"content" jsonb
  );

  CREATE TABLE "_sects_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__sects_v_type" DEFAULT 'richText',
  	"heading" varchar,
  	"anchor" varchar,
  	"table_intro" jsonb,
  	"top_content" jsonb,
  	"enable_important" boolean DEFAULT false,
  	"important_title" varchar DEFAULT 'IMPORTANT',
  	"important_text" jsonb,
  	"bottom_content" jsonb,
  	"content" jsonb,
  	"accordion_intro" jsonb,
  	"_uuid" varchar
  );

  CREATE TABLE "_sects_v_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"column_type" "enum__sects_v_columns_column_type" DEFAULT 'text',
  	"input_type" "enum__sects_v_columns_input_type" DEFAULT 'checkbox',
  	"_uuid" varchar
  );

  CREATE TABLE "_sects_v_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );

  CREATE TABLE "_sects_v_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cell_value" varchar,
  	"_uuid" varchar
  );

  CREATE TABLE "_sects_v_content_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar
  );

  CREATE TABLE "_sects_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"icon" "enum__sects_v_items_icon",
  	"content" jsonb,
  	"_uuid" varchar
  );

  ALTER TABLE "sects" ADD CONSTRAINT "sects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sub_hubs_blocks_health_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cols" ADD CONSTRAINT "cols_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trows" ADD CONSTRAINT "trows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cls" ADD CONSTRAINT "cls_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "crows" ADD CONSTRAINT "crows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "acc_items" ADD CONSTRAINT "acc_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sects"("id") ON DELETE cascade ON UPDATE no action;

  ALTER TABLE "_sects_v" ADD CONSTRAINT "_sects_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sub_hubs_v_blocks_health_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sects_v_columns" ADD CONSTRAINT "_sects_v_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sects_v_table_rows" ADD CONSTRAINT "_sects_v_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sects_v_table_rows_cells" ADD CONSTRAINT "_sects_v_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sects_v_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sects_v_content_rows" ADD CONSTRAINT "_sects_v_content_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sects_v_items" ADD CONSTRAINT "_sects_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sects_v"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX "sects_order_idx" ON "sects" USING btree ("_order");
  CREATE INDEX "sects_parent_id_idx" ON "sects" USING btree ("_parent_id");
  CREATE INDEX "cols_order_idx" ON "cols" USING btree ("_order");
  CREATE INDEX "cols_parent_id_idx" ON "cols" USING btree ("_parent_id");
  CREATE INDEX "trows_order_idx" ON "trows" USING btree ("_order");
  CREATE INDEX "trows_parent_id_idx" ON "trows" USING btree ("_parent_id");
  CREATE INDEX "cls_order_idx" ON "cls" USING btree ("_order");
  CREATE INDEX "cls_parent_id_idx" ON "cls" USING btree ("_parent_id");
  CREATE INDEX "crows_order_idx" ON "crows" USING btree ("_order");
  CREATE INDEX "crows_parent_id_idx" ON "crows" USING btree ("_parent_id");
  CREATE INDEX "acc_items_order_idx" ON "acc_items" USING btree ("_order");
  CREATE INDEX "acc_items_parent_id_idx" ON "acc_items" USING btree ("_parent_id");

  CREATE INDEX "_sects_v_order_idx" ON "_sects_v" USING btree ("_order");
  CREATE INDEX "_sects_v_parent_id_idx" ON "_sects_v" USING btree ("_parent_id");
  CREATE INDEX "_sects_v_columns_order_idx" ON "_sects_v_columns" USING btree ("_order");
  CREATE INDEX "_sects_v_columns_parent_id_idx" ON "_sects_v_columns" USING btree ("_parent_id");
  CREATE INDEX "_sects_v_table_rows_order_idx" ON "_sects_v_table_rows" USING btree ("_order");
  CREATE INDEX "_sects_v_table_rows_parent_id_idx" ON "_sects_v_table_rows" USING btree ("_parent_id");
  CREATE INDEX "_sects_v_table_rows_cells_order_idx" ON "_sects_v_table_rows_cells" USING btree ("_order");
  CREATE INDEX "_sects_v_table_rows_cells_parent_id_idx" ON "_sects_v_table_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "_sects_v_content_rows_order_idx" ON "_sects_v_content_rows" USING btree ("_order");
  CREATE INDEX "_sects_v_content_rows_parent_id_idx" ON "_sects_v_content_rows" USING btree ("_parent_id");
  CREATE INDEX "_sects_v_items_order_idx" ON "_sects_v_items" USING btree ("_order");
  CREATE INDEX "_sects_v_items_parent_id_idx" ON "_sects_v_items" USING btree ("_parent_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "sects" CASCADE;
    DROP TABLE IF EXISTS "cols" CASCADE;
    DROP TABLE IF EXISTS "trows" CASCADE;
    DROP TABLE IF EXISTS "cls" CASCADE;
    DROP TABLE IF EXISTS "crows" CASCADE;
    DROP TABLE IF EXISTS "acc_items" CASCADE;
    DROP TABLE IF EXISTS "_sects_v" CASCADE;
    DROP TABLE IF EXISTS "_sects_v_columns" CASCADE;
    DROP TABLE IF EXISTS "_sects_v_table_rows" CASCADE;
    DROP TABLE IF EXISTS "_sects_v_table_rows_cells" CASCADE;
    DROP TABLE IF EXISTS "_sects_v_content_rows" CASCADE;
    DROP TABLE IF EXISTS "_sects_v_items" CASCADE;

    DROP TYPE IF EXISTS "public"."enum_sects_type";
    DROP TYPE IF EXISTS "public"."enum_sects_columns_column_type";
    DROP TYPE IF EXISTS "public"."enum_sects_columns_input_type";
    DROP TYPE IF EXISTS "public"."enum_sects_items_icon";
    DROP TYPE IF EXISTS "public"."enum__sects_v_type";
    DROP TYPE IF EXISTS "public"."enum__sects_v_columns_column_type";
    DROP TYPE IF EXISTS "public"."enum__sects_v_columns_input_type";
    DROP TYPE IF EXISTS "public"."enum__sects_v_items_icon";
  `)
}