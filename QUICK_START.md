# 🚀 Deployment Quick Start Checklist

## Ready to deploy your LaunchForge app for FREE? Follow these steps:

### Step 1️⃣: Push to GitHub (if not done)
```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```

### Step 2️⃣: Deploy Backend (5 minutes)

1. Go to https://railway.app
2. Sign up with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select: `https://github.com/rishabh14300/Launch-Forge`
5. Railway auto-deploys! Wait for the build to finish
6. Go to **Settings** → Copy the **Public URL** (save this!)

**Add Environment Variables in Railway:**
- `GEMINI_API_KEY` = `AIzaSyBLl3wYQcPraxyrLr3N_WNkHWCzyFaUefQ`
- `GEMINI_MODEL` = `gemini-3.5-flash`
- `MONGODB_URI` = `mongodb+srv://Rishabh:9334422305Abc*@cluster0.azy2j3y.mongodb.net/mern?retryWrites=true&w=majority&appName=Cluster0`
- `MONGODB_DB_NAME` = `launchforge`
- `NODE_ENV` = `production`

### Step 3️⃣: Deploy Frontend (5 minutes)

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click **"Import Project"**
4. Select: `https://github.com/rishabh14300/Launch-Forge`
5. Vercel detects your Vite app automatically ✓
6. **Before deploying**, add environment variable:
   - `VITE_API_URL` = `https://YOUR-RAILWAY-URL-HERE` (from Step 2)
7. Click **"Deploy"** and wait!

### Step 4️⃣: Update Frontend Code

Your React components should use the API like this:

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Example API call
fetch(`${API_URL}/api/blueprints`)
```

Make sure this is already in your code, then push:
```bash
git push origin main
```

### ✅ Done! Your app is now live

- **Frontend**: `https://your-app-name.vercel.app`
- **Backend**: `https://your-app-name.railway.app`
- **Database**: MongoDB Atlas (ready to go!)

### 🔄 Auto-Updates

Every time you push to GitHub:
- ✅ Railway rebuilds & deploys backend
- ✅ Vercel rebuilds & deploys frontend
- ❌ No manual deployments needed!

---

## 🎯 What to do next

- [ ] Test your deployed app
- [ ] Share with friends!
- [ ] Monitor logs in Railway & Vercel dashboards
- [ ] Set up custom domain (optional)
- [ ] Enable analytics (optional)

---

## ⚠️ Important: Whitelist MongoDB IP

1. Go to https://cloud.mongodb.com
2. Go to **Network Access** → **IP Access List**
3. Add IP: `0.0.0.0/0` to allow Railway to connect

(This is free and safe for your setup)

---

## 🆘 Troubleshooting

**Railway build fails?**
- Check logs: Click on Deployment → View Logs
- Make sure `npm run build` works locally: `npm run build`

**Vercel build fails?**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json

**Frontend can't reach backend?**
- Verify `VITE_API_URL` is set correctly in Vercel
- Check Railway backend is running (should see a log)
- CORS might need to be enabled in server.ts

**MongoDB connection error?**
- Check connection string is correct
- Ensure IP whitelist includes `0.0.0.0/0`
- Test locally first: `npm run dev`

---

## 📚 Full Guide

See `DEPLOYMENT.md` for detailed instructions and troubleshooting.
