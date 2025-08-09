# AI/Data Science Portfolio

An interactive portfolio website with a neural network background and glassmorphism design elements.

## Features

- Interactive draggable neural network background
- Glassmorphism content cards
- Modern typography (Poppins, Roboto, Montserrat)
- Responsive design
- Smooth animations and scrolling

## Local Development

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Setup for Local Development

1. Download/clone all project files to your local machine

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

### Building for Production

To build the frontend for deployment:
```bash
npm run build
```

This will create a `client/dist` folder with the built frontend files.

## Deployment

### Option 1: Vercel Deployment (Recommended)

1. Push your code to a GitHub repository

2. Go to [vercel.com](https://vercel.com) and import your GitHub repository

3. Vercel will automatically detect the configuration from `vercel.json`

4. The site will build and deploy automatically

### Option 2: Manual Vercel CLI Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from your project directory:
```bash
vercel
```

4. Follow the prompts. Use these settings:
   - Framework: "Other"
   - Build Command: `npm run build`
   - Output Directory: `client/dist`

### Environment Variables

No environment variables are required for basic functionality.

### Important Notes

- This is a frontend-only deployment for Vercel (the backend is not included)
- The neural network animation is purely client-side using Canvas API
- All portfolio content is static and embedded in the components

## Project Structure

- `/client` - Frontend React application
- `/server` - Express.js backend server
- `/shared` - Shared types and schemas
- `/components` - React components including the neural network

## Technologies Used

- React 18 + TypeScript
- Vite (build tool)
- Express.js
- Tailwind CSS
- Shadcn/ui components
- Canvas API for neural network animation