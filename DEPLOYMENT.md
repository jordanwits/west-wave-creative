# Production Deployment - Environment Variables

## Setting ADMIN_PASSWORD in Production

Your form builder requires the `ADMIN_PASSWORD` environment variable to be set in your production environment.

### Vercel (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Select your project

2. **Navigate to Environment Variables**
   - Go to **Settings** → **Environment Variables**

3. **Add the Variable**
   - Click **Add New**
   - **Name:** `ADMIN_PASSWORD`
   - **Value:** Your secure password (the same one you use locally, e.g., `WWC`)
   - **Environment:** Select all environments (Production, Preview, Development)
   - Click **Save**

4. **Redeploy**
   - Go to **Deployments**
   - Click the three dots (⋯) on your latest deployment
   - Click **Redeploy**
   - Or push a new commit to trigger a new deployment

### Other Hosting Platforms

#### Netlify
1. Go to **Site settings** → **Environment variables**
2. Add `ADMIN_PASSWORD` with your password value
3. Redeploy your site

#### Railway
1. Go to your project → **Variables**
2. Add `ADMIN_PASSWORD` with your password value
3. Redeploy

#### Self-Hosted / VPS
Set the environment variable before starting your server:
```bash
export ADMIN_PASSWORD=your-password-here
pnpm build
pnpm start
```

Or use a `.env` file (not `.env.local` for production):
```bash
ADMIN_PASSWORD=your-password-here
```

## Verify It's Working

After setting the environment variable and redeploying:

1. Visit your live site: `https://yourdomain.com/forms/login`
2. Try logging in with your custom password
3. If `admin123` still works, the environment variable isn't set correctly

## Troubleshooting

**Problem:** Custom password doesn't work in production
- ✅ Check that `ADMIN_PASSWORD` is set in your hosting platform
- ✅ Make sure you redeployed after adding the variable
- ✅ Verify the variable name is exactly `ADMIN_PASSWORD` (case-sensitive)
- ✅ Check for any typos in the password value

**Problem:** Still using default password
- The environment variable isn't being read. Double-check:
  - Variable is set in the correct environment (Production)
  - You've redeployed after adding it
  - No extra spaces in the variable value

