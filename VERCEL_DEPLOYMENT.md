# Vercel Deployment Guide

## Step-by-Step Deployment to Vercel Free Tier

### Prerequisites
- GitHub account (already have `glowing-waddle` repo)
- Vercel account (free tier)
- OpenAI API key

### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Select "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

### Step 2: Import Your Repository
1. Click "Add New..." → "Project"
2. Select "Import Git Repository"
3. Paste: `https://github.com/gpad1234/glowing-waddle`
4. Click "Continue"

### Step 3: Configure Project
1. **Project Name**: `glowing-waddle` (or your preference)
2. **Framework Preset**: Select "Other" (since we have custom setup)
3. **Root Directory**: Leave as default or set to root
4. Click "Continue"

### Step 4: Environment Variables
Before deploying, add these environment variables:

1. Click "Environment Variables"
2. Add the following:
   - **Key**: `OPENAI_API_KEY`
     - **Value**: Your OpenAI API key
   - **Key**: `ANTHROPIC_API_KEY`
     - **Value**: Your Anthropic API key (if using)
   - **Key**: `PORT`
     - **Value**: `5000`

### Step 5: Build & Deploy Settings
Vercel should auto-detect settings, but if prompted:
- **Build Command**: `cd frontend && npm install && npm run build`
- **Output Directory**: `frontend/build`
- **Install Command**: `npm install --prefix backend && npm install --prefix frontend`

### Step 6: Deploy!
Click "Deploy" and wait for the build to complete (2-3 minutes)

### Step 7: Access Your App
Once deployed, you'll get a URL like: `https://glowing-waddle.vercel.app`

Your API will be available at: `https://glowing-waddle.vercel.app/api/`

---

## Post-Deployment Steps

### Update Frontend API Endpoint
After deployment, update the frontend to use your production API:

1. Create `.env.production` in `frontend/`:
```
REACT_APP_API_URL=https://glowing-waddle.vercel.app
```

2. Update `frontend/src/services/api.js` (if exists) or axios calls to use the environment variable

### Monitor Deployment
- View logs: Vercel Dashboard → Project → Deployments
- Check for errors: Look at build logs and runtime logs
- Test endpoints: Visit `https://glowing-waddle.vercel.app/api/health`

---

## Troubleshooting

### Build Fails
- **Issue**: Dependencies not installing
  - **Solution**: Clear cache → Redeploy
  - Go to Settings → Git → Redeploy (clear cache option)

### API Not Working
- **Issue**: 502 Bad Gateway or 500 errors
  - **Solution**: Check environment variables are set correctly
  - Check backend logs in Vercel dashboard

### Database Issues
- **Issue**: "Cannot find database"
  - **Note**: SQLite on Vercel uses ephemeral storage
  - **Solution**: Consider migrating to PostgreSQL for production
  - Temporary: Database resets on each deployment (acceptable for dev)

### CORS Errors
- **Issue**: Frontend can't reach backend
  - **Solution**: Backend CORS is already configured for all origins
  - Check that API URL in frontend matches deployed URL

---

## Free Tier Limitations

✅ **Included**:
- 100 GB bandwidth per month
- Serverless functions
- Automatic deployments
- Custom domains
- SSL/HTTPS
- Unlimited projects

⚠️ **Limitations**:
- Database storage: None included (need external DB)
- SQLite ephemeral storage: Resets on deployment
- Function execution: 10 seconds max
- No background jobs

---

## Recommended Next Steps

### Option 1: Add PostgreSQL Database
1. Use Vercel's Postgres add-on (paid)
2. Or use free tier: Railway, Supabase, or Render

### Option 2: Enhanced Vercel with Paid Plan
- Upgrade to Vercel Pro ($20/month)
- Includes edge functions, better performance

### Option 3: Hybrid Approach
- Frontend on Vercel (free)
- Backend on Railway or Render (free tier available)
- Database on Supabase (free tier)

---

## One-Click Deployment

Want to redeploy after code changes?
1. Push changes to GitHub
2. Vercel automatically detects changes
3. Auto-deploys from `main` branch
4. No manual intervention needed!

---

## Useful Commands

```bash
# View Vercel CLI info
vercel --version

# Deploy from local machine (optional)
vercel deploy

# Preview before production
vercel --prod
```

---

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Common Issues**: Check Vercel dashboard Deployments tab
- **Contact**: Vercel Support (free tier has community support)

Good luck with your deployment! 🚀
