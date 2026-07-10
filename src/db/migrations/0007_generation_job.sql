CREATE TABLE "generation_job" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"type" text NOT NULL,
	"mode" text,
	"input_video_url" text,
	"input_image_url" text,
	"input_text" text,
	"video_template_url" text,
	"image_template_url" text,
	"template_id" text,
	"resolution" text NOT NULL,
	"duration_s" integer NOT NULL,
	"style" text,
	"prompt" text,
	"output_video_url" text,
	"output_image_url" text,
	"quality" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"credits_spent" integer NOT NULL,
	"provider_job_id" text,
	"error" text,
	"metadata" text,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "generation_job" ADD CONSTRAINT "generation_job_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
CREATE INDEX "generation_job_user_id_idx" ON "generation_job" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX "generation_job_type_idx" ON "generation_job" USING btree ("type");
--> statement-breakpoint
CREATE INDEX "generation_job_status_idx" ON "generation_job" USING btree ("status");
--> statement-breakpoint
CREATE INDEX "generation_job_mode_idx" ON "generation_job" USING btree ("mode");
--> statement-breakpoint
CREATE INDEX "generation_job_provider_job_id_idx" ON "generation_job" USING btree ("provider_job_id");
--> statement-breakpoint
CREATE INDEX "generation_job_expires_at_idx" ON "generation_job" USING btree ("expires_at");
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admin_test_credit_package" (
	"id" text PRIMARY KEY NOT NULL,
	"enabled" boolean DEFAULT false NOT NULL,
	"credits" integer DEFAULT 20 NOT NULL,
	"expire_days" integer DEFAULT 365 NOT NULL,
	"stripe_price_id" text NOT NULL,
	"price_amount" integer DEFAULT 0 NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"updated_by" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
	IF NOT EXISTS (
		SELECT 1 FROM pg_constraint
		WHERE conname = 'admin_test_credit_package_updated_by_user_id_fk'
	) THEN
		ALTER TABLE "admin_test_credit_package"
		ADD CONSTRAINT "admin_test_credit_package_updated_by_user_id_fk"
		FOREIGN KEY ("updated_by") REFERENCES "public"."user"("id")
		ON DELETE set null ON UPDATE no action;
	END IF;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "admin_test_credit_package_updated_by_idx" ON "admin_test_credit_package" USING btree ("updated_by");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "admin_test_credit_package_enabled_idx" ON "admin_test_credit_package" USING btree ("enabled");
