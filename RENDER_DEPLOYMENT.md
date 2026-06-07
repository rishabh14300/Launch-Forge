# Deploy to Render (Full Stack)

Render is perfect for full-stack Node.js apps. It handles both frontend and backend seamlessly.

## Step 1: Create a Render Account

1. Go to https://render.com
2. Sign up with GitHub (click "Sign up with GitHub")
3. Authorize Render to access your GitHub account

## Step 2: Create a New Web Service

1. On Render dashboard, click **"New +"** → **"Web Service"**
2. Select **"Deploy from a git repository"**
3. Click **"Connect account"** (if not already connected)
4. Find and select your repository: `Launch-Forge`
5. Click **"Connect"**

## Step 3: Configure the Service

On the next page, fill in:

| Field | Value |
|-------|-------|
| **Name** | `launchforge` (or any name you like) |
| **Environment** | `Node` |
| **Region** | `Oregon` (or closest to you) |
| **Branch** | `main` |
| **Build Command** | `npm run build` |
| **Start Command** | `npm run start` |
| **Plan** | `Free` (or upgrade for faster builds) |

## Step 4: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add these:

```
GEMINI_API_KEY = AIzaSyBLl3wYQcPraxyrLr3N_WNkHWCzyFaUefQ
GEMINI_MODEL = gemini-3.5-flash
MONGODB_URI = mongodb+srv://Rishabh:9334422305Abc*@cluster0.azy2j3y.mongodb.net/mern?retryWrites=true&w=majority&appName=Cluster0
MONGODB_DB_NAME = launchforge
NODE_ENV = production
```

## Step 5: Deploy!

Click **"Create Web Service"** and wait for deployment to complete.

Render will:
1. ✅ Clone your repo
2. ✅ Install dependencies
3. ✅ Build your app (`npm run build`)
4. ✅ Start your server (`npm run start`)
5. ✅ Give you a live URL like: `https://launchforge.onrender.com`

## Step 6: Test Your App

Once deployment completes:
- Open the URL shown on the Render dashboard
- Your app should be live! 🚀

## Automatic Deployments

Every time you push to GitHub:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

Render automatically:
- ✅ Detects the push
- ✅ Rebuilds and redeploys
- ❌ No manual steps needed!

## Important: MongoDB IP Whitelist

Make sure your MongoDB Atlas allows all IPs:

1. Go to https://cloud.mongodb.com
2. Click **"Network Access"** (left sidebar)
3. Click **"Add IP Address"**
4. Enter: `0.0.0.0/0` (allows all IPs)
5. Click **"Confirm"**

## Troubleshooting

**Build fails?**
- Check build logs: Click service → **"Logs"**
- Make sure `npm run build` works locally: `npm run build`

**App crashes after deploy?**
- Check runtime logs: Click service → **"Logs"**
- Verify all env variables are set correctly
- Check MongoDB connection string

**App runs but can't reach MongoDB?**
- Verify connection string is correct
- Check IP whitelist includes `0.0.0.0/0`
- Test locally: `npm run dev`

**App runs but shows blank page?**
- Server is working but frontend might have issues
- Check browser console for errors
- Verify `NODE_ENV=production` is set

## Monitoring

In Render dashboard you can:
- ✅ View live logs
- ✅ Restart the service
- ✅ View resource usage
- ✅ Set up alerts
- ✅ View deployment history

## Free Tier Limitations

- Spins down after 15 mins of inactivity (takes ~30 seconds to wake up)
- Upgrade to "Pro" ($12/month) for always-on service

---

## Done! 🎉

Your app is now deployed on Render with:
- ✅ Full-stack hosting (frontend + backend)
- ✅ Automatic deployments on every GitHub push
- ✅ MongoDB integration
- ✅ Gemini API ready
- ✅ Auto-HTTPS with free SSL

**Share your live URL:** `https://launchforge.onrender.com`
