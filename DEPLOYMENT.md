# F1 Betting Platform - Deployment Instructions

This document provides step-by-step instructions for deploying your F1 betting platform to Vercel.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Git](https://git-scm.com/)
- A [Vercel](https://vercel.com/) account
- A [GitHub](https://github.com/) account (recommended)

## Deployment Steps

### 1. Download the Project Files

First, download all the project files from this sandbox environment to your local machine.

### 2. Create a GitHub Repository

1. Go to [GitHub](https://github.com/) and sign in to your account
2. Click on the "+" icon in the top-right corner and select "New repository"
3. Name your repository (e.g., "f1-betting-platform")
4. Choose "Public" or "Private" visibility
5. Click "Create repository"

### 3. Push the Project to GitHub

```bash
# Navigate to your project directory
cd path/to/f1-betting-new

# Initialize Git repository
git init

# Add all files to Git
git add .

# Commit your changes
git commit -m "Initial commit"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/f1-betting-platform.git

# Push to GitHub
git push -u origin main
```

### 4. Deploy to Vercel

#### Option A: Deploy from Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" > "Project"
3. Import your GitHub repository
4. Configure your project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: next build
   - Output Directory: .next
5. Add environment variables:
   - Name: `JWT_SECRET`
   - Value: Generate a secure random string using: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
6. Click "Deploy"

#### Option B: Deploy using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```bash
   vercel login
   ```

3. Deploy your project:
   ```bash
   vercel
   ```

4. Follow the prompts:
   - Set up and deploy? Yes
   - Which scope? (Select your account)
   - Link to existing project? No
   - What's your project name? f1-betting-platform
   - In which directory is your code located? ./
   - Want to override settings? No

5. Add environment variables when prompted:
   - JWT_SECRET: (paste your generated secret)

### 5. Set Up the Database

1. Go to your project in the Vercel dashboard
2. Navigate to "Storage" tab
3. Click "Connect Database" and select "Create New" > "Postgres"
4. Follow the setup wizard to create your database
5. Once created, Vercel will automatically add the database connection variables to your project
6. Run the database migrations:
   ```bash
   vercel env pull .env.local
   npx wrangler d1 execute DB --file=migrations/0001_initial.sql
   ```

### 6. Verify Your Deployment

1. Visit your deployed application at the URL provided by Vercel (typically https://your-project-name.vercel.app)
2. Test the complete user flow:
   - Register a new account
   - Log in with your credentials
   - View the race calendar
   - Create a wager group
   - Invite users
   - Place bets on upcoming races

## Troubleshooting

If you encounter any issues during deployment:

1. Check the Vercel deployment logs for error messages
2. Verify that all environment variables are correctly set
3. Ensure your database is properly connected
4. Check that the database migrations have been applied correctly

For persistent issues, you can try:
- Redeploying the project
- Creating a new project in Vercel
- Checking the Vercel documentation for specific error messages

## Updating Your Deployment

To update your deployed application:

1. Make changes to your local code
2. Commit the changes to Git
3. Push to GitHub
4. Vercel will automatically redeploy your application

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
