# Unifinance UK Spark

A financial assistance application with AI chatbot functionality powered by Google's Gemini API.

## Features

- Modern React application built with Vite and TypeScript
- AI chatbot for financial assistance using Google's Gemini API
- Responsive UI with Tailwind CSS and Shadcn components
- Dark/light mode support

## Deployment to Vercel

### Prerequisites

- A Vercel account
- Google Gemini API key

### Deployment Steps

1. **Fork or clone this repository**

2. **Set up environment variables in Vercel**
   - During the Vercel project setup, add the following environment variable:
     - `VITE_GEMINI_API_KEY`: Your Google Gemini API key

3. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect the Vite configuration
   - The build command and output directory are configured in `vercel.json`

4. **Verify deployment**
   - Once deployed, test the AI assistant functionality
   - Ensure the Gemini API is working correctly

## Local Development

```bash
# Install dependencies
npm install

# Create a .env file with your Gemini API key
echo "VITE_GEMINI_API_KEY=your_gemini_api_key_here" > .env

# Start the development server
npm run dev
```

## Build for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Technologies Used

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Google Gemini AI API
