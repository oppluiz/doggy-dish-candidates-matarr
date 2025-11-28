import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_contact_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'tell your dog we say hi!',
  	"accent_word" varchar,
  	"description" varchar DEFAULT 'We''re all ears when it comes to your questions, comments, or just sharing adorable dog photos. Fill out the form below and we''ll be in touch within 48 business hours.',
  	"dog_image_id" integer,
  	"decorative_icon_id" integer,
  	"name_placeholder" varchar DEFAULT 'Name',
  	"email_placeholder" varchar DEFAULT 'Email address',
  	"message_placeholder" varchar DEFAULT 'Message',
  	"submit_button_text" varchar DEFAULT 'submit',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_info_dog_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_contact_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subheading" varchar DEFAULT 'JOIN THE DOGGY DISH™ NEWSLETTER',
  	"heading" varchar DEFAULT 'FRESH TAKES ON DOG HEALTH + WELLNESS',
  	"description" varchar DEFAULT 'We make it short, sweet, and packed with tasty tidbits you won''t find anywhere else. Subscribe to our newsletter and get the inside scoop on keeping your dog at their best for their best years yet. Because we''re rooting for your pup!',
  	"email_placeholder" varchar DEFAULT 'Email address',
  	"submit_button_text" varchar DEFAULT 'HIT IT!',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'tell your dog we say hi!',
  	"accent_word" varchar,
  	"description" varchar DEFAULT 'We''re all ears when it comes to your questions, comments, or just sharing adorable dog photos. Fill out the form below and we''ll be in touch within 48 business hours.',
  	"dog_image_id" integer,
  	"decorative_icon_id" integer,
  	"name_placeholder" varchar DEFAULT 'Name',
  	"email_placeholder" varchar DEFAULT 'Email address',
  	"message_placeholder" varchar DEFAULT 'Message',
  	"submit_button_text" varchar DEFAULT 'submit',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_info_dog_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"subheading" varchar DEFAULT 'JOIN THE DOGGY DISH™ NEWSLETTER',
  	"heading" varchar DEFAULT 'FRESH TAKES ON DOG HEALTH + WELLNESS',
  	"description" varchar DEFAULT 'We make it short, sweet, and packed with tasty tidbits you won''t find anywhere else. Subscribe to our newsletter and get the inside scoop on keeping your dog at their best for their best years yet. Because we''re rooting for your pup!',
  	"email_placeholder" varchar DEFAULT 'Email address',
  	"submit_button_text" varchar DEFAULT 'HIT IT!',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_contact_hero" ADD CONSTRAINT "pages_blocks_contact_hero_dog_image_id_media_id_fk" FOREIGN KEY ("dog_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_hero" ADD CONSTRAINT "pages_blocks_contact_hero_decorative_icon_id_media_id_fk" FOREIGN KEY ("decorative_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_hero" ADD CONSTRAINT "pages_blocks_contact_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_info_dog_images" ADD CONSTRAINT "pages_blocks_contact_info_dog_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_info_dog_images" ADD CONSTRAINT "pages_blocks_contact_info_dog_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_info" ADD CONSTRAINT "pages_blocks_contact_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_hero" ADD CONSTRAINT "_pages_v_blocks_contact_hero_dog_image_id_media_id_fk" FOREIGN KEY ("dog_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_hero" ADD CONSTRAINT "_pages_v_blocks_contact_hero_decorative_icon_id_media_id_fk" FOREIGN KEY ("decorative_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_hero" ADD CONSTRAINT "_pages_v_blocks_contact_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_info_dog_images" ADD CONSTRAINT "_pages_v_blocks_contact_info_dog_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_info_dog_images" ADD CONSTRAINT "_pages_v_blocks_contact_info_dog_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_info" ADD CONSTRAINT "_pages_v_blocks_contact_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_contact_hero_order_idx" ON "pages_blocks_contact_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_hero_parent_id_idx" ON "pages_blocks_contact_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_hero_path_idx" ON "pages_blocks_contact_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_hero_dog_image_idx" ON "pages_blocks_contact_hero" USING btree ("dog_image_id");
  CREATE INDEX "pages_blocks_contact_hero_decorative_icon_idx" ON "pages_blocks_contact_hero" USING btree ("decorative_icon_id");
  CREATE INDEX "pages_blocks_contact_info_dog_images_order_idx" ON "pages_blocks_contact_info_dog_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_info_dog_images_parent_id_idx" ON "pages_blocks_contact_info_dog_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_info_dog_images_image_idx" ON "pages_blocks_contact_info_dog_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_contact_info_order_idx" ON "pages_blocks_contact_info" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_info_parent_id_idx" ON "pages_blocks_contact_info" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_info_path_idx" ON "pages_blocks_contact_info" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_hero_order_idx" ON "_pages_v_blocks_contact_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_hero_parent_id_idx" ON "_pages_v_blocks_contact_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_hero_path_idx" ON "_pages_v_blocks_contact_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_hero_dog_image_idx" ON "_pages_v_blocks_contact_hero" USING btree ("dog_image_id");
  CREATE INDEX "_pages_v_blocks_contact_hero_decorative_icon_idx" ON "_pages_v_blocks_contact_hero" USING btree ("decorative_icon_id");
  CREATE INDEX "_pages_v_blocks_contact_info_dog_images_order_idx" ON "_pages_v_blocks_contact_info_dog_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_info_dog_images_parent_id_idx" ON "_pages_v_blocks_contact_info_dog_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_info_dog_images_image_idx" ON "_pages_v_blocks_contact_info_dog_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_contact_info_order_idx" ON "_pages_v_blocks_contact_info" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_info_parent_id_idx" ON "_pages_v_blocks_contact_info" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_info_path_idx" ON "_pages_v_blocks_contact_info" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_contact_hero" CASCADE;
  DROP TABLE "pages_blocks_contact_info_dog_images" CASCADE;
  DROP TABLE "pages_blocks_contact_info" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_info_dog_images" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_info" CASCADE;`)
}
