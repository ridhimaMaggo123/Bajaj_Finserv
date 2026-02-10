# Vercel Deployment Guide

## Prerequisites
- Node.js project is already pushed to GitHub
- Vercel account (sign up at https://vercel.com)

## Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy your project**:
   ```bash
   vercel --prod
   ```
   
   - Follow the prompts to link your GitHub repository
   - Select the project directory
   - Confirm settings

### Option 2: Deploy via Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repository: `ridhimaMaggo123/Bajaj_Finserv`
4. Vercel will auto-detect it as a Node.js project
5. Configure environment variables:
   - Go to Settings → Environment Variables
   - Add `GROQ_API_KEY` with your Groq API key
   - Add `NODE_ENV` with value `production`
6. Click "Deploy"

## Build Configuration

The project uses the following configuration (already set in `vercel.json`):

- **Build Command**: Not required (Node.js serverless)
- **Output Directory**: Not required
- **Install Command**: `npm install`
- **Start Command**: Not required (handled by Vercel)

## Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

```
GROQ_API_KEY=your_actual_groq_api_key_here
NODE_ENV=production
```

## Post-Deployment

1. **Test the deployed API**:
   ```bash
   curl -X POST https://your-app.vercel.app/bfhl \
     -H "Content-Type: application/json" \
     -d '{"AI": "What is the capital of France?"}'
   ```

2. **Check endpoints**:
   - Health: `https://your-app.vercel.app/health`
   - API Info: `https://your-app.vercel.app/`

## Important Notes

- The serverless function will handle all routes automatically
- Port configuration is handled by Vercel
- No need to specify build/output commands for Node.js serverless
- Environment variables must be configured in Vercel dashboard
- The API will be available at your `.vercel.app` domain

## Troubleshooting

If deployment fails:
1. Check that `package.json` has correct start script
2. Verify all dependencies are listed in `package.json`
3. Ensure environment variables are properly set
4. Check Vercel deployment logs for errors
