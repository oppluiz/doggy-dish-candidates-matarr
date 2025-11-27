import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "workshops_blocks_video_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_url" varchar,
  	"thumbnail_id" integer,
  	"tag" varchar DEFAULT 'MASTERCLASS',
  	"block_name" varchar
  );
  
  CREATE TABLE "_workshops_v_blocks_video_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_url" varchar,
  	"thumbnail_id" integer,
  	"tag" varchar DEFAULT 'MASTERCLASS',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DROP TABLE "workshops_blocks_workshop_hero" CASCADE;
  DROP TABLE "_workshops_v_blocks_workshop_hero" CASCADE;
  ALTER TABLE "workshops_blocks_video_hero" ADD CONSTRAINT "workshops_blocks_video_hero_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "workshops_blocks_video_hero" ADD CONSTRAINT "workshops_blocks_video_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workshops"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_workshops_v_blocks_video_hero" ADD CONSTRAINT "_workshops_v_blocks_video_hero_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_workshops_v_blocks_video_hero" ADD CONSTRAINT "_workshops_v_blocks_video_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_workshops_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "workshops_blocks_video_hero_order_idx" ON "workshops_blocks_video_hero" USING btree ("_order");
  CREATE INDEX "workshops_blocks_video_hero_parent_id_idx" ON "workshops_blocks_video_hero" USING btree ("_parent_id");
  CREATE INDEX "workshops_blocks_video_hero_path_idx" ON "workshops_blocks_video_hero" USING btree ("_path");
  CREATE INDEX "workshops_blocks_video_hero_thumbnail_idx" ON "workshops_blocks_video_hero" USING btree ("thumbnail_id");
  CREATE INDEX "_workshops_v_blocks_video_hero_order_idx" ON "_workshops_v_blocks_video_hero" USING btree ("_order");
  CREATE INDEX "_workshops_v_blocks_video_hero_parent_id_idx" ON "_workshops_v_blocks_video_hero" USING btree ("_parent_id");
  CREATE INDEX "_workshops_v_blocks_video_hero_path_idx" ON "_workshops_v_blocks_video_hero" USING btree ("_path");
  CREATE INDEX "_workshops_v_blocks_video_hero_thumbnail_idx" ON "_workshops_v_blocks_video_hero" USING btree ("thumbnail_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "workshops_blocks_workshop_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_url" varchar,
  	"thumbnail_id" integer,
  	"tag" varchar DEFAULT 'MASTERCLASS',
  	"block_name" varchar
  );
  
  CREATE TABLE "_workshops_v_blocks_workshop_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_url" varchar,
  	"thumbnail_id" integer,
  	"tag" varchar DEFAULT 'MASTERCLASS',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DROP TABLE "workshops_blocks_video_hero" CASCADE;
  DROP TABLE "_workshops_v_blocks_video_hero" CASCADE;
  ALTER TABLE "workshops_blocks_workshop_hero" ADD CONSTRAINT "workshops_blocks_workshop_hero_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "workshops_blocks_workshop_hero" ADD CONSTRAINT "workshops_blocks_workshop_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workshops"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_workshops_v_blocks_workshop_hero" ADD CONSTRAINT "_workshops_v_blocks_workshop_hero_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_workshops_v_blocks_workshop_hero" ADD CONSTRAINT "_workshops_v_blocks_workshop_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_workshops_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "workshops_blocks_workshop_hero_order_idx" ON "workshops_blocks_workshop_hero" USING btree ("_order");
  CREATE INDEX "workshops_blocks_workshop_hero_parent_id_idx" ON "workshops_blocks_workshop_hero" USING btree ("_parent_id");
  CREATE INDEX "workshops_blocks_workshop_hero_path_idx" ON "workshops_blocks_workshop_hero" USING btree ("_path");
  CREATE INDEX "workshops_blocks_workshop_hero_thumbnail_idx" ON "workshops_blocks_workshop_hero" USING btree ("thumbnail_id");
  CREATE INDEX "_workshops_v_blocks_workshop_hero_order_idx" ON "_workshops_v_blocks_workshop_hero" USING btree ("_order");
  CREATE INDEX "_workshops_v_blocks_workshop_hero_parent_id_idx" ON "_workshops_v_blocks_workshop_hero" USING btree ("_parent_id");
  CREATE INDEX "_workshops_v_blocks_workshop_hero_path_idx" ON "_workshops_v_blocks_workshop_hero" USING btree ("_path");
  CREATE INDEX "_workshops_v_blocks_workshop_hero_thumbnail_idx" ON "_workshops_v_blocks_workshop_hero" USING btree ("thumbnail_id");`)
}
