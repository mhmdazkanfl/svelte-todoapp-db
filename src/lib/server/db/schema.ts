import { sqliteTable, text, integer, blob, index } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable(
	'user',
	{
		id: integer('id').primaryKey(),
		email: text('email').notNull().unique(),
		username: text('username').notNull(),
		passwordHash: text('password_hash').notNull(),
		emailVerified: integer('email_verified').notNull().default(0),
		totpKey: blob('totp_key'),
		recoveryCode: blob('recovery_code').notNull()
	},
	(table) => [index('email_index').on(table.email)]
);

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at').notNull(),
	twoFactorVerified: integer('two_factor_verified').notNull().default(0)
});

export const emailVerificationRequest = sqliteTable('email_verification_request', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => user.id),
	email: text('email').notNull(),
	code: text('code').notNull(),
	expiresAt: integer('expires_at').notNull()
});

export const passwordResetSession = sqliteTable('password_reset_session', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => user.id),
	email: text('email').notNull(),
	code: text('code').notNull(),
	expiresAt: integer('expires_at').notNull(),
	emailVerified: integer('email_verified').notNull().default(0),
	twoFactorVerified: integer('two_factor_verified').notNull().default(0)
});

export const task = sqliteTable('task', {
	id: integer('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => user.id),
	title: text('title').notNull(),
	description: text('description'),
	completed: integer('completed').notNull().default(0)
});
