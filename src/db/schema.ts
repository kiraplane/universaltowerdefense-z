import { boolean, integer, pgTable, text, timestamp, index } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('email_verified').notNull(),
	image: text('image'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
	role: text('role'),
	banned: boolean('banned'),
	banReason: text('ban_reason'),
	banExpires: timestamp('ban_expires'),
	customerId: text('customer_id'),
}, (table) => ({
	userIdIdx: index("user_id_idx").on(table.id),
	userCustomerIdIdx: index("user_customer_id_idx").on(table.customerId),
	userRoleIdx: index("user_role_idx").on(table.role),
}));

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp('expires_at').notNull(),
	token: text('token').notNull().unique(),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	impersonatedBy: text('impersonated_by')
}, (table) => ({
	sessionTokenIdx: index("session_token_idx").on(table.token),
	sessionUserIdIdx: index("session_user_id_idx").on(table.userId),
}));

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: timestamp('access_token_expires_at'),
	refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
	scope: text('scope'),
	password: text('password'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull()
}, (table) => ({
	accountUserIdIdx: index("account_user_id_idx").on(table.userId),
	accountAccountIdIdx: index("account_account_id_idx").on(table.accountId),
	accountProviderIdIdx: index("account_provider_id_idx").on(table.providerId),
}));

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at'),
	updatedAt: timestamp('updated_at')
});

export const payment = pgTable("payment", {
	id: text("id").primaryKey(),
	priceId: text('price_id').notNull(),
	type: text('type').notNull(),
	scene: text('scene'), // payment scene: 'lifetime', 'credit', 'subscription'
	interval: text('interval'),
	userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	customerId: text('customer_id').notNull(),
	subscriptionId: text('subscription_id'),
	sessionId: text('session_id'),
	invoiceId: text('invoice_id').unique(), // unique constraint for avoiding duplicate processing
	status: text('status').notNull(),
	paid: boolean('paid').notNull().default(false), // indicates whether payment is completed (set in invoice.paid event)
	periodStart: timestamp('period_start'),
	periodEnd: timestamp('period_end'),
	cancelAtPeriodEnd: boolean('cancel_at_period_end'),
	trialStart: timestamp('trial_start'),
	trialEnd: timestamp('trial_end'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
	paymentTypeIdx: index("payment_type_idx").on(table.type),
	paymentSceneIdx: index("payment_scene_idx").on(table.scene),
	paymentPriceIdIdx: index("payment_price_id_idx").on(table.priceId),
	paymentUserIdIdx: index("payment_user_id_idx").on(table.userId),
	paymentCustomerIdIdx: index("payment_customer_id_idx").on(table.customerId),
	paymentStatusIdx: index("payment_status_idx").on(table.status),
	paymentPaidIdx: index("payment_paid_idx").on(table.paid),
	paymentSubscriptionIdIdx: index("payment_subscription_id_idx").on(table.subscriptionId),
	paymentSessionIdIdx: index("payment_session_id_idx").on(table.sessionId),
	paymentInvoiceIdIdx: index("payment_invoice_id_idx").on(table.invoiceId),
}));

export const userCredit = pgTable("user_credit", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: 'cascade' }),
	currentCredits: integer("current_credits").notNull().default(0),
	lastRefreshAt: timestamp("last_refresh_at"), // deprecated
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
	userCreditUserIdIdx: index("user_credit_user_id_idx").on(table.userId),
}));

export const creditTransaction = pgTable("credit_transaction", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: 'cascade' }),
	type: text("type").notNull(),
	description: text("description"),
	amount: integer("amount").notNull(),
	remainingAmount: integer("remaining_amount"),
	paymentId: text("payment_id"), // field name is paymentId, but actually it's invoiceId
	expirationDate: timestamp("expiration_date"),
	expirationDateProcessedAt: timestamp("expiration_date_processed_at"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
	creditTransactionUserIdIdx: index("credit_transaction_user_id_idx").on(table.userId),
	creditTransactionTypeIdx: index("credit_transaction_type_idx").on(table.type),
}));

export const adminTestCreditPackage = pgTable("admin_test_credit_package", {
	id: text("id").primaryKey(),
	enabled: boolean("enabled").notNull().default(false),
	credits: integer("credits").notNull().default(20),
	expireDays: integer("expire_days").notNull().default(365),
	stripePriceId: text("stripe_price_id").notNull(),
	priceAmount: integer("price_amount").notNull().default(0),
	currency: text("currency").notNull().default('USD'),
	updatedBy: text("updated_by").references(() => user.id, { onDelete: 'set null' }),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
	adminTestCreditPackageUpdatedByIdx: index("admin_test_credit_package_updated_by_idx").on(table.updatedBy),
	adminTestCreditPackageEnabledIdx: index("admin_test_credit_package_enabled_idx").on(table.enabled),
}));

export const generationJob = pgTable("generation_job", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: 'cascade' }),
	// Type: image and video generation families
	type: text("type", {
		enum: ['ai_image', 'happyhorse_ai_video', 'seedance_2_0_video']
	}).notNull(),
	// Generation mode
	mode: text("mode", {
		enum: ['video_to_video', 'image_to_video', 'text_to_video', 'image_to_image', 'text_to_image']
	}),
	// Input data
	inputVideoUrl: text("input_video_url"), // V2V user or reference video
	inputImageUrl: text("input_image_url"), // User image
	inputText: text("input_text"), // T2V prompt
	// Template data
	videoTemplateUrl: text("video_template_url"), // V2V video template
	imageTemplateUrl: text("image_template_url"), // I2V image template
	templateId: text("template_id"),
	// Configuration
	resolution: text("resolution", {
		enum: ['480p', '512p', '580p', '720p', '768p', '1080p', '1K', '2K', '4K']
	}).notNull(),
	durationS: integer("duration_s").notNull(),
	style: text("style"), // T2V style
	prompt: text("prompt"),
	// Output & status
	outputVideoUrl: text("output_video_url"),
	outputImageUrl: text("output_image_url"),
	quality: text("quality"),
	status: text("status", {
		enum: ['pending', 'running', 'succeeded', 'failed']
	}).notNull().default('pending'),
	// Credits & task management
	creditsSpent: integer("credits_spent").notNull(),
	providerJobId: text("provider_job_id"), // API task ID
	error: text("error"),
	// Metadata
	metadata: text("metadata"), // JSON stored as text for extra info
	// Timestamps - 7 days retention for generated assets
	expiresAt: timestamp("expires_at").notNull(), // 7 days from creation
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
	generationJobUserIdIdx: index("generation_job_user_id_idx").on(table.userId),
	generationJobTypeIdx: index("generation_job_type_idx").on(table.type),
	generationJobStatusIdx: index("generation_job_status_idx").on(table.status),
	generationJobModeIdx: index("generation_job_mode_idx").on(table.mode),
	generationJobProviderJobIdIdx: index("generation_job_provider_job_id_idx").on(table.providerJobId),
	generationJobExpiresAtIdx: index("generation_job_expires_at_idx").on(table.expiresAt),
}));
