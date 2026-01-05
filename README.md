<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1VJ-Ld_obM9R2Y-bUCVn5IU7pVzcA1Fo9

## Run Locally

**Prerequisites:**  Node.js

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure API Key:**
   Ensure your `GEMINI_API_KEY` is set in the `.env.local` file.

3. **Running the App:**

   **Option A: Development Mode (Recommended for editing)** and **Option B: Production Mode (Simplest)**
   
   Since this app now uses a secure backend proxy, you need to run the backend server.

   **For Development (Hot Reloading):**
   Open two terminals:
   1. Terminal 1 (Backend):
      ```bash
      node server.js
      ```
   2. Terminal 2 (Frontend):
      ```bash
      npm run dev
      ```
   Access the app at the URL shown in Terminal 2 (usually `http://localhost:5173`).

   **For Production (Build & Serve):**
   1. Build the frontend:
      ```bash
      npm run build
      ```
   2. Start the server:
      ```bash
      npm start
      ```
   Access the app at `http://localhost:3001`.

## Deploy on Vercel

The easiest way to deploy is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a Git repository (GitHub, GitLab, BitBucket).
2. Import the project into Vercel.
3. Vercel will automatically detect Vite and set the build command (`npm run build`) and output directory (`dist`).
4. **Important**: You must add the `GEMINI_API_KEY` environment variable in the Vercel Project Settings.
5. The `vercel.json` file included in this repo ensures the API works as a serverless function.
6. **Debug**: You can verify the backend is running by visiting `https://your-app.vercel.app/api/health`.
