# Cloudflare Workers Deployment Guide

## Prerequisites

1. Install Wrangler CLI globally:

   ```bash
   npm install -g wrangler
   ```

2. Login to Cloudflare:
   ```bash
   wrangler auth login
   ```

## Environment Setup

1. Copy `.env.example` to `.env` and fill in your values:

   ```bash
   cp .env.example .env
   ```

2. Set up your Turso database credentials in `.env`:

   ```
   DATABASE_URL=libsql://your-database-url.turso.io
   DATABASE_AUTH_TOKEN=your-auth-token
   ENCRYPTION_KEY=your-encryption-key
   ```

3. Add environment variables to Cloudflare Workers:
   ```bash
   wrangler secret put DATABASE_URL
   wrangler secret put DATABASE_AUTH_TOKEN
   wrangler secret put ENCRYPTION_KEY
   ```

## Database Migration

Run database migrations before deployment:

```bash
npm run db:push
```

## Build and Deploy

1. Build the application:

   ```bash
   npm run build
   ```

2. Deploy to Cloudflare Workers:
   ```bash
   npm run deploy
   ```

## Development with Cloudflare Workers

To test locally with Cloudflare Workers environment:

```bash
npm run cf-dev
```

## Custom Domain (Optional)

If you want to use a custom domain:

1. Update `wrangler.jsonc` with your domain:

   ```json
   {
   	"routes": [
   		{
   			"pattern": "yourdomain.com/*",
   			"zone_name": "yourdomain.com"
   		}
   	]
   }
   ```

2. Make sure your domain is added to Cloudflare and DNS is configured.

## Troubleshooting

1. **Build errors**: Make sure all dependencies are installed and the project builds locally first.

2. **Database connection issues**: Verify your Turso credentials are correct and the database is accessible.

3. **WASM module issues**: The argon2 WASM module is configured in wrangler.jsonc - ensure the path is correct.

4. **Environment variable issues**: Use `wrangler secret list` to verify secrets are set correctly.

## Useful Commands

- `npm run cf-build` - Build and test deployment (dry run)
- `npm run cf-dev` - Local development with Workers environment
- `wrangler tail` - View real-time logs from deployed worker
- `wrangler dev` - Alternative local development command
