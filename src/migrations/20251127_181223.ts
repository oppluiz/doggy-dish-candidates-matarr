import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_about_text_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"accent_word" varchar,
  	"content" jsonb,
  	"image_top_id" integer,
  	"image_center_id" integer,
  	"image_bottom_id" integer,
  	"show_sparkle" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_text_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"accent_word" varchar,
  	"content" jsonb,
  	"image_top_id" integer,
  	"image_center_id" integer,
  	"image_bottom_id" integer,
  	"show_sparkle" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_about_text_image" ADD CONSTRAINT "pages_blocks_about_text_image_image_top_id_media_id_fk" FOREIGN KEY ("image_top_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_text_image" ADD CONSTRAINT "pages_blocks_about_text_image_image_center_id_media_id_fk" FOREIGN KEY ("image_center_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_text_image" ADD CONSTRAINT "pages_blocks_about_text_image_image_bottom_id_media_id_fk" FOREIGN KEY ("image_bottom_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_text_image" ADD CONSTRAINT "pages_blocks_about_text_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_text_image" ADD CONSTRAINT "_pages_v_blocks_about_text_image_image_top_id_media_id_fk" FOREIGN KEY ("image_top_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_text_image" ADD CONSTRAINT "_pages_v_blocks_about_text_image_image_center_id_media_id_fk" FOREIGN KEY ("image_center_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_text_image" ADD CONSTRAINT "_pages_v_blocks_about_text_image_image_bottom_id_media_id_fk" FOREIGN KEY ("image_bottom_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_text_image" ADD CONSTRAINT "_pages_v_blocks_about_text_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_about_text_image_order_idx" ON "pages_blocks_about_text_image" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_text_image_parent_id_idx" ON "pages_blocks_about_text_image" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_text_image_path_idx" ON "pages_blocks_about_text_image" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_text_image_image_top_idx" ON "pages_blocks_about_text_image" USING btree ("image_top_id");
  CREATE INDEX "pages_blocks_about_text_image_image_center_idx" ON "pages_blocks_about_text_image" USING btree ("image_center_id");
  CREATE INDEX "pages_blocks_about_text_image_image_bottom_idx" ON "pages_blocks_about_text_image" USING btree ("image_bottom_id");
  CREATE INDEX "_pages_v_blocks_about_text_image_order_idx" ON "_pages_v_blocks_about_text_image" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_text_image_parent_id_idx" ON "_pages_v_blocks_about_text_image" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_text_image_path_idx" ON "_pages_v_blocks_about_text_image" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_text_image_image_top_idx" ON "_pages_v_blocks_about_text_image" USING btree ("image_top_id");
  CREATE INDEX "_pages_v_blocks_about_text_image_image_center_idx" ON "_pages_v_blocks_about_text_image" USING btree ("image_center_id");
  CREATE INDEX "_pages_v_blocks_about_text_image_image_bottom_idx" ON "_pages_v_blocks_about_text_image" USING btree ("image_bottom_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_about_text_image" CASCADE;
  DROP TABLE "_pages_v_blocks_about_text_image" CASCADE;`)
}
