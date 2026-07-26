# DevFlow AI

An AI-powered collaborative project management platform for modern software teams.

## Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Socket.IO
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), Socket.IO
- **AI**: Google Gemini API
- **Cloud Storage**: Cloudinary

## Quick Start (Docker)

1. Ensure Docker and Docker Compose are installed.
2. In the root directory, run:
   ```bash
   docker-compose up -d --build
   ```
3. The frontend will be available at `http://localhost` and the backend API at `http://localhost:5000`.

## Local Development

### Backend Setup
1. `cd server`
2. `npm install`
3. Create a `.env` file based on the config below.
4. `npm run dev`

### Frontend Setup
1. `cd client`
2. `npm install`
3. `npm run dev`

### Environment Variables (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/devflow-ai
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Production Deployment
- **Backend**: Connect the `/server` folder to Render. Use the included `render.yaml` configuration.
- **Frontend**: Connect the `/client` folder to Vercel. Vercel will automatically detect the Vite framework and handle the SPA routing.
