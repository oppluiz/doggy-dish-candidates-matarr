import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_header_nav_items_icon" ADD VALUE 'health_cross' BEFORE 'utensils';
  ALTER TYPE "public"."enum_header_nav_items_icon" ADD VALUE 'nutrition' BEFORE 'utensils';
  ALTER TYPE "public"."enum_header_nav_items_icon" ADD VALUE 'square-play' BEFORE 'utensils';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_nav_items" ALTER COLUMN "icon" SET DATA TYPE text;
  DROP TYPE "public"."enum_header_nav_items_icon";
  CREATE TYPE "public"."enum_header_nav_items_icon" AS ENUM('home', 'utensils', 'plus', 'squareStack');
  ALTER TABLE "header_nav_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_header_nav_items_icon" USING "icon"::"public"."enum_header_nav_items_icon";`)
}
