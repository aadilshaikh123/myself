# Local Setup & Deployment Guide

## 🚀 Quick Start for Local Development

### 1. Download the Project
- Download all files from this Replit to your local machine
- Extract to a folder like `portfolio-website`

### 2. Install Dependencies
```bash
cd portfolio-website
npm install
```

### 3. Run Locally
```bash
npm run dev
```
- Opens at `http://localhost:5000`
- Hot reload enabled for development

## 📦 Deploy to Vercel

### Method 1: GitHub + Vercel (Recommended)

1. **Create GitHub Repository**
   - Create a new repository on GitHub
   - Upload all your project files

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Connect your GitHub repository
   - Vercel auto-detects settings from `vercel.json`
   - Click "Deploy"

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login and Deploy**
   ```bash
   vercel login
   vercel
   ```

3. **Configuration Prompts**
   - Project name: `portfolio-website` (or your choice)
   - Framework: `Other`
   - Build command: `npm run build` 
   - Output directory: `client/dist`

## 🔧 Build Process

The `vercel.json` file is configured to:
- Run `npm run build` to build the frontend
- Deploy the `client/dist` folder as a static site
- Handle client-side routing properly

## ✅ What Works on Vercel

- ✅ Interactive neural network background
- ✅ All animations and interactions
- ✅ Responsive design
- ✅ Glassmorphism effects
- ✅ Font loading
- ✅ Client-side navigation

## 📁 Project Structure

```
portfolio-website/
├── client/           # Frontend React app
├── server/           # Backend (not deployed to Vercel)
├── shared/           # Shared types
├── vercel.json       # Vercel configuration
├── package.json      # Dependencies
└── README.md         # Documentation
```

## 🔍 Troubleshooting

### Build Errors
- Ensure Node.js 18+ is installed
- Run `npm install` to install all dependencies
- Check that `npm run build` works locally

### Vercel Deployment Issues
- Verify `vercel.json` is in the root directory
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`

### Local Development Issues
- Port 5000 already in use? The app will auto-select another port
- Module not found? Run `npm install` again
- Build failing? Check Node.js version (needs 18+)

## 💡 Tips

- The portfolio content is in `client/src/components/Portfolio.tsx`
- Neural network settings are in `client/src/components/NeuralNetwork.tsx`
- Styling is in `client/src/index.css` and Tailwind classes
- No backend or database required for basic functionality