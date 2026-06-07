# LaunchForge Deployment Guide

## Free Deployment Setup: Vercel (Frontend) + Railway (Backend)

### Step 1: Prepare Your GitHub Repository

1. Make sure all changes are committed:
```bash
git add .
git commit -m "Add deployment configuration files"
git push origin main
```

---

## Step 2: Deploy Backend to Railway ✈️

Railway is perfect for hosting the Node.js/Express backend for free.

### 2.1 Connect Railway to GitHub

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub (click "Login with GitHub")
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your repository: `Launch-Forge`
5. Railway will auto-detect it's a Node.js app

### 2.2 Configure Environment Variables in Railway

1. In the Railway dashboard, go to your project
2. Click on the **service/app** that was created
3. Go to the **"Variables"** tab
4. Add these environment variables:

```
GEMINI_API_KEY = AIzaSyBLl3wYQcPraxyrLr3N_WNkHWCzyFaUefQ
GEMINI_MODEL = gemini-3.5-flash
MONGODB_URI = mongodb+srv://Rishabh:9334422305Abc*@cluster0.azy2j3y.mongodb.net/mern?retryWrites=true&w=majority&appName=Cluster0
MONGODB_DB_NAME = launchforge
NODE_ENV = production
```

### 2.3 Get Your Railway Backend URL

1. Go to **"Settings"** tab in Railway
2. Copy the **"Public URL"** (looks like: `https://your-app-name.railway.app`)
3. **Save this URL** - you'll need it for Vercel

### 2.4 Deploy
- Railway will automatically deploy when you push to GitHub
- Watch the **Deployments** tab for build logs

---

## Step 3: Deploy Frontend to Vercel 🚀

Vercel is perfect for hosting the React/Vite frontend.

### 3.1 Connect Vercel to Your GitHub Repo

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub (click "Continue with GitHub")
3. Click **"Import Project"**
4. Select your `Launch-Forge` repository
5. Vercel will auto-detect it's a Vite app

### 3.2 Configure Build Settings

When importing, you'll see the build settings:
- **Framework Preset**: Vite ✓ (auto-detected)
- **Build Command**: `npm run build` ✓ (auto-detected)
- **Output Directory**: `dist` ✓ (auto-detected)

### 3.3 Add Environment Variables

Before clicking "Deploy", add these variables:

**Environment Variables:**
```
VITE_API_URL = https://your-railway-app-name.railway.app
```

(Replace with the Railway Public URL from Step 2.3)

### 3.4 Deploy

Click **"Deploy"** and wait for the build to complete. You'll get a URL like:
```
https://your-app-name.vercel.app
```

---

## Step 4: Update Frontend to Use Backend API

Your React app needs to call the backend. Update `src/main.tsx` or API calls:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Use this when making API calls:
fetch(`${API_BASE_URL}/api/endpoint`);
```

---

## Step 5: Verify Deployment

### Test Backend
```
https://your-railway-app.railway.app/
```

### Test Frontend  
```
https://your-app-name.vercel.app/
```

---

## Automatic Updates

Both platforms support **automatic deployments**:
- **Push to GitHub** → Automatic build & deploy
- **No manual steps needed** after initial setup

---

## Troubleshooting

### Backend not connecting?
1. Check Railway environment variables
2. Verify MongoDB connection string is correct
3. Check Railway logs: **Deployments** → **View Logs**

### Frontend build fails?
1. Check Vercel build logs
2. Ensure `VITE_API_URL` environment variable is set
3. Verify all dependencies are in package.json

### MongoDB connection issues?
1. Check your MongoDB Atlas IP whitelist includes `0.0.0.0/0` (allow all)
2. Verify connection string is correct
3. Test locally first: `npm run dev`

---

## Free Tier Limits

- **Railway**: 5GB bandwidth/month free
- **Vercel**: Unlimited deployments, 100GB bandwidth
- **MongoDB Atlas**: 512MB storage free tier

---

## Quick Links

- [Railway Dashboard](https://railway.app/dashboard)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [MongoDB Atlas Console](https://account.mongodb.com/account/login)

---

## Next Steps After Deployment

1. ✅ Enable GitHub Actions for automated testing (optional)
2. ✅ Set up custom domain (optional)
3. ✅ Monitor logs in Railway & Vercel dashboards
4. ✅ Set up alerts for deployment failures (optional)

**Your app is now live and will auto-update on every GitHub push!** 🎉
