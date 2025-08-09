# Replit.md

## Overview

This is a modern, interactive portfolio website for an AI/Data Science engineering student built with React, TypeScript, and Vite. The project features a unique neural network background animation with interactive, draggable nodes that create a visually stunning starfield effect. The portfolio includes all standard sections (about, skills, projects, experience, education, contact) presented in floating glassmorphism cards over the animated background.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **State Management**: React Query (@tanstack/react-query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Structure**: RESTful API with routes organized under `/api` prefix
- **Development**: Hot module replacement via Vite integration in development mode

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Schema**: Shared schema definitions between client and server
- **Migrations**: Drizzle Kit for database migrations and schema management

### Styling and Design System
- **Design Framework**: Tailwind CSS with custom configuration
- **Component System**: Shadcn/ui "new-york" style variant
- **Theme**: Dark theme with neural network-inspired color palette
- **Typography**: Multiple Google Fonts (Poppins, Roboto, Montserrat)
- **Effects**: Glassmorphism cards with backdrop blur and transparency

### Interactive Neural Network Background
- **Implementation**: Custom Canvas-based animation using React hooks
- **Features**: Draggable nodes, collision physics, automated movement
- **Performance**: RequestAnimationFrame-based rendering with mobile optimization
- **Interactivity**: Mouse and touch event handling for node manipulation

### Development Tools
- **Type Checking**: TypeScript with strict configuration
- **Code Quality**: ESLint and Prettier (implied by project structure)
- **Development Server**: Vite dev server with HMR
- **Build Process**: Vite for frontend, esbuild for backend bundling

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Query for state management
- **Build Tools**: Vite with React plugin, TypeScript compiler
- **Development**: tsx for TypeScript execution, esbuild for production builds

### UI and Styling
- **Component Library**: Complete Radix UI suite for accessible primitives
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer
- **Icons**: Lucide React for consistent iconography
- **Animations**: Class Variance Authority for component variants

### Database and Backend
- **Database**: Neon PostgreSQL serverless database
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Validation**: Zod for runtime type validation and schema definitions
- **Session Management**: connect-pg-simple for PostgreSQL session storage

### Form Handling
- **Forms**: React Hook Form for form management
- **Validation**: Hookform resolvers with Zod integration
- **UI Components**: Various Radix UI form components

### Utility Libraries
- **Date Handling**: date-fns for date manipulation
- **Styling Utilities**: clsx and tailwind-merge for conditional classes
- **Carousel**: Embla Carousel React for image/content carousels
- **Command Palette**: cmdk for command menu functionality

### Development and Replit Integration
- **Replit Tools**: Vite plugins for runtime error handling and cartographer
- **Error Handling**: Runtime error modal for development debugging
- **Environment**: Configured for Replit deployment with proper asset handling