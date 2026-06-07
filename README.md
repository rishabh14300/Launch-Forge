<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/adca6d33-36f2-4b91-a0e3-d1287f83507a

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Start MongoDB locally, or set `MONGODB_URI` to your MongoDB Atlas connection string
4. Run the app:
   `npm run dev`

The backend exposes:

- `POST /api/generate-blueprint` to generate and save a Gemini blueprint
- `GET /api/blueprints` to load saved blueprints from MongoDB
- `GET /api/blueprints/:id` to load one blueprint
- `DELETE /api/blueprints/:id` to remove a blueprint
- `GET /api/health` to check Gemini and MongoDB configuration
